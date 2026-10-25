/**
 * Diwali Celebration & Science Lab - Master Controller
 * Coordinates tabs, ambient petals & sparks, sound toggles, and module lifecycles.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Subsystems
    window.diyaApp = new DiyaSanctuary();
    window.fireworksApp = new FireworksSimulator('fireworks-canvas');
    window.rangoliApp = new RangoliStudio('rangoli-canvas');
    window.scienceApp = new ScienceLab();
    window.cardApp = new GreetingCardMaker('greeting-card-canvas');
    window.storyApp = new StoryManager();
    window.quizApp = new QuizQuest();

    // 2. Tab Navigation
    const tabButtons = document.querySelectorAll('.nav-tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab');

            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }

            window.diwaliAudio.playClick();

            // Trigger canvas resizes if switching to canvas tabs
            if (targetId === 'tab-fireworks' && window.fireworksApp) {
                window.fireworksApp.resize();
            } else if (targetId === 'tab-rangoli' && window.rangoliApp) {
                window.rangoliApp.resize();
                window.rangoliApp.drawBackgroundPlate();
            } else if (targetId === 'tab-cards' && window.cardApp) {
                window.cardApp.renderCard();
            }
        });
    });

    // 3. Ambient Audio Controls
    const musicBtn = document.getElementById('toggle-music-btn');
    const muteBtn = document.getElementById('toggle-mute-btn');

    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            const isPlaying = window.diwaliAudio.toggleAmbientMusic();
            musicBtn.classList.toggle('active', isPlaying);
            musicBtn.innerHTML = isPlaying ? 
                '🎶 Ambient Drone: ON <span class="music-pulse-indicator"></span>' : 
                '🎵 Ambient Soundscape';
        });
    }

    if (muteBtn) {
        muteBtn.addEventListener('click', () => {
            const isMuted = window.diwaliAudio.toggleMute();
            muteBtn.classList.toggle('muted', isMuted);
            muteBtn.innerHTML = isMuted ? '🔇 Audio Muted' : '🔊 Sound Effects: ON';
        });
    }

    // 4. Quick Jump Actions from Hero Banner
    document.querySelectorAll('.hero-action-jump').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetTab = btn.getAttribute('data-target-tab');
            const tabBtn = document.querySelector(`.nav-tab-btn[data-tab="${targetTab}"]`);
            if (tabBtn) {
                tabBtn.click();
                tabBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    // 5. Ambient Floating Petals & Golden Sparks Canvas
    initAmbientParticles();
});

function initAmbientParticles() {
    const canvas = document.getElementById('ambient-bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const count = 35;

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            isPetal: i % 2 === 0,
            size: i % 2 === 0 ? 8 + Math.random() * 8 : 1.5 + Math.random() * 2.5,
            color: i % 2 === 0 ? 
                (Math.random() > 0.4 ? '#ffaa00' : '#ff4d6d') : 
                '#ffd700',
            speedX: (Math.random() - 0.5) * 0.8,
            speedY: 0.4 + Math.random() * 0.8,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.03,
            alpha: 0.3 + Math.random() * 0.5
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.y += p.speedY;
            p.x += Math.sin(p.rotation) * 0.5 + p.speedX;
            p.rotation += p.rotSpeed;

            if (p.y > canvas.height + 20) {
                p.y = -20;
                p.x = Math.random() * canvas.width;
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.globalAlpha = p.alpha;

            if (p.isPetal) {
                // Marigold / Rose petal teardrop
                ctx.beginPath();
                ctx.moveTo(0, -p.size);
                ctx.quadraticCurveTo(p.size * 0.6, 0, 0, p.size);
                ctx.quadraticCurveTo(-p.size * 0.6, 0, 0, -p.size);
                ctx.fillStyle = p.color;
                ctx.fill();
            } else {
                // Twinkling golden star / dust
                ctx.beginPath();
                ctx.arc(0, 0, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.shadowColor = '#ffffaa';
                ctx.shadowBlur = 6;
                ctx.fill();
            }

            ctx.restore();
        });

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

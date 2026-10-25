/**
 * Diwali Celebration & Science Lab - Realistic Fireworks & Sparklers Simulator
 * Physics-based particle simulation with gravity, drag, trail fading, and sound triggers.
 */

class FireworksSimulator {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.rockets = [];
        this.particles = [];
        this.sparklerEmbers = [];
        this.groundAnars = [];
        this.chakkars = [];
        
        this.isAutoShow = false;
        this.autoShowTimer = null;
        this.sparklerMode = false;
        this.mousePos = { x: 0, y: 0, isDown: false, lastX: 0, lastY: 0 };
        
        this.selectedType = 'random';
        this.selectedColor = 'rainbow';
        
        // Eco metrics
        this.rocketsLaunched = 0;
        this.carbonSaved = 0; // grams
        this.pmSaved = 0; // mg
        
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Canvas interactions
        this.canvas.addEventListener('mousedown', (e) => this.handlePointerDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handlePointerMove(e));
        this.canvas.addEventListener('mouseup', () => this.handlePointerUp());
        this.canvas.addEventListener('mouseleave', () => this.handlePointerUp());

        // Touch support
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            this.handlePointerDown({ clientX: touch.clientX, clientY: touch.clientY });
        }, { passive: false });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.handlePointerMove({ clientX: touch.clientX, clientY: touch.clientY });
        }, { passive: false });

        this.canvas.addEventListener('touchend', () => this.handlePointerUp());

        // Control bar UI listeners
        const typeSelect = document.getElementById('firework-type-select');
        if (typeSelect) {
            typeSelect.addEventListener('change', (e) => {
                this.selectedType = e.target.value;
            });
        }

        const colorSelect = document.getElementById('firework-color-select');
        if (colorSelect) {
            colorSelect.addEventListener('change', (e) => {
                this.selectedColor = e.target.value;
            });
        }

        const sparklerBtn = document.getElementById('toggle-sparkler-mode-btn');
        if (sparklerBtn) {
            sparklerBtn.addEventListener('click', () => {
                const active = this.setSparklerMode(!this.sparklerMode);
                sparklerBtn.classList.toggle('active', active);
                sparklerBtn.innerText = active ? '✨ Sparkler Active (Drag Mouse)' : '✨ Handheld Sparkler (Phuljhadi)';
                window.diwaliAudio.playClick();
            });
        }

        const autoShowBtn = document.getElementById('toggle-autoshow-btn');
        if (autoShowBtn) {
            autoShowBtn.addEventListener('click', () => {
                const active = this.toggleAutoShow();
                autoShowBtn.classList.toggle('active', active);
                autoShowBtn.innerText = active ? '🎆 Auto Show: ON' : '🎆 Auto Firework Show';
                window.diwaliAudio.playClick();
            });
        }

        // Start animation loop
        requestAnimationFrame(() => this.loop());
    }

    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.dpr = window.devicePixelRatio || 1;
        this.canvas.width = rect.width * this.dpr;
        this.canvas.height = (rect.height || 520) * this.dpr;
        this.ctx.scale(this.dpr, this.dpr);
        this.width = rect.width;
        this.height = rect.height || 520;
    }

    handlePointerDown(e) {
        window.diwaliAudio.ensureContext();
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.mousePos.x = x;
        this.mousePos.y = y;
        this.mousePos.lastX = x;
        this.mousePos.lastY = y;
        this.mousePos.isDown = true;

        if (this.sparklerMode) {
            this.createSparklerBurst(x, y);
            window.diwaliAudio.playSparklerCrackle();
        } else {
            if (this.selectedType === 'anar') {
                this.launchAnar(x);
            } else if (this.selectedType === 'chakkar') {
                this.launchChakkar(x, Math.min(y, this.height - 40));
            } else {
                this.launchRocket(x, y, this.selectedType, this.selectedColor);
            }
        }
    }

    handlePointerMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.mousePos.x = x;
        this.mousePos.y = y;

        if (this.sparklerMode && this.mousePos.isDown) {
            this.createSparklerBurst(x, y);
            if (Math.random() > 0.4) {
                window.diwaliAudio.playSparklerCrackle();
            }
        }
        this.mousePos.lastX = x;
        this.mousePos.lastY = y;
    }

    handlePointerUp() {
        this.mousePos.isDown = false;
    }

    getColorHex(name) {
        const palette = {
            gold: ['#ffd700', '#ffbe33', '#ffa500', '#fff3b0', '#ffffff'],
            green: ['#00ff88', '#06d6a0', '#2ec4b6', '#a7f3d0', '#52b788'],
            blue: ['#00d4ff', '#118ab2', '#4cc9f0', '#7209b7', '#b5e2fa'],
            crimson: ['#ff0055', '#e63946', '#ff4d6d', '#ff758f', '#ffccd5'],
            purple: ['#b5179e', '#7209b7', '#9d4edd', '#e0aaff', '#ff007f'],
            rainbow: ['#ff0055', '#ffd700', '#00ff88', '#00d4ff', '#ffbe33', '#e0aaff', '#ff5722']
        };

        const chosen = palette[name] || palette.rainbow;
        return chosen[Math.floor(Math.random() * chosen.length)];
    }

    launchRocket(targetX, targetY, type = 'random', colorPalette = 'rainbow') {
        const startX = targetX + (Math.random() * 60 - 30);
        const startY = this.height;
        const speed = 9 + Math.random() * 4;
        const dx = targetX - startX;
        const dy = targetY - startY;
        const dist = Math.hypot(dx, dy);

        const vx = (dx / dist) * speed;
        const vy = (dy / dist) * speed;

        const resolvedType = type === 'random' ? 
            ['peony', 'willow', 'ring', 'crackle'][Math.floor(Math.random() * 4)] : type;

        this.rockets.push({
            x: startX,
            y: startY,
            vx: vx,
            vy: vy,
            targetY: targetY,
            color: this.getColorHex(colorPalette),
            palette: colorPalette,
            type: resolvedType,
            trail: []
        });

        this.rocketsLaunched++;
        this.carbonSaved += 42.5; // grams of CO2 averted by digital fireworks
        this.pmSaved += 18.2; // mg of PM2.5 averted
        this.updateEcoMetrics();

        window.diwaliAudio.playRocketLaunch();
    }

    explodeRocket(rocket) {
        const color = rocket.color;
        const count = rocket.type === 'willow' ? 140 : 100;
        const baseSpeed = rocket.type === 'willow' ? 4 : 5.5;

        window.diwaliAudio.playFireworkBurst(rocket.type);

        if (rocket.type === 'ring') {
            for (let i = 0; i < 70; i++) {
                const angle = (i / 70) * Math.PI * 2;
                const spd = 4.8;
                this.particles.push({
                    x: rocket.x,
                    y: rocket.y,
                    vx: Math.cos(angle) * spd,
                    vy: Math.sin(angle) * spd,
                    color: this.getColorHex(rocket.palette),
                    alpha: 1,
                    decay: 0.015,
                    size: 2.8,
                    gravity: 0.06,
                    drag: 0.98,
                    trail: []
                });
            }
        } else {
            for (let i = 0; i < count; i++) {
                const angle = Math.random() * Math.PI * 2;
                const spd = (Math.random() * 0.9 + 0.1) * baseSpeed;
                const isWillow = rocket.type === 'willow';

                this.particles.push({
                    x: rocket.x,
                    y: rocket.y,
                    vx: Math.cos(angle) * spd,
                    vy: Math.sin(angle) * spd,
                    color: isWillow ? '#ffd700' : this.getColorHex(rocket.palette),
                    alpha: 1,
                    decay: isWillow ? 0.009 : (0.014 + Math.random() * 0.01),
                    size: isWillow ? 2.2 : (2.5 + Math.random() * 1.5),
                    gravity: isWillow ? 0.12 : 0.07,
                    drag: isWillow ? 0.975 : 0.965,
                    crackle: rocket.type === 'crackle' && Math.random() > 0.6,
                    trail: []
                });
            }
        }

        // Add flash ring
        this.particles.push({
            x: rocket.x,
            y: rocket.y,
            vx: 0,
            vy: 0,
            color: '#ffffff',
            alpha: 0.8,
            decay: 0.12,
            size: 16,
            gravity: 0,
            drag: 1,
            isFlash: true
        });
    }

    launchAnar(x) {
        this.groundAnars.push({
            x: x,
            y: this.height - 15,
            duration: 180,
            currentFrame: 0,
            maxHeight: 180 + Math.random() * 80
        });
        window.diwaliAudio.playAnarFountain();
        this.rocketsLaunched++;
        this.carbonSaved += 60;
        this.pmSaved += 28;
        this.updateEcoMetrics();
    }

    launchChakkar(x, y) {
        this.chakkars.push({
            x: x,
            y: y,
            angle: 0,
            speed: 0.35,
            duration: 160,
            currentFrame: 0,
            radius: 22
        });
        window.diwaliAudio.playChakkarWhirl();
        this.rocketsLaunched++;
        this.carbonSaved += 55;
        this.pmSaved += 24;
        this.updateEcoMetrics();
    }

    createSparklerBurst(x, y) {
        for (let i = 0; i < 14; i++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = 2 + Math.random() * 5;
            this.sparklerEmbers.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                color: Math.random() > 0.3 ? '#ffd700' : '#ffffff',
                alpha: 1,
                decay: 0.035 + Math.random() * 0.04,
                size: 1.8 + Math.random() * 2,
                gravity: 0.08
            });
        }
    }

    toggleAutoShow(enabled = null) {
        if (enabled === null) {
            this.isAutoShow = !this.isAutoShow;
        } else {
            this.isAutoShow = enabled;
        }

        if (this.isAutoShow) {
            window.diwaliAudio.ensureContext();
            this.launchRandomShowRocket();
            this.autoShowTimer = setInterval(() => {
                this.launchRandomShowRocket();
            }, 1200 + Math.random() * 1000);
        } else {
            if (this.autoShowTimer) {
                clearInterval(this.autoShowTimer);
                this.autoShowTimer = null;
            }
        }
        return this.isAutoShow;
    }

    launchRandomShowRocket() {
        const x = this.width * 0.15 + Math.random() * (this.width * 0.7);
        const y = this.height * 0.15 + Math.random() * (this.height * 0.45);
        const types = ['peony', 'willow', 'ring', 'crackle'];
        const colors = ['gold', 'green', 'blue', 'crimson', 'purple', 'rainbow'];
        const type = types[Math.floor(Math.random() * types.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        this.launchRocket(x, y, type, color);

        if (Math.random() > 0.75) {
            setTimeout(() => {
                const x2 = this.width * 0.2 + Math.random() * (this.width * 0.6);
                const y2 = this.height * 0.2 + Math.random() * (this.height * 0.4);
                this.launchRocket(x2, y2, 'peony', color);
            }, 300);
        }
    }

    setSparklerMode(enabled) {
        this.sparklerMode = enabled;
        return this.sparklerMode;
    }

    updateEcoMetrics() {
        const countEl = document.getElementById('eco-launch-count');
        const co2El = document.getElementById('eco-co2-saved');
        const pmEl = document.getElementById('eco-pm-saved');
        if (countEl) countEl.innerText = this.rocketsLaunched;
        if (co2El) co2El.innerText = `${(this.carbonSaved / 1000).toFixed(2)} kg`;
        if (pmEl) pmEl.innerText = `${(this.pmSaved / 1000).toFixed(2)} g`;
    }

    loop() {
        // Semi-transparent clear creates motion blur / glowing trails
        this.ctx.fillStyle = 'rgba(10, 6, 20, 0.25)';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Update & Render Rockets
        for (let i = this.rockets.length - 1; i >= 0; i--) {
            const r = this.rockets[i];
            r.trail.push({ x: r.x, y: r.y });
            if (r.trail.length > 8) r.trail.shift();

            r.x += r.vx;
            r.y += r.vy;

            // Render rocket trail
            this.ctx.beginPath();
            this.ctx.moveTo(r.trail[0].x, r.trail[0].y);
            for (let t = 1; t < r.trail.length; t++) {
                this.ctx.lineTo(r.trail[t].x, r.trail[t].y);
            }
            this.ctx.strokeStyle = r.color;
            this.ctx.lineWidth = 2.5;
            this.ctx.stroke();

            // Head spark
            this.ctx.beginPath();
            this.ctx.arc(r.x, r.y, 3.5, 0, Math.PI * 2);
            this.ctx.fillStyle = '#ffffff';
            this.ctx.shadowColor = r.color;
            this.ctx.shadowBlur = 12;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;

            if (r.y <= r.targetY || r.vy >= 0) {
                this.explodeRocket(r);
                this.rockets.splice(i, 1);
            }
        }

        // Update & Render Particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            if (p.isFlash) {
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
                this.ctx.fill();
                this.ctx.restore();
                p.alpha -= p.decay;
                p.size *= 1.1;
                if (p.alpha <= 0) this.particles.splice(i, 1);
                continue;
            }

            p.trail.push({ x: p.x, y: p.y });
            if (p.trail.length > 5) p.trail.shift();

            p.vx *= p.drag;
            p.vy *= p.drag;
            p.vy += p.gravity;
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= p.decay;

            if (p.alpha > 0) {
                this.ctx.save();
                this.ctx.globalAlpha = Math.max(0, p.alpha);

                if (p.trail.length > 1) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.trail[0].x, p.trail[0].y);
                    for (let t = 1; t < p.trail.length; t++) {
                        this.ctx.lineTo(p.trail[t].x, p.trail[t].y);
                    }
                    this.ctx.strokeStyle = p.color;
                    this.ctx.lineWidth = p.size * 0.7;
                    this.ctx.stroke();
                }

                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fillStyle = p.color;
                this.ctx.shadowColor = p.color;
                this.ctx.shadowBlur = 8;
                this.ctx.fill();
                this.ctx.restore();
            } else {
                this.particles.splice(i, 1);
            }
        }

        // Update & Render Ground Anars
        for (let i = this.groundAnars.length - 1; i >= 0; i--) {
            const anar = this.groundAnars[i];
            anar.currentFrame++;

            // Draw base pot
            this.ctx.fillStyle = '#b7410e';
            this.ctx.beginPath();
            this.ctx.moveTo(anar.x - 14, anar.y);
            this.ctx.lineTo(anar.x + 14, anar.y);
            this.ctx.lineTo(anar.x + 8, anar.y - 18);
            this.ctx.lineTo(anar.x - 8, anar.y - 18);
            this.ctx.closePath();
            this.ctx.fill();

            // Spawn fountain sparks
            const fountainHeight = Math.sin((anar.currentFrame / anar.duration) * Math.PI) * anar.maxHeight;
            for (let s = 0; s < 12; s++) {
                const spread = (Math.random() - 0.5) * 35;
                const spdY = -(Math.random() * 0.6 + 0.4) * Math.sqrt(fountainHeight * 0.35) * 4.5;
                this.particles.push({
                    x: anar.x + (Math.random() * 6 - 3),
                    y: anar.y - 18,
                    vx: spread * 0.08,
                    vy: spdY,
                    color: Math.random() > 0.4 ? '#ffd700' : '#ffffff',
                    alpha: 1,
                    decay: 0.03 + Math.random() * 0.02,
                    size: 2.2,
                    gravity: 0.16,
                    drag: 0.98,
                    trail: []
                });
            }

            if (anar.currentFrame >= anar.duration) {
                this.groundAnars.splice(i, 1);
            }
        }

        // Update & Render Chakkars (Ground Spinners)
        for (let i = this.chakkars.length - 1; i >= 0; i--) {
            const c = this.chakkars[i];
            c.currentFrame++;
            c.angle += c.speed;

            // Spawn spinning sparks
            for (let s = 0; s < 8; s++) {
                const a = c.angle + (s * Math.PI / 4);
                const sparkDist = c.radius;
                const originX = c.x + Math.cos(a) * sparkDist;
                const originY = c.y + Math.sin(a) * sparkDist;
                const tangentAngle = a + Math.PI / 2;
                const spd = 4 + Math.random() * 3.5;

                this.particles.push({
                    x: originX,
                    y: originY,
                    vx: Math.cos(tangentAngle) * spd + (Math.random() - 0.5),
                    vy: Math.sin(tangentAngle) * spd + (Math.random() - 0.5),
                    color: Math.random() > 0.5 ? '#00ffff' : '#ffbe33',
                    alpha: 1,
                    decay: 0.04,
                    size: 2,
                    gravity: 0.06,
                    drag: 0.96,
                    trail: []
                });
            }

            // Draw spinning disc core
            this.ctx.save();
            this.ctx.translate(c.x, c.y);
            this.ctx.rotate(c.angle);
            this.ctx.fillStyle = '#ff5722';
            this.ctx.beginPath();
            this.ctx.arc(0, 0, 10, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.fillStyle = '#ffd700';
            this.ctx.fillRect(-12, -2, 24, 4);
            this.ctx.restore();

            if (c.currentFrame >= c.duration) {
                this.chakkars.splice(i, 1);
            }
        }

        // Update & Render Sparkler Embers
        for (let i = this.sparklerEmbers.length - 1; i >= 0; i--) {
            const ember = this.sparklerEmbers[i];
            ember.x += ember.vx;
            ember.y += ember.vy;
            ember.vy += ember.gravity;
            ember.alpha -= ember.decay;

            if (ember.alpha > 0) {
                this.ctx.save();
                this.ctx.globalAlpha = Math.max(0, ember.alpha);
                this.ctx.beginPath();
                this.ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
                this.ctx.fillStyle = ember.color;
                this.ctx.shadowColor = ember.color;
                this.ctx.shadowBlur = 10;
                this.ctx.fill();
                this.ctx.restore();
            } else {
                this.sparklerEmbers.splice(i, 1);
            }
        }

        // Handheld sparkler wand indicator if active
        if (this.sparklerMode) {
            this.ctx.save();
            this.ctx.strokeStyle = '#cccccc';
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.moveTo(this.mousePos.x, this.mousePos.y);
            this.ctx.lineTo(this.mousePos.x + 28, this.mousePos.y + 55);
            this.ctx.stroke();

            // Glowing hot tip
            this.ctx.beginPath();
            this.ctx.arc(this.mousePos.x, this.mousePos.y, 4, 0, Math.PI * 2);
            this.ctx.fillStyle = '#ff9900';
            this.ctx.shadowColor = '#ffff00';
            this.ctx.shadowBlur = 15;
            this.ctx.fill();
            this.ctx.restore();
        }

        requestAnimationFrame(() => this.loop());
    }
}

window.FireworksSimulator = FireworksSimulator;

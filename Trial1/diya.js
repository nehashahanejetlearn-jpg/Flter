/**
 * Diwali Celebration & Science Lab - Virtual Diya Sanctuary & Sky Lanterns
 * Interactive flame thermodynamics, matchstick lighting, and sky lantern release.
 */

class DiyaSanctuary {
    constructor() {
        this.diyas = [
            { id: 'diya-1', name: 'Terracotta Diya of Peace', blessing: 'May peace prevail in every heart.', lit: true, wicks: 1 },
            { id: 'diya-2', name: 'Royal Brass Lakshmi Deepam', blessing: 'May abundance and prosperity flourish.', lit: false, wicks: 1 },
            { id: 'diya-3', name: 'Clay Diya of Wisdom', blessing: 'May the light of knowledge dispel all ignorance.', lit: false, wicks: 1 },
            { id: 'diya-4', name: 'Panchmukhi 5-Wick Brass Lamp', blessing: 'May courage and harmony protect your home.', lit: false, wicks: 5 },
            { id: 'diya-5', name: 'Terracotta Diya of Health', blessing: 'May divine wellness radiate through your family.', lit: false, wicks: 1 },
            { id: 'diya-6', name: 'Golden Carved Shubh Diya', blessing: 'May auspicious beginnings bring immense joy.', lit: false, wicks: 1 },
            { id: 'diya-7', name: 'Floating Lotus Urli Diya', blessing: 'May love and togetherness bloom forever.', lit: false, wicks: 1 }
        ];

        this.matchstickActive = false;
        this.matchstickCursor = null;
        this.activeLanterns = [];
        this.lanternCanvas = null;
        this.lanternCtx = null;

        this.init();
    }

    init() {
        this.renderDiyas();
        this.initMatchstickTool();
        this.initLanternCanvas();
        this.updateAmbientGlow();

        // Control buttons
        const lightAllBtn = document.getElementById('light-all-diyas-btn');
        if (lightAllBtn) {
            lightAllBtn.addEventListener('click', () => this.lightAll());
        }

        const extinguishBtn = document.getElementById('extinguish-all-btn');
        if (extinguishBtn) {
            extinguishBtn.addEventListener('click', () => this.extinguishAll());
        }

        const matchBtn = document.getElementById('toggle-matchstick-btn');
        if (matchBtn) {
            matchBtn.addEventListener('click', () => this.toggleMatchstick());
        }

        const releaseLanternBtn = document.getElementById('release-lantern-btn');
        if (releaseLanternBtn) {
            releaseLanternBtn.addEventListener('click', () => this.releaseSkyLantern());
        }
    }

    renderDiyas() {
        const container = document.getElementById('diyas-grid');
        if (!container) return;

        container.innerHTML = '';
        this.diyas.forEach((diya, index) => {
            const card = document.createElement('div');
            card.className = `diya-item-card ${diya.lit ? 'is-lit' : ''}`;
            card.id = `card-${diya.id}`;
            card.setAttribute('data-id', diya.id);

            let wicksHtml = '';
            for (let w = 0; w < diya.wicks; w++) {
                wicksHtml += `
                    <div class="wick-assembly wick-${w}">
                        <div class="cotton-wick"></div>
                        <div class="flame-element ${diya.lit ? 'visible' : ''}">
                            <div class="flame-halo"></div>
                            <div class="flame-outer"></div>
                            <div class="flame-inner"></div>
                            <div class="flame-core"></div>
                            <div class="smoke-particle"></div>
                        </div>
                    </div>
                `;
            }

            card.innerHTML = `
                <div class="diya-visual-container">
                    <div class="diya-glow-ambient"></div>
                    <div class="diya-clay-body ${diya.id}">
                        <div class="oil-surface"></div>
                        ${wicksHtml}
                    </div>
                </div>
                <div class="diya-meta">
                    <h4>${diya.name}</h4>
                    <p class="diya-blessing-text">${diya.lit ? diya.blessing : 'Click or hover with match to ignite'}</p>
                    <button class="diya-action-btn" type="button" aria-label="Toggle Diya Light">
                        ${diya.lit ? '🪔 Lit (Glowing)' : '🔥 Light Diya'}
                    </button>
                </div>
            `;

            // Click handling
            card.addEventListener('click', (e) => {
                this.toggleDiya(diya.id);
            });

            // Hover matchstick ignition
            card.addEventListener('mouseenter', () => {
                if (this.matchstickActive && !diya.lit) {
                    this.igniteDiya(diya.id);
                }
            });

            container.appendChild(card);
        });
    }

    toggleDiya(id) {
        const diya = this.diyas.find(d => d.id === id);
        if (!diya) return;

        if (diya.lit) {
            this.snuffDiya(id);
        } else {
            this.igniteDiya(id);
        }
    }

    igniteDiya(id) {
        const diya = this.diyas.find(d => d.id === id);
        if (!diya || diya.lit) return;

        diya.lit = true;
        window.diwaliAudio.ensureContext();
        window.diwaliAudio.playDiyaIgnite();

        const card = document.getElementById(`card-${id}`);
        if (card) {
            card.classList.add('is-lit');
            const flames = card.querySelectorAll('.flame-element');
            flames.forEach(f => f.classList.add('visible'));
            const text = card.querySelector('.diya-blessing-text');
            if (text) text.innerText = diya.blessing;
            const btn = card.querySelector('.diya-action-btn');
            if (btn) btn.innerText = '🪔 Lit (Glowing)';
        }

        this.updateAmbientGlow();
        this.checkAllLitCelebration();
    }

    snuffDiya(id) {
        const diya = this.diyas.find(d => d.id === id);
        if (!diya || !diya.lit) return;

        diya.lit = false;
        window.diwaliAudio.playClick();

        const card = document.getElementById(`card-${id}`);
        if (card) {
            card.classList.remove('is-lit');
            const flames = card.querySelectorAll('.flame-element');
            flames.forEach(f => f.classList.remove('visible'));
            const text = card.querySelector('.diya-blessing-text');
            if (text) text.innerText = 'Click or hover with match to ignite';
            const btn = card.querySelector('.diya-action-btn');
            if (btn) btn.innerText = '🔥 Light Diya';
        }

        this.updateAmbientGlow();
    }

    lightAll() {
        window.diwaliAudio.ensureContext();
        this.diyas.forEach(diya => {
            if (!diya.lit) {
                this.igniteDiya(diya.id);
            }
        });
        window.diwaliAudio.playTempleChime(659.25, 0.4);
    }

    extinguishAll() {
        this.diyas.forEach(diya => {
            if (diya.lit) {
                this.snuffDiya(diya.id);
            }
        });
    }

    updateAmbientGlow() {
        const litCount = this.diyas.filter(d => d.lit).length;
        const total = this.diyas.length;
        const ratio = litCount / total;

        const countEl = document.getElementById('lit-diyas-count');
        if (countEl) countEl.innerText = `${litCount} / ${total}`;

        const sanctuaryEl = document.getElementById('diya-sanctuary-scene');
        if (sanctuaryEl) {
            const glowOpacity = 0.15 + (ratio * 0.45);
            sanctuaryEl.style.boxShadow = `inset 0 0 ${ratio * 120}px rgba(255, 170, 0, ${glowOpacity})`;
        }
    }

    checkAllLitCelebration() {
        const allLit = this.diyas.every(d => d.lit);
        if (allLit) {
            const banner = document.getElementById('sanctuary-celebration-toast');
            if (banner) {
                banner.classList.add('active');
                setTimeout(() => banner.classList.remove('active'), 5000);
            }
            window.diwaliAudio.playSuccessFanfare();
        }
    }

    initMatchstickTool() {
        this.matchCursor = document.getElementById('virtual-matchstick-cursor');
        
        window.addEventListener('mousemove', (e) => {
            if (this.matchstickActive && this.matchCursor) {
                this.matchCursor.style.left = `${e.clientX}px`;
                this.matchCursor.style.top = `${e.clientY}px`;
            }
        });
    }

    toggleMatchstick() {
        this.matchstickActive = !this.matchstickActive;
        const btn = document.getElementById('toggle-matchstick-btn');
        if (this.matchCursor) {
            this.matchCursor.style.display = this.matchstickActive ? 'block' : 'none';
        }
        if (btn) {
            btn.classList.toggle('active', this.matchstickActive);
            btn.innerHTML = this.matchstickActive ? '🔥 Matchstick Active (Hover to Light)' : '🕯️ Strike Matchstick';
        }
        if (this.matchstickActive) {
            window.diwaliAudio.playDiyaIgnite();
        }
    }

    // Sky Lanterns (Akash Kandil) Canvas Physics
    initLanternCanvas() {
        this.lanternCanvas = document.getElementById('sky-lanterns-canvas');
        if (!this.lanternCanvas) return;
        this.lanternCtx = this.lanternCanvas.getContext('2d');

        const resize = () => {
            const rect = this.lanternCanvas.parentElement.getBoundingClientRect();
            this.lanternCanvas.width = rect.width;
            this.lanternCanvas.height = rect.height || 350;
        };
        resize();
        window.addEventListener('resize', resize);

        // Pre-populate with 2 peaceful background lanterns
        this.activeLanterns.push({
            x: this.lanternCanvas.width * 0.25,
            y: this.lanternCanvas.height * 0.45,
            color: '#ff9900',
            size: 30,
            speedY: 0.35,
            sway: 0,
            swaySpeed: 0.02,
            wish: 'Peace & Prosperity'
        });
        this.activeLanterns.push({
            x: this.lanternCanvas.width * 0.72,
            y: this.lanternCanvas.height * 0.3,
            color: '#ff3366',
            size: 26,
            speedY: 0.28,
            sway: 1.5,
            swaySpeed: 0.018,
            wish: 'Health & Smiles'
        });

        requestAnimationFrame(() => this.lanternLoop());
    }

    releaseSkyLantern() {
        const input = document.getElementById('lantern-wish-input');
        const colorSelect = document.getElementById('lantern-color-select');
        const wish = input && input.value.trim() ? input.value.trim() : 'Joy & Abundance';
        const color = colorSelect ? colorSelect.value : '#ff9900';

        if (!this.lanternCanvas) return;

        window.diwaliAudio.ensureContext();
        window.diwaliAudio.playTempleChime(783.99, 0.35);

        const newLantern = {
            x: this.lanternCanvas.width * 0.3 + Math.random() * (this.lanternCanvas.width * 0.4),
            y: this.lanternCanvas.height - 30,
            color: color,
            size: 34,
            speedY: 0.6 + Math.random() * 0.4,
            sway: Math.random() * Math.PI,
            swaySpeed: 0.025 + Math.random() * 0.015,
            wish: wish
        };

        this.activeLanterns.push(newLantern);
        if (input) input.value = '';

        // Add to wishes list
        const wishList = document.getElementById('community-wishes-list');
        if (wishList) {
            const item = document.createElement('div');
            item.className = 'wish-bubble-item';
            item.innerHTML = `<span>✨ "${wish}"</span> <small style="color:${color}">🏮 Floating in Sky</small>`;
            wishList.prepend(item);
            if (wishList.children.length > 5) {
                wishList.removeChild(wishList.lastChild);
            }
        }
    }

    lanternLoop() {
        if (!this.lanternCtx || !this.lanternCanvas) return;

        this.lanternCtx.clearRect(0, 0, this.lanternCanvas.width, this.lanternCanvas.height);

        for (let i = this.activeLanterns.length - 1; i >= 0; i--) {
            const l = this.activeLanterns[i];
            l.sway += l.swaySpeed;
            l.x += Math.sin(l.sway) * 0.6;
            l.y -= l.speedY;

            // Draw glowing sky lantern
            this.drawLantern(l);

            if (l.y < -60) {
                this.activeLanterns.splice(i, 1);
            }
        }

        requestAnimationFrame(() => this.lanternLoop());
    }

    drawLantern(l) {
        const ctx = this.lanternCtx;
        ctx.save();
        ctx.translate(l.x, l.y);

        // Ambient glow
        ctx.beginPath();
        ctx.arc(0, 0, l.size * 1.5, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(0, 0, 4, 0, 0, l.size * 1.5);
        grad.addColorStop(0, 'rgba(255, 230, 150, 0.7)');
        grad.addColorStop(0.5, 'rgba(255, 150, 0, 0.25)');
        grad.addColorStop(1, 'rgba(255, 100, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fill();

        // Lantern paper cylinder / hexagonal shape
        ctx.beginPath();
        const w = l.size * 0.7;
        const h = l.size;
        ctx.moveTo(-w * 0.7, -h * 0.5);
        ctx.lineTo(w * 0.7, -h * 0.5);
        ctx.lineTo(w, h * 0.4);
        ctx.lineTo(w * 0.6, h * 0.6);
        ctx.lineTo(-w * 0.6, h * 0.6);
        ctx.lineTo(-w, h * 0.4);
        ctx.closePath();

        ctx.fillStyle = l.color;
        ctx.fill();
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Internal flickering candle
        ctx.beginPath();
        ctx.arc(0, h * 0.2, 4 + Math.sin(Date.now() * 0.01) * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffffaa';
        ctx.shadowBlur = 10;
        ctx.fill();

        // Wish text
        if (l.wish && l.y > 60) {
            ctx.font = '11px Poppins, sans-serif';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
            ctx.textAlign = 'center';
            ctx.fillText(l.wish, 0, -h * 0.65);
        }

        ctx.restore();
    }
}

window.DiyaSanctuary = DiyaSanctuary;

/**
 * Diwali Celebration & Science Lab - Festive Greeting Card Maker
 * Live high-definition canvas card generator with golden foil typography, borders, stickers, and PNG download.
 */

class GreetingCardMaker {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');

        this.cardWidth = 900;
        this.cardHeight = 600;
        this.canvas.width = this.cardWidth;
        this.canvas.height = this.cardHeight;

        this.recipient = 'Dear Family & Friends';
        this.sender = 'With Love & Blessings';
        this.message = 'May the divine light of Diwali bring immense joy, radiant health, and boundless prosperity to your life!';
        this.theme = 'midnight';
        this.sticker = 'diya';

        this.init();
    }

    init() {
        this.bindInputs();
        this.renderCard();
    }

    bindInputs() {
        const toInput = document.getElementById('card-to-input');
        const fromInput = document.getElementById('card-from-input');
        const msgSelect = document.getElementById('card-msg-preset');
        const msgCustom = document.getElementById('card-custom-msg');
        const themeRadios = document.querySelectorAll('.card-theme-radio');
        const stickerRadios = document.querySelectorAll('.card-sticker-radio');
        const downloadBtn = document.getElementById('download-card-btn');

        if (toInput) {
            toInput.addEventListener('input', (e) => {
                this.recipient = e.target.value.trim() || 'Dear Family & Friends';
                this.renderCard();
            });
        }

        if (fromInput) {
            fromInput.addEventListener('input', (e) => {
                this.sender = e.target.value.trim() || 'With Love & Blessings';
                this.renderCard();
            });
        }

        if (msgSelect) {
            msgSelect.addEventListener('change', (e) => {
                if (e.target.value !== 'custom') {
                    this.message = e.target.value;
                    if (msgCustom) msgCustom.value = this.message;
                } else if (msgCustom) {
                    this.message = msgCustom.value;
                }
                this.renderCard();
            });
        }

        if (msgCustom) {
            msgCustom.addEventListener('input', (e) => {
                this.message = e.target.value.trim() || 'Happy Diwali!';
                if (msgSelect) msgSelect.value = 'custom';
                this.renderCard();
            });
        }

        themeRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.theme = e.target.value;
                this.renderCard();
            });
        });

        stickerRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.sticker = e.target.value;
                this.renderCard();
            });
        });

        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadCard());
        }
    }

    renderCard() {
        const ctx = this.ctx;
        const w = this.cardWidth;
        const h = this.cardHeight;

        // 1. Theme Background
        let bgGrad;
        if (this.theme === 'crimson') {
            bgGrad = ctx.createRadialGradient(w / 2, h / 2, 40, w / 2, h / 2, w * 0.7);
            bgGrad.addColorStop(0, '#800e13');
            bgGrad.addColorStop(0.6, '#38040e');
            bgGrad.addColorStop(1, '#1b0207');
        } else if (this.theme === 'emerald') {
            bgGrad = ctx.createRadialGradient(w / 2, h / 2, 40, w / 2, h / 2, w * 0.7);
            bgGrad.addColorStop(0, '#005f73');
            bgGrad.addColorStop(0.6, '#0a3641');
            bgGrad.addColorStop(1, '#02161b');
        } else if (this.theme === 'purple') {
            bgGrad = ctx.createRadialGradient(w / 2, h / 2, 40, w / 2, h / 2, w * 0.7);
            bgGrad.addColorStop(0, '#5a189a');
            bgGrad.addColorStop(0.6, '#240046');
            bgGrad.addColorStop(1, '#10002b');
        } else {
            // Midnight Royal Gold
            bgGrad = ctx.createRadialGradient(w / 2, h / 2, 40, w / 2, h / 2, w * 0.7);
            bgGrad.addColorStop(0, '#1c1335');
            bgGrad.addColorStop(0.6, '#0f0a1c');
            bgGrad.addColorStop(1, '#050308');
        }

        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);

        // 2. Subtle Starry & Sparkle Background
        ctx.fillStyle = 'rgba(255, 235, 170, 0.4)';
        for (let i = 0; i < 45; i++) {
            const sx = (i * 137.5) % w;
            const sy = (i * 93.7) % h;
            const size = (i % 3) + 1;
            ctx.beginPath();
            ctx.arc(sx, sy, size * 0.8, 0, Math.PI * 2);
            ctx.fill();
        }

        // 3. Ornate Royal Borders & Toran Corners
        ctx.save();
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 3;
        ctx.strokeRect(30, 30, w - 60, h - 60);

        ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
        ctx.lineWidth = 1;
        ctx.strokeRect(40, 40, w - 80, h - 80);

        // Decorative Corner Ornaments
        this.drawCornerFiligree(40, 40, 0);
        this.drawCornerFiligree(w - 40, 40, Math.PI / 2);
        this.drawCornerFiligree(w - 40, h - 40, Math.PI);
        this.drawCornerFiligree(40, h - 40, -Math.PI / 2);
        ctx.restore();

        // 4. Festive Top Sanskrit Shloka / Headline
        ctx.save();
        ctx.textAlign = 'center';
        ctx.font = 'bold 22px Cinzel, "Cinzel Decorative", Georgia, serif';
        ctx.fillStyle = '#ffbe33';
        ctx.shadowColor = 'rgba(255, 190, 51, 0.6)';
        ctx.shadowBlur = 12;
        ctx.fillText('✨ शुभ दीपावली ✨', w / 2, 88);

        // Main Greeting Title
        ctx.font = 'bold 44px "Cinzel Decorative", Cinzel, serif';
        const titleGrad = ctx.createLinearGradient(w / 2 - 200, 0, w / 2 + 200, 0);
        titleGrad.addColorStop(0, '#ffbe33');
        titleGrad.addColorStop(0.5, '#ffffff');
        titleGrad.addColorStop(1, '#ffbe33');
        ctx.fillStyle = titleGrad;
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 16;
        ctx.fillText('HAPPY DIWALI', w / 2, 142);
        ctx.restore();

        // 5. Center Motif / Sticker
        this.drawCenterSticker(w / 2, 235);

        // 6. Recipient Line
        ctx.save();
        ctx.textAlign = 'center';
        ctx.font = 'italic 600 24px Poppins, sans-serif';
        ctx.fillStyle = '#ffd700';
        ctx.fillText(this.recipient, w / 2, 345);

        // 7. Festive Message (Multi-line text wrapping)
        ctx.font = '400 18px Poppins, sans-serif';
        ctx.fillStyle = '#f8f9fa';
        this.wrapText(this.message, w / 2, 390, 680, 28);

        // 8. Sender Line
        ctx.font = 'italic 500 20px Poppins, sans-serif';
        ctx.fillStyle = '#ffbe33';
        ctx.fillText(this.sender, w / 2, 515);

        // Bottom sub-decor
        ctx.font = '14px Poppins, sans-serif';
        ctx.fillStyle = 'rgba(255, 215, 0, 0.6)';
        ctx.fillText('🪔 May Darkness Depart, May Light Divine Prevail 🪔', w / 2, 545);
        ctx.restore();
    }

    drawCornerFiligree(x, y, angle) {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 24, 0, Math.PI / 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(28, 0);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 28);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(14, 14, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffd700';
        ctx.fill();

        ctx.restore();
    }

    drawCenterSticker(cx, cy) {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(cx, cy);

        if (this.sticker === 'lotus') {
            // Sacred Lotus
            ctx.fillStyle = '#ff007f';
            ctx.shadowColor = '#ff66b2';
            ctx.shadowBlur = 15;
            for (let i = 0; i < 7; i++) {
                const a = ((i - 3) * Math.PI) / 10;
                ctx.save();
                ctx.rotate(a);
                ctx.beginPath();
                ctx.ellipse(0, -25, 12, 30, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        } else if (this.sticker === 'kalash') {
            // Holy Kalash with Coconut
            ctx.fillStyle = '#d97706';
            ctx.beginPath();
            ctx.arc(0, 5, 26, 0, Math.PI * 2);
            ctx.fill();
            // Coconut
            ctx.fillStyle = '#78350f';
            ctx.beginPath();
            ctx.arc(0, -24, 16, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.sticker === 'fireworks') {
            // Burst sparks
            for (let s = 0; s < 12; s++) {
                const a = (s * Math.PI) / 6;
                ctx.strokeStyle = s % 2 === 0 ? '#ffd700' : '#ff0055';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(Math.cos(a) * 12, Math.sin(a) * 12);
                ctx.lineTo(Math.cos(a) * 36, Math.sin(a) * 36);
                ctx.stroke();
            }
        } else {
            // Traditional Diya & Glowing Flame
            ctx.fillStyle = '#b45309';
            ctx.beginPath();
            ctx.ellipse(0, 10, 42, 18, 0, 0, Math.PI);
            ctx.fill();
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Flickering Flame
            const flameGrad = ctx.createRadialGradient(0, -10, 2, 0, -10, 24);
            flameGrad.addColorStop(0, '#ffffff');
            flameGrad.addColorStop(0.3, '#ffea00');
            flameGrad.addColorStop(0.7, '#ff5722');
            flameGrad.addColorStop(1, 'transparent');

            ctx.fillStyle = flameGrad;
            ctx.shadowColor = '#ffaa00';
            ctx.shadowBlur = 24;
            ctx.beginPath();
            ctx.moveTo(0, 5);
            ctx.quadraticCurveTo(16, -10, 0, -32);
            ctx.quadraticCurveTo(-16, -10, 0, 5);
            ctx.fill();
        }

        ctx.restore();
    }

    wrapText(text, x, y, maxWidth, lineHeight) {
        const ctx = this.ctx;
        const words = text.split(' ');
        let line = '';
        let currentY = y;

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                ctx.fillText(line.trim(), x, currentY);
                line = words[n] + ' ';
                currentY += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line.trim(), x, currentY);
    }

    downloadCard() {
        window.diwaliAudio.playSuccessFanfare();
        const link = document.createElement('a');
        link.download = `diwali_greeting_${this.recipient.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
        link.href = this.canvas.toDataURL('image/png');
        link.click();
    }
}

window.GreetingCardMaker = GreetingCardMaker;

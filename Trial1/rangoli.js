/**
 * Diwali Celebration & Science Lab - Symmetrical Kaleidoscope Rangoli Studio
 * Multi-axis radial symmetry, powdered sand textures, glitter brushes, stencils, and PNG export.
 */

class RangoliStudio {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        
        this.symmetry = 8;
        this.mirrorSymmetry = true;
        this.currentColor = '#ffbe0b';
        this.brushSize = 6;
        this.brushType = 'powder'; // 'powder', 'glitter', 'dots', 'eraser'
        this.glowEnabled = true;

        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;

        this.history = [];
        this.maxHistory = 15;

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => {
            const data = this.canvas.toDataURL();
            this.resize();
            const img = new Image();
            img.onload = () => this.ctx.drawImage(img, 0, 0);
            img.src = data;
        });

        // Pointer event listeners
        this.canvas.addEventListener('mousedown', (e) => this.startDraw(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDraw());
        this.canvas.addEventListener('mouseleave', () => this.stopDraw());

        // Touch support
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const t = e.touches[0];
            this.startDraw({ clientX: t.clientX, clientY: t.clientY });
        }, { passive: false });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const t = e.touches[0];
            this.draw({ clientX: t.clientX, clientY: t.clientY });
        }, { passive: false });

        this.canvas.addEventListener('touchend', () => this.stopDraw());

        this.bindControls();
        this.saveState();
        this.drawBackgroundPlate();
    }

    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        const size = Math.min(rect.width, 560);
        this.canvas.width = size;
        this.canvas.height = size;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
    }

    drawBackgroundPlate() {
        // Deep elegant marble / terracotta plate surface
        this.ctx.fillStyle = '#110a1d';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Circular thali boundary
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.centerX - 12, 0, Math.PI * 2);
        this.ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
        this.ctx.lineWidth = 4;
        this.ctx.stroke();

        // Delicate concentric guide rings
        [0.25, 0.5, 0.75].forEach(r => {
            this.ctx.beginPath();
            this.ctx.arc(this.centerX, this.centerY, (this.centerX - 12) * r, 0, Math.PI * 2);
            this.ctx.strokeStyle = 'rgba(255, 215, 0, 0.08)';
            this.ctx.lineWidth = 1;
            this.ctx.setLineDash([4, 6]);
            this.ctx.stroke();
        });

        this.ctx.restore();
    }

    bindControls() {
        // Symmetry slider
        const symSlider = document.getElementById('rangoli-symmetry-slider');
        const symVal = document.getElementById('rangoli-symmetry-val');
        if (symSlider) {
            symSlider.addEventListener('input', (e) => {
                this.symmetry = parseInt(e.target.value, 10);
                if (symVal) symVal.innerText = `${this.symmetry} Folds`;
            });
        }

        // Mirror toggle
        const mirrorCheck = document.getElementById('rangoli-mirror-toggle');
        if (mirrorCheck) {
            mirrorCheck.addEventListener('change', (e) => {
                this.mirrorSymmetry = e.target.checked;
            });
        }

        // Color swatches
        const swatches = document.querySelectorAll('.rangoli-color-swatch');
        swatches.forEach(swatch => {
            swatch.addEventListener('click', () => {
                swatches.forEach(s => s.classList.remove('active'));
                swatch.classList.add('active');
                this.currentColor = swatch.getAttribute('data-color');
                if (this.brushType === 'eraser') this.brushType = 'powder';
                this.updateBrushIndicator();
            });
        });

        // Brush types
        const brushBtns = document.querySelectorAll('.rangoli-brush-btn');
        brushBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                brushBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.brushType = btn.getAttribute('data-brush');
            });
        });

        // Brush size slider
        const sizeSlider = document.getElementById('rangoli-size-slider');
        if (sizeSlider) {
            sizeSlider.addEventListener('input', (e) => {
                this.brushSize = parseInt(e.target.value, 10);
            });
        }

        // Clear button
        const clearBtn = document.getElementById('rangoli-clear-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.saveState();
                this.drawBackgroundPlate();
                window.diwaliAudio.playClick();
            });
        }

        // Undo button
        const undoBtn = document.getElementById('rangoli-undo-btn');
        if (undoBtn) {
            undoBtn.addEventListener('click', () => this.undo());
        }

        // Download PNG
        const downloadBtn = document.getElementById('rangoli-download-btn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadRangoli());
        }

        // Stencils
        const stencils = document.querySelectorAll('.stencil-select-btn');
        stencils.forEach(btn => {
            btn.addEventListener('click', () => {
                const stencilType = btn.getAttribute('data-stencil');
                this.loadStencil(stencilType);
            });
        });
    }

    updateBrushIndicator() {
        const brushBtns = document.querySelectorAll('.rangoli-brush-btn');
        brushBtns.forEach(b => {
            if (b.getAttribute('data-brush') === this.brushType) b.classList.add('active');
            else b.classList.remove('active');
        });
    }

    saveState() {
        if (this.history.length >= this.maxHistory) {
            this.history.shift();
        }
        this.history.push(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height));
    }

    undo() {
        if (this.history.length > 1) {
            this.history.pop();
            const lastState = this.history[this.history.length - 1];
            this.ctx.putImageData(lastState, 0, 0);
            window.diwaliAudio.playClick();
        } else if (this.history.length === 1) {
            this.drawBackgroundPlate();
        }
    }

    getCanvasPos(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    startDraw(e) {
        window.diwaliAudio.ensureContext();
        this.isDrawing = true;
        const pos = this.getCanvasPos(e);
        this.lastX = pos.x;
        this.lastY = pos.y;
        this.saveState();

        this.drawSymmetricStroke(pos.x, pos.y, pos.x, pos.y);
    }

    draw(e) {
        if (!this.isDrawing) return;
        const pos = this.getCanvasPos(e);
        this.drawSymmetricStroke(this.lastX, this.lastY, pos.x, pos.y);
        this.lastX = pos.x;
        this.lastY = pos.y;
    }

    stopDraw() {
        this.isDrawing = false;
    }

    drawSymmetricStroke(x1, y1, x2, y2) {
        const angleStep = (Math.PI * 2) / this.symmetry;

        // Relative coordinates from center
        const relX1 = x1 - this.centerX;
        const relY1 = y1 - this.centerY;
        const relX2 = x2 - this.centerX;
        const relY2 = y2 - this.centerY;

        for (let i = 0; i < this.symmetry; i++) {
            const angle = i * angleStep;

            // Direct rotation
            const p1 = this.rotatePoint(relX1, relY1, angle);
            const p2 = this.rotatePoint(relX2, relY2, angle);
            this.renderSingleStroke(p1.x + this.centerX, p1.y + this.centerY, p2.x + this.centerX, p2.y + this.centerY);

            // Mirror reflection
            if (this.mirrorSymmetry) {
                const mp1 = this.rotatePoint(-relX1, relY1, angle);
                const mp2 = this.rotatePoint(-relX2, relY2, angle);
                this.renderSingleStroke(mp1.x + this.centerX, mp1.y + this.centerY, mp2.x + this.centerX, mp2.y + this.centerY);
            }
        }
    }

    rotatePoint(x, y, angle) {
        return {
            x: x * Math.cos(angle) - y * Math.sin(angle),
            y: x * Math.sin(angle) + y * Math.cos(angle)
        };
    }

    renderSingleStroke(x1, y1, x2, y2) {
        this.ctx.save();

        if (this.brushType === 'eraser') {
            this.ctx.globalCompositeOperation = 'destination-out';
            this.ctx.beginPath();
            this.ctx.arc(x2, y2, this.brushSize * 1.5, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
            return;
        }

        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        if (this.brushType === 'glitter') {
            // Glitter brush: glowing core + scattered sparkly specks
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.strokeStyle = this.currentColor;
            this.ctx.lineWidth = this.brushSize * 0.7;
            this.ctx.shadowColor = this.currentColor;
            this.ctx.shadowBlur = 12;
            this.ctx.stroke();

            // Random micro-glitter particles
            for (let g = 0; g < 3; g++) {
                const offsetX = (Math.random() - 0.5) * this.brushSize * 3;
                const offsetY = (Math.random() - 0.5) * this.brushSize * 3;
                this.ctx.beginPath();
                this.ctx.arc(x2 + offsetX, y2 + offsetY, Math.random() * 2, 0, Math.PI * 2);
                this.ctx.fillStyle = '#ffffff';
                this.ctx.shadowColor = '#ffffaa';
                this.ctx.shadowBlur = 6;
                this.ctx.fill();
            }
        } else if (this.brushType === 'dots') {
            // Kolam dot stamps
            this.ctx.beginPath();
            this.ctx.arc(x2, y2, this.brushSize, 0, Math.PI * 2);
            this.ctx.fillStyle = this.currentColor;
            this.ctx.shadowColor = this.currentColor;
            this.ctx.shadowBlur = 6;
            this.ctx.fill();
        } else {
            // Powder / Sand texture: subtle grains
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.strokeStyle = this.currentColor;
            this.ctx.lineWidth = this.brushSize;
            if (this.glowEnabled) {
                this.ctx.shadowColor = this.currentColor;
                this.ctx.shadowBlur = 8;
            }
            this.ctx.stroke();

            // Sand grain edge scatter
            for (let s = 0; s < 4; s++) {
                const ox = (Math.random() - 0.5) * this.brushSize * 1.4;
                const oy = (Math.random() - 0.5) * this.brushSize * 1.4;
                this.ctx.beginPath();
                this.ctx.arc(x2 + ox, y2 + oy, 0.9, 0, Math.PI * 2);
                this.ctx.fillStyle = this.currentColor;
                this.ctx.fill();
            }
        }

        this.ctx.restore();
    }

    loadStencil(type) {
        this.saveState();
        this.drawBackgroundPlate();
        window.diwaliAudio.playTempleChime(880, 0.3);

        const r = (this.canvas.width * 0.42);

        if (type === 'lotus') {
            // 8-petal blooming sacred lotus
            this.symmetry = 8;
            this.mirrorSymmetry = true;
            for (let i = 0; i < 8; i++) {
                const angle = (i * Math.PI) / 4;
                this.drawLotusPetal(angle, r);
            }
        } else if (type === 'diya') {
            // Auspicious circular Diya mandala
            this.symmetry = 6;
            this.mirrorSymmetry = true;
            for (let i = 0; i < 6; i++) {
                const a = (i * Math.PI) / 3;
                this.drawDiyaMotif(a, r * 0.65);
            }
        } else if (type === 'mandala') {
            // Intricate geometric web
            this.symmetry = 12;
            this.mirrorSymmetry = true;
            this.drawGeometricMandala(r);
        }
    }

    drawLotusPetal(angle, radius) {
        this.ctx.save();
        this.ctx.translate(this.centerX, this.centerY);
        this.ctx.rotate(angle);

        // Petal contour
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.quadraticCurveTo(radius * 0.4, -radius * 0.4, 0, -radius);
        this.ctx.quadraticCurveTo(-radius * 0.4, -radius * 0.4, 0, 0);
        this.ctx.strokeStyle = '#ff007f';
        this.ctx.lineWidth = 3;
        this.ctx.shadowColor = '#ff007f';
        this.ctx.shadowBlur = 10;
        this.ctx.stroke();

        // Inner golden spine
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, -radius * 0.85);
        this.ctx.strokeStyle = '#ffd700';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        this.ctx.restore();
    }

    drawDiyaMotif(angle, dist) {
        this.ctx.save();
        this.ctx.translate(this.centerX, this.centerY);
        this.ctx.rotate(angle);
        this.ctx.translate(0, -dist);

        // Base pot
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 22, 0.2, Math.PI - 0.2);
        this.ctx.strokeStyle = '#fb5607';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();

        // Flame
        this.ctx.beginPath();
        this.ctx.moveTo(0, -2);
        this.ctx.quadraticCurveTo(8, -14, 0, -26);
        this.ctx.quadraticCurveTo(-8, -14, 0, -2);
        this.ctx.fillStyle = '#ffbe0b';
        this.ctx.shadowColor = '#ffd700';
        this.ctx.shadowBlur = 12;
        this.ctx.fill();

        this.ctx.restore();
    }

    drawGeometricMandala(radius) {
        this.ctx.save();
        this.ctx.translate(this.centerX, this.centerY);

        for (let i = 0; i < 12; i++) {
            this.ctx.rotate(Math.PI / 6);
            this.ctx.beginPath();
            this.ctx.arc(0, radius * 0.5, radius * 0.35, 0, Math.PI * 2);
            this.ctx.strokeStyle = '#00b4d8';
            this.ctx.lineWidth = 2;
            this.ctx.shadowColor = '#00b4d8';
            this.ctx.shadowBlur = 6;
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.arc(0, radius * 0.75, radius * 0.18, 0, Math.PI * 2);
            this.ctx.strokeStyle = '#ffd700';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }

        this.ctx.restore();
    }

    downloadRangoli() {
        window.diwaliAudio.playSuccessFanfare();
        const link = document.createElement('a');
        link.download = `diwali_rangoli_masterpiece_${Date.now()}.png`;
        link.href = this.canvas.toDataURL('image/png');
        link.click();
    }
}

window.RangoliStudio = RangoliStudio;

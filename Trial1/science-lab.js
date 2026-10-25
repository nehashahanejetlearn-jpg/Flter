/**
 * Diwali Celebration & Science Lab - Interactive STEM Experiments
 * 1. Chemistry of Firework Colors (Atomic Spectroscopy Flame Test)
 * 2. Physics of the Diya (Capillary Action & Fluid Dynamics)
 * 3. Eco-Cracker Analyzer (CSIR-NEERI Green Crackers vs Traditional)
 */

class ScienceLab {
    constructor() {
        this.salts = {
            strontium: {
                name: 'Strontium Carbonate / Nitrate',
                formula: 'SrCO₃ / Sr(NO₃)₂',
                colorName: 'Crimson Red',
                hex: '#ff0037',
                wavelength: '606 - 650 nm',
                flameRgba: 'rgba(255, 10, 50, 0.85)',
                quantumTransition: '5s → 4d / Molecular SrCl emitter',
                spectralLines: [606, 636, 660, 680],
                funFact: 'Strontium salts are also used in maritime distress flares because red light has the longest wavelength in the visible spectrum and penetrates fog best!'
            },
            barium: {
                name: 'Barium Chloride',
                formula: 'BaCl₂',
                colorName: 'Brilliant Emerald Green',
                hex: '#00ff66',
                wavelength: '510 - 535 nm',
                flameRgba: 'rgba(0, 255, 102, 0.85)',
                quantumTransition: '6s → 5d / BaCl radical band',
                spectralLines: [513, 524, 532],
                funFact: 'Traditional fireworks used toxic Barium Nitrate. Modern Green Crackers (SWAS/STAR) developed in India have banned barium to protect lungs!'
            },
            copper: {
                name: 'Copper(II) Chloride',
                formula: 'CuCl₂',
                colorName: 'Azure Sky Blue',
                hex: '#00d0ff',
                wavelength: '430 - 460 nm',
                flameRgba: 'rgba(0, 208, 255, 0.85)',
                quantumTransition: '3d → 4p / CuCl molecular emitter',
                spectralLines: [435, 452, 480],
                funFact: 'Blue is considered the "Holy Grail" of pyrotechnics! If the flame gets hotter than 1200°C, copper chloride molecules break apart and the blue color vanishes!'
            },
            sodium: {
                name: 'Sodium Nitrate',
                formula: 'NaNO₃',
                colorName: 'Golden Sunlight Yellow',
                hex: '#ffd700',
                wavelength: '589 nm (D-lines)',
                flameRgba: 'rgba(255, 215, 0, 0.9)',
                quantumTransition: '3p → 3s electronic jump',
                spectralLines: [589.0, 589.6],
                funFact: 'Sodium produces an exceptionally intense yellow flame. Even a microscopic speck of salt on a pyrotechnician’s finger will overpower other colors!'
            },
            calcium: {
                name: 'Calcium Chloride',
                formula: 'CaCl₂',
                colorName: 'Fiery Orange',
                hex: '#ff7700',
                wavelength: '600 - 620 nm',
                flameRgba: 'rgba(255, 119, 0, 0.85)',
                quantumTransition: '4s → 3d / CaOH bands',
                spectralLines: [618, 622],
                funFact: 'Calcium imparts a warm orange hue and is widely combined with strontium to produce sunset pink and peach firework bursts.'
            },
            titanium: {
                name: 'Titanium & Magnesium Flakes',
                formula: 'Ti / Mg Metal Alloy',
                colorName: 'Silver Sparkler Incandescence',
                hex: '#ffffff',
                wavelength: 'Continuous Thermal Spectrum (>2800 K)',
                flameRgba: 'rgba(255, 255, 255, 0.95)',
                quantumTransition: 'Blackbody thermal incandescence',
                spectralLines: [400, 450, 500, 550, 600, 650, 700],
                funFact: 'Unlike atomic emission, sparklers glow white through thermal incandescence! Burning metal reaches nearly 3000°C, emitting all visible frequencies at once.'
            }
        };

        this.selectedSalt = 'strontium';
        this.wireState = 'idle'; // 'idle', 'dipping', 'burning'

        this.fuels = {
            ghee: {
                name: 'Desi Cow Ghee',
                viscosity: 'Medium (Liquefies at 35°C)',
                surfaceTension: '32 mN/m',
                smokePoint: '250°C (Extremely high)',
                flameQuality: 'Golden, tranquil, zero toxic smoke',
                wickRiseRate: 0.85
            },
            mustard: {
                name: 'Cold-Pressed Mustard Oil',
                viscosity: 'High (Rich in erucic acid)',
                surfaceTension: '36 mN/m',
                smokePoint: '254°C',
                flameQuality: 'Warm bright amber, traditional mosquito repellent aroma',
                wickRiseRate: 0.72
            },
            sesame: {
                name: 'Sesame (Til) Oil',
                viscosity: 'Medium-low',
                surfaceTension: '34 mN/m',
                smokePoint: '210°C',
                flameQuality: 'Calm, steady spiritual flame recommended in ancient scriptures',
                wickRiseRate: 0.92
            },
            water: {
                name: 'Pure Water (Control)',
                viscosity: 'Low',
                surfaceTension: '72 mN/m',
                smokePoint: 'N/A (Evaporates at 100°C)',
                flameQuality: 'Cannot burn! Acts as fire extinguisher',
                wickRiseRate: 1.0
            }
        };

        this.selectedFuel = 'ghee';

        this.init();
    }

    init() {
        this.bindFlameTestEvents();
        this.bindDiyaPhysicsEvents();
        this.bindGreenCrackerEvents();
        this.updateFlameTestUI();
        this.updateDiyaPhysicsUI();
    }

    bindFlameTestEvents() {
        const saltButtons = document.querySelectorAll('.salt-selector-btn');
        saltButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                saltButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.selectedSalt = btn.getAttribute('data-salt');
                this.updateFlameTestUI();
                window.diwaliAudio.playClick();
            });
        });

        const testFlameBtn = document.getElementById('test-flame-btn');
        if (testFlameBtn) {
            testFlameBtn.addEventListener('click', () => this.performFlameTest());
        }

        const launchLabRocketBtn = document.getElementById('launch-lab-rocket-btn');
        if (launchLabRocketBtn) {
            launchLabRocketBtn.addEventListener('click', () => this.launchChemicalFirework());
        }
    }

    updateFlameTestUI() {
        const salt = this.salts[this.selectedSalt];
        if (!salt) return;

        const nameEl = document.getElementById('flame-salt-name');
        const formulaEl = document.getElementById('flame-salt-formula');
        const colorNameEl = document.getElementById('flame-color-name');
        const wavelengthEl = document.getElementById('flame-wavelength');
        const transitionEl = document.getElementById('flame-transition');
        const funFactEl = document.getElementById('flame-fun-fact');
        const petriSample = document.getElementById('petri-dish-salt-sample');

        if (nameEl) nameEl.innerText = salt.name;
        if (formulaEl) formulaEl.innerText = salt.formula;
        if (colorNameEl) {
            colorNameEl.innerText = salt.colorName;
            colorNameEl.style.color = salt.hex;
        }
        if (wavelengthEl) wavelengthEl.innerText = salt.wavelength;
        if (transitionEl) transitionEl.innerText = salt.quantumTransition;
        if (funFactEl) funFactEl.innerText = salt.funFact;
        if (petriSample) petriSample.style.backgroundColor = salt.hex;

        this.renderSpectrogram(salt);
    }

    renderSpectrogram(salt) {
        const container = document.getElementById('spectrogram-display');
        if (!container) return;

        container.innerHTML = '';
        const bar = document.createElement('div');
        bar.className = 'spectrum-base-gradient';

        // Render spectral emission lines
        salt.spectralLines.forEach(line => {
            // Visible spectrum map: 380nm (0%) to 700nm (100%)
            const percent = ((line - 380) / (700 - 380)) * 100;
            const lineEl = document.createElement('div');
            lineEl.className = 'spectral-line-marker';
            lineEl.style.left = `${Math.max(2, Math.min(98, percent))}%`;
            lineEl.style.backgroundColor = salt.hex;
            lineEl.title = `${line} nm`;
            bar.appendChild(lineEl);
        });

        container.appendChild(bar);
    }

    performFlameTest() {
        if (this.wireState !== 'idle') return;
        window.diwaliAudio.ensureContext();
        this.wireState = 'dipping';

        const wire = document.getElementById('nichrome-test-wire');
        const flame = document.getElementById('lab-bunsen-flame');
        const testBtn = document.getElementById('test-flame-btn');
        if (testBtn) testBtn.disabled = true;

        // Step 1: Dip wire into petri dish
        if (wire) wire.className = 'nichrome-wire dipping';

        setTimeout(() => {
            // Step 2: Move wire into flame
            this.wireState = 'burning';
            if (wire) wire.className = 'nichrome-wire in-flame';

            // Flame changes color
            const salt = this.salts[this.selectedSalt];
            if (flame) {
                flame.style.background = `radial-gradient(ellipse at bottom, ${salt.flameRgba} 0%, ${salt.hex} 60%, transparent 100%)`;
                flame.style.boxShadow = `0 0 45px ${salt.hex}`;
            }

            window.diwaliAudio.playSparklerCrackle();
            window.diwaliAudio.playDiyaIgnite();

            // Step 3: Return to default state after 3.5 seconds
            setTimeout(() => {
                if (wire) wire.className = 'nichrome-wire idle';
                if (flame) {
                    flame.style.background = 'radial-gradient(ellipse at bottom, rgba(50, 150, 255, 0.9) 0%, rgba(0, 100, 255, 0.6) 50%, transparent 100%)';
                    flame.style.boxShadow = '0 0 25px rgba(0, 100, 255, 0.5)';
                }
                this.wireState = 'idle';
                if (testBtn) testBtn.disabled = false;
            }, 3600);
        }, 1200);
    }

    launchChemicalFirework() {
        const salt = this.salts[this.selectedSalt];
        const canvas = document.getElementById('fireworks-canvas');
        if (!canvas || !window.fireworksApp) return;

        window.diwaliAudio.ensureContext();

        // Map chemical salt to fireworks palette
        const paletteMap = {
            strontium: 'crimson',
            barium: 'green',
            copper: 'blue',
            sodium: 'gold',
            calcium: 'crimson',
            titanium: 'gold'
        };
        const palette = paletteMap[this.selectedSalt] || 'rainbow';

        // Switch to the fireworks tab automatically
        const fireworksTabBtn = document.querySelector('.nav-tab-btn[data-tab="tab-fireworks"]');
        if (fireworksTabBtn) {
            fireworksTabBtn.click();
            window.fireworksApp.resize();
        }

        setTimeout(() => {
            const w = window.fireworksApp.width || 800;
            const h = window.fireworksApp.height || 500;
            window.fireworksApp.launchRocket(w * 0.5, h * 0.3, 'peony', palette);
        }, 150);
    }

    // 2. Physics of the Diya (Capillary Action)
    bindDiyaPhysicsEvents() {
        const fuelRadios = document.querySelectorAll('.fuel-radio-input');
        fuelRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.selectedFuel = e.target.value;
                this.updateDiyaPhysicsUI();
            });
        });

        const poreSlider = document.getElementById('wick-pore-slider');
        if (poreSlider) {
            poreSlider.addEventListener('input', () => this.updateDiyaPhysicsUI());
        }

        const tempSlider = document.getElementById('oil-temp-slider');
        if (tempSlider) {
            tempSlider.addEventListener('input', () => this.updateDiyaPhysicsUI());
        }
    }

    updateDiyaPhysicsUI() {
        const fuel = this.fuels[this.selectedFuel];
        if (!fuel) return;

        const poreSlider = document.getElementById('wick-pore-slider');
        const tempSlider = document.getElementById('oil-temp-slider');

        const poreRadius = poreSlider ? parseFloat(poreSlider.value) : 15; // micrometers
        const temperature = tempSlider ? parseFloat(tempSlider.value) : 28; // °C

        // Jurin's Law Capillary Height Formula: h = (2 * gamma * cos(theta)) / (rho * g * r)
        // Simulated values for educational clarity
        const surfaceTension = this.selectedFuel === 'water' ? 72 : 33 - (temperature * 0.08);
        const contactAngleDeg = this.selectedFuel === 'water' ? 10 : 25;
        const cosTheta = Math.cos((contactAngleDeg * Math.PI) / 180);
        const density = this.selectedFuel === 'water' ? 1.0 : 0.91; // g/cm3

        // Height in millimeters
        const h_mm = ((2 * surfaceTension * cosTheta) / (density * 9.8 * (poreRadius * 0.1))).toFixed(1);

        const hEl = document.getElementById('capillary-height-metric');
        const surfaceTensionEl = document.getElementById('fuel-surface-tension-val');
        const smokePointEl = document.getElementById('fuel-smoke-point-val');
        const flameStatusEl = document.getElementById('flame-combustion-status');
        const wickFluidColumn = document.getElementById('wick-fluid-rise-indicator');

        if (hEl) hEl.innerText = `${h_mm} mm`;
        if (surfaceTensionEl) surfaceTensionEl.innerText = `${surfaceTension.toFixed(1)} mN/m`;
        if (smokePointEl) smokePointEl.innerText = fuel.smokePoint;

        if (flameStatusEl) {
            if (this.selectedFuel === 'water') {
                flameStatusEl.innerHTML = '❌ <strong>No Combustion:</strong> Water absorbs heat of vaporization without oxidizing. Flame extinguishes!';
                flameStatusEl.style.color = '#ff6b6b';
            } else {
                flameStatusEl.innerHTML = `✅ <strong>Equilibrium Achieved:</strong> Oil vaporizes at wick tip ($T \\approx 300^\\circ\\text{C}$), feeding steady laminar flame.`;
                flameStatusEl.style.color = '#51cf66';
            }
        }

        if (wickFluidColumn) {
            const visualHeight = Math.min(100, Math.max(15, parseFloat(h_mm) * 1.8));
            wickFluidColumn.style.height = `${visualHeight}%`;
            wickFluidColumn.style.backgroundColor = this.selectedFuel === 'water' ? '#4dabf7' : '#ffd43b';
        }
    }

    // 3. Green Crackers vs Traditional Analyzer
    bindGreenCrackerEvents() {
        const toggleBtn = document.getElementById('compare-crackers-toggle');
        const modeLabel = document.getElementById('cracker-comparison-mode');
        if (!toggleBtn) return;

        let isGreen = true;
        toggleBtn.addEventListener('click', () => {
            isGreen = !isGreen;
            toggleBtn.innerText = isGreen ? 'Switch to Traditional Crackers View' : 'Switch to Green Crackers (CSIR-NEERI) View';
            if (modeLabel) {
                modeLabel.innerText = isGreen ? '🌿 CSIR-NEERI Certified Green Crackers (SWAS, STAR, SAFAL)' : '⚠️ Traditional Toxic Fireworks (Banned Barium/Lead)';
                modeLabel.style.color = isGreen ? '#51cf66' : '#ff6b6b';
            }

            const pm25El = document.getElementById('metric-pm25-bar');
            const so2El = document.getElementById('metric-so2-bar');
            const decibelEl = document.getElementById('metric-decibel-bar');
            const bariumEl = document.getElementById('metric-barium-status');

            if (pm25El) {
                pm25El.style.width = isGreen ? '32%' : '94%';
                pm25El.innerText = isGreen ? '180 µg/m³ (30-35% Reduction)' : '580 µg/m³ (Hazardous)';
                pm25El.style.backgroundColor = isGreen ? '#51cf66' : '#ff6b6b';
            }
            if (so2El) {
                so2El.style.width = isGreen ? '25%' : '88%';
                so2El.innerText = isGreen ? '35 µg/m³ (Low Sulfur)' : '140 µg/m³ (Choking Fumes)';
                so2El.style.backgroundColor = isGreen ? '#51cf66' : '#ff6b6b';
            }
            if (decibelEl) {
                decibelEl.style.width = isGreen ? '60%' : '98%';
                decibelEl.innerText = isGreen ? '105-110 dB (Auditory Safe)' : '145-160 dB (Pain Threshold)';
                decibelEl.style.backgroundColor = isGreen ? '#51cf66' : '#ff922b';
            }
            if (bariumEl) {
                bariumEl.innerHTML = isGreen ? 
                    '<strong>Zero Barium, Zero Lead, Zero Arsenic:</strong> Uses potassium nitrate + potassium perchlorate or water-releasing binders.' :
                    '<strong>Contains Toxic Heavy Metals:</strong> High levels of Barium Nitrate ($Ba(NO_3)_2$) causing respiratory paralysis.';
                bariumEl.style.color = isGreen ? '#51cf66' : '#ff6b6b';
            }

            window.diwaliAudio.playClick();
        });
    }
}

window.ScienceLab = ScienceLab;

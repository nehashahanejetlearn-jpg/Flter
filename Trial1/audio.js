/**
 * Diwali Celebration & Science Lab - Web Audio API Synthesizer
 * 100% self-contained synthesized festive soundscape and sound effects.
 * No external MP3 files needed; zero latency, offline-ready.
 */

class DiwaliAudioEngine {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.isAmbientPlaying = false;
        this.ambientNodes = [];
        this.masterGain = null;
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
        this.initialized = true;
    }

    ensureContext() {
        if (!this.initialized) this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.masterGain && this.ctx) {
            this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime, 0.05);
        }
        return this.isMuted;
    }

    // Peaceful ambient Indian drone (Tanpura/Drone + gentle temple bell chimes)
    toggleAmbientMusic(start = null) {
        this.ensureContext();
        if (start === null) {
            this.isAmbientPlaying = !this.isAmbientPlaying;
        } else {
            this.isAmbientPlaying = start;
        }

        if (this.isAmbientPlaying) {
            this.startAmbientSoundscape();
        } else {
            this.stopAmbientSoundscape();
        }
        return this.isAmbientPlaying;
    }

    startAmbientSoundscape() {
        if (!this.ctx) return;
        this.stopAmbientSoundscape();

        const now = this.ctx.currentTime;
        const ambientGain = this.ctx.createGain();
        ambientGain.gain.setValueAtTime(0, now);
        ambientGain.gain.linearRampToValueAtTime(0.18, now + 3);
        ambientGain.connect(this.masterGain);

        // Fundamental Root (Sa = C#3 / 138.59 Hz) and Fifth (Pa = G#3 / 207.65 Hz)
        const rootFreq = 138.59;
        const fifthFreq = 207.65;
        const octFreq = 277.18;

        const frequencies = [rootFreq * 0.5, rootFreq, fifthFreq, octFreq];

        frequencies.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();

            osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, now);

            // Subtle slow LFO for rich breathing drone harmonic
            const lfo = this.ctx.createOscillator();
            const lfoGain = this.ctx.createGain();
            lfo.frequency.setValueAtTime(0.15 + idx * 0.08, now);
            lfoGain.gain.setValueAtTime(1.5, now);
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);
            lfo.start(now);
            this.ambientNodes.push(lfo);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(600 + idx * 150, now);

            gain.gain.setValueAtTime(0.12 / (idx + 1), now);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ambientGain);

            osc.start(now);
            this.ambientNodes.push(osc);
        });

        this.ambientNodes.push(ambientGain);

        // Schedule periodic soothing temple bell chimes
        this.bellTimer = setInterval(() => {
            if (this.isAmbientPlaying && !this.isMuted) {
                const bellNotes = [554.37, 659.25, 830.61, 1108.73]; // Pentatonic Indian raga notes
                const note = bellNotes[Math.floor(Math.random() * bellNotes.length)];
                this.playTempleChime(note, 0.15);
            }
        }, 4500);
    }

    stopAmbientSoundscape() {
        if (this.bellTimer) {
            clearInterval(this.bellTimer);
            this.bellTimer = null;
        }
        if (this.ambientNodes.length > 0) {
            const now = this.ctx ? this.ctx.currentTime : 0;
            this.ambientNodes.forEach(node => {
                try {
                    if (node.stop) node.stop(now + 0.5);
                    if (node.disconnect) node.disconnect();
                } catch (e) {}
            });
            this.ambientNodes = [];
        }
        this.isAmbientPlaying = false;
    }

    // Traditional Bell / Ghanti Chime
    playTempleChime(freq = 880, volume = 0.3) {
        if (this.isMuted || !this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Rich metallic overtone
        const overtone = this.ctx.createOscillator();
        const overtoneGain = this.ctx.createGain();
        overtone.type = 'sine';
        overtone.frequency.setValueAtTime(freq * 2.76, now);

        gain.gain.setValueAtTime(volume, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

        overtoneGain.gain.setValueAtTime(volume * 0.3, now);
        overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

        osc.connect(gain);
        overtone.connect(overtoneGain);
        gain.connect(this.masterGain);
        overtoneGain.connect(this.masterGain);

        osc.start(now);
        overtone.start(now);
        osc.stop(now + 2.6);
        overtone.stop(now + 1.3);
    }

    // Diya lighting match strike & gentle flame ignition whoosh
    playDiyaIgnite() {
        if (this.isMuted || !this.ctx) return;
        const now = this.ctx.currentTime;

        // Match friction strike (filtered noise)
        const bufferSize = this.ctx.sampleRate * 0.15;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(2400, now);
        filter.Q.setValueAtTime(3, now);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.25, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.masterGain);
        noise.start(now);

        // Warm celestial harmonic chord for flame awakening
        [440, 554.37, 659.25].forEach((f, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, now + 0.05);

            gain.gain.setValueAtTime(0.001, now + 0.05);
            gain.gain.linearRampToValueAtTime(0.12 / (idx + 1), now + 0.2);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now + 0.05);
            osc.stop(now + 1.3);
        });
    }

    // Rocket launch whoosh
    playRocketLaunch() {
        if (this.isMuted || !this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(800 + Math.random() * 400, now + 0.8);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(300, now);
        filter.frequency.linearRampToValueAtTime(2500, now + 0.8);

        gain.gain.setValueAtTime(0.02, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.9);
    }

    // Firework burst (Boom + Bass + Crackle)
    playFireworkBurst(type = 'peony') {
        if (this.isMuted || !this.ctx) return;
        const now = this.ctx.currentTime;

        // Sub-bass thump
        const sub = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        sub.type = 'sine';
        sub.frequency.setValueAtTime(110, now);
        sub.frequency.exponentialRampToValueAtTime(30, now + 0.4);

        subGain.gain.setValueAtTime(0.4, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        sub.connect(subGain);
        subGain.connect(this.masterGain);
        sub.start(now);
        sub.stop(now + 0.55);

        // Explosive burst noise
        const duration = type === 'willow' ? 1.2 : 0.7;
        const bufferSize = Math.floor(this.ctx.sampleRate * duration);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
        }

        const burstNoise = this.ctx.createBufferSource();
        burstNoise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1600, now);
        filter.frequency.exponentialRampToValueAtTime(300, now + duration);

        const burstGain = this.ctx.createGain();
        burstGain.gain.setValueAtTime(0.35, now);
        burstGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        burstNoise.connect(filter);
        filter.connect(burstGain);
        burstGain.connect(this.masterGain);

        burstNoise.start(now);

        // Crackles tail
        if (type === 'crackle' || Math.random() > 0.4) {
            setTimeout(() => this.playCrackles(4 + Math.floor(Math.random() * 6)), 250);
        }
    }

    // Sizzling sparks for sparklers / phuljhadi
    playSparklerCrackle() {
        if (this.isMuted || !this.ctx) return;
        const now = this.ctx.currentTime;
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.08);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * (Math.random() > 0.85 ? 1 : 0.15);
        }

        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(3500, now);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        source.start(now);
    }

    // Rapid mini crackles
    playCrackles(count = 5) {
        if (this.isMuted || !this.ctx) return;
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                if (this.isMuted || !this.ctx) return;
                const now = this.ctx.currentTime;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'square';
                osc.frequency.setValueAtTime(1500 + Math.random() * 1200, now);

                gain.gain.setValueAtTime(0.09, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

                osc.connect(gain);
                gain.connect(this.masterGain);
                osc.start(now);
                osc.stop(now + 0.045);
            }, i * 40 + Math.random() * 30);
        }
    }

    // Whirling chakkar sound
    playChakkarWhirl() {
        if (this.isMuted || !this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(800, now + 1.2);
        osc.frequency.linearRampToValueAtTime(300, now + 2.5);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.15, now + 0.3);
        gain.gain.linearRampToValueAtTime(0.12, now + 2.0);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.6);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 2.7);
    }

    // Anar / Flowerpot fountain roaring whoosh
    playAnarFountain() {
        if (this.isMuted || !this.ctx) return;
        const now = this.ctx.currentTime;
        const duration = 3.2;
        const bufferSize = Math.floor(this.ctx.sampleRate * duration);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1);
        }

        const source = this.ctx.createBufferSource();
        source.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.linearRampToValueAtTime(3200, now + 1.5);
        filter.frequency.linearRampToValueAtTime(1200, now + duration);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.28, now + 0.6);
        gain.gain.linearRampToValueAtTime(0.24, now + 2.4);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        source.start(now);
    }

    // Success fan-fare for Quiz & Rangoli export
    playSuccessFanfare() {
        if (this.isMuted || !this.ctx) return;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            setTimeout(() => {
                if (this.isMuted || !this.ctx) return;
                const now = this.ctx.currentTime;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now);

                gain.gain.setValueAtTime(0.25, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

                osc.connect(gain);
                gain.connect(this.masterGain);
                osc.start(now);
                osc.stop(now + 0.75);
            }, idx * 130);
        });
    }

    // Button click click/tick
    playClick() {
        if (this.isMuted || !this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(950, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.06);
    }
}

// Global audio engine singleton
window.diwaliAudio = new DiwaliAudioEngine();

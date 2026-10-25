# 🪔 Shubh Deepawali — All-in-One Interactive Diwali Experience & Science Lab
### *A JetLearn AI Inventors & STEM Science Project*

Welcome to the **Interactive Diwali Experience & Science Lab**, an interactive web project celebrating the Festival of Lights by combining cultural heritage, sacred folklore, and authentic STEM physics & pyrotechnic chemistry!

---

## 🌟 Highlights & Key Features

### 1. 🪔 Virtual Diya Sanctuary & Sky Lanterns (`diya.js`)
* **7 Handcrafted Traditional Clay & Brass Lamps**: Featuring the Terracotta Diya of Peace, Royal Brass Lakshmi Deepam, Clay Diya of Wisdom, Panchmukhi 5-Wick Brass Lamp, and more.
* **Interactive Flaming Matchstick**: Strike a virtual matchstick with realistic smoke and flame physics to ignite wicks with authentic audio feedback.
* **Thermodynamic Flame Simulation**: Multi-layer flickering flame geometry (inner core, combustion zone, outer glow, and dynamic ambient illumination that brightens as more lamps are lit).
* **Akash Kandil (Sky Lantern Release)**: Type your personal prayer, blessing, or resolution for the new year, select a silk color, and release floating lanterns into the starry night sky.

### 2. 🎆 Night Sky Fireworks & Handheld Sparkler Simulator (`fireworks.js`)
* **Physics-Based Canvas Pyrotechnics**: Real particle velocity, gravity, atmospheric drag, and sparkling decay trails.
* **Firework Types**: Imperial Peonies, Golden Willow cascades, Saturn Rings, Crackling Palms, ground-bursting **Anar Fountains**, and spinning **Chakkars**.
* **Handheld Sparkler (Phuljhadi) Mode**: Turn the cursor into a sizzling sparkler emitting blazing sparks and smoke trails.
* **Eco-Friendly Metrics Dashboard**: Live tracker monitoring digital fireworks launched, estimating equivalent kilograms of CO₂ avoided and particulate dust saved.

### 3. 🎨 Symmetrical Kaleidoscope Rangoli Studio (`rangoli.js`)
* **Multi-Axis Radial Symmetry**: Dynamic slider supporting 4, 6, 8, 12, and 16-fold symmetry with mirror mandala reflection.
* **Authentic Festival Powder Palette**: Haldi Yellow, Kumkum Red, Gulal Pink, Peacock Blue, Sacred Basil Green, Shimmer Gold, Marigold Orange, and Rice Flour White.
* **Artistic Brushes**: Dry Powder texture, Glitter Glow brush, and Kolam Dot stamp.
* **Sacred Stencils**: Lotus, Diya, and Mandala templates.
* **PNG Export**: One-click instant high-resolution image download.

### 4. 🔬 The Science of Diwali Lab (`science-lab.js`)
* **Experiment 1 — Chemistry of Firework Colors (Flame Spectroscopy)**:
  * Interactive Bunsen burner and nichrome wire test loop.
  * Quantum emission chemistry: $\Delta E = h \cdot c / \lambda$.
  * Explore metal salts: Strontium ($Sr^{2+}$, Crimson 606 nm), Barium ($Ba^{2+}$, Green 524 nm), Copper ($Cu^{2+}$, Azure Blue 450 nm), Sodium ($Na^+$, Gold 589 nm), Calcium ($Ca^{2+}$, Orange 620 nm), and Titanium incandescence.
  * Real-time visible emission spectrogram with exact spectral lines.
  * "Launch Custom Shell": Automatically compounds your chosen metal salt into an aerial firework rocket and launches it into the sky!
* **Experiment 2 — Physics of the Diya (Capillary Action)**:
  * 200× Microscopic view of cotton wick fibers.
  * Jurin's Law capillary rise simulation: $h = \frac{2\gamma \cos\theta}{\rho g r}$.
  * Compare fuels: Desi Cow Ghee, Mustard Oil, Sesame Oil, and Pure Water (negative control).
  * Real-time adjustments for pore radius and oil temperature.
* **Experiment 3 — Green Fireworks Analyzer (CSIR-NEERI)**:
  * Interactive environmental dashboard comparing traditional pyrotechnics with green crackers: **SWAS** (Safe Water Releaser), **STAR** (Safe Thermite Cracker), and **SAFAL** (Safe Minimal Aluminum).
  * Data comparison of PM2.5 particulate matter, SO₂ gas emissions, and sound decibel safety thresholds.

### 5. 💌 Festive Diwali Greeting Card Maker (`greeting-card.js`)
* Customizable high-definition ($900 \times 600\text{ px}$) digital canvas card.
* Custom recipient, sender, and personal blessings or curated Sanskrit shlokas.
* 4 Royal Themes: Midnight Gold, Crimson Festival, Emerald Palace, and Royal Violet.
* Decorative motifs: Golden Diya, Sacred Lotus, Holy Kalash, or Burst Sparks.
* One-click download as PNG for WhatsApp, email, or print.

### 6. 📜 The 5 Days of Diwali & Sacred Lore (`story.js`)
* Interactive visual journey across the 5 sacred days:
  1. **Day 1: Dhanteras** — Lord Dhanvantari, Ayurveda, and the sacred Yama Deepam.
  2. **Day 2: Naraka Chaturdashi (Choti Diwali)** — Liberation of 16,000 souls and the dawn Abhyanga Snan bath.
  3. **Day 3: Maha Lakshmi Puja (Main Diwali)** — Lord Rama's triumphant return to Ayodhya and welcoming the Goddess of Prosperity.
  4. **Day 4: Govardhan Puja & Annakut** — Gratitude to nature and Lord Krishna's mountain miracle.
  5. **Day 5: Bhai Dooj** — The sacred eternal bond of love and protection between siblings.

### 7. 🏆 Festive Trivia Quest & Master Certificate (`quiz.js`)
* 8-question multi-disciplinary quiz combining ancient history, cultural traditions, and pyrotechnic STEM science.
* Instant animated feedback with detailed scientific and historical explanations.
* Canvas celebratory confetti explosion upon completion.
* **Personalized Certificate of Scientific Excellence**: Type your name and download an accredited, high-resolution certificate with your score, date, and golden seal!

### 8. 🎵 Pure Web Audio API Synthesizer (`audio.js`)
* 100% offline and self-contained; zero external MP3 dependencies.
* Synthesizes soothing meditative Tanpura drone harmonics, sacred temple bell chimes, matchstick strikes, rocket launches, sub-bass explosion booms, crackles, and celebratory fanfares.

---

## 🚀 How to Run Locally

You can run this project instantly in any modern web browser without installing any heavy build tools:

### Option A: Using Python (Recommended)
```bash
# In this directory:
python -m http.server 8080
```
Open your browser and navigate to:
**`http://localhost:8080`**

### Option B: Using Node.js
```bash
npx -y serve -p 8080 .
```

### Option C: Direct Browser Open
Double-click `index.html` to open directly in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari!

---

## 📁 File Structure

```text
├── index.html           # Main semantic HTML5 webpage structure
├── style.css            # Complete design system (Dark cosmic indigo, gold foil, glassmorphism)
├── audio.js             # Web Audio API sound synthesizer
├── fireworks.js         # Particle physics fireworks & sparklers engine
├── diya.js              # Virtual diya sanctuary, thermodynamics & sky lanterns
├── rangoli.js           # Multi-axis kaleidoscope rangoli studio
├── science-lab.js       # Atomic flame spectroscopy, capillary physics & green crackers
├── greeting-card.js     # Live canvas greeting card generator & exporter
├── story.js             # 5 Days of Diwali timelines & modal story reader
├── quiz.js              # Trivia quest & personalized certificate generator
├── app.js               # Master controller & ambient particle background
└── assets/
    ├── hero_banner.jpg  # Generated high-resolution Diwali festival artwork
    └── diya_altar.jpg   # Generated traditional terracotta diya altar artwork
```

---

<p align="center">
  <strong>शुभ दीपावली • May the Light of Knowledge and Joy Illuminate Your Life!</strong>
</p>

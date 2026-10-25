/**
 * Diwali Celebration & Science Lab - 5 Days of Diwali & Cultural Folklore
 * Interactive educational timelines, legends, and culinary traditions.
 */

const DIWALI_DAYS_DATA = [
    {
        day: 1,
        title: 'Dhanteras',
        sanskrit: 'धनत्रयोदशी (Dhanatrayodashi)',
        dateDescription: '13th Lunar Day of Krishna Paksha (Ashvin/Kartik)',
        icon: '🪙',
        themeColor: '#ffd700',
        summary: 'The Celebration of Auspicious Health, Prosperity, and the Emergence of Ayurveda.',
        story: `On Dhanteras, during the legendary Samudra Manthan (Churning of the Cosmic Ocean), Lord Dhanvantari—the divine physician of the gods—emerged holding the holy pot of Amrita (nectar of immortality) and sacred Ayurvedic knowledge. 
        
Families celebrate by thoroughly cleaning and decorating their homes, buying new metal utensils, brass items, or gold and silver coins to invite lasting prosperity. At dusk, the sacred 'Yama Deepam' is lit facing south to pray to Lord Yama for the health, protection, and longevity of family members.`,
        rituals: [
            'Thorough deep cleaning of home and entrances',
            'Purchasing brass utensils, copper vessels, or gold/silver',
            'Lighting 13 earthen diyas, especially the southern Yama Deepam',
            'Prayers to Lord Kubera (Treasurer of Heavens) & Goddess Lakshmi'
        ],
        delicacy: 'Naivedya of whole wheat halwa, dry fruits, and coriander seeds mixed with jaggery.'
    },
    {
        day: 2,
        title: 'Naraka Chaturdashi',
        sanskrit: 'छोटी दिवाली (Choti Diwali)',
        dateDescription: '14th Lunar Day (Kali Chaudas)',
        icon: '⚔️',
        themeColor: '#ff5722',
        summary: 'Triumph of Divine Valor Over Darkness & Liberation of 16,000 Captives.',
        story: `This day commemorates the epic triumph of Lord Krishna and his consort Satyabhama over the tyrannical demon king Narakasura of Pragjyotishpura. Narakasura had terrorized the three realms and imprisoned 16,000 celestial women. 

Before his defeat, Narakasura had a moment of spiritual awakening and requested that his death be celebrated as an occasion of jubilant light rather than mourning. To wash away the fatigue of battle and negative energies, Lord Krishna was anointed with fragrant herbal oils—originating the cherished dawn 'Abhyanga Snan' ritual.`,
        rituals: [
            'Abhyanga Snan: Sacred herbal oil and fragrant Ubtan scrub before sunrise',
            'Breaking of the bitter Karit fruit underfoot to symbolize crushing evil',
            'Drawing ornate rangolis at doorways with vibrant dry powders',
            'Lighting 14 diyas around the house'
        ],
        delicacy: 'Freshly fried hot Poha (flattened rice), crispy Chakli, and sweet Shankarpali.'
    },
    {
        day: 3,
        title: 'Lakshmi Puja (Main Diwali)',
        sanskrit: 'दीपावली (Maha Deepawali)',
        dateDescription: 'Amavasya (New Moon Night of Kartik)',
        icon: '🪔',
        themeColor: '#e63946',
        summary: 'The Night of Light: Lord Rama’s Return to Ayodhya & Welcoming Goddess Lakshmi.',
        story: `The darkest new moon night (Amavasya) of the entire autumn season is transformed into the brightest night of the year! 

Two monumental legends converge on this day: First, Lord Rama, Mata Sita, and Lakshmana returned triumphantly to their kingdom of Ayodhya after 14 years of forest exile and the defeat of the ten-headed demon king Ravana. To guide their chariot home in pitch darkness, the joy-filled citizens lit hundreds of thousands of terracotta oil lamps (diyas), creating an unbroken pathway of golden light.

Simultaneously, it is celebrated as the auspicious birth and incarnation day of Goddess Lakshmi from the cosmic milky ocean. Devotees leave their doors open, light diyas at every threshold, and perform the grand Lakshmi-Ganesha puja to invite inner peace, wisdom, and material abundance.`,
        rituals: [
            'Evening grand Lakshmi, Ganesha, and Saraswati Puja',
            'Lighting hundreds of mustard oil and ghee diyas',
            'Opening new accounting and ledger books (Chopda Pujan) for businesses',
            'Exchange of festive gifts, sweets, and burst of sparkling fireworks'
        ],
        delicacy: 'Mouth-watering Kaju Katli, golden Besan Ladoo, Gujiya, and fragrant Kheer.'
    },
    {
        day: 4,
        title: 'Govardhan Puja & Annakut',
        sanskrit: 'गोवर्धन पूजा / अन्नकूट',
        dateDescription: 'Pratipada (First day of Shukla Paksha)',
        icon: '⛰️',
        themeColor: '#06d6a0',
        summary: 'Gratitude to Mother Nature & Lord Krishna’s Govardhan Mountain Miracle.',
        story: `In the sacred town of Vrindavan, the residents traditionally made lavish sacrifices to Lord Indra, the deity of rain. Young Krishna taught the cowherds and villagers that they should instead honor the Govardhan mountain, trees, and fertile soil that directly provided pasture and sustenance to their cattle and families.

When an enraged Indra sent torrential storms and deluges to submerge the village, Lord Krishna lifted the colossal Govardhan mountain upon his little finger like a giant umbrella for seven days and nights, protecting every living creature. In joyful thanksgiving, the community prepared an 'Annakut' (Mountain of Food) consisting of 56 unique delicacies (Chhappan Bhog) for Krishna.`,
        rituals: [
            'Sculpting miniature Govardhan hillocks using clean cow dung or clay, decorated with flowers',
            'Preparation of Annakut: Large mountain of 56 pure vegetarian delicacies',
            'Gau Puja: Worshipping cows and calves with garlands and fresh grass',
            'Beginning of the traditional Gujarati New Year (Bestu Varas)'
        ],
        delicacy: 'Chhappan Bhog: Panchamrit, Kadhi, Puri, spicy vegetable curries, and Malpua.'
    },
    {
        day: 5,
        title: 'Bhai Dooj',
        sanskrit: 'यम द्वितीया (Bhai Tika)',
        dateDescription: 'Dwitiya (Second day of Shukla Paksha)',
        icon: '❤️',
        themeColor: '#b5179e',
        summary: 'The Eternal Bond of Love, Protection, and Care Between Siblings.',
        story: `On this holy day, Lord Yama (the deity of justice and the afterlife) visited his loving sister, the sacred river goddess Yamuna (Yami). Overjoyed by her brother’s arrival after centuries of separation, Yamuna welcomed him with fragrant flower garlands, prepared his favorite sumptuous feast, and applied a protective vermilion tilak upon his forehead.

Touched by her pure affection, Lord Yama granted her a boon: any brother who visits his sister on this day, receives her holy tilak, and shares a meal shall be blessed with protection from untimely distress, and their sibling bond shall remain immortal.`,
        rituals: [
            'Sisters applying holy vermilion and rice tilak on their brothers’ foreheads',
            'Aarti performed with a brass diya for the brother’s health and prosperity',
            'Sisters cooking favorite homemade feast for their brothers',
            'Brothers bestowing thoughtful gifts and promises of lifelong care'
        ],
        delicacy: 'Basundi, traditional puran poli, saffron shrikhand, and sweet coconut laddoos.'
    }
];

class StoryManager {
    constructor() {
        this.init();
    }

    init() {
        this.renderDaysTimeline();
        this.bindModalEvents();
    }

    renderDaysTimeline() {
        const container = document.getElementById('story-days-timeline');
        if (!container) return;

        container.innerHTML = '';
        DIWALI_DAYS_DATA.forEach(d => {
            const card = document.createElement('div');
            card.className = 'day-story-card';
            card.style.borderTop = `4px solid ${d.themeColor}`;

            card.innerHTML = `
                <div class="day-card-header">
                    <span class="day-badge" style="background:${d.themeColor}22; color:${d.themeColor}">
                        Day ${d.day}
                    </span>
                    <span class="day-icon">${d.icon}</span>
                </div>
                <h3>${d.title}</h3>
                <h5 class="day-sanskrit">${d.sanskrit}</h5>
                <p class="day-summary">${d.summary}</p>
                <div class="day-card-footer">
                    <button class="open-story-modal-btn" data-day="${d.day}">
                        📖 Read Sacred Legend
                    </button>
                </div>
            `;

            container.appendChild(card);
        });

        // Add click events
        container.querySelectorAll('.open-story-modal-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const dayNum = parseInt(btn.getAttribute('data-day'), 10);
                this.openModal(dayNum);
            });
        });
    }

    openModal(dayNum) {
        const data = DIWALI_DAYS_DATA.find(d => d.day === dayNum);
        if (!data) return;

        const modal = document.getElementById('story-detail-modal');
        const modalBody = document.getElementById('story-modal-content');
        if (!modal || !modalBody) return;

        window.diwaliAudio.playTempleChime(783.99, 0.25);

        modalBody.innerHTML = `
            <div class="modal-day-badge" style="background:${data.themeColor}33; color:${data.themeColor}">
                Day ${data.day} of Diwali
            </div>
            <h2 style="color:${data.themeColor}; margin-top:8px;">${data.icon} ${data.title}</h2>
            <h4 style="color:#ffd700; font-family:'Cinzel', serif;">${data.sanskrit}</h4>
            <p style="font-size:0.9rem; color:#aaa; margin-bottom:16px;">${data.dateDescription}</p>

            <div class="modal-section-box">
                <h4>📜 The Sacred Legend & Folklore</h4>
                <p style="white-space:pre-line; line-height:1.7;">${data.story}</p>
            </div>

            <div class="modal-section-box" style="margin-top:16px;">
                <h4>✨ Key Traditions & Rituals</h4>
                <ul style="padding-left:20px; line-height:1.6;">
                    ${data.rituals.map(r => `<li>${r}</li>`).join('')}
                </ul>
            </div>

            <div class="modal-section-box" style="margin-top:16px; border-left:4px solid #ffbe33;">
                <h4>🍬 Festive Sweet & Feast</h4>
                <p>${data.delicacy}</p>
            </div>
        `;

        modal.classList.add('active');
    }

    bindModalEvents() {
        const modal = document.getElementById('story-detail-modal');
        const closeBtn = document.getElementById('close-story-modal-btn');

        if (closeBtn && modal) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                window.diwaliAudio.playClick();
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }
    }
}

window.StoryManager = StoryManager;

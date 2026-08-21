// fly_box.js - Virtual Fly Box & Master Aquatic Insect Hatch Selector Guide
// Comprehensive Australian & Global Entomology Engine for Fly Anglers

const AQUATIC_INSECT_HATCHES = [
    // --- 1. MAYFLIES (Ephemeroptera) ---
    {
        id: "hatch_highland_mayfly",
        name: "Highland Mayfly / Kosciuszko Dun",
        order: "Mayfly (Ephemeroptera)",
        orderKey: "mayfly",
        months: [10, 11, 12, 1, 2, 3, 4], // Oct - Apr (Peak Nov-Feb)
        tempMin: 10,
        tempMax: 18,
        habitat: "Cold mountain freestone rivers & highland alpine streams (Snowy Mountains, Vic High Country, Tassie)",
        peakTime: "Midday to early afternoon (11:00 AM - 3:30 PM)",
        icon: "🦟",
        stages: [
            { stage: "Nymph", pattern: "Pheasant Tail Beadhead / Copper John", sizes: "#14 - #18", tippet: "5X Fluorocarbon", tip: "Euro-nymph deep gravel runs and seamlines before midday emergence." },
            { stage: "Emerger / Dun", pattern: "Kosciuszko Dun / Parachute Adams", sizes: "#12 - #16", tippet: "5X - 6X Nylon", tip: "Dead-drift on surface foam lines as duns ride the water drying their wings." },
            { stage: "Spinner (Spent)", pattern: "Rusty Spinner / Sherry Spinner", sizes: "#14 - #16", tippet: "6X Nylon", tip: "Evening dusk falls when spent females drop onto glassy tailouts." }
        ]
    },
    {
        id: "hatch_blue_winged_olive",
        name: "Blue-Winged Olive (BWO / Baetis)",
        order: "Mayfly (Ephemeroptera)",
        orderKey: "mayfly",
        months: [3, 4, 5, 8, 9, 10], // Autumn & Early Spring
        tempMin: 6,
        tempMax: 14,
        habitat: "Cold tailwaters, spring creeks, and cloudy overcast autumn river runs",
        peakTime: "Overcast / Drizzly afternoons (1:00 PM - 4:00 PM)",
        icon: "🦟",
        stages: [
            { stage: "Nymph", pattern: "Micro Pheasant Tail / Frenchie", sizes: "#16 - #20", tippet: "6X Fluorocarbon", tip: "Fish slow drift along quiet riverbank eddies." },
            { stage: "Dun", pattern: "Parachute BWO / Olive Adams", sizes: "#16 - #20", tippet: "6X Nylon", tip: "Target dimpling trout sipping tiny olives on drizzly afternoons." }
        ]
    },
    {
        id: "hatch_march_brown",
        name: "March Brown / Scruffy Mayfly",
        order: "Mayfly (Ephemeroptera)",
        orderKey: "mayfly",
        months: [2, 3, 4], // Feb - Apr
        tempMin: 12,
        tempMax: 19,
        habitat: "Moderate to fast rocky streams, pocket water, and boulder runs",
        peakTime: "Early afternoon warm sunny stretches",
        icon: "🪰",
        stages: [
            { stage: "Nymph", pattern: "Gold Ribbed Hare's Ear", sizes: "#12 - #14", tippet: "4X - 5X Fluoro", tip: "Heavy bead nymph bounced through fast pocket water." },
            { stage: "Dun", pattern: "March Brown Dry / Royal Wulff", sizes: "#12 - #14", tippet: "5X Nylon", tip: "High-floating bushy attractor dry fly skated over riffles." }
        ]
    },

    // --- 2. CADDISFLIES / SEDGES (Trichoptera) ---
    {
        id: "hatch_snowy_caddis",
        name: "Snowflake Caddis / Evening Sedge",
        order: "Caddis (Trichoptera)",
        orderKey: "caddis",
        months: [9, 10, 11, 12, 1, 2, 3, 4, 5], // Sep - May
        tempMin: 11,
        tempMax: 21,
        habitat: "Fast-flowing riffles, gravel river beds, and oxygenated pocket water",
        peakTime: "Dusk / Twilight evening rise (6:00 PM - 8:30 PM)",
        icon: "🦋",
        stages: [
            { stage: "Larva (Case-builder)", pattern: "Peeping Caddis / Green Hydropsyche", sizes: "#12 - #16", tippet: "4X - 5X Fluoro", tip: "Dead-drift along bottom rocks where caddis larvae cling." },
            { stage: "Pupa / Emerger", pattern: "Caddis Pupa / Klinkhamer Olive", sizes: "#14 - #16", tippet: "5X Nylon", tip: "Swing fly near surface just before dark as pupae ascend." },
            { stage: "Adult", pattern: "Elk Hair Caddis / Goddard Sedge", sizes: "#12 - #16", tippet: "5X Nylon", tip: "Skate or twitch fly across current to trigger predatory splash rises." }
        ]
    },

    // --- 3. MIDGES / CHIRONOMIDS (Diptera) ---
    {
        id: "hatch_chironomid_midge",
        name: "Bloodworm & Chironomid Midge",
        order: "Midge (Diptera)",
        orderKey: "midge",
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // All 12 Months
        tempMin: 2,
        tempMax: 24,
        habitat: "Stillwater lakes, hydro dams (Eucumbene, Jindabyne, Great Lake), and slow river tailwaters",
        peakTime: "Glassy mornings (6:30 AM - 10:00 AM) & dead-calm winter days",
        icon: "🪰",
        stages: [
            { stage: "Larva (Bloodworm)", pattern: "Red Thread Bloodworm / San Juan Worm", sizes: "#14 - #18", tippet: "5X - 6X Fluoro", tip: "Suspend under strike indicator 1 foot off mud lakebed." },
            { stage: "Pupa (Buzzer)", pattern: "Zebra Midge (Black/Silver) / Buzzer", sizes: "#18 - #22", tippet: "6X - 7X Fluoro", tip: "Slow static retrieve with micro-twitches." },
            { stage: "Adult (Cluster)", pattern: "Griffith's Gnat / Micro Parachute", sizes: "#18 - #22", tippet: "6X - 7X Nylon", tip: "Fish directly in surface film during midge balling clusters." }
        ]
    },

    // --- 4. STONEFLIES (Plecoptera) ---
    {
        id: "hatch_golden_stonefly",
        name: "Golden Stonefly / Giant Stonefly",
        order: "Stonefly (Plecoptera)",
        orderKey: "stonefly",
        months: [10, 11, 12, 1], // Oct - Jan
        tempMin: 9,
        tempMax: 17,
        habitat: "Turbulent boulder-strewn alpine rivers and torrential rapids",
        peakTime: "Morning crawler migrations and late afternoon egg laying",
        icon: "🦗",
        stages: [
            { stage: "Nymph (Crawler)", pattern: "Kaufmann Stone / 20-Incher Nymph", sizes: "#6 - #10", tippet: "3X - 4X Fluoro", tip: "Heavy tungsten anchor nymph bouncing across river bottom boulders." },
            { stage: "Adult", pattern: "Stimulator (Orange/Yellow) / Golden Stone", sizes: "#6 - #10", tippet: "4X Nylon", tip: "High-floating hopper-dropper dry fly that supports heavy nymphs." }
        ]
    },

    // --- 5. TERRESTRIALS (Land-born Insects) ---
    {
        id: "hatch_gum_beetle",
        name: "Australian Gum Beetle & Red Tag",
        order: "Terrestrial (Coleoptera)",
        orderKey: "terrestrial",
        months: [11, 12, 1, 2, 3], // Nov - Mar (Australian Summer)
        tempMin: 16,
        tempMax: 30,
        habitat: "Tree-lined river banks, overhanging eucalyptus boughs, and mountain lakes",
        peakTime: "Hot, windy afternoons when beetles get blown onto water (1:00 PM - 5:30 PM)",
        icon: "🪲",
        stages: [
            { stage: "Fallen Beetle", pattern: "Gum Beetle Foam / Red Tag Dry", sizes: "#12 - #16", tippet: "5X Nylon", tip: "Cast tight under overhanging eucalyptus gum trees with distinct 'plop' landing." }
        ]
    },
    {
        id: "hatch_grasshopper_cicada",
        name: "Summer Grasshopper & Bush Cicada",
        order: "Terrestrial (Orthoptera)",
        orderKey: "terrestrial",
        months: [12, 1, 2, 3], // Dec - Mar
        tempMin: 18,
        tempMax: 34,
        habitat: "Grassy meadow stream banks, lowland rivers, and warmwater native bass rivers",
        peakTime: "Breezy sunny afternoons (12:00 PM - 6:00 PM)",
        icon: "🦗",
        stages: [
            { stage: "Adult Terrestrial", pattern: "Foam Hopper / Cicada Bugger", sizes: "#6 - #10", tippet: "3X - 4X Nylon", tip: "Pound banks within 6 inches of grass edges; twitch once every 10 seconds." }
        ]
    },

    // --- 6. FORAGE / MINNOWS, MUDYES & CRUSTACEANS ---
    {
        id: "hatch_mudeye_dragonfly",
        name: "Australian Mudeye (Dragonfly Nymph)",
        order: "Forage & Odonata",
        orderKey: "forage",
        months: [11, 12, 1, 2, 3, 4], // Nov - Apr
        tempMin: 13,
        tempMax: 24,
        habitat: "Weed beds, drowned timber, hydro dams, and reedy lake margins",
        peakTime: "Nightfall, twilight, and overcast dawn migrations",
        icon: "🦎",
        stages: [
            { stage: "Migrating Nymph", pattern: "Mudeye Foam / Fur Mudeye", sizes: "#8 - #10", tippet: "4X Fluoro", tip: "Slow figure-eight retrieve across weed beds 2 feet below surface." }
        ]
    },
    {
        id: "hatch_baitfish_minnow",
        name: "Galaxias Minnow / Smelt / Yabby",
        order: "Forage & Baitfish",
        orderKey: "forage",
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // Year-round
        tempMin: 4,
        tempMax: 28,
        habitat: "Deep river pools, estuary drop-offs, and lake shorelines",
        peakTime: "Low light dawn, dusk, and cloudy chop",
        icon: "🐟",
        stages: [
            { stage: "Baitfish / Yabby", pattern: "Woolly Bugger (Olive/Black) / Mrs Simpson", sizes: "#4 - #8", tippet: "2X - 4X Fluoro", tip: "Strip aggressively near undercut banks or deep drop-off shelves." }
        ]
    }
];

const DEFAULT_FLY_PATTERNS = [
    // --- DRY FLIES ---
    { id: "fly_gum_beetle", name: "Gum Beetle Foam", category: "Dry Fly", region: "Australia", seasons: [11, 12, 1, 2, 3], hookSizes: ["#12", "#14", "#16"], icon: "🪲", description: "Essential Australian terrestrial pattern during summer eucalyptus beetle falls on mountain streams.", rating: 5 },
    { id: "fly_kosciusko_mayfly", name: "Kosciuszko Dun (Mayfly)", category: "Dry Fly", region: "Australia", seasons: [10, 11, 12, 1, 2, 3, 4], hookSizes: ["#12", "#14"], icon: "🦟", description: "Iconic Australian highland rivers mayfly dun pattern. Exceptional on Snowy & Victorian alpine waters.", rating: 5 },
    { id: "fly_snowflake_caddis", name: "Snowflake Caddis", category: "Dry Fly", region: "Australia", seasons: [9, 10, 11, 12, 1, 2, 3, 4], hookSizes: ["#14", "#16"], icon: "🦋", description: "Triggers aggressive trout strikes during evening caddis hatches on fast riffles.", rating: 4 },
    { id: "fly_parachute_adams", name: "Parachute Adams", category: "Dry Fly", region: "Global", seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], hookSizes: ["#14", "#16", "#18"], icon: "🪰", description: "The world's #1 dry fly pattern. High-visibility post mimics virtually any mayfly dun.", rating: 5 },
    { id: "fly_elk_caddis", name: "Elk Hair Caddis", category: "Dry Fly", region: "Global", seasons: [9, 10, 11, 12, 1, 2, 3, 4], hookSizes: ["#12", "#14", "#16"], icon: "🦋", description: "High-floating caddis adult pattern for skittering across pocket water and fast runs.", rating: 5 },
    { id: "fly_royal_wulff", name: "Royal Wulff", category: "Dry Fly", region: "Global", seasons: [10, 11, 12, 1, 2, 3], hookSizes: ["#10", "#12", "#14"], icon: "🪶", description: "High buoyancy attractor pattern for rough mountain water and rapid currents.", rating: 5 },
    { id: "fly_cicada_hopper", name: "Foam Grasshopper / Cicada", category: "Dry Fly", region: "Australia", seasons: [12, 1, 2, 3], hookSizes: ["#6", "#8", "#10"], icon: "🦗", description: "High-buoyancy foam terrestrial for loud plop landings that draw explosive trout & bass strikes.", rating: 5 },
    { id: "fly_red_tag", name: "Red Tag Dry", category: "Dry Fly", region: "Australia & UK", seasons: [10, 11, 12, 1, 2, 3], hookSizes: ["#12", "#14", "#16"], icon: "🪲", description: "Classic Australian beetle and general terrestrial attractor. Deadly on brown trout.", rating: 5 },

    // --- NYMPHS ---
    { id: "fly_pheasant_tail", name: "Pheasant Tail Nymph (Tungsten)", category: "Nymph", region: "Global", seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], hookSizes: ["#14", "#16", "#18"], icon: "🪱", description: "Deadly nymph imitation representing mayfly nymphs. Must-have for French & Euro nymphing.", rating: 5 },
    { id: "fly_hare_ear", name: "Gold Ribbed Hare's Ear", category: "Nymph", region: "Global", seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], hookSizes: ["#12", "#14", "#16"], icon: "🪱", description: "Buggy, fuzzy nymph profile mimicking caddis larvae and general aquatic bugs.", rating: 5 },
    { id: "fly_copper_john", name: "Copper John (Brass/Red)", category: "Nymph", region: "Global", seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], hookSizes: ["#14", "#16"], icon: "🪲", description: "Fast-sinking wire-bodied nymph designed to plunge down quickly into deep river pools.", rating: 4 },
    { id: "fly_zebra_midge", name: "Zebra Midge (Black/Silver)", category: "Nymph", region: "Global", seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], hookSizes: ["#18", "#20", "#22"], icon: "🪰", description: "Small glass-bead midge pupa pattern. Unbeatable for quiet trout lakes and winter tailwaters.", rating: 5 },
    { id: "fly_mudeye", name: "Australian Mudeye (Dragonfly Nymph)", category: "Nymph", region: "Australia", seasons: [11, 12, 1, 2, 3, 4], hookSizes: ["#8", "#10"], icon: "🦎", description: "Deadly nocturnal & dusk pattern for monster brown trout in Tasmanian & Snowy hydro lakes.", rating: 5 },

    // --- STREAMERS & SALTWATER ---
    { id: "fly_woolly_bugger_olive", name: "Woolly Bugger (Olive / Gold Bead)", category: "Streamer", region: "Global", seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], hookSizes: ["#6", "#8", "#10"], icon: "🪶", description: "Imitates yabbies, galaxias baitfish, and mudeyes. The undisputed #1 streamer worldwide.", rating: 5 },
    { id: "fly_clouser_minnow", name: "Clouser Minnow (Chartreuse/White)", category: "Saltwater", region: "Australia & Global", seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], hookSizes: ["#2", "#4", "#1/0"], icon: "🐟", description: "Dumbbell-eyed lead fly for Flathead, Australian Salmon, Bass, Trevally, and Barramundi.", rating: 5 },
    { id: "fly_bream_shrimp", name: "Estuary Glass Shrimp", category: "Saltwater", region: "Australia", seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], hookSizes: ["#6", "#8"], icon: "🦐", description: "Ultra-realistic shrimp pattern for sight-casting to Bream, Whiting, and Flathead on sand flats.", rating: 5 },
    { id: "fly_surf_candy", name: "Epoxy Surf Candy / Deceiver", category: "Saltwater", region: "Australia & Global", seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], hookSizes: ["#2", "#1/0", "#2/0"], icon: "🦑", description: "Indestructible clear epoxy baitfish pattern for Australian Salmon, Kingfish, Tailor, and GTs.", rating: 5 },
    { id: "fly_crazy_charlie", name: "Crazy Charlie (Pink/Tan)", category: "Saltwater", region: "Global", seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], hookSizes: ["#4", "#6"], icon: "🦐", description: "Legendary tropical flats fly for Bonefish, Permit, and Estuary Whiting.", rating: 5 }
];

const FlyBoxApp = {
    flies: [],
    hatchFilters: {
        month: new Date().getMonth() + 1,
        order: 'all',
        tempBracket: 'all'
    },

    async init() {
        this.loadFliesFromStorage();
        this.renderFlyBoxUI();
        this.renderHatchGuideUI();
    },

    loadFliesFromStorage() {
        const raw = localStorage.getItem('user_fly_box');
        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    this.flies = parsed;
                } else {
                    this.flies = [...DEFAULT_FLY_PATTERNS];
                    this.saveFliesToStorage();
                }
            } catch (e) {
                this.flies = [...DEFAULT_FLY_PATTERNS];
                this.saveFliesToStorage();
            }
        } else {
            this.flies = [...DEFAULT_FLY_PATTERNS];
            this.saveFliesToStorage();
        }
    },

    saveFliesToStorage() {
        localStorage.setItem('user_fly_box', JSON.stringify(this.flies));
    },

    addFly(flyObj) {
        flyObj.id = 'fly_' + Date.now();
        this.flies.unshift(flyObj);
        this.saveFliesToStorage();
        this.renderFlyBoxUI();
        if (window.showSyncToast) window.showSyncToast(`🪰 Added "${flyObj.name}" to your Virtual Fly Box!`);
        else alert(`Added "${flyObj.name}" to your Virtual Fly Box!`);
        if (window.populateFlyDropdowns) window.populateFlyDropdowns();
    },

    quickAddFromHatch(patternName, category, hookSize, desc) {
        const existing = this.flies.find(f => f.name.toLowerCase() === patternName.toLowerCase());
        if (existing) {
            alert(`"${patternName}" is already in your fly box!`);
            return;
        }

        const iconMap = {
            'Dry Fly': '🦟',
            'Nymph': '🪱',
            'Streamer': '🪶',
            'Saltwater': '🦐'
        };

        const newFly = {
            id: 'fly_' + Date.now(),
            name: patternName,
            category: category || 'Dry Fly',
            region: 'Hatch Recommended',
            seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            hookSizes: [hookSize || "#14"],
            icon: iconMap[category] || '🪰',
            description: desc || 'Recommended aquatic hatch imitation pattern.',
            rating: 5
        };

        this.addFly(newFly);
    },

    deleteFly(flyId) {
        if (confirm("Are you sure you want to remove this fly from your fly box?")) {
            this.flies = this.flies.filter(f => f.id !== flyId);
            this.saveFliesToStorage();
            this.renderFlyBoxUI();
            if (window.populateFlyDropdowns) window.populateFlyDropdowns();
        }
    },

    renderFlyBoxUI(filterCategory = 'all') {
        const container = document.getElementById('flybox-grid-container');
        if (!container) return;

        let displayFlies = this.flies;
        if (filterCategory !== 'all') {
            displayFlies = displayFlies.filter(f => f.category.toLowerCase() === filterCategory.toLowerCase());
        }

        if (displayFlies.length === 0) {
            container.innerHTML = `<p class="placeholder-text" style="grid-column: 1/-1;">No flies found in this compartment. Click "+ Add New Fly" to stock your fly box!</p>`;
            return;
        }

        container.innerHTML = displayFlies.map(fly => `
            <div class="card glass fly-card" style="border-top: 3px solid var(--accent-teal); position: relative; padding: 16px;">
                <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 8px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 32px;">${fly.icon || '🪰'}</span>
                        <div>
                            <h4 style="margin: 0; font-size: 15px; color: var(--text-primary);">${fly.name}</h4>
                            <span class="badge" style="background: rgba(100, 255, 218, 0.12); color: var(--accent-teal); font-size: 10px; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-top: 4px;">${fly.category}</span>
                            ${fly.region ? `<span class="badge" style="background: rgba(0, 210, 255, 0.12); color: var(--accent-blue); font-size: 10px; padding: 2px 6px; border-radius: 4px; margin-left: 4px;">${fly.region}</span>` : ''}
                        </div>
                    </div>
                    <button class="btn btn-sm btn-danger" onclick="FlyBoxApp.deleteFly('${fly.id}')" style="padding: 4px 8px; font-size: 11px;">&times;</button>
                </div>
                <p style="font-size: 12px; color: var(--text-secondary); margin: 8px 0; line-height: 1.4;">${fly.description || ''}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; border-top: 1px dashed rgba(255,255,255,0.06); padding-top: 8px; font-size: 11px; color: var(--text-secondary);">
                    <div>🎣 Hook Sizes: <strong style="color: var(--text-primary);">${Array.isArray(fly.hookSizes) ? fly.hookSizes.join(', ') : fly.hookSizes}</strong></div>
                    <div>⭐ Rating: <strong style="color: var(--accent-orange);">${'★'.repeat(fly.rating || 5)}</strong></div>
                </div>
            </div>
        `).join('');
    },

    // --- Master Hatch Guide Engine ---
    renderHatchGuideUI() {
        const container = document.getElementById('hatch-guide-cards-container');
        if (!container) return;

        const { month, order, tempBracket } = this.hatchFilters;

        let filtered = AQUATIC_INSECT_HATCHES.filter(hatch => {
            // 1. Month match
            const matchesMonth = month === 'all' || hatch.months.includes(parseInt(month));

            // 2. Order match
            const matchesOrder = order === 'all' || hatch.orderKey === order;

            // 3. Temp bracket match
            let matchesTemp = true;
            if (tempBracket === 'cold') matchesTemp = hatch.tempMin < 10;
            else if (tempBracket === 'spring') matchesTemp = hatch.tempMin <= 14 && hatch.tempMax >= 10;
            else if (tempBracket === 'prime') matchesTemp = hatch.tempMin <= 18 && hatch.tempMax >= 13;
            else if (tempBracket === 'summer') matchesTemp = hatch.tempMax >= 18;

            return matchesMonth && matchesOrder && matchesTemp;
        });

        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 30px; background: rgba(0,0,0,0.2); border-radius: 12px; border: 1px dashed var(--border-color);">
                    <span style="font-size: 36px; display: block; margin-bottom: 8px;">❄️</span>
                    <h4 style="margin: 0; color: var(--text-primary);">No active insect hatches matching selected filters</h4>
                    <p style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">Try switching to "All Months" or selecting "Midges & Chironomids" which hatch year-round.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(hatch => `
            <div class="card glass shadow-lg" style="border-left: 4px solid var(--accent-teal); padding: 18px; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 8px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 32px;">${hatch.icon}</span>
                            <div>
                                <h3 style="margin: 0; font-size: 16px; color: var(--text-primary);">${hatch.name}</h3>
                                <span style="font-size: 11.5px; color: var(--accent-teal); font-weight: 600;">${hatch.order}</span>
                            </div>
                        </div>
                        <span class="badge" style="background: rgba(0, 210, 255, 0.12); color: var(--accent-blue); font-size: 10.5px;">
                            🌡️ ${hatch.tempMin}°C - ${hatch.tempMax}°C
                        </span>
                    </div>

                    <div style="font-size: 11.5px; color: var(--text-secondary); margin-bottom: 12px; line-height: 1.4;">
                        📍 <b>Habitat:</b> ${hatch.habitat}<br>
                        ⏰ <b>Peak Activity:</b> <span style="color: var(--text-primary); font-weight: 600;">${hatch.peakTime}</span>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
                        ${hatch.stages.map(st => `
                            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 8px 10px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                                    <strong style="font-size: 12px; color: var(--accent-teal);">${st.stage}: ${st.pattern}</strong>
                                    <span style="font-size: 10px; color: var(--text-secondary);">${st.sizes} • ${st.tippet}</span>
                                </div>
                                <div style="font-size: 11px; color: #cbd5e1; line-height: 1.3;">
                                    🎯 ${st.tip}
                                </div>
                                <div style="margin-top: 6px; text-align: right;">
                                    <button class="btn btn-glass btn-sm" style="font-size: 10.5px; padding: 2px 8px;" onclick="FlyBoxApp.quickAddFromHatch('${st.pattern.split('/')[0].trim()}', '${st.stage.includes('Nymph') ? 'Nymph' : st.stage.includes('Larva') ? 'Nymph' : st.stage.includes('Dun') || st.stage.includes('Adult') || st.stage.includes('Spinner') ? 'Dry Fly' : 'Streamer'}', '${st.sizes.split('-')[0].trim()}', '${st.tip}')">
                                        ➕ Add to My Fly Box
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    },

    updateHatchFilters(key, val) {
        this.hatchFilters[key] = val;
        this.renderHatchGuideUI();
    },

    autoSyncCurrentRiverConditions() {
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        
        let temp = 16;
        if (window.AppState && window.AppState.weatherData && window.AppState.weatherData.current && window.AppState.weatherData.current.temp) {
            temp = window.AppState.weatherData.current.temp;
        }

        let tempBracket = 'prime';
        if (temp < 10) tempBracket = 'cold';
        else if (temp <= 14) tempBracket = 'spring';
        else if (temp <= 19) tempBracket = 'prime';
        else tempBracket = 'summer';

        this.hatchFilters.month = currentMonth;
        this.hatchFilters.order = 'all';
        this.hatchFilters.tempBracket = tempBracket;

        const monthSelect = document.getElementById('hatch-filter-month');
        const orderSelect = document.getElementById('hatch-filter-order');
        const tempSelect = document.getElementById('hatch-filter-temp');

        if (monthSelect) monthSelect.value = String(currentMonth);
        if (orderSelect) orderSelect.value = 'all';
        if (tempSelect) tempSelect.value = tempBracket;

        this.renderHatchGuideUI();
        if (window.showSyncToast) window.showSyncToast(`🌊 Auto-synced with live stream conditions (Month: ${now.toLocaleDateString(undefined, {month:'short'})}, Air/Water: ~${temp}°C)!`);
        else alert(`Auto-synced with live stream conditions (Month: ${now.toLocaleDateString(undefined, {month:'short'})}, Air/Water: ~${temp}°C)!`);
    },

    renderHatchMatcherUI() {
        this.renderHatchGuideUI();
    }
};

window.FlyBoxApp = FlyBoxApp;

window.recommendFlyPattern = function() {
    const targetEl = document.getElementById('hatch-wizard-target');
    const waterEl = document.getElementById('hatch-wizard-water');
    const actEl = document.getElementById('hatch-wizard-activity');
    const resultEl = document.getElementById('hatch-wizard-result');
    if (!targetEl || !resultEl) return;

    const target = targetEl.value;
    const water = waterEl.value;
    const activity = actEl.value;

    let recFly = "Parachute Adams (#14)";
    let tippetRec = "5X Nylon Monofilament (4.75 lbs)";
    let tech = "Dead-drift on surface riffles near foam lines.";
    let icon = "🪰";

    if (target === 'trout') {
        if (activity === 'dry') {
            recFly = water === 'clear' ? "Royal Wulff / Parachute Adams (#16)" : "Kosciuszko Dun / Gum Beetle (#12)";
            tippetRec = water === 'clear' ? "6X Nylon Monofilament (3.5 lbs)" : "5X Nylon Monofilament (4.75 lbs)";
            tech = "High-stealth delicate dry fly cast into tail-outs & seams.";
        } else if (activity === 'nymph') {
            recFly = "Pheasant Tail Nymph / Copper John (#14-#16)";
            tippetRec = "5X Fluorocarbon (5.5 lbs)";
            tech = "Indicator or Euro-nymphing through deep pools & gravel runs.";
            icon = "🪱";
        } else {
            recFly = "Woolly Bugger (Black/Olive #6-#8)";
            tippetRec = "3X Fluorocarbon (9.5 lbs)";
            tech = "Cross-stream cast & slow pulse retrieve along undercut banks.";
            icon = "🪶";
        }
    } else if (target === 'bass') {
        recFly = activity === 'dry' ? "Popper / Foam Cicada Bug (#4)" : "Clouser Minnow / Zonker (#4)";
        tippetRec = "2X Nylon / Fluorocarbon (11.5 - 12.5 lbs)";
        tech = "Chug loudly on surface near lily pads or strip fast past structure.";
        icon = "🐸";
    } else if (target === 'salmon') {
        recFly = "Egg-Sucking Leech / Intruder Streamer (#2)";
        tippetRec = "1X Fluorocarbon (14.5 lbs)";
        tech = "Swing across current on a sink-tip line through deep tailwaters.";
        icon = "🐟";
    } else if (target === 'saltwater') {
        recFly = "Crazy Charlie / Gotcha Bonefish Fly (#6)";
        tippetRec = ".012\" Saltwater Fluorocarbon (20.0 lbs)";
        tech = "Lead cruising fish by 5 feet, allow fly to drop, and strip in short 4-inch hops.";
        icon = "🦐";
    }

    resultEl.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 32px;">${icon}</span>
                <div>
                    <div style="font-size: 11px; color: var(--accent-teal); font-weight: 600; text-transform: uppercase;">✨ Recommended Fly Pattern:</div>
                    <div style="font-size: 17px; font-weight: 700; color: var(--text-primary); margin-top: 2px;">${recFly}</div>
                </div>
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
                <span class="badge" style="background: rgba(163, 230, 53, 0.15); color: #a3e635; border: 1px solid #a3e635; padding: 6px 12px; font-size: 12px;">
                    💡 Tippet: ${tippetRec}
                </span>
                <button class="btn btn-primary btn-sm" onclick="FlyBoxApp.quickAddFromHatch('${recFly.split('/')[0].trim()}', '${activity === 'dry' ? 'Dry Fly' : activity === 'nymph' ? 'Nymph' : 'Streamer'}', '#14', '${tech}')">
                    ➕ Stock in Fly Box
                </button>
            </div>
        </div>
        <p style="font-size: 12.5px; color: var(--text-secondary); margin: 10px 0 0 0; line-height: 1.4;">
            🎯 <b>Presentation Technique:</b> ${tech}
        </p>
    `;
};

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.FlyBoxApp) window.FlyBoxApp.init();
        if (window.recommendFlyPattern) window.recommendFlyPattern();
    }, 200);
});

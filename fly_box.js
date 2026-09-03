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

    autoRegisterFlyFromCatch(flyString, waterType = 'freshwater', species = '') {
        if (!flyString || typeof flyString !== 'string') return null;
        const cleanName = flyString.trim();
        if (!cleanName || cleanName === 'Select Fly/Lure...' || cleanName === 'Standard Pattern') return null;

        // Check if fly already exists in personal fly box (case-insensitive)
        let existing = this.flies.find(f => f.name.toLowerCase() === cleanName.toLowerCase() || cleanName.toLowerCase().includes(f.name.toLowerCase()) || f.name.toLowerCase().includes(cleanName.toLowerCase()));
        if (existing) {
            existing.catchCount = (existing.catchCount || 0) + 1;
            this.saveFliesToStorage();
            return existing;
        }

        // Auto-detect hook size
        const hookMatches = cleanName.match(/(?:#|hook\s*|size\s*)?([0-9]{1,2}(?:\/0)?)/i);
        let hookSize = "#14";
        if (hookMatches) {
            hookSize = hookMatches[0].startsWith('#') ? hookMatches[0] : `#${hookMatches[1]}`;
        }

        // Auto-detect category & icon
        const lower = cleanName.toLowerCase();
        let category = 'Dry Fly';
        let icon = '🦟';

        if (lower.includes('nymph') || lower.includes('beadhead') || lower.includes('scud') || lower.includes('copper') || lower.includes('ptn') || lower.includes('hare')) {
            category = 'Nymph';
            icon = '🪱';
        } else if (lower.includes('streamer') || lower.includes('bugger') || lower.includes('zonker') || lower.includes('matuka') || lower.includes('leech') || lower.includes('clouser') || lower.includes('deceiver') || lower.includes('pig') || lower.includes('minnow')) {
            category = 'Streamer';
            icon = '🪶';
        } else if (waterType === 'saltwater' || lower.includes('crab') || lower.includes('shrimp') || lower.includes('squid') || lower.includes('charlie') || lower.includes('tarpon') || lower.includes('bonefish') || lower.includes('gotcha') || lower.includes('surf candy') || lower.includes('puglisi')) {
            category = 'Saltwater';
            icon = '🦐';
        } else if (lower.includes('terrestrial') || lower.includes('hopper') || lower.includes('beetle') || lower.includes('ant') || lower.includes('cicada')) {
            category = 'Terrestrial';
            icon = '🦗';
        }

        const newFly = {
            id: 'fly_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            name: cleanName,
            category: category,
            region: waterType === 'saltwater' ? 'Estuary / Saltwater' : 'Rivers & Lakes',
            seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            hookSizes: [hookSize],
            icon: icon,
            description: `Auto-cataloged from successful ${species ? species + ' ' : ''}catch on ${new Date().toLocaleDateString()}.`,
            rating: 5,
            catchCount: 1
        };

        this.flies.unshift(newFly);
        this.saveFliesToStorage();
        this.renderFlyBoxUI();
        if (window.populateFlyDropdowns) window.populateFlyDropdowns();
        return newFly;
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

        // Update active styling on compartment buttons
        const tabBtns = document.querySelectorAll('.flybox-compartment-tabs .flybox-tab-btn');
        tabBtns.forEach(btn => {
            const cat = btn.getAttribute('data-category') || '';
            if (cat.toLowerCase() === filterCategory.toLowerCase()) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        let displayFlies = this.flies;
        if (filterCategory !== 'all') {
            displayFlies = displayFlies.filter(f => f.category.toLowerCase() === filterCategory.toLowerCase());
        }

        if (displayFlies.length === 0) {
            container.innerHTML = `<p class="placeholder-text" style="grid-column: 1/-1;">No flies found in this compartment. Click "+ Add New Fly" to stock your fly box!</p>`;
            return;
        }

        const allCatches = (window.AppState && Array.isArray(window.AppState.catches)) ? window.AppState.catches : [];

        container.innerHTML = displayFlies.map(fly => {
            // Compute real-time catch count from Catch Logs
            const matchingCatches = allCatches.filter(c => {
                const cFly = (c.fly || c.lure || '').toLowerCase();
                const fName = (fly.name || '').toLowerCase();
                return cFly && (cFly.includes(fName) || fName.includes(cFly));
            });
            const catchCount = Math.max(matchingCatches.length, fly.catchCount || 0);

            return `
                <div class="card glass fly-card" style="border-top: 3px solid var(--accent-teal); position: relative; padding: 16px;">
                    <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 8px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 32px;">${fly.icon || '🪰'}</span>
                            <div>
                                <h4 style="margin: 0; font-size: 15px; color: var(--text-primary);">${fly.name}</h4>
                                <span class="badge" style="background: rgba(100, 255, 218, 0.12); color: var(--accent-teal); font-size: 10px; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-top: 4px;">${fly.category}</span>
                                ${fly.region ? `<span class="badge" style="background: rgba(0, 210, 255, 0.12); color: var(--accent-blue); font-size: 10px; padding: 2px 6px; border-radius: 4px; margin-left: 4px;">${fly.region}</span>` : ''}
                                ${catchCount > 0 ? `<span class="badge" style="background: rgba(46, 213, 115, 0.15); color: #2ed573; border: 1px solid rgba(46, 213, 115, 0.3); font-size: 10px; padding: 2px 6px; border-radius: 4px; margin-left: 4px;">🎣 ${catchCount} Catch${catchCount === 1 ? '' : 'es'}</span>` : ''}
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
            `;
        }).join('');
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

// =========================================================================
// 🔬 GEMINI AI "MATCH THE HATCH" & ENTOMOLOGY LENS ENGINE
// =========================================================================

// Image compressor helper for AI Vision
async function resizeHatchImage(file, maxDimension = 1200) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();
        reader.onload = (e) => {
            img.onload = () => {
                let w = img.width;
                let h = img.height;
                if (w > maxDimension || h > maxDimension) {
                    if (w > h) {
                        h = Math.round((h * maxDimension) / w);
                        w = maxDimension;
                    } else {
                        w = Math.round((w * maxDimension) / h);
                        h = maxDimension;
                    }
                }
                const canvas = document.createElement('canvas');
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, w, h);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
                resolve({ base64: dataUrl.split(',')[1], dataUrl });
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Trigger Camera or File Picker
window.triggerHatchPhotoCapture = function(isCamera = false) {
    const inputId = isCamera ? 'hatch-camera-input' : 'hatch-gallery-input';
    const input = document.getElementById(inputId);
    if (input) {
        input.value = '';
        input.click();
    }
};

// Handle Photo File Upload
window.handleHatchPhotoUpload = async function(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    await window.analyzeHatchPhotoWithAI(file);
};

// Analyze insect photograph via Gemini Multimodal Vision API
window.analyzeHatchPhotoWithAI = async function(file) {
    const resultContainer = document.getElementById('hatch-ai-result-card');
    if (!resultContainer) return;

    // Show animated scanning state
    resultContainer.style.display = 'block';
    resultContainer.innerHTML = `
        <div style="text-align: center; padding: 30px 20px;">
            <div class="spinner" style="margin: 0 auto 15px auto; width: 44px; height: 44px; border: 3px solid rgba(0, 210, 255, 0.2); border-top-color: var(--accent-teal); border-radius: 50%; animation: spin 1s infinite linear;"></div>
            <h4 style="margin: 0; font-size: 16px; color: var(--text-primary);">🤖 Gemini AI Analyzing Insect Specimen...</h4>
            <p style="font-size: 12.5px; color: var(--text-secondary); margin: 6px 0 0 0;">
                Identifying aquatic order, life stage (nymph/emerger/dun/spinner), and cross-referencing fly box patterns...
            </p>
        </div>
    `;

    try {
        const { base64, dataUrl } = await resizeHatchImage(file, 1200);

        // Retrieve Gemini API Key
        let geminiKey = localStorage.getItem('geminiApiKey') || localStorage.getItem('gemini_api_key') || window.DEFAULT_GEMINI_KEY;
        if (!geminiKey) {
            try {
                const resp = await fetch('session_backup.json');
                if (resp.ok) {
                    const backup = await resp.json();
                    if (backup && backup.settings && backup.settings.geminiApiKey) {
                        geminiKey = backup.settings.geminiApiKey.trim();
                        if (geminiKey) localStorage.setItem('geminiApiKey', geminiKey);
                    }
                }
            } catch(e){}
        }

        if (!geminiKey) {
            alert("Please add your Gemini API key in Settings (or connect your account) to use AI Match the Hatch.");
            window.renderAIHatchOfflineFallback(dataUrl);
            return;
        }

        const prompt = `You are an expert aquatic entomologist and master fly fishing guide specializing in Australian (Snowy Mountains, Victoria High Country, Tasmania, Murrumbidgee, Eucumbene) and global trout/bass/fly fishing waters.
Examine this photograph of an insect, aquatic nymph, riverbed larva, mayfly dun/spinner, caddis, midge, stonefly, beetle, grasshopper, mudeye, or baitfish.

Identify the following with maximum entomological precision:
1. commonName: Common species or hatch name (e.g. "Kosciuszko Dun / Highland Mayfly", "Snowflake Caddis", "March Brown", "Blue-Winged Olive", "Australian Gum Beetle", "Black Spinner", "Zebra Midge", "Mudeye Dragonfly Nymph", "Galaxias Minnow")
2. scientificOrder: Scientific Order and Family (e.g. "Ephemeroptera (Mayfly)", "Trichoptera (Caddis)", "Plecoptera (Stonefly)", "Diptera (Midge)", "Coleoptera (Beetle)", "Orthoptera (Grasshopper/Cicada)", "Odonata (Mudeye)")
3. lifeStage: Exactly one of "Nymph", "Larva", "Pupa", "Emerger", "Dun (Subimago)", "Spinner (Spent)", "Adult Terrestrial", "Forage / Baitfish"
4. sizeMm: Approximate length (e.g. "10mm - 14mm")
5. colorProfile: Color description (e.g. "Mottled olive-brown body, pale smoky dun upright wings, amber legs")
6. matchedFlyPattern: The standard imitation fly pattern (e.g. "Kosciuszko Dun / Parachute Adams", "Pheasant Tail Nymph (Tungsten)", "Elk Hair Caddis", "Gum Beetle Foam", "Copper John", "Gold Ribbed Hare's Ear", "Zebra Midge", "Woolly Bugger")
7. category: Exactly one of "Dry Fly", "Nymph", "Streamer", "Saltwater"
8. hookSize: Recommended hook size range (e.g. "#14 - #16")
9. tippet: Recommended tippet size and material (e.g. "5X Nylon Monofilament (4.75 lb)" or "5X Fluorocarbon")
10. presentationTip: Riverbank tactical advice on drift, depth, or retrieve (e.g. "Dead drift along surface foam lines as duns dry their wings before taking flight.")
11. confidence: Confidence percentage string (e.g. "95%")
12. icon: Single emoji icon representing the insect (e.g. "🦟", "🦋", "🪱", "🪲", "🦗", "🦎", "🐟")

Respond ONLY with valid JSON matching this exact format:
{
  "commonName": "Kosciuszko Dun",
  "scientificOrder": "Ephemeroptera (Mayfly)",
  "lifeStage": "Dun (Subimago)",
  "sizeMm": "12mm",
  "colorProfile": "Olive-dun abdomen with translucent upright wings",
  "matchedFlyPattern": "Kosciuszko Dun / Parachute Adams",
  "category": "Dry Fly",
  "hookSize": "#14",
  "tippet": "5X Nylon (4.75 lb)",
  "presentationTip": "Dead-drift on surface foam lines as duns ride the water drying their wings.",
  "confidence": "96%",
  "icon": "🦟"
}`;

        const activeModel = localStorage.getItem('geminiActiveModel');
        const modelsToTry = [activeModel, 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-flash-latest', 'gemini-pro-latest'].filter(Boolean);
        const tried = new Set();
        let parsedResult = null;

        for (const modelName of modelsToTry) {
            if (tried.has(modelName)) continue;
            tried.add(modelName);

            try {
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(geminiKey)}`;
                const res = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [
                                { text: prompt },
                                {
                                    inline_data: {
                                        mime_type: "image/jpeg",
                                        data: base64
                                    }
                                }
                            ]
                        }],
                        generationConfig: { temperature: 0.1, responseMimeType: "application/json" }
                    })
                });

                if (res.ok) {
                    const data = await res.json();
                    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (text) {
                        try {
                            parsedResult = JSON.parse(text);
                        } catch(e) {
                            const jsonMatch = text.match(/\{[\s\S]*\}/);
                            if (jsonMatch) parsedResult = JSON.parse(jsonMatch[0]);
                        }
                        if (parsedResult) break;
                    }
                }
            } catch(mErr) {
                console.warn(`Hatch AI model ${modelName} notice:`, mErr);
            }
        }

        if (parsedResult) {
            window.renderAIHatchResult(parsedResult, dataUrl);
            if (window.showSyncToast) window.showSyncToast(`🎯 AI Hatch Match: ${parsedResult.commonName} (${parsedResult.confidence})`);
        } else {
            window.renderAIHatchOfflineFallback(dataUrl);
        }
    } catch(err) {
        console.error("AI Hatch Matcher exception:", err);
        window.renderAIHatchOfflineFallback(null);
    }
};

// Render AI Entomology Analysis Card
window.renderAIHatchResult = function(data, photoUrl = null) {
    const resultContainer = document.getElementById('hatch-ai-result-card');
    if (!resultContainer) return;

    // Check if user already owns this fly pattern in their Fly Box
    const userFlies = FlyBoxApp.flies || [];
    const basePatternName = (data.matchedFlyPattern || '').split('/')[0].trim().toLowerCase();
    const isStockedInBox = userFlies.some(f => f.name.toLowerCase().includes(basePatternName) || basePatternName.includes(f.name.toLowerCase()));

    const cleanFlyName = (data.matchedFlyPattern || 'Parachute Adams').split('/')[0].trim();
    const cleanHookSize = (data.hookSize || '#14').split('-')[0].trim();

    resultContainer.style.display = 'block';
    resultContainer.innerHTML = `
        <div class="card glass shadow-lg" style="border-left: 4px solid var(--accent-teal); border-top: 1px solid rgba(0, 210, 255, 0.3); padding: 20px; background: rgba(15, 28, 48, 0.95); position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 15px; margin-bottom: 16px;">
                <div style="display: flex; align-items: center; gap: 14px;">
                    ${photoUrl ? `<img src="${photoUrl}" alt="Specimen" style="width: 64px; height: 64px; border-radius: 12px; object-fit: cover; border: 2px solid var(--accent-teal); box-shadow: 0 4px 12px rgba(0,0,0,0.5);">` : `<span style="font-size: 42px;">${data.icon || '🦟'}</span>`}
                    <div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <h3 style="margin: 0; font-size: 19px; color: var(--text-primary);">${data.commonName}</h3>
                            <span class="badge" style="background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid #34d399; font-size: 11px; font-weight: 700;">
                                🎯 ${data.confidence || '95%'} Match
                            </span>
                        </div>
                        <div style="font-size: 12px; color: var(--accent-teal); font-weight: 600; margin-top: 3px;">
                            ${data.scientificOrder} • <span style="color: #cbd5e1;">Stage: <b>${data.lifeStage}</b></span>
                        </div>
                    </div>
                </div>

                <div style="display: flex; gap: 6px;">
                    <button class="btn btn-sm btn-glass" onclick="window.triggerHatchPhotoCapture(true)" style="font-size: 11.5px;">📸 Scan Another</button>
                    <button class="btn btn-sm btn-glass" onclick="document.getElementById('hatch-ai-result-card').style.display='none'" style="font-size: 11.5px;">✖ Close</button>
                </div>
            </div>

            <!-- Insect Specimen Breakdown -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin-bottom: 16px; background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 12px;">
                <div>
                    <span style="font-size: 10.5px; color: var(--text-secondary); text-transform: uppercase; font-weight: 600; display: block;">📏 Specimen Size:</span>
                    <strong style="font-size: 13px; color: var(--text-primary);">${data.sizeMm || '~12mm'}</strong>
                </div>
                <div>
                    <span style="font-size: 10.5px; color: var(--text-secondary); text-transform: uppercase; font-weight: 600; display: block;">🎨 Color Profile:</span>
                    <strong style="font-size: 12px; color: #cbd5e1;">${data.colorProfile || 'Olive / Dun'}</strong>
                </div>
                <div>
                    <span style="font-size: 10.5px; color: var(--text-secondary); text-transform: uppercase; font-weight: 600; display: block;">📦 Fly Box Status:</span>
                    ${isStockedInBox ? `<span class="badge badge-active" style="font-size: 11px; background: rgba(46, 213, 115, 0.15); color: #2ed573; border: 1px solid #2ed573;">✅ In Your Fly Box</span>` : `<span class="badge" style="font-size: 11px; background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid #f59e0b;">⚠️ Not Stocked Yet</span>`}
                </div>
            </div>

            <!-- Matched Fly Recommendation Card -->
            <div style="background: linear-gradient(135deg, rgba(0, 210, 255, 0.1), rgba(0, 114, 255, 0.08)); border: 1.5px solid var(--accent-teal); border-radius: 12px; padding: 16px; margin-bottom: 14px;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 8px;">
                    <div>
                        <span style="font-size: 11px; color: var(--accent-teal); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">✨ Recommended Imitation Fly Pattern:</span>
                        <div style="font-size: 18px; font-weight: 700; color: #ffffff; margin-top: 2px;">
                            ${data.icon || '🪰'} ${data.matchedFlyPattern}
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <span class="badge" style="background: rgba(163, 230, 53, 0.15); color: #a3e635; border: 1px solid #a3e635; padding: 5px 10px; font-size: 12px; font-weight: 600;">
                            🎣 Hook: ${data.hookSize || '#14'}
                        </span>
                        <span class="badge" style="background: rgba(0, 210, 255, 0.15); color: var(--accent-blue); border: 1px solid var(--accent-blue); padding: 5px 10px; font-size: 12px; font-weight: 600;">
                            💡 Tippet: ${data.tippet || '5X Nylon'}
                        </span>
                    </div>
                </div>

                <p style="font-size: 12.5px; color: #e2e8f0; margin: 8px 0 0 0; line-height: 1.4;">
                    🎯 <b>Tactical River Presentation:</b> ${data.presentationTip || 'Dead drift on surface foam lines.'}
                </p>
            </div>

            <!-- Action Buttons -->
            <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-end;">
                <button class="btn btn-glass" onclick="window.selectHatchFlyForCatchLog('${cleanFlyName}', '${cleanHookSize}')" style="display: flex; align-items: center; gap: 6px;">
                    <span>🎣</span> Log Catch with this Fly
                </button>
                <button class="btn btn-primary" onclick="FlyBoxApp.quickAddFromHatch('${cleanFlyName}', '${data.category || 'Dry Fly'}', '${cleanHookSize}', '${data.presentationTip || data.commonName}')" style="display: flex; align-items: center; gap: 6px;">
                    <span>➕</span> Stock Pattern in My Fly Box
                </button>
            </div>
        </div>
    `;
};

// Offline Fallback for AI Hatch Matcher
window.renderAIHatchOfflineFallback = function(photoUrl = null) {
    const resultContainer = document.getElementById('hatch-ai-result-card');
    if (!resultContainer) return;

    // Use current month hatch recommendation from local database
    const currentMonth = new Date().getMonth() + 1;
    const localHatch = AQUATIC_INSECT_HATCHES.find(h => h.months.includes(currentMonth)) || AQUATIC_INSECT_HATCHES[0];
    const topStage = localHatch.stages[0];

    resultContainer.style.display = 'block';
    resultContainer.innerHTML = `
        <div class="card glass shadow-lg" style="border-left: 4px solid #f59e0b; padding: 18px; background: rgba(15, 28, 48, 0.95);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 32px;">${localHatch.icon}</span>
                    <div>
                        <h3 style="margin: 0; font-size: 17px; color: var(--text-primary);">${localHatch.name} (Seasonal Match)</h3>
                        <span style="font-size: 11.5px; color: var(--accent-teal); font-weight: 600;">${localHatch.order} • Offline Heuristic Engine</span>
                    </div>
                </div>
                <button class="btn btn-sm btn-glass" onclick="document.getElementById('hatch-ai-result-card').style.display='none'">✖ Close</button>
            </div>
            <p style="font-size: 12.5px; color: var(--text-secondary); margin: 0 0 12px 0;">
                Connected to offline backcountry guide. Active seasonal hatch for current month (${new Date().toLocaleDateString(undefined, {month:'short'})}):
            </p>
            <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 14px;">
                <strong style="color: var(--accent-teal); font-size: 14px;">Recommended Fly: ${topStage.pattern} (${topStage.sizes})</strong>
                <p style="font-size: 12px; color: #cbd5e1; margin: 4px 0 0 0;">🎯 ${topStage.tip} • Tippet: ${topStage.tippet}</p>
            </div>
            <div style="text-align: right;">
                <button class="btn btn-primary btn-sm" onclick="FlyBoxApp.quickAddFromHatch('${topStage.pattern.split('/')[0].trim()}', 'Dry Fly', '${topStage.sizes.split('-')[0].trim()}', '${topStage.tip}')">
                    ➕ Stock in Fly Box
                </button>
            </div>
        </div>
    `;
};

// Helper to prefill Catch Log modal with selected match
window.selectHatchFlyForCatchLog = function(flyName, hookSize) {
    if (window.showLogCatchModal) {
        window.showLogCatchModal();
        setTimeout(() => {
            const flyInput = document.getElementById('rig-fly') || document.getElementById('catch-fly-used') || document.getElementById('catch-fly');
            if (flyInput) {
                const val = `${flyName} (${hookSize || '#14'})`;
                if (flyInput.tagName === 'SELECT') {
                    let optFound = false;
                    for (let i = 0; i < flyInput.options.length; i++) {
                        const opt = flyInput.options[i];
                        if (opt.value.toLowerCase().includes(flyName.toLowerCase())) {
                            flyInput.selectedIndex = i;
                            optFound = true;
                            break;
                        }
                    }
                    if (!optFound) {
                        const newOpt = document.createElement('option');
                        newOpt.value = val;
                        newOpt.textContent = val;
                        newOpt.selected = true;
                        flyInput.appendChild(newOpt);
                    }
                } else {
                    flyInput.value = val;
                }
            }
        }, 150);
        if (window.showSyncToast) window.showSyncToast(`🎣 Pre-selected "${flyName}" for your catch log!`);
    }
};

// Quick sample specimen loader for testing AI Hatch Matcher
window.loadSampleHatchSpecimen = function(specimenKey) {
    const specimens = {
        kosciusko_dun: {
            commonName: "Kosciuszko Dun (Highland Mayfly)",
            scientificOrder: "Ephemeroptera (Coloburiscidae)",
            lifeStage: "Dun (Subimago)",
            sizeMm: "12mm - 14mm",
            colorProfile: "Mottled olive-grey body, dark veins on smoky upright wings",
            matchedFlyPattern: "Kosciuszko Dun / Parachute Adams",
            category: "Dry Fly",
            hookSize: "#12 - #14",
            tippet: "5X Nylon Monofilament (4.75 lb)",
            presentationTip: "Dead-drift on surface foam lines and bubble seams as duns dry their wings before taking flight.",
            confidence: "97%",
            icon: "🦟"
        },
        snowflake_caddis: {
            commonName: "Snowflake Caddis (Evening Sedge)",
            scientificOrder: "Trichoptera (Hydropsychidae)",
            lifeStage: "Adult (Sedge)",
            sizeMm: "10mm - 12mm",
            colorProfile: "Tent-shaped ginger-tan mottled wings, pale amber legs",
            matchedFlyPattern: "Elk Hair Caddis / Snowflake Caddis",
            category: "Dry Fly",
            hookSize: "#14 - #16",
            tippet: "5X Nylon Monofilament (4.75 lb)",
            presentationTip: "Skate or twitch across fast current riffles during dusk rises to trigger predatory strikes.",
            confidence: "95%",
            icon: "🦋"
        },
        gum_beetle: {
            commonName: "Australian Gum Beetle",
            scientificOrder: "Coleoptera (Scarabaeidae)",
            lifeStage: "Adult Terrestrial",
            sizeMm: "8mm - 11mm",
            colorProfile: "Iridescent metallic green-bronze hard shell, dark brown underbody",
            matchedFlyPattern: "Gum Beetle Foam / Red Tag Dry",
            category: "Dry Fly",
            hookSize: "#14 - #16",
            tippet: "5X Nylon Monofilament (4.75 lb)",
            presentationTip: "Cast tight under overhanging eucalyptus gum trees with distinct 'plop' landing.",
            confidence: "98%",
            icon: "🪲"
        },
        pheasant_nymph: {
            commonName: "Mayfly Crawler Nymph",
            scientificOrder: "Ephemeroptera (Leptophlebiidae)",
            lifeStage: "Nymph (Riverbed Crawler)",
            sizeMm: "8mm - 12mm",
            colorProfile: "Dark brown mottled thorax, copper ribbing, tungsten bead",
            matchedFlyPattern: "Pheasant Tail Nymph (Tungsten) / Frenchie",
            category: "Nymph",
            hookSize: "#14 - #18",
            tippet: "5X - 6X Fluorocarbon (4.5 - 5.5 lb)",
            presentationTip: "Euro-nymph deep gravel runs and boulder seams along the bottom substrate.",
            confidence: "96%",
            icon: "🪱"
        }
    };

    const specimen = specimens[specimenKey] || specimens.kosciusko_dun;
    window.renderAIHatchResult(specimen, null);
    if (window.showSyncToast) window.showSyncToast(`🔬 Loaded sample specimen: ${specimen.commonName}`);
};

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.FlyBoxApp) window.FlyBoxApp.init();
        if (window.recommendFlyPattern) window.recommendFlyPattern();
    }, 200);
});

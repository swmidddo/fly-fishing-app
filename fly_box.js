// fly_box.js - Virtual Fly Box & Master Aquatic Insect Hatch Selector Guide
// Comprehensive Australian & Global Entomology Engine for Fly Anglers

const AQUATIC_INSECT_HATCHES = [
    // --- 1. MAYFLIES (Ephemeroptera) ---
    {
        id: "hatch_highland_mayfly",
        name: "Highland Mayfly / Kosciuszko Dun",
        order: "Mayfly (Ephemeroptera)",
        orderKey: "mayfly",
        regions: ["vic_high", "nsw_snowy", "tas_lakes"],
        months: [10, 11, 12, 1, 2, 3, 4], // Oct - Apr (Peak Nov-Feb)
        peakMonths: [11, 12, 1, 2],
        tempMin: 10,
        tempMax: 18,
        habitat: "Cold mountain freestone rivers & highland alpine streams (Snowy Mountains, Vic High Country, Tassie)",
        peakTime: "Midday to early afternoon (11:00 AM - 3:30 PM)",
        icon: "🦟",
        stages: [
            { stage: "Nymph", pattern: "Pheasant Tail Beadhead / Copper John", sizes: "#14 - #18", tippet: "5X Fluorocarbon", tip: "Euro-nymph deep gravel runs and seamlines before midday emergence." },
            { stage: "Emerger / Dun", pattern: "Kosciuszko Dun / Parachute Adams", sizes: "#12 - #16", tippet: "5X - 6X Nylon", tip: "Dead-drift on surface foam lines as duns ride the water drying their wings." },
            { stage: "Spinner (Spent)", pattern: "Rusty Spinner / Kosciuszko Red Spinner", sizes: "#14 - #16", tippet: "6X Nylon", tip: "Evening dusk falls when spent females drop onto glassy tailouts." }
        ]
    },
    {
        id: "hatch_blue_winged_olive",
        name: "Blue-Winged Olive (BWO / Baetis)",
        order: "Mayfly (Ephemeroptera)",
        orderKey: "mayfly",
        regions: ["vic_high", "nsw_snowy", "tas_lakes", "meadow"],
        months: [3, 4, 5, 8, 9, 10], // Autumn & Early Spring
        peakMonths: [4, 5, 9, 10],
        tempMin: 6,
        tempMax: 14,
        habitat: "Cold tailwaters, spring creeks, and cloudy overcast autumn river runs (Goulburn, Ovens, Eucumbene)",
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
        regions: ["vic_high", "nsw_snowy", "tas_lakes"],
        months: [2, 3, 4], // Feb - Apr
        peakMonths: [3, 4],
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
    {
        id: "hatch_caenid_curse",
        name: "Caenid Mayfly / Angler's Curse",
        order: "Mayfly (Ephemeroptera)",
        orderKey: "mayfly",
        regions: ["stillwater", "tas_lakes", "meadow", "vic_high"],
        months: [11, 12, 1, 2, 3], // Nov - Mar
        peakMonths: [12, 1, 2],
        tempMin: 14,
        tempMax: 22,
        habitat: "Glassy stillwater bays, muddy lake margins, and slow lowland tailwaters",
        peakTime: "First light dawn (5:30 AM - 8:30 AM) before wind ripples the surface",
        icon: "🦟",
        stages: [
            { stage: "Nymph", pattern: "Micro Unweighted Pheasant Tail", sizes: "#18 - #22", tippet: "6X - 7X Fluoro", tip: "Inch slowly just below the surface film near weed margins." },
            { stage: "Spinner (Spent)", pattern: "Caenid Trico Spinner / Poly-Wing Curse", sizes: "#18 - #22", tippet: "6X - 7X Nylon", tip: "Lead cruising sipping trout by 4 feet on glassy dawn slicks." }
        ]
    },

    // --- 2. CADDISFLIES / SEDGES (Trichoptera) ---
    {
        id: "hatch_snowy_caddis",
        name: "Snowflake Caddis / Evening Sedge",
        order: "Caddis (Trichoptera)",
        orderKey: "caddis",
        regions: ["vic_high", "nsw_snowy", "tas_lakes", "meadow"],
        months: [9, 10, 11, 12, 1, 2, 3, 4, 5], // Sep - May
        peakMonths: [11, 12, 1, 2],
        tempMin: 11,
        tempMax: 21,
        habitat: "Fast-flowing riffles, gravel river beds, and oxygenated pocket water (Goulburn, Thredbo, Mitta)",
        peakTime: "Dusk / Twilight evening rise (6:00 PM - 8:30 PM)",
        icon: "🦋",
        stages: [
            { stage: "Larva (Case-builder)", pattern: "Peeping Caddis / Green Hydropsyche", sizes: "#12 - #16", tippet: "4X - 5X Fluoro", tip: "Dead-drift along bottom rocks where caddis larvae cling." },
            { stage: "Pupa / Emerger", pattern: "Caddis Pupa / Klinkhamer Olive", sizes: "#14 - #16", tippet: "5X Nylon", tip: "Swing fly near surface just before dark as pupae ascend." },
            { stage: "Adult", pattern: "Elk Hair Caddis / Snowflake Caddis", sizes: "#12 - #16", tippet: "5X Nylon", tip: "Skate or twitch fly across current to trigger predatory splash rises." }
        ]
    },

    // --- 3. MIDGES / CHIRONOMIDS (Diptera) ---
    {
        id: "hatch_chironomid_midge",
        name: "Bloodworm & Chironomid Midge",
        order: "Midge (Diptera)",
        orderKey: "midge",
        regions: ["stillwater", "nsw_snowy", "tas_lakes", "vic_high", "meadow"],
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // All 12 Months
        peakMonths: [5, 6, 7, 8, 9],
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
        name: "Golden Stonefly / Eusthenia Alpine Stone",
        order: "Stonefly (Plecoptera)",
        orderKey: "stonefly",
        regions: ["vic_high", "nsw_snowy", "tas_lakes"],
        months: [10, 11, 12, 1], // Oct - Jan
        peakMonths: [10, 11, 12],
        tempMin: 9,
        tempMax: 17,
        habitat: "Turbulent boulder-strewn alpine rivers and torrential rapids (Howqua, Thredbo, Rubicon)",
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
        regions: ["vic_high", "nsw_snowy", "tas_lakes", "stillwater", "meadow"],
        months: [11, 12, 1, 2, 3], // Nov - Mar (Australian Summer)
        peakMonths: [12, 1, 2],
        tempMin: 15,
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
        regions: ["vic_high", "nsw_snowy", "meadow"],
        months: [12, 1, 2, 3], // Dec - Mar
        peakMonths: [1, 2, 3],
        tempMin: 17,
        tempMax: 34,
        habitat: "Grassy meadow stream banks, lowland rivers, and warmwater native bass rivers",
        peakTime: "Breezy sunny afternoons (12:00 PM - 6:00 PM)",
        icon: "🦗",
        stages: [
            { stage: "Adult Terrestrial", pattern: "Foam Hopper / Cicada Bugger", sizes: "#6 - #10", tippet: "3X - 4X Nylon", tip: "Pound banks within 6 inches of grass edges; twitch once every 10 seconds." }
        ]
    },
    {
        id: "hatch_flying_ant_termite",
        name: "Flying Ant & Summer Termite Fall",
        order: "Terrestrial (Hymenoptera)",
        orderKey: "terrestrial",
        regions: ["vic_high", "nsw_snowy", "tas_lakes", "stillwater", "meadow"],
        months: [11, 12, 1, 2, 3], // Nov - Mar
        peakMonths: [1, 2],
        tempMin: 16,
        tempMax: 28,
        habitat: "Forested rivers, alpine lakes, and humid pre-storm valley stretches",
        peakTime: "Warm, humid pre-thunderstorm afternoons (<1012 hPa barometer drop)",
        icon: "🐜",
        stages: [
            { stage: "Winged Adult", pattern: "Black/Cinnamon Foam Ant / McMurray Ant", sizes: "#14 - #18", tippet: "5X - 6X Nylon", tip: "Fish low in the surface film along windlanes and foam slicks." }
        ]
    },

    // --- 6. FORAGE / MINNOWS, MUDEYES, DAMSELS & CRUSTACEANS ---
    {
        id: "hatch_mudeye_dragonfly",
        name: "Australian Mudeye (Dragonfly Nymph)",
        order: "Forage & Odonata",
        orderKey: "forage",
        regions: ["stillwater", "nsw_snowy", "tas_lakes"],
        months: [11, 12, 1, 2, 3, 4], // Nov - Apr
        peakMonths: [12, 1, 2, 3],
        tempMin: 13,
        tempMax: 24,
        habitat: "Weed beds, drowned timber, hydro dams (Eucumbene, Jindabyne, Arthurs Lake)",
        peakTime: "Nightfall, twilight, and overcast dawn migrations",
        icon: "🦎",
        stages: [
            { stage: "Migrating Nymph", pattern: "Mudeye Foam / Craig's Nighttime", sizes: "#6 - #10", tippet: "3X - 4X Fluoro", tip: "Slow figure-eight retrieve across weed beds 2 feet below surface after dark." }
        ]
    },
    {
        id: "hatch_olive_damsel",
        name: "Olive Damselfly Nymph",
        order: "Forage & Odonata",
        orderKey: "forage",
        regions: ["stillwater", "tas_lakes", "meadow"],
        months: [10, 11, 12, 1, 2, 3], // Oct - Mar
        peakMonths: [11, 12, 1, 2],
        tempMin: 12,
        tempMax: 23,
        habitat: "Clear shallow stillwater weedbeds, lagoon margins, and slow backwaters",
        peakTime: "Bright sunny mornings and midday (9:30 AM - 2:30 PM)",
        icon: "🪲",
        stages: [
            { stage: "Swimming Nymph", pattern: "Marabou Olive Damsel / Eyes Damsel", sizes: "#10 - #14", tippet: "4X - 5X Fluoro", tip: "Sight-cast to cruising fish and retrieve with short, erratic 3-inch pulses." }
        ]
    },
    {
        id: "hatch_baitfish_minnow",
        name: "Galaxias Minnow / Smelt / Yabby",
        order: "Forage & Baitfish",
        orderKey: "forage",
        regions: ["vic_high", "nsw_snowy", "tas_lakes", "stillwater", "meadow"],
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // Year-round
        peakMonths: [5, 6, 7, 8, 9, 10],
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

// Helper to determine the best display name for a tackle fly, preserving color/variant distinctions
function getFlyNameForTackleItem(item, allTackleFlies) {
    if (!item) return 'Custom Fly';
    const rawName = (item.name || '').trim();
    if (!rawName) return 'Custom Fly';

    if (!Array.isArray(allTackleFlies) || allTackleFlies.length <= 1) {
        return rawName;
    }

    // Find other tackle flies that share the same base name (case-insensitive)
    const sameNameSiblings = allTackleFlies.filter(t => 
        t && t.id !== item.id && (t.name || '').trim().toLowerCase() === rawName.toLowerCase()
    );

    // If no other tackle fly shares this base name, use rawName
    if (sameNameSiblings.length === 0) {
        return rawName;
    }

    // There ARE multiple tackle flies with this same name (e.g. 2 "Bass Vampire" flies with different colors)
    // 1. Check Nickname
    const nick = (item.nickname || '').trim();
    if (nick && !rawName.toLowerCase().includes(nick.toLowerCase())) {
        return `${rawName} (${nick})`;
    }

    // 2. Check Spec (e.g. "Purple", "Black/Red", "#2 Olive", "#2")
    const spec = (item.spec || '').trim();
    if (spec && !rawName.toLowerCase().includes(spec.toLowerCase())) {
        return `${rawName} (${spec})`;
    }

    // 3. Check Brand (if used for color or distinct style)
    const brand = (item.brand || '').trim();
    if (brand && !['custom', 'generic', 'none', 'unknown', 'my flies'].includes(brand.toLowerCase())) {
        if (!rawName.toLowerCase().includes(brand.toLowerCase())) {
            return `${rawName} (${brand})`;
        }
    }

    // 4. Check Notes for a color descriptor
    const notes = (item.notes || '').trim();
    if (notes) {
        const colorRegex = /\b(black|purple|olive|chartreuse|orange|red|yellow|white|pink|brown|tan|blue|green|gold|silver|grey|gray|copper|claret|dun|grizzly)(?:(?:[\s\/\-&]+|\s+and\s+)(black|purple|olive|chartreuse|orange|red|yellow|white|pink|brown|tan|blue|green|gold|silver|grey|gray|copper|claret|dun|grizzly))?\b/i;
        const colorMatch = notes.match(colorRegex);
        if (colorMatch) {
            const c1 = colorMatch[1].charAt(0).toUpperCase() + colorMatch[1].slice(1).toLowerCase();
            const c2 = colorMatch[2] ? ('/' + colorMatch[2].charAt(0).toUpperCase() + colorMatch[2].slice(1).toLowerCase()) : '';
            return `${rawName} (${c1}${c2})`;
        }
        if (notes.length <= 20 && !notes.includes('\n')) {
            return `${rawName} (${notes})`;
        }
    }

    // 5. Fallback: Number them (Variant 1, Variant 2)
    const allMatches = allTackleFlies.filter(t => t && (t.name || '').trim().toLowerCase() === rawName.toLowerCase());
    const idx = allMatches.findIndex(t => t && t.id === item.id);
    return `${rawName} (Variant ${idx >= 0 ? idx + 1 : 1})`;
}
window.getFlyNameForTackleItem = getFlyNameForTackleItem;

const FlyBoxApp = {
    flies: [],
    pendingPhotoFlyId: null,
    activeCategory: 'all',
    tyingPanelExpanded: true,
    liveStreamSnapshot: null,
    hatchFilters: {
        region: 'all',
        month: new Date().getMonth() + 1,
        order: 'all',
        tempBracket: 'all'
    },

    async init() {
        this.loadFliesFromStorage();
        this.renderFlyBoxUI(this.activeCategory || 'all');
        this.renderHatchGuideUI();
        this.renderLiveStreamTempSyncBanner();
        this.renderTyingAndShopListCard();
        if (window.populateComboTackleDropdowns) window.populateComboTackleDropdowns();
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

        // Ensure every fly has a numeric qty and boolean onTyingList
        let seededLowStockDemo = false;
        const hasAnyLow = this.flies.some(f => typeof f.qty === 'number' && f.qty <= 2);
        this.flies.forEach((f, idx) => {
            if (typeof f.qty !== 'number' || isNaN(f.qty)) {
                // Seed a couple of classic patterns at qty 1-2 if first time upgrading so Low Stock / Tying List is immediately visible
                if (!hasAnyLow && idx === 0) { f.qty = 1; seededLowStockDemo = true; }
                else if (!hasAnyLow && idx === 1) { f.qty = 2; seededLowStockDemo = true; }
                else { f.qty = 4; }
            }
            if (typeof f.onTyingList !== 'boolean') {
                f.onTyingList = f.qty <= 1;
            }
        });
        if (seededLowStockDemo) {
            this.saveFliesToStorage();
        }
    },

    saveFliesToStorage() {
        try {
            localStorage.setItem('user_fly_box', JSON.stringify(this.flies));
            // Also keep virtualFlyBox_v1 summary map updated for Offline Pre-Flight Wizard
            const summaryMap = {};
            this.flies.forEach(f => {
                if (f && f.name) summaryMap[f.name] = typeof f.qty === 'number' ? f.qty : 3;
            });
            localStorage.setItem('virtualFlyBox_v1', JSON.stringify(summaryMap));
        } catch (e) {
            console.warn("[FlyBoxApp] localStorage quota notice, applying photo compression fallback:", e);
            try {
                // If storage quota is reached, compress oversized photo data strings in localStorage copy
                const safeFlies = this.flies.map(f => {
                    if (f.photo && f.photo.length > 40000) {
                        return { ...f, photo: f.thumbnail || f.photo.slice(0, 1000) };
                    }
                    return f;
                });
                localStorage.setItem('user_fly_box', JSON.stringify(safeFlies));
            } catch (err2) {
                console.error("[FlyBoxApp] Failed to save flies to localStorage:", err2);
            }
        }
    },

    addFly(flyObj) {
        flyObj.id = 'fly_' + Date.now();
        if (typeof flyObj.qty !== 'number') flyObj.qty = 4;
        flyObj.onTyingList = false;
        this.flies.unshift(flyObj);
        this.saveFliesToStorage();
        this.renderFlyBoxUI(this.activeCategory || 'all');
        this.renderLiveStreamTempSyncBanner();
        if (window.showSyncToast) window.showSyncToast(`🪰 Added "${flyObj.name}" (Qty: ${flyObj.qty}) to your Virtual Fly Box!`);
        else alert(`Added "${flyObj.name}" to your Virtual Fly Box!`);
        if (window.populateFlyDropdowns) window.populateFlyDropdowns();
        if (window.populateComboTackleDropdowns) window.populateComboTackleDropdowns();
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
        if (window.populateComboTackleDropdowns) window.populateComboTackleDropdowns();
        return newFly;
    },

    deleteFly(flyId) {
        if (confirm("Are you sure you want to remove this fly from your fly box?")) {
            if (flyId && typeof flyId === 'string' && flyId.startsWith('fly_tackle_')) {
                try {
                    const deleted = JSON.parse(localStorage.getItem('deleted_tackle_fly_ids') || '[]');
                    const tid = flyId.replace('fly_tackle_', '');
                    if (!deleted.includes(tid)) {
                        deleted.push(tid);
                        localStorage.setItem('deleted_tackle_fly_ids', JSON.stringify(deleted));
                    }
                } catch(e){}
            }
            this.flies = this.flies.filter(f => f.id !== flyId);
            this.saveFliesToStorage();
            this.renderFlyBoxUI();
            if (window.populateFlyDropdowns) window.populateFlyDropdowns();
            if (window.populateComboTackleDropdowns) window.populateComboTackleDropdowns();
        }
    },

    triggerFlyPhotoUpload(flyId) {
        this.pendingPhotoFlyId = flyId;
        const input = document.getElementById('fly-quick-photo-input');
        if (input) {
            input.value = '';
            input.click();
        }
    },

    async handleQuickFlyPhoto(event) {
        const file = event.target.files && event.target.files[0];
        if (!file || !this.pendingPhotoFlyId) return;

        try {
            const dataUrl = await resizeFlyPhoto(file, 1200);
            this.setFlyPhoto(this.pendingPhotoFlyId, dataUrl);
        } catch (err) {
            console.error("Failed to process fly photo:", err);
            alert("Could not process photo. Please try another image.");
        }
    },

    setFlyPhoto(flyId, dataUrl) {
        const fly = this.flies.find(f => f.id === flyId);
        if (!fly) return;

        fly.photo = dataUrl;
        this.saveFliesToStorage();
        this.renderFlyBoxUI();

        // Also cross-sync with tackle library if present
        if (window.AppState && Array.isArray(window.AppState.tackle)) {
            const match = window.AppState.tackle.find(t => t.name.toLowerCase() === fly.name.toLowerCase() && t.type === 'fly');
            if (match) {
                match.photo = dataUrl;
                if (window.DB && typeof window.DB.updateTackle === 'function') {
                    window.DB.updateTackle(match).catch(e => console.warn("Tackle photo sync note:", e));
                }
            }
        }

        if (window.showSyncToast) {
            window.showSyncToast(`📸 Photo updated for "${fly.name}"`);
        }
    },

    deleteFlyPhoto(flyId) {
        const fly = this.flies.find(f => f.id === flyId);
        if (!fly) return;

        delete fly.photo;
        this.saveFliesToStorage();
        this.renderFlyBoxUI();

        if (window.showSyncToast) {
            window.showSyncToast(`🗑️ Removed photo from "${fly.name}"`);
        }
    },

    adjustFlyStock(flyId, delta) {
        const fly = this.flies.find(f => f.id === flyId);
        if (!fly) return;
        const curQty = typeof fly.qty === 'number' ? fly.qty : 3;
        fly.qty = Math.max(0, curQty + delta);
        if (fly.qty === 0) {
            fly.onTyingList = true;
        } else if (fly.qty >= 4 && delta > 0) {
            fly.onTyingList = false;
        }
        this.saveFliesToStorage();
        this.renderFlyBoxUI(this.activeCategory || 'all');
        this.renderTyingAndShopListCard();
        this.renderLiveStreamTempSyncBanner();
        if (window.showSyncToast) {
            if (fly.qty === 0) {
                window.showSyncToast(`🚨 "${fly.name}" is Out of Stock (0) — added to Tying & Shop List!`);
            } else if (fly.qty <= 2 && delta < 0) {
                window.showSyncToast(`⚠️ "${fly.name}" Low Stock (${fly.qty} left in box)`);
            }
        }
    },

    toggleFlyTyingList(flyId) {
        const fly = this.flies.find(f => f.id === flyId);
        if (!fly) return;
        fly.onTyingList = !fly.onTyingList;
        this.saveFliesToStorage();
        this.renderFlyBoxUI(this.activeCategory || 'all');
        this.renderTyingAndShopListCard();
        if (window.showSyncToast) {
            window.showSyncToast(fly.onTyingList
                ? `🪶 Added "${fly.name}" to your Tying Bench & Tackle Shop List`
                : `✅ Removed "${fly.name}" from Tying & Shop List`);
        }
    },

    restockFly(flyId, addQty = 3) {
        const fly = this.flies.find(f => f.id === flyId);
        if (!fly) return;
        fly.qty = (typeof fly.qty === 'number' ? fly.qty : 0) + addQty;
        fly.onTyingList = false;
        this.saveFliesToStorage();
        this.renderFlyBoxUI(this.activeCategory || 'all');
        this.renderTyingAndShopListCard();
        this.renderLiveStreamTempSyncBanner();
        if (window.showSyncToast) {
            window.showSyncToast(`📦 Restocked "${fly.name}" (+${addQty} → ${fly.qty} in Fly Box)!`);
        }
    },

    restockAllLowFlies() {
        let count = 0;
        this.flies.forEach(f => {
            const q = typeof f.qty === 'number' ? f.qty : 3;
            if (q <= 2 || f.onTyingList) {
                f.qty = Math.max(4, q + 3);
                f.onTyingList = false;
                count++;
            }
        });
        if (count > 0) {
            this.saveFliesToStorage();
            this.renderFlyBoxUI(this.activeCategory || 'all');
            this.renderTyingAndShopListCard();
            this.renderLiveStreamTempSyncBanner();
            if (window.showSyncToast) {
                window.showSyncToast(`✅ Restocked ${count} low/tying-list patterns in your Virtual Fly Box!`);
            }
        } else {
            if (window.showSyncToast) window.showSyncToast(`✅ All Fly Box compartments are already fully stocked!`);
        }
    },

    toggleTyingShopPanel() {
        const card = document.getElementById('flybox-tying-shop-card');
        if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        this.renderFlyBoxUI('tying-list');
    },

    getMissingActiveHatchPatterns() {
        const activeHatches = this.getFilteredHatches(false);
        const missing = [];
        const seen = new Set();
        activeHatches.forEach(hatch => {
            (hatch.stages || []).forEach(st => {
                const patName = st.pattern.split('/')[0].trim();
                const key = patName.toLowerCase();
                if (seen.has(key)) return;
                const match = this.flies.find(f => (f.name || '').toLowerCase() === key || (f.name || '').toLowerCase().includes(key));
                if (!match) {
                    seen.add(key);
                    const cat = (st.stage.includes('Nymph') || st.stage.includes('Larva') || st.stage.includes('Pupa'))
                        ? 'Nymph'
                        : (st.stage.includes('Dun') || st.stage.includes('Adult') || st.stage.includes('Spinner') || st.stage.includes('Beetle'))
                            ? 'Dry Fly'
                            : 'Streamer';
                    missing.push({
                        name: patName,
                        category: cat,
                        hookSize: (st.sizes || '#14').split('-')[0].trim(),
                        hatchName: hatch.name.split('/')[0].trim(),
                        stage: st.stage,
                        tip: st.tip || '',
                        icon: hatch.icon || '🪰'
                    });
                }
            });
        });
        return missing;
    },

    copyTyingAndShopList() {
        const lowOrPinned = this.flies.filter(f => (typeof f.qty === 'number' ? f.qty : 3) <= 2 || f.onTyingList);
        const missingHatch = this.getMissingActiveHatchPatterns();
        if (lowOrPinned.length === 0 && missingHatch.length === 0) {
            if (window.showSyncToast) window.showSyncToast("✅ Your Fly Box is 100% stocked — no low or missing patterns!");
            return;
        }
        const lines = [
            `🪶 MIDDO'S FLY FISHING — TYING BENCH & TACKLE SHOP LIST (${new Date().toLocaleDateString()})`,
            `------------------------------------------------------------`
        ];
        if (lowOrPinned.length > 0) {
            lines.push(`\n📦 LOW STOCK / PINNED PATTERNS TO TIE OR BUY (${lowOrPinned.length}):`);
            lowOrPinned.forEach(f => {
                const q = typeof f.qty === 'number' ? f.qty : 3;
                const need = Math.max(2, 4 - q);
                const hooks = Array.isArray(f.hookSizes) ? f.hookSizes.join(', ') : (f.hookSizes || '#14');
                lines.push(`• [ ] ${f.name} (${f.category} • Hook ${hooks}) — In Box: ${q} | Tie/Buy: +${need}`);
            });
        }
        if (missingHatch.length > 0) {
            lines.push(`\n🦟 ACTIVE HATCH PATTERNS MISSING FROM BOX (${missingHatch.length}):`);
            missingHatch.slice(0, 8).forEach(m => {
                lines.push(`• [ ] ${m.name} (${m.category} • Hook ${m.hookSize}) — For ${m.hatchName} (${m.stage})`);
            });
        }
        const text = lines.join('\n');
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                if (window.showSyncToast) window.showSyncToast(`📋 Copied ${lowOrPinned.length + Math.min(8, missingHatch.length)} patterns to clipboard for your tying bench / tackle shop!`);
            }).catch(() => alert(text));
        } else {
            alert(text);
        }
    },

    renderTyingAndShopListCard() {
        const card = document.getElementById('flybox-tying-shop-card');
        if (!card) return;

        const lowFlies = this.flies.filter(f => (typeof f.qty === 'number' ? f.qty : 3) <= 2);
        const tyingFlies = this.flies.filter(f => (typeof f.qty === 'number' ? f.qty : 3) <= 2 || f.onTyingList);
        const missingHatches = this.getMissingActiveHatchPatterns();

        const lowBadge = document.getElementById('flybox-low-stock-count');
        if (lowBadge) lowBadge.textContent = lowFlies.length > 0 ? `(${lowFlies.length})` : '';
        const tyingBadge = document.getElementById('flybox-tying-list-count');
        if (tyingBadge) tyingBadge.textContent = (tyingFlies.length + missingHatches.length) > 0 ? `(${tyingFlies.length + missingHatches.length})` : '';

        if (tyingFlies.length === 0 && missingHatches.length === 0) {
            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 22px;">✅</span>
                        <div>
                            <strong style="font-size: 14px; color: #34d399;">All Fly Box Compartments &amp; Active River Hatches Fully Stocked!</strong>
                            <div style="font-size: 11.5px; color: var(--text-secondary);">Use the <b>[ - ] / [ + ]</b> counters on any fly card below when you lose a fly in a snag or tree to automatically queue it on your Tying &amp; Shop List.</div>
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        const restockRows = tyingFlies.map(f => {
            const q = typeof f.qty === 'number' ? f.qty : 3;
            const hooks = Array.isArray(f.hookSizes) ? f.hookSizes.join(', ') : (f.hookSizes || '#14');
            const isOut = q === 0;
            const statusPill = isOut
                ? `<span class="badge" style="background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4); font-size: 10px;">🚨 Out (0)</span>`
                : (q <= 2
                    ? `<span class="badge" style="background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4); font-size: 10px;">⚠️ Low (${q} left)</span>`
                    : `<span class="badge" style="background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); font-size: 10px;">🪶 Pinned (${q})</span>`);

            return `
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; background: rgba(15, 23, 42, 0.78); border: 1px solid ${isOut ? 'rgba(239, 68, 68, 0.4)' : 'rgba(245, 158, 11, 0.3)'}; border-radius: 8px; padding: 8px 11px;">
                    <div style="min-width: 0;">
                        <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                            <span style="font-size: 15px;">${f.icon || '🪰'}</span>
                            <strong style="font-size: 12.5px; color: #f8fafc;">${f.name}</strong>
                            ${statusPill}
                        </div>
                        <div style="font-size: 10.5px; color: #94a3b8; margin-top: 2px;">
                            ${f.category} • Hook: <strong style="color: #cbd5e1;">${hooks}</strong> ${f.catchCount ? `• 🎣 ${f.catchCount} caught` : ''}
                        </div>
                    </div>
                    <div style="display: flex; gap: 5px; align-items: center; flex-shrink: 0;">
                        <button type="button" class="btn btn-primary btn-sm" onclick="FlyBoxApp.restockFly('${f.id}', 3)" style="font-size: 10.5px; padding: 4px 9px; background: linear-gradient(135deg, #10b981, #059669); border: none; font-weight: 700;" title="Add 3 tied or purchased flies to box">
                            +3 Restock
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        const missingHatchRows = missingHatches.slice(0, 6).map(m => {
            const safeName = m.name.replace(/'/g, "\\'");
            const safeTip = (m.tip || '').replace(/'/g, "\\'");
            return `
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; background: rgba(14, 116, 144, 0.14); border: 1px dashed rgba(56, 189, 248, 0.4); border-radius: 8px; padding: 8px 11px;">
                    <div style="min-width: 0;">
                        <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                            <span style="font-size: 15px;">${m.icon}</span>
                            <strong style="font-size: 12.5px; color: #38bdf8;">${m.name}</strong>
                            <span class="badge" style="background: rgba(56, 189, 248, 0.16); color: #38bdf8; font-size: 9.5px;">Missing Hatch Gap</span>
                        </div>
                        <div style="font-size: 10.5px; color: #94a3b8; margin-top: 2px;">
                            ${m.hatchName} (${m.stage}) • Hook <strong style="color: #cbd5e1;">${m.hookSize}</strong>
                        </div>
                    </div>
                    <button type="button" class="btn btn-glass btn-sm" onclick="FlyBoxApp.quickAddFromHatch('${safeName}', '${m.category}', '${m.hookSize}', '${safeTip}')" style="font-size: 10.5px; padding: 4px 9px; border-color: rgba(56, 189, 248, 0.45); color: #38bdf8; font-weight: 700; flex-shrink: 0;">
                        ➕ Stock (4)
                    </button>
                </div>
            `;
        }).join('');

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; margin-bottom: 12px;">
                <div>
                    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                        <h4 style="margin: 0; font-size: 15px; color: #fbbf24; display: flex; align-items: center; gap: 6px;">
                            🪶 Fly Box Low Stock, Tying Bench &amp; Tackle Shop Restock List
                        </h4>
                        ${lowFlies.length > 0 ? `<span class="badge" style="background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4); font-size: 10.5px;">⚠️ ${lowFlies.length} Low/Out</span>` : ''}
                        ${missingHatches.length > 0 ? `<span class="badge" style="background: rgba(56, 189, 248, 0.18); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35); font-size: 10.5px;">🦟 ${missingHatches.length} Active Hatch Gaps</span>` : ''}
                    </div>
                    <div style="font-size: 11.5px; color: var(--text-secondary); margin-top: 3px;">
                        Automatically tracks depleted flies (<b>≤ 2 left</b>) and missing patterns for today's active river water-temperature hatches.
                    </div>
                </div>
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                    <button type="button" class="btn btn-glass btn-sm" onclick="FlyBoxApp.copyTyingAndShopList()" style="font-size: 11px; padding: 5px 10px; border-color: rgba(56, 189, 248, 0.45); color: #38bdf8; font-weight: 700;">
                        📋 Copy Shop / Tying List
                    </button>
                    ${missingHatches.length > 0 ? `
                        <button type="button" class="btn btn-glass btn-sm" onclick="FlyBoxApp.loadActiveHatchPackToFlyBox()" style="font-size: 11px; padding: 5px 10px; border-color: rgba(16, 185, 129, 0.45); color: #34d399; font-weight: 700;">
                            📦 Fill ${missingHatches.length} Hatch Gaps
                        </button>
                    ` : ''}
                    ${tyingFlies.length > 0 ? `
                        <button type="button" class="btn btn-primary btn-sm" onclick="FlyBoxApp.restockAllLowFlies()" style="font-size: 11px; padding: 5px 10px; background: linear-gradient(135deg, #f59e0b, #d97706); color: #000; border: none; font-weight: 800;">
                            ✅ Restock All Low (+3)
                        </button>
                    ` : ''}
                </div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(255px, 1fr)); gap: 8px;">
                ${restockRows}
                ${missingHatchRows}
            </div>
        `;
    },

    renderFlyBoxUI(filterCategory = 'all') {
        this.activeCategory = filterCategory;
        const container = document.getElementById('flybox-grid-container');
        if (!container) return;

        // Keep Tying & Shop List card badges synced
        this.renderTyingAndShopListCard();

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
        if (filterCategory === 'low-stock') {
            displayFlies = displayFlies.filter(f => (typeof f.qty === 'number' ? f.qty : 3) <= 2);
        } else if (filterCategory === 'tying-list') {
            displayFlies = displayFlies.filter(f => (typeof f.qty === 'number' ? f.qty : 3) <= 2 || f.onTyingList);
        } else if (filterCategory !== 'all') {
            displayFlies = displayFlies.filter(f => (f.category || '').toLowerCase() === filterCategory.toLowerCase());
        }

        if (displayFlies.length === 0) {
            const emptyMsg = filterCategory === 'low-stock'
                ? `🎉 Zero low-stock flies! All patterns in your Fly Box have 3+ stocked.`
                : (filterCategory === 'tying-list'
                    ? `🪶 Your Tying & Shop List is clear! Tap "🪶 +Tie List" or "-" on any fly card to queue patterns.`
                    : `No flies found in this compartment. Click "+ Add New Fly" to stock your fly box!`);
            container.innerHTML = `<p class="placeholder-text" style="grid-column: 1/-1;">${emptyMsg}</p>`;
            return;
        }

        const allCatches = (window.AppState && Array.isArray(window.AppState.catches)) ? window.AppState.catches : [];
        const catchFlyList = allCatches.map(c => c && (c.fly || c.lure) ? (c.fly || c.lure).toLowerCase().trim() : '').filter(Boolean);

        container.innerHTML = displayFlies.map(fly => {
            // Compute real-time catch count from Catch Logs with safe sub-string matching
            const fName = (fly.name || '').toLowerCase().trim();
            let catchCount = fly.catchCount || 0;
            if (catchFlyList.length > 0 && fName) {
                let liveMatches = 0;
                for (let i = 0; i < catchFlyList.length; i++) {
                    const cFly = catchFlyList[i];
                    if (cFly === fName || cFly.includes(fName) || (cFly.length >= 4 && fName.includes(cFly))) {
                        liveMatches++;
                    }
                }
                catchCount = Math.max(liveMatches, catchCount);
            }

            const qty = typeof fly.qty === 'number' ? fly.qty : 3;
            const isOut = qty === 0;
            const isLow = qty > 0 && qty <= 2;
            const borderTopColor = isOut ? '#ef4444' : (isLow ? '#f59e0b' : 'var(--accent-teal)');
            const stockBadgeHtml = isOut
                ? `<span class="badge" style="background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.45); font-size: 10px; padding: 2px 6px; border-radius: 4px; margin-left: 4px;">🚨 Out of Stock (0)</span>`
                : (isLow
                    ? `<span class="badge" style="background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.45); font-size: 10px; padding: 2px 6px; border-radius: 4px; margin-left: 4px;">⚠️ Low Stock (${qty})</span>`
                    : `<span class="badge" style="background: rgba(16, 185, 129, 0.14); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); font-size: 10px; padding: 2px 6px; border-radius: 4px; margin-left: 4px;">📦 ${qty} in Box</span>`);

            const photoEl = fly.photo ? `
                <div style="position: relative; width: 56px; height: 56px; flex-shrink: 0; cursor: pointer;" onclick="window.previewFlyPhoto('${fly.id}')" title="Tap to inspect fly photo">
                    <img src="${fly.photo}" alt="${fly.name}" class="fly-card-img" loading="lazy" decoding="async" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px; border: 1.5px solid var(--accent-teal); box-shadow: 0 2px 8px rgba(0, 210, 255, 0.25);">
                </div>
            ` : `
                <div style="position: relative; width: 52px; height: 52px; display: flex; align-items: center; justify-content: center; background: rgba(0, 210, 255, 0.05); border-radius: 8px; border: 1px dashed rgba(0, 210, 255, 0.25); flex-shrink: 0;">
                    <span style="font-size: 28px;">${fly.icon || '🪰'}</span>
                </div>
            `;

            return `
                <div class="card glass fly-card" style="border-top: 3px solid ${borderTopColor}; position: relative; padding: 16px;">
                    <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 8px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            ${photoEl}
                            <div>
                                <h4 style="margin: 0; font-size: 15px; color: var(--text-primary);">${fly.name}</h4>
                                <span class="badge" style="background: rgba(100, 255, 218, 0.12); color: var(--accent-teal); font-size: 10px; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-top: 4px;">${fly.category}</span>
                                ${fly.region ? `<span class="badge" style="background: rgba(0, 210, 255, 0.12); color: var(--accent-blue); font-size: 10px; padding: 2px 6px; border-radius: 4px; margin-left: 4px;">${fly.region}</span>` : ''}
                                ${stockBadgeHtml}
                                ${catchCount > 0 ? `<span class="badge" style="background: rgba(46, 213, 115, 0.15); color: #2ed573; border: 1px solid rgba(46, 213, 115, 0.3); font-size: 10px; padding: 2px 6px; border-radius: 4px; margin-left: 4px;">🎣 ${catchCount} Catch${catchCount === 1 ? '' : 'es'}</span>` : ''}
                            </div>
                        </div>
                        <div style="display: flex; gap: 4px; align-items: center; flex-shrink: 0;">
                            <button type="button" class="btn btn-sm btn-glass btn-fly-quick-cam" onclick="FlyBoxApp.triggerFlyPhotoUpload('${fly.id}')" title="${fly.photo ? 'Change Fly Photo' : 'Add Photo of Tied Fly'}" style="padding: 4px 7px; font-size: 11px; color: var(--accent-teal); border-color: rgba(0, 210, 255, 0.35);">
                                📷
                            </button>
                            <button type="button" class="btn btn-sm btn-danger" onclick="FlyBoxApp.deleteFly('${fly.id}')" style="padding: 4px 8px; font-size: 11px;" title="Remove Fly">&times;</button>
                        </div>
                    </div>
                    <p style="font-size: 12px; color: var(--text-secondary); margin: 8px 0; line-height: 1.4;">${fly.description || ''}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; border-top: 1px dashed rgba(255,255,255,0.06); padding-top: 8px; font-size: 11px; color: var(--text-secondary);">
                        <div>🎣 Hook Sizes: <strong style="color: var(--text-primary);">${Array.isArray(fly.hookSizes) ? fly.hookSizes.join(', ') : fly.hookSizes}</strong></div>
                        <div>⭐ Rating: <strong style="color: var(--accent-orange);">${'★'.repeat(fly.rating || 5)}</strong></div>
                    </div>
                    <!-- Stock Quantity Stepper & Tying Bench Pin Controls -->
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-top: 10px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.06);">
                        <div style="display: flex; align-items: center; gap: 6px; background: rgba(15, 23, 42, 0.7); padding: 3px 6px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.08);">
                            <button type="button" class="btn btn-glass btn-sm" onclick="FlyBoxApp.adjustFlyStock('${fly.id}', -1)" style="padding: 1px 7px; font-size: 12px; font-weight: 800; line-height: 1.2;" title="Lost a fly on the river (-1)">−</button>
                            <span style="font-size: 11.5px; font-weight: 700; color: ${isOut ? '#f87171' : (isLow ? '#fbbf24' : '#e2e8f0')}; min-width: 52px; text-align: center;">Qty: ${qty}</span>
                            <button type="button" class="btn btn-glass btn-sm" onclick="FlyBoxApp.adjustFlyStock('${fly.id}', 1)" style="padding: 1px 7px; font-size: 12px; font-weight: 800; line-height: 1.2; color: #34d399;" title="Tied or bought a fly (+1)">+</button>
                        </div>
                        <button type="button" class="btn btn-glass btn-sm" onclick="FlyBoxApp.toggleFlyTyingList('${fly.id}')" style="font-size: 10.5px; padding: 4px 8px; border-color: ${fly.onTyingList ? 'rgba(56, 189, 248, 0.6)' : 'rgba(255,255,255,0.12)'}; color: ${fly.onTyingList ? '#38bdf8' : '#94a3b8'}; background: ${fly.onTyingList ? 'rgba(56, 189, 248, 0.14)' : 'transparent'}; font-weight: 600;">
                            ${fly.onTyingList ? '🪶 On Tying List ✓' : '🪶 +Tie/Shop List'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },

    // --- Master Hatch Guide & 12-Month Emergence Calendar Engine (Option 4) ---
    getFilteredHatches(ignoreMonth = false) {
        const { region, month, order, tempBracket } = this.hatchFilters;
        return AQUATIC_INSECT_HATCHES.filter(hatch => {
            const matchesRegion = !region || region === 'all' || !Array.isArray(hatch.regions) || hatch.regions.includes(region);
            const matchesMonth = ignoreMonth || month === 'all' || hatch.months.includes(parseInt(month));
            const matchesOrder = order === 'all' || hatch.orderKey === order;

            let matchesTemp = true;
            if (tempBracket === 'cold') matchesTemp = hatch.tempMin < 10;
            else if (tempBracket === 'spring') matchesTemp = hatch.tempMin <= 14 && hatch.tempMax >= 10;
            else if (tempBracket === 'prime') matchesTemp = hatch.tempMin <= 18 && hatch.tempMax >= 13;
            else if (tempBracket === 'summer') matchesTemp = hatch.tempMax >= 18;

            return matchesRegion && matchesMonth && matchesOrder && matchesTemp;
        });
    },

    renderHatchCalendarMatrix() {
        const matrixEl = document.getElementById('hatch-calendar-matrix-container');
        if (!matrixEl) return;

        const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const curMonthNum = new Date().getMonth() + 1;
        const selectedMonthNum = this.hatchFilters.month === 'all' ? null : parseInt(this.hatchFilters.month);
        const hatchesForMatrix = this.getFilteredHatches(true);

        if (hatchesForMatrix.length === 0) {
            matrixEl.innerHTML = '';
            return;
        }

        const headerCells = monthLabels.map((mName, idx) => {
            const mNum = idx + 1;
            const isSelected = selectedMonthNum === mNum;
            const isCurrent = curMonthNum === mNum;
            const bg = isSelected ? 'rgba(0, 210, 255, 0.25)' : (isCurrent ? 'rgba(16, 185, 129, 0.16)' : 'rgba(255,255,255,0.03)');
            const color = isSelected ? 'var(--accent-teal)' : (isCurrent ? '#34d399' : 'var(--text-secondary)');
            return `<th onclick="FlyBoxApp.selectMonthFromMatrix(${mNum})" style="cursor: pointer; padding: 5px 4px; text-align: center; font-size: 10.5px; background: ${bg}; color: ${color}; border-radius: 4px; user-select: none;" title="Tap to filter by ${mName}">${mName}${isCurrent ? '•' : ''}</th>`;
        }).join('');

        const rowsHtml = hatchesForMatrix.map(h => {
            const cells = monthLabels.map((_, idx) => {
                const mNum = idx + 1;
                const isActive = h.months.includes(mNum);
                const isPeak = Array.isArray(h.peakMonths) && h.peakMonths.includes(mNum);
                const bg = isPeak
                    ? 'rgba(16, 185, 129, 0.55)'
                    : (isActive ? 'rgba(0, 210, 255, 0.22)' : 'rgba(255,255,255,0.02)');
                const symbol = isPeak ? '🔥' : (isActive ? '•' : '');
                return `<td onclick="FlyBoxApp.selectMonthFromMatrix(${mNum})" style="cursor: pointer; text-align: center; padding: 4px 2px; font-size: 10px; background: ${bg}; border-radius: 3px; color: #ecfdf5;" title="${h.name} — ${isPeak ? 'Peak Emergence' : (isActive ? 'Active Hatch' : 'Dormant')}">${symbol}</td>`;
            }).join('');

            return `
                <tr>
                    <td style="padding: 4px 8px; font-size: 11px; font-weight: 600; color: var(--text-primary); white-space: nowrap;">${h.icon} ${h.name.split('/')[0].trim()}</td>
                    <td style="padding: 4px 6px; font-size: 10px; color: #38bdf8; white-space: nowrap;">${h.tempMin}–${h.tempMax}°C</td>
                    ${cells}
                </tr>
            `;
        }).join('');

        matrixEl.innerHTML = `
            <div style="background: rgba(0,0,0,0.22); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 10px 12px;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px; margin-bottom: 6px;">
                    <span style="font-size: 11px; font-weight: 700; color: var(--accent-teal); text-transform: uppercase; letter-spacing: 0.4px;">📅 12-Month Australian Hatch Emergence Matrix (Tap any month to filter)</span>
                    <div style="display: flex; gap: 10px; font-size: 10px; color: #94a3b8; align-items: center;">
                        <span>🔥 Peak Hatch Window</span>
                        <span><b style="color: var(--accent-teal);">•</b> Active Emergence</span>
                        ${selectedMonthNum ? `<a href="javascript:void(0)" onclick="FlyBoxApp.selectMonthFromMatrix('all')" style="color: var(--accent-teal); text-decoration: underline;">Show All 12 Months</a>` : ''}
                    </div>
                </div>
                <table style="width: 100%; border-collapse: separate; border-spacing: 3px;">
                    <thead>
                        <tr>
                            <th style="text-align: left; padding: 4px 8px; font-size: 10.5px; color: var(--text-secondary);">Insect / Forage</th>
                            <th style="text-align: left; padding: 4px 6px; font-size: 10.5px; color: var(--text-secondary);">Trigger</th>
                            ${headerCells}
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml}
                    </tbody>
                </table>
            </div>
        `;
    },

    selectMonthFromMatrix(monthVal) {
        const valStr = String(monthVal);
        this.hatchFilters.month = valStr === String(this.hatchFilters.month) ? 'all' : valStr;
        const monthSel = document.getElementById('hatch-filter-month');
        if (monthSel) monthSel.value = String(this.hatchFilters.month);
        this.renderHatchGuideUI();
    },

    loadSingleHatchToFlyBox(hatchId) {
        const hatch = AQUATIC_INSECT_HATCHES.find(h => h.id === hatchId);
        if (!hatch) return;
        let addedCount = 0;
        (hatch.stages || []).forEach(st => {
            const patName = st.pattern.split('/')[0].trim();
            const exists = this.flies.some(f => (f.name || '').toLowerCase() === patName.toLowerCase());
            if (!exists) {
                const cat = (st.stage.includes('Nymph') || st.stage.includes('Larva') || st.stage.includes('Pupa'))
                    ? 'Nymph'
                    : (st.stage.includes('Dun') || st.stage.includes('Adult') || st.stage.includes('Spinner') || st.stage.includes('Beetle'))
                        ? 'Dry Fly'
                        : 'Streamer';
                const hookSz = st.sizes.split('-')[0].trim() || '#14';
                this.flies.unshift({
                    id: 'fly_hatch_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
                    name: patName,
                    category: cat,
                    region: hatch.name.split('/')[0].trim(),
                    seasons: hatch.months || [1,2,3,4,5,6,7,8,9,10,11,12],
                    hookSizes: [hookSz],
                    icon: hatch.icon || '🪰',
                    description: `${st.stage}: ${st.tip}`,
                    rating: 5,
                    qty: 4,
                    onTyingList: false
                });
                addedCount++;
            }
        });
        if (addedCount > 0) {
            this.saveFliesToStorage();
            this.renderFlyBoxUI(this.activeCategory || 'all');
            this.renderLiveStreamTempSyncBanner();
            if (window.populateFlyDropdowns) window.populateFlyDropdowns();
            if (window.populateComboTackleDropdowns) window.populateComboTackleDropdowns();
            if (window.showSyncToast) window.showSyncToast(`📦 Loaded ${addedCount} "${hatch.name}" stage pattern${addedCount > 1 ? 's' : ''} into your Fly Box!`);
        } else {
            if (window.showSyncToast) window.showSyncToast(`✅ All patterns for "${hatch.name}" are already stocked in your Fly Box!`);
        }
    },

    loadActiveHatchPackToFlyBox() {
        const activeHatches = this.getFilteredHatches(false);
        if (activeHatches.length === 0) {
            if (window.showSyncToast) window.showSyncToast("⚠️ No active hatches match the current filter to load.");
            return;
        }
        let addedCount = 0;
        activeHatches.forEach(hatch => {
            (hatch.stages || []).forEach(st => {
                const patName = st.pattern.split('/')[0].trim();
                const exists = this.flies.some(f => (f.name || '').toLowerCase() === patName.toLowerCase());
                if (!exists) {
                    const cat = (st.stage.includes('Nymph') || st.stage.includes('Larva') || st.stage.includes('Pupa'))
                        ? 'Nymph'
                        : (st.stage.includes('Dun') || st.stage.includes('Adult') || st.stage.includes('Spinner') || st.stage.includes('Beetle'))
                            ? 'Dry Fly'
                            : 'Streamer';
                    const hookSz = st.sizes.split('-')[0].trim() || '#14';
                    this.flies.unshift({
                        id: 'fly_pack_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
                        name: patName,
                        category: cat,
                        region: 'Hatch Pack',
                        seasons: hatch.months || [1,2,3,4,5,6,7,8,9,10,11,12],
                        hookSizes: [hookSz],
                        icon: hatch.icon || '🪰',
                        description: `${hatch.name} (${st.stage}): ${st.tip}`,
                        rating: 5,
                        qty: 4,
                        onTyingList: false
                    });
                    addedCount++;
                }
            });
        });

        if (addedCount > 0) {
            this.saveFliesToStorage();
            this.renderFlyBoxUI(this.activeCategory || 'all');
            this.renderLiveStreamTempSyncBanner();
            if (window.populateFlyDropdowns) window.populateFlyDropdowns();
            if (window.populateComboTackleDropdowns) window.populateComboTackleDropdowns();
            if (window.showSyncToast) window.showSyncToast(`📦 Stocked ${addedCount} new hatch patterns from ${activeHatches.length} active hatches into your Virtual Fly Box!`);
        } else {
            if (window.showSyncToast) window.showSyncToast(`✅ All ${activeHatches.length} active hatch patterns are already stocked in your Fly Box!`);
        }
    },

    renderHatchGuideUI() {
        const container = document.getElementById('hatch-guide-cards-container');
        if (!container) return;

        this.renderHatchCalendarMatrix();
        const filtered = this.getFilteredHatches(false);

        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 30px; background: rgba(0,0,0,0.2); border-radius: 12px; border: 1px dashed var(--border-color);">
                    <span style="font-size: 36px; display: block; margin-bottom: 8px;">❄️</span>
                    <h4 style="margin: 0; color: var(--text-primary);">No active insect hatches matching selected filters</h4>
                    <p style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">Try switching to "All Months" or "All Water Temps", or tap a month in the 12-Month Emergence Matrix above.</p>
                </div>
            `;
            return;
        }

        const regionBadgeLabels = {
            vic_high: '🏔️ VIC High Country',
            nsw_snowy: '❄️ NSW Snowy',
            tas_lakes: '🏝️ TAS Highlands',
            stillwater: '🏞️ Lakes/Dams',
            meadow: '🌿 Meadow Streams'
        };

        container.innerHTML = filtered.map(hatch => {
            const regionPills = (hatch.regions || []).slice(0, 3).map(r => `<span style="font-size: 9.5px; background: rgba(255,255,255,0.05); color: #94a3b8; padding: 2px 6px; border-radius: 4px;">${regionBadgeLabels[r] || r}</span>`).join(' ');
            return `
            <div class="card glass shadow-lg" style="border-left: 4px solid var(--accent-teal); padding: 18px; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 8px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 32px;">${hatch.icon}</span>
                            <div>
                                <h3 style="margin: 0; font-size: 16px; color: var(--text-primary);">${hatch.name}</h3>
                                <span style="font-size: 11.5px; color: var(--accent-teal); font-weight: 600;">${hatch.order}</span>
                                <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px;">${regionPills}</div>
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
                            <span class="badge" style="background: rgba(0, 210, 255, 0.12); color: var(--accent-blue); font-size: 10.5px;">
                                🌡️ ${hatch.tempMin}°C - ${hatch.tempMax}°C
                            </span>
                            <button type="button" class="btn btn-glass btn-sm" style="font-size: 10px; padding: 2px 7px; color: #34d399; border-color: rgba(16,185,129,0.4);" onclick="FlyBoxApp.loadSingleHatchToFlyBox('${hatch.id}')" title="Add all life-stages of this hatch to your Fly Box">
                                📦 +All Stages
                            </button>
                        </div>
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
                                    <button class="btn btn-glass btn-sm" style="font-size: 10.5px; padding: 2px 8px;" onclick="FlyBoxApp.quickAddFromHatch('${st.pattern.split('/')[0].trim().replace(/'/g, "\\'")}', '${st.stage.includes('Nymph') ? 'Nymph' : st.stage.includes('Larva') ? 'Nymph' : st.stage.includes('Dun') || st.stage.includes('Adult') || st.stage.includes('Spinner') ? 'Dry Fly' : 'Streamer'}', '${st.sizes.split('-')[0].trim()}', '${st.tip.replace(/'/g, "\\'")}')">
                                        ➕ Add to My Fly Box
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `}).join('');
    },

    updateHatchFilters(key, val) {
        this.hatchFilters[key] = val;
        this.renderHatchGuideUI();
        this.renderTyingAndShopListCard();
        this.renderLiveStreamTempSyncBanner();
    },

    async autoSyncCurrentRiverConditions(fetchLiveGauge = false) {
        const now = new Date();
        const currentMonth = now.getMonth() + 1;

        let streamCond = { waterTemp: 14.0, riverFlow: 'Steady / Ideal', isManual: false, stationName: 'Active River Corridor', flowMld: null, levelM: null };
        if (window.WEATHER && typeof window.WEATHER.getStreamConditions === 'function') {
            streamCond = Object.assign(streamCond, window.WEATHER.getStreamConditions());
        } else if (window.AppState && window.AppState.weatherData && window.AppState.weatherData.current && window.AppState.weatherData.current.temp) {
            streamCond.waterTemp = Math.round((window.AppState.weatherData.current.temp * 0.72) * 10) / 10;
        }

        // Determine active coordinates
        let lat = -37.2528, lng = 145.7875;
        if (window.currentWeatherLocation && typeof window.currentWeatherLocation.lat === 'number') {
            lat = window.currentWeatherLocation.lat;
            lng = window.currentWeatherLocation.lng;
        } else if (window.AppMap && window.AppMap.currentLocation && typeof window.AppMap.currentLocation.lat === 'number') {
            lat = window.AppMap.currentLocation.lat;
            lng = window.AppMap.currentLocation.lng;
        }

        // Poll Live BOM / State Hydro Stream Gauge if available
        if (fetchLiveGauge && window.WEATHER && typeof window.WEATHER.fetchLiveStreamGauge === 'function') {
            try {
                const liveGauge = await window.WEATHER.fetchLiveStreamGauge(lat, lng);
                if (liveGauge) {
                    if (typeof liveGauge.waterTemp === 'number') streamCond.waterTemp = liveGauge.waterTemp;
                    if (liveGauge.stationName) streamCond.stationName = liveGauge.stationName;
                    if (liveGauge.flowMld || liveGauge.flow) streamCond.flowMld = liveGauge.flowMld || liveGauge.flow;
                    if (liveGauge.levelM || liveGauge.level) streamCond.levelM = liveGauge.levelM || liveGauge.level;
                    if (liveGauge.flowStatus) streamCond.riverFlow = liveGauge.flowStatus;
                    streamCond.isLiveGauge = true;
                }
            } catch (e) {
                console.warn('Live stream gauge sync fallback:', e);
            }
        } else {
            // Check cached offline gauge snapshot if present
            try {
                const rawGauge = localStorage.getItem('offlineCachedStreamGauge_v1');
                if (rawGauge) {
                    const parsed = JSON.parse(rawGauge);
                    if (parsed && parsed.gauge) {
                        const g = parsed.gauge;
                        if (g.stationName) streamCond.stationName = g.stationName;
                        if (g.flowMld || g.flow) streamCond.flowMld = g.flowMld || g.flow;
                        if (g.levelM || g.level) streamCond.levelM = g.levelM || g.level;
                        if (!streamCond.isManual && typeof g.waterTemp === 'number') streamCond.waterTemp = g.waterTemp;
                    }
                }
            } catch (e) {}
        }

        const temp = streamCond.waterTemp != null ? streamCond.waterTemp : 14.0;

        let tempBracket = 'prime';
        if (temp < 10) tempBracket = 'cold';
        else if (temp <= 14) tempBracket = 'spring';
        else if (temp <= 19) tempBracket = 'prime';
        else tempBracket = 'summer';

        // Auto-infer fishery region from coordinates
        let detectedRegion = this.hatchFilters.region || 'all';
        if (lat < -40.0) detectedRegion = 'tas_lakes';
        else if (lat > -36.55 && lng > 147.9) detectedRegion = 'nsw_snowy';
        else if (lat <= -36.4 && lat >= -38.0 && lng >= 145.2 && lng <= 148.0) detectedRegion = 'vic_high';

        this.hatchFilters.region = detectedRegion;
        this.hatchFilters.month = currentMonth;
        this.hatchFilters.order = 'all';
        this.hatchFilters.tempBracket = tempBracket;
        this.liveStreamSnapshot = {
            ...streamCond,
            waterTemp: temp,
            tempBracket,
            region: detectedRegion,
            syncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const regionSelect = document.getElementById('hatch-filter-region');
        const monthSelect = document.getElementById('hatch-filter-month');
        const orderSelect = document.getElementById('hatch-filter-order');
        const tempSelect = document.getElementById('hatch-filter-temp');

        if (regionSelect) regionSelect.value = detectedRegion;
        if (monthSelect) monthSelect.value = String(currentMonth);
        if (orderSelect) orderSelect.value = 'all';
        if (tempSelect) tempSelect.value = tempBracket;

        this.renderHatchGuideUI();
        this.renderTyingAndShopListCard();
        this.renderLiveStreamTempSyncBanner();

        const srcTag = streamCond.isLiveGauge ? `Live Gauge (${streamCond.stationName})` : (streamCond.isManual ? 'Thermometer' : 'Thermal Est');
        if (window.showSyncToast) {
            window.showSyncToast(`🌡️ Synced Hatch Matrix & Fly Box to ${temp}°C (${srcTag}) • Flow: ${streamCond.riverFlow}!`);
        }
    },

    renderLiveStreamTempSyncBanner() {
        const banner = document.getElementById('flybox-live-stream-banner');
        if (!banner) return;

        let streamCond = this.liveStreamSnapshot;
        if (!streamCond) {
            const base = (window.WEATHER && typeof window.WEATHER.getStreamConditions === 'function')
                ? window.WEATHER.getStreamConditions()
                : { waterTemp: 14.0, riverFlow: 'Steady / Ideal', isManual: false };
            streamCond = {
                ...base,
                stationName: (window.currentWeatherLocation && window.currentWeatherLocation.name) || 'Goulburn / High Country Stream',
                syncedAt: 'Auto-Ready'
            };
        }

        const temp = streamCond.waterTemp != null ? streamCond.waterTemp : 14.0;
        const bio = (window.WEATHER && typeof window.WEATHER.getThermalBioZone === 'function')
            ? window.WEATHER.getThermalBioZone(temp, streamCond.riverFlow)
            : { zoneIcon: '🔥', zoneShort: 'Prime Feeding Zone (13–18°C)', zoneColor: '#34d399' };

        const activeHatches = this.getFilteredHatches(false);
        const missingPatterns = this.getMissingActiveHatchPatterns();
        let totalActiveStagePatterns = 0;
        activeHatches.forEach(h => { totalActiveStagePatterns += (h.stages ? h.stages.length : 0); });
        const stockedActiveCount = Math.max(0, totalActiveStagePatterns - missingPatterns.length);

        banner.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(56, 189, 248, 0.16); border: 1px solid rgba(56, 189, 248, 0.4); display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0;">
                        🌡️
                    </div>
                    <div>
                        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                            <strong style="font-size: 14px; color: #f8fafc;">Live Stream Temp &amp; Hatch Readiness: <span style="color: #38bdf8;">${temp}°C</span></strong>
                            <span class="badge" style="background: rgba(16, 185, 129, 0.16); color: ${bio.zoneColor || '#34d399'}; border: 1px solid ${bio.zoneColor || '#34d399'}; font-size: 10.5px;">
                                ${bio.zoneIcon || '🔥'} ${bio.zoneShort || 'Prime Trout Window'}
                            </span>
                            ${streamCond.flowMld ? `<span class="badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; font-size: 10.5px;">🌊 ${streamCond.flowMld} ML/d ${streamCond.levelM ? `(${streamCond.levelM}m)` : ''}</span>` : `<span class="badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; font-size: 10.5px;">🌊 ${streamCond.riverFlow || 'Steady Flow'}</span>`}
                        </div>
                        <div style="font-size: 11.5px; color: #cbd5e1; margin-top: 3px;">
                            📍 <b>${streamCond.stationName || 'Active River Corridor'}</b> • 🦟 <b>${activeHatches.length} Active Hatches</b> emerging at ${temp}°C • 📦 Box Readiness: <strong style="color: ${missingPatterns.length === 0 ? '#34d399' : '#fbbf24'};">${stockedActiveCount}/${totalActiveStagePatterns} Active Patterns Stocked</strong>
                        </div>
                    </div>
                </div>
                <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
                    <button type="button" class="btn btn-primary btn-sm" onclick="FlyBoxApp.autoSyncCurrentRiverConditions(true)" style="background: linear-gradient(135deg, #0284c7, #10b981); border: none; font-size: 11.5px; font-weight: 700; padding: 6px 12px;">
                        📡 Poll Live Stream Gauge &amp; Sync Hatches
                    </button>
                    ${missingPatterns.length > 0 ? `
                        <button type="button" class="btn btn-glass btn-sm" onclick="FlyBoxApp.loadActiveHatchPackToFlyBox()" style="border-color: rgba(245, 158, 11, 0.5); color: #fbbf24; font-size: 11.5px; font-weight: 700; padding: 6px 10px;">
                            📦 +Stock ${missingPatterns.length} Missing Hatch Flies
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    },

    renderHatchMatcherUI() {
        this.renderHatchGuideUI();
    },

    async backfillAllFlies(options = {}) {
        const silent = options && options.silent === true;
        let tackleAdded = 0;
        let catchesAdded = 0;
        let rigsAdded = 0;
        let enrichedCount = 0;

        // 1. Ensure flies are loaded in memory
        if (!Array.isArray(this.flies) || this.flies.length === 0) {
            this.loadFliesFromStorage();
        }

        // Helper: Find existing fly by clean name (case-insensitive & trimmed)
        const findFly = (name) => {
            if (!name || typeof name !== 'string') return null;
            const clean = name.trim().toLowerCase();
            return this.flies.find(f => (f.name || '').trim().toLowerCase() === clean);
        };

        // Helper: Extract hook size (e.g., "#14", "size 12", "#6/0")
        const extractHookSize = (str) => {
            if (!str || typeof str !== 'string') return null;
            const m = str.match(/(?:#|hook\s*|size\s*)?([0-9]{1,2}(?:\/0)?)/i);
            if (m) {
                return m[0].startsWith('#') ? m[0] : `#${m[1]}`;
            }
            return null;
        };

        // Helper: Infer category and icon from text & waterType
        const inferCategoryAndIcon = (text, waterType = 'freshwater') => {
            const lower = (text || '').toLowerCase();
            if (lower.includes('nymph') || lower.includes('beadhead') || lower.includes('scud') || lower.includes('copper') || lower.includes('ptn') || lower.includes('hare') || lower.includes('buzzer') || lower.includes('bloodworm') || lower.includes('pupa')) {
                return { category: 'Nymph', icon: '🪱' };
            }
            if (lower.includes('streamer') || lower.includes('bugger') || lower.includes('zonker') || lower.includes('matuka') || lower.includes('leech') || lower.includes('clouser') || lower.includes('deceiver') || lower.includes('pig') || lower.includes('minnow') || lower.includes('rabbit')) {
                return { category: 'Streamer', icon: '🪶' };
            }
            if (waterType === 'saltwater' || lower.includes('saltwater') || lower.includes('crab') || lower.includes('shrimp') || lower.includes('squid') || lower.includes('charlie') || lower.includes('bonefish') || lower.includes('tarpon') || lower.includes('gotcha') || lower.includes('surf candy') || lower.includes('flathead')) {
                return { category: 'Saltwater', icon: '🦐' };
            }
            if (lower.includes('hopper') || lower.includes('beetle') || lower.includes('ant') || lower.includes('cicada') || lower.includes('cricket') || lower.includes('blowfly')) {
                return { category: 'Dry Fly', icon: '🪲' };
            }
            return { category: 'Dry Fly', icon: '🦟' };
        };

        // 2. Scan Tackle Library Items where type === 'fly'
        let allTackle = [];
        if (window.DB && typeof window.DB.getAllTackle === 'function') {
            try {
                allTackle = await window.DB.getAllTackle();
            } catch (e) {
                console.warn("[FlyBox Backfill] Could not read tackle from DB:", e);
            }
        }
        if ((!allTackle || allTackle.length === 0) && window.AppState && Array.isArray(window.AppState.tackle)) {
            allTackle = window.AppState.tackle;
        }

        if (Array.isArray(allTackle)) {
            const tackleFlies = allTackle.filter(item => item && item.type === 'fly');
            let deletedTackleFlyIds = [];
            try {
                deletedTackleFlyIds = JSON.parse(localStorage.getItem('deleted_tackle_fly_ids') || '[]').map(String);
            } catch (e) {}

            for (const item of tackleFlies) {
                const rawName = (item.name || '').trim();
                if (!rawName) continue;
                // If user deliberately deleted this fly from fly box, skip it
                if (item.id && deletedTackleFlyIds.includes(String(item.id))) {
                    continue;
                }

                const targetName = getFlyNameForTackleItem(item, tackleFlies);

                // 1. Direct tackle ID link check
                let existing = this.flies.find(f => f.id === 'fly_tackle_' + item.id);

                // 2. If not found by ID, check by disambiguated target name
                if (!existing) {
                    existing = this.flies.find(f => (f.name || '').trim().toLowerCase() === targetName.toLowerCase());
                }

                // 3. If still not found, check if a fly exists with rawName, BUT ONLY if unclaimed by another tackle item
                if (!existing) {
                    const candidate = this.flies.find(f => (f.name || '').trim().toLowerCase() === rawName.toLowerCase());
                    const isClaimedByOther = candidate && candidate.id.startsWith('fly_tackle_') && candidate.id !== 'fly_tackle_' + item.id;
                    if (candidate && !isClaimedByOther) {
                        existing = candidate;
                    }
                }

                const specSize = extractHookSize(item.spec) || (item.spec ? item.spec.trim() : null);
                const { category, icon } = inferCategoryAndIcon(`${rawName} ${item.spec || ''} ${item.notes || ''}`);

                if (existing) {
                    let changed = false;
                    // If existing fly has rawName and targetName provides color disambiguation (e.g. Bass Vampire -> Bass Vampire (Black)), upgrade its name
                    if (targetName !== existing.name && targetName.toLowerCase().startsWith(rawName.toLowerCase())) {
                        existing.name = targetName;
                        changed = true;
                    }
                    if (item.photo && (!existing.photo || existing.photo.length < 50)) {
                        existing.photo = item.photo;
                        changed = true;
                    }
                    if (specSize && (!existing.hookSizes || !existing.hookSizes.length || !existing.hookSizes.includes(specSize))) {
                        if (!existing.hookSizes) existing.hookSizes = [];
                        if (!existing.hookSizes.includes(specSize)) existing.hookSizes.push(specSize);
                        changed = true;
                    }
                    if (item.notes && !existing.description) {
                        existing.description = item.notes;
                        changed = true;
                    }
                    if (changed) enrichedCount++;
                } else {
                    const newFly = {
                        id: 'fly_tackle_' + (item.id || (Date.now() + Math.floor(Math.random() * 10000))),
                        name: targetName,
                        category: category,
                        region: item.brand ? `${item.brand}` : 'Stocked Fly',
                        seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                        hookSizes: [specSize || '#14'],
                        icon: icon,
                        photo: item.photo || null,
                        description: item.notes || `${item.brand ? item.brand + ' ' : ''}${targetName} fly pattern imported from tackle library.`,
                        rating: 5,
                        catchCount: 0
                    };
                    this.flies.push(newFly);
                    tackleAdded++;
                }
            }
        }

        // 3. Scan All Historical Catches
        let allCatches = [];
        if (window.DB && typeof window.DB.getAllCatches === 'function') {
            try {
                allCatches = await window.DB.getAllCatches();
            } catch (e) {
                console.warn("[FlyBox Backfill] Could not read catches from DB:", e);
            }
        }
        if ((!allCatches || allCatches.length === 0) && window.AppState && Array.isArray(window.AppState.catches)) {
            allCatches = window.AppState.catches;
        }

        if (Array.isArray(allCatches)) {
            for (const c of allCatches) {
                const flyName = (c && (c.fly || c.lure)) ? (c.fly || c.lure).trim() : '';
                if (!flyName || flyName.toLowerCase() === 'select fly/lure...' || flyName.toLowerCase() === 'standard pattern') continue;

                let existing = findFly(flyName);
                if (!existing) {
                    // Check if removing hook size matches an existing base fly name
                    const hookSize = extractHookSize(flyName);
                    const baseClean = flyName.replace(/(?:#|hook\s*|size\s*)[0-9]{1,2}(?:\/0)?/gi, '').replace(/[-–()]/g, '').trim().toLowerCase();
                    if (baseClean.length >= 4) {
                        existing = this.flies.find(f => {
                            const fBase = f.name.replace(/(?:#|hook\s*|size\s*)[0-9]{1,2}(?:\/0)?/gi, '').replace(/[-–()]/g, '').trim().toLowerCase();
                            return fBase === baseClean;
                        });
                    }

                    if (existing) {
                        if (hookSize && (!existing.hookSizes || !existing.hookSizes.includes(hookSize))) {
                            if (!existing.hookSizes) existing.hookSizes = [];
                            existing.hookSizes.push(hookSize);
                            enrichedCount++;
                        }
                    } else {
                        const { category, icon } = inferCategoryAndIcon(flyName, c.waterType);
                        const newFly = {
                            id: 'fly_catch_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
                            name: flyName,
                            category: category,
                            region: c.waterType === 'saltwater' ? 'Estuary / Saltwater' : 'Rivers & Lakes',
                            seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                            hookSizes: [hookSize || '#14'],
                            icon: icon,
                            description: `Auto-cataloged from successful catch on ${c.date ? new Date(c.date).toLocaleDateString() : 'river trip'}.`,
                            rating: 5,
                            catchCount: 0
                        };
                        this.flies.push(newFly);
                        catchesAdded++;
                    }
                }
            }

            // Recalculate precise catchCount for ALL flies based on historical catches
            for (const fly of this.flies) {
                const flyLower = fly.name.toLowerCase().trim();
                const matchingCatches = allCatches.filter(c => {
                    if (!c) return false;
                    const cFly = (c.fly || c.lure || '').toLowerCase().trim();
                    if (!cFly) return false;
                    return cFly === flyLower || cFly.includes(flyLower) || flyLower.includes(cFly);
                });
                fly.catchCount = matchingCatches.length;
            }
        }

        // 4. Scan Saved Combos / Rigs
        let allRigs = [];
        if (window.DB && typeof window.DB.getAllRigs === 'function') {
            try {
                allRigs = await window.DB.getAllRigs();
            } catch (e) {
                console.warn("[FlyBox Backfill] Could not read rigs from DB:", e);
            }
        }
        if ((!allRigs || allRigs.length === 0) && window.AppState && Array.isArray(window.AppState.rigs)) {
            allRigs = window.AppState.rigs;
        }

        if (Array.isArray(allRigs)) {
            for (const rig of allRigs) {
                const rigFlies = [rig.pointFly, rig.dropperFly].filter(Boolean);
                for (const rf of rigFlies) {
                    const cleanRf = rf.trim();
                    if (!cleanRf) continue;
                    let existing = findFly(cleanRf);
                    if (!existing) {
                        const hookSize = extractHookSize(cleanRf) || '#14';
                        const { category, icon } = inferCategoryAndIcon(cleanRf);
                        const newFly = {
                            id: 'fly_rig_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
                            name: cleanRf,
                            category: category,
                            region: 'Rig Pattern',
                            seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                            hookSizes: [hookSize],
                            icon: icon,
                            description: `Configured in saved rig "${rig.name}".`,
                            rating: 5,
                            catchCount: 0
                        };
                        this.flies.push(newFly);
                        rigsAdded++;
                    }
                }
            }
        }

        const totalNewlyAdded = tackleAdded + catchesAdded + rigsAdded;
        if (totalNewlyAdded > 0 || enrichedCount > 0 || (Array.isArray(allCatches) && allCatches.length > 0)) {
            this.saveFliesToStorage();
            this.renderFlyBoxUI();
            if (window.populateFlyDropdowns) window.populateFlyDropdowns();
            if (window.populateComboTackleDropdowns) window.populateComboTackleDropdowns();
            if (window.renderTackleList) window.renderTackleList();
        }

        const summaryMsg = totalNewlyAdded > 0 
            ? `🔄 Backfilled ${totalNewlyAdded} flies (${tackleAdded} from tackle, ${catchesAdded} from catches, ${rigsAdded} from rigs) into your Virtual Fly Box!`
            : (enrichedCount > 0 
                ? `🔄 Verified fly collection: enriched ${enrichedCount} existing flies with photos/sizes and synced catch counts!`
                : `✅ All flies up-to-date! Your Virtual Fly Box is in full sync with your tackle, catches, and rigs (${this.flies.length} total patterns).`);

        if (!silent) {
            if (window.showSyncToast) window.showSyncToast(summaryMsg);
            else alert(summaryMsg);
        }

        console.log(`[FlyBox Backfill] Complete: +${tackleAdded} tackle flies, +${catchesAdded} catch flies, +${rigsAdded} rig flies, ${enrichedCount} enriched. Total stocked flies: ${this.flies.length}.`);

        return {
            tackleAdded,
            catchesAdded,
            rigsAdded,
            enrichedCount,
            totalFlies: this.flies.length
        };
    }
};

window.FlyBoxApp = FlyBoxApp;
window.backfillAllFliesToFlyBox = (options) => window.FlyBoxApp.backfillAllFlies(options);

window.recommendFlyPattern = function() {
    const targetEl = document.getElementById('hatch-wizard-target');
    const waterEl = document.getElementById('hatch-wizard-water');
    const actEl = document.getElementById('hatch-wizard-activity');
    const resultEl = document.getElementById('hatch-wizard-result');
    if (!targetEl || !resultEl) return;

    const target = targetEl.value;
    const water = waterEl.value;
    const activity = actEl.value;

    const streamCond = (window.WEATHER && typeof window.WEATHER.getStreamConditions === 'function')
        ? window.WEATHER.getStreamConditions()
        : { waterTemp: 14.0, riverFlow: 'Steady / Ideal', isManual: false };
    const bio = (window.WEATHER && typeof window.WEATHER.getThermalBioZone === 'function')
        ? window.WEATHER.getThermalBioZone(streamCond.waterTemp, streamCond.riverFlow)
        : { zoneIcon: '🌡️', zoneShort: 'Prime Zone', zoneColor: '#34d399', isHootOwl: false };

    let recFly = "Parachute Adams (#14)";
    let tippetRec = "5X Nylon Monofilament (4.75 lbs)";
    let tech = "Dead-drift on surface riffles near foam lines.";
    let icon = "🪰";

    if (target === 'trout') {
        const wTemp = streamCond.waterTemp || 14;
        const fLow = (streamCond.riverFlow || '').toLowerCase();
        if (fLow.includes('high') || fLow.includes('blown')) {
            recFly = "Olive/Black Conehead Woolly Bugger (#6) + San Juan Worm Dropper (#12)";
            tippetRec = "2X–3X Fluorocarbon (8.5–10 lbs)";
            tech = `High / Blown Out Flow (${wTemp}°C): Skip fast center current! Pound slow, soft bank edges and back-eddies.`;
            icon = "🪶";
        } else if (wTemp < 8.5 && activity !== 'streamer') {
            recFly = "Tungsten Perdigon / Rainbow Warrior (#16–#18)";
            tippetRec = "6X Fluorocarbon (3.5 lbs)";
            tech = `Cold Water Lethargy (${wTemp}°C): Trout are hugging the bottom. Euro-nymph slow and deep in tail-outs & winter pools.`;
            icon = "❄️";
        } else if (activity === 'dry') {
            recFly = water === 'clear' ? "Royal Wulff / Parachute Adams (#16)" : "Kosciuszko Dun / Gum Beetle (#12)";
            tippetRec = (water === 'clear' || fLow.includes('low')) ? "6X Nylon Monofilament (3.5 lbs)" : "5X Nylon Monofilament (4.75 lbs)";
            tech = bio.isHootOwl
                ? `🚨 Thermal Stress (${wTemp}°C): Fish fast, aerated riffles & pocket water at dawn/dusk; land & release fish immediately.`
                : `High-stealth delicate dry fly cast into tail-outs & seams (${wTemp}°C • ${streamCond.riverFlow}).`;
        } else if (activity === 'nymph') {
            recFly = "Pheasant Tail Nymph / Copper John (#14-#16)";
            tippetRec = "5X Fluorocarbon (5.5 lbs)";
            tech = `Indicator or Euro-nymphing through ${wTemp >= 17 ? 'fast oxygenated riffles' : 'deep pools & gravel runs'} (${wTemp}°C).`;
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

    // Check Personal Catch History Intelligence Boost
    let personalBoostHtml = '';
    if (typeof window.computePersonalPatternIntelligence === 'function') {
        const waterFilter = target === 'saltwater' ? 'saltwater' : 'freshwater';
        const intel = window.computePersonalPatternIntelligence(null, { waterType: waterFilter, targetKeyword: target });
        if (intel && intel.topFly) {
            const safePersonalFly = String(intel.topFly.name).replace(/'/g, "\\'");
            const safePersonalRig = intel.topRig ? String(intel.topRig.name).replace(/'/g, "\\'") : '';
            personalBoostHtml = `
                <div style="margin-top: 12px; padding: 10px 12px; border-radius: 8px; background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(0, 210, 255, 0.08) 100%); border: 1px solid rgba(16, 185, 129, 0.35); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                    <div>
                        <div style="font-size: 10.5px; color: #34d399; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;">
                            🏆 Your Proven Personal Match (${intel.topFly.confidence}% Confidence • ${intel.topFly.catches} Landed)
                        </div>
                        <div style="font-size: 13.5px; font-weight: 700; color: #fff; margin-top: 2px;">
                            🪶 ${intel.topFly.name} ${intel.topRig ? `<span style="color: #94a3b8; font-weight: 500; font-size: 12px;">on 🎣 ${intel.topRig.name}</span>` : ''}
                        </div>
                        <div style="font-size: 11px; color: #cbd5e1; margin-top: 2px;">
                            Matched on: ${intel.topFly.reasons.join(' • ')}
                        </div>
                    </div>
                    <button type="button" class="btn btn-sm btn-primary" onclick="window.openCatchWithRecommendedRig('${safePersonalFly}', '${safePersonalRig}')" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border: none; font-size: 11px; font-weight: 700; padding: 6px 10px;">
                        🎣 Rig &amp; Log Catch
                    </button>
                </div>
            `;
        }
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
            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                <span class="badge" style="background: rgba(0, 210, 255, 0.12); color: ${bio.zoneColor || '#00d2ff'}; border: 1px solid ${bio.zoneColor || '#00d2ff'}; padding: 6px 10px; font-size: 11.5px;">
                    ${bio.zoneIcon} ${streamCond.waterTemp}°C • 🌊 ${streamCond.riverFlow}
                </span>
                <span class="badge" style="background: rgba(163, 230, 53, 0.15); color: #a3e635; border: 1px solid #a3e635; padding: 6px 12px; font-size: 12px;">
                    💡 Tippet: ${tippetRec}
                </span>
                <button class="btn btn-primary btn-sm" onclick="FlyBoxApp.quickAddFromHatch('${recFly.split('/')[0].trim().replace(/'/g, "\\'")}', '${activity === 'dry' ? 'Dry Fly' : activity === 'nymph' ? 'Nymph' : 'Streamer'}', '#14', '${tech.replace(/'/g, "\\'")}')">
                    ➕ Stock in Fly Box
                </button>
            </div>
        </div>
        <p style="font-size: 12.5px; color: var(--text-secondary); margin: 10px 0 0 0; line-height: 1.4;">
            🎯 <b>Presentation Technique:</b> ${tech}
        </p>
        ${personalBoostHtml}
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

// Lightweight Image Compressor Helper for Fly Photos (600px provides crisp retina detail while saving 80% storage)
async function resizeFlyPhoto(file, maxDimension = 600) {
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
                const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
                resolve(dataUrl);
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Lightbox & Fly Photo Zoom Modal Handlers
window.__currentLightboxFlyId = null;

window.previewFlyPhoto = function(flyId) {
    const fly = window.FlyBoxApp && window.FlyBoxApp.flies.find(f => f.id === flyId);
    if (!fly || !fly.photo) return;

    window.__currentLightboxFlyId = flyId;
    const modal = document.getElementById('modal-fly-photo-lightbox');
    const title = document.getElementById('fly-lightbox-title');
    const img = document.getElementById('fly-lightbox-img');
    const details = document.getElementById('fly-lightbox-details');

    if (title) title.textContent = `${fly.name}`;
    if (img) img.src = fly.photo;
    if (details) {
        const hooks = Array.isArray(fly.hookSizes) ? fly.hookSizes.join(', ') : (fly.hookSizes || 'Standard');
        details.innerHTML = `
            <div style="display: flex; gap: 8px; justify-content: center; margin-bottom: 6px; flex-wrap: wrap;">
                <span class="badge" style="background: rgba(100, 255, 218, 0.15); color: var(--accent-teal);">${fly.category}</span>
                ${fly.region ? `<span class="badge" style="background: rgba(0, 210, 255, 0.15); color: var(--accent-blue);">${fly.region}</span>` : ''}
                <span class="badge" style="background: rgba(245, 158, 11, 0.15); color: var(--accent-gold);">Hook: ${hooks}</span>
            </div>
            ${fly.description ? `<p style="margin: 6px 0 0 0; color: #cbd5e1;">${fly.description}</p>` : ''}
        `;
    }

    if (modal) modal.classList.add('active');
};

window.closeFlyPhotoLightbox = function() {
    const modal = document.getElementById('modal-fly-photo-lightbox');
    if (modal) modal.classList.remove('active');
    window.__currentLightboxFlyId = null;
};

window.changeFlyPhotoFromLightbox = function() {
    const flyId = window.__currentLightboxFlyId;
    window.closeFlyPhotoLightbox();
    if (flyId && window.FlyBoxApp) {
        window.FlyBoxApp.triggerFlyPhotoUpload(flyId);
    }
};

window.removeFlyPhotoFromLightbox = function() {
    const flyId = window.__currentLightboxFlyId;
    if (!flyId || !window.FlyBoxApp) return;

    if (confirm("Are you sure you want to remove the picture from this fly?")) {
        window.FlyBoxApp.deleteFlyPhoto(flyId);
        window.closeFlyPhotoLightbox();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.FlyBoxApp) window.FlyBoxApp.init();
        if (window.recommendFlyPattern) window.recommendFlyPattern();
    }, 200);
});


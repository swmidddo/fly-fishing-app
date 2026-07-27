// fly_box.js - Virtual Fly Box & Hatch Matcher for Fly Fishing Companion App

const DEFAULT_FLY_PATTERNS = [
    // --- AUSTRALIAN & GLOBAL DRY FLIES ---
    {
        id: "fly_gum_beetle",
        name: "Gum Beetle",
        category: "Dry Fly",
        region: "Australia",
        seasons: [11, 12, 1, 2, 3], // Nov-Mar (Australian Summer)
        waterType: "river",
        hookSizes: ["#12", "#14", "#16"],
        icon: "🪲",
        description: "Essential Australian terrestrial pattern during summer beetle falls on mountain streams.",
        rating: 5
    },
    {
        id: "fly_kosciusko_mayfly",
        name: "Kosciuszko Dun (Mayfly)",
        category: "Dry Fly",
        region: "Australia",
        seasons: [10, 11, 12, 1, 2, 3, 4], // Oct-Apr
        waterType: "river",
        hookSizes: ["#12", "#14"],
        icon: "🦟",
        description: "Iconic Australian highland rivers mayfly dun pattern. Exceptional on Snowy & Victorian rivers.",
        rating: 5
    },
    {
        id: "fly_snowflake_caddis",
        name: "Snowflake Caddis",
        category: "Dry Fly",
        region: "Australia",
        seasons: [10, 11, 12, 1, 2, 3],
        waterType: "river",
        hookSizes: ["#14", "#16"],
        icon: "🦋",
        description: "Triggers aggressive trout strikes during afternoon caddis hatches on fast riffles.",
        rating: 4
    },
    {
        id: "fly_march_fly",
        name: "March Fly / Scruffy",
        category: "Dry Fly",
        region: "Australia",
        seasons: [2, 3, 4], // Feb-Apr
        waterType: "river",
        hookSizes: ["#12", "#14"],
        icon: "🪰",
        description: "Late summer terrestrial bite pattern for big brown and rainbow trout in low rivers.",
        rating: 4
    },
    {
        id: "fly_parachute_adams",
        name: "Parachute Adams",
        category: "Dry Fly",
        region: "Global",
        seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        waterType: "river",
        hookSizes: ["#14", "#16", "#18"],
        icon: "🪰",
        description: "The world's #1 dry fly pattern. High-visibility post mimics virtually any mayfly dun.",
        rating: 5
    },
    {
        id: "fly_elk_caddis",
        name: "Elk Hair Caddis",
        category: "Dry Fly",
        region: "Global",
        seasons: [9, 10, 11, 12, 1, 2, 3, 4],
        waterType: "river",
        hookSizes: ["#12", "#14", "#16"],
        icon: "🦋",
        description: "High-floating caddis adult pattern for skittering across pocket water and fast runs.",
        rating: 5
    },
    {
        id: "fly_royal_wulff",
        name: "Royal Wulff",
        category: "Dry Fly",
        region: "Global",
        seasons: [10, 11, 12, 1, 2, 3],
        waterType: "river",
        hookSizes: ["#10", "#12", "#14"],
        icon: "🪶",
        description: "High buoyancy attractor pattern for rough mountain water and rapid currents.",
        rating: 4
    },

    // --- NYMPHS & SUB-SURFACE ---
    {
        id: "fly_pheasant_tail",
        name: "Pheasant Tail Nymph (Bead Head)",
        category: "Nymph",
        region: "Global",
        seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        waterType: "river",
        hookSizes: ["#14", "#16", "#18"],
        icon: "🪱",
        description: "Deadly nymph imitation representing mayfly nymphs. Must-have for French & Euro nymphing.",
        rating: 5
    },
    {
        id: "fly_hare_ear",
        name: "Gold Ribbed Hare's Ear",
        category: "Nymph",
        region: "Global",
        seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        waterType: "river",
        hookSizes: ["#12", "#14", "#16"],
        icon: "🪱",
        description: "Buggy, fuzzy nymph profile that looks like everything from caddis larvae to small crustaceans.",
        rating: 5
    },
    {
        id: "fly_copper_john",
        name: "Copper John (Brass/Red)",
        category: "Nymph",
        region: "Global",
        seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        waterType: "river",
        hookSizes: ["#14", "#16"],
        icon: "🪲",
        description: "Fast-sinking wire-bodied nymph designed to get down quickly into deep river pools.",
        rating: 4
    },
    {
        id: "fly_zebra_midge",
        name: "Zebra Midge (Black/Silver)",
        category: "Nymph",
        region: "Global",
        seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        waterType: "lake",
        hookSizes: ["#18", "#20", "#22"],
        icon: "🪰",
        description: "Small glass-bead midge pupa pattern. Unbeatable for quiet trout lakes and tailwaters.",
        rating: 5
    },

    // --- STREAMERS & SALTWATER / ESTUARY ---
    {
        id: "fly_woolly_bugger_olive",
        name: "Woolly Bugger (Olive / Gold Bead)",
        category: "Streamer",
        region: "Global",
        seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        waterType: "river",
        hookSizes: ["#6", "#8", "#10"],
        icon: "🪶",
        description: "Imitates yabbies, galaxias baitfish, and mudeyes. The undisputed #1 streamer worldwide.",
        rating: 5
    },
    {
        id: "fly_clouser_minnow",
        name: "Clouser Minnow (Chartreuse/White)",
        category: "Saltwater",
        region: "Australia & Global",
        seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        waterType: "saltwater",
        hookSizes: ["#2", "#4", "#1/0"],
        icon: "🐟",
        description: "Dumbbell-eyed lead fly for Dusky Flathead, Australian Salmon, Bass, Trevally, and Barramundi.",
        rating: 5
    },
    {
        id: "fly_bream_shrimp",
        name: "Estuary Glass Shrimp",
        category: "Saltwater",
        region: "Australia",
        seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        waterType: "saltwater",
        hookSizes: ["#6", "#8"],
        icon: "🦐",
        description: "Ultra-realistic shrimp pattern for sight-casting to Yellowfin Bream, Whiting, and Flathead on sand flats.",
        rating: 5
    },
    {
        id: "fly_crazy_charlie",
        name: "Crazy Charlie (Pink/Tan)",
        category: "Saltwater",
        region: "Global",
        seasons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        waterType: "saltwater",
        hookSizes: ["#4", "#6"],
        icon: "🦐",
        description: "Legendary tropical flats fly for Bonefish, Permit, and Estuary Whiting.",
        rating: 4
    }
];

const FlyBoxApp = {
    flies: [],

    async init() {
        this.loadFliesFromStorage();
        this.renderFlyBoxUI();
        this.renderHatchMatcherUI();
    },

    loadFliesFromStorage() {
        const raw = localStorage.getItem('user_fly_box');
        if (raw) {
            try {
                this.flies = JSON.parse(raw);
            } catch (e) {
                this.flies = [...DEFAULT_FLY_PATTERNS];
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
        this.renderHatchMatcherUI();
        if (window.populateFlyDropdowns) window.populateFlyDropdowns();
    },

    deleteFly(flyId) {
        if (confirm("Are you sure you want to remove this fly from your fly box?")) {
            this.flies = this.flies.filter(f => f.id !== flyId);
            this.saveFliesToStorage();
            this.renderFlyBoxUI();
            this.renderHatchMatcherUI();
            if (window.populateFlyDropdowns) window.populateFlyDropdowns();
        }
    },

    // Hatch Matcher Algorithm
    getRecommendedFlies(waterTypeFilter = 'all') {
        const now = new Date();
        const currentMonth = now.getMonth() + 1; // 1-12

        return this.flies.filter(fly => {
            const matchesSeason = fly.seasons ? fly.seasons.includes(currentMonth) : true;
            const matchesWater = (waterTypeFilter === 'all') || (fly.waterType === waterTypeFilter);
            return matchesSeason && matchesWater;
        }).sort((a, b) => (b.rating || 3) - (a.rating || 3));
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

    renderHatchMatcherUI() {
        const container = document.getElementById('hatch-matcher-recommendations');
        if (!container) return;

        const recommended = this.getRecommendedFlies('all').slice(0, 4);

        if (recommended.length === 0) {
            container.innerHTML = `<p style="font-size: 12px; color: var(--text-secondary);">No active insect hatches detected for current month.</p>`;
            return;
        }

        const monthName = new Date().toLocaleDateString(undefined, { month: 'long' });

        container.innerHTML = `
            <div style="margin-bottom: 10px; font-size: 12px; color: var(--accent-teal); font-weight: 600;">
                🔥 Active ${monthName} Hatch & Pattern Recommendations:
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
                ${recommended.map(fly => `
                    <div style="background: rgba(0, 0, 0, 0.25); border: 1px solid var(--border-color); border-radius: 8px; padding: 10px; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 26px;">${fly.icon || '🪰'}</span>
                        <div style="flex-grow: 1;">
                            <div style="font-weight: 600; font-size: 13px; color: var(--text-primary);">${fly.name}</div>
                            <div style="font-size: 10.5px; color: var(--text-secondary);">${fly.category} • Sizes ${Array.isArray(fly.hookSizes) ? fly.hookSizes[0] : fly.hookSizes}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
};

window.FlyBoxApp = FlyBoxApp;

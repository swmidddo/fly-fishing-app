// knots.js - Interactive Fly Fishing Knot & Tippet Guide with Visual & Vector Diagrams

const KNOT_GUIDE = [
    {
        id: "knot_uni",
        category: "hook",
        categoryLabel: "Line to Hook",
        name: "Uni-Knot",
        purpose: "Universal Tippet to Fly Hook Connection",
        strength: "95%",
        icon: "➰",
        image: "./images/knot_uni.jpg",
        description: "The standard Uni-Knot is one of the most reliable terminal knots in all of angling. Extremely dependable, easy to tie in low light or cold weather, and holds tight on both monofilament and fluorocarbon lines.",
        steps: [
            "Run 6 inches of tippet line through the eye of the fly hook.",
            "Lay the tag end back alongside the standing line to form a loop over both lines.",
            "Wrap the tag end around both lines 4 to 5 times, passing through the loop on each turn.",
            "Moisten line with saliva and pull the tag end to draw the wraps into a neat, tight barrel knot.",
            "Slide the barrel knot down firmly against the hook eye to lock the knot tightly.",
            "Trim tag end clean."
        ]
    },
    {
        id: "knot_clinch",
        category: "hook",
        categoryLabel: "Line to Hook",
        name: "Improved Clinch Knot",
        purpose: "Tippet to Fly Hook (Universal Classic)",
        strength: "95%",
        icon: "🎣",
        image: "./images/knot_clinch.jpg",
        description: "The most widely used terminal knot in fly fishing. Reliable, easy to tie, and holds tight on standard wire hooks (#8 to #18).",
        steps: [
            "Thread 3-4 inches of tippet through the fly hook eye.",
            "Wrap the tag end around the standing line 5 to 7 times.",
            "Thread the tag end through the small loop next to the hook eye.",
            "Pass the tag end back through the large loop you just created.",
            "Moisten with saliva and pull standing line steadily to tighten wraps neatly against the hook eye.",
            "Trim tag end close."
        ]
    },
    {
        id: "knot_nonslip_loop",
        category: "hook",
        categoryLabel: "Line to Hook",
        name: "Non-Slip Loop Knot",
        purpose: "Tippet to Fly (Maximum Swimming Action)",
        strength: "95%",
        icon: "➰",
        image: "./images/knot_loop.jpg",
        description: "The gold standard knot for tying streamer and nymph flies. Creates an open loop so flies swim with natural movement.",
        steps: [
            "Tie an overhand knot in the tippet line about 2-3 inches from the end. Leave it loose.",
            "Pass the tag end through the eye of the fly hook.",
            "Pass the tag end back through the loop of the overhand knot.",
            "Wrap the tag end 4 to 5 times around the standing line above the overhand knot.",
            "Bring the tag end back down and thread it through the overhand knot loop in the same direction it entered.",
            "Moisten with saliva, pull the standing line and fly firmly to seat the knot tight, then trim the tag end."
        ]
    },
    {
        id: "knot_davy",
        category: "hook",
        categoryLabel: "Line to Hook",
        name: "Davy & Double Davy Knot",
        purpose: "Ultra-Fast Tippet to Small Fly (#18-#28)",
        strength: "90% - 98%",
        icon: "🪰",
        image: "./images/knot_davy.jpg",
        description: "The fastest, smallest knot in fly fishing. Uses minimal tippet length, ideal for tiny midges and small flies (#18-#28).",
        steps: [
            "Thread tippet through the fly eye, leaving 2 inches of tag end.",
            "Form a loose overhand knot around the standing line.",
            "Bring the tag end back over the top of the loop and through the loop opening.",
            "For Double Davy: Pass the tag end through the loop a second time for 98% knot strength.",
            "Draw standing line tight to lock the knot tightly against the hook eye, then trim."
        ]
    },
    {
        id: "knot_palomar",
        category: "hook",
        categoryLabel: "Line to Hook",
        name: "Palomar Knot",
        purpose: "Indestructible Tippet to Heavy Streamer / Saltwater Hook",
        strength: "100%",
        icon: "⚓",
        image: "./images/knot_palomar.jpg",
        description: "Virtually impossible to slip or break. Ideal for tying heavy tippet/fluorocarbon to large streamers, bass bugs, and saltwater flies.",
        steps: [
            "Double about 5 inches of tippet line and pass the loop through the fly hook eye.",
            "Tie an overhand knot with the doubled line, leaving the fly hanging loose.",
            "Pass the loop completely over the entire fly body.",
            "Moisten line and pull both standing line and tag end to seat knot tight on hook eye.",
            "Trim tag end clean."
        ]
    },
    {
        id: "knot_turle",
        category: "hook",
        categoryLabel: "Line to Hook",
        name: "Turle Knot (Turl Knot)",
        purpose: "Up/Down Eye Hook Inline Presentation",
        strength: "92%",
        icon: "🦟",
        image: "./images/knot_turle.jpg",
        description: "Traditional dry fly and salmon knot that cinches around the hook shank, keeping tippet perfectly aligned with the hook body.",
        steps: [
            "Thread tippet through the turned eye toward the bend of the hook.",
            "Tie a slip knot loop in the tag end beyond the hook bend.",
            "Pass the large slip loop over the entire fly body.",
            "Pull standing line to cinch the slip loop snugly around the hook shank behind the eye.",
            "Trim short tag end."
        ]
    },
    {
        id: "knot_surgeons",
        category: "line",
        categoryLabel: "Line to Line",
        name: "Surgeon's Knot (Double Surgeon)",
        purpose: "Leader to Tippet / Joining Lines",
        strength: "98%",
        icon: "🪢",
        image: "./images/knot_surgeons.jpg",
        description: "The simplest, fastest, and strongest knot for joining tippet to leader or adding a tippet extension on the water.",
        steps: [
            "Overlap the leader end and new tippet section by 6-8 inches.",
            "Form a simple loop with both lines together.",
            "Pass the fly end of the tippet and tag end of the leader through the loop twice (Double Surgeon) or 3 times (Triple).",
            "Moisten the knot with saliva.",
            "Hold both standing lines and both tag ends, and pull firmly to seat the knot snugly.",
            "Trim both tag ends close to the knot."
        ]
    },
    {
        id: "knot_blood_knot",
        category: "line",
        categoryLabel: "Line to Line",
        name: "Blood Knot",
        purpose: "Joining Monofilament / Fluorocarbon Lines",
        strength: "90%",
        icon: "➰",
        image: "./images/knot_blood.jpg",
        description: "Clean, ultra-slim barrel knot for building custom tapered leaders. Passes smoothly through fly rod guides.",
        steps: [
            "Overlap ends of the two lines by about 6 inches.",
            "Wrap one end around the other line 5 times.",
            "Bring the tag end back and insert it between the two lines at the start of the wraps.",
            "Wrap the second line end 5 times in the opposite direction, and bring its tag end back through the middle gap in the opposite direction.",
            "Moisten and slowly pull standing lines to draw wraps tight together into a neat barrel knot.",
            "Trim both tag ends tight to the knot."
        ]
    },
    {
        id: "knot_nail_knot",
        category: "line",
        categoryLabel: "Line to Line",
        name: "Nail Knot",
        purpose: "Fly Line to Leader Butt Section",
        strength: "92%",
        icon: "🪢",
        image: "./images/knot_nail.jpg",
        description: "Attaches heavy leader butt section to the tip of fly line without bulk.",
        steps: [
            "Lay a hollow tube or nail along the tip of the fly line.",
            "Lay the leader butt along the fly line and tube, leaving a 10-inch tag end.",
            "Wrap the leader tag end backwards around the fly line, tube, and leader 5-6 times.",
            "Thread the tag end back through the tube.",
            "Slide out the tube while keeping wraps neat.",
            "Pull both ends firmly to seat into the fly line coating, then trim."
        ]
    },
    {
        id: "knot_albright",
        category: "line",
        categoryLabel: "Line to Line",
        name: "Albright Special Knot",
        purpose: "Backing Line to Fly Line",
        strength: "95%",
        icon: "➰",
        image: "./images/knot_albright.jpg",
        description: "Joins lines of significantly different diameters, such as Dacron backing line to fly line.",
        steps: [
            "Fold a 2-inch loop in the end of the thick fly line.",
            "Pass 10 inches of backing line through the loop.",
            "Wrap the backing around itself and the fly line loop 10 times, wrapping back toward the loop bend.",
            "Pass the backing tag end back through the loop bend in the same direction it entered.",
            "Moisten and pull backing standing line while sliding wraps tight down to the end of the loop.",
            "Trim tag ends clean."
        ]
    }
];

const KnotsApp = {
    currentFilter: 'all',

    renderKnotsUI(filterCategory = 'all') {
        this.currentFilter = filterCategory;
        const container = document.getElementById('knots-grid-container');
        if (!container) return;

        const filtered = filterCategory === 'all' 
            ? KNOT_GUIDE 
            : KNOT_GUIDE.filter(k => k.category === filterCategory);

        container.innerHTML = filtered.map(k => `
            <div class="card glass knot-card" style="border-left: 4px solid ${k.category === 'hook' ? 'var(--accent-teal)' : '#a3e635'}; padding: 20px; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 32px;">${k.icon}</span>
                        <div>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <h3 style="margin: 0; font-size: 18px; color: var(--text-primary);">${k.name}</h3>
                                <span class="badge" style="background: ${k.category === 'hook' ? 'rgba(0, 210, 255, 0.15)' : 'rgba(163, 230, 53, 0.15)'}; color: ${k.category === 'hook' ? 'var(--accent-teal)' : '#a3e635'}; border: 1px solid ${k.category === 'hook' ? 'var(--accent-teal)' : '#a3e635'}; font-size: 10px; padding: 2px 8px;">${k.categoryLabel}</span>
                            </div>
                            <span style="font-size: 12px; color: var(--text-secondary); font-weight: 500; display: block; margin-top: 2px;">${k.purpose}</span>
                        </div>
                    </div>
                    <span class="badge" style="background: rgba(46, 213, 115, 0.15); color: var(--success); border: 1px solid var(--success); font-size: 11px; padding: 4px 10px;">Strength: ${k.strength}</span>
                </div>

                <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 14px; line-height: 1.4;">${k.description}</p>
                
                <!-- Visual Diagram Aid -->
                <div style="margin-bottom: 16px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border-color); background: rgba(0,0,0,0.4); text-align: center; padding: 8px;">
                    <img src="${k.image}" alt="${k.name} Visual Diagram" loading="eager" 
                        style="width: 100%; height: auto; max-height: 280px; border-radius: 8px; object-fit: contain; display: block; margin: 0 auto;">
                    <span style="display: block; font-size: 11px; color: var(--accent-teal); margin-top: 6px; font-weight: 500;">📷 Step-by-Step Visual Diagram Aid</span>
                </div>

                <div style="background: rgba(0, 0, 0, 0.25); border: 1px solid var(--border-color); border-radius: 10px; padding: 16px;">
                    <div style="font-size: 13px; font-weight: 600; color: var(--text-primary); margin-bottom: 10px;">Step-by-Step Tying Instructions:</div>
                    <ol style="margin: 0; padding-left: 18px; font-size: 13px; color: #cbd5e1; display: flex; flex-direction: column; gap: 8px;">
                        ${k.steps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
            </div>
        `).join('');
    },

    calculateTippet(hookVal, material = 'nylon') {
        const exactMap = {
            ".015": { xRating: ".015\"", diam: ".015\" (0.38 mm)", nylon: "25.0 lbs (11.3 kg)", fluoro: "28.0 lbs (12.7 kg)", hooks: "#4/0, #5/0", ideal: "Offshore Billfish, Tuna & Heavy GT" },
            ".013": { xRating: ".013\"", diam: ".013\" (0.33 mm)", nylon: "20.0 lbs (9.1 kg)", fluoro: "22.0 lbs (10.0 kg)", hooks: "#3/0, #4/0", ideal: "Heavy Saltwater Poppers & Kingfish" },
            ".012": { xRating: ".012\"", diam: ".012\" (0.30 mm)", nylon: "18.5 lbs (8.4 kg)", fluoro: "20.0 lbs (9.1 kg)", hooks: "#2/0, #3/0", ideal: "Saltwater Flats, Bonefish & Permit" },
            "0": { xRating: "0X", diam: ".011\" (0.28 mm)", nylon: "15.5 lbs (7.0 kg)", fluoro: "17.0 lbs (7.7 kg)", hooks: "#1/0, #2, #4", ideal: "Big Articulated Streamers & Salmon" },
            "1": { xRating: "1X", diam: ".010\" (0.25 mm)", nylon: "13.5 lbs (6.1 kg)", fluoro: "14.5 lbs (6.6 kg)", hooks: "#2, #4, #6", ideal: "Large Streamers, Bass Bugs & Steelhead" },
            "2": { xRating: "2X", diam: ".009\" (0.23 mm)", nylon: "11.5 lbs (5.2 kg)", fluoro: "12.5 lbs (5.7 kg)", hooks: "#4, #6, #8", ideal: "Hopper/Dropper Rigs & Heavy Streamers" },
            "4": { xRating: "2X", diam: ".009\" (0.23 mm)", nylon: "11.5 lbs (5.2 kg)", fluoro: "12.5 lbs (5.7 kg)", hooks: "#4, #6, #8", ideal: "Hopper/Dropper Rigs & Heavy Streamers" },
            "6": { xRating: "3X", diam: ".008\" (0.20 mm)", nylon: "8.5 lbs (3.8 kg)", fluoro: "9.5 lbs (4.3 kg)", hooks: "#6, #8, #10", ideal: "Big Dry Flies, Mudeyes & Terrestrials" },
            "8": { xRating: "3X", diam: ".008\" (0.20 mm)", nylon: "8.5 lbs (3.8 kg)", fluoro: "9.5 lbs (4.3 kg)", hooks: "#6, #8, #10", ideal: "Big Dry Flies, Mudeyes & Terrestrials" },
            "10": { xRating: "3X", diam: ".008\" (0.20 mm)", nylon: "8.5 lbs (3.8 kg)", fluoro: "9.5 lbs (4.3 kg)", hooks: "#6, #8, #10", ideal: "Big Dry Flies, Stoneflies & Nymphs" },
            "12": { xRating: "4X", diam: ".007\" (0.18 mm)", nylon: "6.0 lbs (2.7 kg)", fluoro: "7.0 lbs (3.2 kg)", hooks: "#12, #14, #16", ideal: "Workhorse: Mayfly Duns & March Flies" },
            "14": { xRating: "5X", diam: ".006\" (0.15 mm)", nylon: "4.75 lbs (2.15 kg)", fluoro: "5.5 lbs (2.5 kg)", hooks: "#14, #16, #18", ideal: "Standard Dry Flies & Bead Head Nymphs" },
            "16": { xRating: "5X / 6X", diam: ".0055\" (0.14 mm)", nylon: "4.0 lbs (1.8 kg)", fluoro: "4.8 lbs (2.1 kg)", hooks: "#16, #18, #20, #22", ideal: "Small Nymphs, Caddis Adults & Midges" },
            "18": { xRating: "6X / 7X", diam: ".005\" (0.13 mm)", nylon: "3.5 lbs (1.6 kg)", fluoro: "4.0 lbs (1.8 kg)", hooks: "#16, #18, #20, #22", ideal: "Delicate Clear Water Dry Flies & Midges" },
            "20": { xRating: "7X", diam: ".004\" (0.10 mm)", nylon: "2.5 lbs (1.1 kg)", fluoro: "3.0 lbs (1.35 kg)", hooks: "#18, #20, #22, #24", ideal: "Tiny Midge Emergers & Spooky Trout" },
            "22": { xRating: "7X / 8X", diam: ".004\" (0.10 mm)", nylon: "2.5 lbs (1.1 kg)", fluoro: "3.0 lbs (1.35 kg)", hooks: "#18, #20, #22, #24", ideal: "Micro Midges & Spring Creek Trout" },
            "24": { xRating: "8X", diam: ".003\" (0.08 mm)", nylon: "1.75 lbs (0.8 kg)", fluoro: "2.2 lbs (1.0 kg)", hooks: "#22, #24, #26, #28", ideal: "Micro Emergers & Ultra-Delicate Trout" },
            "26": { xRating: "8X", diam: ".003\" (0.08 mm)", nylon: "1.75 lbs (0.8 kg)", fluoro: "2.2 lbs (1.0 kg)", hooks: "#22, #24, #26, #28", ideal: "Micro Midges & Spring Creek Trout" },
            "28": { xRating: "8X", diam: ".003\" (0.08 mm)", nylon: "1.75 lbs (0.8 kg)", fluoro: "2.2 lbs (1.0 kg)", hooks: "#22, #24, #26, #28", ideal: "Micro Midges & Spring Creek Trout" }
        };

        const spec = exactMap[hookVal] || exactMap["14"];
        const selectedTest = material === 'fluoro' ? spec.fluoro : spec.nylon;

        return {
            xRating: spec.xRating,
            diam: spec.diam,
            test: selectedTest,
            hooks: spec.hooks,
            ideal: spec.ideal
        };
    }
};

window.KnotsApp = KnotsApp;

// Standalone Global Filter Function for Knot Categories
window.filterKnotsCategory = function(cat, btnElem) {
    if (!window.KnotsApp) return;
    window.KnotsApp.renderKnotsUI(cat);

    // Update active filter pill button styles
    const buttons = document.querySelectorAll('.knot-filter-btn');
    buttons.forEach(b => {
        b.style.background = 'rgba(255,255,255,0.05)';
        b.style.color = 'var(--text-secondary)';
        b.style.borderColor = 'var(--border-color)';
    });

    if (btnElem) {
        btnElem.style.background = 'rgba(0, 210, 255, 0.15)';
        btnElem.style.color = 'var(--accent-teal)';
        btnElem.style.borderColor = 'var(--accent-teal)';
    }
};

// Standalone Global Function for Tippet Calculator
window.updateTippetCalculatorUI = function() {
    const selectHook = document.getElementById('tippet-hook-select');
    const selectMat = document.getElementById('tippet-material-select');
    if (!selectHook || !window.KnotsApp) return;

    const matVal = selectMat ? selectMat.value : 'nylon';
    const res = window.KnotsApp.calculateTippet(selectHook.value, matVal);
    
    const elX = document.getElementById('tippet-res-x');
    const elDiam = document.getElementById('tippet-res-diam');
    const elTest = document.getElementById('tippet-res-test');

    if (elX) elX.textContent = res.xRating;
    if (elDiam) elDiam.textContent = res.diam;
    if (elTest) elTest.textContent = res.test;
};

// Automatic listener binding & initial render
document.addEventListener('DOMContentLoaded', () => {
    KnotsApp.renderKnotsUI('all');
    window.updateTippetCalculatorUI();

    const selectHook = document.getElementById('tippet-hook-select');
    const selectMat = document.getElementById('tippet-material-select');
    if (selectHook) {
        selectHook.addEventListener('change', window.updateTippetCalculatorUI);
        selectHook.addEventListener('input', window.updateTippetCalculatorUI);
    }
    if (selectMat) {
        selectMat.addEventListener('change', window.updateTippetCalculatorUI);
    }
});

// Immediate execution fallback
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
        KnotsApp.renderKnotsUI('all');
        window.updateTippetCalculatorUI();
    }, 50);
}

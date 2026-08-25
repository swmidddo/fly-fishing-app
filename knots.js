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
    searchQuery: '',
    globalHandedness: 'right', // 'right' or 'left'
    knotStates: {},

    getKnotState(knotId) {
        if (!this.knotStates[knotId]) {
            this.knotStates[knotId] = {
                activeStep: 0,
                isLeftHanded: this.globalHandedness === 'left',
                isPlaying: false,
                timer: null
            };
        }
        return this.knotStates[knotId];
    },

    setStep(knotId, stepIndex) {
        const knot = KNOT_GUIDE.find(k => k.id === knotId);
        if (!knot) return;
        const state = this.getKnotState(knotId);
        const max = knot.steps.length - 1;
        state.activeStep = Math.max(0, Math.min(max, stepIndex));
        this.updateKnotCardDOM(knotId);
    },

    nextStep(knotId) {
        const knot = KNOT_GUIDE.find(k => k.id === knotId);
        if (!knot) return;
        const state = this.getKnotState(knotId);
        if (state.activeStep < knot.steps.length - 1) {
            this.setStep(knotId, state.activeStep + 1);
        } else if (state.isPlaying) {
            this.setStep(knotId, 0);
        }
    },

    prevStep(knotId) {
        const state = this.getKnotState(knotId);
        if (state.activeStep > 0) {
            this.setStep(knotId, state.activeStep - 1);
        }
    },

    togglePlay(knotId) {
        const state = this.getKnotState(knotId);
        const knot = KNOT_GUIDE.find(k => k.id === knotId);
        if (!knot) return;

        if (state.isPlaying) {
            clearInterval(state.timer);
            state.isPlaying = false;
            state.timer = null;
        } else {
            state.isPlaying = true;
            if (state.activeStep >= knot.steps.length - 1) {
                state.activeStep = 0;
                this.updateKnotCardDOM(knotId);
            }
            state.timer = setInterval(() => {
                const curState = this.getKnotState(knotId);
                if (!curState.isPlaying) {
                    clearInterval(curState.timer);
                    return;
                }
                if (curState.activeStep < knot.steps.length - 1) {
                    this.nextStep(knotId);
                } else {
                    curState.activeStep = 0;
                    this.updateKnotCardDOM(knotId);
                }
            }, 3200);
        }
        this.updateKnotCardDOM(knotId);
    },

    toggleHandedness(knotId) {
        const state = this.getKnotState(knotId);
        state.isLeftHanded = !state.isLeftHanded;
        this.updateKnotCardDOM(knotId);
    },

    setGlobalHandedness(handedness) {
        this.globalHandedness = handedness;
        for (const id in this.knotStates) {
            this.knotStates[id].isLeftHanded = (handedness === 'left');
        }
        this.renderKnotsUI(this.currentFilter, this.searchQuery);
    },

    updateKnotCardDOM(knotId) {
        const cardEl = document.getElementById(`knot-card-${knotId}`);
        if (!cardEl) return;
        const knot = KNOT_GUIDE.find(k => k.id === knotId);
        if (!knot) return;
        const state = this.getKnotState(knotId);

        // Update image mirror class & badge
        const imgEl = cardEl.querySelector('.knot-diagram-img');
        const mirrorBadgeEl = cardEl.querySelector('.knot-mirror-badge');
        const handBtnEl = cardEl.querySelector('.btn-toggle-hand');
        if (imgEl) {
            if (state.isLeftHanded) imgEl.classList.add('mirrored');
            else imgEl.classList.remove('mirrored');
        }
        if (mirrorBadgeEl) {
            mirrorBadgeEl.style.display = state.isLeftHanded ? 'inline-block' : 'none';
        }
        if (handBtnEl) {
            handBtnEl.innerHTML = state.isLeftHanded ? '🫲 Left-Handed' : '🫱 Right-Handed';
            handBtnEl.style.borderColor = state.isLeftHanded ? '#a3e635' : 'var(--border-color)';
            handBtnEl.style.color = state.isLeftHanded ? '#a3e635' : 'var(--text-secondary)';
        }

        // Update step counter & progress bar
        const stepCounter = cardEl.querySelector('.knot-step-counter');
        const progressFill = cardEl.querySelector('.knot-progress-fill');
        const activeStepDesc = cardEl.querySelector('.knot-active-step-desc');
        const playBtn = cardEl.querySelector('.btn-knot-play');
        const prevBtn = cardEl.querySelector('.btn-knot-prev');
        const nextBtn = cardEl.querySelector('.btn-knot-next');

        const total = knot.steps.length;
        const cur = state.activeStep;
        const percent = Math.round(((cur + 1) / total) * 100);

        if (stepCounter) stepCounter.textContent = `Step ${cur + 1} of ${total}`;
        if (progressFill) progressFill.style.width = `${percent}%`;
        if (activeStepDesc) activeStepDesc.innerHTML = `<strong>Step ${cur + 1}:</strong> ${knot.steps[cur]}`;

        if (playBtn) {
            playBtn.innerHTML = state.isPlaying ? '⏸️ Pause' : '▶️ Auto-Step';
            playBtn.style.background = state.isPlaying ? 'rgba(239, 68, 68, 0.2)' : 'rgba(0, 210, 255, 0.15)';
            playBtn.style.borderColor = state.isPlaying ? 'var(--accent-red)' : 'var(--accent-teal)';
            playBtn.style.color = state.isPlaying ? 'var(--accent-red)' : 'var(--accent-teal)';
        }

        if (prevBtn) prevBtn.disabled = (cur === 0);
        if (nextBtn) nextBtn.disabled = (cur === total - 1 && !state.isPlaying);

        // Update step list item active highlight
        const stepItems = cardEl.querySelectorAll('.knot-step-item');
        stepItems.forEach((li, idx) => {
            if (idx === cur) {
                li.style.background = 'rgba(0, 210, 255, 0.12)';
                li.style.color = 'var(--accent-teal)';
                li.style.fontWeight = '600';
                li.style.borderColor = 'rgba(0, 210, 255, 0.3)';
            } else if (idx < cur) {
                li.style.background = 'rgba(46, 213, 115, 0.06)';
                li.style.color = '#94a3b8';
                li.style.fontWeight = '400';
                li.style.borderColor = 'rgba(255, 255, 255, 0.05)';
            } else {
                li.style.background = 'transparent';
                li.style.color = '#cbd5e1';
                li.style.fontWeight = '400';
                li.style.borderColor = 'transparent';
            }
        });
    },

    renderKnotsUI(filterCategory = 'all', search = '') {
        this.currentFilter = filterCategory;
        if (search !== undefined && search !== null) {
            this.searchQuery = String(search).toLowerCase().trim();
        }
        const container = document.getElementById('knots-grid-container');
        if (!container) return;

        let filtered = KNOT_GUIDE;
        if (filterCategory !== 'all') {
            filtered = filtered.filter(k => k.category === filterCategory);
        }
        if (this.searchQuery) {
            filtered = filtered.filter(k => 
                k.name.toLowerCase().includes(this.searchQuery) ||
                k.purpose.toLowerCase().includes(this.searchQuery) ||
                k.description.toLowerCase().includes(this.searchQuery) ||
                k.categoryLabel.toLowerCase().includes(this.searchQuery)
            );
        }

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="card glass text-center" style="padding: 40px 20px;">
                    <div style="font-size: 36px; margin-bottom: 10px;">🔍</div>
                    <h4>No knots found matching "${this.searchQuery}"</h4>
                    <p style="font-size: 12px; color: var(--text-secondary); margin-top: 6px;">Try clearing your search or switching categories.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(k => {
            const state = this.getKnotState(k.id);
            const total = k.steps.length;
            const cur = state.activeStep;
            const percent = Math.round(((cur + 1) / total) * 100);
            const isLeft = state.isLeftHanded;

            return `
            <div id="knot-card-${k.id}" class="card glass knot-card" style="border-left: 4px solid ${k.category === 'hook' ? 'var(--accent-teal)' : '#a3e635'}; padding: 20px; margin-bottom: 24px;">
                <!-- Header -->
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 34px;">${k.icon}</span>
                        <div>
                            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                                <h3 style="margin: 0; font-size: 19px; color: var(--text-primary);">${k.name}</h3>
                                <span class="badge" style="background: ${k.category === 'hook' ? 'rgba(0, 210, 255, 0.15)' : 'rgba(163, 230, 53, 0.15)'}; color: ${k.category === 'hook' ? 'var(--accent-teal)' : '#a3e635'}; border: 1px solid ${k.category === 'hook' ? 'var(--accent-teal)' : '#a3e635'}; font-size: 10px; padding: 2px 8px;">${k.categoryLabel}</span>
                                <span class="badge knot-mirror-badge" style="display: ${isLeft ? 'inline-block' : 'none'}; background: rgba(163, 230, 53, 0.15); color: #a3e635; border: 1px solid #a3e635; font-size: 10px; padding: 2px 8px;">🫲 Left-Handed View</span>
                            </div>
                            <span style="font-size: 12px; color: var(--text-secondary); font-weight: 500; display: block; margin-top: 3px;">${k.purpose}</span>
                        </div>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                        <button type="button" class="btn btn-glass btn-sm btn-toggle-hand" onclick="window.KnotsApp.toggleHandedness('${k.id}')" style="font-size: 11px; padding: 4px 10px; border-color: ${isLeft ? '#a3e635' : 'var(--border-color)'}; color: ${isLeft ? '#a3e635' : 'var(--text-secondary)'};">
                            ${isLeft ? '🫲 Left-Handed' : '🫱 Right-Handed'}
                        </button>
                        <span class="badge" style="background: rgba(46, 213, 115, 0.15); color: var(--success); border: 1px solid var(--success); font-size: 11px; padding: 4px 10px;">Strength: ${k.strength}</span>
                    </div>
                </div>

                <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 14px; line-height: 1.45;">${k.description}</p>
                
                <!-- Visual Diagram Aid with CSS Mirror Support -->
                <div class="knot-diagram-container">
                    <img src="${k.image}" alt="${k.name} Visual Diagram" loading="eager" 
                        class="knot-diagram-img ${isLeft ? 'mirrored' : ''}">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; padding: 0 4px;">
                        <span style="font-size: 11px; color: var(--accent-teal); font-weight: 500;">📷 Step-by-Step Visual Reference</span>
                        <span style="font-size: 10.5px; color: var(--text-secondary); opacity: 0.8;">💡 Wet with saliva before seating</span>
                    </div>
                </div>

                <!-- Interactive Step Stepper Controls -->
                <div style="background: rgba(0, 0, 0, 0.35); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; margin-bottom: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span class="step-badge-active">🎬 STEP-BY-STEP GUIDE</span>
                            <span class="knot-step-counter" style="font-size: 12px; color: var(--text-secondary); font-weight: 600;">Step ${cur + 1} of ${total}</span>
                        </div>
                        <div style="display: flex; gap: 6px; align-items: center;">
                            <button type="button" class="btn btn-glass btn-sm btn-knot-prev" onclick="window.KnotsApp.prevStep('${k.id}')" ${cur === 0 ? 'disabled' : ''} style="padding: 4px 10px; font-size: 11.5px;">◀ Prev</button>
                            <button type="button" class="btn btn-glass btn-sm btn-knot-play" onclick="window.KnotsApp.togglePlay('${k.id}')" style="padding: 4px 12px; font-size: 11.5px; background: ${state.isPlaying ? 'rgba(239, 68, 68, 0.2)' : 'rgba(0, 210, 255, 0.15)'}; color: ${state.isPlaying ? 'var(--accent-red)' : 'var(--accent-teal)'}; border-color: ${state.isPlaying ? 'var(--accent-red)' : 'var(--accent-teal)'};">
                                ${state.isPlaying ? '⏸️ Pause' : '▶️ Auto-Step'}
                            </button>
                            <button type="button" class="btn btn-glass btn-sm btn-knot-next" onclick="window.KnotsApp.nextStep('${k.id}')" ${cur === total - 1 ? 'disabled' : ''} style="padding: 4px 10px; font-size: 11.5px;">Next ▶</button>
                        </div>
                    </div>

                    <!-- Progress Bar -->
                    <div class="knot-progress-track">
                        <div class="knot-progress-fill" style="width: ${percent}%;"></div>
                    </div>

                    <!-- Active Step Highlight Box -->
                    <div class="knot-step-highlight">
                        <div class="knot-active-step-desc" style="font-size: 13.5px; color: #ffffff; line-height: 1.5;">
                            <strong>Step ${cur + 1}:</strong> ${k.steps[cur]}
                        </div>
                    </div>

                    <!-- All Steps Overview List -->
                    <div style="font-size: 12px; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Full Tying Sequence:</div>
                    <ol style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 6px;">
                        ${k.steps.map((step, sIdx) => `
                            <li class="knot-step-item" onclick="window.KnotsApp.setStep('${k.id}', ${sIdx})" style="padding: 8px 12px; border-radius: 8px; font-size: 12.5px; border: 1px solid ${sIdx === cur ? 'rgba(0, 210, 255, 0.3)' : 'transparent'}; background: ${sIdx === cur ? 'rgba(0, 210, 255, 0.12)' : (sIdx < cur ? 'rgba(46, 213, 115, 0.06)' : 'transparent')}; color: ${sIdx === cur ? 'var(--accent-teal)' : (sIdx < cur ? '#94a3b8' : '#cbd5e1')}; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: flex-start; gap: 8px;">
                                <span style="font-weight: 700; opacity: 0.8; min-width: 18px;">${sIdx + 1}.</span>
                                <span style="flex: 1;">${step}</span>
                                ${sIdx < cur ? '<span style="color: var(--success); font-size: 11px;">✓</span>' : ''}
                            </li>
                        `).join('')}
                    </ol>
                </div>
            </div>
            `;
        }).join('');
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
    window.KnotsApp.renderKnotsUI(cat, window.KnotsApp.searchQuery);

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

// Standalone Global Function for Knot Search
window.searchKnotsInput = function(query) {
    if (!window.KnotsApp) return;
    window.KnotsApp.renderKnotsUI(window.KnotsApp.currentFilter, query);
};

// Standalone Global Function for Global Handedness Toggle
window.toggleGlobalHandedness = function(handedness) {
    if (!window.KnotsApp) return;
    window.KnotsApp.setGlobalHandedness(handedness);

    const rightBtn = document.getElementById('btn-hand-right');
    const leftBtn = document.getElementById('btn-hand-left');
    if (rightBtn && leftBtn) {
        if (handedness === 'left') {
            leftBtn.style.background = 'rgba(163, 230, 53, 0.2)';
            leftBtn.style.borderColor = '#a3e635';
            leftBtn.style.color = '#a3e635';
            rightBtn.style.background = 'rgba(255,255,255,0.05)';
            rightBtn.style.borderColor = 'var(--border-color)';
            rightBtn.style.color = 'var(--text-secondary)';
        } else {
            rightBtn.style.background = 'rgba(0, 210, 255, 0.15)';
            rightBtn.style.borderColor = 'var(--accent-teal)';
            rightBtn.style.color = 'var(--accent-teal)';
            leftBtn.style.background = 'rgba(255,255,255,0.05)';
            leftBtn.style.borderColor = 'var(--border-color)';
            leftBtn.style.color = 'var(--text-secondary)';
        }
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

    const knotSearchInput = document.getElementById('knot-search-input');
    if (knotSearchInput) {
        const debouncedKnotSearch = window.debounce ? window.debounce((val) => window.searchKnotsInput(val), 90) : (val) => window.searchKnotsInput(val);
        knotSearchInput.addEventListener('input', (e) => debouncedKnotSearch(e.target.value));
    }
});

// Immediate execution fallback
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
        KnotsApp.renderKnotsUI('all');
        window.updateTippetCalculatorUI();
    }, 50);
}

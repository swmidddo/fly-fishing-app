// tackle_db.js - Master Global Fly Fishing Equipment & Tackle Predictive Database
// Full regional coverage for Australia, NZ, Sweden, Norway, Finland, UK, USA, Europe, South Africa & Asia

window.TACKLE_DATABASE = {
    rod: {
        brands: [
            // Oceania & Australia / NZ
            "Primal Fly Rods", "Epic (Swift Fly Fishing)", "Innovator", "Kilwell", "Manic Tackle Project",
            // Sweden, Norway, Finland, UK & Europe
            "Loop Tackle Design", "Vision Fly Fishing", "Guideline", "Nam Products", "Hardy", 
            "JMC", "Soldarini Fly Tackle", "Hanák Competition", "Marryat", "RST",
            // USA & Americas
            "Sage", "Orvis", "Scott Fly Rods", "R.L. Winston", "Thomas & Thomas", 
            "Redington", "Echo", "Temple Fork Outfitters (TFO)", "Douglas Outdoors", "G. Loomis", 
            "Cabela's", "Maxcatch", "Airflo", "Daiwa", "Riverworks"
        ],
        models: [
            // PRIMAL (NZ / Australia)
            { name: "Primal CODE", brand: "Primal Fly Rods", spec: "9ft #5 4pc", notes: "Ultra-fast action high modulus freshwater rod" },
            { name: "Primal RAW", brand: "Primal Fly Rods", spec: "9ft #6 4pc", notes: "Low resin ANM technology streamer rod" },
            { name: "Primal MEGA", brand: "Primal Fly Rods", spec: "9ft #9 4pc", notes: "High power saltwater flats & predator rod" },
            { name: "Primal RUN", brand: "Primal Fly Rods", spec: "9ft #5 4pc", notes: "Smooth loading general trout rod" },
            { name: "Primal SURGE", brand: "Primal Fly Rods", spec: "9ft #8 4pc", notes: "Saltwater inshore & estuary rod" },
            { name: "Primal WILD", brand: "Primal Fly Rods", spec: "7ft 10in #3 4pc", notes: "Small stream bush bashing presentation rod" },

            // LOOP TACKLE DESIGN (Sweden)
            { name: "Loop 7X", brand: "Loop Tackle Design", spec: "9ft #5 4pc", notes: "Heptagonal heptagon blank performance flagship" },
            { name: "Loop Opti KO", brand: "Loop Tackle Design", spec: "9ft #6 4pc", notes: "Cross-woven carbon power rod" },
            { name: "Loop Opti K2", brand: "Loop Tackle Design", spec: "9ft 6in #6 4pc", notes: "Euro & streamer specialist rod" },
            { name: "Loop Evotec Cast", brand: "Loop Tackle Design", spec: "9ft #5 4pc", notes: "Color-coded action flex curve rod" },
            { name: "Loop Cross SX", brand: "Loop Tackle Design", spec: "9ft #8 4pc", notes: "Cross-weave fast action saltwater rod" },
            { name: "Loop Q Series", brand: "Loop Tackle Design", spec: "9ft #5 4pc", notes: "Smooth casting accessible loop rod" },
            { name: "Loop S1 Spey", brand: "Loop Tackle Design", spec: "13ft #8 6pc", notes: "Two-handed Spey salmon & trout rod" },

            // EPIC / SWIFT FLY FISHING (New Zealand)
            { name: "Epic 580 FastGlass II", brand: "Epic (Swift Fly Fishing)", spec: "8ft #5 4pc", notes: "S2 fiberglass smooth presentation rod" },
            { name: "Epic 686 FastGlass II", brand: "Epic (Swift Fly Fishing)", spec: "8ft 6in #6 4pc", notes: "Heavy fiberglass streamer rod" },
            { name: "Epic 476 FastGlass II", brand: "Epic (Swift Fly Fishing)", spec: "7ft 6in #4 4pc", notes: "Small stream fiberglass dry fly rod" },
            { name: "Epic 590 Carbon", brand: "Epic (Swift Fly Fishing)", spec: "9ft #5 4pc", notes: "Ultra-light silica nano carbon rod" },
            { name: "Epic 890 Salt Carbon", brand: "Epic (Swift Fly Fishing)", spec: "9ft #8 4pc", notes: "Saltwater flats nano-resin rod" },

            // VISION FLY FISHING (Finland)
            { name: "Vision XO Graphene", brand: "Vision Fly Fishing", spec: "9ft #5 4pc", notes: "Graphene fortified light trout rod" },
            { name: "Vision Hero", brand: "Vision Fly Fishing", spec: "9ft #5 4pc", notes: "Versatile medium-fast trout rod" },
            { name: "Vision Merisuola", brand: "Vision Fly Fishing", spec: "9ft #9 4pc", notes: "Saltwater predatory monster rod" },
            { name: "Vision Nymphmaniac", brand: "Vision Fly Fishing", spec: "11ft #3 4pc", notes: "Euro nymphing competition rod" },
            { name: "Vision Stik", brand: "Vision Fly Fishing", spec: "9ft #6 4pc", notes: "Heavy streamer & lake trout rod" },

            // GUIDELINE (Norway) & NAM (Sweden)
            { name: "Guideline NT11", brand: "Guideline", spec: "9ft #5 4pc", notes: "CAP T11 carbon nano technology flagship" },
            { name: "Guideline LPX Tactical", brand: "Guideline", spec: "9ft #4 4pc", notes: "Ultra-light delicate dry fly rod" },
            { name: "Guideline LPX Coastal", brand: "Guideline", spec: "9ft #8 4pc", notes: "Saltwater seatrout & flats rod" },
            { name: "Guideline Elevation", brand: "Guideline", spec: "9ft #5 4pc", notes: "Eco-friendly low-resin casting rod" },
            { name: "Nam Delgado", brand: "Nam Products", spec: "9ft #5 4pc", notes: "Delicate Scandinavian dry fly rod" },
            { name: "Nam Ren", brand: "Nam Products", spec: "9ft #6 4pc", notes: "Fast action lake streamer rod" },

            // SAGE (USA)
            { name: "Sage R8 Core", brand: "Sage", spec: "9ft #5 4pc", notes: "Multi-application fast action flagship freshwater rod" },
            { name: "Sage Salt R8", brand: "Sage", spec: "9ft #9 4pc", notes: "Saltwater flats speed & power rod" },
            { name: "Sage X", brand: "Sage", spec: "9ft #6 4pc", notes: "KoneticHD fast action streamer/nymph rod" },
            { name: "Sage Sonic", brand: "Sage", spec: "9ft #5 4pc", notes: "Fast action versatile all-rounder" },
            { name: "Sage Foundation", brand: "Sage", spec: "9ft #5 4pc", notes: "Fast action graphite rod made in USA" },
            { name: "Sage Igniter", brand: "Sage", spec: "9ft #6 4pc", notes: "Ultra-fast line speed rod for windy conditions" },
            { name: "Sage Maverick", brand: "Sage", spec: "9ft #8 4pc", notes: "Quick loading saltwater flats rod" },
            { name: "Sage Payload", brand: "Sage", spec: "9ft 3in #8 4pc", notes: "Heavy streamer & big fly casting rod" },
            { name: "Sage Trout LL", brand: "Sage", spec: "9ft #4 4pc", notes: "Delicate dry fly presentation rod" },

            // ORVIS (USA)
            { name: "Orvis Helios 4 F (Finesse)", brand: "Orvis", spec: "9ft #5 4pc", notes: "Pinpoint accuracy dry fly presentation rod" },
            { name: "Orvis Helios 4 D (Distance)", brand: "Orvis", spec: "9ft #8 4pc", notes: "Maximum distance and lifting power" },
            { name: "Orvis Recon", brand: "Orvis", spec: "9ft #9 4pc", notes: "Mid-priced high performance saltwater rod" },
            { name: "Orvis Clearwater", brand: "Orvis", spec: "9ft #5 4pc", notes: "Versatile budget freshwater rod" },

            // HARDY (UK)
            { name: "Hardy Ultralite LL", brand: "Hardy", spec: "10ft 8in #3 4pc", notes: "Euro-nymphing light line specialist rod" },
            { name: "Hardy Marksman", brand: "Hardy", spec: "9ft #5 4pc", notes: "Sintrox 440 carbon dry fly rod" },
            { name: "Hardy Marksman Z", brand: "Hardy", spec: "9ft #9 4pc", notes: "Saltwater big game flats rod" },
            { name: "Hardy Zane Pro", brand: "Hardy", spec: "9ft #9 4pc", notes: "Saltwater flats predator rod" },

            // SCOTT & WINSTON & T&T (USA)
            { name: "Scott Centric", brand: "Scott Fly Rods", spec: "9ft #5 4pc", notes: "Fast action touch & feel trout rod" },
            { name: "Scott Sector", brand: "Scott Fly Rods", spec: "9ft #8 4pc", notes: "Carbon web tech flats rod" },
            { name: "Scott Wave", brand: "Scott Fly Rods", spec: "9ft #8 4pc", notes: "Saltwater crossover powerhouse" },
            { name: "Winston Air 2", brand: "R.L. Winston", spec: "9ft #5 4pc", notes: "Super smooth Boron/Graphite trout rod" },
            { name: "Winston Air 2 Max", brand: "R.L. Winston", spec: "9ft #9 4pc", notes: "Heavy Duty Boron saltwater rod" },
            { name: "Thomas & Thomas Paradigm", brand: "Thomas & Thomas", spec: "9ft #4 4pc", notes: "Presentation dry fly rod" },
            { name: "Thomas & Thomas Sextant", brand: "Thomas & Thomas", spec: "9ft #8 4pc", notes: "Flats predator flagship rod" },

            // REDINGTON, ECHO, TFO, DOUGLAS, G.LOOMIS
            { name: "Redington Vice", brand: "Redington", spec: "9ft #5 4pc", notes: "Fast action multi-spec rod" },
            { name: "Redington Predator", brand: "Redington", spec: "9ft #8 4pc", notes: "Heavy streamer & pike/cod rod" },
            { name: "Echo Carbon XL", brand: "Echo", spec: "9ft #5 4pc", notes: "Smooth medium-fast action" },
            { name: "Echo EPR", brand: "Echo", spec: "9ft #9 4pc", notes: "Extra power rod for windy saltwater" },
            { name: "TFO Pro III", brand: "Temple Fork Outfitters (TFO)", spec: "9ft #5 4pc", notes: "Reliable workhorse freshwater rod" },
            { name: "TFO Mangrove Coast", brand: "Temple Fork Outfitters (TFO)", spec: "9ft #8 4pc", notes: "Smooth loading flats rod" },
            { name: "G. Loomis NRX+ Trout", brand: "G. Loomis", spec: "9ft #5 4pc", notes: "Ultra lightweight power rod" },
            { name: "G. Loomis Asquith", brand: "G. Loomis", spec: "9ft #5 4pc", notes: "Spiral X tech flagship rod" },
            { name: "Douglas Sky G", brand: "Douglas Outdoors", spec: "9ft #5 4pc", notes: "Graphene matrix ultra-light rod" },
            { name: "Innovator HLS", brand: "Innovator", spec: "9ft #6 4pc", notes: "Australian lake and river classic" }
        ],
        specs: [
            "7ft 6in #3 4pc", "8ft 0in #4 4pc", "8ft 6in #4 4pc", 
            "9ft 0in #5 4pc", "9ft 0in #6 4pc", "9ft 0in #7 4pc", 
            "9ft 0in #8 4pc", "9ft 0in #9 4pc", "9ft 0in #10 4pc", 
            "9ft 0in #12 4pc", "10ft 0in #3 Euro Nymph", "10ft 6in #3 Nymph", 
            "11ft 0in #3 Trout Spey", "13ft 0in #8 6pc Spey"
        ]
    },
    reel: {
        brands: [
            // Waterworks-Lamson, Sweden, Norway, Denmark, UK, South Africa, Australia & USA
            "Waterworks-Lamson", "Loop Tackle Design", "Danielsson", "Harfin Reels", "Shilton", "Hardy", 
            "Vision Fly Fishing", "Guideline", "Hatch", "Abel", "Ross", "Orvis", "Nautilus", 
            "Tibor", "Redington", "Sage", "Echo", "Bauer", "Mako", "Galvan", "Maxcatch"
        ],
        models: [
            // WATERWORKS-LAMSON (USA) - Comprehensive Marine & Freshwater Variants
            { name: "Lamson Litespeed M (Marine Saltwater)", brand: "Waterworks-Lamson", spec: "7/8wt Large-Arbor Salt", notes: "Saltwater specific sealed Cobalt drag system with hard anodize" },
            { name: "Lamson Litespeed M 8", brand: "Waterworks-Lamson", spec: "8wt Marine Large-Arbor", notes: "Saltwater flats bonefish & permit sealed drag" },
            { name: "Lamson Litespeed M 10", brand: "Waterworks-Lamson", spec: "10wt Marine Super-Arbor", notes: "Heavy marine tarpon, GT & barramundi reel" },
            { name: "Lamson Litespeed F (Freshwater)", brand: "Waterworks-Lamson", spec: "5wt Large-Arbor", notes: "Ultra lightweight machined freshwater trout reel" },
            { name: "Lamson Litespeed F 5+", brand: "Waterworks-Lamson", spec: "5/6wt Large-Arbor", notes: "Super light trout & grayling drag reel" },
            { name: "Lamson Litespeed F 7+", brand: "Waterworks-Lamson", spec: "7/8wt Large-Arbor", notes: "Lightweight streamer & lake trout reel" },
            { name: "Lamson Cobalt", brand: "Waterworks-Lamson", spec: "8/10wt Super-Arbor", notes: "Waterproof 100ft depth sealed IPX8 drag reel" },
            { name: "Lamson Centerfire", brand: "Waterworks-Lamson", spec: "8/10wt Large-Arbor", notes: "Heavy duty power drag saltwater reel" },
            { name: "Lamson Speedster S", brand: "Waterworks-Lamson", spec: "7/8wt Super-Arbor", notes: "High line retrieval speed narrow arbor reel" },
            { name: "Lamson Guru S", brand: "Waterworks-Lamson", spec: "5/6wt Large-Arbor", notes: "Machined curved arbor trout workhorse reel" },
            { name: "Lamson Liquid S", brand: "Waterworks-Lamson", spec: "5/6wt Large-Arbor", notes: "Updated S-Series die-cast high arbor reel" },
            { name: "Lamson Liquid HD (Heavy Duty)", brand: "Waterworks-Lamson", spec: "7/9wt Full Frame", notes: "Full cage die-cast saltwater & Spey reel" },
            { name: "Lamson Remix S", brand: "Waterworks-Lamson", spec: "5/6wt Hybrid Arbor", notes: "CNC machined case with pressure cast spool" },
            { name: "Lamson Remix HD", brand: "Waterworks-Lamson", spec: "7/9wt Full Frame Hybrid", notes: "Heavy duty hybrid full cage reel" },
            { name: "Lamson Purist / ULA Purist", brand: "Waterworks-Lamson", spec: "3/4wt Clicker", notes: "Ultra light click-pawl trout reel" },

            // LOOP TACKLE DESIGN (Sweden)
            { name: "Loop Opti Megaloop", brand: "Loop Tackle Design", spec: "8/11wt Super-Arbor", notes: "Giant arbor GT & tarpon reel" },
            { name: "Loop Opti Speedrunner", brand: "Loop Tackle Design", spec: "7/8wt Large-Arbor", notes: "Ultra-fast line retrieval reel" },
            { name: "Loop Opti Strike", brand: "Loop Tackle Design", spec: "5/6wt Mid-Arbor", notes: "Sealed drag trout reel" },
            { name: "Loop Opti Runner", brand: "Loop Tackle Design", spec: "6/7wt Large-Arbor", notes: "Medium saltwater & heavy trout reel" },
            { name: "Loop Opti Creek", brand: "Loop Tackle Design", spec: "2/4wt Ultra Light", notes: "Lightweight creek trout reel" },
            { name: "Loop Evotec G4 HD", brand: "Loop Tackle Design", spec: "7/9wt Heavy Duty", notes: "Full frame power matrix drag reel" },
            { name: "Loop Traditional 2W", brand: "Loop Tackle Design", spec: "5/7wt Roller Bearing", notes: "Swedish original roller bearing clicker" },
            { name: "Loop Traditional 3W", brand: "Loop Tackle Design", spec: "8/11wt Salmon/Salt", notes: "Classic roller check salmon reel" },
            { name: "Loop Q Reel 7/9", brand: "Loop Tackle Design", spec: "7/9wt Large-Arbor", notes: "Smooth sealed disc drag reel" },

            // HARFIN (Australia) & SHILTON (South Africa)
            { name: "Harfin LR-ST 9/11", brand: "Harfin Reels", spec: "9/11wt Large-Arbor", notes: "Machined Australian pelagic & flats reel" },
            { name: "Harfin LR-ST 7/9", brand: "Harfin Reels", spec: "7/9wt Large-Arbor", notes: "Saltwater estuary & flats reel" },
            { name: "Harfin LR 5/7", brand: "Harfin Reels", spec: "5/7wt Mid-Arbor", notes: "Australian crafted trout & bass reel" },
            { name: "Shilton SR9", brand: "Shilton", spec: "8/10wt Large-Arbor", notes: "Heavy cork drag saltwater reel" },
            { name: "Shilton SR12", brand: "Shilton", spec: "12wt Large-Arbor", notes: "Big game GT and billfish reel" },
            { name: "Shilton SL6", brand: "Shilton", spec: "8/9wt Large-Arbor", notes: "Smooth cork drag flats reel" },
            { name: "Shilton CR3", brand: "Shilton", spec: "4/5wt Large-Arbor", notes: "Lightweight clicker trout reel" },

            // DANIELSSON (Sweden)
            { name: "Danielsson Original 2W", brand: "Danielsson", spec: "5/8wt Large-Arbor", notes: "Swedish roller check ultralight reel" },
            { name: "Danielsson L5W 6nine", brand: "Danielsson", spec: "6/9wt Large-Arbor", notes: "Sealed waterproof drag powerhouse" },
            { name: "Danielsson F3W 4seven", brand: "Danielsson", spec: "4/7wt Mid-Arbor", notes: "Smooth progressive drag reel" },
            { name: "Danielsson Control 8-13", brand: "Danielsson", spec: "8/13wt Anti-Reverse", notes: "Anti-reverse big fish control reel" },

            // HATCH & ABEL (USA)
            { name: "Hatch Iconic 3 Plus", brand: "Hatch", spec: "3/4wt Mid-Arbor", notes: "Lightweight sealed carbon drag trout reel" },
            { name: "Hatch Iconic 5 Plus", brand: "Hatch", spec: "5/6wt Mid-Arbor", notes: "Fully sealed carbon drag system" },
            { name: "Hatch Iconic 7 Plus", brand: "Hatch", spec: "7/9wt Large-Arbor", notes: "Saltwater flats sealed drag reel" },
            { name: "Hatch Iconic 9 Plus", brand: "Hatch", spec: "9/11wt Large-Arbor", notes: "Heavy pelagic & tarpon reel" },
            { name: "Hatch Iconic 11 Plus", brand: "Hatch", spec: "11/13wt Bluewater", notes: "Extreme tarpon & GT bluewater reel" },
            { name: "Abel SDS 7/8", brand: "Abel", spec: "7/8wt Large-Arbor", notes: "Sealed Disc Drag saltwater reel" },
            { name: "Abel SDS 9/10", brand: "Abel", spec: "9/10wt Large-Arbor", notes: "Sealed Disc Drag tarpon reel" },
            { name: "Abel VAYA 5/6", brand: "Abel", spec: "5/6wt Mid-Arbor", notes: "Precision machined trout reel" },
            { name: "Abel ROVE 5/7", brand: "Abel", spec: "5/7wt Mid-Arbor", notes: "Crossover wilderness reel" },
            { name: "Abel Super Series 7/8N", brand: "Abel", spec: "7/8wt Cork Drag", notes: "Classic cork drag saltwater reel" },

            // ROSS & HARDY & NAUTILUS & TIBOR
            { name: "Ross Evolution LTX", brand: "Ross", spec: "5/6wt Large-Arbor", notes: "Ultra-smooth bell-shaped arbor reel" },
            { name: "Ross Evolution FS 8/9", brand: "Ross", spec: "8/9wt Saltwater Full Frame", notes: "Saltwater full cage drag reel" },
            { name: "Hardy Fortuna Z 8/10", brand: "Hardy", spec: "8/10wt Large-Arbor", notes: "Extreme sealed carbon drag saltwater reel" },
            { name: "Hardy Marquis LWT #5", brand: "Hardy", spec: "#5 Click-Pawl", notes: "Classic Alnwick click check reel" },
            { name: "Orvis Mirage USA III", brand: "Orvis", spec: "5/7wt Mid-Arbor", notes: "Sealed carbon/stainless drag USA reel" },
            { name: "Orvis Mirage LT II", brand: "Orvis", spec: "3/5wt Mid-Arbor", notes: "Lightweight sealed drag trout reel" },
            { name: "Orvis Battenkill Disc III", brand: "Orvis", spec: "5/7wt Mid-Arbor", notes: "Classic jewel frame trout reel" },
            { name: "Nautilus NV-G 8/9", brand: "Nautilus", spec: "8/9wt Large-Arbor", notes: "NV-CCF sealed drag reel" },
            { name: "Nautilus CCF-X2 8/10", brand: "Nautilus", spec: "8/10wt Large-Arbor", notes: "Dual action sealed drag reel" },
            { name: "Tibor Riptide", brand: "Tibor", spec: "9/10wt Large-Arbor", notes: "Legendary cork drag tarpon reel" },
            { name: "Tibor Everglades", brand: "Tibor", spec: "7/8wt Large-Arbor", notes: "Flats bonefish & redfish reel" },
            { name: "Redington Behemoth 7/8", brand: "Redington", spec: "7/8wt Super-Arbor", notes: "Heavy die-cast drag powerhouse" },
            { name: "Sage Enforcer 8/9", brand: "Sage", spec: "8/9wt Large-Arbor", notes: "Saltwater sealed drag reel" },
            { name: "Galvan Torque T-5", brand: "Galvan", spec: "5wt Large-Arbor", notes: "Torque drag system trout reel" },
            { name: "Mako 9550 Jack Charlton", brand: "Mako", spec: "8/10wt Large-Arbor", notes: "Legendary carbon drag saltwater reel" }
        ],
        specs: [
            "3/4wt Mid-Arbor", "5/6wt Mid-Arbor", "5/6wt Large-Arbor", 
            "7/8wt Large-Arbor", "8/9wt Large-Arbor", "9/10wt Large-Arbor", 
            "10/12wt Super-Arbor", "Click & Pawl 3wt", "Sealed Carbon Drag 5wt"
        ]
    },
    flyline: {
        brands: [
            "Scientific Anglers", "Rio", "Airflo", "Cortland", "Barrio", 
            "Sunline", "Monic", "Maxcatch", "OPST (Pure Skagit)", "Guideline", "Vision"
        ],
        models: [
            { name: "SA Amplitude Smooth MPX", brand: "Scientific Anglers", spec: "WF5F Floating", notes: "AST Plus slickness general trout line" },
            { name: "SA Amplitude Textured Infinity", brand: "Scientific Anglers", spec: "WF6F Floating", notes: "Textured distance & power taper" },
            { name: "SA Sonar Titan Int/Sink 3/Sink 5", brand: "Scientific Anglers", spec: "WF8S Sinking", notes: "Triple-density streamer line" },
            { name: "Rio Tropical Outbound Short", brand: "Rio", spec: "WF9F/I Intermediate", notes: "Aggressive front taper flats line" },
            { name: "Rio Elite Gold", brand: "Rio", spec: "WF5F Floating", notes: "ConnectCore low stretch trout line" },
            { name: "Airflo Superflo Ridge 2.0 Universal", brand: "Airflo", spec: "WF5F Floating", notes: "PVC-free polyurethane trout line" },
            { name: "Airflo Ridge 2.0 Tropical Punch", brand: "Airflo", spec: "WF9F Floating", notes: "High heat saltwater GT line" },
            { name: "Cortland 444 Classic Sylk", brand: "Cortland", spec: "DT5F Double Taper", notes: "Supple bamboo-style trout line" },
            { name: "Barrio GT90", brand: "Barrio", spec: "WF5F Floating", notes: "Long belly presentation line" }
        ],
        specs: [
            "WF3F Floating", "WF4F Floating", "WF5F Floating", "WF6F Floating", 
            "WF6S Sinking (3-5 ips)", "WF7F Floating", "WF8F Floating", 
            "WF8I Intermediate", "WF9F/I Intermediate", "WF9S Sink 7", "WF10F Tropical GT"
        ]
    },
    leader: {
        brands: ["Rio", "Scientific Anglers", "Airflo", "Cortland", "Varivas", "Hanák", "Manic Tackle Project"],
        models: [
            { name: "Rio Powerflex Trout Leader", brand: "Rio", spec: "9ft 4X 6lb", notes: "Monofilament tapered nylon leader" },
            { name: "Rio Fluoroflex Plus Leader", brand: "Rio", spec: "9ft 3X 8.5lb", notes: "100% fluorocarbon stealth leader" },
            { name: "SA Tapered Leader Nylon", brand: "Scientific Anglers", spec: "9ft 5X 4.9lb", notes: "Low memory copolymer leader" },
            { name: "SA Absolute Fluorocarbon Leader", brand: "Scientific Anglers", spec: "9ft 2X 10lb", notes: "High knot strength fluorocarbon" },
            { name: "Airflo PolyLeader Trout Intermediate", brand: "Airflo", spec: "10ft 1.5ips", notes: "Polyleader sinking tip" },
            { name: "Manic Tapered Trout Leader", brand: "Manic Tackle Project", spec: "9ft 4X 6lb", notes: "Coploymer leader for NZ & AU rivers" }
        ],
        specs: [
            "7.5ft 2X 10lb", "9ft 3X 8.5lb", "9ft 4X 6lb", "9ft 5X 4.9lb", 
            "9ft 6X 3.5lb", "12ft 5X 4.9lb", "10ft Polyleader Intermediate", "6ft 60lb Bite Guard"
        ]
    },
    tippet: {
        brands: ["Rio", "Scientific Anglers", "Trouthunter", "Airflo", "Seaguar", "Frog Hair", "Varivas"],
        models: [
            { name: "Rio Fluoroflex Strong Tippet", brand: "Rio", spec: "4X 8.5lb 30m", notes: "High tensile strength fluorocarbon spool" },
            { name: "Rio Powerflex Copolymer Tippet", brand: "Rio", spec: "5X 5lb 30m", notes: "Supple nylon trout tippet" },
            { name: "SA Absolute Stealth Fluorocarbon", brand: "Scientific Anglers", spec: "3X 11lb 30m", notes: "Tinted low visibility fluorocarbon" },
            { name: "Trouthunter Fluorocarbon Tippet", brand: "Trouthunter", spec: "5X 5.5lb 50m", notes: "Precision diameter competition tippet" },
            { name: "Seaguar Blue Label Fluorocarbon", brand: "Seaguar", spec: "15lb 50yd", notes: "Estuary & saltwater shock tippet" }
        ],
        specs: [
            "2X 12lb Fluorocarbon", "3X 8.5lb Fluorocarbon", "4X 6lb Fluorocarbon", 
            "5X 4.9lb Copolymer", "6X 3.5lb Copolymer", "7X 2.5lb Copolymer", 
            "15lb Saltwater Mono", "20lb Saltwater Mono", "40lb Fluorocarbon Bite"
        ]
    },
    fly: {
        brands: ["Umpqua", "Fulling Mill", "Manic Tackle Project", "Custom Tying", "Feather-Craft", "Enrico Puglisi"],
        models: [
            { name: "Clouser Deep Minnow", brand: "Custom Tying", spec: "#2 Chartreuse/White", notes: "Dumbbell eye weighted streamer for saltwater & bass" },
            { name: "Woolly Bugger", brand: "Custom Tying", spec: "#6 Olive", notes: "Versatile streamer for trout, bass, and cod" },
            { name: "Squimpish Fly", brand: "Custom Tying", spec: "#2/0 Pink/White", notes: "Big baitfish pattern for GT and Barramundi" },
            { name: "EP Minnow", brand: "Enrico Puglisi", spec: "#1/0 Tan/White", notes: "Synthetic fiber baitfish streamer" },
            { name: "Gotcha Saltwater Fly", brand: "Umpqua", spec: "#6 Pearl", notes: "Classic bonefish shrimp pattern" },
            { name: "Crazy Charlie", brand: "Umpqua", spec: "#6 Pink", notes: "Bonefish & permit sand pattern" },
            { name: "Veverka's Mantis Shrimp", brand: "Umpqua", spec: "#4 Tan", notes: "Permit & bonefish weighted shrimp" },
            { name: "Parachute Adams", brand: "Umpqua", spec: "#14 Grey", notes: "High visibility dry fly for trout" },
            { name: "Elk Hair Caddis", brand: "Umpqua", spec: "#12 Tan", notes: "Buoyant caddis dry fly" },
            { name: "Pheasant Tail Nymph (Beadhead)", brand: "Fulling Mill", spec: "#14 Copper Bead", notes: "Classic weighted nymph" },
            { name: "Frenchie Nymph", brand: "Fulling Mill", spec: "#16 Pink Collar", notes: "Euro nymphing hotspot pattern" },
            { name: "Perdigon Nymph", brand: "Fulling Mill", spec: "#16 UV Black", notes: "Heavy resin streamlined Euro nymph" }
        ],
        specs: [
            "#2 Chartreuse/White", "#4 Olive", "#6 Black", "#8 Tan", 
            "#10 Yellow", "#12 Grey", "#14 Natural", "#16 Copper Bead", 
            "#18 Silver Wire", "#1/0 Pearl", "#2/0 Pink/White", "#3/0 Blue/White"
        ]
    }
};

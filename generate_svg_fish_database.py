import os
import json

os.makedirs("images/svg", exist_ok=True)

# Definition of fish illustration templates with species-specific attributes
SPECIES_CONFIGS = {
    # TROUT & SALMONIDS
    "Rainbow Trout": {
        "body_color": "#4a7c59",
        "belly_color": "#d8e2dc",
        "feature_type": "rainbow_stripe",
        "stripe_color": "#e65c9c",
        "spots": True,
        "spot_color": "#1b2a4a",
        "fin_color": "#a8bba2",
        "shape": "trout",
        "id_tip": "Pink/red lateral stripe, dark spots on body and tail fin."
    },
    "Brown Trout": {
        "body_color": "#8c6d3b",
        "belly_color": "#f4e8c1",
        "feature_type": "brown_spots",
        "spots": True,
        "spot_color": "#cc3333",
        "fin_color": "#b59b67",
        "shape": "trout",
        "id_tip": "Golden brown sides with black & haloed red spots."
    },
    "Brook Trout": {
        "body_color": "#2d5a27",
        "belly_color": "#e66025",
        "feature_type": "vermiculations",
        "spots": True,
        "spot_color": "#ff3333",
        "fin_color": "#ff5500",
        "shape": "trout",
        "id_tip": "Worm-like vermiculations on back, white edges on lower fins."
    },
    "Steelhead Trout": {
        "body_color": "#708090",
        "belly_color": "#f0f4f8",
        "feature_type": "rainbow_stripe",
        "stripe_color": "#e0a0bc",
        "spots": True,
        "spot_color": "#2c3e50",
        "fin_color": "#94a3b8",
        "shape": "trout",
        "id_tip": "Bright silver chrome ocean trout with faint pink stripe."
    },
    "Atlantic Salmon": {
        "body_color": "#5a6b7c",
        "belly_color": "#ffffff",
        "feature_type": "x_spots",
        "spots": True,
        "spot_color": "#1e293b",
        "fin_color": "#475569",
        "shape": "salmon",
        "id_tip": "Slender silver body with distinct X-shaped dark spots."
    },

    # NATIVE FRESHWATER APEX & PERCH
    "Murray Cod": {
        "body_color": "#435d3d",
        "belly_color": "#e2e8f0",
        "feature_type": "mottled",
        "mottle_color": "#1f331b",
        "spots": False,
        "fin_color": "#2d4227",
        "shape": "cod",
        "id_tip": "Broad head, mottled yellow-green body, white edges on fins."
    },
    "Trout Cod": {
        "body_color": "#4a5d6e",
        "belly_color": "#f1f5f9",
        "feature_type": "speckled",
        "mottle_color": "#1e293b",
        "spots": False,
        "fin_color": "#334155",
        "shape": "cod",
        "id_tip": "Overhanging top jaw, blue-grey mottling, dark stripe through eye."
    },
    "Mary River Cod": {
        "body_color": "#3f543a",
        "belly_color": "#e2e8f0",
        "feature_type": "mottled",
        "mottle_color": "#1a2a17",
        "spots": False,
        "fin_color": "#2d3e29",
        "shape": "cod",
        "id_tip": "Golden-olive to dark green mottling, protected native."
    },
    "Australian Bass": {
        "body_color": "#4a5568",
        "belly_color": "#cbd5e1",
        "feature_type": "hump_spiny",
        "spots": False,
        "fin_color": "#334155",
        "shape": "perch",
        "id_tip": "Deep bronze-olive body, spiny dorsal fin, clear dark eyes."
    },
    "Estuary Perch": {
        "body_color": "#64748b",
        "belly_color": "#f8fafc",
        "feature_type": "hump_spiny",
        "spots": False,
        "fin_color": "#475569",
        "shape": "perch",
        "id_tip": "Concave forehead profile, silvery-grey body, dark fins."
    },
    "Golden Perch (Yellowbelly)": {
        "body_color": "#78716c",
        "belly_color": "#eab308",
        "feature_type": "yellow_belly",
        "spots": False,
        "fin_color": "#854d0e",
        "shape": "perch_humped",
        "id_tip": "Humped back behind head, vivid yellow to bronze belly."
    },
    "Golden Perch": {
        "body_color": "#78716c",
        "belly_color": "#eab308",
        "feature_type": "yellow_belly",
        "spots": False,
        "fin_color": "#854d0e",
        "shape": "perch_humped",
        "id_tip": "Humped back behind head, vivid yellow to bronze belly."
    },
    "Silver Perch": {
        "body_color": "#94a3b8",
        "belly_color": "#f8fafc",
        "feature_type": "small_head",
        "spots": False,
        "fin_color": "#64748b",
        "shape": "perch",
        "id_tip": "Small beak-like head, oval silver body, dark fin margins."
    },
    "Barramundi": {
        "body_color": "#94a3b8",
        "belly_color": "#ffffff",
        "feature_type": "barramundi_head",
        "eye_color": "#ef4444",
        "spots": False,
        "fin_color": "#64748b",
        "shape": "barramundi",
        "id_tip": "Concave head profile, large silver scales, bright red eye shine."
    },
    "Sooty Grunter": {
        "body_color": "#27272a",
        "belly_color": "#52525b",
        "feature_type": "solid_dark",
        "spots": False,
        "fin_color": "#18181b",
        "shape": "perch",
        "id_tip": "Heavy soot-black to dark golden-brown body, powerful tail."
    },
    "Saratoga": {
        "body_color": "#854d0e",
        "belly_color": "#fef08a",
        "feature_type": "dragon_scales",
        "spots": True,
        "spot_color": "#dc2626",
        "fin_color": "#a16207",
        "shape": "saratoga",
        "id_tip": "Upturned bony mouth, barbels on chin, pink spots on large scales."
    },
    "Redfin Perch": {
        "body_color": "#65a30d",
        "belly_color": "#fef08a",
        "feature_type": "vertical_bars",
        "bar_color": "#1a2e05",
        "fin_color": "#ea580c",
        "shape": "perch",
        "id_tip": "Vivid red pelvic & anal fins, 5-8 dark vertical bands on sides."
    },
    "European Carp": {
        "body_color": "#a16207",
        "belly_color": "#fef08a",
        "feature_type": "barbels",
        "spots": False,
        "fin_color": "#78350f",
        "shape": "carp",
        "id_tip": "Golden-brown body, fleshy barbels at corners of mouth."
    },

    # SALTWATER ESTUARY & REEF
    "Dusky Flathead": {
        "body_color": "#78350f",
        "belly_color": "#fef3c7",
        "feature_type": "mottled_sand",
        "mottle_color": "#451a03",
        "spots": False,
        "fin_color": "#92400e",
        "shape": "flathead",
        "id_tip": "Broad flattened head, brown camouflaged body, dark spot on tail."
    },
    "Sand Flathead": {
        "body_color": "#a16207",
        "belly_color": "#fefce8",
        "feature_type": "mottled_sand",
        "mottle_color": "#78350f",
        "spots": True,
        "spot_color": "#ca8a04",
        "fin_color": "#b45309",
        "shape": "flathead",
        "id_tip": "Light sandy brown body with small reddish brown spots."
    },
    "Yellowfin Bream": {
        "body_color": "#64748b",
        "belly_color": "#f8fafc",
        "feature_type": "yellow_fins",
        "fin_color": "#eab308",
        "shape": "bream",
        "id_tip": "High-backed silver body, bright yellow ventral and anal fins."
    },
    "Black Bream": {
        "body_color": "#334155",
        "belly_color": "#cbd5e1",
        "feature_type": "dark_bream",
        "fin_color": "#1e293b",
        "shape": "bream",
        "id_tip": "Dark bronze to black oval body, black fin edges."
    },
    "Tarwhine": {
        "body_color": "#94a3b8",
        "belly_color": "#f8fafc",
        "feature_type": "golden_lines",
        "line_color": "#eab308",
        "fin_color": "#ca8a04",
        "shape": "bream",
        "id_tip": "Rounded head profile, silver body with horizontal golden lines."
    },
    "Snapper": {
        "body_color": "#f43f5e",
        "belly_color": "#fff1f2",
        "feature_type": "blue_spots",
        "spots": True,
        "spot_color": "#38bdf8",
        "fin_color": "#fb7185",
        "shape": "snapper",
        "id_tip": "Pinkish-red body covered in luminescent electric-blue dots."
    },
    "Pink Snapper": {
        "body_color": "#f43f5e",
        "belly_color": "#fff1f2",
        "feature_type": "blue_spots",
        "spots": True,
        "spot_color": "#38bdf8",
        "fin_color": "#fb7185",
        "shape": "snapper",
        "id_tip": "Pinkish-red body covered in luminescent electric-blue dots."
    },
    "Sand Whiting": {
        "body_color": "#d97706",
        "belly_color": "#fffbeb",
        "feature_type": "slender_gold",
        "fin_color": "#fef08a",
        "shape": "whiting",
        "id_tip": "Long slender silvery-gold body, clear pale fins."
    },
    "King George Whiting": {
        "body_color": "#ca8a04",
        "belly_color": "#fefce8",
        "feature_type": "whiting_spots",
        "spots": True,
        "spot_color": "#78350f",
        "fin_color": "#fef08a",
        "shape": "whiting",
        "id_tip": "Slender body covered in distinct brown spots and slant bars."
    },
    "Mulloway": {
        "body_color": "#64748b",
        "belly_color": "#f8fafc",
        "feature_type": "pearl_dots",
        "spots": True,
        "spot_color": "#ffffff",
        "fin_color": "#475569",
        "shape": "mulloway",
        "id_tip": "Silvery-bronze body, row of pearly white dots along lateral line."
    },
    "Yellowtail Kingfish": {
        "body_color": "#1e3a8a",
        "belly_color": "#ffffff",
        "feature_type": "kingfish_stripe",
        "stripe_color": "#eab308",
        "fin_color": "#eab308",
        "shape": "pelagic",
        "id_tip": "Dark blue-green back, yellow mid-lateral stripe, bright yellow tail."
    },
    "Kingfish (Yellowtail)": {
        "body_color": "#1e3a8a",
        "belly_color": "#ffffff",
        "feature_type": "kingfish_stripe",
        "stripe_color": "#eab308",
        "fin_color": "#eab308",
        "shape": "pelagic",
        "id_tip": "Dark blue-green back, yellow mid-lateral stripe, bright yellow tail."
    },
    "Australian Salmon": {
        "body_color": "#334155",
        "belly_color": "#f8fafc",
        "feature_type": "yellow_pec",
        "fin_color": "#eab308",
        "shape": "pelagic",
        "id_tip": "Streamlined dark blue-green back, yellow pectoral fin, forked tail."
    },
    "Luderick (Blackfish)": {
        "body_color": "#3f3f46",
        "belly_color": "#a1a1aa",
        "feature_type": "vertical_bars",
        "bar_color": "#18181b",
        "fin_color": "#27272a",
        "shape": "bream",
        "id_tip": "Dark brown oval body with 10-12 dark vertical bars."
    },
    "Luderick": {
        "body_color": "#3f3f46",
        "belly_color": "#a1a1aa",
        "feature_type": "vertical_bars",
        "bar_color": "#18181b",
        "fin_color": "#27272a",
        "shape": "bream",
        "id_tip": "Dark brown oval body with 10-12 dark vertical bars."
    },
    "Giant Trevally (GT)": {
        "body_color": "#334155",
        "belly_color": "#94a3b8",
        "feature_type": "steep_head",
        "fin_color": "#1e293b",
        "shape": "trevally",
        "id_tip": "Massive head, steep forehead, powerful dark silvery slab body."
    },
    "Giant Trevally": {
        "body_color": "#334155",
        "belly_color": "#94a3b8",
        "feature_type": "steep_head",
        "fin_color": "#1e293b",
        "shape": "trevally",
        "id_tip": "Massive head, steep forehead, powerful dark silvery slab body."
    },
    "Golden Trevally": {
        "body_color": "#ca8a04",
        "belly_color": "#fef08a",
        "feature_type": "vertical_bars",
        "bar_color": "#1e293b",
        "fin_color": "#eab308",
        "shape": "trevally",
        "id_tip": "Bright golden yellow body with vertical black bands."
    },
    "Mangrove Jack": {
        "body_color": "#9f1239",
        "belly_color": "#ffe4e6",
        "feature_type": "red_jack",
        "fin_color": "#881337",
        "shape": "perch",
        "id_tip": "Deep mangrove-red to bronze body, prominent canine teeth."
    },
    "Coral Trout": {
        "body_color": "#dc2626",
        "belly_color": "#fecaca",
        "feature_type": "vivid_blue_dots",
        "spots": True,
        "spot_color": "#38bdf8",
        "fin_color": "#b91c1c",
        "shape": "cod",
        "id_tip": "Vivid scarlet red body covered in small bright blue spots."
    },
    "Spanish Mackerel": {
        "body_color": "#475569",
        "belly_color": "#f8fafc",
        "feature_type": "wavy_bars",
        "bar_color": "#1e293b",
        "fin_color": "#334155",
        "shape": "mackerel",
        "id_tip": "Elongated silvery body with narrow wavy dark vertical bars."
    },
    "Bonefish": {
        "body_color": "#94a3b8",
        "belly_color": "#ffffff",
        "feature_type": "mirror_silver",
        "fin_color": "#cbd5e1",
        "shape": "bonefish",
        "id_tip": "Conical snout, mirror-like silver body, deeply forked tail."
    },
    "Tarpon": {
        "body_color": "#64748b",
        "belly_color": "#ffffff",
        "feature_type": "giant_scales",
        "fin_color": "#475569",
        "shape": "barramundi",
        "id_tip": "Huge silver scales, upturned lower jaw, trailing dorsal ray."
    },
    "Permit": {
        "body_color": "#64748b",
        "belly_color": "#ffedd5",
        "feature_type": "orange_patch",
        "fin_color": "#ea580c",
        "shape": "trevally",
        "id_tip": "Deep blue-silver disc body with orange belly patch and long fins."
    },
    "Mahi Mahi (Dorado)": {
        "body_color": "#16a34a",
        "belly_color": "#facc15",
        "feature_type": "mahi_crest",
        "spots": True,
        "spot_color": "#0284c7",
        "fin_color": "#2563eb",
        "shape": "mahi",
        "id_tip": "Blunt high forehead crest, electric green, yellow and blue colors."
    },
    "Southern Bluefin Tuna": {
        "body_color": "#1e3a8a",
        "belly_color": "#f8fafc",
        "feature_type": "tuna_finlets",
        "fin_color": "#eab308",
        "shape": "tuna",
        "id_tip": "Metallic dark blue back, silver sides, yellow finlets."
    },
    "Yellowfin Tuna": {
        "body_color": "#1e3a8a",
        "belly_color": "#ffffff",
        "feature_type": "tuna_yellow_sickle",
        "fin_color": "#eab308",
        "shape": "tuna",
        "id_tip": "Bright yellow long sickle-shaped dorsal/anal fins & finlets."
    },
    "Striped Bass": {
        "body_color": "#64748b",
        "belly_color": "#ffffff",
        "feature_type": "horizontal_stripes",
        "stripe_color": "#0f172a",
        "fin_color": "#475569",
        "shape": "perch",
        "id_tip": "Silvery body with 7-8 dark continuous horizontal stripes."
    },
    "Largemouth Bass": {
        "body_color": "#4d7c0f",
        "belly_color": "#fef9c3",
        "feature_type": "lateral_blotches",
        "bar_color": "#1a2e05",
        "fin_color": "#3f6212",
        "shape": "perch",
        "id_tip": "Jaw extends past back of eye, dark blotchy lateral band."
    },
    "Smallmouth Bass": {
        "body_color": "#854d0e",
        "belly_color": "#fef08a",
        "feature_type": "vertical_bars",
        "bar_color": "#451a03",
        "fin_color": "#78350f",
        "shape": "perch",
        "id_tip": "Bronze/brown body with dark vertical bars, red eye."
    },
    "Northern Pike": {
        "body_color": "#3f6212",
        "belly_color": "#fef9c3",
        "feature_type": "yellow_flecks",
        "spots": True,
        "spot_color": "#fef08a",
        "fin_color": "#a16207",
        "shape": "mackerel",
        "id_tip": "Duckbill snout, long green body covered in light bean-shaped spots."
    }
}

def generate_svg(name, config):
    b_col = config["body_color"]
    bel_col = config["belly_color"]
    fin_col = config.get("fin_color", "#475569")
    tip = config.get("id_tip", "Official Species Identification")
    shape = config.get("shape", "trout")

    # SVG paths for various fish body silhouettes
    if shape == "trout" or shape == "salmon":
        body_path = "M 40,90 Q 90,30 220,40 Q 300,50 340,90 Q 300,130 220,135 Q 90,140 40,90 Z"
        belly_path = "M 40,90 Q 90,135 220,135 Q 300,130 340,90 Q 300,110 220,115 Q 90,115 40,90 Z"
        tail_path = "M 340,90 L 390,50 L 375,90 L 390,130 Z"
        dorsal_path = "M 160,42 Q 190,15 220,44 Z"
        pectoral_path = "M 80,105 Q 110,120 100,135 Q 85,120 80,105 Z"
    elif shape == "cod" or shape == "barramundi":
        body_path = "M 30,100 Q 80,25 210,35 Q 290,50 330,95 Q 290,140 210,145 Q 80,145 30,100 Z"
        belly_path = "M 30,100 Q 80,145 210,145 Q 290,140 330,95 Q 280,120 210,125 Q 80,120 30,100 Z"
        tail_path = "M 330,95 Q 375,60 385,95 Q 375,130 330,95 Z"
        dorsal_path = "M 130,37 L 160,10 L 250,40 Z"
        pectoral_path = "M 80,110 Q 115,125 105,140 Q 85,125 80,110 Z"
    elif shape == "perch" or shape == "perch_humped" or shape == "bream" or shape == "snapper" or shape == "trevally":
        body_path = "M 40,95 Q 90,15 200,25 Q 280,45 320,95 Q 280,140 200,145 Q 90,140 40,95 Z"
        belly_path = "M 40,95 Q 90,140 200,145 Q 280,140 320,95 Q 270,120 200,120 Q 90,115 40,95 Z"
        tail_path = "M 320,95 L 380,55 L 360,95 L 380,135 Z"
        dorsal_path = "M 110,32 L 140,5 L 170,20 L 240,30 Z"
        pectoral_path = "M 75,105 Q 110,120 100,135 Q 80,120 75,105 Z"
    elif shape == "flathead":
        body_path = "M 20,95 L 90,55 Q 220,65 330,95 Q 220,125 90,135 Z"
        belly_path = "M 20,95 Q 90,135 220,125 Q 330,95 Q 220,110 90,115 Z"
        tail_path = "M 330,95 L 380,70 L 375,95 L 380,120 Z"
        dorsal_path = "M 140,60 L 170,30 L 250,65 Z"
        pectoral_path = "M 80,100 Q 120,115 110,130 Z"
    elif shape == "whiting" or shape == "bonefish":
        body_path = "M 30,90 Q 100,45 230,55 Q 310,70 345,90 Q 310,110 230,120 Q 100,125 30,90 Z"
        belly_path = "M 30,90 Q 100,125 230,120 Q 310,110 345,90 Q 300,105 230,108 Q 100,105 30,90 Z"
        tail_path = "M 345,90 L 390,60 L 375,90 L 390,120 Z"
        dorsal_path = "M 150,56 L 180,30 L 230,58 Z"
        pectoral_path = "M 70,98 Q 100,110 90,120 Z"
    elif shape == "pelagic" or shape == "mackerel" or shape == "tuna":
        body_path = "M 30,90 Q 110,35 230,45 Q 320,65 350,90 Q 320,115 230,135 Q 110,140 30,90 Z"
        belly_path = "M 30,90 Q 110,140 230,135 Q 320,115 350,90 Q 310,110 230,115 Q 110,110 30,90 Z"
        tail_path = "M 350,90 L 395,40 L 375,90 L 395,140 Z"
        dorsal_path = "M 140,43 L 170,12 L 230,46 Z"
        pectoral_path = "M 80,95 Q 120,105 110,120 Z"
    elif shape == "mahi":
        body_path = "M 30,50 L 80,30 Q 200,40 330,85 Q 200,135 80,135 Q 30,110 30,50 Z"
        belly_path = "M 30,110 Q 80,135 200,135 Q 330,85 Q 200,115 80,115 Z"
        tail_path = "M 330,85 L 390,35 L 370,85 L 390,135 Z"
        dorsal_path = "M 40,40 Q 150,10 320,80 L 320,85 Z"
        pectoral_path = "M 80,85 Q 120,95 110,115 Z"
    else:
        body_path = "M 40,90 Q 90,30 220,40 Q 300,50 340,90 Q 300,130 220,135 Q 90,140 40,90 Z"
        belly_path = "M 40,90 Q 90,135 220,135 Q 300,130 340,90 Q 300,110 220,115 Q 90,115 40,90 Z"
        tail_path = "M 340,90 L 390,50 L 375,90 L 390,130 Z"
        dorsal_path = "M 160,42 Q 190,15 220,44 Z"
        pectoral_path = "M 80,105 Q 110,120 100,135 Q 85,120 80,105 Z"

    # Pattern overlays
    overlay = ""
    feature = config.get("feature_type", "")
    if feature == "rainbow_stripe":
        st_col = config.get("stripe_color", "#e65c9c")
        overlay += f'<path d="M 60,90 Q 180,85 320,90" stroke="{st_col}" stroke-width="16" opacity="0.6" fill="none" stroke-linecap="round" />'
    elif feature == "vertical_bars" or feature == "wavy_bars":
        bar_col = config.get("bar_color", "#000000")
        overlay += f'''
        <path d="M 120,40 L 115,130 M 150,35 L 145,135 M 180,35 L 175,135 M 210,40 L 205,130 M 240,45 L 235,125 M 270,50 L 265,120" 
              stroke="{bar_col}" stroke-width="6" opacity="0.45" stroke-linecap="round" fill="none" />
        '''
    elif feature == "mottled" or feature == "mottled_sand":
        m_col = config.get("mottle_color", "#000000")
        overlay += f'''
        <path d="M 90,60 Q 120,80 150,65 T 210,75 T 270,60 T 310,80" stroke="{m_col}" stroke-width="8" opacity="0.4" fill="none" stroke-dasharray="8 6" />
        <path d="M 80,90 Q 130,100 180,95 T 240,105 T 300,90" stroke="{m_col}" stroke-width="6" opacity="0.35" fill="none" stroke-dasharray="10 8" />
        '''
    elif feature == "kingfish_stripe":
        st_col = config.get("stripe_color", "#eab308")
        overlay += f'<path d="M 50,85 Q 180,80 340,88" stroke="{st_col}" stroke-width="10" opacity="0.85" fill="none" stroke-linecap="round" />'
    elif feature == "horizontal_stripes":
        st_col = config.get("stripe_color", "#0f172a")
        overlay += f'''
        <path d="M 70,60 Q 180,60 300,65 M 65,72 Q 180,72 310,77 M 60,85 Q 180,85 320,90 M 65,98 Q 180,98 310,102 M 70,110 Q 180,110 290,112" 
              stroke="{st_col}" stroke-width="3.5" opacity="0.75" fill="none" />
        '''

    # Spots overlay
    if config.get("spots", False):
        sp_col = config.get("spot_color", "#000000")
        overlay += f'''
        <g fill="{sp_col}" opacity="0.6">
            <circle cx="110" cy="65" r="3" /><circle cx="140" cy="55" r="2.5" /><circle cx="170" cy="60" r="3" /><circle cx="200" cy="50" r="2" />
            <circle cx="230" cy="65" r="3" /><circle cx="260" cy="70" r="2.5" /><circle cx="280" cy="75" r="2" /><circle cx="130" cy="80" r="3" />
            <circle cx="160" cy="75" r="2.5" /><circle cx="190" cy="85" r="3" /><circle cx="220" cy="80" r="2" /><circle cx="250" cy="85" r="3" />
        </g>
        '''

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 200" width="100%" height="100%">
    <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#1e293b" />
        </linearGradient>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="{b_col}" />
            <stop offset="100%" stop-color="{bel_col}" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
    </defs>
    
    <!-- Dark Card Background -->
    <rect width="420" height="200" rx="12" fill="url(#bgGrad)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />
    
    <!-- Watermark grid pattern -->
    <path d="M 0,40 L 420,40 M 0,80 L 420,80 M 0,120 L 420,120 M 0,160 L 420,160" stroke="rgba(255,255,255,0.03)" stroke-width="1" />
    
    <!-- Fins -->
    <path d="{dorsal_path}" fill="{fin_col}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5" />
    <path d="{tail_path}" fill="{fin_col}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5" />
    
    <!-- Main Body -->
    <path d="{body_path}" fill="url(#bodyGrad)" stroke="rgba(0,0,0,0.4)" stroke-width="2" />
    <path d="{belly_path}" fill="{bel_col}" opacity="0.5" />
    
    <!-- Patterns & Details -->
    {overlay}
    
    <!-- Pectoral Fin -->
    <path d="{pectoral_path}" fill="{fin_col}" opacity="0.9" stroke="rgba(0,0,0,0.3)" stroke-width="1" />
    
    <!-- Eye & Gill Cover -->
    <circle cx="65" cy="80" r="6" fill="#ffffff" stroke="#000000" stroke-width="1.5" />
    <circle cx="65" cy="80" r="3.5" fill="#0f172a" />
    <circle cx="63" cy="78" r="1" fill="#ffffff" />
    <path d="M 85,65 Q 95,85 85,105" stroke="rgba(0,0,0,0.4)" stroke-width="2" fill="none" />
    
    <!-- Species Name Header -->
    <text x="16" y="24" fill="#00d2ff" font-family="system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="0.5">NSW DPIRD IDENTIFICATION GUIDE</text>
    
    <!-- Species ID Tip Footer -->
    <rect x="12" y="162" width="396" height="26" rx="6" fill="rgba(0,0,0,0.5)" stroke="rgba(0,210,255,0.2)" stroke-width="1" />
    <text x="20" y="179" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11" font-weight="500">💡 ID: {tip}</text>
</svg>'''
    
    filename = name.lower().replace(" ", "_").replace("(", "").replace(")", "").replace("/", "_") + ".svg"
    filepath = os.path.join("images/svg", filename)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(svg_content)
    return filepath

print("Generating distinct SVG species illustrations for all fish...")
count = 0
for name, config in SPECIES_CONFIGS.items():
    fp = generate_svg(name, config)
    count += 1

print(f"Successfully generated {count} custom SVG fish illustrations in images/svg/")

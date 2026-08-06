import os
import shutil
import glob

brain_dir = r"C:\Users\swmid\.gemini\antigravity\brain\828c54fb-8422-488d-9f5f-bf2f43de3c9c"
target_dir = r"c:\Users\swmid\.gemini\antigravity\scratch\fly-fishing-app\images\dpi_illustrations"

os.makedirs(target_dir, exist_ok=True)

mapping = {
    "rainbow_trout_photo": "rainbow_trout.jpg",
    "brown_trout_photo": "brown_trout.jpg",
    "brook_trout_photo": "brook_trout.jpg",
    "atlantic_salmon_photo": "atlantic_salmon.jpg",
    "murray_cod_photo": "murray_cod.jpg",
    "trout_cod_photo": "trout_cod.jpg",
    "eastern_freshwater_cod_photo": "eastern_freshwater_cod.jpg",
    "mary_river_cod_photo": "mary_river_cod.jpg",
    "macquarie_perch_photo": "macquarie_perch.jpg",
    "australian_bass_photo": "australian_bass.jpg",
    "estuary_perch_photo": "estuary_perch.jpg",
    "silver_perch_photo": "silver_perch.jpg",
    "golden_perch_photo": "golden_perch.jpg",
    "european_carp_photo": "european_carp.jpg",
    "redfin_perch_photo": "redfin_perch.jpg",
    "barramundi_photo": "barramundi.jpg",
    "saratoga_photo": "saratoga.jpg",
    "dusky_flathead_photo": "dusky_flathead.jpg",
    "sand_flathead_photo": "sand_flathead.jpg",
    "flathead_bluespotted_photo": "flathead_bluespotted.jpg",
    "yellowfin_bream_photo": "yellowfin_bream.jpg",
    "black_bream_photo": "black_bream.jpg",
    "luderick_photo": "luderick.jpg",
    "sand_whiting_photo": "sand_whiting.jpg",
    "king_george_whiting_photo": "king_george_whiting.jpg",
    "yellowfin_whiting_photo": "yellowfin_whiting.jpg",
    "mulloway_photo": "mulloway.jpg",
    "mangrove_jack_photo": "mangrove_jack.jpg",
    "giant_trevally_photo": "giant_trevally.jpg",
    "silver_trevally_photo": "silver_trevally.jpg",
    "snapper_photo": "snapper.jpg",
    "golden_snapper_photo": "golden_snapper.jpg",
    "yellowtail_kingfish_photo": "yellowtail_kingfish.jpg",
    "australian_salmon_photo": "australian_salmon.jpg",
    "tailor_photo": "tailor.jpg",
    "garfish_photo": "garfish.jpg",
    "striped_trumpeter_photo": "striped_trumpeter.jpg",
    "queenfish_photo": "queenfish.jpg",
    "eastern_blue_groper_photo": "eastern_blue_groper.jpg",
    "tarwhine_photo": "tarwhine.jpg",
    "sooty_grunter_photo": "sooty_grunter.jpg",
    "mahi_mahi_photo": "mahi_mahi.jpg",
    "spanish_mackerel_photo": "spanish_mackerel.jpg"
}

for prefix, dest_name in mapping.items():
    pattern = os.path.join(brain_dir, f"{prefix}_*.jpg")
    matches = glob.glob(pattern)
    if matches:
        latest = max(matches, key=os.path.getmtime)
        dest_path = os.path.join(target_dir, dest_name)
        shutil.copy(latest, dest_path)
        print(f"Copied {latest} -> {dest_path}")
    else:
        print(f"No match for {prefix}")

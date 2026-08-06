import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("regulations.js", "r", encoding="utf-8") as f:
    reg_text = f.read()

with open("fish_db.js", "r", encoding="utf-8") as f:
    db_text = f.read()

# Extract names and images from fish_db.js
db_entries = {}
for name, img in re.findall(r'name:\s*"([^"]+)"[^{}]+?image:\s*"([^"]+)"', db_text):
    db_entries[name] = img

reg_species = sorted(list(set(re.findall(r'name:\s*"([^"]+)"', reg_text))))

print(f"Checking {len(reg_species)} regulation species against FISH_DATABASE:\n")

matched = 0
unmatched = 0
image_map = {}

for name in reg_species:
    if name == "No marine waters in ACT":
        continue
    name_lower = name.lower()
    clean_name = re.sub(r'\s*\([^)]*\)', '', name_lower).strip()

    # Priority match
    img = db_entries.get(name)
    if not img:
        for db_name, db_img in db_entries.items():
            db_clean = re.sub(r'\s*\([^)]*\)', '', db_name.lower()).strip()
            if db_clean == clean_name:
                img = db_img
                break

    if img:
        matched += 1
        image_map[name] = img
        print(f"✅ {name:35} -> {img}")
    else:
        unmatched += 1
        print(f"❌ {name:35} -> NO MATCH (FALLBACK)")

print(f"\nResult: {matched} matched, {unmatched} unmatched.")

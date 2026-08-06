import re
import json

with open("regulations.js", "r", encoding="utf-8") as f:
    reg_text = f.read()

# Extract names from regulations.js
reg_species = sorted(list(set(re.findall(r'name:\s*"([^"]+)"', reg_text))))

print("Total unique species in REGULATIONS:", len(reg_species))
for s in reg_species:
    print("-", s)

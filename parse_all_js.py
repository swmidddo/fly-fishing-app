import glob, json

# Read each JS file and check line ending / BOM / encoding issues
files = glob.glob('*.js')
for f in files:
    try:
        with open(f, 'r', encoding='utf-8') as fp:
            content = fp.read()
        print(f"[{f}] Read successfully ({len(content)} chars)")
    except Exception as e:
        print(f"[{f}] ENCODING ERROR: {e}")

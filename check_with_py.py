# Python script to check JS syntax via simple regex replacement of regex literals
with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

import re

# Remove single line comments
js = re.sub(r'//.*', '', js)
# Remove multi line comments
js = re.sub(r'/\*[\s\S]*?\*/', '', js)
# Remove template literals
js = re.sub(r'`[\s\S]*?`', '""', js)
# Remove strings
js = re.sub(r'"(?:\\.|[^"\\])*"', '""', js)
js = re.sub(r"'(?:\\.|[^'\\])*'", "''", js)
# Remove regexes like /\b([0-9]{2,3})\s*(?:cm|centimete...)/
js = re.sub(r'/(?:\\.|[^/\\])+/[a-z]*', '0', js)

stack = []
pairs = {')': '(', '}': '{', ']': '['}

for idx, ch in enumerate(js):
    if ch in '({[':
        stack.append((ch, idx))
    elif ch in ')}]':
        if not stack:
            line_no = js[:idx].count('\n') + 1
            print(f"ERROR: Extra closing '{ch}' at line {line_no}")
            break
        top, _ = stack.pop()
        if top != pairs[ch]:
            line_no = js[:idx].count('\n') + 1
            print(f"ERROR: Mismatched '{ch}', expected '{top}' at line {line_no}")
            break

if stack:
    print(f"Unclosed items count: {len(stack)}")
    for item in stack:
        line_no = js[:item[1]].count('\n') + 1
        line_text = js.split('\n')[line_no - 1].strip()
        print(f"Unclosed '{item[0]}' from line {line_no}: {line_text[:60]}")
else:
    print("SUCCESS: app.js HAS PERFECT 100% BRACKET AND PAREN BALANCE!")

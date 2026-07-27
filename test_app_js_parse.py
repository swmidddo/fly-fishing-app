with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

output = []
i = 0
length = len(js)

while i < length:
    if js[i:i+2] == '//':
        i += 2
        while i < length and js[i] != '\n':
            i += 1
    elif js[i:i+2] == '/*':
        i += 2
        while i < length and js[i:i+2] != '*/':
            i += 1
        i += 2
    elif js[i] == '"':
        i += 1
        while i < length and js[i] != '"':
            if js[i] == '\\': i += 1
            i += 1
        i += 1
    elif js[i] == "'":
        i += 1
        while i < length and js[i] != "'":
            if js[i] == '\\': i += 1
            i += 1
        i += 1
    elif js[i] == '`':
        i += 1
        while i < length and js[i] != '`':
            if js[i] == '\\': i += 1
            i += 1
        i += 1
    else:
        output.append((js[i], i))
        i += 1

stack = []
pairs = {')': '(', '}': '{', ']': '['}

for ch, pos in output:
    if ch in '({[':
        stack.append((ch, pos))
    elif ch in ')}]':
        if not stack:
            line_no = js[:pos].count('\n') + 1
            print(f"ERROR: Extra closing '{ch}' at line {line_no}")
            break
        top, _ = stack.pop()
        if top != pairs[ch]:
            line_no = js[:pos].count('\n') + 1
            print(f"ERROR: Mismatched '{ch}', expected '{top}' at line {line_no}")
            break

if stack:
    print(f"Unclosed items count: {len(stack)}")
    for item in stack:
        line_no = js[:item[1]].count('\n') + 1
        line_text = js.split('\n')[line_no - 1].strip()
        print(f"Unclosed '{item[0]}' from line {line_no}: {line_text[:60]}")
else:
    print("SUCCESS: app.js bracket & syntax balance is PERFECT 100%!")

import glob, re

def check_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Strip multi line comments
    content = re.sub(r'/\*[\s\S]*?\*/', '', content)
    # Strip single line comments
    content = re.sub(r'//.*', '', content)
    
    # Strip template literals, double quotes, single quotes
    # Replace regex literals with empty strings
    content = re.sub(r'/(?:\\/|[^/\n])+/[gimsuy]*', '""', content)
    content = re.sub(r'`[\s\S]*?`', '""', content)
    content = re.sub(r'"(?:\\.|[^"\\])*"', '""', content)
    content = re.sub(r"'(?:\\.|[^'\\])*'", '""', content)

    stack = []
    lines = content.split('\n')
    for line_num, line in enumerate(lines, 1):
        for col_num, char in enumerate(line, 1):
            if char in '({[':
                stack.append((char, line_num, col_num))
            elif char in ')}]':
                if not stack:
                    print(f"[{filepath}] ERROR: Extra closing '{char}' at line {line_num}:{col_num}")
                    return False
                top, l, c = stack.pop()
                pair = {'(': ')', '{': '}', '[': ']'}[top]
                if char != pair:
                    print(f"[{filepath}] ERROR: Mismatched '{top}' (line {l}:{c}) with '{char}' at line {line_num}:{col_num}")
                    return False

    if stack:
        top, l, c = stack[-1]
        print(f"[{filepath}] ERROR: Unclosed '{top}' from line {l}:{c}")
        return False

    print(f"[{filepath}] PERFECT! All brackets match.")
    return True

for f in ['app.js', 'auth.js', 'db.js', 'exif.js', 'fish_db.js', 'fly_box.js', 'knots.js', 'map.js', 'regulations.js', 'sw.js', 'tackle_db.js', 'weather.js']:
    check_file(f)

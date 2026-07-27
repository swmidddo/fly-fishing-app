import re

def check_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Strip single line comments
    lines = content.split('\n')
    cleaned_lines = []
    for line in lines:
        # Strip // comments if not in string
        c = re.sub(r'//.*', '', line)
        cleaned_lines.append(c)
    
    content = '\n'.join(cleaned_lines)
    # Strip multi line comments
    content = re.sub(r'/\*[\s\S]*?\*/', '', content)
    
    stack = []
    in_str = False
    quote = ''
    escape = False
    
    for line_num, line in enumerate(content.split('\n'), 1):
        for col_num, char in enumerate(line, 1):
            if in_str:
                if escape:
                    escape = False
                elif char == '\\':
                    escape = True
                elif char == quote:
                    in_str = False
            else:
                if char in ('"', "'", '`'):
                    in_str = True
                    quote = char
                elif char in '({[':
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

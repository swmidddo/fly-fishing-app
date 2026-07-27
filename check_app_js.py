with open('app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

brace_depth = 0
paren_depth = 0
bracket_depth = 0

for line_no, line in enumerate(lines, 1):
    # Remove string literals and comments for basic bracket counting
    clean_line = ''
    in_str = False
    str_char = ''
    i = 0
    while i < len(line):
        ch = line[i]
        if not in_str:
            if ch in ('"', "'", '`'):
                in_str = True
                str_char = ch
            elif ch == '/' and i + 1 < len(line) and line[i+1] == '/':
                break # Comment rest of line
            else:
                clean_line += ch
        else:
            if ch == str_char and (i == 0 or line[i-1] != '\\'):
                in_str = False
        i += 1

    for ch in clean_line:
        if ch == '{': brace_depth += 1
        elif ch == '}': brace_depth -= 1
        elif ch == '(': paren_depth += 1
        elif ch == ')': paren_depth -= 1
        elif ch == '[': bracket_depth += 1
        elif ch == ']': bracket_depth -= 1

    if brace_depth < 0:
        print(f"Extra '}}' at line {line_no}: {line.strip()}")
        break
    if paren_depth < 0:
        print(f"Extra ')' at line {line_no}: {line.strip()}")
        break
    if bracket_depth < 0:
        print(f"Extra ']' at line {line_no}: {line.strip()}")
        break

print(f"Final depths - Brace: {brace_depth}, Paren: {paren_depth}, Bracket: {bracket_depth}")

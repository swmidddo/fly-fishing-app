with open('app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

stack = []

for line_no, line in enumerate(lines, 1):
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
                break
            else:
                clean_line += ch
        else:
            if ch == str_char and (i == 0 or line[i-1] != '\\'):
                in_str = False
        i += 1

    for col_no, ch in enumerate(clean_line, 1):
        if ch in '({[':
            stack.append((ch, line_no, col_no, line.strip()))
        elif ch in ')}]':
            if not stack:
                print(f"Extra closing {ch} at line {line_no}:{col_no}")
                break
            top, l, c, text = stack.pop()

if stack:
    print(f"Total unclosed tokens: {len(stack)}")
    print("Top unclosed items:")
    for item in stack:
        print(f"Unclosed '{item[0]}' from line {item[1]}: {item[3][:60]}")

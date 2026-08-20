with open('app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Check brackets
stack = []
pairs = {')': '(', '}': '{', ']': '['}

in_string = False
string_char = ''
in_multiline_comment = False

for line_idx, line in enumerate(lines, 1):
    i = 0
    while i < len(line):
        ch = line[i]
        
        if in_multiline_comment:
            if ch == '*' and i + 1 < len(line) and line[i+1] == '/':
                in_multiline_comment = False
                i += 1
            i += 1
            continue
            
        if not in_string:
            if ch == '/' and i + 1 < len(line) and line[i+1] == '/':
                # line comment
                break
            if ch == '/' and i + 1 < len(line) and line[i+1] == '*':
                in_multiline_comment = True
                i += 1
                i += 1
                continue
                
        if ch in ('"', "'", '`') and (i == 0 or line[i-1] != '\\'):
            if not in_string:
                in_string = True
                string_char = ch
            elif in_string and string_char == ch:
                in_string = False
        elif not in_string:
            if ch in '({[':
                stack.append((ch, line_idx))
            elif ch in ')}]':
                if not stack:
                    print(f"Unmatched closing {ch} at line {line_idx}")
                else:
                    top, top_line = stack.pop()
                    if top != pairs[ch]:
                        print(f"Mismatched {top} (line {top_line}) with {ch} (line {line_idx})")
        i += 1

if stack:
    print(f"Unclosed brackets left: {len(stack)}")
    for item in stack[:10]:
        print(f"  Unclosed: {item[0]} at line {item[1]}")
else:
    print("ALL BRACKETS CLEAN AND BALANCED!")

import glob

def check_brackets(filename):
    with open(filename, 'r', encoding='utf-8', errors='ignore') as fp:
        lines = fp.readlines()
    
    stack = []
    in_string = False
    string_char = ''
    in_comment = False
    in_multiline_comment = False

    for line_idx, line in enumerate(lines, 1):
        i = 0
        while i < len(line):
            ch = line[i]
            
            if not in_string and not in_multiline_comment and line[i:i+2] == '//':
                break
            if not in_string and not in_multiline_comment and line[i:i+2] == '/*':
                in_multiline_comment = True
                i += 2
                continue
            if in_multiline_comment and line[i:i+2] == '*/':
                in_multiline_comment = False
                i += 2
                continue
            if in_multiline_comment:
                i += 1
                continue
                
            if ch in ('"', "'", '`'):
                if not in_string:
                    in_string = True
                    string_char = ch
                elif string_char == ch and (i == 0 or line[i-1] != '\\'):
                    in_string = False
            elif not in_string:
                if ch in '([{':
                    stack.append((ch, line_idx, i+1))
                elif ch in ')]}':
                    if not stack:
                        print(f"[{filename}] Extra closing {ch} at line {line_idx}, col {i+1}")
                        return False
                    top, t_line, t_col = stack.pop()
                    expected = {'(': ')', '[': ']', '{': '}'}[top]
                    if ch != expected:
                        print(f"[{filename}] Mismatched {top} (from line {t_line}) with {ch} at line {line_idx}, col {i+1}")
                        return False
            i += 1
            
    if stack:
        top, t_line, t_col = stack[-1]
        print(f"[{filename}] Unclosed {top} from line {t_line}, col {t_col}")
        return False
        
    print(f"[{filename}] Brackets OK!")
    return True

files = glob.glob('*.js')
for f in sorted(files):
    check_brackets(f)

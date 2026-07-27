import glob, re

def check_syntax(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        code = f.read()

    # Remove single-line comments
    code_no_comments = re.sub(r'//.*', '', code)
    # Remove multi-line comments
    code_no_comments = re.sub(r'/\*[\s\S]*?\*/', '', code_no_comments)
    # Remove string literals and template literals
    code_no_strings = re.sub(r'`[\s\S]*?`|"(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'', '', code_no_comments)

    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    
    for idx, char in enumerate(code_no_strings):
        if char in '({[':
            stack.append((char, idx))
        elif char in ')}]':
            if not stack:
                return f"Unmatched closing '{char}' at character {idx}"
            top, _ = stack.pop()
            if top != pairs[char]:
                return f"Mismatched '{char}', expected match for '{top}'"

    if stack:
        top, idx = stack[-1]
        # Find line number of idx
        line_num = code_no_strings[:idx].count('\n') + 1
        return f"Unclosed '{top}' from line {line_num}"

    return "SYNTAX OK"

for file in sorted(glob.glob('*.js')):
    result = check_syntax(file)
    print(f"[{file}] {result}")

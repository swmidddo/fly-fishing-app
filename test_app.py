import os, subprocess

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if os.path.exists(edge_path):
    print("Testing index.html in Edge Headless...")
    cmd = f'"{edge_path}" --headless --disable-gpu --dump-dom http://localhost:8080/index.html'
    res = subprocess.run(cmd, capture_output=True, text=True, shell=True)
    if "Dashboard" in res.stdout:
        print("SUCCESS! DOM rendered Dashboard cleanly.")
    else:
        print("DOM Output:", res.stdout[:500])
else:
    print("Edge not found at standard path.")

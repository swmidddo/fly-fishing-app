import subprocess
import os

paths = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
]

browser_exe = None
for p in paths:
    if os.path.exists(p):
        browser_exe = p
        break

print("Using browser:", browser_exe)

if browser_exe:
    cmd = [
        browser_exe,
        "--headless",
        "--disable-gpu",
        "--dump-dom",
        "http://localhost:8080/index.html"
    ]
    res = subprocess.run(cmd, capture_output=True, text=True, timeout=10)
    print("DOM length:", len(res.stdout))
    if "Middo's" in res.stdout:
        print("SUCCESS: Browser rendered index.html DOM completely without locking up!")
    else:
        print("DOM output snippet:", res.stdout[:300])

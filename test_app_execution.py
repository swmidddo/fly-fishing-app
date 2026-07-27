import urllib.request

req = urllib.request.Request('http://localhost:8080/index.html')
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        print(f"HTML length: {len(html)}")
        if 'v=8000' in html:
            print("CONFIRMED: Server IS SERVING VERSION v=8000 LIVE!")
        else:
            print("WARNING: Version v=8000 NOT found!")
except Exception as e:
    print(f"Server error: {e}")

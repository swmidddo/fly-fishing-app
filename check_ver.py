import urllib.request

try:
    with urllib.request.urlopen('http://localhost:8080/index.html') as resp:
        html = resp.read().decode('utf-8')
        if 'v101020' in html:
            print("SUCCESS: Live server on http://localhost:8080/ is serving version v101020!")
        else:
            print("WARNING: v101020 not found in server response.")
except Exception as e:
    print(f"Error checking live server: {e}")

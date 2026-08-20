import urllib.request

try:
    with urllib.request.urlopen('http://localhost:8080/index.html') as resp:
        html = resp.read().decode('utf-8')
        if 'v100900' in html:
            print("SUCCESS: Live server on http://localhost:8080/ is serving version v100900!")
        else:
            print("WARNING: Version tag v100900 not found in server response.")
except Exception as e:
    print(f"Error checking live server: {e}")

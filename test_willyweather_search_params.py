import urllib.request, json, ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

api_key = 'MjlkNjAwNWVjMzA4MTFlOGEwZjMyY2'
lat = -33.8688
lng = 151.2093

urls = [
    f"https://api.willyweather.com.au/v2/{api_key}/search.json?lat={lat}&lng={lng}",
    f"https://api.willyweather.com.au/v2/{api_key}/search.json?query={lat},{lng}",
    f"https://api.willyweather.com.au/v2/{api_key}/search.json?query=-33.86,151.20",
    f"https://api.willyweather.com.au/v2/{api_key}/search.json?query=Sydney",
    f"https://api.willyweather.com.au/v2/{api_key}/locations.json?lat={lat}&lng={lng}"
]

for url in urls:
    print("\n-----------------------------------------")
    print("URL:", url)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, context=ctx) as resp:
            d = json.loads(resp.read().decode('utf-8'))
            print("Status: 200 OK! Data:", json.dumps(d, indent=2)[:400])
    except Exception as e:
        print("Status ERROR:", e)

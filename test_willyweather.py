import urllib.request, json, ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

api_key = 'MjlkNjAwNWVjMzA4MTFlOGEwZjMyY2'
lat = -33.8688
lng = 151.2093

search_urls = [
    f"https://api.willyweather.com.au/v2/{api_key}/search.json?query={lat},{lng}",
    f"https://api.willyweather.com.au/v2/{api_key}/search.json?query=Sydney",
    f"https://api.willyweather.com.au/v2/{api_key}/locations.json?lat={lat}&lng={lng}",
    f"https://api.willyweather.com.au/v2/{api_key}/locations/search.json?query=Sydney"
]

for url in search_urls:
    print("\n----------------------------------")
    print("Testing URL:", url)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, context=ctx) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print("HTTP Status: SUCCESS!")
            print("Response:", json.dumps(data, indent=2)[:600])
    except Exception as e:
        print("HTTP Error:", e)

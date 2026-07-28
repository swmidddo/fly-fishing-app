import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

api_key = 'MjlkNjAwNWVjMzA4MTFlOGEwZjMyY2'
location_id = 19702 # Narrabri Airport

endpoints = [
    f"https://api.willyweather.com.au/v2/{api_key}/locations/{location_id}/weather.json?observational=true",
    f"https://api.willyweather.com.au/v2/{api_key}/locations/{location_id}/weather.json?forecasts=weather,wind,rainfall,tides,sunrisesunset,uv,moonphases&days=1",
    f"https://api.willyweather.com.au/v2/{api_key}/search.json?query=Narrabri"
]

for url in endpoints:
    print("\n-------------------\nTesting URL:", url)
    try:
        with urllib.request.urlopen(url, context=ctx) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print("Result:\n", json.dumps(data, indent=2)[:1500])
    except Exception as e:
        print("Error:", e)

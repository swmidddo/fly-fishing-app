import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

api_key = 'MjlkNjAwNWVjMzA4MTFlOGEwZjMyY2'

location_ids = [4950, 19702, 4659, 752]

for lid in location_ids:
    url = f"https://api.willyweather.com.au/v2/{api_key}/locations/{lid}/weather.json?observational=true&forecasts=weather,wind,rainfall,tides,sunrisesunset,uv,moonphases&days=7"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, context=ctx) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print(f"=== Location ID {lid} ({data.get('location', {}).get('name')}) ===")
            print("Stations in observational:", json.dumps(data.get('observational', {}).get('stations'), indent=2))
    except Exception as e:
        print(f"Error for location {lid}: {e}")

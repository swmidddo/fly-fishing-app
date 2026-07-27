import urllib.request, json, ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

api_key = 'MjlkNjAwNWVjMzA4MTFlOGEwZjMyY2'
location_id = 4950 # Sydney

weather_url = f"https://api.willyweather.com.au/v2/{api_key}/locations/{location_id}/weather.json?forecasts=weather,wind,rainfall,tides,sunrisesunset,uv,moonphases&days=7"
print("Testing WillyWeather Forecast URL:", weather_url)

try:
    req = urllib.request.Request(weather_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    with urllib.request.urlopen(req, context=ctx) as resp:
        wdata = json.loads(resp.read().decode('utf-8'))
        print("\nHTTP Status: SUCCESS!")
        print("Keys in response:", list(wdata.keys()))
        print("Location:", wdata.get('location', {}).get('name'))
        if 'forecasts' in wdata:
            print("Forecast keys:", list(wdata['forecasts'].keys()))
            w = wdata['forecasts'].get('weather', {})
            print("Weather days count:", len(w.get('days', [])))
            print("Day 0 entries:", json.dumps(w.get('days', [])[0], indent=2)[:800])
except Exception as e:
    import traceback
    traceback.print_exc()

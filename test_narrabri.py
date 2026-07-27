import urllib.request, json, ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

api_key = 'MjlkNjAwNWVjMzA4MTFlOGEwZjMyY2'

# Search Narrabri Airport
search_url = f"https://api.willyweather.com.au/v2/{api_key}/search.json?query=Narrabri"
print("1. Search Narrabri:", search_url)

try:
    req = urllib.request.Request(search_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    with urllib.request.urlopen(req, context=ctx) as resp:
        sdata = json.loads(resp.read().decode('utf-8'))
        print("Search data:", json.dumps(sdata, indent=2))

        if isinstance(sdata, list) and len(sdata) > 0:
            location_id = sdata[0]['id']
            station_name = sdata[0]['name']
            print(f"\n2. Fetching weather for Station: {station_name} (ID: {location_id})")

            weather_url = f"https://api.willyweather.com.au/v2/{api_key}/locations/{location_id}/weather.json?forecasts=weather,wind,rainfall,tides,sunrisesunset,uv,moonphases,observational&days=7"
            req2 = urllib.request.Request(weather_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
            try:
                with urllib.request.urlopen(req2, context=ctx) as resp2:
                    wdata = json.loads(resp2.read().decode('utf-8'))
                    print("Weather Keys:", list(wdata.keys()))
                    print("Observational key:", wdata.get('observational'))
            except Exception as e2:
                print("Weather fetch error with observational:", e2)

            weather_url_simple = f"https://api.willyweather.com.au/v2/{api_key}/locations/{location_id}/weather.json?forecasts=weather,wind,rainfall,tides,sunrisesunset,uv,moonphases&days=7"
            print("\n3. Fetching without observational in forecasts:", weather_url_simple)
            req3 = urllib.request.Request(weather_url_simple, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
            with urllib.request.urlopen(req3, context=ctx) as resp3:
                wdata3 = json.loads(resp3.read().decode('utf-8'))
                print("Response keys:", list(wdata3.keys()))
                if 'observational' in wdata3:
                    print("Observational in response:", wdata3['observational'])

except Exception as e:
    import traceback
    traceback.print_exc()

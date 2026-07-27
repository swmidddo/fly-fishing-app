import urllib.request, json, ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

api_key = 'MjlkNjAwNWVjMzA4MTFlOGEwZjMyY2'
lat = -30.3183
lon = 149.8265

print("=== 1. WILLYWEATHER API CALL ===")
search_url = f"https://api.willyweather.com.au/v2/{api_key}/search.json?query=Narrabri"
try:
    req = urllib.request.Request(search_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, context=ctx) as resp:
        sdata = json.loads(resp.read().decode('utf-8'))
        print("WillyWeather Search results:", sdata)
        if isinstance(sdata, list) and len(sdata) > 0:
            location_id = sdata[0]['id'] # 4179 (Narrabri) or 19702 (Narrabri Airport)
            airport_item = [x for x in sdata if 'airport' in x.get('name','').lower()]
            if airport_item:
                location_id = airport_item[0]['id']
            print(f"Using Location ID: {location_id} ({airport_item[0]['name'] if airport_item else sdata[0]['name']})")
            
            w_url = f"https://api.willyweather.com.au/v2/{api_key}/locations/{location_id}/weather.json?forecasts=weather,wind,rainfall,tides,sunrisesunset,uv,moonphases&days=7"
            req2 = urllib.request.Request(w_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req2, context=ctx) as resp2:
                wdata = json.loads(resp2.read().decode('utf-8'))
                print("WillyWeather Forecast Data:", json.dumps(wdata, indent=2)[:1200])
except Exception as e:
    print("WillyWeather ERROR:", e)

print("\n=== 2. OPEN-METEO API CALL ===")
om_url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset,windspeed_10m_max,winddirection_10m_dominant&timezone=auto"
try:
    req = urllib.request.Request(om_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, context=ctx) as resp:
        omdata = json.loads(resp.read().decode('utf-8'))
        print("Open-Meteo Current Weather:", omdata.get('current_weather'))
except Exception as e:
    print("Open-Meteo ERROR:", e)

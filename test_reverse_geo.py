import urllib.request, json, ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# Test location (e.g. Jindabyne or Sydney)
lat = -36.4167
lon = 148.6167

geo_url = f"https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json"
print("Testing Nominatim Reverse Geocode:", geo_url)

try:
    req = urllib.request.Request(geo_url, headers={'User-Agent': 'FlyFishingApp/1.0'})
    with urllib.request.urlopen(req, context=ctx) as resp:
        gdata = json.loads(resp.read().decode('utf-8'))
        print("Address data:", gdata.get('address'))
        suburb = gdata.get('address', {}).get('town') or gdata.get('address', {}).get('suburb') or gdata.get('address', {}).get('city') or gdata.get('address', {}).get('state_district') or gdata.get('address', {}).get('state')
        print("Extracted Suburb/City:", suburb)

        if suburb:
            api_key = 'MjlkNjAwNWVjMzA4MTFlOGEwZjMyY2'
            w_search = f"https://api.willyweather.com.au/v2/{api_key}/search.json?query={urllib.parse.quote(suburb)}"
            print("\nQuerying WillyWeather with suburb:", w_search)
            req2 = urllib.request.Request(w_search, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req2, context=ctx) as resp2:
                wres = json.loads(resp2.read().decode('utf-8'))
                print("WillyWeather Search results count:", len(wres) if isinstance(wres, list) else wres)
                if isinstance(wres, list) and len(wres) > 0:
                    location_id = wres[0]['id']
                    name = wres[0]['name']
                    state = wres[0].get('state')
                    print(f"FOUND WILLYWEATHER STATION: {name} ({state}), ID: {location_id}")

                    # Fetch weather
                    w_weather = f"https://api.willyweather.com.au/v2/{api_key}/locations/{location_id}/weather.json?forecasts=weather,wind,rainfall,tides,sunrisesunset,uv,moonphases&days=7"
                    req3 = urllib.request.Request(w_weather, headers={'User-Agent': 'Mozilla/5.0'})
                    with urllib.request.urlopen(req3, context=ctx) as resp3:
                        weather_data = json.loads(resp3.read().decode('utf-8'))
                        print("SUCCESS! Weather fetched for:", weather_data.get('location', {}).get('name'))
                        w_day0 = weather_data.get('forecasts', {}).get('weather', {}).get('days', [])[0]
                        print("Day 0 Forecast entry:", json.dumps(w_day0, indent=2)[:500])

except Exception as e:
    import traceback
    traceback.print_exc()

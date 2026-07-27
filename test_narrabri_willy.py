import urllib.request, json, ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

api_key = 'MjlkNjAwNWVjMzA4MTFlOGEwZjMyY2'
lat = -30.3183
lon = 149.8265

# 1. Reverse geocode via BigDataCloud
geo_url = f"https://api.bigdatacloud.net/data/reverse-geocode-client?latitude={lat}&longitude={lon}&localityLanguage=en"
req = urllib.request.Request(geo_url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, context=ctx) as resp:
    geo_data = json.loads(resp.read().decode('utf-8'))
    search_location = geo_data.get('locality') or geo_data.get('city') or 'Narrabri'
    print(f"Extracted Location Name: '{search_location}'")

    # 2. Search WillyWeather
    search_url = f"https://api.willyweather.com.au/v2/{api_key}/search.json?query={urllib.parse.quote(search_location)}"
    req2 = urllib.request.Request(search_url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req2, context=ctx) as resp2:
        sdata = json.loads(resp2.read().decode('utf-8'))
        print("\nSearch results count:", len(sdata) if isinstance(sdata, list) else 1)

        airport_match = [item for item in sdata if item.get('name') and 'airport' in item.get('name', '').lower()] if isinstance(sdata, list) else []
        chosen = airport_match[0] if airport_match else (sdata[0] if isinstance(sdata, list) else sdata)
        
        location_id = chosen['id']
        station_name = chosen['name']
        print(f"Selected Station: '{station_name}' (ID: {location_id})")

        # 3. Fetch WillyWeather Forecast
        weather_url = f"https://api.willyweather.com.au/v2/{api_key}/locations/{location_id}/weather.json?forecasts=weather,wind,rainfall,tides,sunrisesunset,uv,moonphases&days=7"
        req3 = urllib.request.Request(weather_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req3, context=ctx) as resp3:
            wdata = json.loads(resp3.read().decode('utf-8'))
            print("\nWillyWeather Data Fetched for:", wdata.get('location', {}).get('name'))
            day0 = wdata.get('forecasts', {}).get('weather', {}).get('days', [])[0]
            print("Today 28 Jul forecast day 0:", json.dumps(day0, indent=2))

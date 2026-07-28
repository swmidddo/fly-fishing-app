import urllib.request
import json
import ssl
import re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

api_key = 'MjlkNjAwNWVjMzA4MTFlOGEwZjMyY2'

locations_to_test = [
    {"name": "Narrabri NSW", "lat": -30.3183, "lon": 149.8265},
    {"name": "Jindabyne NSW (Snowy Mountains)", "lat": -36.4167, "lon": 148.6167},
    {"name": "Bright VIC (Alpine)", "lat": -36.7333, "lon": 146.9667},
    {"name": "Hobart TAS", "lat": -42.8821, "lon": 147.3272},
    {"name": "Darwin NT", "lat": -12.4634, "lon": 130.8456},
    {"name": "Perth WA", "lat": -31.9505, "lon": 115.8605},
    {"name": "Cairns QLD", "lat": -16.9186, "lon": 145.7781},
    {"name": "Alice Springs NT", "lat": -23.6980, "lon": 133.8807}
]

print("=== TESTING CLEANED GEOLOCATION SEARCH FOR 100% AUSTRALIA SUCCESS ===")

for loc in locations_to_test:
    lat, lon = loc["lat"], loc["lon"]
    # 1. Reverse Geocode via BigDataCloud
    geo_url = f"https://api.bigdatacloud.net/data/reverse-geocode-client?latitude={lat}&longitude={lon}&localityLanguage=en"
    town = ''
    try:
        with urllib.request.urlopen(geo_url, context=ctx) as resp:
            gdata = json.loads(resp.read().decode('utf-8'))
            town = gdata.get('locality') or gdata.get('city') or gdata.get('principalSubdivision') or ''
    except Exception as e:
        town = loc["name"].split()[0]
    
    # Clean town name (remove 'city centre', 'City', 'CBD', etc.)
    clean_town = re.sub(r'(?i)\s+(city centre|city|cbd|central)', '', town).strip() or town

    # 2. WillyWeather Search
    search_url = f"https://api.willyweather.com.au/v2/{api_key}/search.json?query={urllib.parse.quote(clean_town)}"
    station_name = "N/A"
    location_id = None
    try:
        with urllib.request.urlopen(search_url, context=ctx) as resp:
            sdata = json.loads(resp.read().decode('utf-8'))
            if isinstance(sdata, list) and len(sdata) > 0:
                airport_match = next((item for item in sdata if item.get('name') and 'airport' in item.get('name').lower()), None)
                chosen = airport_match or sdata[0]
                location_id = chosen.get('id')
                station_name = chosen.get('name')
    except Exception as e:
        station_name = f"Error: {e}"

    # 3. WillyWeather Observational Telemetry
    obs_temp = "N/A"
    if location_id:
        w_url = f"https://api.willyweather.com.au/v2/{api_key}/locations/{location_id}/weather.json?observational=true&forecasts=weather&days=1"
        try:
            with urllib.request.urlopen(w_url, context=ctx) as resp:
                wdata = json.loads(resp.read().decode('utf-8'))
                obs = wdata.get('observational', {}).get('observations', {})
                if 'temperature' in obs and 'temperature' in obs['temperature']:
                    obs_temp = f"{obs['temperature']['temperature']}°C"
                else:
                    days = wdata.get('forecasts', {}).get('weather', {}).get('days', [])
                    if days and days[0].get('entries'):
                        e0 = days[0]['entries'][0]
                        obs_temp = f"{e0.get('min')}°C - {e0.get('max')}°C (Forecast)"
        except Exception as e:
            obs_temp = f"Error: {e}"

    print(f"[{loc['name']}] -> Raw: '{town}' -> Cleaned: '{clean_town}' | Station: '{station_name}' (ID: {location_id}) | Live Obs Temp: {obs_temp}")

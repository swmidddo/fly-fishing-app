import urllib.request
import json
import ssl
import math

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

api_key = 'MjlkNjAwNWVjMzA4MTFlOGEwZjMyY2'

def haversine_km(lat1, lon1, lat2, lon2):
    if lat1 is None or lon1 is None or lat2 is None or lon2 is None:
        return 999999.0
    R = 6371.0
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon/2)**2
    return R * 2 * math.atan2(Math.sqrt(a) if 'Math' in locals() else math.sqrt(a), math.sqrt(1 - a))

# Test locations
locations = [
    {"name": "Sydney CBD", "lat": -33.8688, "lon": 151.2093},
    {"name": "Narrabri", "lat": -30.3183, "lon": 149.8265},
    {"name": "Jindabyne", "lat": -36.4167, "lon": 148.6167},
    {"name": "Outback Remote Spot (Far West NSW)", "lat": -31.5000, "lon": 142.5000}
]

print("=== VERIFYING WILLY WEATHER EXCLUSIVE & 30KM PWS CLARIFICATION RULE ===")

for loc in locations:
    lat, lon = loc["lat"], loc["lon"]
    # 1. Reverse Geocode
    search_terms = []
    try:
        geo_url = f"https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json"
        req = urllib.request.Request(geo_url, headers={'User-Agent': 'FlyFishingApp/1.0'})
        with urllib.request.urlopen(req, context=ctx) as resp:
            gdata = json.loads(resp.read().decode('utf-8'))
            addr = gdata.get('address', {})
            for key in ['suburb', 'town', 'city', 'village', 'hamlet', 'municipality', 'county', 'state_district', 'state']:
                val = addr.get(key)
                if val and val not in search_terms:
                    search_terms.append(val)
    except Exception as e:
        pass

    if not search_terms:
        search_terms = ['Australia']

    # 2. Search WillyWeather
    candidates = []
    seen = set()
    for term in search_terms:
        clean = term.replace('city centre', '').strip()
        url = f"https://api.willyweather.com.au/v2/{api_key}/search.json?query={urllib.parse.quote(clean)}"
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, context=ctx) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                if isinstance(data, list):
                    for item in data:
                        if item.get('id') not in seen:
                            seen.add(item.get('id'))
                            dist = haversine_km(lat, lon, item.get('lat'), item.get('lng'))
                            item['dist'] = dist
                            candidates.append(item)
        except Exception as e:
            pass
        if candidates:
            break

    if candidates:
        candidates.sort(key=lambda x: x['dist'])
        chosen = candidates[0]
        
        # 3. Fetch Observational Data
        w_url = f"https://api.willyweather.com.au/v2/{api_key}/locations/{chosen['id']}/weather.json?observational=true&forecasts=weather,wind&days=1"
        try:
            with urllib.request.urlopen(urllib.request.Request(w_url, headers={'User-Agent': 'Mozilla/5.0'}), context=ctx) as resp:
                wdata = json.loads(resp.read().decode('utf-8'))
                obs_station = wdata.get('observational', {}).get('stations', {}).get('temperature') or wdata.get('observational', {}).get('stations', {}).get('wind')
                pws_name = obs_station.get('name') if obs_station else chosen['name']
                pws_dist = obs_station.get('distance') if (obs_station and obs_station.get('distance') is not None) else chosen['dist']
                
                is_within_30km = pws_dist <= 30.0
                
                if is_within_30km:
                    station_display = f"WillyWeather (PWS: {pws_name}, {pws_dist:.1f} km away)"
                    clarification = f"Verified via PWS: {pws_name} ({pws_dist:.1f} km away)"
                else:
                    station_display = f"WillyWeather ({chosen['name']})"
                    clarification = "None (Outside 30km PWS range)"

                print(f"[{loc['name']}] -> Chosen Station: '{chosen['name']}' ({chosen['dist']:.1f} km)")
                print(f"   Nearest PWS/Obs Station: '{pws_name}' ({pws_dist:.1f} km away)")
                print(f"   Within 30km PWS: {is_within_30km}")
                print(f"   Status Display: '{station_display}'")
                print(f"   PWS Clarification: '{clarification}'\n")
        except Exception as e:
            print(f"[{loc['name']}] Weather fetch error: {e}")
    else:
        print(f"[{loc['name']}] No candidates found.")

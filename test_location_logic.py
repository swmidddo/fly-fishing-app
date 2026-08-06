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
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

def find_willy_location(lat, lon):
    # 1. Reverse geocode via Nominatim
    search_terms = []
    try:
        geo_url = f"https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json"
        req = urllib.request.Request(geo_url, headers={'User-Agent': 'FlyFishingApp/1.0'})
        with urllib.request.urlopen(req, context=ctx) as resp:
            gdata = json.loads(resp.read().decode('utf-8'))
            addr = gdata.get('address', {})
            for key in ['suburb', 'town', 'city', 'village', 'hamlet', 'municipality', 'county', 'state_district']:
                val = addr.get(key)
                if val and val not in search_terms:
                    search_terms.append(val)
    except Exception as e:
        print("Nominatim error:", e)

    # 2. Reverse geocode via BigDataCloud fallback
    try:
        bdc_url = f"https://api.bigdatacloud.net/data/reverse-geocode-client?latitude={lat}&longitude={lon}&localityLanguage=en"
        with urllib.request.urlopen(bdc_url, context=ctx) as resp:
            bdata = json.loads(resp.read().decode('utf-8'))
            for key in ['locality', 'city', 'principalSubdivision']:
                val = bdata.get(key)
                if val and val not in search_terms:
                    search_terms.append(val)
    except Exception as e:
        print("BigDataCloud error:", e)

    if not search_terms:
        search_terms = ['Australia']

    # 3. Query WillyWeather API search for candidate locations
    all_candidates = []
    seen_ids = set()

    for term in search_terms:
        clean_term = term.replace('city centre', '').replace('City', '').strip()
        if not clean_term:
            continue
        s_url = f"https://api.willyweather.com.au/v2/{api_key}/search.json?query={urllib.parse.quote(clean_term)}"
        try:
            req = urllib.request.Request(s_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, context=ctx) as resp:
                sdata = json.loads(resp.read().decode('utf-8'))
                if isinstance(sdata, list):
                    for item in sdata:
                        if item.get('id') not in seen_ids:
                            seen_ids.add(item.get('id'))
                            dist = haversine_km(lat, lon, item.get('lat'), item.get('lng'))
                            item['dist'] = dist
                            all_candidates.append(item)
        except Exception as e:
            print(f"Search error for term {term}:", e)
        
        if len(all_candidates) > 0:
            # We found search results! Break or continue? Breaking early with locality results is good, or sort all
            pass

    if not all_candidates:
        return None

    # Sort all candidate locations strictly by distance to user lat/lon
    all_candidates.sort(key=lambda x: x['dist'])
    chosen = all_candidates[0]
    return chosen

# Test locations
test_locs = [
    ("Narrabri NSW", -30.3183, 149.8265),
    ("Jindabyne NSW", -36.4167, 148.6167),
    ("Parramatta NSW", -33.8148, 151.0070),
    ("Eildon VIC", -37.2333, 145.9167),
    ("Gold Coast QLD", -28.0167, 153.4000)
]

for name, lat, lon in test_locs:
    chosen = find_willy_location(lat, lon)
    if chosen:
        dist = chosen['dist']
        is_pws_within_30 = dist <= 30.0
        print(f"[{name}] User ({lat}, {lon}) -> Chosen Willy Station: {chosen['name']} (ID: {chosen['id']}, {dist:.2f} km) | Within 30km PWS: {is_pws_within_30}")
    else:
        print(f"[{name}] -> NO STATION FOUND")

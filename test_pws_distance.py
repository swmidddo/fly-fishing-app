import urllib.request
import json
import ssl
import math

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

api_key = 'MjlkNjAwNWVjMzA4MTFlOGEwZjMyY2'

def haversine_km(lat1, lon1, lat2, lon2):
    R = 6371.0
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon/2)**2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

# Test location: Narrabri Airport vs Narrabri Town
user_lat = -30.3183
user_lon = 149.8265

url = f"https://api.willyweather.com.au/v2/{api_key}/search.json?query=Narrabri"
with urllib.request.urlopen(url, context=ctx) as resp:
    sdata = json.loads(resp.read().decode('utf-8'))
    print("Search results count:", len(sdata))
    
    stations_with_dist = []
    for item in sdata:
        slat = item.get('lat')
        slng = item.get('lng')
        if slat is not None and slng is not None:
            dist = haversine_km(user_lat, user_lon, slat, slng)
            stations_with_dist.append((dist, item))
    
    stations_with_dist.sort(key=lambda x: x[0])
    
    print("\nSorted Stations by Distance to User:")
    for dist, st in stations_with_dist:
        print(f" -> {st['name']} (ID: {st['id']}) | Distance: {dist:.2f} km | Within 30km: {dist <= 30.0}")


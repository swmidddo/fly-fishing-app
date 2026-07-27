import urllib.request, json, ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# Narrabri Airport coordinates
lat = -30.3183
lon = 149.8265

# 1. Nominatim
geo_url1 = f"https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json"
print("Testing Nominatim:", geo_url1)

try:
    req = urllib.request.Request(geo_url1, headers={'User-Agent': 'FlyFishingApp/1.0'})
    with urllib.request.urlopen(req, context=ctx) as resp:
        gdata = json.loads(resp.read().decode('utf-8'))
        print("Address:", gdata.get('address'))
except Exception as e:
    print("Nominatim error:", e)

# 2. BigDataCloud Free Reverse Geocode API
geo_url2 = f"https://api.bigdatacloud.net/data/reverse-geocode-client?latitude={lat}&longitude={lon}&localityLanguage=en"
print("\nTesting BigDataCloud:", geo_url2)

try:
    req = urllib.request.Request(geo_url2, headers={'User-Agent': 'FlyFishingApp/1.0'})
    with urllib.request.urlopen(req, context=ctx) as resp:
        gdata2 = json.loads(resp.read().decode('utf-8'))
        print("BigDataCloud response:", json.dumps(gdata2, indent=2))
except Exception as e:
    print("BigDataCloud error:", e)

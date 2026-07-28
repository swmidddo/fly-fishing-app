import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

api_key = 'MjlkNjAwNWVjMzA4MTFlOGEwZjMyY2'
locations = [19702, 4918, 19851, 19761, 23608] # Narrabri, Perth, Hobart, Cairns, Jindabyne

for loc_id in locations:
    url = f"https://api.willyweather.com.au/v2/{api_key}/locations/{loc_id}/warnings.json"
    try:
        with urllib.request.urlopen(url, context=ctx) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print(f"Location ID {loc_id} Warnings:", data)
    except Exception as e:
        print(f"Location ID {loc_id} Error:", e)

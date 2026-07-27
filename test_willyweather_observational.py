import urllib.request, json, ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

api_key = 'MjlkNjAwNWVjMzA4MTFlOGEwZjMyY2'
location_id = 4950 # Sydney

obs_url = f"https://api.willyweather.com.au/v2/{api_key}/locations/{location_id}/observational.json"
print("Testing WillyWeather Observational URL:", obs_url)

try:
    req = urllib.request.Request(obs_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    with urllib.request.urlopen(req, context=ctx) as resp:
        odata = json.loads(resp.read().decode('utf-8'))
        print("\nHTTP Status: SUCCESS!")
        print("Observational keys:", list(odata.keys()) if isinstance(odata, dict) else len(odata))
        print("Observational data:", json.dumps(odata, indent=2)[:800])
except Exception as e:
    import traceback
    traceback.print_exc()

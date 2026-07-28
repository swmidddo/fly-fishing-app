import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

api_key = 'MjlkNjAwNWVjMzA4MTFlOGEwZjMyY2'
target_url = f"https://api.willyweather.com.au/v2/{api_key}/locations/4179/weather.json?observational=true&forecasts=weather&days=1"

# Test 1: allorigins get
url1 = f"https://api.allorigins.win/get?url={urllib.parse.quote(target_url)}"
print("Testing AllOrigins GET:", url1)
try:
    req = urllib.request.Request(url1, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, context=ctx) as resp:
        res_json = json.loads(resp.read().decode('utf-8'))
        wdata = json.loads(res_json['contents'])
        temp = wdata.get('observational', {}).get('observations', {}).get('temperature', {}).get('temperature')
        print("AllOrigins SUCCESS! Live Temp:", temp, "°C")
except Exception as e:
    print("AllOrigins Error:", e)

# Test 2: thingproxy
url2 = f"https://thingproxy.freeboard.io/fetch/{target_url}"
print("\nTesting ThingProxy:", url2)
try:
    req = urllib.request.Request(url2, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, context=ctx) as resp:
        wdata = json.loads(resp.read().decode('utf-8'))
        temp = wdata.get('observational', {}).get('observations', {}).get('temperature', {}).get('temperature')
        print("ThingProxy SUCCESS! Live Temp:", temp, "°C")
except Exception as e:
    print("ThingProxy Error:", e)

import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

api_key = 'MjlkNjAwNWVjMzA4MTFlOGEwZjMyY2'

# Test 1: Town location ID 4179 (Narrabri Town)
url1 = f"https://api.willyweather.com.au/v2/{api_key}/locations/4179/weather.json?observational=true&forecasts=weather&days=1"
print("Testing Town Location 4179 (Narrabri):")
try:
    with urllib.request.urlopen(url1, context=ctx) as resp:
        data1 = json.loads(resp.read().decode('utf-8'))
        print("Observational Keys:", data1.get('observational', {}).keys())
        obs1 = data1.get('observational', {}).get('observations', {})
        print("Observations:", obs1)
        weather_days1 = data1.get('forecasts', {}).get('weather', {}).get('days', [])
        if weather_days1:
            print("Forecast entries:", weather_days1[0].get('entries'))
except Exception as e:
    print("Error 1:", e)

# Test 2: Airport location ID 19702 (Narrabri Airport)
url2 = f"https://api.willyweather.com.au/v2/{api_key}/locations/19702/weather.json?observational=true&forecasts=weather&days=1"
print("\nTesting Airport Location 19702 (Narrabri Airport):")
try:
    with urllib.request.urlopen(url2, context=ctx) as resp:
        data2 = json.loads(resp.read().decode('utf-8'))
        obs2 = data2.get('observational', {}).get('observations', {})
        print("Observations:", obs2)
        weather_days2 = data2.get('forecasts', {}).get('weather', {}).get('days', [])
        if weather_days2:
            print("Forecast entries:", weather_days2[0].get('entries'))
except Exception as e:
    print("Error 2:", e)

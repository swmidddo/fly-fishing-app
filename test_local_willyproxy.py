import urllib.request
import json

url = "http://localhost:8080/willyproxy?url=https%3A%2F%2Fapi.willyweather.com.au%2Fv2%2FMjlkNjAwNWVjMzA4MTFlOGEwZjMyY2%2Flocations%2F4179%2Fweather.json%3Fobservational%3Dtrue%26forecasts%3Dweather%26days%3D1"

print("Testing Local WillyProxy:", url)
try:
    with urllib.request.urlopen(url) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        obs = data.get('observational', {}).get('observations', {})
        temp = obs.get('temperature', {}).get('temperature')
        press = obs.get('pressure', {}).get('pressure')
        print(f"Local WillyProxy SUCCESS! Live Temp: {temp}°C | Live Pressure: {press} hPa")
except Exception as e:
    print("Local WillyProxy Error:", e)

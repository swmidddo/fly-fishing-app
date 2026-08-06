import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

api_key = 'MjlkNjAwNWVjMzA4MTFlOGEwZjMyY2'

queries = ['Sydney', 'Parramatta', 'Narrabri', 'Jindabyne', 'Melbourne', 'Richmond', 'Subiaco', 'Geelong', 'Weather Station']

for q in queries:
    url = f"https://api.willyweather.com.au/v2/{api_key}/search.json?query={urllib.parse.quote(q)}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, context=ctx) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print(f"=== Query: {q} ({len(data)} results) ===")
            for item in data[:5]:
                print(f"  ID: {item.get('id')}, Name: {item.get('name')}, TypeId: {item.get('typeId')}, Lat: {item.get('lat')}, Lng: {item.get('lng')}")
    except Exception as e:
        print(f"Error for {q}: {e}")

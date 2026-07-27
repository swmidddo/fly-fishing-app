import urllib.request, json

proxy_url = "http://localhost:8080/willyproxy?url=https%3A%2F%2Fapi.willyweather.com.au%2Fv2%2FMjlkNjAwNWVjMzA4MTFlOGEwZjMyY2%2Fsearch.json%3Fquery%3DNarrabri"
print("Testing Proxy Endpoint:", proxy_url)

try:
    req = urllib.request.Request(proxy_url)
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        print("PROXY SUCCESS! Data:", data)
except Exception as e:
    print("Proxy error:", e)

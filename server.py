import http.server
import urllib.request
import urllib.parse
import json
import ssl

PORT = 8080

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def do_GET(self):
        if '/willyproxy?url=' in self.path:
            try:
                target_url = urllib.parse.unquote(self.path.split('/willyproxy?url=')[1])
                req = urllib.request.Request(target_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
                with urllib.request.urlopen(req, context=ctx, timeout=3) as resp:
                    content = resp.read()
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(content)
                    return
            except Exception as e:
                print(f"[Proxy Error] {e}")
                self.send_response(500)
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))
                return
        super().do_GET()

if __name__ == '__main__':
    server_address = ('', PORT)
    httpd = http.server.ThreadingHTTPServer(server_address, NoCacheHTTPRequestHandler)
    print(f"Serving Concurrent Threaded HTTP on 0.0.0.0 port {PORT}...")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass

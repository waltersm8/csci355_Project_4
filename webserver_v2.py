from http.server import HTTPServer, BaseHTTPRequestHandler

from io import BytesIO
PORT = 8082

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        # self.wfile.write(b'Hello, world!')
        if self.path == '/':
            self.path == '/index.html'

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length)
        self.send_response(200)
        self.end_headers()
        response = BytesIO()
        response.write(b'This is POST request. ')
        response.write(b'Received: ')
        response.write(body)
        self.wfile.write(response.getvalue())


httpd = HTTPServer(('localhost', PORT), SimpleHTTPRequestHandler)
print("Serving on Port: "+str(PORT))
httpd.serve_forever()

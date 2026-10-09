import http.server
import socketserver
import os

# Railway asigna dinámicamente la variable de entorno PORT
PORT = int(os.environ.get("PORT", 8080))
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

class WebHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

if __name__ == "__main__":
    print(f"🚀 Iniciando servidor web para producción en el puerto {PORT}...")
    with socketserver.TCPServer(("", PORT), WebHandler) as httpd:
        print(f"✅ Servidor activo en http://0.0.0.0:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nDeteniendo servidor...")

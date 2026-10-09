FROM python:3.12-alpine

WORKDIR /app

# Copiar archivos del proyecto
COPY . .

# Railway inyecta la variable de entorno PORT
ENV PORT=8080
EXPOSE 8080

CMD ["python", "server.py"]

# ⚡ NovaWeb - Sitio Web Moderno

Una aplicación web moderna, ultraligera y responsiva construida con tecnologías web estándar (HTML5 semántico, CSS3 con diseño *glassmorphism* y JavaScript vanilla interactivo), lista para desplegarse en **Railway** o cualquier servicio en la nube.

---

## 🚀 Características

- **Diseño Moderno:** Modo oscuro elegante con paleta HSL, efecto de cristal (*glassmorphism*), orbes de luz ambiental y tipografía de Google Fonts (*Plus Jakarta Sans* y *Outfit*).
- **Interactividad en Tiempo Real:**
  - Contador reactivo con animaciones.
  - Selector dinámico de paleta cromática (modifica variables CSS en tiempo real).
  - Sistema de notificaciones *Toast* animadas con auto-desaparición.
  - Reloj digital en vivo.
- **Preparado para Producción:**
  - Servidor ligero en Python (`server.py`) que detecta dinámicamente el puerto `$PORT` asignado por plataformas como Railway.
  - `Dockerfile` y `Procfile` incluidos para despliegue instantáneo con un solo clic.

---

## 📁 Estructura del Proyecto

```text
pagina-web-basica/
├── index.html         # Estructura semántica de la interfaz
├── style.css          # Estilos, efectos glassmorphism y diseño responsivo
├── app.js             # Lógica interactiva y controladores de eventos
├── server.py          # Servidor HTTP en Python para Railway / Producción
├── Procfile           # Instrucción de inicio para Railway/Render
├── Dockerfile         # Contenedor Docker para despliegue multiplataforma
├── requirements.txt   # Dependencias del proyecto
├── .gitignore         # Exclusión de archivos innecesarios para Git
└── README.md          # Documentación del repositorio
```

---

## 🛠️ Ejecución Local

### Opción 1: Con Python (recomendado)
```bash
python server.py
```
Abre en tu navegador: [http://localhost:8080](http://localhost:8080)

### Opción 2: Abrir directamente
Puedes hacer doble clic en `index.html` para abrirlo directamente en tu navegador favorito.

---

## 🌐 Despliegue en Railway

1. Sube este repositorio a tu cuenta de **GitHub**.
2. Entra a [Railway.app](https://railway.app/) e inicia sesión con tu cuenta de GitHub.
3. Haz clic en **"New Project"** -> **"Deploy from GitHub repo"**.
4. Selecciona este repositorio (`pagina-web-basica` o el nombre que le diste).
5. Railway detectará automáticamente el archivo `Dockerfile` o `server.py` y desplegará tu página en minutos.
6. Ve a la pestaña **Settings** en Railway y haz clic en **"Generate Domain"** para obtener tu enlace público en internet (ejemplo: `https://tu-web.up.railway.app`).

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. ¡Siéntete libre de modificarlo y expandirlo!

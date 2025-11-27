# Landing La Nina

Single-page landing construida con **React + Vite + TailwindCSS** para presentar la historia, productos destacados y datos de contacto de la Frutería & Verdulería La Nina.

---

## ✨ Contenido

- Hero e historia corta de la marca.  
- Sección de cajas destacadas y promesas de servicio.  
- Formulario simple para newsletter (sin backend, solo visual).  
- Información de contacto y redes sociales.  
- Diseño responsivo con gradientes suaves y bloques reutilizables.

---

## 🛠️ Desarrollo

```bash
pnpm install        # instala dependencias
pnpm run dev        # entorno local (http://localhost:5173)
pnpm run build      # compila a producción
pnpm run preview    # sirve la build ya generada
pnpm run lint       # revisa estilos de código
```

Estructura mínima:

```
src/
 ├─ App.tsx         # Landing completa
 ├─ index.css       # Estilos globales + Tailwind
 └─ main.tsx        # Entrada de React
```

---

## 🐳 Contenedor Docker

```bash
cd new-mobile
docker build -t la-nina-mobile --build-arg VITE_API_URL=https://api.backend.com .
docker run -d --rm -p 8080:80 la-nina-mobile
```

- `VITE_API_URL` queda disponible si en el futuro se desea hacer llamadas a un backend (por defecto `/api`).
- La imagen usa **Nginx** y expone el puerto `80`, con un endpoint `/healthz` listo para chequeos.

---

## 📋 Notas

- No hay autenticación ni rutas protegidas: todo es contenido estático enfocado en la marca.
- El formulario de newsletter es únicamente ilustrativo; conecta tu servicio favorito (Brevo, Mailchimp, etc.) modificando el handler en `App.tsx`.
- Si necesitas agregar nuevas secciones, crea componentes dentro de `src` o extiende la data mock usada en el archivo principal.

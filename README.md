# Portafolio — The DevOps Architect Experience

Proyecto scaffold con React + Vite + Tailwind + Framer Motion.

Pasos rápidos:

```powershell
npm install
npm run dev
```

Deploy sugerido: Azure Static Web Apps.

Mejoras aplicadas:
- Tipografía premium con `Inter` y `JetBrains Mono`.
- Hero con partículas sutiles, parallax de texto, y fondo WebGL 3D usando Three.js para un efecto de malla giratoria.
- Sección "Sobre mí" con perfil profesional y CTAs.
- Terminal interactiva de skills y tarjetas de proyectos con glassmorphism.

Para desplegar en Azure Static Web Apps, crea un recurso y conecta este repo; el archivo `staticwebapp.config.json` está preparado.

UI additions:
- Integración de Headless UI (`@headlessui/react`) para componentes accesibles y transiciones.
- Menús accesibles y transiciones con `Transition` y `Menu` aplicados a terminal y tarjetas de proyectos.

CV & descarga:
- Se añadió `public/cv.json` para permitir descargar/ver el CV en formato JSON desde la app.
- Si quieres que el PDF del CV esté disponible, coloca `Hoja Vida John Valderrama 2026.pdf` dentro de la carpeta `public/`.

Prueba local:
```powershell
npm install
npm run dev
```

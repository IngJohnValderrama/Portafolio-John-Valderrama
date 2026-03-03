# Cómo usar el Template HTML en EmailJS

## ⚠️ IMPORTANTE: Copiar SOLO el DIV (sin <html>, <head>, <body>)

EmailJS requiere que copies **solamente el contenido del `<div>`** con los estilos inline. NO copiar etiquetas HTML, head o body.

## Instrucciones:

### 1. Abre EmailJS Dashboard
- Ve a [dashboard.emailjs.com](https://dashboard.emailjs.com/)
- Inicia sesión con tu cuenta

### 2. Ve a Email Templates
- En el menú lateral, haz clic en **"Email Templates"**

### 3. Crea una Nueva Plantilla
- Haz clic en **"Create New Template"**
- Nombre: `contact_form`
- Haz clic en **"Create"**

### 4. Switch a Code Editor
- Dentro de la plantilla, en la esquina superior derecha, busca **"Code Editor"**
- Haz clic para cambiar al editor de código

### 5. Copia el DIV (SIN HTML/HEAD/BODY)
- Abre el archivo `EMAILJS_TEMPLATE.html` en tu editor
- **Copia SOLO el contenido que comienza con `<div style=...`** (desde el primer `<div>` hasta el último `</div>`)
- **NO copies**: `<!DOCTYPE>`, `<html>`, `<head>`, `<body>` ni `</body>`, `</html>`
- Pégalo en el Code Editor de EmailJS

**Ejemplo de qué COPIAR:**
```html
<div style="font-family: ...">
  <!-- Header -->
  <div style="background: ...">
    ...
  </div>
  <!-- etc -->
</div>
```

**Ejemplo de qué NO COPIAR:**
```html
<!-- ❌ NO COPIES ESTO ❌ -->
<!DOCTYPE html>
<html lang="es">
<head>...</head>
<body>
  <!-- Aquí el div -->
</body>
</html>
```

### 6. Guarda la Plantilla
- Haz clic en **"Save"** en la esquina superior derecha
- Verás un mensaje de confirmación

### 7. Copia el Template ID
- En la esquina superior izquierda, verás el **Template ID** (ej: `template_xxxxxxxxx`)
- Copia este valor y pégalo en tu `.env.local`:
```
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxxxx
```

## Variables Disponibles en el Template

El template usa estas variables que se rellenan automáticamente:

| Variable | Origen | Ejemplo |
|----------|--------|---------|
| `{{from_name}}` | Campo "Nombre" del formulario | Juan Pérez |
| `{{from_email}}` | Campo "Email" del formulario | juan@example.com |
| `{{message}}` | Campo "Mensaje" del formulario | Hola, quiero hablar sobre... |

Estas variables se envían automáticamente desde `Contact.jsx` cuando el usuario envía el formulario.

## Vista Previa

El template se verá así en el email:

```
┌─────────────────────────────────────┐
│  📧 Nuevo Mensaje de Contacto       │
│  Portfolio - Formulario de Contacto │
└─────────────────────────────────────┘
│                                     │
│  Hola,                              │
│  Tienes un nuevo mensaje...         │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ "Mensaje completo del usuario" │  │
│  │ aquí aparece...                │  │
│  └───────────────────────────────┘  │
│                                     │
│  Información del Remitente          │
│  Nombre: Juan Pérez                 │
│  Email: juan@example.com            │
│                                     │
│  [Responder al Email]               │
│                                     │
└─────────────────────────────────────┘
```

## Estilo Inline - ¿Por qué?

Los estilos están **inline** (dentro del atributo `style=`) porque:
- EmailJS y clientes de correo no soportan bien CSS en `<style>`
- Los estilos inline se aplican directamente al elemento
- Garantiza que los estilos funcionen en Gmail, Outlook, etc.

## Personalización

Si quieres cambiar el diseño, busca en el `<div>` principal:

- **Color principal**: Busca `#0ea5e9` y cámbialo por tu hex preferido
- **Color secundario**: Busca `#06b6d4` para cambiar el gradiente
- **Nombre de la empresa**: Reemplaza "John Ricardo Valderrama" en el footer
- **Título**: Modifica el texto en el primer `<h1>`
- **Fondo**: Cambia los valores en `background: linear-gradient(...)`

## Troubleshooting

Si el template no funciona:

1. ✅ **Verifica que copiaste SOLO el DIV**, no el HTML completo
2. ✅ Asegúrate de que estás en el **Code Editor**, no en el editor visual
3. ✅ Verifica que las variables usan **dos llaves**: `{{variable}}` (no `{variable}`)
4. ✅ Reinicia `npm run dev` después de cambios en EmailJS
5. ✅ Verifica los logs en la consola del navegador (F12)

## Próximos pasos

Una vez configurado el template en EmailJS:
1. Completa los datos en `.env.local` (Service ID, Template ID, Public Key)
2. Ejecuta `npm run dev`
3. Prueba el formulario de contacto en tu portfolio
4. Verifica que los correos lleguen a tu bandeja de entrada

¡Listo! Los correos que recibas tendrán un diseño profesional con estilos inline funcionales.


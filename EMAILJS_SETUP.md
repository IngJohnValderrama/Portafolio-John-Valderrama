# Configuración de EmailJS para el Formulario de Contacto

El formulario de contacto está integrado con **EmailJS**, un servicio que permite enviar correos sin backend.

## Pasos para configurar:

### 1. Crear cuenta en EmailJS
- Regístrate en [emailjs.com](https://www.emailjs.com/)
- Crea una cuenta gratis

### 2. Configurar un servicio de email
- Ve a **Email Services** en el dashboard
- Haz clic en **Add Service**
- Conecta tu Gmail, Outlook u otro proveedor
- Confirma los permisos
- Guarda el **Service ID** (ejemplo: `service_xxxxxxxxx`)

### 3. Crear una plantilla de email
- Ve a **Email Templates** 
- Haz clic en **Create New Template**
- Copia esta plantilla:

```
Name: contact_form
Subject: Nuevo mensaje de {{from_name}}

From: {{from_email}}
Name: {{from_name}}

Message:
{{message}}
```

- Las variables entre `{{}}` se rellenan automáticamente desde el formulario
- Guarda el **Template ID** (ejemplo: `template_xxxxxxxxx`)

### 4. Obtener tu Public Key
- Ve a **Account** en el dashboard
- En la sección **API Keys**, copia tu **Public Key** (comienza con caracteres como `h6c...`)

### 5. Configurar variables de entorno
- En la raíz del proyecto, crea un archivo `.env.local`:

```
VITE_EMAILJS_SERVICE_ID=service_xxxxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxxxx
VITE_EMAILJS_PUBLIC_KEY=h6c...
```

Reemplaza `xxxxxxxxx` y `h6c...` con tus valores reales del dashboard de EmailJS.

### 6. (Opcional) Actualizar email destino
- En `src/components/Contact.jsx`, busca esta línea:
```jsx
to_email: 'tu-email@gmail.com', // Reemplaza con tu email
```
- Reemplaza `tu-email@gmail.com` con tu dirección de correo real.

### 7. Reiniciar el servidor
```bash
npm run dev
```

¡Listo! El formulario de contacto ahora enviará correos a tu email.

## Notas:
- EmailJS permite hasta **200 emails gratis** al mes en el plan gratuito
- Los correos aparecerán en la bandeja de entrada que configuraste (Gmail, etc)
- Si algo falla, verás el mensaje de error en el formulario

## Troubleshooting:
Si no funciona:
1. Verifica que `.env.local` esté en la raíz del proyecto
2. Reinicia `npm run dev` después de crear `.env.local`
3. Abre la consola del navegador (F12) para ver errores
4. Verifica que el Service ID y Template ID sean correctos en EmailJS dashboard

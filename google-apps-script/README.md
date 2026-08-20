# 🚀 Guía de Instalación: CRM de Leads FormAI en Google Apps Script

Con esta configuración tendrás tu CRM de leads funcionando al 100% tanto **en la nube de Google** como **en la web de FormAI**.

---

## Paso 1: Abrir el editor de Google Apps Script

1. Abre tu hoja de cálculo **"Respuestas FormAI"** en Google Sheets.
2. En el menú superior, pulsa en **Extensiones** > **Apps Script**.

---

## Paso 2: Pegar el código del backend (`Code.gs`)

1. En el editor de Apps Script, abre el archivo `Código.gs` (o `Code.gs`).
2. Borra todo lo que haya y pega el contenido completo de [`google-apps-script/Code.gs`](file:///c:/Users/gyust/GY%20Antigravity/formai/google-apps-script/Code.gs).
3. Pulsa el botón **Guardar** (icono de disquete o `Ctrl+S`).

---

## Paso 3: Crear el archivo HTML (`Index.html`)

1. En el panel izquierdo de Apps Script, pulsa el botón **`+`** (Añadir archivo) y elige **HTML**.
2. Nómbralo exactamente: **`Index`** (sin el `.html`, Apps Script lo añade solo).
3. Pega el contenido completo de [`google-apps-script/Index.html`](file:///c:/Users/gyust/GY%20Antigravity/formai/google-apps-script/Index.html).
4. Pulsa **Guardar** (`Ctrl+S`).

---

## Paso 4: Implementar como Web App

1. En la esquina superior derecha, pulsa en el botón azul **Implementar** (Deploy) > **Nueva implementación**.
2. En tipo de implementación (icono de engranaje), selecciona **Aplicación web**.
3. Configura:
   - **Descripción**: `FormAI Leads CRM v2`
   - **Ejecutar como**: `Yo (tu cuenta de Google)`
   - **Quién tiene acceso**: `Cualquier usuario` (para que la web pública pueda seguir enviando formularios por POST y puedas abrir la app en cualquier dispositivo).
4. Pulsa **Implementar**.
5. ¡Listo! Google te dará una **URL de la aplicación web**.

---

## ✨ ¿Cómo usar tu nuevo CRM?

1. **Desde tu navegador / Móvil:**
   Abre la URL de la aplicación web que te dio Google. ¡Puedes guardarla en Marcadores o en la pantalla de inicio de tu móvil como una app!

2. **Desde la Web de FormAI:**
   En tu web FormAI, ve a `/#leads` o pulsa en el enlace discreto `🔐 Acceso CRM` en el pie de página.

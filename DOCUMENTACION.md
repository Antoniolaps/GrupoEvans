# 📦Grupo Evans Logistics — Documentación Técnica del Proyecto

> **Versión:** 2.0  
> **Última actualización:** Abril 2026  
> **Repositorio:** ``

---

## 1. ¿De qué trata el proyecto?

**Grupo Evans Logistics** es el sitio web corporativo de un operador logístico estratégico con sede en **Ciudad de Panamá**. Con más de **3 años de trayectoria** (fundada en 2021) y bajo el liderazgo de **Jennifer Evans Small**, la empresa se posiciona como un aliado clave para optimizar operaciones y maximizar resultados.

La empresa se enfoca en tres pilares fundamentales: **Agilidad, Seguridad y Eficiencia**, ofreciendo soluciones en:
- **Importación y Exportación**
- **Gestión Aduanera Integral**
- **Almacenaje y Asesoría**

El sitio tiene como objetivo principal:
- **Posicionar a Grupo Evans Logistics** como el partner de confianza para empresas de alto nivel, proyectando autoridad y éxito operativo.
- **Generar leads comerciales** a través de formularios integrados con el correo corporativo profesional.
- **Informar y proyectar la visión estratégica** de la empresa con contenido detallado.
- **Habilitar el rastreo de envíos** en tiempo real (API TrackingMore) para transparencia total.
- **Consolidar la marca "Grupo Evans Logistics"** tras un proceso de profesionalización exhaustivo realizado en Abril 2026.

---

## 2. Stack Tecnológico

El proyecto es un sitio web **estático** (sin framework de frontend ni backend Node). Toda la lógica reside en el navegador.

| Capa | Tecnología | Uso |
|------|-----------|-----|
| **Estructura** | HTML5 semántico | Todas las páginas del sitio |
| **Estilos** | CSS3 Vanilla | Diseño, animaciones, responsive |
| **Interactividad** | JavaScript ES6+ (Vanilla) | Navbar, forms, tracking, acordeones, tabs |
| **Tipografía** | Google Fonts / Fontsource (Montserrat) | Fuente corporativa en todas las páginas |
| **Tipografía display** | Google Fonts (Bebas Neue) | Años en el timeline de Historia |
| **Control de versiones** | Git | Historial de cambios (`.git/`) |
| **API de tracking** | TrackingMore REST API | Rastreo de envíos (`/api/track.js`) |
| **Formularios** | Formspree | Envío de mensajes de contacto sin backend |
| **Hosting** | Estático (ver sección 6) | Servido desde cualquier CDN/servidor estático |

> **Nota:** No se utiliza ningún framework de JavaScript (React, Vue, Angular) ni preprocesador de CSS (Sass, Less). La elección deliberada de **HTML + CSS + JS Vanilla** garantiza máxima velocidad de carga, sin bundlers ni dependencias de npm en runtime.

---

## 3. Estructura de Archivos

```
Evans2/
│
├── index.html                          # Homepage principal
├── DOCUMENTACION.md                    # Este archivo
├── README.md                           # Descripción mínima del repositorio
├── redmen.md                           # Notas de desarrollo internas
├── fix_links.ps1                       # Script PowerShell para normalizar rutas de enlaces
│
├── api/
│   └── track.js                        # Proxy seguro para la API de TrackingMore
│
├── assets/
│   ├── css/
│   │   ├── styles.css                  # Sistema de diseño principal (31 KB)
│   │   └── responsive.css              # Breakpoints y estilos mobile (2 KB)
│   ├── js/
│   │   └── main.js                     # Lógica JS compartida del sitio (14 KB)
│   └── img/
│       ├── EVANS-LOGO-WEB.png          # Logo oficial (usado en navbar y footer)
│       ├── Desenbarcomaritimo.jpeg     # Imagen operaciones marítimas
│       ├── Rutaterrestre.jpeg          # Imagen transporte terrestre
│       ├── TrasnporteMaereo.jpeg       # Imagen transporte aéreo
│       ├── TransTerrestre.jpeg         # Imagen flota terrestre
│       ├── Portacontenedores.jpeg      # Imagen contenedores marítimos
│       ├── camioncontenerdores.jpeg    # Imagen camión con contenedores
│       ├── maersk-line-vector-logo.png # Logo naviera Maersk
│       ├── CMA-CGM.jpg                 # Logo naviera CMA CGM
│       ├── Fedex-logo.png              # Logo FedEx
│       ├── DHL express.png             # Logo DHL
│       ├── UPS.jpg                     # Logo UPS
│       └── [+ 22 imágenes adicionales] # Logos de partners, imágenes operativas
│
└── pages/
    ├── contacto.html                   # Página de contacto + formulario Formspree
    ├── cotizacion.html                 # Formulario de cotización de envíos
    ├── proveedores.html                # Página de aliados estratégicos
    ├── terminos-condiciones.html       # Términos legales del servicio
    │
    ├── servicios/
    │   ├── transporte-terrestre.html   # Servicio de transporte por carretera
    │   ├── transporte-aereo.html       # Servicio de carga aérea
    │   ├── transporte-maritimo.html    # Servicio FCL / LCL marítimo
    │   ├── almacenamiento.html         # Bodegaje y distribución
    │   └── logistica-internacional.html # 4PL multimodal + tracker de envíos
    │
    ├── nosotros/
    │   ├── quienes-somos.html          # Misión, visión, valores y equipo
    │   ├── historia.html               # Timeline interactivo de la empresa
    │   └── equipo.html                 # Presentación del equipo directivo
    │
    └── noticias/
        ├── index.html                  # Portal de noticias con filtros por categoría
        └── detalle.html                # Página de artículo de noticia individual
```

---

## 4. Descripción Detallada por Archivo

### 4.1 `index.html` — Homepage
La página principal es el corazón del sitio. Contiene:
- **Hero Carousel** — 3 slides automáticos con mensaje corporativo e imagen de fondo
- **Sección de Servicios** — 5 cards de servicios con modales interactivos de detalle
- **Sección de Métricas** — Contadores animados (países, clientes, envíos, años)
- **Sección de Clientes** — Doble carrusel infinito de logos de empresas clientes
- **Sección ¿Por qué Evans?** — Pilares estratégicos con íconos
- **Sección Testimonios** — Citas de clientes con estructura de cards
- **Sección FAQ** — Acordeón de preguntas frecuentes
- **CTA Banner** — Llamado a la acción con fondo de gradiente

### 4.2 `assets/css/styles.css` — Sistema de Diseño Principal
Define todo el lenguaje visual del sitio:
- **Variables CSS** — Colores, tipografías, sombras, radios
- **Reset y base** — Normalización de estilos
- **Componentes globales** — Navbar, Footer, botones (`.btn-primary`, `.btn-secondary`, `.btn-cta`)
- **Section tags** — Etiquetas de sección de color azul
- **Clases utilitarias** — `.animate-on-scroll`, `.section-title`, `.section-subtitle`
- **Estilos de footer** — Grid de footer con 4 columnas
- **Estilos de modal** — Overlay + card de servicio
- **Scroll-top button** — Botón flotante de regreso al inicio

### 4.3 `assets/css/responsive.css`
Media queries para dispositivos móviles y tablets:
- Breakpoint principal: `max-width: 768px`
- Colapsa la navbar en menú hamburguesa
- Ajusta grids de 3-4 columnas a 1 columna
- Reduce tamaños de fuente en heroes

### 4.4 `assets/js/main.js`
Script JavaScript compartido cargado en todas las páginas. Contiene:
- **Lógica del Navbar** — Clase `.scrolled` en scroll, menú hamburguesa mobile
- **Dropdowns de navegación** — Toggle en mobile, hover en desktop
- **IntersectionObserver** — Activa clase `.animated` en elementos al entrar en viewport
- **Scroll-top button** — Muestra/oculta según posición del scroll
- **Hero Carousel** (homepage) — Auto-slide cada 5s con transiciones CSS
- **Modales de servicios** — Apertura, cierre por overlay y tecla ESC
- **Contadores animados** — Incremento numérico al entrar al viewport
- **Form submission** — Manejo asíncrono con Fetch API hacia Formspree, estados de loading/success/error

### 4.5 `api/track.js`
**Proxy de backend seguro** para la API de TrackingMore. Su función es:
1. Recibir la petición del frontend (`/api/tracking?trackingNumber=&carrier=`)
2. Añadir el **API Key privado** de TrackingMore en el header `Authorization`
3. Enviar la petición a `api.trackingmore.com` desde el servidor
4. Devolver la respuesta JSON al frontend

> El API Key nunca se expone en el navegador. Sin este proxy, la clave quedaría visible en el código fuente del cliente.

### 4.6 `pages/contacto.html` — Contacto
- **Hero** con propuesta de valor de contacto directo.
- **Banda de promesas** — 4 compromisos: respuesta <4h, cobertura global, cotización gratuita y seguridad.
- **Formulario Corporativo** — Conectado a `jennifer.evans@grupoevanslogistics.com` vía Formspree.
- **Panel lateral** — Datos reales verificados: Century Tower (Piso 16), WhatsApp Ejecutivo y horarios.
- **Indicador "Live"** — Script JS de disponibilidad en tiempo real según horario de Panamá.
- **FAQ Corporativa** — 5 acuerdos de nivel de servicio (SLA) aclarados para el cliente.

### 4.7 `pages/servicios/logistica-internacional.html` — Logística Internacional
La página más compleja del sitio:
- **Hero 4PL** con posicionamiento global
- **Tabs de servicios** — 4 paneles interactivos (Multimodal, Aduana, Carga Proyecto, Cross-Border E-commerce)
- **Tracker de envíos** — Integrado con proxy `/api/tracking`. Incluye fallback demo si el API no responde
- **Grid de regiones** — Cobertura por continente (LATAM, Europa, Asia-Pacífico, Norteamérica)

### 4.8 `pages/nosotros/historia.html` — Historia
- **Timeline alternado interactivo** — 8 hitos entre 2010 y 2025
- El hito 2025 (actual) resalta con animación de pulso en color rojo corporativo
- Hover en cada punto del timeline activa la tarjeta
- Grid de 6 milestones numéricos en la sección de legado

### 4.9 `pages/proveedores.html` — Proveedores y Aliados
- Categorías de partners: Navieras (Maersk, MSC, CMA CGM, Hapag-Lloyd), Aerolíneas (FedEx, DHL, Emirates, LATAM Cargo), Certificaciones (BASC, OEA, ISO 9001, ISO 14001)
- **Formulario de registro de partners** — Con validación y feedback visual
- Sección de ventajas competitivas de las alianzas

### 4.10 `pages/noticias/index.html` — Portal de Noticias
- Filtros de categorías por tipo de contenido (logística, marítimo, aéreo, empresa)
- Artículo destacado con layout visual diferenciado
- Cards de artículos secundarios
- Formulario de suscripción a newsletter

### 4.11 `fix_links.ps1` — Script de Mantenimiento
Script de PowerShell para buscar y corregir rutas relativas rotas en todos los archivos HTML del proyecto. Útil tras reorganización de directorios.

---

## 5. Funcionalidades Interactivas

| Funcionalidad | Implementación | Páginas |
|--------------|---------------|---------|
| Navbar sticky con scroll | JS + CSS class `.scrolled` | Todas |
| Menú hamburguesa mobile | JS toggle | Todas |
| Dropdowns de navegación | CSS hover + JS mobile | Todas |
| Animaciones on-scroll | `IntersectionObserver` API | Todas |
| Hero carousel automático | JS setInterval + CSS transitions | `index.html` |
| Modales de servicios | JS + CSS overlay | `index.html` |
| Contadores animados | JS requestAnimationFrame | `index.html` |
| Carrusel infinito de logos | CSS `@keyframes` + JS clone | `index.html` |
| Tabs interactivos | JS show/hide panels | `logistica-internacional.html` |
| Tracker de envíos | Fetch API → TrackingMore proxy | `logistica-internacional.html` |
| FAQ acordeón | JS max-height toggle | `contacto.html`, `index.html` |
| Formulario con estados | Fetch + Formspree + DOM states | `contacto.html` |
| Indicador horario en vivo | `new Date()` + DOM update | `contacto.html` |
| Timeline hover interactivo | CSS transform + IntersectionObserver | `nosotros/historia.html` |
| Filtros de noticias | JS categoria filter | `noticias/index.html` |
| Scroll-to-top button | JS scroll + CSS visibility | Todas |

---

## 6. ¿Cómo funciona en Producción?

## 6. ¿Cómo funciona en Producción?

### 6.1 Arquitectura General

```
                    USUARIO (Navegador)
                          │
                          │ HTTPS
                          ▼
              ┌─────────────────────┐
              │      HOSTINGER      │
              │  (Servidor Linux)   │
              │   Hosting / VPS     │
              └─────────┬───────────┘
                        │
           ┌────────────┴────────────┐
           │                         │
           ▼                         ▼
   Archivos Estáticos         Backend / Proxy
   (HTML + CSS + JS)          (api/track.js)
                                    │
                                    ▼
                         API TrackingMore
                         (trackingmore.com)
```

### 6.2 Hosting: Hostinger

El sitio está optimizado para funcionar en **Hostinger**, aprovechando su panel de control (hPanel) para la gestión de archivos y variables de entorno.

**Pasos para despliegue en Hostinger:**

1. **Subida de archivos:**
   - Opción A: **Git Integration** (Recomendado). Conecta tu repositorio de GitHub directamente desde el panel de Hostinger.
   - Opción B: **Administrador de Archivos**. Sube el contenido de la carpeta raíz directamente a `public_html`.

2. **Configuración de Node.js (para el Tracker):**
   - Hostinger permite habilitar una aplicación Node.js desde el panel. 
   - Asegúrate de apuntar el "Application Root" a la carpeta `api/` y configurar el script de inicio si es necesario.

3. **Variables de entorno:**
   - En el hPanel, ve a **Avanzado → Variables de Entorno** (o mediante un archivo `.env` si usas VPS).
   - Registra la clave: `TRACKINGMORE_API_KEY = tu_clave_aqui`.

4. **Formulario de contacto:**
   - Formspree ya está configurado en el código. Solo asegúrate de que el dominio `evansslogistics.com` esté verificado en tu cuenta de formspree.io para recibir los correos.

### 6.3 Configuración de Dominio

En Hostinger:
1. Asegúrate de que el dominio `evansslogistics.com` esté apuntando a los Nameservers de Hostinger.
2. Instalar el certificado **SSL Gratuito** (Let's Encrypt) desde el panel de seguridad de Hostinger para habilitar HTTPS.
3. El archivo `.htaccess` puede usarse para forzar HTTPS si no se hace automáticamente.

### 6.4 Variables de Entorno Requeridas

| Variable | Descripción | Dónde se usa |
|----------|-------------|---------------|
| `TRACKINGMORE_API_KEY` | Clave API de TrackingMore | `api/track.js` |
| *(Formspree)* | Email de destino configurado en HTML | `contacto.html` |

### 6.5 Rendimiento y Caché

- **LiteSpeed Cache:** Si usas el servidor LiteSpeed de Hostinger, activa el plugin de caché para mejorar la velocidad de entrega de los archivos estáticos.
- **Compresión Gzip/Brotli:** Asegúrate de que esté habilitada en el panel para reducir el peso de los archivos CSS y JS.
- **Imágenes:** Se recomienda optimizar las imágenes en `/assets/img/` antes de la subida, ya que Hostinger servirá los archivos tal cual se suban.


### 6.6 Checklist de Calidad (Post-Profesionalización Abril 2026)

- [x] **Limpieza de Navegación**: Se eliminaron los enlaces "Certificaciones" (placeholders antiguos) de todos los headers y footers.
- [x] **Actualización de Marca**: Trayectoria de "3+ años" reflejada en `historia.html`, `index.html` y secciones corporativas.
- [x] **Liderazgo Jennifer Evans Small**: Referencias actualizadas para reflejar el liderazgo real de la empresa.
- [x] **Correo Corporativo**: Email `jennifer.evans@grupoevanslogistics.com` configurado en todos los archivos HTML.
- [ ] Comprimir imágenes pesadas (>150KB) en `/assets/img/`.
- [ ] Configurar `TRACKINGMORE_API_KEY` como variable de entorno en el hosting (Netlify/Vercel).
- [ ] Verificar registros DNS finales para el dominio corporativo.

---

## 7. Identidad Visual

| Token | Valor | Uso |
|-------|-------|-----|
| Color primario | `#0b74b8` | Botones, links, acentos, gradientes |
| Color secundario | `#dd1125` | Marca, CTAs de urgencia, badges especiales |
| Fondo oscuro | `#1a1a2e` / `#0d2137` | Heroes, footer, secciones de contraste |
| Texto principal | `#2c3e50` | Cuerpo de texto, headings |
| Texto secundario | `#7f8c8d` | Descripciones, subtítulos |
| Fondo claro | `#f8f9fa` | Secciones alternas |
| Tipografía | Montserrat (100–900) | Toda la interfaz |
| Tipografía display | Bebas Neue | Números de año en timeline |

---

*Documentación generada para el proyecto Evans Logistics Website v2.0 — Abril 2026*

# 🛠️ Notas de Desarrollo (Internal Reference)

Este archivo contiene apuntes rápidos sobre el estado del proyecto, respuestas a FAQ de negocio y guías de mantenimiento interno. Para la guía técnica formal, ver [DOCUMENTACION.md](./DOCUMENTACION.md).

## 🏗️ Arquitectura de Archivos (Actualizada)

```
Evans2/
├── index.html                   # Core Homepage
├── assets/
│   ├── css/
│   │   ├── styles.css           # Design System (Custom Properties)
│   │   └── responsive.css       # Mobile Breakpoints
│   └── js/
│       └── main.js              # Shared Logic (IntersectionObserver, Navbar)
├── pages/
│   ├── servicios/               # 5 vertical de negocio (Logística, Marítimo, etc)
│   ├── nosotros/                # Historia (Timeline JS) y Equipo
│   └── noticias/                 # Portal de noticias con filtros
```

## 📋 Resumen de Negocio (Abril 2026)

### ¿Qué servicios ofrece la empresa?
- Gestión 4PL de cadena de suministro.
- Importación/Exportación Multimodal (Aéreo, Marítimo, Terrestre).
- Trámite aduanal integral y asesoría estratégica.
- Almacenamiento, re-empaque y distribución desde Panamá.

### Diferenciadores Clave
- **Seguridad:** Protocolos verificados por estándares internacionales.
- **Rapidez:** Respuesta comercial en menos de 4 horas hábiles.


### Información Corporativa
- **Ubicación:** The Century Tower, Piso 16, Oficina 1620, Ciudad de Panamá.
- **WhatsApp:** +507 6750-2610
- **Email Vtas:** jennifer.evans@grupoevanslogistics.com

### Aliados Estratégicos
- Navieras principales: Maersk, MSC, CMA CGM, Hapag-Lloyd.
- Couriers: FedEx, DHL, UPS.

## ⚠️ Recordatorios para el Desarrollador
- [ ] Optimizar imágenes pesadas antes de cada deploy.

- [ ] No usar frameworks pesados; mantener la filosofía **Vanilla Web** para máximo performance.

---
*Última revisión: Abril 2026*
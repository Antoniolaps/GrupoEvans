# Documentación del Proyecto — Grupo Evans Logistics

> **Versión:** 1.0
> **Última actualización:** Abril 2026

---


## 1. Resumen ejecutivo

Grupo Evans Logistics es el sitio corporativo de una empresa operadora logística con base en Ciudad de Panamá. El objetivo del sitio es presentar servicios multimodales, captar clientes mediante formularios, y consolidar la identidad de marca tras la profesionalización de abril de 2026.


El tono del sitio combina información comercial con elementos de confianza (testimonios, logos de aliados y métricas operativas) para facilitar la conversión B2B.

## 2. Objetivos y audiencia

- **Objetivos principales:** posicionamiento corporativo, generación de leads calificados, comunicación de servicios y credenciales.
- **Audiencia:** gerentes de logística, importadores/exportadores, pymes y equipos de compras corporativas.

## 3. Alcance del proyecto

Sitio estático (HTML/CSS/JS Vanilla) que incluye:
- Páginas públicas informativas (`index.html`, páginas de `servicios/`, `nosotros/`, `noticias/`).
- Formularios de contacto y cotización integrados con Formspree.
- Componentes interactivos ligeros (carousel, modales, timeline, filtros de noticias) implementados sin frameworks.

## 4. Arquitectura y stack (resumen técnico)

- Frontend: HTML5 semántico + CSS3 (variables y sistema de utilidades) + JavaScript ES6+.
- Assets: Imágenes optimizadas bajo `assets/img/`, estilos en `assets/css/`, lógica compartida en `assets/js/main.js`.
- Forms: Formspree para envío de formularios sin backend.
- Control de versiones: Git (repositorio local / remoto opcional).
- Hosting recomendado: servidor estático o CDN (Hostinger u otros) con SSL y compresión activada.

Arquitectura operativa: cliente (navegador) carga HTML estático; JS gestiona interactividad y envía formularios a Formspree vía Fetch API.

## 5. Estructura esencial de archivos

```
index.html
pages/
  contacto.html
  cotizacion.html
  proveedores.html
  terminos-condiciones.html
assets/
  css/
    styles.css
    responsive.css
  js/
    main.js
  img/
fix_links.ps1
DOCUMENTACION.md
DOCUMENTACION_MODELO.md
```

## 6. Flujos clave y consideraciones de implementación

- Captación de leads: formulario en `pages/contacto.html` que valida en cliente y envía a Formspree; manejar estados (loading, success, error) y mensajes claros para el usuario.
- Accesibilidad básica: usar etiquetas `label` asociadas, roles ARIA en componentes dinámicos y buen contraste según la paleta definida.
- Rendimiento: servir imágenes optimizadas (WebP cuando sea posible), habilitar Brotli/Gzip y usar cache-control para assets estáticos.

## 7. Funcionalidades principales (técnico-usuario)

- Navbar sticky y menú responsive.
- Hero carousel con pausado al hover y control manual.
- Sección de servicios con modales para detalles técnicos y CTA a cotización.
- Contadores y métricas animadas para reforzar confianza.
- Timeline interactivo en `pages/nosotros/historia.html`.
- Portal de noticias con filtros y lector de artículos.

## 8. Despliegue y tareas operativas

Pasos mínimos para producción:
1. Optimizar imágenes en `assets/img/`.
2. Ejecutar `fix_links.ps1` y corregir rutas relativas rotas.
3. Subir al hosting (Git Integration o FTP) y activar SSL.
4. Verificar envío de formularios (Formspree) y correo de destino.

## 9. Checklist previa a entrega

- [ ] Imágenes optimizadas y < 150KB cuando sea posible.
- [ ] Todos los formularios probados y correo verificado en Formspree.
- [ ] Test de responsividad en 320/768/1024/1440 px.
- [ ] Pruebas básicas de accesibilidad (tab navigation, labels).
- [ ] Links verificados con `fix_links.ps1`.

## 10. Mantenimiento y recomendaciones

- Mantener `assets/js/main.js` modular: separar funciones por responsabilidad (forms, UI, analytics).
- Documentar cambios en `DOCUMENTACION.md` con fecha y autor de la modificación.
- Realizar auditoría de rendimiento y SEO después del primer mes en producción.

## 11. Contacto y propietarios

Owner técnico: equipo web / responsable: jennifer.evans@grupoevanslogistics.com

---

Este documento está pensado como una referencia ejecutiva y técnica ligera para desarrolladores, diseñadores y responsables de producto. ¿Quieres que lo adapte a formato README, lo traduzca al inglés o que genere una versión imprimible (PDF)?

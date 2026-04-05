# Mejoras de buenas prácticas aplicadas al portfolio

Este documento resume todas las mejoras aplicadas al proyecto en materia de **SEO**, **accesibilidad** y **rendimiento**.

---

## 1. Sitemap automático

**Paquete:** `@astrojs/sitemap`  
**Archivos modificados:** `astro.config.mjs`, `package.json`

Se añadió la integración oficial de Astro para la generación automática del sitemap. Al hacer `build`, se generan dos archivos en `dist/`:

- `sitemap-index.xml` — índice principal
- `sitemap-0.xml` — listado de todas las URLs del sitio

Se configuró también la propiedad `site: 'https://xavi.dev'` en `astro.config.mjs`, obligatoria para que el sitemap genere URLs absolutas correctas.

**¿Por qué importa?** Los motores de búsqueda (Google, Bing) utilizan el sitemap para descubrir y rastrear eficientemente todas las páginas del sitio, incluyendo las versiones en español (`/es/...`).

---

## 2. robots.txt

**Archivo nuevo:** `public/robots.txt`

Se creó el archivo `robots.txt` en la carpeta `public/`, que queda accesible en `https://xavi.dev/robots.txt`.

```
User-agent: *
Allow: /
Sitemap: https://xavi.dev/sitemap-index.xml
```

**¿Por qué importa?** Le indica a los crawlers de buscadores que todo el sitio es indexable y les señala la ubicación del sitemap, acelerando la indexación.

---

## 3. Open Graph mejorado

**Archivo modificado:** `src/layouts/BaseLayout.astro`

Se añadieron las siguientes etiquetas meta que faltaban:

| Meta tag | Valor |
|---|---|
| `og:url` | URL canónica de la página actual |
| `og:locale` | `en_US` o `es_ES` según el idioma |
| `og:site_name` | `xavi.dev` |

**¿Por qué importa?** Estas etiquetas controlan cómo se muestra el enlace al compartirlo en LinkedIn, Twitter/X, WhatsApp, Discord, etc. Sin `og:locale`, LinkedIn puede mostrar el contenido en el idioma incorrecto.

---

## 4. URL canónica

**Archivo modificado:** `src/layouts/BaseLayout.astro`

Se añadió:

```html
<link rel="canonical" href="https://xavi.dev/..." />
```

La URL se calcula dinámicamente con `Astro.url.href`, por lo que es siempre la URL exacta de la página que se está renderizando.

**¿Por qué importa?** Evita que Google penalice el sitio por "contenido duplicado" entre la versión en inglés (`/`) y la versión en español (`/es/`). Le indica al buscador cuál es la URL definitiva de cada página.

---

## 5. Datos estructurados JSON-LD (Schema.org)

**Archivo modificado:** `src/layouts/BaseLayout.astro`

Se inyectó un bloque `<script type="application/ld+json">` con el esquema `Person` de Schema.org:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Xavi Ibáñez Martínez",
  "jobTitle": "Senior Backend Engineer",
  "url": "https://xavi.dev",
  "sameAs": [
    "https://github.com/xaviibaez",
    "https://www.linkedin.com/in/..."
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "BBVA Technology"
  }
}
```

**¿Por qué importa?** Google utiliza estos datos para generar "rich snippets" en los resultados de búsqueda (nombre, cargo, empresa visible directamente en Google). También mejora la comprensión semántica de la página y puede activar el panel de conocimiento (Knowledge Panel) de Google.

---

## 6. Accesibilidad — `aria-hidden` en SVGs decorativos

**Archivos modificados:**
- `src/components/cards/HeroCard.astro`
- `src/components/cards/ContactCard.astro`
- `src/components/cards/ProjectsCard.astro`

Se añadió `aria-hidden="true"` a todos los SVGs decorativos: aquellos que están dentro de un elemento `<a>` o `<button>` que ya tiene texto visible o un `aria-label` en el elemento padre.

**Ejemplo antes:**
```html
<a href="#projects" class="btn btn-primary">
  <svg xmlns="...">...</svg>
  Ver mi trabajo
</a>
```

**Ejemplo después:**
```html
<a href="#projects" class="btn btn-primary">
  <svg aria-hidden="true" xmlns="...">...</svg>
  Ver mi trabajo
</a>
```

**¿Por qué importa?** Sin `aria-hidden`, los lectores de pantalla (VoiceOver, NVDA, JAWS) anuncian el SVG como elemento vacío o con contenido sin sentido antes del texto del enlace. Con `aria-hidden`, el lector de pantalla solo lee el texto relevante del enlace. Esto es un requisito de **WCAG 2.1 criterio 1.1.1** (contenido no textual).

---

## Resumen de cambios

| Área | Cambio | Archivo(s) |
|---|---|---|
| SEO | Integración sitemap | `astro.config.mjs` |
| SEO | robots.txt | `public/robots.txt` |
| SEO | og:url, og:locale, og:site_name | `src/layouts/BaseLayout.astro` |
| SEO | URL canónica | `src/layouts/BaseLayout.astro` |
| SEO | JSON-LD Person schema | `src/layouts/BaseLayout.astro` |
| Accesibilidad | aria-hidden en SVGs decorativos | `HeroCard.astro`, `ContactCard.astro`, `ProjectsCard.astro` |

---

## Verificación

- `pnpm run build` genera `dist/sitemap-index.xml` sin errores
- El código fuente de cada página contiene `<link rel="canonical">`, `og:url`, y el bloque `application/ld+json`
- `https://xavi.dev/robots.txt` sirve el archivo correctamente en producción
- Auditoría de accesibilidad (axe DevTools): sin alertas de "SVG without accessible name"

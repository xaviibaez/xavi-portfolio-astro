---
title: "De HTML plano a frontend moderno: lo que aprendí por el camino"
description: "Una reflexión personal sobre migrar un proyecto de HTML/CSS/JS vanilla a Astro, Tailwind CSS y Alpine.js — qué me llevó a cada decisión y qué cambió después."
pubDate: 2026-04-17
tags: ["astro", "tailwind", "alpine.js", "frontend", "reflexión"]
lang: "es"
---

# De HTML plano a frontend moderno: lo que aprendí por el camino

Hace un tiempo me encargué de la web de un gimnasio de powerlifting, [RZ Powerhouse](https://www.rzpowerhouse.com). Empezó siendo un proyecto pequeño: maqueto el sitio en HTML y CSS, añado algo de JavaScript para los efectos interactivos, y listo. No era mi stack habitual — vengo del backend — pero tampoco era algo que no supiera hacer.

El problema llegó después, cuando el sitio fue creciendo.

---

## El momento en que el código deja de ayudarte

Hay un punto en todo proyecto de frontend vanilla en el que abres el fichero principal y no sabes bien por dónde empezar. No es que el código esté mal. Es que ha crecido sin estructura, y cada cambio pequeño requiere entender demasiado contexto.

En mi caso ese punto llegó cuando el gimnasio quiso añadir páginas individuales para cada uno de sus servicios. Me di cuenta de que iba a tener que duplicar casi todo el HTML, mantener el CSS sincronizado en varios sitios y copiar bloques de JavaScript de un fichero a otro. Antes de escribir una sola línea nueva, ya sabía que lo que estaba a punto de hacer iba a ser un problema a largo plazo.

Ese es el momento en que merece la pena parar y replantearse la arquitectura.

---

## Por qué Astro

Llevaba tiempo oyendo hablar de Astro, pero lo había descartado mentalmente como "otra cosa de frontend que aprender". Lo que me hizo cambiar de opinión fue entender su propuesta concreta: genera HTML estático por defecto y sólo manda JavaScript al navegador cuando hace falta. No hay bundle que pesen de más. No hay configuración compleja. El resultado por defecto ya es rápido.

Para un sitio como el del gimnasio — principalmente contenido estático, con unas pocas zonas interactivas — eso era exactamente lo que necesitaba.

Lo que más me sorprendió al empezar fue lo natural que resulta la componentización. Coges cada sección del HTML monolítico y la conviertes en su propio fichero `.astro`. De repente puedes razonar sobre el navbar sin ver el código del footer. Puedes tocar la sección de testimonios sin tener miedo de romper el formulario de contacto.

El cambio que más me ahorró trabajo fue poder crear un único layout para las páginas de servicios. El gimnasio tiene seis servicios distintos, y con una sola plantilla con props bien definidas, todas las páginas se generan desde el mismo sitio. Cambias el diseño una vez, se actualiza todo.

---

## Por qué Tailwind CSS

Tailwind fue la decisión que más dudé. La idea de escribir clases en el HTML en vez de en un fichero CSS aparte me parecía un retroceso. Había aprendido que separar estructura y estilos era una buena práctica, y esto parecía ir en contra de eso.

Lo que me convenció fue ser honesto sobre el problema real que tenía. El `styles.css` que había acumulado no era fácil de mantener porque era un fichero global que afectaba a todo. Para cambiar el color de un botón, tenía que asegurarme de que no había diez sitios más que dependían de esa misma clase. El miedo a tocar el CSS ajeno es una señal de que algo va mal.

Con Tailwind los estilos de cada elemento están junto al elemento. Cuando abro el componente del navbar, veo exactamente qué estilos tiene ese navbar. Sin ir a buscar a otro fichero. Sin efectos secundarios inesperados.

Lo que no me esperaba es que también me libera del problema del naming. Nombrar clases CSS bien es sorprendentemente difícil. ¿Es `card--featured` o `card-featured` o `featured-card`? ¿Sigo BEM o no? Con Tailwind ese problema desaparece porque las clases ya tienen nombre: son las utilidades de la librería.

---

## Por qué Alpine.js

El JavaScript del proyecto original era el que más me costó replantearme. Funcionaba. Los efectos estaban bien hechos. Pero había algo que me incomodaba: el estado de cada componente vivía en variables sueltas del módulo, y el DOM era la única fuente de verdad real sobre lo que se estaba mostrando.

Cuando quise añadir interactividad nueva — un carrusel de imágenes con drag táctil, un formulario que muestra un toast de confirmación — me encontré escribiendo cada vez más código para sincronizar el estado con el DOM. El resultado era correcto pero difícil de leer.

Alpine.js resolvió eso de una forma que me resultó muy natural: defines el estado del componente en el propio HTML, y la librería se encarga de mantener el DOM sincronizado. No hay que hacer `querySelector`. No hay que hacer `classList.toggle`. Cambias un valor y la pantalla se actualiza sola.

Lo que más me gustó es que Alpine no requiere un paso de compilación propio. Se integra en Astro con un par de líneas de configuración y funciona. Para interactividad ligera — menús, sliders, formularios — es más que suficiente y no añade complejidad innecesaria al proyecto.

---

## Qué cambió después de la migración

Técnicamente el sitio mejoró: carga más rápido, las imágenes se optimizan automáticamente, el SEO está mejor estructurado. Pero eso no es lo que más noto en el día a día.

Lo que más cambió fue la confianza para tocar el código. Cuando el cliente pide un cambio en la página de un servicio, sé exactamente qué fichero abrir y qué puede verse afectado. No hay un fichero CSS de 27 KB que me dé miedo editar. No hay un bloque de JavaScript que no sé bien de dónde viene.

Esa sensación — poder hacer un cambio sin estar pensando todo el rato en qué estás rompiendo — es lo que más valoro del proceso. No era una cuestión de tecnología moderna por el gusto de serlo. Era una cuestión de poder trabajar con comodidad en el proyecto a largo plazo.

---

## Cuándo tiene sentido este camino

No todo proyecto necesita esta migración. Si tienes una landing de tres secciones que no va a crecer, el HTML plano es perfectamente válido y mucho más simple.

La señal de que merece la pena planteárselo es cuando empiezas a tener miedo de tu propio código. Cuando duplicar una página en vez de abstraerla te parece la opción más segura. Cuando cambiar el CSS de un componente implica buscar en todo el fichero para ver qué puede romperse.

En ese punto, herramientas como Astro, Tailwind y Alpine no son complejidad añadida. Son la forma de recuperar el control.

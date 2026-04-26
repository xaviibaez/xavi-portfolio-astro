---
title: "D'HTML pla a frontend modern: el que vaig aprendre pel camí"
description: "Una reflexió personal sobre migrar un projecte d'HTML/CSS/JS vanilla a Astro, Tailwind CSS i Alpine.js — què va motivar cada decisió i què va canviar després."
pubDate: 2026-04-17
tags: ["astro", "tailwind", "alpine.js", "frontend", "reflexió"]
lang: "ca"
---

# D'HTML pla a frontend modern: el que vaig aprendre pel camí

Fa un temps vaig agafar el lloc web d'un gimnàs de powerlifting, [RZ Powerhouse](https://www.rzpowerhouse.com). Va començar com un projecte petit: construir el lloc en HTML i CSS, afegir una mica de JavaScript per als elements interactius, i prou. No era el meu stack habitual — vinc del backend — però no era res que no pogués fer.

El problema va arribar més tard, quan el lloc continuava creixent.

---

## El moment en què el codi deixa d'ajudar-te

Hi ha un punt en tot projecte frontend vanilla on obres el fitxer principal i no saps realment per on començar. No perquè el codi sigui dolent. És que ha crescut sense estructura, i cada petit canvi requereix entendre massa context.

Per a mi aquell moment va arribar quan el gimnàs volia afegir pàgines individuals per a cada un dels seus serveis. Em vaig adonar que hauria de duplicar gairebé tot l'HTML, mantenir el CSS sincronitzat en múltiples llocs i copiar blocs de JavaScript d'un fitxer a un altre. Abans d'escriure una sola línia nova, ja sabia que el que estava a punt de fer seria un problema més endavant.

És el moment en què val la pena aturar-se i repensar l'arquitectura.

---

## Per què Astro

Feia temps que sentia parlar d'Astro però mentalment l'havia posat a la carpeta de "una altra cosa de frontend per aprendre". El que em va fer canviar d'opinió va ser entendre la seva proposta concreta: genera HTML estàtic per defecte i només envia JavaScript al navegador quan és realment necessari. Sense bundles inflats. Sense configuració complexa. La sortida per defecte ja és ràpida.

Per a un lloc com el del gimnàs — contingut majoritàriament estàtic, amb alguns punts interactius — era exactament el que necessitava.

El que més em va sorprendre quan vaig començar va ser com es nota de natural la componentització. Agafes cada secció de l'HTML monolític i la converteixes en el seu propi fitxer `.astro`. De cop pots raona sobre la navbar sense veure el codi del footer.

El canvi que em va estalviar més feina va ser poder crear un sol layout per a les pàgines de serveis. El gimnàs té sis serveis diferents, i amb una plantilla ben definida, totes les pàgines es generen des del mateix lloc.

---

## Per què Tailwind CSS

Tailwind va ser la decisió sobre la qual vaig dubtar més. Escriure classes a l'HTML en lloc de en un fitxer CSS separat em semblava un pas enrere.

El que em va convèncer va ser ser honest sobre el problema real que tenia. El `styles.css` que havia anat construint no era fàcil de mantenir perquè era un fitxer global que afectava tot. Per canviar el color d'un botó havia d'assegurar-me que no hi havia deu altres llocs que depenguessin d'aquella mateixa classe.

Amb Tailwind els estils de cada element estan just al costat de l'element. Quan obro el component navbar, veig exactament quins estils té aquella navbar. Sense buscar en un altre fitxer. Sense efectes secundaris inesperats.

---

## Per què Alpine.js

Alpine.js va resoldre la gestió d'estat de forma molt natural: defineixes l'estat del component al propi HTML, i la biblioteca s'encarrega de mantenir el DOM sincronitzat. Sense `querySelector`. Sense `classList.toggle`. Canvies un valor i la pantalla s'actualitza sola.

El que més m'agrada és que Alpine no necessita el seu propi pas de build. Per a interactivitat lleugera — menús, sliders, formularis — és més que suficient.

---

## Quan té sentit aquest camí

No tots els projectes necessiten aquesta migració. El senyal que val la pena considerar-ho és quan comences a tenir por del teu propi codi. Quan duplicar una pàgina en lloc d'abstraure-la sembla l'opció més segura.

En aquell punt, eines com Astro, Tailwind i Alpine no afegeixen complexitat. Són com recuperes el control.

---
title: "TDD by Example"
description: "Un desglose completo del libro TDD by Example de Kent Beck — Red-Green-Refactor, los ejemplos de Money y xUnit, y todos los patrones: test-driven, barra roja, testing, diseño y refactoring."
pubDate: 2026-04-08
tags: ["tdd", "testing", "design-patterns", "xunit", "java"]
lang: "es"
---

# TDD by Example

Mis notas de la lectura de *Test-Driven Development: By Example* de Kent Beck. El libro cubre tres grandes áreas: un ejemplo con dinero multi-moneda, construir xUnit desde cero, y un catálogo completo de patrones TDD. Las páginas originales están al final.

---

## ¿Qué es TDD?

**Test-Driven Development** es una técnica de desarrollo donde escribes los tests automáticos *antes* que el código que los hace pasar.

Los beneficios principales:
- Ritmo de desarrollo predecible — siempre sabes en qué estás trabajando
- Los tests actúan como especificación del comportamiento del código
- Se siente bien escribirlo — la barra verde te da feedback constante

### El mantra: Rojo → Verde → Refactor

1. **Rojo** — escribe un test que falle (ni tiene que compilar)
2. **Verde** — haz el cambio mínimo necesario para que pase
3. **Refactor** — elimina la duplicación sin hacer fallar el test

### Qué resuelve

- Mejor QA: la densidad de defectos cae porque los problemas emergen inmediatamente
- Mejor comunicación en equipo: sin sorpresas desagradables entre desarrolladores
- Confianza: los nuevos desarrolladores tienen una red de seguridad sobre la que construir

### El objetivo

> Escribir código que funcione.

---

## Parte I: El ejemplo del Dinero

La primera parte del libro trabaja un sistema de dinero multi-moneda desde cero, guiado completamente por tests. El objetivo es aprender a escribir tests primero y hacer crecer el diseño de forma orgánica.

### Capítulo 1 — Dinero Multi-moneda

El problema de partida:

| Acción | Acciones | Precio | Total |
|--------|----------|--------|-------|
| IBM    | 1000     | 25     | $25,000 |
| GE     | 400      | 100    | $40,000 |
| **Total** | | | **$65,000** |

El reto llega cuando los precios están en diferentes monedas. Necesitas un mecanismo de conversión.

La lista TODO completa ni compila al principio — y eso es la clave. El objetivo es hacer pasar un test a la vez sin tocar la implementación más de lo necesario.

La idea central del capítulo 1: **existe una dependencia real entre test e implementación**. La lista TODO la revela de inmediato.

### Capítulos 2–6 — Mecánicas básicas

**Capítulo 2 — Objetos degenerados**

Los efectos secundarios aparecen cuando compartes variables entre tests que parten de suposiciones distintas. La solución: hacer las variables locales por test para aislar los efectos. Usa fakes e implementaciones obvias, luego refactoriza en pequeños pasos.

**Capítulo 3 — Igualdad para todos**

Los Value Objects eliminan la necesidad de preocuparte por los problemas de aliasing — son iguales por valor, no por referencia. **Triangulación**: usa 2 o más ejemplos concretos para generar una implementación más general. Por ejemplo, testear `F(3.0)` y `F(3.1)` te fuerza a escribir el caso general.

**Capítulo 4 — Privacidad**

Encuentra el equilibrio: hacer los campos privados en código de producción es importante, pero el código de test que comprueba estado privado revela dependencias reales. Deja que los tests decidan qué permanece público.

**Capítulo 5 — Siendo honestos**

Cuando una clase que necesita ser testeada tiene dependencias, no crees una abstracción de inmediato. Duplica la clase y el test. *Después* abstrae las partes necesarias una vez que la forma está clara.

**Capítulo 6 — Igualdad para todos, redux**

La duplicación se resuelve con abstracción — pero no te fíes a ciegas de la clase abstracta hasta que el compilador y los tests lo confirmen. Sigue abstrayendo y eliminando duplicados mientras mantienes los tests en verde. Si el diseño es bueno y los tests pasan, para. Si algo parece mal, espera hasta poder abrir la barra verde de nuevo.

### Capítulos 7–11 — Refinando el diseño

**Capítulo 7 — Manzanas y naranjas**

Comparar objetos de tipos distintos devolverá un null. Testear el comportamiento fallido explícitamente es una forma válida de documentación — a veces el test *es* la spec.

**Capítulo 8 — Creando objetos**

Abstracción abierta: las clases pueden hacer cambios pequeños y eliminar assertions porque la clase raíz realmente gestiona la manipulación. Deja que la jerarquía haga el trabajo.

**Capítulo 9 — Los tiempos en que vivimos**

La perspectiva del libro aquí: "No te estoy recomendando que des esos pasos pequeños. Lo que te recomiendo es ignorar el cero (y ser capaz de tomarlo). Si esos pasos son demasiado grandes, hazlos más pequeños. Si necesitas pasos más pequeños, estarás suficientemente cerca. No hay tamaño de paso correcto."

La lección: el tamaño del paso se adapta a tu confianza. No lo prescribas.

**Capítulo 10 — Tiempos interesantes**

Puedes crear métodos helper en la implementación que no necesariamente se testean directamente. No todo necesita un test — algunas cosas existen para dar soporte al diseño.

**Capítulo 11 — La raíz de todo el mal**

Mientras sigues escribiendo tests y abstrayendo, te darás cuenta de que ya no necesitas las subclases. La abstracción elimina la necesidad de las especializaciones concretas.

### Capítulos 12–16 — Construyendo el sistema de expresiones

**Capítulo 12 — Suma, por fin**

Añadir un diccionario (expression bank) permite abstraer la reducción. Una vez que lo introduces, el problema de la expresión que falla vuelve a aparecer — pero ahora en una forma más controlada.

**Capítulo 13 — Hacerlo funcionar**

El enfoque del libro: el primer paso es que compile. Estás descomponiendo la expresión en la clase bit a bit.

Disciplina clave: **mantén el test honesto**. No escribas tests desechables. El test debe estar lo más cerca posible de una assertion real.

Tests clave a escribir:
- `testSum`
- `testSumTwoOrMoreNumbers`

> El código itera y crece. ¿Por qué reducirlo antes de entenderlo? ¿Por qué perderlo?

**Capítulo 14 — Cambio**

Puedes escribir código sin tests en el contexto de innovación/exploración. Pero necesitas traerlo de vuelta bajo cobertura de tests antes de hacer shipping.

**Capítulo 15 — Monedas mixtas**

Cuando tienes múltiples marcas idénticas a través de distintos tests, extrae un método `forEach` general que cubra el refactoring tanto para la clase de test como para la implementación. Una vez que todas las clases y la implementación estén listas, escribe un test general que asserte los valores privados. Si el test es demasiado grande, divídelo en partes más pequeñas.

**Capítulo 16 — Abstracción, por fin**

Acabarás con aproximadamente el mismo número de líneas en los tests y en la implementación. No tengas miedo de añadir código adyacente que parezca útil — déjalo hasta el final. El test te da la oportunidad de corregir.

### Capítulo 17 — Retrospectiva del Dinero

TDD no es perfecto para la reflexión — pero no es el uso más efectivo del mismo. En sistemas grandes, las partes que tocas deben estar sólidas como una roca para que puedas hacer todos los cambios sin riesgo. Esto es el pensamiento SOLID aplicado al diseño de tests.

**Métricas de auditoría de código** (ejecutadas con todos los tests en verde):

| Métrica | Test | Implementación |
|---------|------|----------------|
| Núm. clases | 1 | 5 |
| Núm. funciones | 15 | 22 |
| Núm. líneas | 89 | 91 |
| Complejidad ciclomática | 2 | 2.04 |
| Funciones fáciles | 6 | 4 |

Estas métricas hablan de la calidad y lo que debería revisarse.

**Tres tipos de cobertura a conocer:**
- **Cobertura de sentencias**: comprueba cada elemento (simple). Hasta que no se te ocurran más tests.
- **Inserción de defectos**: cambia el significado de una línea de código — el test debería romperse.
- **Simplificación**: crea un conjunto fijo de tests y simplifica la lógica del programa.

No esperes que TDD reemplace otros tipos de testing: rendimiento, stress, accesibilidad.

---

## Parte II: El ejemplo de xUnit

La segunda parte construye un framework de testing desde cero (en Python en el libro). El objetivo es entender los internos de xUnit construyendo uno propio.

### Capítulo 18 — Primeros pasos con xUnit

Construimos nuestro propio framework de testing. El enfoque: escribe el test primero, aunque no compile. Luego abstrae: toma una clase que funciona para una instancia y generalízala reemplazando constantes por variables.

### Capítulo 19 — Preparar la mesa

Cada test tiene 3 partes (el patrón AAA):
1. **Arrange (Preparar)** — crear los objetos (posiblemente mocks)
2. **Act (Actuar)** — simularlos / llamar al método bajo test
3. **Assert (Verificar)** — comprobar los resultados

Cuidado con los efectos secundarios entre Arrange y el resto. Cada objeto creado para cada test no debe tener interconexión con otros del mismo test. La solución: un método `setUp` que se ejecuta antes de cada test con un estado fresco.

**Recuerda: 1, 2, n...** — cuando tienes un test, hazlo pasar. Con dos, busca el patrón. Con n, generaliza.

### Capítulo 20 — Limpiando después

Cuando un test asigna recursos externos, necesita liberarlos antes de terminar para mantener los tests independientes. Esto es `tearDown`.

### Capítulo 21 — Contando

Una buena práctica: usa `tearDown` después de cada test de xUnit. No solo para evitar efectos secundarios, sino también para capturar excepciones que pueden ocurrir durante el runtime del test. Usar esto crea un "checkpoint" para cada test.

### Capítulo 22 — Tratando con los fallos

La mayoría de las librerías de testing te dan todas las anotaciones para escribir tests sin preocuparte de las excepciones gestionadas en otro sitio. Eso es por diseño — el framework las absorbe.

### Capítulo 23 — Qué suite más bonita

La duplicación compuesta no es algo malo si tienes la motivación — es parte del patrón de diseño de testing. Los tests deben tener la capacidad de ser compuestos y ejecutados juntos.

### Capítulo 24 — Patrones de xUnit

**Assertion** — ¿cómo compruebas que los tests han funcionado correctamente?  
Escribe expresiones Boolean que automáticamente aserten si el código funcionó. Las assertions deben ser Boolean, declaradas por el código, deben ser específicas, y estar escritas usando el protocolo público.

**Fixture** — ¿cómo creas objetos comunes necesarios por varios tests?  
Convierte las variables locales del test en variables de instancia. Sobreescribe `setUp` e inicializa esas variables. El objetivo principal es eliminar la duplicación — pero en este caso, la duplicación puede ser buena por toda la "documentación" que proporciona un único test.

> ¿Qué elegir? Yo prefiero el primero (variables locales explícitas por test) — es más legible.

#### Retrospectiva de xUnit

Algunas conclusiones de implementar tu propio framework de testing:
- Los detalles de la implementación no son tan importantes como el caso de test
- El objetivo es escribir tests que estén aislados y puedan controlarse
- Estarás en camino de desarrollar test-first

¿Por qué construir tu propio framework?
- **Dominio**: control completo sobre un framework con pleno entendimiento de su implementación
- **Exploración**: al aprender un nuevo lenguaje de programación, es una excelente forma de explorarlo día a día

---

## Parte III: Patrones

### Capítulo 25 — Patrones de desarrollo Test-Driven

**Test** — ¿cómo testeas tu software?  
Escribe un test automático. Testear los cambios no es lo mismo que tener un test.

**Test Aislado** — ¿cómo debería afectarse un grupo de tests entre sí?  
En absoluto. Haz tests que puedas ejecutar localmente y a menudo. Ejecútalos todos. Evita efectos secundarios — cada `setUp` debe ejecutarse para un solo test y no crear dependencias entre ellos. Si no puedes hacer esto, es un síntoma de mal diseño de testing.

**Lista de Tests** — ¿qué deberías testear?  
Antes de nada, escribe todos los tests. Escribir toda la funcionalidad que quieres cubrir es un buen hábito. En el proceso, escribe un marcador `P/B` en los futuros tests para no tener que volver al principio desde el final.

**Test Primero** — ¿cuándo deberías escribir el test?  
Antes de escribir el código que se va a testear.

**Assert Primero** — ¿cuándo deberías escribir las assertions?  
Intenta escribirlas primero. Es una práctica donde ya no necesitas pensar en la implementación. Simplificas todas las preguntas de múltiple funcionalidad en lo que el test realmente necesita assertar.

Flujo de ejemplo: `[Implementación del test → Assertion Real] → [Construcción Real → Acción HTTP]`

**Datos del Test** — ¿qué datos usas para los tests?  
Usa datos que hagan los tests fáciles de leer y seguir. Estás escribiendo el test con un propósito, no como una máquina. Si puedes tener múltiples inputs para un test simple, hazlo. No te detengas en el happy path.

**Datos Evidentes** — ¿cómo representas la intención de los datos?  
Incluye los resultados extendidos y reales en el test mismo, e intenta hacer la relación aparente. No sobre-abstraigas los datos — deja que los números cuenten la historia.

### Capítulo 26 — Patrones de Barra Roja

Estos patrones responden: cuándo, dónde y cuándo dejar de escribir tests — y cuándo empezar.

**Test de Un Paso** — ¿qué test deberías elegir a continuación?  
Elige un test que estés seguro de que puedes implementar. No hay uno correcto — te sorprenderás porque descubres lo que puedes hacer haciéndolo.

**Tests de Arranque** — ¿qué test deberías escribir primero?  
Empieza testeando una variante de una operación que no hace nada. Elige inputs y outputs que sean fáciles de descubrir. Un primer test fácil debería ser: cuál es la operación más básica, qué debería devolver.

**Test de Explicación** — ¿cómo extiendes TDD en un equipo?  
Pide y da explicaciones. El mejor diseño y los mejores resultados mostrarán el modelo superior de TDD.

**Test de Aprendizaje** — ¿cuándo escribes un test para software producido externamente?  
No lo mockeas — usa una librería existente que instancie la dependencia externa. Escribe un test alrededor del punto de integración.

**Otro Test** — ¿cómo mantienes una distracción técnica fuera de tu flujo?  
Cuando surge una idea temporal, añade un test a la lista y sigue adelante. Escríbelo.

**Test de Regresión** — ¿qué es lo primero que haces cuando se reporta un bug?  
Escribe el test más pequeño posible que exponga el bug y falle hasta que esté corregido. Si acumulas muchos tests de regresión, es una señal de que tus decisiones de diseño necesitan revisión.

**Respirar** — ¿te sientes cansado?  
Descansa. Las ideas volverán y no desaparecerán. TDD fomenta un ritmo constante: descanso, distinciones claras, cadencia regular.

**Empezar de Nuevo** — ¿qué haces cuando te sientes perdido?  
Tira el código y empieza de cero.

**Mesa barata, silla buena** — hazte con una silla realmente buena. Mantén la mesa despejada para que el teclado pueda resolver las pausas.

### Capítulo 27 — Patrones de Testing

Estos patrones son técnicas más orientadas al detalle para escribir tests.

**Test Hijo** — ¿cómo haces funcionar un caso de test que resulta ser demasiado grande?  
Escribe un caso de test más pequeño que represente la parte rota. Haz funcionar el caso más pequeño, luego reintroduce el caso grande.

**Objeto Mock** — ¿cómo escribes un test que depende de un recurso complicado?  
Crea una versión falsa del recurso que devuelve constantes. El ejemplo clásico: una base de datos. Tu test siempre debería ejecutarse localmente sin depender de nada externo. Un mock bien diseñado te da rendimiento, fiabilidad y legibilidad. Usa una librería de mocks — no escribas la tuya a menos que estés aprendiendo.

**Self Shunt** — ¿cómo testeas que un objeto se comunica correctamente con otro?  
Haz que el objeto bajo test se comunique con el propio caso de test en lugar del colaborador real. Puedes añadir un campo `count` que registre cuántas veces se llamó a un método, luego assertarlo.

**Log String** — ¿cómo testeas que una secuencia de mensajes se llama correctamente?  
Mantén un log en un String y añade a él cuando se llama a un mensaje. Si no te importa el orden, usa el método "soft check" (contención en un Set). Ambos son patrones anti-corrupción.

**Maniquí de Choque** — ¿cómo testeas código de gestión de errores que rara vez se invoca?  
Crea un mock que lanza una excepción y verifica la assertion.

**Test Roto** — ¿cómo dejas una sesión de programación con un test sin terminar?  
Deja el test roto. Cuando vuelvas, tendrás un lugar obvio desde donde empezar. Un test roto no significa que el programador falló — solo hace explícito el estado del programa.

**Check-In Limpio** — ¿cómo dejas una sesión cuando programas en equipo?  
Deja todos los tests corriendo. Empieza desde un lugar de confianza — asegúrate de que todos los tests pasan antes de hacer check-in.

### Capítulo 28 — Fingiéndolo hasta hacerlo (Patrones de Barra Verde)

**Fingirlo** — ¿cuál es tu primer paso cuando tienes un test roto?  
Devuelve una constante. Después, refactoriza hacia una implementación real. El test está bien escrito si es honesto.

Tiene 2 efectos principales:
- **Psicológico**: tener una barra verde rápidamente te da un lugar donde estar
- **Control del alcance**: da la capacidad de resolverse rápidamente — una pequeña victoria ayuda a una mejor extensión

**Triangulación** — ¿cómo conduces la abstracción con tests de forma más conservadora?  
Abstrae solo cuando tienes 2 o más ejemplos. Los pasos crean un diseño entre la primera solución (constante) y la implementación completa (la matemática real). Esto te da mejor entendimiento de cómo implementar el test.

**Implementación Obvia** — ¿cuál es tu operación obvia? Hazla.  
Si tienes suficiente confianza, haz la implementación obvia directamente. Pero recuerda: tienes que mantener la spec del test. Si cometes un error, el test te lo dirá.

### Capítulo 29 — Patrones xUnit

**Fixture Externo** — ¿cómo liberas recursos externos?  
Usa `tearDown` para liberarlos. El objetivo: dejar el mundo en el mismo estado que antes de que se ejecutara el test.

**Método de Test** — ¿cómo representas un caso de test simple?  
Nómbralo claramente. Sin nombres claros, no hay forma de saber qué se testeó.

**Test de Excepción** — ¿cómo testeas excepciones esperadas?  
Captura las excepciones esperadas e ignóralas. Si la excepción no se lanza, el test falla.

**Todos los Tests** — ¿cómo ejecutas todos los test suites?  
Crea un suite de todos los suites. Las clases de test deben tener el mismo paquete que la implementación.

### Capítulo 30 — Patrones de Diseño

La mayoría de los problemas que resolvemos están conectados a las herramientas que usamos. Los siguientes patrones de diseño son los más relevantes para la combinación con TDD — proporcionan justo el diseño suficiente para guiarte a través de los ejemplos.

**Command** — representa la invocación de una computación como un objeto, no solo un mensaje. Cuando necesitas que la invocación sea más controlable y manipulable que un mensaje, crea un objeto que represente la computación.

**Value Object** — evita los problemas de aliasing haciendo objetos cuyos valores nunca cambian una vez creados. Cada operación devuelve un nuevo objeto fresco, dejando el original sin cambiar.

**Null Object** — representa el caso base de una computación como un objeto. Crea un objeto que represente el modelo para el caso especial en lugar de usar `null`.

**Template Method** — representa una secuencia invariante de una computación con un método abstracto. Escribe un método expresado en términos de otros métodos abstractos. El método 'normal' se declara dentro de la clase como la abstracción principal, similar a los métodos privados.

**Pluggable Object** — representa la variación dando a otro objeto dos o más implementaciones. Cuando trabajas en una clase con ramas condicionales alternantes, el Pluggable Object te da una forma de crear sub-objetos que encapsulan esas condiciones — asegurándote de que las condiciones `if` no estén duplicadas.

**Pluggable Selector** — evita las subclases invocando dinámicamente diferentes métodos para diferentes instancias. Almacena el nombre de un método e invócalo dinámicamente. Úsalo con cuidado — reduce el número de subclases pero hace el código más difícil de seguir porque el método que se llama no es visible en el punto de llamada. Beck recomienda la herencia en la mayoría de casos.

**Factory Method** — crea un objeto llamando a un método en lugar de a un constructor. Al introducir una nueva forma de creación en el método de otra clase, controlas el tipo de objeto devuelto.

**Impostor** — introduce variación introduciendo una nueva implementación de un protocolo existente. Introduce un nuevo objeto con el mismo protocolo que uno existente pero con diferente implementación. Este es el patrón detrás de Null Object y Mock Object — ambos son Impostores que introducen una nueva implementación sin cambiar la interfaz que ve el llamador.

**Composite** — representa la composición del comportamiento de una lista de objetos como un único objeto. Haz que el objeto compuesto sea un Impostor de los objetos compuestos. Crea un nuevo objeto que encapsule el tipo de la lista de objetos.

**Collecting Parameter** — pasa un parámetro para agregar los resultados de una computación entre objetos. Acumula resultados añadiendo un parámetro a la operación para la que se recogerán los resultados. Añadir un Collecting Parameter es una consecuencia común de Composite.

### Capítulo 31 — Refactoring

Estos patrones describen cómo cambiar el diseño una vez que los tests están pasando.

**Reconciliar Diferencias** — ¿cómo unificas dos trozos de código que parecen similares?  
Acércalos gradualmente. A medida que se vuelven más similares, fusióndalos. El enfoque: por herencia o composición.

**Aislar el Cambio** — ¿cómo cambias una parte de un método o objeto de múltiples partes?  
Aísla la parte que tiene que cambiar. El aislamiento puede hacerse extrayendo o introduciendo un nuevo método.

**Migrar Datos** — ¿cómo te mueves de una representación a otra?  
Duplica temporalmente los datos. Si usas un nuevo tipo, duplica los datos y adapta la nueva implementación. Después elimina la implementación antigua.

**Extraer Método** — ¿cómo haces que un método largo y complicado sea fácil de leer?  
Extrae una pequeña parte en un método separado y llámalo. Un método tiene 1 y solo 1 responsabilidad.

**Inline Method** — ¿cómo simplificas flujos de control que se han vuelto demasiado enredados?  
Reemplaza la invocación del método con el cuerpo del método. Inline method te dice que puedes usar el resultado disponible de un método, asignándolo a una variable.

**Extraer Interfaz** — ¿cómo introduces una separación limpia de operaciones?  
Crea una interfaz que contenga las operaciones claras. Abstrae el componente que quieres separar.

**Mover Método** — ¿cómo mueves un método adonde pertenece?  
Añádelo a la clase donde pertenece, luego elimínalo de donde estaba. Si quieres mover solo una parte: primero extrae la parte, luego muévela.

**Method Object** — ¿cómo representas un método complicado que requiere muchos parámetros y variables locales?  
Convierte el método en un objeto. Crea un objeto con los mismos parámetros que el método. Haz las variables locales variables de instancia. Crea un método que ejecute la lógica. Esto promueve un nuevo diseño para tu sistema.

**Añadir Parámetro** — añadir un parámetro a un nuevo método es un paso de extensión.

**Parámetro de Método a Parámetro de Constructor** — si pasas el mismo parámetro a varios métodos diferentes en el mismo objeto, simplifica la API pasándolo al constructor solo una vez.

### Notas propias: TDD con herencia y composición

Cuando haces TDD con TDD (¡meta!), puedes encontrarte en una situación donde necesitas hacer que tus clases sean toda refinación y abstracción.

Dos enfoques:

1. **Clase abstracta** — crea una clase abstracta que tenga la lógica común. Los detalles están en las subclases. La clase sigue siendo abstracta, con las instancias concretas en las clases hijas.

2. **Composición** — crea una interfaz que defina todos los métodos y haz las implementaciones necesarias.

Si quieres el primer enfoque, testea la lógica común en la clase abstracta directamente. Los tests pueden ser comunes, pero los mocks son necesarios. La clase abstracta necesita todos los "métodos mock" organizados en sus internos.

Si usas el segundo método (composición): tendrás todos los tests de métodos hechos. Tienes una capa de abstracción y el código es más legible. La interfaz no puede ser un buen modelo inicial por la falta de tipo en sus métodos.

Mi recomendación: usa TDD estándar en las implementaciones concretas primero, luego identifica los tests comunes y los mocks. Ejecuta todos esos tests desde el test de la clase abstracta.

### Capítulo 32 — Dominando TDD

**¿Qué tamaño deberían tener tus pasos?**

Depende de cuánto debería abarcar cada test. Pasos pequeños — esto no siempre es lo recomendado. Pero TDD tiene muchas opciones. El refactoring automático de los IDEs modernos facilita la expansión.

**¿Qué no tienes que testear?**
- Todas las responsabilidades: sin cálculos extra
- Fórmulas estándar, bucles, operaciones, polimorfismo

**¿Cómo sabes si tienes buenos tests?**
- Evita juntar código más largo + no hagas `asserts` pequeños sin pensar. Si tienes muchos asserts, piensa en tu diseño — o usa solo uno.
- No escribas tests que necesiten mucho tiempo para ejecutarse. Intenta dividirlos.
- Los tests que rompen partes peores después de cambiar una sección son un síntoma de otra parte del código.

**¿Cómo lleva TDD a los límites del sistema?**

Si tiendes a ser más realista, haz un test de integración con garantías naturales. El objeto que tiene cualquier tipo de interacción se necesitará de nuevo con tus propios parámetros. El test te dirá qué usar de nuevo en los otros objetos.

**¿Cuánto output necesitas?**

Escribe tantos tests como sean necesarios hasta cubrir todos los resultados de los datos del test. Piénsalo como documentación viva. Sé pragmático — los tests están listos para proporcionar valor oculto.

**¿Cuándo deberías borrar tests?**

- Elimina los redundantes y duplicados
- NO elimines tests que proporcionen valor y confianza claros
- Un test con el mismo camino por el código pero que habla de situaciones/parámetros diferentes vale la pena conservarlo

**¿Cómo influye el lenguaje de programación en TDD?**

Con las herramientas modernas, no debería afectar mucho. Cuanto más difícil sea el lenguaje de programación, más necesariamente aparece el testing.

**¿Puedes hacer test-driven de sistemas enormes?**

Sí. Haciendo TDD correctamente, el test evolucionará a medida que haces implementaciones más grandes.

**¿Puedes desarrollar solo con tests automatizados?**

Necesitas más que unit testing. También necesitas testear aplicaciones para monitorizar correctamente los resultados — aquí es donde entra ATDD (Acceptance Test Driven Development). Los **tests de aceptación** representan el camino completo de una funcionalidad como objetivo. Describen el comportamiento del dominio desde fuera.

**¿Cómo te cambias a TDD si no lo estás haciendo?**

1. Decide el momento para cambiar — el lugar debe ser el correcto
2. Aprende las herramientas. Familiarízate con las dependencias de test
3. Después, introdúcelo gradualmente en las nuevas funcionalidades

**¿Para qué está pensado TDD?**

Todo práctica de programación necesita un sistema de valores para mejorar. TDD debe venir como una suposición de que: si escribes mejor código, tendrás más éxito. TDD te ayuda a prestar atención a las cosas correctas en el momento correcto, para que puedas hacer diseños más limpios y mejorar mientras aprendes. TDD es para cualquiera que quiera un apego profesional al código. A medida que practicas, ganas confianza en el comportamiento del sistema.

Piensa en lo que quieres que el sistema haga y deja que el diseño se ordene naturalmente desde las reglas.

**Ejemplo: Iterando**

1. Escribe test para capturar el comportamiento
2. Impleméntalo
3. Evalúa si lo tienes como quieres
4. Impleméntalo
5. El test debería ser el test + (2, 3, n...) — El test te dice que necesitas refactorizar e implementar estrategias

**¿Por qué funciona TDD?**

- Un desastre siempre reduce la confianza en tu código y el de tu equipo
- Obtienes más feedback a través de mejores tests
- Adopta prácticas de programación que atraen la competencia

**¿Cómo se relaciona TDD con las prácticas de Extreme Programming?**

- **Particular**: el test te da un foco/plan común
- **Trabajo fresco**: con el test, es un excelente checkpoint para continuar
- **Integración Continua**: el test hace una excelente recursión, permitiéndote integrar más a menudo. Después de un checkpoint de test exitoso, haz el check-in.
- **Diseño Simple**: añadiendo solo lo que necesitas y eliminando duplicados, consigues el diseño más simple
- **Refactoring**: eliminar duplicación (1, 2, n...) eliminando la sintaxis común antigua
- **Entrega Continua**: garantizando confianza en buen código. Céntrate más en funcionalidades porque todos los tests se ejecutan y el código construye. Esto es ATDD.

### Copiar Patrones

Copiar patrones de código no es buena programación.

- Los patrones siempre necesitan adaptarse a tu propio proyecto
- Una buena forma: primero copia el patrón (librería) lo más fielmente posible
- Segundo: usa alguna mezcla de refactoring o test-qué-hacer para adaptaciones personalizadas

### London vs Chicago: Dos formas de abordar TDD

- **Escuela de Londres (Outside-In)**: Empieza por fuera (el test de aceptación) y trabaja hacia adentro. Usa mocks intensivamente. Se centra en las interacciones y el mensajeo entre objetos.
- **Escuela de Chicago (Inside-Out / Clásica)**: Empieza por dentro (la lógica del dominio core) y construye hacia fuera. Evita los mocks donde sea posible. Se centra en el estado y el comportamiento.

Ninguna está equivocada. El libro (Kent Beck) sigue la escuela Clásica/Chicago. Elige según tu contexto.

---

## Páginas originales

Haz clic en cualquier imagen para verla a tamaño completo.

<div class="notes-gallery">
  <div class="notes-grid">
    <a href="/blog/TDD/1.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/1.jpg" alt="Página 1" loading="lazy" /><span>Página 1</span></a>
    <a href="/blog/TDD/2.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/2.jpg" alt="Página 2" loading="lazy" /><span>Página 2</span></a>
    <a href="/blog/TDD/3.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/3.jpg" alt="Página 3" loading="lazy" /><span>Página 3</span></a>
    <a href="/blog/TDD/4.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/4.jpg" alt="Página 4" loading="lazy" /><span>Página 4</span></a>
    <a href="/blog/TDD/5.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/5.jpg" alt="Página 5" loading="lazy" /><span>Página 5</span></a>
    <a href="/blog/TDD/6.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/6.jpg" alt="Página 6" loading="lazy" /><span>Página 6</span></a>
    <a href="/blog/TDD/7.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/7.jpg" alt="Página 7" loading="lazy" /><span>Página 7</span></a>
    <a href="/blog/TDD/8.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/8.jpg" alt="Página 8" loading="lazy" /><span>Página 8</span></a>
    <a href="/blog/TDD/9.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/9.jpg" alt="Página 9" loading="lazy" /><span>Página 9</span></a>
    <a href="/blog/TDD/10.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/10.jpg" alt="Página 10" loading="lazy" /><span>Página 10</span></a>
    <a href="/blog/TDD/11.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/11.jpg" alt="Página 11" loading="lazy" /><span>Página 11</span></a>
    <a href="/blog/TDD/12.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/12.jpg" alt="Página 12" loading="lazy" /><span>Página 12</span></a>
    <a href="/blog/TDD/13.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/13.jpg" alt="Página 13" loading="lazy" /><span>Página 13</span></a>
    <a href="/blog/TDD/14.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/14.jpg" alt="Página 14" loading="lazy" /><span>Página 14</span></a>
    <a href="/blog/TDD/15.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/15.jpg" alt="Página 15" loading="lazy" /><span>Página 15</span></a>
    <a href="/blog/TDD/16.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/16.jpg" alt="Página 16" loading="lazy" /><span>Página 16</span></a>
    <a href="/blog/TDD/17.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/17.jpg" alt="Página 17" loading="lazy" /><span>Página 17</span></a>
    <a href="/blog/TDD/18.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/18.jpg" alt="Página 18" loading="lazy" /><span>Página 18</span></a>
    <a href="/blog/TDD/19.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/19.jpg" alt="Página 19" loading="lazy" /><span>Página 19</span></a>
    <a href="/blog/TDD/20.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/20.jpg" alt="Página 20" loading="lazy" /><span>Página 20</span></a>
    <a href="/blog/TDD/21.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/21.jpg" alt="Página 21" loading="lazy" /><span>Página 21</span></a>
    <a href="/blog/TDD/22.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/22.jpg" alt="Página 22" loading="lazy" /><span>Página 22</span></a>
    <a href="/blog/TDD/23.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/23.jpg" alt="Página 23" loading="lazy" /><span>Página 23</span></a>
    <a href="/blog/TDD/24.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/24.jpg" alt="Página 24" loading="lazy" /><span>Página 24</span></a>
    <a href="/blog/TDD/25.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/25.jpg" alt="Página 25" loading="lazy" /><span>Página 25</span></a>
    <a href="/blog/TDD/26.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/26.jpg" alt="Página 26" loading="lazy" /><span>Página 26</span></a>
    <a href="/blog/TDD/27.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/27.jpg" alt="Página 27" loading="lazy" /><span>Página 27</span></a>
    <a href="/blog/TDD/28.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/28.jpg" alt="Página 28" loading="lazy" /><span>Página 28</span></a>
    <a href="/blog/TDD/29.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/29.jpg" alt="Página 29" loading="lazy" /><span>Página 29</span></a>
    <a href="/blog/TDD/30.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/30.jpg" alt="Página 30" loading="lazy" /><span>Página 30</span></a>
    <a href="/blog/TDD/31.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/31.jpg" alt="Página 31" loading="lazy" /><span>Página 31</span></a>
    <a href="/blog/TDD/32.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/32.jpg" alt="Página 32" loading="lazy" /><span>Página 32</span></a>
    <a href="/blog/TDD/33.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/33.jpg" alt="Página 33" loading="lazy" /><span>Página 33</span></a>
    <a href="/blog/TDD/34.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/34.jpg" alt="Página 34" loading="lazy" /><span>Página 34</span></a>
  </div>
</div>

<style>
  .notes-gallery {
    margin-top: 2rem;
  }
  .notes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 1rem;
  }
  .note-thumb {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    text-decoration: none;
    color: inherit;
  }
  .note-thumb img {
    width: 100%;
    border-radius: 6px;
    border: 1px solid #e5e7eb;
    transition: transform 0.2s;
  }
  .note-thumb:hover img {
    transform: scale(1.03);
  }
  .note-thumb span {
    font-size: 0.75rem;
    color: #6b7280;
  }
</style>

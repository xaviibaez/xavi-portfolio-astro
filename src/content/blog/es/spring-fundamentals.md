---
title: "Spring & Spring Boot: IoC, Beans e Inyección de Dependencias"
description: "Los conceptos clave del framework Spring — contenedor IoC, Spring Beans, Inyección de Dependencias y cómo Spring Boot lo facilita todo — con los errores habituales corregidos."
pubDate: 2025-04-05
tags: ["java", "spring", "arquitectura", "backend"]
lang: "es"
---

# Spring & Spring Boot: IoC, Beans e Inyección de Dependencias

Spring es el framework dominante para construir aplicaciones backend en Java. Pero su "magia" — por qué las cosas funcionan como funcionan — se suele pasar por alto. Este post cubre los conceptos fundamentales desde cero, con las imprecisiones habituales corregidas.

---

## Spring Framework vs Spring Boot

**Spring Framework** es la base no-opinionated. Proporciona las herramientas (IoC, transacciones, MVC, etc.) pero requiere configurarlo todo manualmente. Por ejemplo, para definir un controlador necesitas trabajar directamente con servlets.

> Un servlet es una clase Java que extiende las capacidades de un servidor — específicamente para gestionar peticiones y respuestas HTTP.

**Spring Boot** es una capa opinionated construida sobre Spring Framework. Proporciona autoconfiguración (valores predeterminados razonables que cubren la mayoría de casos de uso) y permite sobreescribir esos valores donde haga falta.

La mayor mejora ergonómica son las **dependencias starter**: una sola dependencia como `spring-boot-starter-web` trae todo lo necesario para una aplicación web — Tomcat, Spring MVC, Jackson — sin tener que cablear cada una por separado.

```xml
<!-- Una dependencia en lugar de cinco separadas -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

Características clave de Spring Boot:
- Autoconfigurado — funciona de forma inmediata para configuraciones estándar
- Configuración mediante anotaciones (`@Annotation`), no XML (aunque XML sigue siendo compatible si lo necesitas)
- Diseñado para APIs standalone — servidor embebido, sin despliegue separado
- `@SpringBootApplication` arranca todo el contexto de la aplicación

---

## El Núcleo: Inversión de Control (IoC)

La idea central de Spring es la **Inversión de Control**: en lugar de que tu código cree y gestione sus propias dependencias, esa responsabilidad se delega al framework.

Sin IoC:
```java
public class OrderService {
    private PaymentService paymentService = new PaymentService(); // acoplado
    private EmailService emailService = new EmailService();       // acoplado
}
```

Con IoC, Spring gestiona la creación y el cableado de objetos. Tu clase simplemente declara lo que necesita:
```java
@Service
public class OrderService {
    private final PaymentService paymentService;
    private final EmailService emailService;

    public OrderService(PaymentService paymentService, EmailService emailService) {
        this.paymentService = paymentService;
        this.emailService = emailService;
    }
}
```

Spring crea las instancias de `PaymentService` y `EmailService` y las inyecta. `OrderService` no sabe ni le importa cómo se crean.

---

## Spring Beans

Un **Spring Bean** es cualquier objeto gestionado por el contenedor IoC de Spring. Hay dos formas de declararlo:

**`@Component`** — en una clase. Spring crea y gestiona una instancia de esa clase.
```java
@Component
public class EmailService { ... }
```

**`@Bean`** — en un método dentro de una clase `@Configuration`. Útil para clases de terceros que no puedes anotar directamente.
```java
@Configuration
public class AppConfig {
    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }
}
```

Variantes especializadas de `@Component` (funcionan igual pero transmiten intención):
- `@Service` — capa de lógica de negocio
- `@Repository` — capa de acceso a datos
- `@Controller` / `@RestController` — capa web

**Aclaración importante**: los beans se descubren mediante `@ComponentScan`, que está incluido en `@SpringBootApplication`. Esta anotación escanea el paquete y sus subpaquetes en busca de clases anotadas con `@Component` (o sus especializaciones) y las registra en el contexto de la aplicación.

---

## Scopes de los Beans

Los beans son **singleton por defecto** — se crea una única instancia compartida en toda la aplicación. Pero esto es configurable:

| Scope | Comportamiento |
|---|---|
| `singleton` (por defecto) | Una instancia por Spring Application Context |
| `prototype` | Nueva instancia cada vez que se solicita |
| `request` | Una instancia por petición HTTP (apps web) |
| `session` | Una instancia por sesión HTTP (apps web) |

```java
@Component
@Scope("prototype")
public class ReportGenerator { ... }
```

Una confusión habitual: los beans no están "en el scope del singleton de Spring" — viven en el **Spring Application Context** (el contenedor IoC). Singleton es simplemente el scope por defecto, no una propiedad fija de ser un bean.

---

## El Contenedor IoC

El contenedor IoC es el núcleo de Spring. Es responsable de:

- Crear beans y gestionar su ciclo de vida (inicialización, destrucción)
- Inyectar dependencias entre beans
- Cachear y reutilizar beans singleton
- Acceso thread-safe a recursos compartidos

Beneficios que aporta:
- **Inicialización lazy** — los objetos se crean solo cuando se necesitan
- **Gestión del ciclo de vida** — la inicialización y limpieza correctas evitan memory leaks
- **Configuración centralizada** — reduce el código de cableado redundante
- **Funcionalidades integradas** — transacciones, pooling, scheduling ya optimizados

---

## Inyección de Dependencias

La Inyección de Dependencias (DI) es el mecanismo con el que Spring implementa IoC. Desacopla la creación de objetos de su uso.

El framework de DI tiene tres componentes:

- **Grafo** — un grafo de objetos que contiene todas las dependencias del proyecto
- **Contenedores** — donde el programador crea las dependencias
- **Wirings** — instrucciones que le dicen al framework cómo gestionar las dependencias

Una dependencia es un objeto que otro objeto necesita para funcionar.

### Antes de la Inyección de Dependencias

El problema clásico — `Car` crea directamente su `Engine`:

![Antes de DI — Car instancia directamente Engine, creando acoplamiento fuerte](/blog/spring/spring2_p4_1.png)

`Car` está fuertemente acoplado a una implementación concreta de `Engine`. No puedes cambiar el motor, mockearlo en tests, ni reutilizar `Car` con otro motor sin modificar su código.

### Después de la Inyección de Dependencias

Spring inyecta el `Engine` en `Car` a través de una abstracción:

![Después de DI — Engine se inyecta en Car a través de abstracción, desacoplando ambos](/blog/spring/spring2_p4_2.png)

`Car` ahora depende de una interfaz (o tipo abstracto), no de una implementación concreta. Spring decide qué implementación inyectar. Esto hace el código testeable, flexible y fácil de cambiar.

### Tres Formas de Inyectar en Spring

**Inyección por constructor** (recomendada):
```java
@Service
public class CarService {
    private final Engine engine;

    public CarService(Engine engine) {  // Spring inyecta esto
        this.engine = engine;
    }
}
```

**Inyección por campo** (cómoda pero más difícil de testear):
```java
@Service
public class CarService {
    @Autowired
    private Engine engine;
}
```

**Inyección por setter** (útil para dependencias opcionales):
```java
@Service
public class CarService {
    private Engine engine;

    @Autowired
    public void setEngine(Engine engine) {
        this.engine = engine;
    }
}
```

La inyección por constructor es el enfoque preferido — hace las dependencias explícitas, soporta inmutabilidad (campos `final`) y facilita los tests unitarios sin necesitar un contexto de Spring.

---

## Imperativo vs Reactivo — Aclarando una Confusión Habitual

Un error frecuente en los apuntes: *"programación imperativa = síncrona, programación reactiva = asíncrona"*.

Esto es incorrecto. La distinción correcta:

**Programación imperativa** significa que describes *cómo* hacer algo, paso a paso. El flujo de control es explícito. Esto no tiene nada que ver con síncrono o asíncrono — `CompletableFuture`, callbacks y servlets asíncronos son todos imperativos y asíncronos.

**Programación reactiva** significa que describes *qué* hacer en respuesta a eventos. Los datos se te empujan cuando están disponibles, y tú reaccionas a ellos. La contrapresión es nativa.

El eje real:

| | Síncrono | Asíncrono |
|---|---|---|
| **Imperativo** | Código bloqueante tradicional | `CompletableFuture`, callbacks |
| **Reactivo** | (raro) | Spring WebFlux, Project Reactor |

En el contexto de Spring:
- **Spring MVC** — imperativo, bloqueante por defecto (puede hacerse asíncrono)
- **Spring WebFlux** — reactivo, no bloqueante, construido sobre Project Reactor

Puedes escribir código imperativo asíncrono (CompletableFuture). También puedes escribir código reactivo síncrono (poco habitual). Son ejes independientes.

---

## Spring MVC vs Spring WebFlux

| | Spring MVC | Spring WebFlux |
|---|---|---|
| Modelo | Imperativo (bloqueante) | Reactivo (no bloqueante) |
| Servidor | Tomcat (un hilo por petición) | Netty (event loop) |
| Tipos de retorno | `String`, `ResponseEntity<T>` | `Mono<T>`, `Flux<T>` |
| Cuándo usar | Apps CRUD, carga moderada | I/O de alta concurrencia, streaming |
| Curva de aprendizaje | Baja | Alta |

Para un análisis en profundidad del lado reactivo, ver el post complementario: [Project Reactor: Guía Práctica de Programación Reactiva en Java](/es/blog/project-reactor).

---

## Resumen

- **Spring Framework** = potente pero manual. **Spring Boot** = opinionated, autoconfigurado, listo para producción rápido
- **IoC** = Spring gestiona la creación de objetos. Tú declaras necesidades, Spring los cablea
- **Spring Beans** = objetos gestionados por el contenedor IoC. `@Component` (nivel clase) o `@Bean` (nivel método)
- **Scopes de beans** = singleton por defecto, pero configurable. Los beans viven en el Application Context, no "en el singleton"
- **`@ComponentScan`** (incluido en `@SpringBootApplication`) es quien descubre los beans
- **Inyección de Dependencias** = Spring inyecta dependencias por constructor, campo o setter. Constructor es lo preferido
- **Imperativo ≠ síncrono**. La distinción correcta es imperativo (flujo de control explícito) vs reactivo (orientado a eventos, push-based)

---

## Referencias

- [Spring ultimate basics: What are Spring Beans and what is the Spring Container?](https://www.youtube.com/watch?v=aS9SQITRocc)
- [What is Dependency Injection? (with Java examples)](https://www.youtube.com/watch?v=GfZEMiCCTpc)
- [Documentación oficial de Spring Boot](https://docs.spring.io/spring-boot/docs/current/reference/html/)

---
title: "Spring & Spring Boot: IoC, Beans, and Dependency Injection Explained"
description: "The core concepts behind the Spring framework — IoC container, Spring Beans, Dependency Injection, and how Spring Boot makes it all easier — with common misconceptions corrected."
pubDate: 2025-04-05
tags: ["java", "spring", "architecture", "backend"]
lang: "en"
---

# Spring & Spring Boot: IoC, Beans, and Dependency Injection Explained

Spring is the dominant framework for building Java backend applications. But its "magic" — why things work the way they do — is often glossed over. This post covers the core concepts from the ground up, with the common misconceptions corrected.

---

## Spring Framework vs Spring Boot

**Spring Framework** is the un-opinionated base. It gives you the tools (IoC, transactions, MVC, etc.) but requires you to configure everything yourself. For example, you have to define your controllers using servlets directly.

> A servlet is a Java class used to extend the capabilities of a server — specifically to handle HTTP requests and responses.

**Spring Boot** is an opinionated layer built on top of Spring Framework. It provides autoconfiguration (sensible defaults that cover most use cases), and lets you override those defaults where needed.

The biggest ergonomic improvement is **starter dependencies**: one dependency like `spring-boot-starter-web` pulls in everything you need for a web application — Tomcat, Spring MVC, Jackson — without manually wiring each one.

```xml
<!-- One dependency instead of five separate ones -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

Key Spring Boot characteristics:
- Autoconfigured — works out of the box for standard setups
- Configuration via annotations (`@Annotation`), not XML (though XML still works if you need it)
- Designed for standalone APIs — embedded server, no separate deployment needed
- `@SpringBootApplication` bootstraps the entire application context

---

## The Core: Inversion of Control (IoC)

The central idea of Spring is **Inversion of Control**: instead of your code creating and managing its own dependencies, you hand that responsibility to the framework.

Without IoC:
```java
public class OrderService {
    private PaymentService paymentService = new PaymentService(); // coupled
    private EmailService emailService = new EmailService();       // coupled
}
```

With IoC, Spring manages object creation and wiring. Your class just declares what it needs:
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

Spring creates the `PaymentService` and `EmailService` instances and injects them. Your `OrderService` doesn't know or care how they're created.

---

## Spring Beans

A **Spring Bean** is any object managed by the Spring IoC container. There are two ways to declare one:

**`@Component`** — on a class. Spring creates and manages an instance of this class.
```java
@Component
public class EmailService { ... }
```

**`@Bean`** — on a method inside a `@Configuration` class. Useful for third-party classes you can't annotate.
```java
@Configuration
public class AppConfig {
    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }
}
```

Specialised variants of `@Component` (they work the same way but convey intent):
- `@Service` — business logic layer
- `@Repository` — data access layer
- `@Controller` / `@RestController` — web layer

**Important clarification**: beans are discovered via `@ComponentScan`, which is included in `@SpringBootApplication`. This annotation scans the package and its subpackages for any class annotated with `@Component` (or its specialisations) and registers them in the application context.

---

## Bean Scopes

Beans are **singleton by default** — one instance is created and shared across the entire application. But this is configurable:

| Scope | Behaviour |
|---|---|
| `singleton` (default) | One instance per Spring Application Context |
| `prototype` | New instance every time it's requested |
| `request` | One instance per HTTP request (web apps) |
| `session` | One instance per HTTP session (web apps) |

```java
@Component
@Scope("prototype")
public class ReportGenerator { ... }
```

A common misconception: beans are not "in the scope of the Spring singleton" — they live in the **Spring Application Context** (the IoC container). Singleton is just the default scope, not a fixed property of being a bean.

---

## The IoC Container

The IoC container is the core of Spring. It is responsible for:

- Creating beans and managing their lifecycle (initialisation, destruction)
- Injecting dependencies between beans
- Caching and reusing singleton beans
- Thread-safe access to shared resources

Benefits it provides:
- **Lazy initialisation** — objects created only when needed
- **Lifecycle management** — proper initialisation and cleanup avoids memory leaks
- **Centralised configuration** — reduces redundant wiring code
- **Built-in features** — transactions, pooling, scheduling are already optimised

---

## Dependency Injection

Dependency Injection (DI) is the mechanism by which Spring implements IoC. It decouples object creation from object usage.

The DI framework has three components:

- **Graph** — an object graph containing all dependencies in your project
- **Containers** — where dependencies are created
- **Wirings** — instructions that tell the DI framework how to connect dependencies

A dependency is an object that another object requires to function.

### Before Dependency Injection

The classic problem — `Car` directly creates its `Engine`:

![Before DI — Car directly instantiates Engine, creating tight coupling](/blog/spring/spring2_p4_1.png)

`Car` is tightly coupled to a specific `Engine` implementation. You can't swap the engine, mock it for testing, or reuse `Car` with a different engine without modifying its code.

### After Dependency Injection

Spring injects the `Engine` into `Car` through an abstraction:

![After DI — Engine is injected into Car via abstraction, decoupling the two](/blog/spring/spring2_p4_2.png)

`Car` now depends on an interface (or abstract type), not a concrete implementation. Spring decides which implementation to inject. This makes the code testable, flexible, and easy to change.

### Three Ways to Inject in Spring

**Constructor injection** (recommended):
```java
@Service
public class CarService {
    private final Engine engine;

    public CarService(Engine engine) {  // Spring injects this
        this.engine = engine;
    }
}
```

**Field injection** (convenient but harder to test):
```java
@Service
public class CarService {
    @Autowired
    private Engine engine;
}
```

**Setter injection** (useful for optional dependencies):
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

Constructor injection is the preferred approach — it makes dependencies explicit, supports immutability (`final` fields), and makes unit testing straightforward without needing a Spring context.

---

## Imperative vs Reactive — Clearing Up a Common Confusion

A common but incorrect statement is: *"imperative programming = synchronous, reactive programming = asynchronous"*.

This is wrong. The correct distinction:

**Imperative programming** means you describe *how* to do something, step by step. Control flow is explicit. This has nothing to do with sync or async — `CompletableFuture`, callbacks, and async servlets are all imperative and asynchronous.

**Reactive programming** means you describe *what* to do in response to events. Data is pushed to you when available, and you react to it. Backpressure is native.

The real axis:

| | Synchronous | Asynchronous |
|---|---|---|
| **Imperative** | Traditional blocking code | `CompletableFuture`, callbacks |
| **Reactive** | (rare) | Spring WebFlux, Project Reactor |

In Spring's context:
- **Spring MVC** — imperative, blocking by default (can be made async)
- **Spring WebFlux** — reactive, non-blocking, built on Project Reactor

You can write imperative async code (CompletableFuture). You can also write reactive synchronous code (though unusual). They are independent axes.

---

## Spring MVC vs Spring WebFlux

| | Spring MVC | Spring WebFlux |
|---|---|---|
| Model | Imperative (blocking) | Reactive (non-blocking) |
| Server | Tomcat (thread-per-request) | Netty (event loop) |
| Return types | `String`, `ResponseEntity<T>` | `Mono<T>`, `Flux<T>` |
| When to use | CRUD apps, moderate load | High-concurrency I/O, streaming |
| Learning curve | Low | High |

For a deeper dive into the reactive side, see the companion post: [Project Reactor: A Practical Guide to Reactive Programming in Java](/blog/project-reactor).

---

## Summary

- **Spring Framework** = powerful but manual. **Spring Boot** = opinionated, autoconfigured, production-ready fast
- **IoC** = Spring manages object creation. You declare needs, Spring wires them
- **Spring Beans** = objects managed by the IoC container. `@Component` (class level) or `@Bean` (method level)
- **Bean scopes** = singleton by default, but configurable. Beans live in the Application Context, not "in the singleton"
- **`@ComponentScan`** (included in `@SpringBootApplication`) discovers beans, not `@SpringBootApplication` itself
- **Dependency Injection** = Spring injects dependencies via constructor, field, or setter. Constructor injection is preferred
- **Imperative ≠ synchronous**. The correct distinction is imperative (explicit control flow) vs reactive (event-driven, push-based)

---

## Further Reading

- [Spring ultimate basics: What are Spring Beans and what is the Spring Container?](https://www.youtube.com/watch?v=aS9SQITRocc)
- [What is Dependency Injection? (with Java examples)](https://www.youtube.com/watch?v=GfZEMiCCTpc)
- [Spring Boot official docs](https://docs.spring.io/spring-boot/docs/current/reference/html/)

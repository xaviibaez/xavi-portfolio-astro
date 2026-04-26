---
title: "Spring & Spring Boot: IoC, Beans i Injecció de Dependències"
description: "Els conceptes clau del framework Spring — contenidor IoC, Spring Beans, Injecció de Dependències i com Spring Boot ho facilita tot — amb els errors habituals corregits."
pubDate: 2025-04-05
tags: ["java", "spring", "arquitectura", "backend"]
lang: "ca"
---

# Spring & Spring Boot: IoC, Beans i Injecció de Dependències

Quan vaig aprendre Spring per primera vegada, el concepte que més em va costar entendre va ser la inversió de control. No perquè sigui especialment complex, sinó perquè canvia fonamentalment qui controla el flux del programa.

En el codi tradicional, el teu codi crea les seves dependències. Amb IoC, un contenidor extern crea i gestiona els objectes per tu. Sembla una distinció petita, però canvia com penses sobre el disseny.

---

## El Contenidor IoC

El contenidor IoC de Spring és responsable d'instanciar, configurar i ensambles objectes que s'anomenen beans. Quan arrenca l'aplicació, Spring llegeix la configuració — ja sigui anotacions, XML o classes Java — i construeix el context d'aplicació.

```java
@Component
public class PaymentService {
    private final FraudDetector fraudDetector;

    public PaymentService(FraudDetector fraudDetector) {
        this.fraudDetector = fraudDetector;
    }
}
```

En aquest exemple, `PaymentService` no crea `FraudDetector`. Spring ho fa. `PaymentService` simplement declara que en necessita un.

---

## Spring Beans

Un bean és qualsevol objecte gestionat pel contenidor Spring. Pots marcar una classe com a bean usant diverses anotacions:

- `@Component` — propòsit general
- `@Service` — capa de lògica de negoci
- `@Repository` — capa d'accés a dades
- `@Controller` / `@RestController` — capa web

Totes elles són equivalents des del punt de vista del contenidor, però transmeten intenció al lector.

---

## Injecció de Dependències

Spring suporta tres tipus d'injecció:

**Per constructor** (recomanada):
```java
@Service
public class OrderService {
    private final PaymentService paymentService;

    public OrderService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
}
```

**Per setter** (per a dependències opcionals):
```java
@Autowired
public void setNotificationService(NotificationService ns) {
    this.notificationService = ns;
}
```

**Per camp** (convenient però dificulta els tests):
```java
@Autowired
private EmailService emailService;
```

La injecció per constructor és la preferida perquè fa les dependències explícites i permet que els camps siguin finals.

---

## Com Spring Boot ho Simplifica

Spring Boot elimina gran part de la configuració boilerplate afegint autoconfiguració. Quan tens una base de dades al classpath, Spring Boot configura automàticament un DataSource. Quan tens Spring MVC, configura el DispatcherServlet.

```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

Una sola anotació activa l'escaneig de components, l'autoconfiguració i la configuració Spring Boot.

---

## Errors Habituals

**Dependències circulars**: A depèn de B, B depèn d'A. Spring ho detecta a l'arrencada. La solució sol ser refactoritzar l'arquitectura o usar `@Lazy`.

**Beans no trobats**: `NoSuchBeanDefinitionException` significa que Spring no pot trobar un bean del tipus demanat. Comprova que la classe tingui l'anotació correcta i que estigui en un paquet escanejat.

**Instanciació múltiple**: Si necesites múltiples instàncies d'un bean, usa `@Scope("prototype")` o factories.

Entendre aquests conceptes és fonamental per a qualsevol projecte Java modern. La majoria dels errors de Spring es redueixen a no tenir clars els límits de responsabilitat entre el teu codi i el contenidor.

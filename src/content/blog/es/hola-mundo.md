---
title: "Sistemas de Pago Cloud-Native: Lecciones Aprendidas"
description: "Tras años trabajando en microservicios de pagos de alto rendimiento en BBVA, estas son las decisiones de arquitectura que marcaron la diferencia entre sistemas escalables y frágiles."
pubDate: 2025-01-15
tags: ["microservicios", "arquitectura", "pagos"]
lang: "es"
---

# Sistemas de Pago Cloud-Native: Lecciones Aprendidas

Trabajar en sistemas de pago a escala te obliga a pensar diferente sobre fiabilidad, consistencia y modos de fallo. Después de varios años construyendo y manteniendo infraestructura de pagos cloud-native en BBVA Technology, quiero compartir algunas lecciones aprendidas a base de experiencia.

## La Falacia de la Sincronía Total

Cuando empecé en pagos, cada llamada entre servicios era síncrona. Una solicitud de pago se expandía a detección de fraude, verificación de saldo, redes de autorización — todo en cadena. ¿El problema? Un timeout de 200ms en cualquier servicio provoca un fallo de 2 segundos para el cliente.

El cambio a **arquitectura orientada a eventos** lo cambió todo. La clave: no todos los pasos en un flujo de pago necesitan ocurrir antes de confirmar al cliente. La puntuación antifraude, las actualizaciones del libro mayor, el envío de notificaciones — muchos de estos pueden ser asíncronos.

```java
// Antes: cadena síncrona
PaymentResult result = fraudService.check(payment)
    .then(balanceService::validate)
    .then(authNetwork::authorize)
    .then(ledgerService::record);

// Después: patrón comando con pasos async
commandBus.dispatch(new InitiatePaymentCommand(payment));
// Retorna confirmación inmediata, procesa en async
```

## La Idempotencia No Es Opcional

Las redes fallan. Los reintentos ocurren. Sin claves de idempotencia, cobras dos veces al cliente. Cada endpoint de pago debe ser idempotente — la misma solicitud, enviada múltiples veces, debe producir el mismo resultado.

Almacenamos las claves de idempotencia en Redis con un TTL de 24 horas. La implementación es sencilla, pero la disciplina para aplicarla de forma consistente no lo es.

## Los Circuit Breakers Salvan Tus Noches

Las redes de autorización de terceros se caen. Cuando lo hacen, sin circuit breakers, todo tu servicio de pagos se bloquea con solicitudes pendientes y los thread pools se agotan.

Con Resilience4j y Spring Boot:

```java
@CircuitBreaker(name = "authNetwork", fallbackMethod = "authNetworkFallback")
public AuthResult authorize(Payment payment) {
    return authorizationNetworkClient.authorize(payment);
}

public AuthResult authNetworkFallback(Payment payment, Exception ex) {
    // Encolar para reintento async o usar red secundaria
    paymentQueue.enqueue(payment);
    return AuthResult.pending();
}
```

## Próximos Posts

En entradas futuras cubriré trazabilidad distribuida con OpenTelemetry, nuestro enfoque de orquestación de sagas para transacciones multi-paso, y cómo usamos Elasticsearch para analítica de pagos a escala.

El mundo de los sistemas de pago es infinitamente fascinante — mucho en juego, requisitos de corrección estrictos y escala enorme. Espero que estas lecciones sean útiles si estás construyendo en este espacio.

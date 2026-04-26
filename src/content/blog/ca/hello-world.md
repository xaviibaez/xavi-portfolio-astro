---
title: "Sistemes de Pagament Cloud-Native: Lliçons Apreses"
description: "Després d'anys treballant en microserveis de pagaments d'alt rendiment a BBVA, aquestes són les decisions d'arquitectura que van marcar la diferència entre sistemes escalables i fràgils."
pubDate: 2025-01-15
tags: ["microserveis", "arquitectura", "pagaments"]
lang: "ca"
---

# Sistemes de Pagament Cloud-Native: Lliçons Apreses

Treballar en sistemes de pagament a escala t'obliga a pensar diferent sobre fiabilitat, consistència i modes de fallada. Després de diversos anys construint i mantenint infraestructura de pagaments cloud-native a BBVA Technology, vull compartir algunes lliçons apreses a base d'experiència.

## La Fal·làcia de la Sincronia Total

Quan vaig començar en pagaments, cada crida entre serveis era síncrona. Una sol·licitud de pagament s'expandia a detecció de frau, verificació de saldo, xarxes d'autorització — tot en cadena. El problema? Un timeout de 200ms en qualsevol servei provoca una fallada de 2 segons per al client.

El canvi a **arquitectura orientada a esdeveniments** ho va canviar tot. La clau: no tots els passos en un flux de pagament han de succeir abans de confirmar al client. La puntuació antifrau, les actualitzacions del llibre major, l'enviament de notificacions — molts d'aquests poden ser asíncrons.

```java
// Abans: cadena síncrona
PaymentResult result = fraudService.check(payment)
    .then(balanceService::validate)
    .then(authNetwork::authorize)
    .then(ledgerService::record);

// Després: patró comanda amb passos async
commandBus.dispatch(new InitiatePaymentCommand(payment));
// Retorna confirmació immediata, processa en async
```

## La Idempotència No És Opcional

Les xarxes fallen. Els reintents succeeixen. Sense claus d'idempotència, cobres dues vegades al client. Cada endpoint de pagament ha de ser idempotent — la mateixa sol·licitud, enviada múltiples vegades, ha de produir el mateix resultat.

Emmagatzemem les claus d'idempotència a Redis amb un TTL de 24 hores. La implementació és senzilla, però la disciplina per aplicar-la de forma consistent no ho és.

## Els Circuit Breakers Salven les Teves Nits

Les xarxes d'autorització de tercers cauen. Quan ho fan, sense circuit breakers, tot el teu servei de pagaments es bloqueja amb sol·licituds pendents i els thread pools s'esgoten.

Amb Resilience4j i Spring Boot:

```java
@CircuitBreaker(name = "authNetwork", fallbackMethod = "authNetworkFallback")
public AuthResult authorize(Payment payment) {
    return authorizationNetworkClient.authorize(payment);
}

public AuthResult authNetworkFallback(Payment payment, Exception ex) {
    // Encuar per a reintent async o usar xarxa secundària
    paymentQueue.enqueue(payment);
    return AuthResult.pending();
}
```

## Propers Posts

En entrades futures cobriré traçabilitat distribuïda amb OpenTelemetry, el nostre enfocament d'orquestració de sagas per a transaccions multi-pas, i com fem servir Elasticsearch per a analítica de pagaments a escala.

El món dels sistemes de pagament és infinitament fascinant — molt en joc, requisits de correcció estrictes i escala enorme. Espero que aquestes lliçons siguin útils si estàs construint en aquest espai.

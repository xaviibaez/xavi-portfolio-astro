---
title: "Building Cloud-Native Payment Systems: Lessons Learned"
description: "After years working on high-throughput payment microservices at BBVA, here are the key architecture decisions that made the difference between scalable and fragile systems."
pubDate: 2025-01-15
tags: ["microservices", "architecture", "payments"]
lang: "en"
---

# Building Cloud-Native Payment Systems: Lessons Learned

Working on payment systems at scale forces you to think differently about reliability, consistency, and failure modes. After several years building and maintaining cloud-native payment infrastructure at BBVA Technology, I want to share some of the hard-won lessons.

## The Fallacy of Synchronous Everything

When I first started in payments, every service call was synchronous. A payment request would fan out to fraud detection, balance checks, authorization networks — all in a chain. The problem? A 200ms timeout in any single service cascades to a 2-second failure for the customer.

The shift to **event-driven architecture** changed everything. Key insight: not every step in a payment flow needs to happen before you confirm to the customer. Fraud scoring, ledger updates, notification dispatch — many of these can be asynchronous.

```java
// Before: synchronous chain
PaymentResult result = fraudService.check(payment)
    .then(balanceService::validate)
    .then(authNetwork::authorize)
    .then(ledgerService::record);

// After: command pattern with async steps
commandBus.dispatch(new InitiatePaymentCommand(payment));
// Return immediate acknowledgment, process async
```

## Idempotency is Non-Negotiable

Networks fail. Retries happen. Without idempotency keys, you double-charge customers. Every payment endpoint must be idempotent — the same request, submitted multiple times, must produce the same result.

We store idempotency keys in Redis with a TTL of 24 hours. The implementation is straightforward but the discipline to apply it consistently is not.

## Circuit Breakers Save Your Night

Third-party authorization networks go down. When they do, without circuit breakers, your entire payment service backs up with pending requests and thread pools exhaust.

Using Resilience4j with Spring Boot:

```java
@CircuitBreaker(name = "authNetwork", fallbackMethod = "authNetworkFallback")
public AuthResult authorize(Payment payment) {
    return authorizationNetworkClient.authorize(payment);
}

public AuthResult authNetworkFallback(Payment payment, Exception ex) {
    // Queue for async retry or use secondary network
    paymentQueue.enqueue(payment);
    return AuthResult.pending();
}
```

## What's Next

In future posts I'll cover distributed tracing with OpenTelemetry, our approach to saga orchestration for multi-step transactions, and how we use Elasticsearch for payment analytics at scale.

The world of payment systems is endlessly fascinating — high stakes, strict correctness requirements, and enormous scale. I hope these lessons are useful if you're building in this space.

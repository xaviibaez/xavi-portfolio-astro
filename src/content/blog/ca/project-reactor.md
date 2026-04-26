---
title: "Project Reactor: Guia Pràctica de Programació Reactiva en Java"
description: "De la contrapressió als virtual threads, Mono/Flux i l'event loop — tot el que vaig aprendre construint sistemes de pagament reactius a BBVA, amb els errors corregits."
pubDate: 2025-04-05
tags: ["java", "reactor", "spring", "reactiu"]
lang: "ca"
---

# Project Reactor: Guia Pràctica de Programació Reactiva en Java

Quan vaig arribar als sistemes de pagament reactius a BBVA, ja tenia anys d'experiència amb Java síncroni. Sabia com funcionen els threads, entenia els bloquejaments, coneixia les futures. Però la programació reactiva va resultar ser un canvi de paradigma més profund del que esperava.

Aquesta entrada recull el que m'hauria agradat saber des del principi.

---

## Per Què Reactiu?

La programació imperativa tradicional bloqueja el thread mentre espera: una consulta a la base de dades, una crida HTTP, una lectura de fitxer. En un sistema de pagaments amb alta concurrència, això significa tenir centenars de threads bloquejats esperant respostes d'xarxa.

La programació reactiva inverteix el model: en lloc de bloquejar i esperar, registres callbacks i alliberes el thread. Quan la resposta arriba, el sistema el notifica.

El resultat: pots gestionar molts més sol·licituds concurrents amb menys recursos.

---

## Mono i Flux

Project Reactor proporciona dos tipus publishers principals:

**Mono** — zero o un element:
```java
Mono<Payment> findPayment(String id) {
    return repository.findById(id);
}
```

**Flux** — zero o N elements:
```java
Flux<Transaction> getHistory(String accountId) {
    return repository.findByAccount(accountId);
}
```

La clau és que cap d'ells fa res fins que algú s'hi subscriu. Són declaratius: defineixes la pipeline de transformació, i s'executa quan hi ha un subscriptor.

---

## Operadors Essencials

```java
Flux.range(1, 10)
    .filter(n -> n % 2 == 0)           // filtra
    .map(n -> n * 2)                    // transforma
    .flatMap(n -> callExternalApi(n))   // async non-blocking
    .onErrorResume(e -> Flux.empty())   // gestiona errors
    .subscribe(System.out::println);
```

La diferència entre `map` i `flatMap` és crítica:
- `map` — transforma síncronament, 1 entrada → 1 sortida
- `flatMap` — transforma a un altre publisher, gestiona async, permet concurrència

---

## Contrapressió

La contrapressió és el mecanisme que permet al subscriptor dir al publisher quants elements pot processar. Sense ella, un publisher ràpid pot desbordar un subscriptor lent.

```java
Flux.range(1, 1000)
    .onBackpressureBuffer(100)
    .subscribe(
        item -> process(item),
        error -> log.error("Error", error),
        () -> log.info("Completat")
    );
```

---

## Errors Habituals que Vaig Cometre

**Bloquejar dins d'una pipeline reactiva**: Cridar `.block()` dins d'un operador reactiu inutilitza tot el benefici i pot causar deadlocks.

**No subscriure's**: Recordes que res s'executa sense subscriptor. Si crees un Mono però mai t'hi subscrius, el codi mai s'executa.

**Depuració complexa**: Les stack traces reactives poden ser difícils de llegir. Activa `Hooks.onOperatorDebug()` en desenvolupament.

La programació reactiva té una corba d'aprenentatge pronunciada, però un cop entens el model mental, veus per què és la base dels sistemes d'alta concurrència moderns.

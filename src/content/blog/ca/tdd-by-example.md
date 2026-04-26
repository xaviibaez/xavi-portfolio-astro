---
title: "TDD by Example"
description: "Un desglosament complet del llibre TDD by Example de Kent Beck — Red-Green-Refactor, els exemples de Money i xUnit, i tots els patrons: test-driven, barra vermella, testing, disseny i refactoring."
pubDate: 2026-04-08
tags: ["tdd", "testing", "design-patterns", "xunit", "java"]
lang: "ca"
---

# TDD by Example

Kent Beck va escriure TDD by Example el 2002 i continua sent una de les lectures més influents en enginyeria de programari. No perquè inventi conceptes complexos, sinó perquè demostra com una disciplina simple — escriure tests primer — canvia fonamentalment com dissenyem el codi.

---

## El Cicle Red-Green-Refactor

Tot TDD gira al voltant d'un cicle de tres passos:

1. **Red** — escriu un test que falla. Ni tan sols ha de compilar.
2. **Green** — escriu el mínim codi per fer passar el test.
3. **Refactor** — millora el codi sense trencar els tests.

La clau és el pas Green: "el mínim codi". Molts developers instintivament escriuen la solució genèrica quan volen estar en verd. TDD et força a ser específic primer, i deixar que els tests futurs et guiïn cap a la generalitat.

---

## L'Exemple de Money

La primera part del llibre implementa una classe `Money` per gestionar multi-moneda. Comença amb un test trivial:

```java
@Test
void testMultiplication() {
    Dollar five = new Dollar(5);
    Dollar product = five.times(2);
    assertEquals(10, product.amount);
}
```

Aquest test no compila. `Dollar` no existeix, `times` no existeix, `amount` no existeix. I això és exactament el punt: el test especifica l'API que vols abans que existeixi.

La implementació mínima per fer-lo passar:

```java
class Dollar {
    int amount;

    Dollar(int amount) {
        this.amount = amount;
    }

    Dollar times(int multiplier) {
        return new Dollar(amount * multiplier);
    }
}
```

Funcionalment correcte. Probablement no com ho hauries escrit "des de zero". Però els tests posteriors et guiaran cap a la forma final.

---

## Patrons de TDD

Beck identifica tres categories de patrons al llibre:

**Patrons Red Bar** — com escriure el test que falla:
- *Starter Test*: comença amb un test que no fa res però que especifica l'API
- *Explanatory Test*: escriu tests que documenten el comportament esperat
- *Learning Test*: testa una biblioteca de tercers per entendre com funciona

**Patrons Green Bar** — estratègies per passar el test:
- *Fake It*: retorna un valor hardcoded temporalment
- *Triangulate*: afegeix un segon test que forci la generalització
- *Obvious Implementation*: quan la solució és evident, implementa-la directament

**Patrons de Refactoring**:
- *Reconcile Differences*: quan dues implementacions fan el mateix, unifica-les
- *Isolate Change*: extreu el canvi a un mètode separat
- *Migrate Data*: canvia la representació interna gradualment

---

## La Segona Part: Construint xUnit

La part més sorprenent del llibre és que Beck construeix un framework de testing usant TDD. El framework fa els seus propis tests mentre s'escriu.

```python
class TestCase:
    def __init__(self, name):
        self.name = name

    def run(self):
        method = getattr(self, self.name)
        method()
```

Veure com un framework de testing es construeix des de zero, test a test, desmitifica completament com funcionen eines com JUnit.

---

## El que Canvia Quan Practiques TDD

Després de practicar TDD durant mesos en producció, el canvi més gran no és la cobertura de tests. És com et relaciones amb el codi que no pots testar fàcilment.

Quan un mètode és difícil de testar, TDD et dona un senyal immediat que el disseny té un problema. Massa dependències, responsabilitats barrejades, efectes secundaris ocults. Els tests difícils revelen el malament disseny.

Això és el que Kent Beck vol dir quan diu que TDD és una tècnica de disseny tant com una tècnica de testing.

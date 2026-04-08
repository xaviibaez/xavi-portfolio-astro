---
title: "TDD by Example"
description: "A full breakdown of Kent Beck's TDD by Example — Red-Green-Refactor, the Money and xUnit walkthroughs, and all the patterns: test-driven, red bar, testing, design, and refactoring."
pubDate: 2026-04-08
tags: ["tdd", "testing", "design-patterns", "xunit", "java"]
lang: "en"
---

# TDD by Example

My notes from reading *Test-Driven Development: By Example* by Kent Beck. The book covers three main areas: a Money example walkthrough, building xUnit from scratch, and a full catalogue of TDD patterns. The original pages are at the bottom.

---

## What is TDD?

**Test-Driven Development** is a development technique where you write automated tests *before* you write the code that makes them pass.

The core benefits:
- Predictable development rhythm — you always know what you're working on
- The tests act as a specification for the code's behaviour
- It feels good to write — the green bar gives you constant feedback

### The Mantra: Red → Green → Refactor

1. **Red** — write a test that fails (it doesn't even have to compile)
2. **Green** — make the minimum change necessary to make it pass
3. **Refactor** — eliminate duplication without making the test fail

### What it solves

- Better QA: defect density drops because problems surface immediately
- Better team communication: no nasty surprises between developers
- Confidence: new developers have a safety net to build on

### The objective

> Write code that works.

---

## Part I: The Money Example

The first part of the book works through a multi-currency money system from scratch, driven entirely by tests. The goal is to learn to write tests first and grow the design organically.

### Chapter 1 — Multi-Currency Money

The starting problem:

| Stock | Shares | Price | Total |
|-------|--------|-------|-------|
| IBM   | 1000   | 25    | $25,000 |
| GE    | 400    | 100   | $40,000 |
| **Total** | | | **$65,000** |

The challenge is when prices are in different currencies. You need a conversion mechanism.

The full TODO list won't even compile at first — and that's the point. The goal is to make one test pass at a time without touching the implementation more than necessary.

The key insight from Chapter 1: **there is a true dependency between test and implementation**. The TODO list reveals it immediately.

### Chapters 2–6 — Core Mechanics

**Chapter 2 — Degenerate Objects**

Side effects appear when you share variables across tests that make different assumptions. The fix: make variables local per test to isolate side effects. Use fakes and obvious implementations, then refactor in small steps.

**Chapter 3 — Equality for All**

Value objects remove the need to worry about aliasing side effects — they are equal by value, not by reference. **Triangulation**: use 2 or more concrete examples to generate a more generalised implementation. For example, testing `F(3.0)` and `F(3.1)` forces you to write the general case.

**Chapter 4 — Privacy**

Find the balance: making fields private in production code is important, but test code that checks private state reveals true dependencies. Let the tests drive what stays public.

**Chapter 5 — Frankly Speaking**

When a class that needs testing also has dependencies, don't create an abstraction immediately. Duplicate the class and the test. *Then* abstract the necessary parts once the shape is clear.

**Chapter 6 — Equality for All, Redux**

Duplication is solved with abstraction — but don't blindly trust the abstract class until the compiler and the tests confirm it. Keep abstracting and removing duplicates while maintaining green tests. If the design is good and tests pass, stop. If something feels wrong, delay until you can open the green bar again.

### Chapters 7–11 — Refining the Design

**Chapter 7 — Apples and Oranges**

Comparing objects of different types will surface a null. Testing the failing behaviour explicitly is a valid form of documentation — sometimes the test *is* the spec.

**Chapter 8 — Making Objects**

Open abstraction: the classes can make small changes and remove assertions because the root class actually handles the manipulation. Let the hierarchy do the work.

**Chapter 9 — Times We Are Living In**

The book's perspective here: "I'm not recommending you take those little steps. What I'm recommending is to ignore zero (and be able to take it). If those steps are too large, make them smaller. If you need smaller steps, you'll be close enough to take those. There is no right step size."

The lesson: the step size adapts to your confidence. Don't prescribe it.

**Chapter 10 — Interesting Times**

You can create helper methods on the implementation that aren't necessarily tested directly. Not everything needs a test — some things exist to support the design.

**Chapter 11 — The Root of All Evil**

As you keep writing tests and abstracting, you'll realise you no longer need the subclasses. The abstraction eliminates the need for the concrete specialisations.

### Chapters 12–16 — Building the Expression System

**Chapter 12 — Addition, Finally**

Adding a dictionary (expression bank) allows abstracting the reduction. Once you introduce it, the failing expression problem reappears — but now in a more controlled form.

**Chapter 13 — Make It**

The book's approach: first step is to make it compile. You are breaking the expression into the class bit by bit. 

Key discipline: **keep the test honest**. Don't write tests that are disposable. The test should be as close to a real assertion as possible.

Key tests to write:
- `testSum`
- `testSumTwoOrMoreNumbers`

> Code iterates and grows. Why reduce it before you understand it? Why lose it?

**Chapter 14 — Change**

You can write code without tests in the context of innovation/exploration. But you need to bring it back under test coverage before shipping.

**Chapter 15 — Mixed Currencies**

When you have multiple identical marks across different tests, extract a general `forEach` method that covers the refactoring for both the test class and the implementation. Once all classes and the implementation are done, write a general test asserting the private values. If the test is too large, divide it into smaller ones.

**Chapter 16 — Abstraction, Finally**

You'll end up with about the same number of lines in the tests and the implementation. Don't be afraid to add adjacent code that seems useful — leave it until the end. The test gives you the opportunity to correct.

### Chapter 17 — Money Retrospective

TDD stinks for reflection — but it is not the most effective use case for it. In large systems, the parts you touch should be rock solid so you can make all the changes without risk. This is SOLID thinking applied to test design.

As a system grows it can get ugly without information about what's happening on the old code.

**Code audit metrics** (ran after all tests were green):

| Metric | Test | Implementation |
|--------|------|----------------|
| Num. classes | 1 | 5 |
| Num. functions | 15 | 22 |
| Num. lines | 89 | 91 |
| Cyclomatic complexity | 2 | 2.04 |
| Easy functions | 6 | 4 |

These tell you about quality and what should be reviewed.

**Three types of coverage to know:**
- **Statement coverage**: check every element (simple). Until you can't think of more tests.
- **Defect insertion**: change the meaning of a line of code — the test should break.
- **Simplification**: create a fixed set of tests and simplify the logic of the program.

Do not expect TDD to replace other types of testing: performance, stress, accessibility.

---

## Part II: The xUnit Example

The second part builds a testing framework from scratch (in Python in the book). The goal is to understand the internals of xUnit by building one.

### Chapter 18 — First Steps to xUnit

We build our own testing framework. The approach: write the test first, even if it doesn't compile. Then abstract: take a class that works on one instance and generalise it by replacing constants with variables.

### Chapter 19 — Set the Table

Every test has 3 parts (the AAA pattern):
1. **Arrange** — create some objects (possibly mocks)
2. **Act** — simulate them / call the method under test
3. **Assert** — check the results

Be careful about side effects between Arrange and the rest. Each object created for each test should have no interconnection with others in the same test. The solution: a `setUp` method that runs before each test with a fresh state.

**Remember: 1, 2, n...** — when you have one test, make it pass. When you have two, look for a pattern. When you have n, generalise.

### Chapter 20 — Cleaning Up After

When a test allocates external resources, it needs to release them before it finishes to keep tests independent. This is `tearDown`. Doing log-keeping based on this pattern is common.

### Chapter 21 — Counting

A good practice: use `tearDown` after each xUnit test. Not only to avoid side effects, but also to catch exceptions that can happen during test runtime. Using this creates a "checkpoint" for each test.

### Chapter 22 — Dealing with Failure

Most testing libraries give you all the annotations to write tests without worrying about exceptions handled elsewhere. That's by design — the framework absorbs them.

### Chapter 23 — How Suite It Is

Compound duplication is not a bad thing if you have the motivation — it's part of the testing design pattern. Tests must have the ability to be composed and run together.

### Chapter 24 — xUnit Patterns

**Assertion** — how do you check that tests worked correctly?  
Write Boolean expressions that automatically assert whether the code worked. Assertions must be Boolean, declared by the code, must be specific, and written using the public protocol.

**Fixture** — how do you create common objects needed by several tests?  
Convert local variables in the test into instance variables. Override `setUp` and initialise those variables. The main objective is to remove duplication — but in this case, duplication can be good because of all the "documentation" a single test provides.

> What to choose? I prefer the first (explicit local variables per test) — it's more readable.

#### xUnit Retrospective

A few things from implementing your own testing framework:
- The details of the implementation are not as important as the test case
- The objective is to write tests that are isolated and can be controlled
- You'll be on your way to developing test-first

Why build your own framework?
- **Mastery**: complete control over a framework with full understanding of its implementation
- **Exploration**: on learning a new programming language, it's a great way to explore it day to day

---

## Part III: Patterns

### Chapter 25 — Test-Driven Development Patterns

**Test** — how do you test your software?  
Write an automatic test. Testing changes is not the same as having a test.

**Isolated Test** — how should a group of tests affect one another?  
Not at all. Make tests that you can execute locally and often. Run all of them. Avoid side effects — each `setUp` should be executed for one test only and not create dependencies between tests. If you are not able to do this, it is a symptom of bad testing design.

**Test List** — what should you test?  
Before anything else, write all the tests down. Writing down all the functionality you want to cover is a good habit. On the process, write a `P/B` marker on future tests to avoid going to the end and then coming back to the beginning.

**Test First** — when should you write the test?  
Before you write the code that is to be tested.

**Assert First** — when should you write assertions?  
Try writing them first. It is a practice where you no longer need to think about the implementation. You simplify all the multiple functionality questions into what the test actually needs to assert.

Example flow: `[Test implementation → Real Assertion] → [Real building → HTTP Action]`

**Test Data** — what data do you use for tests?  
Use data that makes the tests easy to read and follow. You are writing the test for a reason, not a machine. If you can have multiple inputs for a simple test, do it. Don't stop at happy path.

**Evident Data** — how do you represent the intent of the data?  
Include extended and actual results in the test itself, and try to make the relationship apparent. Don't over-abstract the data — let the numbers tell the story.

### Chapter 26 — Red Bar Patterns

These patterns answer: when, where, and when to stop writing tests — and when to start.

**One Step Test** — which test should you pick next?  
Pick a test you are confident you can implement. There is no right one — you'll surprise yourself because you discover what you can do by doing.

**Starter Tests** — which test should you write first?  
Start by testing a variant of an operation that doesn't do anything. Choose inputs and outputs that are easy to discover. An easy first test should be: what is the most basic method/operation on, what it should return.

**Explanation Test** — how do you spread TDD in a team?  
Ask and give explanations. The better design and results will show the superior model of TDD.

**Learning Test** — when do you write a test for externally produced software?  
You don't mock it — use an existing library that instantiates the external dependency. Write a test around the integration point.

**Another Test** — how do you keep a technical distraction out of your flow?  
When a temporal idea arises, add a test to the list and move on. Write it down.

**Regression Test** — what is the first thing you do when a bug is reported?  
Write the smallest possible test that exposes the bug and will fail until fixed. If you have many regressions, that's a signal your design decisions need revisiting.

**Breathing** — do you feel tired?  
Take a rest. The ideas will come back and won't go away. TDD encourages a steady rhythm: rest, clear distinctions, regular cadence.

**Do Over** — what do you do when you feel lost?  
Throw the code away and start over.

**Cheap Desk, Nice Chair** — get a really nice chair. Keep your desk clear so the keyboard can resolve breaks.

### Chapter 27 — Testing Patterns

These patterns are more detail-oriented techniques for writing tests.

**Child Test** — how do you get a test case running that turns out to be too big?  
Write a smaller test case that represents the broken piece. Get the smaller test case running, then reintroduce the larger test case.

**Mock Object** — how do you write a test that relies on a complicated resource?  
Create a fake version of the resource that returns constants. The classic example: a database. Your test should always execute locally without depending on anything external. A well-designed mock gives you performance, reliability, and readability. Use a mock library — don't write your own unless you're learning.

**Self Shunt** — how do you test that one object communicates correctly with another?  
Have the object under test communicate with the test case itself instead of the real collaborator. You can add a `count` field that tracks how many times a method was called, then assert on it.

**Log String** — how do you test that a sequence of messages is called correctly?  
Keep a log in a string and append to it when a message is called. If you don't care about order, use the "soft check" method (set containment). Both are anti-corruption patterns.

**Crash Test Dummy** — how do you test error-handling code that is unlikely to be triggered?  
Create a mock that throws an exception and verify the assertion.

**Broken Test** — how do you leave a programming session with an unfinished test?  
Leave the test broken. When you come back, you'll have an obvious place to start. A broken test doesn't mean the programmer failed — it just makes the status of the program explicit.

**Clean Check-In** — how do you leave a session when programming in a team?  
Leave all tests running. Start from a place of confidence — make sure all tests pass before checking in code.

### Chapter 28 — Fake It Until You Make It (Green Bar Patterns)

**Fake It** — what is your first step when you have a broken test?  
Return a constant. After that, refactor it towards a real implementation. The test is well-written if it is honest.

This has 2 main effects:
- **Psychological**: having a quickly green bar gives you a place to stand
- **Scope control**: gives you the ability to quickly be resolved — a small pass will help better extension

**Triangulation** — how do you most conservatively drive abstraction with tests?  
Abstract only when you have 2 or more examples. The steps create a design between the first solution (constant) and the full implementation (the real math). This gives you a better understanding of how to implement the test.

**Obvious Implementation** — what is your obvious operation? Just do it.  
If you're confident enough, make the obvious implementation directly. But remember: you have to maintain the test spec. If you make a mistake, the test will tell you.

### Chapter 29 — xUnit Patterns

**External Fixture** — how do you release external resources?  
Use `tearDown` to release them. The goal: leave the world in the same state as before the test ran.

**Test Method** — how do you represent a simple test case?  
Name it clearly. Without clear names, there's no way to tell what was tested. Testing frameworks provide readable names — use them to make the test a "test".

**Exception Test** — how do you test expected exceptions?  
Catch expected exceptions and ignore them. If the exception is not thrown, the test fails.

**All Tests** — how do you run all test suites?  
Make a suite of all suites. Don't package-separate them — aggregate the package tests for the whole application. Test classes should share the same package as the implementation.

### Chapter 30 — Design Patterns

Most problems we solve are connected to tools we use. The following patterns are most relevant to the TDD combination — they provide just enough design to set you through the examples.

**Command** — represent the invocation of a computation as an object, not just a message. When you need invocation to be more controllable and manipulable than a message, create an object representing the computation.

**Value Object** — avoid aliasing problems by making objects whose values never change once created. Every operation returns a new fresh object, leaving the original unchanged.

**Null Object** — represent the base case of a computation as an object. Create an object that represents the model for the special case instead of using `null`.

**Template Method** — represent an invariant sequence of a computation with an abstract method. Write a method expressed in terms of other abstract methods. The 'normal' method is declared within the class as the main abstraction, similar to private methods.

**Pluggable Object** — represent variation by giving another object two or more implementations. When working on a class with alternating conditional branches, the Pluggable Object gives you a way to create sub-objects that encapsulate those conditions — sure that the `if` conditions are not duplicated.

**Pluggable Selector** — avoid subclasses by dynamically invoking different methods for different instances. Store the name of a method and dynamically invoke it. Use this pattern with caution — it reduces the number of subclasses but makes the code harder to navigate because the method being called is not visible at the call site. Beck recommends inheritance for most cases.

**Factory Method** — create an object by calling a method instead of a constructor. By introducing a new form of creation into another method's class, you control the type of object returned.

**Impostor** — introduce variation by introducing a new implementation of an existing protocol. Introduce a new object with the same protocol as an existing one but a different implementation. This is the pattern behind both Null Object and Mock Object — both are Impostors that introduce a new implementation without changing the interface seen by the caller.

**Composite** — represent the composition of a list of objects' behaviour as a single object. Make the composite object an Impostor for the composed objects. Create a new object that encapsulates the type of the list of objects.

**Collecting Parameter** — pass along a parameter to aggregate results of a computation across objects. For Composite: implement a `collect` method. Accumulate results by adding a parameter to the operation for which results will be collected. Adding a Collecting Parameter is a common consequence of Composite.

### Chapter 31 — Refactoring

These patterns describe how to change the design once tests are passing.

**Reconcile Differences** — how to unify two similar-looking pieces of code?  
Gradually bring them closer together. As they become more similar, merge them. The approach: bring it by heritage or composition.

**Isolate Change** — how do you change one part of a multi-part method or object?  
Isolate the part that has to change. The isolation can be done by extracting or introducing a new method.

**Migrate Data** — how do you move from one representation to another?  
Temporarily duplicate the data. If using a new type, duplicate the data and adapt the new implementation. After that, remove the old implementation.

**Extract Method** — how do you make a long, complicated method easy to read?  
Extract a small part of it into a separate method and call it. One method has 1 and only 1 responsibility.

**Inline Method** — how do you simplify control flows that are too tangled?  
Replace a method invocation with the method body. Inline method tells you that you can use a method's available result, assigning it into a variable.

**Extract Interface** — how do you introduce a clean separation of operations?  
Create an interface containing the clear operations. Abstract the component you want to separate.

**Move Method** — how do you move a method to where it belongs?  
Add it to the class where it belongs, then remove it from where it was. If you want to move just a part: first extract the part, then move it.

**Method Object** — how do you represent a complicated method that requires many parameters and local variables?  
Make an object out of the method. Create an object with the same parameters as the method. Make local variables instance variables. Create one method that executes the logic. This promotes a new design for your system.

**Add Parameter** — adding a parameter to a new method is an extension step.

**Method Parameter to Constructor Parameter** — if you pass the same parameter to several different methods in the same object, simplify the API by passing it to the constructor once instead.

### Personal Notes: TDD with Inheritance and Composition

When doing TDD with TDD (meta!), you may encounter a situation on composition where you need to make your classes all refinement and abstraction.

Two approaches:

1. **Abstract class** — create an abstract class that holds the common logic. The details are in subclasses. The class is still abstract, with the making instance in the concrete classes.

2. **Composition** — create an interface that defines all the methods and make the necessary implementations.

If you want to go with the 1st option, test the common logic on the abstract class directly. The tests can be common, but mocks are necessary. The abstract class needs all the "mock methods" organised in its internals.

If you use the 2nd method (composition): you'll have all the method tests done. You have a layer of abstraction and make the code more readable. The interface cannot be a good initial model because of the lack of type on its methods.

My recommendation: use standard TDD on the concrete implementations first, then identify the common tests and mock. Run all those tests from the abstract class test.

### Chapter 32 — Mastering TDD

**How large should your steps be?**

Depending on how much spread each test should take. Small steps — this is not always recommending. But TDD has a lot of options. Automatic expanding occurs when referring to IDE refactoring.

**What you don't have to test?**
- All the responsibilities: no calculations and test
- Standard formulas, loops, operations, polymorphism

**How do you know if you have good tests?**
- Avoid joining longer code + don't make little when. If you have many asserts, think about your design — or use only one.
- Do not write tests that need a lot of time to execute. Try to split.
- Tests that break worse parts after changing a section are a symptom of another part of the code.

**How does TDD lead to boundaries?**

If you tend to be more realistic, make an integration test with natural guarantees. The object that has any type of interaction will be needed again with your own parameters. The test will tell you what to use again on the other objects.

**How much output do you need?**

Write as many tests as necessary until all the results of the test data are covered. Think about it as living documentation. Be pragmatic — tests are ready to provide hidden value.

**When should you delete tests?**

- Remove redundant and duplicated ones
- Do NOT remove tests that provide clear value and confidence
- A test with the same path through the code but that speaks to different situations/parameters is worth keeping

**How does the programming language influence TDD?**

With modern tooling, it should not affect much. Maybe using ports or types could save a few tests. The harder the programming language, the more necessarily testing appears.

**Can you test drive enormous systems?**

Yes. By doing proper TDD the test will evolve as you do larger implementations.

**Can you make development with automated tests only?**

You need more than unit testing. You also need to test applications to properly monitor results — this is where ATDD (Acceptance Test Driven Development) comes in. **Acceptance tests** represent the complete path of a feature as a goal. They describe the domain behaviour from the outside.

**How do you switch to TDD if you are not doing it?**

1. Decide the time to change — the place must be right
2. Learn the tools. Get familiar with the test dependencies
3. After that, gradually introduce it on new features

**Why is TDD intended for?**

Every programming practice needs a value system to improve. TDD must come as an assumption that: if you write better code, you will be more successful. TDD helps you to pay attention to the right things at the right time, so you can make cleaner designs and improve as you learn. TDD is for anyone who wants a professional attachment to code. As you practice, you gain confidence in the behaviour of the system.

**Is TDD limited to certain conditions?**

In many cases, if a method should remain alive in a test road, continue the implementation. Stop by steps.

Think about what you want the system to do and let the design sort itself naturally from rules.

**Example: Iterating**

1. Write test to catch behaviour
2. Implement it
3. Assess to have it as you'd want it
4. Implement it
5. Should be the test + (2, 3, n...) — The test tells you you need to refactor and implement strategies

**Why does TDD work?**

- A mess always reduces confidence in your code and your team's code
- You get more feedback through better tests
- It adopts programming practices that attract competence

**How does TDD relate to Extreme Programming?**

- **Particular**: the test gives you a common focus/plan
- **Work fresh**: with the test, it is an excellent checkpoint to continue
- **Continuous Integration**: the test makes an excellent recursion, enabling you to integrate more often. After a successful test checkpoint, push your check-in.
- **Simple Design**: by adding only what you need and removing duplicates, you achieve the simplest design
- **Refactoring**: removing duplication (1, 2, n...) deleting the old common syntax loop
- **Continuous Delivery**: guaranteeing trust in good code. Focus more on features because all the tests run and the code builds. This is ATDD.

### Pattern Copying

Pattern copying of code is not good programming.

- Patterns always need to be adapted to your own project
- A good way: first copy the pattern (library) as closely as possible
- Second: use some mix of refactoring or test-what-to-do for personalised adaptation

### London vs Chicago: Two Ways to Approach TDD

- **London School (Outside-In)**: Start from the outside (the acceptance test) and work inward. Mock collaborators heavily. Focuses on interactions and messaging between objects.
- **Chicago School (Inside-Out / Classic)**: Start from the inside (core domain logic) and build out. Avoid mocks where possible. Focuses on state and behaviour.

Neither is wrong. The book (Kent Beck) follows the Classic/Chicago school. Choose based on your context.

---

## Original Pages

Click any image to see it full size.

<div class="notes-gallery">
  <div class="notes-grid">
    <a href="/blog/TDD/1.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/1.jpg" alt="Page 1" loading="lazy" /><span>Page 1</span></a>
    <a href="/blog/TDD/2.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/2.jpg" alt="Page 2" loading="lazy" /><span>Page 2</span></a>
    <a href="/blog/TDD/3.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/3.jpg" alt="Page 3" loading="lazy" /><span>Page 3</span></a>
    <a href="/blog/TDD/4.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/4.jpg" alt="Page 4" loading="lazy" /><span>Page 4</span></a>
    <a href="/blog/TDD/5.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/5.jpg" alt="Page 5" loading="lazy" /><span>Page 5</span></a>
    <a href="/blog/TDD/6.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/6.jpg" alt="Page 6" loading="lazy" /><span>Page 6</span></a>
    <a href="/blog/TDD/7.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/7.jpg" alt="Page 7" loading="lazy" /><span>Page 7</span></a>
    <a href="/blog/TDD/8.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/8.jpg" alt="Page 8" loading="lazy" /><span>Page 8</span></a>
    <a href="/blog/TDD/9.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/9.jpg" alt="Page 9" loading="lazy" /><span>Page 9</span></a>
    <a href="/blog/TDD/10.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/10.jpg" alt="Page 10" loading="lazy" /><span>Page 10</span></a>
    <a href="/blog/TDD/11.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/11.jpg" alt="Page 11" loading="lazy" /><span>Page 11</span></a>
    <a href="/blog/TDD/12.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/12.jpg" alt="Page 12" loading="lazy" /><span>Page 12</span></a>
    <a href="/blog/TDD/13.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/13.jpg" alt="Page 13" loading="lazy" /><span>Page 13</span></a>
    <a href="/blog/TDD/14.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/14.jpg" alt="Page 14" loading="lazy" /><span>Page 14</span></a>
    <a href="/blog/TDD/15.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/15.jpg" alt="Page 15" loading="lazy" /><span>Page 15</span></a>
    <a href="/blog/TDD/16.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/16.jpg" alt="Page 16" loading="lazy" /><span>Page 16</span></a>
    <a href="/blog/TDD/17.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/17.jpg" alt="Page 17" loading="lazy" /><span>Page 17</span></a>
    <a href="/blog/TDD/18.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/18.jpg" alt="Page 18" loading="lazy" /><span>Page 18</span></a>
    <a href="/blog/TDD/19.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/19.jpg" alt="Page 19" loading="lazy" /><span>Page 19</span></a>
    <a href="/blog/TDD/20.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/20.jpg" alt="Page 20" loading="lazy" /><span>Page 20</span></a>
    <a href="/blog/TDD/21.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/21.jpg" alt="Page 21" loading="lazy" /><span>Page 21</span></a>
    <a href="/blog/TDD/22.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/22.jpg" alt="Page 22" loading="lazy" /><span>Page 22</span></a>
    <a href="/blog/TDD/23.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/23.jpg" alt="Page 23" loading="lazy" /><span>Page 23</span></a>
    <a href="/blog/TDD/24.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/24.jpg" alt="Page 24" loading="lazy" /><span>Page 24</span></a>
    <a href="/blog/TDD/25.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/25.jpg" alt="Page 25" loading="lazy" /><span>Page 25</span></a>
    <a href="/blog/TDD/26.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/26.jpg" alt="Page 26" loading="lazy" /><span>Page 26</span></a>
    <a href="/blog/TDD/27.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/27.jpg" alt="Page 27" loading="lazy" /><span>Page 27</span></a>
    <a href="/blog/TDD/28.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/28.jpg" alt="Page 28" loading="lazy" /><span>Page 28</span></a>
    <a href="/blog/TDD/29.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/29.jpg" alt="Page 29" loading="lazy" /><span>Page 29</span></a>
    <a href="/blog/TDD/30.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/30.jpg" alt="Page 30" loading="lazy" /><span>Page 30</span></a>
    <a href="/blog/TDD/31.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/31.jpg" alt="Page 31" loading="lazy" /><span>Page 31</span></a>
    <a href="/blog/TDD/32.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/32.jpg" alt="Page 32" loading="lazy" /><span>Page 32</span></a>
    <a href="/blog/TDD/33.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/33.jpg" alt="Page 33" loading="lazy" /><span>Page 33</span></a>
    <a href="/blog/TDD/34.jpg" target="_blank" rel="noopener noreferrer" class="note-thumb"><img src="/blog/TDD/34.jpg" alt="Page 34" loading="lazy" /><span>Page 34</span></a>
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

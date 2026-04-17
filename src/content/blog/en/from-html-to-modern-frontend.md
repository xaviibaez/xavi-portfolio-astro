---
title: "From Plain HTML to Modern Frontend: What I Learned Along the Way"
description: "A personal reflection on migrating a project from vanilla HTML/CSS/JS to Astro, Tailwind CSS, and Alpine.js — what drove each decision and what changed afterwards."
pubDate: 2026-04-17
tags: ["astro", "tailwind", "alpine.js", "frontend", "reflection"]
lang: "en"
---

# From Plain HTML to Modern Frontend: What I Learned Along the Way

A while back I took on the website for a powerlifting gym, [RZ Powerhouse](https://www.rzpowerhouse.com). It started as a small project: build the site in HTML and CSS, add some JavaScript for the interactive bits, done. It wasn't my usual stack — I come from the backend — but it wasn't something I couldn't handle.

The problem came later, as the site kept growing.

---

## The moment the code stops helping you

There's a point in every vanilla frontend project where you open the main file and don't really know where to start. Not because the code is bad. It's that it has grown without structure, and every small change requires understanding too much context.

For me that moment came when the gym wanted to add individual pages for each of their services. I realised I'd have to duplicate almost all the HTML, keep the CSS in sync across multiple places, and copy blocks of JavaScript from one file to another. Before writing a single new line, I already knew what I was about to do was going to be a problem down the road.

That's the moment it's worth stopping and rethinking the architecture.

---

## Why Astro

I'd been hearing about Astro for a while but had mentally filed it under "yet another frontend thing to learn." What changed my mind was understanding its concrete proposition: it generates static HTML by default and only sends JavaScript to the browser when it's actually needed. No bloated bundles. No complex configuration. The default output is already fast.

For a site like the gym's — mostly static content, with a few interactive spots — that was exactly what I needed.

What surprised me most when I started was how natural the componentisation feels. You take each section of the monolithic HTML and turn it into its own `.astro` file. Suddenly you can reason about the navbar without seeing the footer code. You can touch the testimonials section without worrying about breaking the contact form.

The change that saved me the most work was being able to create a single layout for the service pages. The gym has six different services, and with one well-defined template, all the pages are generated from the same place. You change the design once and everything updates.

---

## Why Tailwind CSS

Tailwind was the decision I hesitated over the most. Writing classes in the HTML instead of in a separate CSS file felt like a step backwards. I'd learned that separating structure and styles was good practice, and this seemed to go against that.

What convinced me was being honest about the actual problem I had. The `styles.css` I'd built up wasn't easy to maintain because it was a global file that affected everything. To change the colour of a button, I had to make sure there weren't ten other places depending on that same class. The fear of touching someone else's CSS — or in this case, your own CSS from three months ago — is a sign something has gone wrong.

With Tailwind the styles for each element sit right next to the element. When I open the navbar component, I see exactly what styles that navbar has. No hunting in another file. No unexpected side effects.

What I didn't expect is that it also frees you from the naming problem. Naming CSS classes well is surprisingly hard. Is it `card--featured` or `card-featured` or `featured-card`? Do I follow BEM or not? With Tailwind that problem disappears because the classes already have names: they're the library's utilities.

---

## Why Alpine.js

The project's JavaScript was the hardest thing to reconsider. It worked. The interactive effects were well built. But something bothered me: each component's state lived in loose module-level variables, and the DOM was the only real source of truth about what was being shown.

When I needed to add new interactivity — an image carousel with touch drag, a form that shows a confirmation toast — I found myself writing more and more code to keep state in sync with the DOM. The result was correct but hard to follow.

Alpine.js solved that in a way that felt very natural: you define the component's state in the HTML itself, and the library takes care of keeping the DOM in sync. No `querySelector`. No `classList.toggle`. You change a value and the screen updates itself.

What I liked most is that Alpine doesn't need its own build step. It integrates into Astro with a couple of config lines and just works. For light interactivity — menus, sliders, forms — it's more than enough, and it doesn't add unnecessary complexity to the project.

---

## What changed after the migration

Technically the site improved: it loads faster, images are optimised automatically, the SEO is better structured. But that's not what I notice day to day.

What changed most was the confidence to touch the code. When the client asks for a change on a service page, I know exactly which file to open and what could be affected. There's no 27 KB CSS file I'm afraid to edit. There's no block of JavaScript I'm not sure where it came from.

That feeling — being able to make a change without constantly thinking about what you might be breaking — is what I value most from the whole process. It wasn't about modern technology for the sake of it. It was about being able to work comfortably on the project for the long term.

---

## When this path makes sense

Not every project needs this migration. If you have a three-section landing page that isn't going to grow, plain HTML is perfectly valid and much simpler.

The signal that it's worth considering is when you start being afraid of your own code. When duplicating a page instead of abstracting it feels like the safer option. When changing the CSS of one component means searching through an entire file to see what might break.

At that point, tools like Astro, Tailwind, and Alpine aren't added complexity. They're how you get control back.

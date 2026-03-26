import type { Translations } from './en';

export const es: Translations = {
  nav: {
    home: 'Inicio',
    blog: 'Blog',
    projects: 'Proyectos',
    contact: 'Contacto',
  },
  hero: {
    greeting: 'Hola, soy',
    name: 'Xavi Ibáñez',
    role: 'Senior Backend Engineer',
    company: 'BBVA Technology',
    location: 'Barcelona, España',
    bio: 'Apasionado de los microservicios construyendo sistemas de pago cloud-native. Más de 7 años diseñando arquitecturas distribuidas con Java, TypeScript y mucho café.',
    cta: 'Ver mi trabajo',
    ctaBlog: 'Leer mi blog',
  },
  about: {
    title: 'Sobre mí',
    text: 'Soy ingeniero backend especializado en sistemas cloud-native y arquitecturas de microservicios en BBVA Technology. Me apasiona el código limpio, las prácticas de extreme programming y las metodologías DevOps. Cuando no estoy lidiando con sistemas distribuidos, escribo sobre ingeniería de software y comparto lo que aprendo.',
  },
  skills: {
    title: 'Stack tecnológico',
  },
  experience: {
    title: 'Experiencia',
    current: 'Actual',
    jobs: [
      {
        role: 'Senior Backend Engineer',
        company: 'BBVA Technology',
        period: '2021 — Presente',
        description: 'Sistemas de pago cloud-native y microservicios. Java, Spring Boot, Kubernetes, AWS.',
      },
      {
        role: 'Backend Developer',
        company: 'Experiencia Anterior',
        period: '2017 — 2021',
        description: 'Desarrollo full-stack en múltiples proyectos. Node.js, TypeScript, PHP, SQL.',
      },
    ],
  },
  projects: {
    title: 'Proyectos',
    viewAll: 'Ver todos los proyectos',
    viewCode: 'Ver código',
    items: [
      {
        name: 'PetHome API',
        description: 'API RESTful para una plataforma de adopción de mascotas. Construida con TypeScript, Node.js y Express siguiendo principios de arquitectura limpia.',
        tags: ['TypeScript', 'Node.js', 'Express'],
        url: 'https://github.com/xaviibaez/petHome-api',
      },
      {
        name: 'PetHome Frontend',
        description: 'Aplicación cliente Vue.js para la plataforma de adopción de mascotas. UI responsive con arquitectura de componentes moderna.',
        tags: ['Vue.js', 'JavaScript'],
        url: 'https://github.com/xaviibaez/petHome-client',
      },
      {
        name: 'GoCD Docker Compose',
        description: 'Configuración Docker Compose para pipelines de CI/CD con GoCD. Infraestructura como código para entrega continua.',
        tags: ['Docker', 'GoCD', 'DevOps'],
        url: 'https://github.com/xaviibaez/gocd-docker-compose',
      },
    ],
  },
  blog: {
    title: 'Últimas entradas',
    readMore: 'Leer más',
    publishedOn: 'Publicado el',
    backToBlog: 'Volver al blog',
    allPosts: 'Todas las entradas',
    noPosts: 'Aún no hay entradas. ¡Próximamente!',
  },
  contact: {
    title: 'Hablemos',
    text: 'Abierto a conversaciones interesantes sobre sistemas distribuidos, arquitectura limpia y el arte de la ingeniería de software.',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    email: 'Email',
  },
  theme: {
    toggle: 'Cambiar tema',
    light: 'Claro',
    dark: 'Oscuro',
    blue: 'Océano',
    green: 'Bosque',
  },
  language: {
    toggle: 'Idioma',
    en: 'English',
    es: 'Español',
  },
  footer: {
    built: 'Hecho con Astro · Código abierto en',
    rights: 'Todos los derechos reservados.',
  },
};

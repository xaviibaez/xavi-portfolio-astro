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
    ctaCV: 'Descargar CV',
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
        role: 'Software Engineer',
        company: 'BBVA Technology',
        period: 'Oct 2023 — Presente',
        description: 'Sistema de pago online cloud-native en equipo cross-functional. Java, Spring Boot, Python, Kafka, ElasticSearch, AWS (ECS, EC2, Lambda). ATDD, DDD, CI/CD, microservicios, programación reactiva.',
      },
      {
        role: 'Software Engineer',
        company: 'Hiberus',
        period: 'Abr 2022 — Oct 2023',
        description: 'Múltiples REST APIs y proyectos cliente desde cero. TypeScript con Angular y ExpressJS, Java con Spring Boot, PHP con Laravel, Oracle, MySQL, Redis, AWS.',
      },
      {
        role: 'Software Engineer',
        company: 'Babel',
        period: 'Jul 2020 — Abr 2022',
        description: 'Web app interna y REST API para Linea Directa y Caser. Java con Spring Boot y Spring Batch, Oracle, MySQL, PL/SQL, Liferay.',
      },
      {
        role: 'Software Engineer',
        company: 'EY',
        period: 'Jul 2018 — Jul 2020',
        description: 'REST API para NH Hotels con Java, Spring Boot, C#, .NET, Jenkins, AWS. App de escritorio de almacén con Java, Swing y Oracle.',
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

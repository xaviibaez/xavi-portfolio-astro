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
    experience: '7+ años',
    bio: 'Ingeniero backend especializado en sistemas cloud-native y microservicios en BBVA Technology. Más de 7 años construyendo arquitecturas distribuidas con Java, TypeScript y mucho café. Apasionado del código limpio, extreme programming y DevOps.',
    cta: 'Ver mi trabajo',
    ctaBlog: 'Leer mi blog',
    ctaCV: 'Descargar CV',
  },
  about: {
    title: 'Sobre mí',
    text: 'Soy ingeniero backend especializado en sistemas cloud-native y arquitecturas de microservicios en BBVA Technology. Me apasiona el código limpio, las prácticas de extreme programming y las metodologías DevOps. Cuando no estoy lidiando con sistemas distribuidos, escribo sobre ingeniería de software y comparto lo que aprendo. Fuera del trabajo, disfruto de los videojuegos, el cine y explorando la historia y la filosofía.',
  },
  skills: {
    title: 'Stack tecnológico',
    backend: 'Backend',
    frontend: 'Frontend',
    databases: 'Bases de datos',
    infra: 'Cloud e Infra',
    testing: 'Testing',
    practices: 'Prácticas',
  },
  experience: {
    title: 'Experiencia',
    current: 'Actual',
    jobs: [
      {
company: 'BBVA Technology',
        period: 'Oct 2023 — Presente',
        description: 'Sistema de pago online cloud-native en equipo cross-functional. Java, Spring Boot, Python, Kafka, ElasticSearch, AWS (ECS, EC2, Lambda). ATDD, DDD, CI/CD, microservicios, programación reactiva.',
      },
      {
company: 'Hiberus',
        period: 'Abr 2022 — Oct 2023',
        description: 'Múltiples REST APIs y proyectos cliente desde cero. TypeScript con Angular y ExpressJS, Java con Spring Boot, PHP con Laravel, Oracle, MySQL, Redis, AWS.',
      },
      {
company: 'Babel',
        period: 'Jul 2020 — Abr 2022',
        description: 'Web app interna y REST API para Linea Directa y Caser. Java con Spring Boot y Spring Batch, Oracle, MySQL, PL/SQL, Liferay.',
      },
      {
company: 'EY',
        period: 'Jul 2018 — Jul 2020',
        description: 'REST API para NH Hotels con Java, Spring Boot, C#, .NET, Jenkins, AWS. App de escritorio de almacén con Java, Swing y Oracle.',
      },
    ],
  },
  projects: {
    title: 'Proyectos',
    viewAll: 'Ver todos los proyectos',
    items: [
      {
        name: 'PetHome API',
        description: 'API RESTful para una plataforma de adopción de mascotas. Construida con TypeScript, Node.js y Express siguiendo principios de arquitectura limpia.',
        tags: ['TypeScript', 'Node.js', 'Express'],
        image: '',
        links: [
          { label: 'Ver código', url: 'https://github.com/xaviibaez/petHome-api', icon: 'github' },
        ],
      },
      {
        name: 'PetHome Frontend',
        description: 'Aplicación cliente Vue.js para la plataforma de adopción de mascotas. UI responsive con arquitectura de componentes moderna.',
        tags: ['Vue.js', 'JavaScript'],
        image: '',
        links: [
          { label: 'Ver código', url: 'https://github.com/xaviibaez/petHome-client', icon: 'github' },
        ],
      },
      {
        name: 'GoCD Docker Compose',
        description: 'Configuración Docker Compose para pipelines de CI/CD con GoCD. Infraestructura como código para entrega continua.',
        tags: ['Docker', 'GoCD', 'DevOps'],
        image: '',
        links: [
          { label: 'Ver código', url: 'https://github.com/xaviibaez/gocd-docker-compose', icon: 'github' },
        ],
      },
      {
        name: 'RZ Powerhouse',
        description: 'Landing page para un gimnasio de powerlifting en Sabadell. Diseño responsive con animaciones, integración e-commerce, datos estructurados SEO y contacto por WhatsApp.',
        tags: ['HTML', 'CSS', 'JavaScript', 'SEO'],
        image: 'https://www.rzpowerhouse.com/assets/images/openGraph.jpg',
        links: [
          { label: 'Visitar', url: 'https://www.rzpowerhouse.com', icon: 'external' },
        ],
      },
      {
        name: 'EGAF',
        description: 'Portal de formación para el Gobierno de Aragón — cliente y servidor. Desarrollo full-stack con Angular y Java Spring Boot sobre Oracle.',
        tags: ['TypeScript', 'Angular', 'Java', 'Spring Boot', 'Oracle', 'PL/SQL'],
        image: '/egaf.webp',
        links: [
          { label: 'Visitar', url: 'https://aplicaciones.aragon.es/egafintra/login', icon: 'external' },
        ],
      },
      {
        name: 'Method',
        description: 'API de geolocalización para seguimiento logístico avanzado. REST API con consultas geo sobre ElasticSearch e infraestructura en AWS.',
        tags: ['TypeScript', 'Angular', 'Express', 'MySQL', 'ElasticSearch', 'AWS'],
        image: '/method.webp',
        links: [
          { label: 'Visitar', url: 'https://method-logistics.com/', icon: 'external' },
        ],
      },
      {
        name: 'NH Hotels',
        description: 'Desarrollo de API REST en microservicios para NH Hotels Group. Servicios Java Spring Boot con C# .NET, pipelines Jenkins e infraestructura AWS.',
        tags: ['Java', 'Spring Boot', 'C#', '.NET', 'Jenkins', 'AWS'],
        image: '/nh.webp',
        links: [
          { label: 'Visitar', url: 'https://www.nh-hotels.com/en', icon: 'external' },
        ],
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
    subtitle: 'Reflexiones sobre sistemas distribuidos, arquitectura limpia e ingeniería de software.',
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
    ca: 'Català',
  },
  footer: {
    built: 'Hecho con Astro · Código abierto en',
    rights: 'Todos los derechos reservados.',
  },
};

import type { Translations } from './en';

export const ca: Translations = {
  nav: {
    home: 'Inici',
    blog: 'Blog',
    projects: 'Projectes',
    contact: 'Contacte',
  },
  hero: {
    greeting: 'Hola, soc',
    name: 'Xavi Ibáñez',
    role: 'Senior Backend Engineer',
    company: 'BBVA Technology',
    location: 'Barcelona, Espanya',
    experience: '7+ anys',
    bio: 'Enginyer backend especialitzat en sistemes cloud-native i microserveis a BBVA Technology. Més de 7 anys construint arquitectures distribuïdes amb Java, TypeScript i molt de cafè. Apassionat del codi net, extreme programming i DevOps.',
    cta: 'Veure el meu treball',
    ctaBlog: 'Llegir el blog',
    ctaCV: 'Descarregar CV',
  },
  about: {
    title: 'Sobre mi',
    text: 'Soc un enginyer backend especialitzat en sistemes cloud-native i arquitectures de microserveis a BBVA Technology. M\'apassiona el codi net, les pràctiques d\'extreme programming i les metodologies DevOps. Quan no estic lluitant amb sistemes distribuïts, escric sobre enginyeria de programari i comparteixo el que aprenc. Fora de la feina, gaudeixo dels videojocs, el cinema i explorant la història i la filosofia.',
  },
  skills: {
    title: 'Stack tecnològic',
    backend: 'Backend',
    frontend: 'Frontend',
    databases: 'Bases de dades',
    infra: 'Cloud i Infra',
    testing: 'Testing',
    practices: 'Pràctiques',
  },
  experience: {
    title: 'Experiència',
    current: 'Actual',
    jobs: [
      {
company: 'BBVA Technology',
        period: 'Oct 2023 — Ara',
        description: 'Sistema de pagament online cloud-native en un equip cross-functional. Java, Spring Boot, Python, Kafka, ElasticSearch, AWS (ECS, EC2, Lambda). ATDD, DDD, CI/CD, microserveis, programació reactiva.',
      },
      {
company: 'Hiberus',
        period: 'Abr 2022 — Oct 2023',
        description: 'Múltiples REST APIs i projectes client des de zero. TypeScript amb Angular i ExpressJS, Java amb Spring Boot, PHP amb Laravel, Oracle, MySQL, Redis, AWS.',
      },
      {
company: 'Babel',
        period: 'Jul 2020 — Abr 2022',
        description: 'App web interna i REST API per a Linea Directa i Caser. Java amb Spring Boot i Spring Batch, Oracle, MySQL, PL/SQL, Liferay.',
      },
      {
company: 'EY',
        period: 'Jul 2018 — Jul 2020',
        description: 'REST API per a NH Hotels amb Java, Spring Boot, C#, .NET, Jenkins, AWS. App d\'escriptori d\'emmagatzematge amb Java, Swing i Oracle.',
      },
    ],
  },
  projects: {
    title: 'Projectes',
    viewAll: 'Veure tots els projectes',
    subtitle: 'Projectes de codi obert i treball personal.',
    portfolioDescription: 'Aquest portfolio. Construït amb Astro, Tailwind CSS, bento grid, i18n (CA/ES/EN) i selector de temes de color.',
    items: [
      {
        name: 'PetHome API',
        description: 'API RESTful per a una plataforma d\'adopció de mascotes. Construïda amb TypeScript, Node.js i Express seguint principis d\'arquitectura neta.',
        tags: ['TypeScript', 'Node.js', 'Express'],
        image: '',
        links: [
          { label: 'Veure codi', url: 'https://github.com/xaviibaez/petHome-api', icon: 'github' },
        ],
      },
      {
        name: 'PetHome Frontend',
        description: 'Aplicació client Vue.js per a la plataforma d\'adopció de mascotes. UI responsive amb arquitectura de components moderna.',
        tags: ['Vue.js', 'JavaScript'],
        image: '',
        links: [
          { label: 'Veure codi', url: 'https://github.com/xaviibaez/petHome-client', icon: 'github' },
        ],
      },
      {
        name: 'GoCD Docker Compose',
        description: 'Configuració Docker Compose per a pipelines de CI/CD amb GoCD. Infraestructura com a codi per a lliurament continu.',
        tags: ['Docker', 'GoCD', 'DevOps'],
        image: '',
        links: [
          { label: 'Veure codi', url: 'https://github.com/xaviibaez/gocd-docker-compose', icon: 'github' },
        ],
      },
      {
        name: 'RZ Powerhouse',
        description: 'Landing page per a un gimnàs de powerlifting a Sabadell. Disseny responsive amb animacions, integració e-commerce, dades estructurades SEO i contacte per WhatsApp.',
        tags: ['HTML', 'CSS', 'JavaScript', 'SEO'],
        image: 'https://www.rzpowerhouse.com/assets/images/openGraph.jpg',
        links: [
          { label: 'Visitar', url: 'https://www.rzpowerhouse.com', icon: 'external' },
        ],
      },
      {
        name: 'EGAF',
        description: 'Portal de formació per al Govern d\'Aragó — client i servidor. Desenvolupament full-stack amb Angular i Java Spring Boot sobre Oracle.',
        tags: ['TypeScript', 'Angular', 'Java', 'Spring Boot', 'Oracle', 'PL/SQL'],
        image: '/egaf.webp',
        links: [
          { label: 'Visitar', url: 'https://aplicaciones.aragon.es/egafintra/login', icon: 'external' },
        ],
      },
      {
        name: 'Method',
        description: 'API de geolocalització per a seguiment logístic avançat. REST API amb consultes geo sobre ElasticSearch i infraestructura a AWS.',
        tags: ['TypeScript', 'Angular', 'Express', 'MySQL', 'ElasticSearch', 'AWS'],
        image: '/method.webp',
        links: [
          { label: 'Visitar', url: 'https://method-logistics.com/', icon: 'external' },
        ],
      },
      {
        name: 'NH Hotels',
        description: 'Desenvolupament d\'API REST en microserveis per a NH Hotels Group. Serveis Java Spring Boot amb C# .NET, pipelines Jenkins i infraestructura AWS.',
        tags: ['Java', 'Spring Boot', 'C#', '.NET', 'Jenkins', 'AWS'],
        image: '/nh.webp',
        links: [
          { label: 'Visitar', url: 'https://www.nh-hotels.com/en', icon: 'external' },
        ],
      },
    ],
  },
  blog: {
    title: 'Últimes entrades',
    readMore: 'Llegir més',
    publishedOn: 'Publicat el',
    backToBlog: 'Tornar al blog',
    allPosts: 'Totes les entrades',
    noPosts: 'Encara no hi ha entrades. Aviat!',
    subtitle: 'Reflexions sobre sistemes distribuïts, arquitectura neta i enginyeria de programari.',
  },
  contact: {
    title: 'Parlem',
    text: 'Obert a converses interessants sobre sistemes distribuïts, arquitectura neta i l\'art de l\'enginyeria de programari.',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    email: 'Email',
  },
  theme: {
    toggle: 'Canviar tema',
    light: 'Clar',
    dark: 'Fosc',
    blue: 'Oceà',
    green: 'Bosc',
  },
  language: {
    toggle: 'Idioma',
    en: 'English',
    es: 'Español',
    ca: 'Català',
  },
  footer: {
    built: 'Fet amb Astro · Codi obert a',
    rights: 'Tots els drets reservats.',
  },
};

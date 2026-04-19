export const en = {
  nav: {
    home: 'Home',
    blog: 'Blog',
    projects: 'Projects',
    contact: 'Contact',
  },
  hero: {
    greeting: 'Hi, I\'m',
    name: 'Xavi Ibáñez',
    role: 'Senior Backend Engineer',
    company: 'BBVA Technology',
    location: 'Barcelona, Spain',
    experience: '7+ years',
    bio: 'Backend engineer specializing in cloud-native systems and microservices at BBVA Technology. 7+ years building distributed architectures with Java, TypeScript, and a lot of coffee. Passionate about clean code, extreme programming, and DevOps.',
    cta: 'View my work',
    ctaBlog: 'Read my blog',
    ctaCV: 'Download CV',
  },
  about: {
    title: 'About me',
    text: 'I\'m a backend engineer specializing in cloud-native systems and microservices architecture at BBVA Technology. I\'m passionate about clean code, extreme programming practices, and DevOps methodologies. When I\'m not wrangling distributed systems, I\'m writing about software engineering and sharing what I learn.',
  },
  skills: {
    title: 'Tech stack',
    backend: 'Backend',
    frontend: 'Frontend',
    databases: 'Databases',
    infra: 'Cloud & Infra',
    testing: 'Testing',
    practices: 'Practices',
  },
  experience: {
    title: 'Experience',
    current: 'Current',
    jobs: [
      {
company: 'BBVA Technology',
        period: 'Oct 2023 — Present',
        description: 'Cloud-native online payment system in a cross-functional team. Java, Spring Boot, Python, Kafka, ElasticSearch, AWS (ECS, EC2, Lambda). ATDD, DDD, CI/CD, microservices, reactive programming.',
      },
      {
company: 'Hiberus',
        period: 'Apr 2022 — Oct 2023',
        description: 'Multiple REST APIs and client-side projects from scratch. TypeScript with Angular and ExpressJS, Java with Spring Boot, PHP with Laravel, Oracle, MySQL, Redis, AWS.',
      },
      {
company: 'Babel',
        period: 'Jul 2020 — Apr 2022',
        description: 'Internal web app and REST API for Linea Directa and Caser. Java with Spring Boot and Spring Batch, Oracle, MySQL, PL/SQL, Liferay.',
      },
      {
company: 'EY',
        period: 'Jul 2018 — Jul 2020',
        description: 'REST API for NH Hotels using Java, Spring Boot, C#, .NET, Jenkins, AWS. Internal warehouse desktop app with Java, Swing and Oracle.',
      },
    ],
  },
  projects: {
    title: 'Projects',
    viewAll: 'View all projects',
    items: [
      {
        name: 'PetHome API',
        description: 'RESTful API for a pet adoption platform. Built with TypeScript, Node.js and Express following clean architecture principles.',
        tags: ['TypeScript', 'Node.js', 'Express'],
        image: '',
        links: [
          { label: 'View code', url: 'https://github.com/xaviibaez/petHome-api', icon: 'github' },
        ],
      },
      {
        name: 'PetHome Frontend',
        description: 'Vue.js client application for the pet adoption platform. Responsive UI with modern component architecture.',
        tags: ['Vue.js', 'JavaScript'],
        image: '',
        links: [
          { label: 'View code', url: 'https://github.com/xaviibaez/petHome-client', icon: 'github' },
        ],
      },
      {
        name: 'GoCD Docker Compose',
        description: 'Docker Compose setup for GoCD CI/CD pipelines. Infrastructure-as-code for continuous delivery.',
        tags: ['Docker', 'GoCD', 'DevOps'],
        image: '',
        links: [
          { label: 'View code', url: 'https://github.com/xaviibaez/gocd-docker-compose', icon: 'github' },
        ],
      },
      {
        name: 'RZ Powerhouse',
        description: 'Landing page for a powerlifting gym in Sabadell. Responsive design with animations, e-commerce integration, SEO structured data and WhatsApp contact.',
        tags: ['HTML', 'CSS', 'JavaScript', 'SEO'],
        image: 'https://www.rzpowerhouse.com/assets/images/openGraph.jpg',
        links: [
          { label: 'Visit site', url: 'https://www.rzpowerhouse.com', icon: 'external' },
        ],
      },
    ],
  },
  blog: {
    title: 'Latest posts',
    readMore: 'Read more',
    publishedOn: 'Published on',
    backToBlog: 'Back to blog',
    allPosts: 'All posts',
    noPosts: 'No posts yet. Stay tuned!',
  },
  contact: {
    title: 'Let\'s connect',
    text: 'Open to interesting conversations about distributed systems, clean architecture and the craft of software engineering.',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    email: 'Email',
  },
  theme: {
    toggle: 'Toggle theme',
    light: 'Light',
    dark: 'Dark',
    blue: 'Ocean',
    green: 'Forest',
  },
  language: {
    toggle: 'Language',
    en: 'English',
    es: 'Español',
  },
  footer: {
    built: 'Built with Astro · Open source on',
    rights: 'All rights reserved.',
  },
} as const;

export type Translations = typeof en;

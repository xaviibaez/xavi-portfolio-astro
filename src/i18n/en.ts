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
    bio: 'Microservices nerd building cloud-native payment systems. 7+ years crafting distributed architectures with Java, TypeScript, and a lot of coffee.',
    cta: 'View my work',
    ctaBlog: 'Read my blog',
  },
  about: {
    title: 'About me',
    text: 'I\'m a backend engineer specializing in cloud-native systems and microservices architecture at BBVA Technology. I\'m passionate about clean code, extreme programming practices, and DevOps methodologies. When I\'m not wrangling distributed systems, I\'m writing about software engineering and sharing what I learn.',
  },
  skills: {
    title: 'Tech stack',
  },
  experience: {
    title: 'Experience',
    current: 'Current',
    jobs: [
      {
        role: 'Senior Backend Engineer',
        company: 'BBVA Technology',
        period: '2021 — Present',
        description: 'Cloud-native payment systems and microservices. Java, Spring Boot, Kubernetes, AWS.',
      },
      {
        role: 'Backend Developer',
        company: 'Previous Experience',
        period: '2017 — 2021',
        description: 'Full-stack development across multiple projects. Node.js, TypeScript, PHP, SQL.',
      },
    ],
  },
  projects: {
    title: 'Projects',
    viewAll: 'View all projects',
    viewCode: 'View code',
    items: [
      {
        name: 'PetHome API',
        description: 'RESTful API for a pet adoption platform. Built with TypeScript, Node.js and Express following clean architecture principles.',
        tags: ['TypeScript', 'Node.js', 'Express'],
        url: 'https://github.com/xaviibaez/petHome-api',
      },
      {
        name: 'PetHome Frontend',
        description: 'Vue.js client application for the pet adoption platform. Responsive UI with modern component architecture.',
        tags: ['Vue.js', 'JavaScript'],
        url: 'https://github.com/xaviibaez/petHome-client',
      },
      {
        name: 'GoCD Docker Compose',
        description: 'Docker Compose setup for GoCD CI/CD pipelines. Infrastructure-as-code for continuous delivery.',
        tags: ['Docker', 'GoCD', 'DevOps'],
        url: 'https://github.com/xaviibaez/gocd-docker-compose',
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

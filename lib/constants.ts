import { Project, Skill, TimelineEntry, Stat } from '@/types'


export const PROJECTS: Project[] = [
  {
    id: 'pancaindo',
    designSpecs: ['B2B Portal UI/UX', 'CMS Interface Design', 'Figma'],
    engineeringSpecs: ['Next.js 15 & React 19', 'TypeScript & Tailwind v4', 'Cloudflare D1, R2, KV', 'OpenNext Edge Deployment', 'Resend & Svix Webhooks', 'Zod Validation', 'RBAC & Security'],
    title: 'PANCAINDO',
    category: 'FULL STACK',
    role: 'Intern — Full Stack Developer',
    period: 'Feb — Sep 2026',
    description: 'Production ecosystem for Indonesia\'s leading wine and spirits distributor. Public portal and internal CMS with RBAC and analytics.',
    status: 'Production',
    visibility: 'Private',
    systems: [
      'Public Portal',
      'Internal CMS',
      'RBAC',
      'Newsletter',
      'Analytics',
      'Edge Infrastructure'
    ],
    built: [
      { title: 'Public B2B Product Portal', description: '200+ SKU catalog, multi-criteria filtering, tasting notes, brand profiles, nationwide venue directory, event calendar' },
      { title: 'Internal CMS', description: 'CRUD for products, brands, events, venues, distributors, publications and newsletters' },
      { title: 'Role-Based Access Control', description: 'Super Admin, Admin, Staff. Granular permissions, HTTP-only sessions, CSRF protection, SQLite-backed brute-force prevention' },
      { title: 'Newsletter System', description: 'Tiptap HTML email builder, Resend batch sending, delivery tracking, Svix webhook verification' },
      { title: 'First-Party Analytics', description: 'Pageviews, unique visitors, device type, browser, OS, Geo-IP' },
      { title: 'Infrastructure', description: 'Cloudflare Pages, D1, R2, KV, OpenNext, automated cache purge' }
    ],
    technologies: [
      'Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Cloudflare D1', 'Cloudflare R2', 'Cloudflare KV', 'OpenNext', 'Resend', 'Svix', 'Zod', 'Figma'
    ],
    goal: 'Build a modern and scalable platform to streamline operations, improve distribution efficiency, and support business growth in the beverage industry.',
    image: '/projects/pni-portal.webp',
    url: 'https://pancaindo.com',
  },
  {
    id: 'gym-management-system',
    designSpecs: ['End-to-end UI/UX Design', 'High-fidelity Prototypes', 'User Flows', 'Responsive UI', 'Figma'],
    engineeringSpecs: ['React TS', 'Node.js Backend', 'Prisma ORM', 'SQLite', 'REST API', 'Database Schema'],
    title: 'GYM MANAGEMENT SYSTEM',
    category: 'FULL STACK',
    role: 'Freelance — Full Stack Developer',
    period: 'Sep 2025 — Feb 2026',
    description: 'A comprehensive production B2B commerce ecosystem developed for Indonesia\'s leading wine and spirits distributor. The system features a public-facing product portal with an advanced 200+ SKU catalog and multi-criteria filtering, paired with an internal CMS governed by Role-Based Access Control (RBAC). It also integrates a custom newsletter builder and first-party analytics, all deployed securely on edge infrastructure using Cloudflare and OpenNext.',
    status: 'Completed',
    visibility: 'Private',
    systems: [
      'UI/UX Design',
      'React Frontend',
      'Node.js Backend',
      'REST API',
      'Database Schema'
    ],
    built: [
      { title: 'UI/UX Design', description: 'End-to-end design with high-fidelity prototypes' },
      { title: 'Frontend Interface', description: 'Responsive React interface' },
      { title: 'Backend API', description: 'Node.js backend with REST API and Prisma ORM schema' }
    ],
    technologies: [
      'React TS', 'TailwindCSS', 'Node.js', 'Prisma ORM', 'SQLite', 'Figma'
    ],
    goal: 'Digitize gym operations and member management for a local fitness center.',
    image: '/projects/gym-logo.png',
    designImage: '/projects/gym-design.png'
  },
  {
    id: 'beema',
    designSpecs: ['Multi-role UI/UX', 'User Flows', 'Interaction Patterns', 'High-fidelity Prototypes', 'Figma'],
    engineeringSpecs: ['Laravel 12', 'MySQL', 'Blade Templates', 'Vite', 'Responsive Implementation'],
    title: 'BEEMA',
    category: 'FULL STACK',
    role: 'UI/UX Developer',
    description: 'A multi-role academic portal designed to facilitate thesis management across Admin, Lecturer, and Student workflows. Developed using Laravel 12 and Vite, the project involved creating high-fidelity Figma prototypes tailored for distinct interaction patterns, resulting in a highly responsive and unified Blade-based frontend experience.',
    status: 'Completed',
    visibility: 'Public',
    goal: "Design and implement a responsive academic thesis management system.",
    outcome: [
      "Created high-fidelity prototypes for Admin, Lecturer, and Student roles.",
      "Implemented responsive frontend using Laravel Blade."
    ],
    systems: [
      'User Flows',
      'Interaction Patterns',
      'Responsive Implementation'
    ],
    built: [
      { title: 'Multi-Role UX', description: 'Admin, Lecturer, and Student workflows with high-fidelity prototypes' },
      { title: 'Frontend Implementation', description: 'Responsive Laravel Blade implementation' }
    ],
    technologies: [
      'Laravel 12', 'MySQL', 'Blade Templates', 'Vite', 'Figma'
    ],
    image: '/projects/beema-logo.png',
    designImage: '/projects/beema-design.png',
    github: 'https://github.com/Rnvz'
  },
  {
    id: 'supreme-court-judgement-classification',
    designSpecs: ['Streamlit UI', 'Data Visualization'],
    engineeringSpecs: ['Python', 'Scikit-learn', 'Pandas', 'Optuna Hyperparameter Tuning', 'NLP Classification Pipeline', 'Gaussian Naive Bayes', 'Real-time Prediction'],
    title: 'SUPREME COURT JUDGEMENT CLASSIFICATION',
    category: 'AI ENGINEERING',
    role: 'AI Engineer',
    description: 'An end-to-end Natural Language Processing (NLP) pipeline that classifies Supreme Court judgement outcomes based on case facts. Built with Python and Scikit-learn, the Gaussian Naive Bayes model was optimized via Optuna for high accuracy, and deployed as a real-time, interactive data visualization tool using Streamlit.',
    status: 'Completed',
    visibility: 'Public',
    goal: "Apply machine learning to predict court judgement outcomes based on case facts.",
    outcome: [
      "Trained a Gaussian Naive Bayes model with high accuracy.",
      "Deployed a live interactive Streamlit application."
    ],
    systems: [
      'NLP Pipeline',
      'Classification Model',
      'Interactive UI'
    ],
    built: [
      { title: 'Classification Pipeline', description: 'NLP classification pipeline with Gaussian Naive Bayes and Optuna hyperparameter tuning' },
      { title: 'Interactive Deployment', description: 'Streamlit deployment with real-time prediction from user-provided case facts' }
    ],
    technologies: [
      'Python', 'Scikit-learn', 'Pandas', 'Optuna', 'Streamlit'
    ],
    image: '/projects/supreme-court.webp',
    github: 'https://github.com/Rnvz'
  },
  {
    id: 'serenity',
    designSpecs: ['Empathy-driven UX', 'Accessibility-focused Design', 'Calming Visual Direction', 'Figma'],
    engineeringSpecs: ['React TS', 'TailwindCSS', 'Firebase Auth / Firestore', 'Midtrans API', 'Component-based Frontend'],
    title: 'SERENITY',
    category: 'UI/UX',
    role: 'UI/UX & Frontend Developer',
    description: 'An empathy-driven mental health platform with a strong focus on accessibility and calming visual language. Designed meticulously in Figma and implemented in React TS, it seamlessly integrates Firebase authentication and the Midtrans API to handle secure, transparent transactions while maintaining a trustworthy user experience.',
    status: 'Completed',
    visibility: 'Public',
    goal: "Create a mental health platform focused on empathy, accessibility, and secure transactions.",
    outcome: [
      "Designed an accessible and calming UI.",
      "Integrated secure Firebase Auth and Midtrans payment."
    ],
    systems: [
      'Accessible Design',
      'Component Frontend',
      'Auth & Payments'
    ],
    built: [
      { title: 'Empathy-Driven UX', description: 'Accessibility-focused design with a calming visual direction' },
      { title: 'Frontend Development', description: 'Responsive component-based frontend integrated with Firebase authentication and Midtrans payment' }
    ],
    technologies: [
      'Figma', 'React TS', 'TailwindCSS', 'Firebase Auth / Firestore', 'Midtrans API'
    ],
    image: '/projects/serenity.webp',
    github: 'https://github.com/Rnvz'
  },
  {
    id: 'nofake',
    designSpecs: ['Credibility-focused UI/UX', 'Information Hierarchy', 'Readability', 'Misinformation-oriented Design', 'Figma'],
    engineeringSpecs: ['React', 'TailwindCSS', 'Firebase Hosting', 'Firebase Auth', 'Scalable Frontend'],
    title: 'NOFAKE',
    category: 'UI/UX',
    role: 'UI/UX & Frontend Developer',
    description: 'A digital platform engineered specifically to combat online misinformation through credibility-focused UI/UX design. It establishes a strong information hierarchy and readability standards, powered by a scalable React and TailwindCSS architecture hosted on Firebase, ensuring trustworthy and high-performance content delivery.',
    status: 'Completed',
    visibility: 'Public',
    goal: "Design a digital platform to combat misinformation with a focus on credibility and information hierarchy.",
    outcome: [
      "Developed a scalable React frontend.",
      "Established a trustworthy visual language."
    ],
    systems: [
      'Information Hierarchy',
      'Misinformation Product Design'
    ],
    built: [
      { title: 'Credibility-Focused UX', description: 'Information hierarchy and readability for misinformation-oriented product design' },
      { title: 'Frontend Implementation', description: 'Scalable React frontend with TailwindCSS and Firebase Hosting' }
    ],
    technologies: [
      'React', 'TailwindCSS', 'Firebase Hosting', 'Firebase Auth', 'Figma'
    ],
    image: '/projects/nofake-logo.png',
    designImage: '/projects/nofake-design.png',
    github: 'https://github.com/Rnvz'
  },
  {
    id: 'peluangnusantara',
    designSpecs: ['Accessible UI/UX', 'Trust-building Design', 'Transparency & CTA Clarity', 'Figma'],
    engineeringSpecs: ['HTML/CSS/JS', 'Semantic HTML', 'Responsive Frontend', 'Cross-browser Consistency', 'Git'],
    title: 'PELUANGNUSANTARA',
    category: 'UI/UX',
    role: 'UI/UX & Frontend Developer',
    description: 'A transparent and accessible crowdfunding platform designed to build trust through clear Calls to Action (CTA) and semantic frontend architecture. Built with HTML, CSS, and JavaScript, the interface prioritizes cross-browser consistency and inclusive design patterns to maximize engagement and digital fundraising efforts.',
    status: 'Completed',
    visibility: 'Public',
    goal: "Build a trustworthy crowdfunding platform using semantic HTML and CSS.",
    outcome: [
      "Achieved cross-browser consistency.",
      "Designed clear calls to action to drive engagement."
    ],
    systems: [
      'Trust-Building Design',
      'Semantic Frontend'
    ],
    built: [
      { title: 'Accessible UX', description: 'Trust-building design with transparency and CTA clarity' },
      { title: 'Frontend Implementation', description: 'Semantic HTML and responsive frontend with cross-browser consistency' }
    ],
    technologies: [
      'Figma', 'HTML/CSS/JS', 'Git'
    ],
    image: '/projects/peluang-logo.png',
    designImage: '/projects/peluang-design.png',
    github: 'https://github.com/Rnvz'
  }
]
export const SKILLS: Skill[] = [
  { name: 'HTML5',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'CSS3',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'Python',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'C',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
  { name: 'Next.js',    icon: 'https://cdn.simpleicons.org/nextdotjs/white' },
  { name: 'React',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Laravel',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' },
  { name: 'Tailwind',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Node.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'MySQL',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg' },

  { name: 'SQLite',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg' },
  { name: 'Anaconda',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/anaconda/anaconda-original.svg' },
  { name: 'Matplotlib', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg' },
  { name: 'Pandas',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg' },
  { name: 'NumPy',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg' },
  { name: 'Scikit-learn',icon: 'https://cdn.simpleicons.org/scikitlearn' },
  { name: 'BioPython',  icon: '/icons/biopython.svg' },
  { name: 'Linux',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
  { name: 'Fedora',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fedora/fedora-original.svg' },
  { name: 'Cisco',      icon: 'https://cdn.simpleicons.org/cisco/white' },
  { name: 'Git',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { name: 'GitHub',     icon: 'https://cdn.simpleicons.org/github/white' },
  { name: 'Jira',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg' },
  { name: 'Figma',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
  { name: 'Cloudflare', icon: 'https://cdn.simpleicons.org/cloudflare' },
  { name: 'Firebase',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg' },
]

export const CERTIFICATIONS = [
  {
    id: 'cert1',
    title: 'Alibaba Cloud Certified Associate - Cloud Engineer',
    issuer: 'Alibaba Cloud',
    year: '2024',
    image: '/cert-alibaba.jpg'
    },
  {
    id: 'cert2',
    title: 'Learning SOLID Programming Principles',
    issuer: 'DICODING',
    year: '2023',
    image: '/cert-solid.png'
    },
  {
    id: 'cert3',
    title: 'Basic AI Course',
    issuer: 'DICODING',
    year: '2023',
    image: '/cert-ai.png'
    },
]

export const STATS: Stat[] = [
  { value: '3+',  label: 'Years building' },
  { value: '10+', label: 'Projects shipped' },
  { value: '2',   label: 'Production systems' },
]

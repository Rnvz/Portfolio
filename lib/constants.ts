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
    description: "Production-oriented B2B digital ecosystem developed for a leading wine and spirits distributor in Indonesia, combining a public-facing product portal with internal operations, content management, role-based access control, newsletter infrastructure, first-party analytics, and edge-based infrastructure.",
    status: 'Production',
    visibility: 'Private',
    systems: [
      'Public B2B Product Portal',
      'Internal CMS',
      'Role-Based Access Control',
      'Newsletter System',
      'First-Party Analytics',
      'Edge Infrastructure'
    ],
    built: [
      { 
        title: 'Public B2B Product Portal', 
        description: 'I developed the customer-facing B2B product portal as the primary product discovery interface. The platform contains more than 200 SKUs and supports multi-criteria filtering across category, brand, country, bottle size, and tags. Product information is supplemented by tasting notes and brand profiles, while the broader ecosystem includes a nationwide venue directory and event calendar.',
        features: [
          '200+ SKU catalog',
          'Multi-criteria filtering',
          'Tasting notes & brand profiles',
          'Nationwide venue directory',
          'Event calendar'
        ]
      },
      { 
        title: 'Internal CMS', 
        description: 'The internal CMS dashboard allows administrators to manage products, brands, events, venues, distributors, publications, and newsletters. A key domain-specific feature is the dynamic product specification form, which adapts its fields based on the product category—for instance, requiring \'Vintage\' and \'Grape Variety\' for wines, or \'Cask Type\' and \'Age Statement\' for whiskies.',
        features: [
          'CRUD operations for core entities',
          'Dynamic product specification forms',
          'Category-adaptive fields'
        ]
      },
      { 
        title: 'Role-Based Access Control', 
        description: 'The platform enforces strict role-based access control across Super Admin, Admin, and Staff tiers. It secures the system using granular permissions per module, HTTP-only cookie sessions, CSRF protection, and SQLite-backed brute-force prevention.',
        features: [
          'Super Admin, Admin, and Staff roles',
          'Granular module permissions',
          'HTTP-only sessions & CSRF protection',
          'SQLite-backed brute-force prevention'
        ]
      },
      { 
        title: 'Newsletter System', 
        description: 'The integrated newsletter system enables mass broadcasting directly from the CMS. It utilizes a Tiptap HTML email builder for content creation and Resend for batch delivery. The system also displays recipient-level delivery statuses (sent, pending, bounced) via Svix webhook signature verification.',
        features: [
          'Tiptap HTML email builder',
          'Resend batch sending',
          'Recipient-level delivery status',
          'Svix webhook signature verification'
        ]
      },
      { 
        title: 'First-Party Analytics', 
        description: 'I implemented a self-hosted, first-party analytics pipeline to eliminate reliance on third-party trackers. It captures essential metrics such as pageviews, unique visitors, device type, browser, operating system, and Geo-IP data.',
        features: [
          'Self-hosted analytics',
          'No third-party trackers',
          'Pageviews & unique visitors',
          'Device, browser, OS, Geo-IP tracking'
        ]
      },
      { 
        title: 'Edge Infrastructure', 
        description: 'The entire ecosystem is deployed on edge infrastructure using Cloudflare Pages, with Cloudflare D1 for edge SQLite database, R2 for object storage, and KV for rate limiting. OpenNext handles the deployment runtime, and an automated cache purge is triggered across the Cloudflare Zone API whenever content is updated in the CMS.',
        features: [
          'Cloudflare Pages (Deployment)',
          'Cloudflare D1 (Edge SQLite)',
          'Cloudflare R2 (Object Storage)',
          'Cloudflare KV (Rate Limiting)',
          'OpenNext runtime integration',
          'Automated Zone API cache purge'
        ]
      }
    ],
    technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Cloudflare D1', 'Cloudflare R2', 'Cloudflare KV', 'OpenNext', 'Resend', 'Svix', 'Zod', 'Figma'],
    stack: {
      frontend: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS v4'],
      infrastructure: ['Cloudflare Pages', 'Cloudflare D1', 'Cloudflare R2', 'Cloudflare KV', 'OpenNext'],
      services: ['Resend', 'Svix'],
      design: ['Figma'],
      other: ['Zod (Validation)', 'Tiptap (Content)']
    },
    goal: "Build a scalable digital platform that supports product discovery for external users while providing internal teams with structured tools for content management, access control, communication, analytics, and operational workflows.",
    image: '/projects/pni-logo-new.png',
    bgColor: '#FDFFFF',
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
    description: "An end-to-end gym management system developed from product interface design through backend implementation, combining responsive application design, database architecture, and REST API development.",
    status: 'Completed',
    visibility: 'Private',
    systems: [
      'UI / UX DESIGN',
      'RESPONSIVE FRONTEND',
      'BACKEND',
      'DATABASE',
      'REST API'
    ],
    built: [
      {
        title: 'UI/UX DESIGN',
        description: 'I led the end-to-end UI/UX design process in Figma, translating client requirements into high-fidelity prototypes and establishing the foundation for a fully responsive interface.',
        features: [
          'End-to-end UI/UX design',
          'Client requirement translation',
          'High-fidelity prototypes',
          'Responsive interface design'
        ]
      },
      {
        title: 'FRONTEND',
        description: 'I implemented the frontend using React, TypeScript, and TailwindCSS. The focus was on a pixel-perfect translation from the initial Figma designs into a robust, responsive web interface.',
        features: [
          'React & TypeScript architecture',
          'TailwindCSS styling',
          'Responsive implementation',
          'Design-to-interface translation'
        ]
      },
      {
        title: 'BACKEND',
        description: 'I developed the server-side application using Node.js and integrated Prisma ORM to ensure type-safe and reliable backend operations.',
        features: [
          'Node.js application logic',
          'Prisma ORM integration',
          'Backend development'
        ]
      },
      {
        title: 'DATABASE & API',
        description: 'I designed the underlying database schema and exposed a REST API to facilitate a seamless client/server data flow between the React interface and the SQLite persistence layer.',
        features: [
          'Database schema design',
          'REST API development',
          'Client/server data flow'
        ]
      }
    ],
    technologies: [
      'React TS', 'TailwindCSS', 'Node.js', 'Prisma ORM', 'SQLite', 'Figma'
    ],
    stack: {
      frontend: ['React TS', 'TailwindCSS'],
      backend: ['Node.js', 'Prisma ORM', 'SQLite'],
      design: ['Figma']
    },
    goal: "Translate client requirements into a responsive digital management experience while establishing the backend and data architecture required to connect the application interface with persistent business data.",
    image: '/projects/gym-logo.png',
    bgColor: '#1E1E1E',
    designImage: '/projects/gym-design.png'
  },
  {
    id: 'beema',
    designSpecs: ['Multi-role UI/UX', 'User Flows', 'Interaction Patterns', 'High-fidelity Prototypes', 'Figma'],
    engineeringSpecs: ['Laravel 12', 'MySQL', 'Blade Templates', 'Vite', 'Responsive Implementation'],
    title: 'BEEMA',
    category: 'FULL STACK',
    role: 'UI/UX Developer',
    period: 'Mar 2024 — Jun 2024',
    description: "BeeMa is a multi-role consultation management portal designed around distinct workflows for Admin, Lecturer, and Student users. The project focused on creating clear user flows and interaction patterns, then translating those high-fidelity designs into a responsive web implementation.",
    status: 'Completed',
    visibility: 'Public',
    systems: [
      'ADMIN',
      'LECTURER',
      'STUDENT',
      'USER FLOWS',
      'INTERACTION PATTERNS',
      'RESPONSIVE INTERFACE'
    ],
    built: [
      {
        title: 'MULTI-ROLE EXPERIENCE',
        description: 'I designed tailored digital experiences to accommodate the distinct needs of Admins, Lecturers, and Students, ensuring each role had dedicated tools and appropriate data access.',
        features: [
          'Admin control dashboards',
          'Lecturer management portals',
          'Student consultation access'
        ]
      },
      {
        title: 'USER FLOWS',
        description: 'I mapped out comprehensive user flows and interaction patterns to guarantee a seamless, role-specific experience throughout the consultation lifecycle.',
        features: [
          'End-to-end user flows',
          'Role-specific interaction patterns',
          'Optimized consultation lifecycle'
        ]
      },
      {
        title: 'HIGH-FIDELITY DESIGN',
        description: 'I established the visual and interaction direction by creating high-fidelity prototypes in Figma, serving as the definitive blueprint for frontend development.',
        features: [
          'Figma interface design',
          'High-fidelity prototypes',
          'Visual & interaction direction'
        ]
      },
      {
        title: 'FRONTEND IMPLEMENTATION',
        description: 'I led the design-to-code implementation, translating the Figma prototypes into responsive Laravel Blade templates while maintaining strict visual consistency across devices.',
        features: [
          'Laravel Blade templates',
          'Responsive visual consistency',
          'Pixel-perfect design-to-code'
        ]
      }
    ],
    technologies: [
      'Laravel 12', 'MySQL', 'Blade Templates', 'Vite', 'Figma'
    ],
    stack: {
      frontend: ['Blade Templates', 'Vite'],
      backend: ['Laravel 12', 'MySQL'],
      design: ['Figma']
    },
    goal: "Create a consistent consultation experience while recognizing that Admin, Lecturer, and Student users have different responsibilities and therefore require different interaction flows.",
    image: '/projects/beema-logo-new.png',
    bgColor: '#0E0E0E',
    designImage: '/projects/beema-design.png'
  },
  {
    id: 'supreme-court-judgement-classification',
    designSpecs: ['Streamlit UI', 'Data Visualization'],
    engineeringSpecs: ['Python', 'Scikit-learn', 'Pandas', 'Optuna Hyperparameter Tuning', 'NLP Classification Pipeline', 'Gaussian Naive Bayes', 'Real-time Prediction'],
    title: 'SUPREME COURT JUDGEMENT CLASSIFICATION',
    category: 'AI / ML',
    role: 'AI Engineer',
    period: 'Oct — Dec 2023',
    description: "An NLP-based machine-learning project focused on classifying court judgement outcomes from user-provided case facts. The project combines data processing, model development, hyperparameter optimization, and interactive deployment through a web application.",
    status: 'Completed',
    visibility: 'Public',
    systems: [
      'DATA PROCESSING',
      'NLP PIPELINE',
      'CLASSIFICATION',
      'MODEL OPTIMIZATION',
      'INTERACTIVE DEPLOYMENT'
    ],
    built: [
      {
        title: 'CLASSIFICATION PIPELINE',
        description: 'I built an NLP classification pipeline utilizing Gaussian Naive Bayes to predict and classify supreme court judgement outcomes based on specific case facts.',
        features: [
          'NLP classification pipeline',
          'Gaussian Naive Bayes model',
          'Outcome prediction'
        ]
      },
      {
        title: 'MODEL OPTIMIZATION',
        description: 'I improved the model\'s performance and reliability by systematically tuning hyperparameters using Optuna.',
        features: [
          'Optuna integration',
          'Hyperparameter tuning',
          'Performance optimization'
        ]
      },
      {
        title: 'DATA PROCESSING',
        description: 'I managed the initial data preparation and processing workflows utilizing Pandas to ensure clean, structured input for the NLP pipeline.',
        features: [
          'Pandas data processing',
          'Data preparation workflow',
          'Structured model input'
        ]
      },
      {
        title: 'INTERACTIVE APPLICATION',
        description: 'I deployed the classification model into an interactive Streamlit application, allowing users to input case facts and instantly receive real-time predictions.',
        features: [
          'Streamlit web application',
          'Interactive user input',
          'Real-time model prediction'
        ]
      }
    ],
    technologies: [
      'Python', 'Scikit-learn', 'Pandas', 'Optuna', 'Streamlit'
    ],
    stack: {
      frontend: ['Streamlit'],
      backend: ['Python', 'Pandas', 'Scikit-learn', 'Optuna']
    },
    goal: "Convert a machine-learning classification pipeline into an accessible interactive application where users can provide case facts and receive a model-generated prediction.",
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
    
    description: "Serenity is a mental health consultation platform centered around an empathy-driven digital experience. The project combines accessibility-focused UI/UX design with a responsive component-based frontend and application functionality for authentication and payments.",
    status: 'Completed',
    visibility: 'Public',
    systems: [
      'EMPATHY-DRIVEN UX',
      'ACCESSIBILITY',
      'RESPONSIVE FRONTEND',
      'AUTHENTICATION',
      'PAYMENTS'
    ],
    built: [
      {
        title: 'EMPATHY-DRIVEN UI/UX',
        description: 'I designed the interface in Figma with a focus on mental health user context, utilizing calming aesthetics and strict accessibility principles to ensure an approachable experience.',
        features: [
          'Figma interface design',
          'Mental health user context',
          'Calming visual aesthetics',
          'Accessibility-first approach'
        ]
      },
      {
        title: 'FRONTEND SYSTEM',
        description: 'I engineered a pixel-perfect, responsive frontend using React and TailwindCSS, structured around a scalable component-based architecture.',
        features: [
          'Pixel-perfect implementation',
          'Component-based architecture',
          'React & TailwindCSS',
          'Responsive frontend'
        ]
      },
      {
        title: 'AUTHENTICATION',
        description: 'I implemented secure user access by integrating Firebase Authentication to manage user identities and sessions.',
        features: [
          'Firebase Authentication integration',
          'Secure user identity management'
        ]
      },
      {
        title: 'PAYMENT',
        description: 'I built the transaction layer by integrating the Midtrans API to handle secure consultation payments.',
        features: [
          'Midtrans API integration',
          'Secure payment processing'
        ]
      }
    ],
    technologies: [
      'Figma', 'React TS', 'TailwindCSS', 'Firebase Auth', 'Firebase Firestore', 'Midtrans API'
    ],
    stack: {
      frontend: ['React TS', 'TailwindCSS'],
      backend: ['Firebase Firestore'],
      services: ['Firebase Auth', 'Midtrans API'],
      design: ['Figma']
    },
    goal: "Create a calmer and more approachable consultation experience by combining thoughtful visual design, accessible interaction patterns, responsive implementation, authentication, and payment functionality.",
    image: '/projects/serenity-logo-new.png',
    bgColor: '#1A1916',
    github: 'https://github.com/Rnvz'
  },
  {
    id: 'nofake',
    designSpecs: ['Credibility-focused UI/UX', 'Information Hierarchy', 'Readability', 'Misinformation-oriented Design', 'Figma'],
    engineeringSpecs: ['React', 'TailwindCSS', 'Firebase Hosting', 'Firebase Auth', 'Scalable Frontend'],
    title: 'NOFAKE',
    category: 'UI/UX',
    role: 'UI/UX & Frontend Developer',
    description: "NoFake is a credibility-focused platform designed around the challenge of presenting misinformation-related content in a way that is easier to understand and navigate. The project emphasizes information hierarchy, readability, UI/UX clarity, and frontend performance.",
    status: 'Completed',
    visibility: 'Public',
    systems: [
      'CREDIBILITY-FOCUSED UX',
      'INFORMATION HIERARCHY',
      'RESPONSIVE FRONTEND',
      'FAST-LOADING ARCHITECTURE'
    ],
    built: [
      {
        title: 'CREDIBILITY-FOCUSED DESIGN',
        description: 'I led the visual design in Figma, establishing a trustworthy and credible aesthetic that prioritizes readability and clear information hierarchy to counter misinformation effectively.',
        features: [
          'Figma interface design',
          'Credibility-focused aesthetics',
          'Readability optimization'
        ]
      },
      {
        title: 'INFORMATION ARCHITECTURE',
        description: 'I structured the platform\'s content to ensure users can naturally navigate complex misinformation topics, focusing heavily on logical content grouping and importance hierarchy.',
        features: [
          'Content structuring',
          'Logical importance hierarchy',
          'Optimized reading experience'
        ]
      },
      {
        title: 'FRONTEND ARCHITECTURE',
        description: 'I built a scalable and fast-loading frontend architecture utilizing React and TailwindCSS, prioritizing performance to maintain user trust and engagement.',
        features: [
          'React frontend architecture',
          'TailwindCSS styling',
          'Fast-loading focus'
        ]
      },
      {
        title: 'PLATFORM',
        description: 'I deployed the platform using Firebase Hosting for rapid content delivery globally, and integrated Firebase Authentication for secure user management.',
        features: [
          'Firebase Hosting deployment',
          'Firebase Authentication integration'
        ]
      }
    ],
    technologies: [
      'React', 'TailwindCSS', 'Firebase Hosting', 'Firebase Auth', 'Figma'
    ],
    stack: {
      frontend: ['React', 'TailwindCSS'],
      infrastructure: ['Firebase Hosting'],
      services: ['Firebase Auth'],
      design: ['Figma']
    },
    goal: "Create a clearer and more credibility-oriented information experience that helps users navigate misinformation through readable interfaces and structured content presentation.",
    image: '/projects/nofake-logo-new.png',
    bgColor: '#FDFDFF',
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
    description: "PeluangNusantara is a crowdfunding platform concept focused on trust, accessibility, transparency, and clear calls-to-action. The project combines UX design with a semantic frontend implementation designed for responsive and consistent behaviour across browsers.",
    status: 'Completed',
    visibility: 'Public',
    systems: [
      'TRUST-BUILDING UX',
      'INFORMATION HIERARCHY',
      'CLEAR CTA',
      'SEMANTIC FRONTEND',
      'RESPONSIVE DESIGN',
      'CROSS-BROWSER CONSISTENCY'
    ],
    built: [
      {
        title: 'TRUST-BUILDING UI/UX',
        description: 'I designed the platform to prioritize trust and transparency, utilizing accessible design principles to assure users during the crowdfunding process.',
        features: [
          'Accessible design principles',
          'Trust-oriented interface',
          'Process transparency'
        ]
      },
      {
        title: 'INFORMATION CLARITY',
        description: 'I structured the campaign information hierarchy to ensure potential backers could easily digest and understand the goals and impact of each project.',
        features: [
          'Information hierarchy',
          'Campaign information structuring',
          'Enhanced user understanding'
        ]
      },
      {
        title: 'CALL-TO-ACTION',
        description: 'I strategically placed and styled Calls to Action (CTAs) to maximize visibility and support user decision-making without being aggressive.',
        features: [
          'CTA clarity & styling',
          'Action visibility optimization',
          'Decision support positioning'
        ]
      },
      {
        title: 'FRONTEND',
        description: 'I built the responsive web interface using semantic HTML, CSS, and JavaScript, focusing on lightweight performance and cross-browser consistency.',
        features: [
          'Semantic HTML structure',
          'CSS & JavaScript implementation',
          'Responsive cross-browser consistency'
        ]
      }
    ],
    technologies: [
      'Figma', 'HTML', 'CSS', 'JavaScript', 'Git'
    ],
    stack: {
      frontend: ['HTML', 'CSS', 'JavaScript'],
      design: ['Figma'],
      other: ['Git']
    },
    goal: "Build a crowdfunding experience where users can understand campaign information more clearly and interact with important actions through an accessible and trust-oriented interface.",
    image: '/projects/peluang-logo-new.png',
    bgColor: '#0D0D0D',
    designImage: '/projects/peluang-design.png',
    github: 'https://github.com/Rnvz'
  }
]
export const SKILLS: Skill[] = [
  { name: 'HTML5',      icon: '/icons/html5.svg' },
  { name: 'CSS3',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'JavaScript', icon: '/icons/javascript.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'Python',     icon: '/icons/python.svg' },
  { name: 'C',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
  { name: 'Next.js',    icon: '/icons/nextdotjs.svg' },
  { name: 'React',      icon: '/icons/react.svg' },
  { name: 'Laravel',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' },
  { name: 'Tailwind',   icon: '/icons/tailwindcss.svg' },
  { name: 'Node.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'MySQL',      icon: '/icons/mysql.svg' },

  { name: 'SQLite',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg' },
  { name: 'Anaconda',   icon: '/icons/anaconda.svg' },
  { name: 'Matplotlib', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg' },
  { name: 'Pandas',     icon: '/icons/pandas.svg' },
  { name: 'NumPy',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg' },
  { name: 'Scikit-learn',icon: '/icons/scikitlearn.svg' },
  { name: 'BioPython',  icon: '/icons/biopython.svg' },
  { name: 'Linux',      icon: '/icons/linux.svg' },
  { name: 'Fedora',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fedora/fedora-original.svg' },
  { name: 'Cisco',      icon: '/icons/cisco.svg' },
  { name: 'Git',        icon: '/icons/git.svg' },
  { name: 'GitHub',     icon: '/icons/github.svg' },
  { name: 'Jira',       icon: '/icons/jira.svg' },
  { name: 'Figma',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
  { name: 'Cloudflare', icon: '/icons/cloudflare.svg' },
  { name: 'Firebase',   icon: '/icons/firebase.svg' },
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

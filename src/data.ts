export const primaryText = "#E1E0CC";
export const accentText = "#F2B36D";

export const heroVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";
export const featureVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4";
export const heroDepthMap = "/assets/depth.png";
export const heroMediaSize = [1924, 1076] as const;
export const showHeroClouds = false;
export const cloudTexture =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAtklEQVR42q2TPwrDIByFjRCyCELXzE49QcbMzu45iFfoeXIPz5Ld/oTPFtq0pajwLc/3nvFPVM5ZfWGAj54zUQuTYAQLBk3/KhgJzIITruDQLJ7TgjJxwbwIXgjg0Rye8bVA014Mq7AJUbhBRFvx2LqdWjDxiQvGEtqFBDvahmcm8ygwNHtWK4EjP8eBFvE4MqpeleWwAiul/D4ScwFvyQxdCpq30OUQm6+x+SF1ecpdfqa/f+c7/5Y1EssD1O0AAAAASUVORK5CYII=";

export const ease = [0.16, 1, 0.3, 1] as const;
export const cardEase = [0.22, 1, 0.36, 1] as const;

export const profile = {
  name: "Stepan Mashtakov",
  role: "Full stack Software Engineer",
  email: "mashtakov.dev@gmail.com",
  emailLabel: "email",
  github: "https://github.com/mashtapok",
  githubLabel: "github",
  phone: "+7 (747) 702-83-27",
  telegram: "https://t.me/gowxking",
  telegramLabel: "telegram",
  linkedin: "https://linkedin.com/in/mashtapok",
  linkedinLabel: "linkedin",
};

export const navItems = [
  { label: "About me", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contacts", href: "#contacts" },
];

export const skillGroups = [
  {
    number: "01",
    title: "Frontend systems.",
    items: [
      "React.js, TypeScript, JavaScript",
      "Next.js, Vue.js, Nuxt",
      "TanStack Query, WebSockets",
      "Tailwind, CSS Modules, Accessibility",
    ],
  },
  {
    number: "02",
    title: "Backend & data.",
    items: [
      "Node.js, Express.js, NestJS",
      "PostgreSQL, Prisma, MongoDB",
      "REST APIs and BFF services",
      "SSR data flows and caching",
    ],
  },
  {
    number: "03",
    title: "Quality & delivery.",
    items: [
      "Playwright, Cypress, Jest, Vitest",
      "Docker, GitHub Actions, GitLab CI",
      "Grafana and Sentry",
      "Webpack and Vite",
    ],
  },
  {
    number: "04",
    title: "Visual tooling.",
    items: [
      "Three.js and d3.js",
      "3D editors and data visualization",
      "Motion-heavy UI systems",
      "Claude Code and Cursor workflows",
    ],
  },
];

export const experience = [
  {
    company: "Wildberries",
    location: "Kazakhstan - remote",
    role: "Senior Software engineer",
    period: "September 2024 - Present",
    summary:
      "Founding frontend engineer for Wibes, a short-form video platform with in-video product purchasing integrated into Wildberries.",
  },
  {
    company: "VK",
    location: "Russia - remote",
    role: "Software engineer",
    period: "December 2022 - September 2024",
    summary:
      "Developed the web version of Mail.ru, a large-scale email platform with 25M+ monthly active users.",
  },
  {
    company: "Nauka",
    location: "Russia",
    role: "Frontend developer",
    period: "September 2020 - December 2022",
    summary:
      "Worked across enterprise web projects involving data visualization, 3D editors, CRM systems and real-time communication tools.",
  },
];

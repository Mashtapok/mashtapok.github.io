export const primaryText = "#E1E0CC";
export const accentText = "#F2B36D";

export const heroVideoSources = [
  { src: "/assets/hero.webm", type: "video/webm" },
  { src: "/assets/hero.mp4", type: "video/mp4" },
] as const;

export const featureVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4";
export const heroDepthMap = "/assets/depth-map.webp";
export const heroMediaSize = [1924, 1076] as const;

export const ease = [0.16, 1, 0.3, 1] as const;
export const cardEase = [0.22, 1, 0.36, 1] as const;

export const profile = {
  name: "Stepan\nMashtakov",
  role: "Full stack Software Engineer",
  email: "mashtakov.dev@gmail.com",
  emailLabel: "email",
  phone: "+7 (747) 702-83-27",
  telegram: "https://t.me/gowxking",
  telegramLabel: "telegram",
  linkedin: "https://linkedin.com/in/mashtapok",
  linkedinLabel: "linkedin",
  cv: "/assets/Stepan_Mashtakov_fullstack.pdf",
  cvLabel: "cv",
};

export const navItems = [
  { label: "About me", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contacts", href: "#contacts" },
];

export const skillGroups = [
  {
    title: "Frontend",
    size: "large",
    items: [
      "React.js",
      "TypeScript",
      "Next.js",
      "Vue.js",
      "Nuxt",
      "d3.js",
      "Three.js",
    ],
  },
  {
    title: "Backend",
    size: "large",
    items: [
      "Node.js",
      "Express.js",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "MongoDB",
      "Docker",
    ],
  },
];

export const experience = [
  {
    company: "Wildberries",
    role: "Senior Software engineer",
    period: "September 2024 — Present",
    preview: {
      type: "video",
      src: "/assets/wibes-preview.webm",
      label: "Wibes product preview",
    },
    summary: [
      { text: "Founding frontend engineer for ", href: null },
      { text: "Wibes.ru", href: "https://wibes.ru" },
      {
        text: ", a short-form video platform with in-video product purchasing integrated into Wildberries.",
        href: null,
      },
    ],
  },
  {
    company: "VK",
    role: "Software engineer",
    period: "December 2022 - September 2024",
    preview: {
      type: "video",
      src: "/assets/vk-preview.webm",
      label: "VK Mail product preview",
    },
    summary: [
      {
        text: "Developed the web version of Mail.ru, a large-scale email platform with 25M+ monthly active users, building high-load features and rich text editing functionality",
        href: null,
      },
    ],
  },
  {
    company: "Nauka",
    role: "Frontend developer",
    period: "September 2020 - December 2022",
    preview: {
      type: "image",
      src: "/assets/nauka.webp",
      label: "Nauka project preview",
    },
    summary: [
      {
        text: "Worked across enterprise web projects involving data visualization, 3D editors, CRM systems and real-time communication tools",
        href: null,
      },
    ],
  },
];

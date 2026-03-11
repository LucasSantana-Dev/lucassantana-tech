import type { ExperienceItem, Profile, Project } from "../types/content";

export const profile: Profile = {
  name: "Lucas Santana",
  role: "Senior Software Engineer | Full Stack",
  summary:
    "I build scalable products and developer platforms with a strong focus on " +
    "quality, governance, and measurable impact across Node.js, TypeScript, React, and AWS.",
  location: "Goiânia, Goiás, Brazil",
  email: "lucas.diassantana@gmail.com",
  linkedin: "https://www.linkedin.com/in/devlucassantana/",
  github: "https://github.com/LucasSantana-Dev",
  website: "https://lucassantana.tech",
  heroImage: "/images/lucas-profile.jpg",
  stack: ["TypeScript", "Node.js", "React", "Next.js", "AWS", "Docker", "MCP"],
  stats: [
    {
      label: "Workflow efficiency",
      value: 40,
      suffix: "%",
      context: "Boost through internal tools and automation",
      source: "CV",
    },
    {
      label: "Incident response",
      value: 40,
      suffix: "%",
      context: "Improvement from observability and health tracking",
      source: "CV",
    },
    {
      label: "Code reliability",
      value: 25,
      suffix: "%",
      context: "Reliability gain with stronger automated testing",
      source: "CV",
    },
    {
      label: "Platforms supported",
      value: 100,
      suffix: "k+ MAU",
      context: "Backend support for high-scale mobile/web products",
      source: "CV",
    },
  ],
};

export const projects: Project[] = [
  {
    slug: "siza",
    name: "Siza",
    organization: "Forge-Space",
    category: "Open Full-Stack AI Workspace",
    summary:
      "Open-source workspace that connects AI generation to real product delivery, from UI " +
      "to backend and deployment.",
    stack: ["TypeScript", "Next.js 16", "React 19", "Supabase", "Cloudflare Workers", "MCP"],
    architectureNotes: [
      "MCP-native architecture with replaceable generation and governance services",
      "BYOK privacy model with encrypted credential handling",
      "Monorepo app architecture for web and desktop surfaces",
    ],
    impact: [
      "Positioned as an accessible IDP alternative for AI-assisted software delivery",
      "Defines the product direction for Forge Space ecosystem",
    ],
    repoUrl: "https://github.com/Forge-Space/siza",
    liveUrl: "https://siza.forgespace.co",
    featured: true,
    deepDive: true,
  },
  {
    slug: "mcp-gateway",
    name: "MCP Gateway",
    organization: "Forge-Space",
    category: "AI Tool Routing Hub",
    summary:
      "Self-hosted gateway that aggregates MCP servers with routing, scoring, auth, and " +
      "operational controls.",
    stack: ["Python", "Node.js", "Docker", "SQLite", "JWT", "MCP"],
    architectureNotes: [
      "Single client entrypoint with virtual server strategy",
      "Gateway-level controls for security and reliability",
      "Admin UI for server registration and routing management",
    ],
    impact: [
      "Standardized multi-tool access across local and remote MCP services",
      "Reduced integration overhead for AI-enabled development workflows",
    ],
    repoUrl: "https://github.com/Forge-Space/mcp-gateway",
    featured: true,
    deepDive: true,
  },
  {
    slug: "lucky",
    name: "Lucky",
    organization: "LucasSantana-Dev",
    category: "Discord Bot Platform",
    summary:
      "Full platform for Discord communities with bot automation, moderation, music, and a " +
      "production-grade web dashboard.",
    stack: ["TypeScript", "React 19", "Express 5", "Prisma", "Redis", "Discord.js", "Docker"],
    architectureNotes: [
      "Monorepo split into shared, bot, backend, and frontend packages",
      "Feature toggles and robust test suite across backend and frontend",
      "Production-focused CI and deployment hardening",
    ],
    impact: [
      "Delivers all-in-one server management experience for Discord communities",
      "Demonstrates end-to-end ownership from product UX to backend reliability",
    ],
    repoUrl: "https://github.com/LucasSantana-Dev/Lucky",
    liveUrl: "https://lucky.lucassantana.tech/",
    featured: true,
    deepDive: true,
  },
  {
    slug: "ui-mcp",
    name: "ui-mcp",
    organization: "Forge-Space",
    category: "AI-Powered UI Generation Server",
    summary:
      "MCP server delivering UI/backend generation capabilities with framework support and " +
      "quality tooling.",
    stack: ["TypeScript", "MCP", "Tailwind", "Figma", "ML Quality Scoring"],
    architectureNotes: [
      "Thin protocol adapter with separated generation engine",
      "Multi-framework output pipeline with design context support",
    ],
    impact: [
      "Accelerates production-grade UI generation in the Forge ecosystem",
    ],
    repoUrl: "https://github.com/Forge-Space/ui-mcp",
    featured: true,
    deepDive: false,
  },
  {
    slug: "homelab",
    name: "homelab",
    organization: "LucasSantana-Dev",
    category: "Infrastructure Automation",
    summary:
      "Secure homelab operations toolkit with health checks, deployment workflows, and safe " +
      "public/private boundaries.",
    stack: ["Python", "Docker", "Tailscale", "Cloudflare Tunnel", "Systemd"],
    architectureNotes: [
      "Tailscale-first security model with optional public exposure",
      "Operational CLI for deploy, health, backup, and restore",
    ],
    impact: [
      "Improved operational consistency for self-hosted services",
    ],
    repoUrl: "https://github.com/LucasSantana-Dev/homelab",
    featured: true,
    deepDive: false,
  },
  {
    slug: "linkedin-engage",
    name: "linkedin-engage",
    organization: "LucasSantana-Dev",
    category: "Automation & Growth Tooling",
    summary:
      "Chrome extension and Playwright connector for structured LinkedIn networking and " +
      "engagement automation.",
    stack: ["JavaScript", "Chrome Extension", "Playwright", "Express"],
    architectureNotes: [
      "Workflow automation with safety gates and quota controls",
      "Data logging and dashboard analytics for campaign behavior",
    ],
    impact: [
      "Shows practical automation engineering for business-facing workflows",
    ],
    repoUrl: "https://github.com/LucasSantana-Dev/linkedin-engage",
    featured: true,
    deepDive: false,
  },
];

export const experiences: ExperienceItem[] = [
  {
    company: "Thoughtworks",
    role: "Senior Software Consultant | Full Stack",
    period: "Jan 2026 — Present",
    bullets: [
      "Architecting scalable React/Next.js interfaces for enterprise clients",
      "Designing cloud-native Node.js/AWS backend architectures",
      "Mentoring engineers and driving code quality in cross-functional teams",
    ],
  },
  {
    company: "CI&T",
    role: "Software Engineer | Full Stack",
    period: "Jan 2023 — Dec 2025",
    bullets: [
      "Improved incident response by 40% using better monitoring and health tracking",
      "Increased code reliability by 25% via robust automated tests",
      "Maintained backend infrastructure supporting 100k+ monthly active users",
    ],
  },
  {
    company: "TRINUS CO.",
    role: "Software Developer | Full Stack",
    period: "Nov 2022 — Dec 2023",
    bullets: [
      "Improved task-tracking efficiency by 50% with internal Kanban tooling",
      "Reduced downtime by 40% through modular microservice architecture",
    ],
  },
  {
    company: "V.SANTANA",
    role: "Software Developer | Full Stack",
    period: "Dec 2021 — Nov 2022",
    bullets: [
      "Built ERP and educational software solutions for local business clients",
      "Delivered institutional web systems with full-stack ownership",
    ],
  },
];

export const skills = [
  "TypeScript",
  "JavaScript",
  "Node.js",
  "React",
  "Next.js",
  "Express",
  "AWS (Lambda, S3, API Gateway, CloudWatch)",
  "Docker",
  "Supabase",
  "Redis",
  "Prisma",
  "CI/CD",
  "Microservices",
  "Serverless",
  "MCP",
  "Architecture & Governance",
];

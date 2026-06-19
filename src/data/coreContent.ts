import type { NowItem, Profile, Project } from "../types/content";

export const profile: Profile = {
  name: "Lucas Santana",
  role: "Senior Software Engineer | Full Stack • AI-Native",
  headlineShort: "Senior Full-Stack Engineer • Node.js • TypeScript • AWS • MCP",
  summary:
    "Brazilian Senior Full-Stack Software Engineer and AI-native developer focused on cloud-native products, " +
    "agentic workflows, and platform architecture across Node.js, TypeScript, React/Next.js, AWS, and the MCP ecosystem.",
  availability: "Open to Senior Full-Stack and Backend opportunities in remote-first teams.",
  location: "Goiânia, Goiás, Brazil",
  email: "lucas.diassantana@gmail.com",
  discord: "https://discord.com/criativaria",
  linkedin: "https://www.linkedin.com/in/devlucassantana/",
  github: "https://github.com/LucasSantana-Dev",
  website: "https://lucassantana.tech",
  heroImage: "/images/lucas-profile.jpg",
  stack: ["TypeScript", "Node.js", "React", "Next.js", "AWS", "MCP", "Claude Code"],
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

export const nowItems: NowItem[] = [
  {
    title: "Forge Kit Toolkit",
    summary:
      "Maintaining and extending a unified AI dev toolkit with portable rules, skills, " +
      "and setup automation across Claude Code, Codex, Cursor, and Copilot.",
    status: "Active",
    links: [
      { label: "Repository", url: "https://github.com/LucasSantana-Dev/forgekit" },
    ],
  },
  {
    title: "Evidence-First RAG",
    summary:
      "Developing a portable hybrid retrieval engine with label-free evaluation, combining " +
      "BM25, dense retrieval, and Reciprocal Rank Fusion.",
    status: "Shipping",
    links: [
      { label: "Repository", url: "https://github.com/LucasSantana-Dev/evidence-first-rag" },
    ],
  },
  {
    title: "Lucky Platform",
    summary:
      "Maintaining and extending a production-ready Discord platform with bot automation, " +
      "dashboard features, and deployment reliability.",
    status: "Maintaining",
    links: [
      { label: "Repository", url: "https://github.com/LucasSantana-Dev/Lucky" },
      { label: "Live", url: "https://lucky.lucassantana.tech/" },
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "forgekit",
    name: "Forge Kit",
    organization: "LucasSantana-Dev",
    category: "AI Dev Tooling",
    summary:
      "Unified AI dev toolkit giving coding agents portable rules, skills, and setup " +
      "automation across Claude Code, Codex, Cursor, Windsurf, and Copilot.",
    stack: ["TypeScript", "Shell", "Astro", "Node.js 22+", "pnpm", "Jest", "ESLint"],
    architectureNotes: [
      "Monorepo split into apps/web, packages/catalog, packages/cli, and packages/setup",
      "29 portable skills and 21 playbooks with tool-specific rule templates",
      "Autonomous execution model with orchestrator and agent roles",
    ],
    impact: [
      "One-command install of rules, skills, and MCP config across multiple AI tools",
      "Standardizes AI-assisted development workflows with provider selection and fallbacks",
    ],
    repoUrl: "https://github.com/LucasSantana-Dev/forgekit",
    featured: true,
    deepDive: true,
  },
  {
    slug: "evidence-first-rag",
    name: "Evidence-First RAG",
    organization: "LucasSantana-Dev",
    category: "RAG / Information Retrieval",
    summary:
      "Portable hybrid retrieval engine with label-free evaluation harness, combining BM25, " +
      "dense retrieval, and Reciprocal Rank Fusion.",
    stack: ["Python 3.10+", "sentence-transformers", "rank-bm25", "NumPy", "SQLite", "pytest"],
    architectureNotes: [
      "Index-time pipeline builds a local SQLite .rag-index from code, docs, and commits",
      "Query-time pipeline uses dense retrieval + BM25 + RRF with optional reranking",
      "Evaluation layer measures Hit@K / MRR and gates regressions against a baseline",
    ],
    impact: [
      "Label-free retrieval evaluation for any retriever via --retriever flag",
      "Code-aware tokenization and language-aware chunking for reproducible self-indexed demos",
    ],
    repoUrl: "https://github.com/LucasSantana-Dev/evidence-first-rag",
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
    slug: "finance-control",
    name: "Finance Control",
    organization: "LucasSantana-Dev",
    category: "Financial Management System",
    summary:
      "Comprehensive Spring Boot financial management system for tracking transactions, " +
      "managing goals, analyzing spending, and AI-assisted forecasts.",
    stack: ["Java", "Spring Boot 3.5", "PostgreSQL 17", "Flyway", "Redis", "JWT", "Docker"],
    architectureNotes: [
      "Layered backend: Controller → Service → Repository → Entity",
      "Modular domain: auth, dashboard, transactions, goals, users, notifications, monitoring",
      "Cross-cutting concerns: DTO mapping, auditing, caching, rate limiting, health metrics",
    ],
    impact: [
      "Full personal finance dashboard with transaction tracking and goal management",
      "JWT auth with multi-tenant user isolation and Supabase realtime + AI predictions",
    ],
    repoUrl: "https://github.com/LucasSantana-Dev/finance-control",
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

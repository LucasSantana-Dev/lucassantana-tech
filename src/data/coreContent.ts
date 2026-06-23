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
    slug: "sharekit",
    name: "sharekit",
    organization: "LucasSantana-Dev",
    category: "AI Dev Tooling",
    summary:
      "Share your entire AI coding setup with one command — publish a CLAUDE.md, skills, and a " +
      "file-based memory system as a GitHub repo, install it anywhere with npx. GitHub is the registry.",
    stack: ["TypeScript", "Node.js 20+", "npm", "node:test", "Prettier", "GitHub Actions"],
    architectureNotes: [
      "Tree-mirror install (claude/ -> ~/.claude) with preview-diff, backup, and one-command rollback",
      "Profile version pinning via git tags/branches; hooks never auto-installed (security gate)",
      "GitHub-backed discovery (sharekit search + web directory); OIDC-published to npm, no server",
    ],
    impact: [
      "One-command install of a full Claude Code / Cursor workflow — rules, 65 skills, memory system",
      "Zero-setup file-based memory with measurable retrieval (memory-eval gate); portable, env-driven",
    ],
    repoUrl: "https://github.com/LucasSantana-Dev/sharekit",
    featured: true,
    deepDive: false,
  },
  {
    slug: "hitgate",
    name: "hitgate",
    organization: "LucasSantana-Dev",
    category: "RAG / Retrieval Eval",
    summary:
      "A label-free retrieval regression gate — catch when a change to your RAG index, retriever, or " +
      "chunking silently degrades recall, before it ships. Auto-mines query/doc pairs; no hand-labeling.",
    stack: ["Python", "PyPI", "pytest", "GitHub Actions"],
    architectureNotes: [
      "Label-free: derives a golden set straight from the corpus — zero manual labeling",
      "Freezes a Hit@K / MRR baseline; gates CI on regression beyond tolerance",
      "Ships as a PyPI package + CLI; reproducible, Ubuntu-frozen eval baseline",
    ],
    impact: [
      "Turns silent retrieval rot into a CI gate teams can actually enforce",
      "Honest by design — measures retrievability change, documents the label-free caveat",
    ],
    repoUrl: "https://github.com/LucasSantana-Dev/hitgate",
    featured: true,
    deepDive: false,
  },
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

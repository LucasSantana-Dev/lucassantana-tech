import type { NowItem, Profile, Project } from "../types/content";

export const profile: Profile = {
  name: "Lucas Santana",
  role: "Senior Software Engineer | Full Stack",
  headlineShort: "Senior Full-Stack Engineer • Node.js • TypeScript • React • AWS",
  summary:
    "Brazilian Senior Full-Stack Software Engineer focused on cloud-native products, " +
    "platform architecture, and delivery quality across Node.js, TypeScript, React/Next.js, and AWS.",
  availability: "Open to Senior Full-Stack and Backend opportunities in remote-first teams.",
  location: "Goiânia, Goiás, Brazil",
  email: "lucas.diassantana@gmail.com",
  discord: "https://discord.gg/qhe6XnanHy",
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

export const nowItems: NowItem[] = [
  {
    title: "Forge Space Ecosystem",
    summary:
      "Driving platform direction and quality governance patterns across the Forge Space " +
      "open-source ecosystem.",
    status: "Active",
    links: [
      { label: "Forge Space", url: "https://forgespace.co/" },
      { label: "GitHub Org", url: "https://github.com/Forge-Space" },
    ],
  },
  {
    title: "Siza + MCP Gateway + ui-mcp",
    summary:
      "Evolving AI workspace workflows with MCP-native architecture, scoring, routing, " +
      "and delivery guardrails.",
    status: "Shipping",
    links: [
      { label: "Siza", url: "https://github.com/Forge-Space/siza" },
      { label: "MCP Gateway", url: "https://github.com/Forge-Space/mcp-gateway" },
      { label: "ui-mcp", url: "https://github.com/Forge-Space/ui-mcp" },
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

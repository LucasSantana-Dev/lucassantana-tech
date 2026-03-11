# Changelog

## 2026-03-11

- Implemented GitHub Actions CI/CD pipeline set:
  - Added `ci.yml` for push/PR quality gates (`lint`, `typecheck`, `test:run`, `build`)
  - Added dependency security audit gate (`npm audit --audit-level=high`)
  - Added `deploy-cloudflare-pages.yml` with:
    - PR preview deployments to Cloudflare Pages and automatic PR URL comment
    - production deployment on `main` push
    - manual production deployment via `workflow_dispatch`
- Documented CI/CD workflows and required Cloudflare secrets in `README.md`
- Refactored navbar from pill-heavy style to editorial/professional style:
  - Decoupled nav controls from global `ui-action`/`ui-action-chip` classes
  - Reworked top bar with sharper radius, clearer border hierarchy, and restrained hover behavior
  - Converted nav Discord action to secondary visual weight while keeping white icon and external affordance
  - Redesigned mobile menu as compact dropdown panel with crisp corners and improved spacing rhythm
  - Enforced `>=44px` touch targets for nav links, menu toggle, and CTA
- Added navbar visual regression artifacts:
  - `.codex-artifacts/navbar-editorial-desktop.png`
  - `.codex-artifacts/navbar-editorial-desktop-hover.png`
  - `.codex-artifacts/navbar-editorial-desktop-focus.png`
  - `.codex-artifacts/navbar-editorial-mobile.png`
  - `.codex-artifacts/navbar-editorial-mobile-open.png`
- Sanity checks after navbar refactor:
  - Playwright mobile overflow check passed (`scrollWidth === clientWidth`)
  - Lighthouse: Mobile `98/100`, Desktop `100/100`, Accessibility `100/100`,
    Best-Practices `100/100`, SEO `100/100`
- Implemented mobile performance optimization pass targeting 90+ Lighthouse:
  - Locked build and preview scripts to `NODE_ENV=production` to prevent dev-transform bundles
  - Kept below-the-fold sections lazy/deferred (`Skills`, `Reach Me`, `More Details` content)
  - Split content loading into core vs extended modules to reduce startup transfer
- Optimized render path and assets:
  - Deferred Google critical-font stylesheet to non-blocking load with `noscript` fallback
  - Deferred `Source Serif 4` loading through runtime observer utility
  - Added lightweight Lucky icon asset (`lucky-outline-v4-neon-icon.webp`) for small-logo surfaces
  - Added intrinsic `width`/`height` attributes on project/now logo images
- Improved caching behavior with long-lived immutable image headers in `public/_headers`
- Updated tests for lazy-section behavior under deferred rendering and ensured full pass
- Re-ran quality and performance checks:
  - `lint`, `typecheck`, `test:run`, `build`, `npm audit --audit-level=high`
  - Lighthouse (local preview): Mobile `98/100` performance, Desktop `100/100` performance,
    Accessibility `100/100`, Best-Practices `100/100`, SEO `100/100`
- Applied Clean-Signal UI refactor for lower-clutter first pass:
  - Core sections only: `About`, `Now`, `Projects`, `Skills`, `Reach Me`
  - Added collapsed `More Details` disclosure block for `Impact`, `Volunteering`, `Experience`, and
    consolidated `Architecture` content
- Implemented projects progressive disclosure:
  - Default view now renders 3 cards (`Siza`, `MCP Gateway`, `Lucky`)
  - Added `Show more projects` / `Show fewer projects` toggle to reveal remaining 3
  - LinkedIn Engage store preview images render only in expanded state
- Simplified motion for a cleaner premium feel:
  - Removed duplicate deep-dive surface from main flow
  - Kept Three.js enhancement scoped to hero only
- Corrected brand assets and fallback behavior:
  - Lucky logo now uses neon outline v4 cat asset
  - Forge Space mark now resolves to a valid SVG asset
  - Project and timeline logo fallbacks avoid broken-image states
  - Discord/LinkedIn/GitHub action icons are enforced white across shared mappings
- Improved mobile ergonomics:
  - Section-level wrappers use 16px side gutters on mobile (`calc(100% - 2rem)`)
  - Navigation now uses compact mobile menu toggle and reduced visual crowding
- Added test coverage for:
  - Core-first IA and collapsed `More Details` behavior
  - 3-project default rendering and expand/collapse project flow
- Added volunteering content entry for Community Manager work in online developer communities
- Ran clean-signal quality and audit checks:
  - `lint`, `typecheck`, `test:run`, `build`, `npm audit --audit-level=high`
  - Lighthouse (local preview): Mobile `74/100` performance, Desktop `98/100` performance,
    Accessibility `100/100`, Best-Practices `100/100`, SEO `100/100`
- Repositioned the site from portfolio-first to business-card-first information architecture:
  `About / Now / Relevant Projects / Volunteering & Community / Experience Snapshot / Skills / Reach Me`
- Added first-class Discord community integration (`https://discord.gg/qhe6XnanHy`) in:
  - top navigation CTA
  - hero action group
  - contact action grid
  - footer social actions
  - SEO Person `sameAs` structured data
- Added new typed contracts and curated datasets:
  - `Profile` extended with `headlineShort`, `availability`, `discord`
  - `NowItem[]` for current work focus
  - `VolunteerItem[]` with 2 confirmed entries
- Implemented new business-card sections and bento card layouts:
  - `AboutIdentity`
  - `NowFocus`
  - `VolunteeringCommunity`
- Updated copy and section framing to emphasize quick identity scan and current availability
- Refined global UI behavior for denser nav and contact surfaces, including responsive card grids for
  new sections
- Updated tests to validate:
  - Discord URL integrity
  - `Now` dataset completeness
  - volunteering dataset minimums
  - new IA section rendering and repeated Discord CTA presence
- Re-ran Lighthouse sanity checks after business-card changes:
  - Mobile: `78/100` performance, `100/100` accessibility, `100/100` best-practices, `100/100` SEO
  - Desktop: `99/100` performance, `100/100` accessibility, `100/100` best-practices, `100/100` SEO
- Upgraded Skills section to a high-visibility leveled capability map:
  - New skill model with `Core`, `Strong`, `Working`, `Familiar` levels
  - Evidence tags (`Forge Space`, `Homelab`, `Career`) and per-skill context metadata
  - Curated-by-default lists with `Show more` expansion per area
  - Desktop hover detail panel and mobile accordion behavior
  - Larger headings, bigger aligned technology icons, and clearer scan-line hierarchy
- Expanded skills inventory using homelab + Forge Space stack signals, including:
  - `Java`, `Python`, `Spring` in backend capability coverage
  - Cloud/infra and ops technologies (`k3s`, `Terraform`, `Tailscale`, `Cloudflare Tunnel`,
    `Grafana`, `Prometheus`, `Loki`, `Alertmanager`, `Netdata`, `n8n`, `Sentry`)
- Added tests for skill-level data integrity and Skills UI behavior (curated/expand,
  hover context updates, and mobile accordion flow)
- Replaced skills section area heading logos with neutral domain icons (no specific tech brand marks)
- Added branded action iconography across navigation, hero, contact, footer, community, and repository links:
  - GitHub, LinkedIn, Discord, mail, and live-link indicators
- Added project branding media:
  - Forge Space mark, Siza logo, and Lucky logo in project/now cards
  - LinkedIn Engage extension icon and generated store preview images
- Bootstrapped a new React + TypeScript portfolio for `lucassantana.tech`
- Created a Stitch-driven design workflow and exported generated UI artifacts
- Implemented neo-dark cinematic interface with animated hero, metrics, featured projects,
  deep dives, timeline, skills map, and contact CTA
- Added typed content contracts (`Profile`, `ExperienceItem`, `Project`, `Metric`)
- Added SEO metadata and JSON-LD structured data
- Added tests for content integrity, reduced-motion animation logic, render behavior,
  and accessibility baseline
- Added Cloudflare Pages deployment configuration (`wrangler.toml` + deploy scripts)
- Refreshed portfolio visual system with a Stitch v2 concept pass and exported artifacts in `stitch/v2`
- Upgraded animation stack from `framer-motion` to `motion` (`motion/react`) with:
  scroll progress rail, hero parallax, pinned deep-dive progress, and directional section choreography
- Reworked major sections (hero, nav, projects, deep dives, timeline, skills, contact) for a more
  editorial neo-dark aesthetic and stronger mobile composition
- Applied Forge Space brand guide tokens for typography and colors:
  Sora / DM Sans / IBM Plex Mono with primary purple palette
- Increased click affordance across the UI with a shared `ui-action` pill system
  (primary/secondary/ghost/chip), visible inline icons, and stronger `:focus-visible`
  treatment for keyboard accessibility
- Added architecture-first portfolio refinements:
  - Three.js node-field animated backdrops (hero + architecture sections)
  - Company logo marks in the experience timeline
  - Technology icons across hero stack, project chips, and skills map
  - Grouped skill taxonomy by area (`Frontend`, `Backend`, `Database`, `Cloud`, `Tools`, `CI/CD`)
  - Dedicated systems-design showcase section
- Optimized runtime performance:
  - Code-split Three.js into a lazy-loaded chunk
  - Deferred hero 3D loading and gated heavy 3D effects on mobile
  - Switched font loading from CSS `@import` to preconnected `<link>` strategy
- Improved test stability by mocking canvas context in test setup
- Added Cloudflare Pages `_headers` policy for security + cache control
- Replaced generated timeline logo placeholders with public brand assets:
  - Thoughtworks logo from thoughtworks.com
  - CI&T logo SVG from Wikimedia Commons
  - TRINUS logo SVG from trinus.co
- Added resilient timeline logo fallback rendering (company text shown if image fails to load)
- Refined timeline logo container UI for mixed logo aspect ratios and stronger dark-theme contrast
- Temporary asset note: V.SANTANA currently uses a low-resolution PNG thumbnail and is marked for
  replacement once an official high-resolution logo file is provided
- Ran full quality gates (`lint`, `typecheck`, `test:run`, `build`, `npm audit`)
- Ran Lighthouse audits:
  - Mobile: `87/100` performance, `100/100` accessibility, `100/100` best-practices, `100/100` SEO
  - Desktop: `99/100` performance, `100/100` accessibility, `100/100` best-practices, `100/100` SEO
- Deployed with Cloudflare CLI:
  - Preview alias: `https://preview.lucassantana-tech.pages.dev`
  - Production alias: `https://lucassantana-tech.pages.dev`
  - Attached `lucassantana.tech` and `www.lucassantana.tech` to the Pages project
    (both pending verification until CNAME DNS records are set)

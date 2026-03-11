# lucassantana.tech Digital Business Card

Business-card-first personal hub for [lucassantana.tech](https://lucassantana.tech), built with
React + TypeScript and deployed with Vercel automation plus Cloudflare Pages fallback workflows.

## Highlights

- Neo-dark cinematic visual direction (graphite + Forge Space purple tones)
- Forge Space brand tokens (Sora / Inter / IBM Plex Mono and purple palette)
- Motion.dev animation system with reduced-motion fallbacks
- Three.js node-field ambiance (desktop-first, lazy-loaded, mobile fallback)
- High-contrast pill/button interaction system with action chips and strong keyboard focus states
- Editorial navbar refactor with sharper geometry, reduced CTA dominance, and compact mobile dropdown
- Typed content contracts for profile, projects, metrics, and experience
- Lean business-card IA with `About`, `Now`, `Projects`, `Skills`, `Reach Me` as first-pass sections
- Progressive disclosure via collapsed `More Details` block for volunteering, experience, metrics, and architecture
- Projects are progressive by default: 3 featured cards first, optional expand to 6
- Discord community integration across nav, hero, contact card, footer, and schema metadata
- Manual curated `Now` section and dedicated volunteering/community section
- Volunteering data includes Community Manager experience for developer communities
- Architecture/system-design spotlight section for deep-dive projects
- Skill map upgraded to leveled capability matrix (`Core`, `Strong`, `Working`, `Familiar`)
- Curated-by-default skills view with expand/collapse, desktop hover context, and mobile accordion
- Expanded stack coverage from homelab + Forge Space (Java, Spring, Python, cloud/ops tooling)
- Skills area headers use neutral domain icons instead of technology brand logos
- Brand/icon pass across key actions and projects (GitHub, LinkedIn, Discord, Forge Space, Siza, Lucky)
- LinkedIn Engage project cards include generated store preview imagery
- Company timeline with branded logo marks
- Experience timeline uses official public logos where available and graceful text fallback on load errors
- Mobile spacing lock: 16px side gutters (`calc(100% - 2rem)`) and compact nav menu behavior
- Motion simplification pass with subtle section/card interactions and hero-only Three.js enhancement
- SEO + JSON-LD (`Person`, `WebSite`, `SoftwareSourceCode`)
- Cloudflare Pages `_headers` for cache strategy and security headers
- Build/preview scripts now force `NODE_ENV=production` to avoid accidental dev bundles
- Stitch-assisted UI pipeline with v1 + v2 exported design artifacts

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Motion (`motion/react`)
- React Helmet Async
- Vitest + Testing Library + vitest-axe
- ESLint 9

## Local Development

```bash
npm install
npm run dev
```

Open <http://localhost:5173>.

## Quality Gates

```bash
npm run lint
npm run typecheck
npm run test:run
npm run build
npm audit --audit-level=high
```

## CI/CD (GitHub Actions)

Pipelines are defined in:

- `.github/workflows/ci.yml`
- `.github/workflows/deploy-cloudflare-pages.yml`
- `.github/workflows/deploy-vercel.yml`

### CI workflow

- Trigger: push (`main`, `feature/**`, `fix/**`, `refactor/**`, `chore/**`, `ci/**`, `docs/**`)
  and pull requests targeting `main`
- Jobs:
  - `Quality Gates`: `lint`, `typecheck`, `test:run`, `build`
  - `Dependency Audit`: `npm audit --audit-level=high`

### CD workflow (Vercel, primary)

- PR preview deploys on pull requests targeting `main`
- Production deploys on push to `main`
- Manual production deploy available via `workflow_dispatch`
- PR preview URL is posted back as a PR comment

### CD workflow (Cloudflare Pages, fallback/manual)

- PR preview deploys on pull requests targeting `main`
- Production deploy is manual-only via `workflow_dispatch` on `main`
- PR preview URL is posted back as a PR comment

### Required repository secrets

Configure in GitHub repository settings:

- `CLOUDFLARE_API_TOKEN` (Pages write scope)
- `CLOUDFLARE_ACCOUNT_ID` (`<CLOUDFLARE_ACCOUNT_ID>`)
- `VERCEL_TOKEN` (token from Vercel account settings)
- `VERCEL_ORG_ID` (`team_i0KXJ8eY30h0mlXo1IxZe2mI`)
- `VERCEL_PROJECT_ID` (`prj_3NBVHR7IAZ5KUuc3Oc8j36OhEkYu`)

Both deploy workflows validate tokens with `wrangler whoami` and `vercel whoami` before
attempting deploy steps. If secrets are missing or invalid, preview jobs skip cleanly and post
a status comment instead of failing.

## Audit Snapshot (Local, Mar 11, 2026)

- Lighthouse mobile: Performance `98`, Accessibility `100`, Best Practices `100`, SEO `100`
- Lighthouse desktop: Performance `100`, Accessibility `100`, Best Practices `100`, SEO `100`

## Deploy (Cloudflare Pages)

Prerequisite: authenticated Wrangler CLI (`npx wrangler whoami`).

```bash
npm run build
npm run deploy:preview
npm run deploy:production
```

This repository deploys static output from `dist/` using `wrangler pages deploy`.

Latest deployments:

- Preview: [preview.lucassantana-tech.pages.dev](https://preview.lucassantana-tech.pages.dev)
- Production alias: [lucassantana-tech.pages.dev](https://lucassantana-tech.pages.dev)

Custom domain status:

- `lucassantana.tech` and `www.lucassantana.tech` are attached to the Pages project and currently `pending` verification.
- As of March 11, 2026, `lucassantana.tech` still serves the previous GoDaddy site because required CNAME DNS records are not set yet.

## Content Model

The app uses these source-of-truth interfaces:

- `Profile`
- `ExperienceItem`
- `Project`
- `Metric`
- `SkillArea`

Definitions live in [src/types/content.ts](/Users/lucassantana/Desenvolvimento/portfolio/src/types/content.ts).
Data lives in [src/data/coreContent.ts](/Users/lucassantana/Desenvolvimento/portfolio/src/data/coreContent.ts)
and [src/data/extendedContent.ts](/Users/lucassantana/Desenvolvimento/portfolio/src/data/extendedContent.ts).

Current contracts:

- `Profile` (`headlineShort`, `availability`, `discord` included)
- `SkillItem` (`name`, `level`, `iconKey`, `evidence`, `featured`, `context`)
- `SkillLevel` (`core`, `strong`, `working`, `familiar`)
- `NowItem`
- `VolunteerItem`
- `ExperienceItem`
- `Project`
- `Metric`
- `SkillArea`

## Stitch Assets

Stitch artifacts used during implementation:

- Baseline project: `projects/14150866373996469001`
- Portfolio project: `projects/11940467736549131072`
- Portfolio motion refresh project: `projects/15115657045286706662`
- Exported files: `stitch/exports/`
- Motion refresh exports: `stitch/v2/exports/`
- Metadata manifest: `stitch/screen-manifest.json`
- Motion refresh manifest: `stitch/v2/screen-manifest.json`
- Design system summary: [DESIGN.md](/Users/lucassantana/Desenvolvimento/portfolio/DESIGN.md)

# lucassantana.tech Portfolio

Modern software engineer portfolio for [lucassantana.tech](https://lucassantana.tech), built with
React + TypeScript and deployed on Cloudflare Pages.

## Highlights

- Neo-dark cinematic visual direction (graphite + cyan + amber)
- Motion.dev animation system with reduced-motion fallbacks
- Typed content contracts for profile, projects, metrics, and experience
- SEO + JSON-LD (`Person`, `WebSite`, `SoftwareSourceCode`)
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

## Deploy (Cloudflare Pages)

Prerequisite: authenticated Wrangler CLI (`npx wrangler whoami`).

```bash
npm run build
npm run deploy:preview
npm run deploy:production
```

This repository deploys static output from `dist/` using `wrangler pages deploy`.

## Content Model

The app uses these source-of-truth interfaces:

- `Profile`
- `ExperienceItem`
- `Project`
- `Metric`

Definitions live in [src/types/content.ts](/Users/lucassantana/Desenvolvimento/portfolio/src/types/content.ts).
Data lives in [src/data/content.ts](/Users/lucassantana/Desenvolvimento/portfolio/src/data/content.ts).

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

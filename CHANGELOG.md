# Changelog

## 2026-03-11

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

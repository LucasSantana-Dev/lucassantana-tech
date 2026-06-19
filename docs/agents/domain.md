# Domain Documentation Layout

**Layout:** Single-context

## Files

- `CONTEXT.md` — project domain language, key abstractions, and conventions (to be created)
- `docs/adr/` — architectural decision records (to be created as decisions are made)

## Consumer rules

Skills that read domain context (`/improve-codebase-architecture`, `/diagnosing-bugs`, `/tdd`, `/grill-with-docs`) should:

1. Read `CONTEXT.md` first to understand the domain vocabulary before exploring code.
2. Check `docs/adr/` for past decisions before proposing architecture changes.
3. Treat CONTEXT.md as the authoritative source for terminology — prefer its names over whatever appears in code or comments.

## Domain summary (bootstrap)

This is a personal portfolio SPA (`lucassantana.tech`) for Lucas Santana, a Senior Software Engineer.

**Stack:** React 19 + TypeScript + Vite 7 + motion/react (animations) + IBM Plex Mono (font)  
**Aesthetic:** Terminal/instrumented — monospace throughout, `#080809` bg, `#4ade80` green accents  
**Architecture:** Single-page, lazy-loaded sections, `src/data/coreContent.ts` as content source of truth  
**Deploy:** Cloudflare Pages (primary) + Vercel (fallback), GitHub Actions CI  
**Content model:** `Profile`, `Project`, `SkillArea`, `NowItem` types in `src/types/content.ts`

# Design System: Lucas Santana Portfolio 2026
**Project IDs:** `projects/11940467736549131072` (v1), `projects/15115657045286706662` (v2 motion refresh)

## 1. Visual Theme & Atmosphere
A cinematic neo-dark interface with product-grade precision. The mood is technical and polished:
high contrast surfaces, luminous cyan signal accents, and amber highlights for hierarchy and
achievement cues. Motion should feel intentional and directional, never playful or decorative-only.

Reference lineage:
- Stitch baseline: `projects/14150866373996469001` (Siza production style)
- Stitch generated portfolio screens:
  - `3d97ea6efb304698b666535e564613f7` (desktop hero)
  - `c744ecafefa84e979b23a35cdf53dab3` (desktop metrics/projects)
  - `d9488a2fc4154812a9d76e86e7152c6e` (desktop experience/contact)
  - `4a68d616923c46299d027c2fb23dc696` (mobile hero)
  - `ceb8a39945924c56a3731286850ba12f` (mobile metrics/projects)
  - `20b243dfb78b4a1090884aa53d2dab8b` (mobile experience/contact)
- Stitch v2 motion-refresh screens:
  - `6122fb3e2a8d4bc9ad85f2739d3b4ea8` (desktop landing refresh)
  - `cf763c27f0194b919ed49e56485360a1` (mobile landing refresh)

## 2. Color Palette & Roles
- **Graphite Deep Base (`#05070B`)**: Primary canvas for dark cinematic depth.
- **Midnight Surface (`#0B1018`)**: Main card and section backdrop.
- **Slate Tech Layer (`#101928`)**: Secondary layer for contrast separation.
- **Signal Cyan (`#3EC7E7`)**: Navigation hover, links, and active technical cues.
- **Achievement Amber (`#F8B64A`)**: Labels, metadata, timeline highlights.
- **Trust Mint (`#75F0D2`)**: Metric numbers and positive performance emphasis.
- **Electric Cyan Core (`#1FE3FF`)**: Motion accents, progress rails, and key CTA gradients.
- **Warm Amber Core (`#FFB020`)**: Counterbalance for timeline, tags, and conversion elements.
- **Readable Primary (`#ECF3FF`)**: Headline and core text.
- **Readable Secondary (`#9FB6CD`)**: Supporting copy and contextual text.

## 3. Typography Rules
- **Display Headline:** Bricolage Grotesque, heavy weights (700-800), tight leading.
- **Body/UI:** Manrope, medium legibility for dense engineering narrative.
- **Technical Labels:** IBM Plex Mono for tags, sources, and metadata rails.
- Strong hierarchy through size and weight first; color is secondary support.

## 4. Component Stylings
- **Buttons/Links:** Underline-on-hover text links with cyan/amber emphasis.
- **Cards/Containers:** Rounded `16px`-`20px`, thin cool-toned borders, translucent dark fill.
- **Inputs/Forms:** Not primary in this site version; if introduced, use high-contrast dark fields.
- **Depth:** Soft long shadows (`0 24px 72px rgba(0,0,0,0.5)`), no hard drop shadows.
- **Badges/Pills:** Full rounded with mono labels and muted border tint.
- **Motion Surfaces:** Scroll-progress rail, moving signal strip, and pinned narrative cards.

## 5. Layout Principles
- Desktop max content width near `1100px` with generous vertical rhythm.
- Hero uses asymmetric two-column composition (copy dominant, portrait secondary).
- Hero introduces vertical parallax on media plate with responsive glow.
- Deep-dive section uses a pinned explanatory panel and scrolling case cards.
- Section rhythm alternates directional entrances to avoid repetitive motion patterns.
- Mobile collapses to single-column without reducing visual density of key sections.
- Section order: Hero → Impact → Featured → Deep Dives → Experience → Skills → Contact.

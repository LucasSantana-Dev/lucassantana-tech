# ADR-0002 — Terminal-ify the editorial sections; keep company logos

**Status:** Accepted — 2026-06-23
**Decided via:** `/decide` (research → decision-critic NEEDS_REVISION → prototype → user choice).

## Context

After choosing the "Refined Terminal" direction (ADR-0001 context), the portfolio was found to carry **two clashing design systems**: a terminal/CLI aesthetic (hero window + `#`-headed compact sections) and an editorial/marketing aesthetic (huge display headings + big cards) used by four sections surfaced under "More Details": **Experience, Metrics, Community, Architecture**. The clash became visible once "More Details" was opened by default.

The open question: how far to take the terminal conversion of those sections' entries.

## Decision

**Terminal-ify the four editorial sections to match the CLI aesthetic:**
- Replace the giant editorial `<h2>` with a compact `# <section>` header (reusing the `# selected builds` header style).
- Render list content as terminal output (`>` prefixed lines).

**Keep the company logos** (Experience), displayed at a **consistent height** (toned-down light chips, natural widths) — option (iii)/A. True 1:1 square marks are **deferred** pending crisp square assets (see below).

## Options considered

| Option | Verdict |
|--------|---------|
| (i) Header + bullets only, keep editorial cards | REJECTED — leaves the entries editorial; partial cohesion. |
| (ii) Full terminal, **drop logos** | REJECTED — logos are recruiter credibility signals; dropping them is a self-inflicted hit to the portfolio's hiring job (decision-critic's load-bearing point). |
| (iii)/A Full terminal + **keep logos**, consistent display | **CHOSEN** — cohesion without losing the credibility signal. |

## Critic reconciliation

`decision-critic` returned **NEEDS_REVISION** on (iii): "restyled logos" was unspecified/untested — don't decide blind, **prototype first**. Reconciled by building the toned-down-chip prototype and surfacing a real constraint: logos can't sit on a *dark* chip (Thoughtworks/CI&T are dark-on-transparent → they'd vanish), so a "terminal logo" is a smaller/flatter **light** chip. The user judged the prototype and chose A.

## 1:1 logo attempt (verified)

Tried to source square marks: **Clearbit logo API is dead**; Google favicons are square but **low-res** (CI&T 32px) — swapping crisp vector wordmarks for raster favicons is a quality downgrade. V.Santana is already 1:1. So consistent-height display now; true 1:1 only if official square brand-marks are dropped into `public/images/company-logos/`.

## Consequences

**Positive:** one coherent terminal design across the page; keeps recruiter-recognizable logos; resolves the impact-data duplication (terminal `# impact highlights` vs editorial Metrics).
**Negative:** logos stay mixed-ratio until square brand-marks are sourced; the big Space Grotesk display headings disappear from these sections (Space Grotesk now only matters if a big heading is reintroduced).
**Neutral:** "More Details" stays open by default (ADR-0001).

## Revisit when

- Official square brand-marks become available → wire them for true 1:1 (V.Santana is the template).
- The 2026-07-21 analytics review (ADR-0001) suggests the terminal density hurts engagement → reconsider editorial accents.

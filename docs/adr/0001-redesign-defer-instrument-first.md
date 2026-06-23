# ADR-0001 — Adopt interaction polish; instrument before any bold redesign

**Status:** Accepted — 2026-06-23
**Decided via:** `/decide` (research-and-decide → decision-critic → reconciliation).

## Context

After two automated `/repaint` runs produced interaction polish (not a redesign), the open question was: **invest in a bold visual redesign of lucassantana.tech now, or keep the current design and adopt the polish?**

Facts:
- The current terminal/instrumented aesthetic is a **deliberate full redesign shipped 2026-06-19** ("all sections rewritten") — 4 days old.
- An **earlier full redesign (2026-05-15) was stashed and never shipped** (catalogued as a "ui-expert N4 failure"; prod left untouched).
- Two independent `/repaint` runs both judged the aesthetic "strong" and produced only polish — **but both overclaimed their reports**, and they judged *scope* ("redesign needed?"), not *fitness* ("does this convert for hiring/credibility?").
- The site is **effectively unmeasured** — no analytics (no GA/Plausible/Cloudflare beacon). "No complaints" is **silence, not signal**.
- The polish is `src/App.css` **+179 lines, purely additive** (focus-visible outlines, hover feedback, minor color-weight/spacing), build-passing, reversible.

## Decision

1. **Adopt the interaction polish** — commit `src/App.css` and deploy. It's a genuine accessibility + interaction win, additive and reversible.
2. **Defer a bold redesign — but behind an *active, dated* measurement gate, not a passive "revisit when dissatisfied" (which is a silent veto).** Specifically:
   - **Instrument the site** (Cloudflare Web Analytics — free, privacy-friendly, zero-config on the existing CF Pages deploy). The design's effectiveness is currently unmeasured; that is the real gap.
   - **Review on 2026-07-21** (~4 weeks): if analytics show underperformance (bounce > 80%, median session < 30s, or zero portfolio-attributed inbound) **OR** a concrete dissatisfaction surfaces (operator or a trusted-peer gut-check) → commit to a redesign sprint. Otherwise the keep-and-polish stands.

The current design is **deliberate and recent, not validated.** This decision does not claim it is good — it claims a 4-day-old deliberate redesign should be *measured*, not *re-churned*, before another rebuild.

## Critic reconciliation

`decision-critic` verdict: **SOUND**, with one load-bearing fix that was incorporated: the original defer gate ("revisit when the operator names dissatisfaction") was a **silent veto**, and the recommendation **conflated the agents' scope judgment with a fitness judgment they never made**. Reconciled by converting the passive defer into an **active, instrumented, dated** gate (the revision the critic recommended). Verified claims: analytics absent (confirmed); polish is mostly invisible (confirmed: focus/hover + minor weight); the 2026-05-15 stash was an agent-driven attempt not adopted (operator iterates visually without external signal — a risk this ADR's measurement gate directly addresses).

## Alternatives considered

| Option | Verdict |
|--------|---------|
| Bold redesign now | REJECTED — design is 4 days old + deliberate; a prior redesign was already rejected; no measured problem; violates "no demand-blind rebuild without a gate" (measure first). |
| Revert the polish | REJECTED — it's a free, reversible a11y/interaction win. |
| Defer redesign passively ("revisit when dissatisfied") | REJECTED — silent veto (per critic); drifts indefinitely; relies on the operator *feeling* a subtle problem. |

## Consequences

**Positive:** ships an a11y improvement; finally instruments the portfolio (the missing feedback loop); avoids churning a fresh, deliberate design on no evidence.
**Negative:** shipped polish can entrench the aesthetic (sunk-cost raises the bar to redesign) — mitigated by the dated gate + real data forcing the question on 2026-07-21.
**Neutral:** the bold-redesign question stays open as a *measured* bet, not a taste argument.

## Revisit when

- **2026-07-21** (hard date): review analytics + a peer gut-check; underperformance or concrete dissatisfaction → redesign sprint; else keep.
- Earlier if the operator names a specific, concrete dissatisfaction with the current design.

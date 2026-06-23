---
title: "Lucky: a self-hosted Discord bot platform"
date: "2026-06-16"
description: "Why I built a production Discord bot I could host myself — so no third party could take it away — and the trade-offs that shaped it."
---

When Groovy, Rythm, and Hydra shut down, thousands of Discord communities lost their music bots overnight. These were third-party services running in the cloud, and when the operators decided to exit, users had no recourse. That's the moment I decided to build Lucky — a Discord bot I could host myself, so no external entity could take it away.

Lucky is a self-hosted Discord platform. It ships music (YouTube, Spotify, SoundCloud), moderation, auto-mod, reaction-role management, engagement features (leveling, starboard, Last.fm scrobbling), and a React dashboard — all in one TypeScript monorepo that you control.

## Why self-host?

The dependency on third-party music bots exposed a fundamental vulnerability: your community's tools can vanish on someone else's schedule. Self-hosting inverts the control model. You run the code, you own the infrastructure, you make the continuity decisions.

The trade-off is real. You manage a server, a database, Redis, and the bot process. But the independence is worth it — especially when you help run a community that can't afford to suddenly lose automation its members depend on.

## Architecture: monorepo with clear seams

Lucky is a modular monolith split across four packages:

- **shared** — types, database schema (Prisma), Redis, and services shared by everything else
- **bot** — the Discord.js 14 application: commands, music logic, event handlers
- **backend** — Express API for the dashboard, OAuth flows, REST endpoints
- **frontend** — React 19 web dashboard, served via Vite

The bot and backend never talk directly in the hot path; they share the database and Redis. The frontend talks to the backend API, which Nginx proxies. This keeps concerns isolated: the bot can crash without taking down the dashboard, and the dashboard can be deployed independently. Prisma's schema lives at the repo root as the single source of truth; Redis handles transient state (caches, rate limits), Postgres is the durability layer. That separation has held up reliably in production.

## Music: multi-source, personalized autoplay

The music engine is where design decisions become visible. Lucky doesn't just queue tracks sequentially; it learns from listening history and personalizes autoplay.

The autoplay pipeline aggregates candidates from multiple sources — a similarity-based recommender over track history, Last.fm seed data for genre/artist context, and Spotify's recommender API. A diversity filter stops the bot getting stuck on one artist, and a scoring layer weighs candidates so tracks you replay get a boost while frequently-skipped ones are penalized.

This isn't a novel algorithm — it's pragmatic engineering. Third-party music bots often suffered "mainstream creep": autoplay drifting toward whatever was trending rather than the user's actual taste. Grounding recommendations in listening history plus explicit diversity gates keeps the experience personal.

## Testing and reliability

The repo ships a large test suite (~2,500 tests) covering music logic (queue manipulation, autoplay scoring, session restore), moderation case handling, backend API validation, and the Spotify/Last.fm integration points. Every PR runs the full pipeline: lint, type check, build, tests, and SonarCloud quality gates.

One deliberate choice: the bot uses a "queue resolver" pattern. Rather than reaching into the `discord-player` library's internal APIs everywhere, a single resolver (`resolveGuildQueue`) encapsulates how the queue is fetched, with fallback logic. That isolation paid off when discord-player changed its internal state management — one function changed, and the rest of the bot kept working.

## Where Lucky is now

The bot is deployed to production, handling a real community — Criativaria, which uses Lucky to sync forum content into Discord channels idempotently. Version 2.21.0 shipped in June 2026, with recent additions like Twitch EventSub integration (live notifications, follower/subscriber role sync) and a dashboard role manager.

The open-source stance is genuine: the code is public so others can learn from it, self-host it, and adapt it. The maintenance model is solo personal project — issues and PRs welcome, best-effort response. This is a production tool I built for myself and the communities I'm part of, not a product with SLAs.

## The honest take

Maintaining Lucky taught me that "doing it yourself" has a real cost. Infrastructure choices that seemed straightforward (Postgres + Redis) became bets. The music recommender needed careful tuning to avoid "always the same artist" bugs. Sentry and custom telemetry were necessary to catch silent failures.

But the payoff is autonomy. When a YouTube API change breaks music search, Lucky can adapt — or you can fork it and adapt yourself. There's no shutdown notice because there's no corporate sunset. For a tool a community depends on, that's worth the operational burden.

**Source:** [github.com/LucasSantana-Dev/Lucky](https://github.com/LucasSantana-Dev/Lucky) · Dashboard: [lucky.lucassantana.tech](https://lucky.lucassantana.tech)

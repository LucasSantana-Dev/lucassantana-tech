---
title: "Building a dev community from a single source of truth"
date: "2026-06-18"
description: "How Criativaria runs a Discord community, a website, and its tools from one markdown repository — lessons in content architecture and treating a community like production infrastructure."
---

Criativaria didn't start as a product. It started as a problem its founder, Maria Rita, couldn't ignore: the gap between someone trying to break into tech and the polished, expert-to-expert content already out there. Experts forget what it felt like to be new, so they write for people who already have the foundation — and everyone else feels shut out.

So a community was built around one mission: close that gap. Today Criativaria is a 4,000+ member Discord community with a growing library of guides — from Git fundamentals to career transitions to the myth that you need heavy math to code. I'm on the staff and in it daily, and underneath the community sits an architecture decision that makes the whole thing maintainable. That's the part I built, and the part worth writing about.

## The problem with multi-surface content

When you run a community, you want to be everywhere: Discord, the web, maybe LinkedIn too. But every surface wants to *own* the content. Discord threads get edited in Discord. The website gets updated separately. Someone asks a question, and you rewrite the same answer in three places. The surfaces diverge, content goes stale, and the community splits.

We needed a different approach.

## One repository, many destinations

Criativaria's answer is `forum-content`: a single source of truth. It's a Git repo holding the guides as Markdown + YAML frontmatter, each in its own folder with versioned history. The taxonomy is standardized — every guide declares its level (Básico, Intermediário, Avançado), its area (Back-End, Front-End, …), and its type. The schema is rigid. Boring, maybe. But boring scales.

From there, a one-way flow:

1. **A bot publishes to Discord.** A bot named Lucky reads the repo and idempotently syncs guides into the Discord channels. Edit a guide in the repo, and Lucky updates the thread. The Discord side never writes back — sync state lives in a database, not in Git.
2. **The site publishes to the web.** The Criativaria web app (Next.js) renders every guide from the repo as a page, updated on deploy.
3. **Tools consume the taxonomy.** Other tools read the content schema to surface guides by tag, build indexes, and so on.

No conflicts. No reconciliation. The repository is the record; everything else is a read-only mirror.

## Design decisions that matter

**Markdown over a CMS.** I could have built a database-backed CMS with a nice UI. Instead the guides live as `.md` files, because we want Git as the paper trail. Every edit is a commit — you can see when something changed, why, and who changed it; you can revert; you can branch. A database hides all of that.

**Copy at build time, not submodules.** The web app clones the content repo at a pinned ref during build rather than tracking a Git submodule. A pinned ref is clearer than Git chasing a submodule pointer. The build takes a little longer; worth it.

**Sync is write-once.** Lucky reads the repo and writes to Discord, never the reverse. That one-way flow eliminates a whole class of bugs — lost edits, merge conflicts between Discord and Git, divergent truth. It's a constraint that pays for itself.

**Taxonomy in YAML.** Machine-readable metadata in frontmatter means the web app can build indexes, show related guides, and filter by topic without parsing prose.

## What it enables

- **Async community contribution.** A guide idea starts as a GitHub issue, gets drafted in markdown, opens a PR, gets reviewed, merges, and Lucky syncs it — live everywhere within hours, with a full audit trail of who wrote it and why.
- **Decoupled hosting.** The bot runs on a server; the website is static. If the bot breaks, the site is still up. If the site goes down, people can still ask in Discord. No single point of failure.
- **Sustainable authorship.** The hardest part of running a community is keeping it fresh. With everything in Git and the sync automated, the friction of updating drops — you edit the source, and the mirrors update themselves.

There's also a small tool in the mix — a LinkedIn profile analyzer (Vite + React) that scores a profile across several categories — a prototype that hints at where the tooling could go once it's grounded in real demand: feeding recommendations back into the guides.

## The actual lesson

The technical pattern — single source of truth, write-once sync, versioned history — is nothing new. Infrastructure and config management have done it for years. But in *community building* I don't see it often enough. Most communities either live in Discord (ephemeral, unsearchable, no SEO) or build a custom site that siloes the content. Criativaria's move is simpler: treat the community like production infrastructure. One source of record, automated mirrors, audit trails, revertibility.

It doesn't feel like rocket science when you say it out loud. But it's rare enough that it's worth writing down.

If any of that resonates, come say hi in the community: [discord.com/criativaria](https://discord.com/criativaria).

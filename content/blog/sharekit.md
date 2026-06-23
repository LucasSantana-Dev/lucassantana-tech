---
title: "I built a one-command installer for my entire AI coding setup"
date: "2026-06-23"
description: "Dotfiles, but for AI coding agents — and what I learned about hooks, registries, and validating demand before building."
---

I rebuild my Claude Code setup on every new machine. CLAUDE.md, a folder of skills, my Cursor rules — all of it, by hand, every time. And when a friend asked "how's your setup configured?", the honest answer was a zip file and a 20-minute Slack thread.

We have `npm install` for code dependencies and a dotfiles repo for our shell. But there's nothing for the layer that's quietly become half my workflow: my *AI* config. So I built it. It's called **sharekit**, it's on npm, and this is what I learned making it.

```bash
npx @lucassantana/sharekit install <github-user>
```

That pulls a profile, shows you a diff, backs up anything it would overwrite, and applies it. One command. `rollback` undoes it.

## The model: dotfiles, but for AI agents

A "profile" is just a public GitHub repo named `sharekit-profile`. No accounts, no platform, no database. The repo mirrors your home directory by tool:

```
sharekit-profile/
├── sharekit.toml
├── claude/      -> ~/.claude/
├── cursor/      -> ~/.cursor/
└── shared/      -> ~/
```

`claude/**` lands in `~/.claude`, `cursor/**` in `~/.cursor`, `shared/**` in your home. That's the whole rule. It came from deleting a worse idea — my first version had an explicit allowlist of filenames (`CLAUDE.md`, `settings.json`, …), which was both more code *and* a silent bug: any new file in a profile just wouldn't install. The tree-mirror is one rule instead of a list, and it dropped the codebase from 9 files to 3.

## The decision I'm most glad I made: hooks never auto-install

Claude Code's `settings.json` can define **hooks** — shell commands that run on events. That's powerful, and it means "installing someone's config" is, in the general case, "running a stranger's shell on your machine."

So sharekit never installs hooks by default. If a profile contains a `settings.json` with hooks, it's flagged in the preview and **skipped**. You opt in explicitly with `--include-hooks`, and even then you get a second confirmation.

This is the kind of decision that's invisible when you get it right and a CVE when you get it wrong. "Convenient by default, dangerous on purpose" is the wrong trade for something that touches `~`.

The rest of the trust model is boring on purpose:

- **Preview before applying.** Every install shows the exact diff — new / changed / unchanged, with paths.
- **Everything is backed up.** Before a write, the originals go to `~/.sharekit/backups/<user>-<timestamp>/`.
- **Rollback restores them.** One command.

## GitHub is the registry

I deliberately didn't build a registry. There's no server to run, nothing to pay for, nothing to keep up. Discovery is just a GitHub search:

```bash
npx @lucassantana/sharekit search          # every published profile
npx @lucassantana/sharekit search react    # filter
```

Under the hood that's one call to the GitHub repo-search API for repos named `sharekit-profile`, filtered to exact matches. It's the oh-my-zsh / nvm / chezmoi pattern: the convention *is* the registry. There's a small static web directory too, which is the same search running client-side — no backend.

## The publishing saga (or: how I met OIDC)

I wanted CI to publish to npm. The naive path — store an npm token as a secret — kept failing with `EOTP` because my account uses WebAuthn (a passkey / Touch ID), and you can't exactly fingerprint-scan inside a GitHub Action.

The fix turned out to be **npm's OIDC trusted publishing**: you configure npm to trust a specific GitHub repo+workflow, and CI publishes with a short-lived token it mints at run time. No stored secret at all. If you're publishing from CI in 2026, this is the way — the "store a long-lived token" era is over.

(There were dumber lessons too. The bare name `sharekit` was taken on npm, so the package is scoped — `@lucassantana/sharekit`. And `npm info <name> | head -1` will happily report a taken name as "free"; `npm view <name> version` is the check that doesn't lie.)

## What I actually learned: it's a network problem, not a marketing problem

Here's the part worth more than the code.

A config-distribution tool is worth exactly as much as the number of profiles worth installing. On launch day there was exactly one — mine. No amount of "Show HN" fixes "there's only one thing to install." The growth lever isn't *demand* (installers), it's *supply* (publishers). Installers follow profiles, not the other way around.

That reframed everything. The valuable early move isn't a launch blitz — it's getting other people to publish their setups. The launch is what you do *after* there's something to browse, not before.

I almost skipped this lesson and went straight to broadcasting. I'm glad I didn't, because it connects to the thing I keep relearning: **validate before you build.** A number that measures how much people like a *form* (one-command installers are popular!) is not the same as appetite for *your* version of it. The only way to tell the difference is to ship the smallest real thing and watch what actually happens.

## Where it is now

It's a week old. My profile — CLAUDE.md, 65 skills, and a small file-based memory system — is basically the only one published, so the directory is honestly thin. I don't yet know whether "install someone's whole setup" is something people want, or whether everyone prefers to build their own from scratch. That's the main thing I'm hoping to find out.

If you want to poke at it:

```bash
npx @lucassantana/sharekit install LucasSantana-Dev
npx @lucassantana/sharekit search
```

Code's here, and it's small enough to read in a sitting: [github.com/LucasSantana-Dev/sharekit](https://github.com/LucasSantana-Dev/sharekit).

And if you've got a setup you're proud of — publish a `sharekit-profile` repo. I'd genuinely like to install yours.

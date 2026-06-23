---
title: "forgekit: rules, skills, and setup as portable code"
date: "2026-06-20"
description: "A unified toolkit for AI-assisted development across Claude Code, Cursor, Windsurf, and other agents — distributing rules, patterns, and skills instead of rebuilding from scratch."
---

I shipped forgekit to solve a real problem: every time I switched AI tools or started a new project, I was rewriting the same conventions, patterns, and guardrails from scratch.

The toolkit moves all of that — rules, portable skills, setup automation, and a catalog — into a monorepo that installs into Claude Code, Codex, Cursor, Windsurf, GitHub Copilot, and other agents. Once forgekit is installed, the agent starts with project conventions, workflow guardrails, and installable tooling from the first session.

## Why this exists

The problem forgekit solves is **portability with consistency**. When I opened a new AI editor, my agent had no context about my coding standards, my workflow expectations, or how I wanted it to handle testing, security, or shipping. I'd have to paste a multi-kilobyte instruction file into every prompt — or worse, work inconsistently across tools because I didn't set each one up the same way.

The first design choice was to stop treating AI rules as ephemeral session context. forgekit treats them as **code artifacts**: versioned, tested, reusable, and synced across tools the same way you'd sync configs in a monorepo. The rules live in files like `CLAUDE.md`, `.cursorrules`, and `AGENTS.md`. Copy them into a project, and your agent follows them.

## What's in it

- **Rules** — drop-in instruction files for each tool (`CLAUDE.md`, `.cursorrules`, `AGENTS.md`). One file per tool, same workflow philosophy.
- **Patterns** — tool-agnostic playbooks covering context building, task orchestration, code review, testing with AI, multi-model routing, memory systems, git worktrees, spec-driven development, and agent evals as CI. They explain the *why* and *when*, not just commands.
- **Portable skills** — reusable micro-workflows that teach the agent recurring tasks: `plan`, `orchestrate`, `dispatch`, `loop`, `secure`, `tdd`, `verify`, `route`. A skill is both a prompt template and a small state machine.
- **CLI** — `forge-kit` (TypeScript) browses the catalog, installs individual skills or agents, and wires MCP servers to your local gateway.
- **Web catalog** — an Astro app indexing all skills, agents, patterns, and MCP servers; searchable, filterable, and bilingual (English + Portuguese).
- **Setup scripts** — shell automation for new machines: bootstrap, provider auth, environment scaffolding, guided install.

## Design decisions

### 1. Portability over perfect fit

The hardest choice was *not* to build tool-specific superpowers. A `loop` skill works in Claude Code, Cursor, and Windsurf even though their runtimes differ. The skill describes the workflow — plan → implement → verify → review → secure → commit — and the agent adapts the implementation to each tool. No Claude-only features, no Cursor-only shortcuts. The trade-off: new tools use the same skills without waiting for a rewrite.

### 2. Rules as code, not docs

Instead of a 10,000-word guidance document, rules are short, immediately executable, and versioned with the project. The agent reads `CLAUDE.md` on startup; changes are git commits, not Slack messages. This forced a painful edit — I cut a large fraction of the original rules to keep them under a page — but they got stronger, because every line had to justify its weight.

### 3. A single instruction surface per tool

Each tool reads one primary file. Not five files in a `.claude/` folder, not a chain of fallbacks. This is boring and it works: forgekit installs into a blank directory and the agent works immediately, with one source of truth and no confusion about which file wins.

### 4. Bilingual from day one

The monorepo ships rules, patterns, skills, and the catalog in both English and Portuguese, each catalog entry carrying a translated metadata block. That meant building a reconciliation step to catch drift between the two — adding a skill in English stubs the Portuguese version automatically.

## Where it is now

Version 0.29.1. The core is stable — rules, patterns, skills, CLI, and web catalog all work — and the toolkit installs cleanly into Claude Code, Codex, Cursor, Windsurf, GitHub Copilot, and Gemini. Active work is on the catalog system: moving from ad-hoc YAML to a validated JSON schema, adding collections so curated skill groups install as a unit, and wiring the CLI to install directly from the web UI.

The honest limitation: forgekit teaches AI agents how to *work*, not how to *reason*. It gives them safer guardrails and clearer workflows, but it doesn't improve the underlying model. If the tool itself is weak, forgekit can't fix that.

## Try it

Start with a rule file — thirty seconds:

```bash
git clone https://github.com/LucasSantana-Dev/forgekit.git
cp forgekit/packages/core/rules/CLAUDE.md ~/my-project/
```

Open your agent in `~/my-project/` and it follows your conventions. For the full toolkit:

```bash
FORGE_KIT_DIR=./packages/core/kit sh packages/core/kit/install.sh --profile standard
```

The installer detects your tools and installs the skills, rules, and MCP configs.

[github.com/LucasSantana-Dev/forgekit](https://github.com/LucasSantana-Dev/forgekit)

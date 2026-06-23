---
title: "Running self-hosted infra like production"
date: "2026-06-14"
description: "A homelab isn't just containers — it's a deployed system that needs safe deploys, drift control, and observability. Here's what I learned building one."
---

A homelab lives in an awkward place. It's not production — no SLAs, no paying customers — but it *is* your production: your DNS, your authentication, your home automation. It can't just be a shell script and a hope.

Over the last few months I've been building [homelab-manager](https://github.com/LucasSantana-Dev/homelab) — a toolkit for running self-hosted Docker infrastructure the way you'd run production: safe deploys, drift detection, observability. It's not a generalized orchestrator or yet another Docker UI. It's a set of deliberate, tested choices that turned chaos into confidence.

## The problem I started with

The failure was mundane: production running **v2.5.1** while the repo had shipped **v2.7.0**. Weeks of drift, silent.

Digging in, I found three independent gaps:

1. **No visibility into what was actually running.** Nothing compared the deployed version to the latest release.
2. **The deploy command was broken in subtle ways.** `make deploy` would fail on environment-variable mismatches CI couldn't see (the host `.env` is git-ignored for security). It also didn't rebuild the application code even when the Dockerfile changed — a silent correctness bug.
3. **The host had become a dev environment.** Config was edited directly on the server, sometimes committed via a PR, sometimes not. The repo and the host were slowly diverging.

Auto-deploy would have made this *worse*, not better — it would have hit the same broken gate and silently applied broken config.

## What I built

The core insight: **the problem is a broken feedback loop, not missing automation.** So I started with observability, not automation.

### Drift detection

A Prometheus exporter runs on the host every 5 minutes, comparing the running version (from the manager's health endpoint), the latest semver tag in git, and the time since the last successful deploy. If drift exceeds 7 days, Alertmanager fires and Discord notifies. The exporter has a meta-healthcheck — if the exporter itself dies, that's visible too. Silent failure at the monitoring layer can't happen again.

### Safe deploys via git-first config

Config changes have a single source of truth: the release branch. The workflow is make a change on the laptop → open a PR → merge → SSH to the host and run `make deploy`. Before deploy, a pre-flight gate runs:

```bash
if git diff --quiet HEAD -- '*.yml' '*.yaml' '*.toml' homelab_manager/ config/; then
    docker compose up -d --build        # clean — proceed
else
    echo "❌ Host has local modifications"; exit 1   # dirty — block + list the diff
fi
```

Local modifications block the deploy and list exactly which files differ. In an emergency `DEPLOY_FORCE=1 make deploy` is allowed — but it logs the override with a timestamp, and the next release reviews those logs. Accountability, not handcuffs.

### Health-gated deploys

`docker compose up -d` doesn't guarantee the services actually came up. A post-deploy health check queries each service's healthcheck endpoint; if a service doesn't respond within the window, the deploy fails and rolls back to the previously-deployed image digests (captured before the update). This caught a real issue: a Caddyfile that docker-compose validated as syntactically fine but the service rejected at startup. Without the gate, the deploy would have "succeeded" and traffic would have stopped.

## The design decisions

**No auto-deploy, only observability.** I considered tag-push auto-deploy many times. A single-operator, single-host homelab doesn't need it — the drift alert is faster (failures visible the next morning) and safer (the operator reviews changes in the PR before deploying). The gate to revisit is written up as an ADR: *if* the operator is unavailable for >7 consecutive days with undeployed releases, *then* build it. Until then, the deliberate model wins.

**Local build, not registry push.** Every other service uses pre-built images; the manager is built locally at deploy time. The build takes seconds on the host. Building in CI, pushing to a registry, then pulling on the host would add minutes per deploy for no gain on a single host — and keeps registry credentials off the box. If I add a second host, the calculus flips.

**Git-tracked config over templating.** Early proposals included an `override.local.yml` and Ansible-style templating. Both rejected: the host is small and homogeneous, and all config already lives in the repo. The rule stays simple — *tracked files come from git, nothing else* — and the escape hatch gets added only when a genuinely host-only config actually appears.

## Where it is now

The homelab runs ~20 services — Grafana, Prometheus, Pi-hole, Home Assistant, Nextcloud, Paperless, and others. The manager deploys them, health-checks them, and reports drift. The git-first flow and dirty-file gate prevent silent divergence; alerts catch staleness before it becomes an outage.

It's not finished — there's always more instrumentation and resilience testing. But it's not fragile either: breaking it takes deliberate action, not a missed step.

[github.com/LucasSantana-Dev/homelab](https://github.com/LucasSantana-Dev/homelab)

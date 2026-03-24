# CLAUDE.md — Root Context

> This file is the entry point for Claude Code and Codex when working inside a client-site-template repo. Read it first. Read descendant CLAUDE.md files when you enter their directories.

## What this repo is

A Docusaurus 3 static site that serves as a single client's navigable knowledge base. It is generated from the `client-site-template` in the TKB-Strategies GitHub org and provisioned automatically when an engagement intake form is submitted. Each repo maps to one engagement and deploys to `clientname.tkbstrategies.com`.

TKB Strategies is a liberation-centered organizational development and executive coaching practice. Everything you build here should reflect that orientation — language that centers the humanity of the people being served, not institutional abstractions.

## Design source of truth

The OpenStrategies site CSS is the canonical design reference — not a written spec. When in doubt about spacing, color usage, component patterns, or layout behavior, read the source. The design system lives in the styles, not beside them.

## Typography

- **Headlines:** DM Serif Display (Google Fonts)
- **Body:** Lato (Google Fonts)
- Do not substitute. Do not add fallback display fonts beyond system sans-serif.

## Color architecture

The palette has two layers:

1. **Warm structural palette (fixed):** These earth tones — warm cream backgrounds, deep charcoal text, muted terracotta accents — are the TKB design identity. They do not change per client.
2. **Client accent colors (configurable):** Pulled from `client.json` at build time. Used for primary buttons, active nav highlights, and hero accents. These are the client's brand colors, set during intake.

Never hardcode client accent values in CSS. Always reference the custom properties generated from `client.json`.

## Key constraints

- **Node 20.** Do not use APIs or dependencies that require Node 22+.
- **Yarn** for package management. No npm lockfiles.
- **No hardcoded client data.** Names, colors, logos, phase labels, roster entries — all flow from `client.json` or synced Google Drive content. If you're typing a client's name into a source file, you're doing it wrong.
- **Sidebar rules:** Navigation structure is defined by engagement type (see `client.json` → `engagementType`). Coaching engagements get phase folders plus a Cohort section. Org consulting gets phase folders with deliverable listings. Retainers get monthly folders. The sidebar config generator reads `client.json` and produces `sidebars.js` — do not hand-edit sidebar structure.
- **Footer:** Always includes "Powered by TKB Strategies." This is the only TKB-branded element on client-facing pages.
- **Build target:** GitHub Actions on push to main → Docusaurus build → FTP deploy to cPanel. The workflow file is `.github/workflows/deploy.yml`. Do not add additional deploy targets.

## File sync behavior

Content arrives from Google Drive via Apps Script polling (1–5 min cycle). The sync converts:

- Google Docs → Markdown
- Google Sheets → JSON
- Google Slides → PDF
- Everything else → static passthrough

You will see commits from the sync bot. Do not reformat or restructure synced files — the next poll cycle will overwrite your changes. If content structure needs to change, change it in Drive.

## Internal vs. published

The `_config/internal/` directory contains coach-only materials (Coach's Map, hypotheses, guardrails). This content is git-tracked but **never rendered to the site**. The Docusaurus config excludes `_config/internal/` from the build. Do not create routes or links to internal files.

## Engagement types

The `engagementType` field in `client.json` determines folder structure, nav layout, and default phases:

| Type | Default phases | Folder pattern |
|------|---------------|----------------|
| `cohort-coaching` | Stabilize / Name / Structure / Practice / Sustain | Phase folders + `cohort/` |
| `grounded-growth` | Listen / Distill / Co-design / Sustain | Phase folders |
| `org-consulting` | Custom from proposal | Phase folders |
| `workshop-retreat` | Pre-work / Facilitation / Follow-up | Phase folders |
| `retainer-advisory` | None | Monthly (`YYYY-MM/`) |

## When you're unsure

Read the source. Match what's already here. The codebase is the spec.

# Client Engagement Template

A Docusaurus 3 site template for TKB Strategies client engagements. Each clone becomes a private, navigable knowledge base deployed to `{slug}.tkbstrategies.com`.

## Quick start

```bash
nvm use 20
yarn install
yarn start
```

## Configuration

All client-specific data lives in `client.json`. No hardcoded client data in source files.

## Files

### Configuration
- `client.json` — engagement config (org name, colors, phases, contract terms)
- `docusaurus.config.ts` — reads from client.json
- `sidebars.ts` — dynamic sidebar from client.json engagement type
- `tsconfig.json` — TypeScript config with resolveJsonModule
- `.nvmrc` — Node 20

### Design system
- `src/css/custom.css` — adapted from OpenStrategies with light/dark themes, client color overrides, coaching spine badges

### Content
- `docs/intro.md` — Welcome page (serves as `/`)
- `docs/01-stabilize/` through `docs/05-sustain/` — coaching spine phases
- `docs/cohort/` — per-coachee profiles and session notes
- `docs/tools-assessments/` — frameworks and instruments

### Templates (not published)
- `templates/coaching-profile.md` — coachee profile page template
- `templates/session-note.md` — session note template

### AI context
- `CLAUDE.md` — root, docs/, docs/cohort/, templates/, static/
- `AGENTS.md` — Codex agent prompt

### Deployment
- `.github/workflows/deploy.yml` — GitHub Actions: Yarn → build → FTP deploy

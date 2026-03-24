# Client Engagement Template

A Docusaurus 3 site template for client engagement knowledge bases. Each clone becomes a private, navigable documentation site for a single engagement. Configure deployment in `.github/workflows/deploy.yml`.

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
- `src/css/custom.css` — light/dark themes, client color overrides via CSS custom properties, coaching spine badges

### Content
- `docs/intro.md` — Welcome page (serves as `/`)
- `docs/01-*/` through `docs/05-*/` — engagement phases (rename to match your methodology)
- `docs/cohort/` — per-participant profiles and session notes (coaching engagements)
- `docs/tools-assessments/` — frameworks and instruments

### Templates (not published)
- `templates/coaching-profile.md` — participant profile page template
- `templates/session-note.md` — session note template

### AI context
- `CLAUDE.md` — root, docs/, docs/cohort/, templates/, static/
- `AGENTS.md` — Codex agent prompt

### Deployment
- `.github/workflows/deploy.yml` — GitHub Actions: Yarn → build → FTP deploy
  - Set `FTP_HOST`, `FTP_USER`, `FTP_PASS` as GitHub Actions secrets
  - Modify this file to use a different deployment target

## Customization

1. Edit `client.json` — set `orgName`, `slug`, `primaryColor`, `secondaryColor`, `siteUrl`, `tagline`, `phases`
2. Replace phase content in `docs/01-*/` through `docs/05-*/` with your methodology
3. Update the footer in `docusaurus.config.ts` if needed
4. Drop in a `static/img/client-logo.svg` and set `logoPath` in `client.json`

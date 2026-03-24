# AGENTS.md — Codex Agent Prompt

You are building a Docusaurus 3 client engagement template for TKB Strategies, a liberation-centered organizational development and executive coaching practice.

## Context

- The project is at `/home/tboat/projects/client-template/`
- A vanilla Docusaurus 3 scaffold (TypeScript, classic preset) is installed and builds clean
- Node.js 20 LTS and Yarn 1.x are the runtime and package manager
- **Do not run any terminal commands.** No yarn, npm, npx, or shell commands. Only create and edit files. The developer handles all installs and builds locally.

## Source of Truth: OpenStrategies

The design system for this template comes from the existing TKB Strategies public site at:

**`/home/tboat/projects/tkb-strategies/site/`**

This is a live Docusaurus site deployed at `tkb-strategies.github.io/OpenStrategies`. It has an editorial, impact-report aesthetic that this template must match.

**Before writing any code, read these files from the OpenStrategies project:**

1. `/home/tboat/projects/tkb-strategies/site/src/css/custom.css` — the complete design system: colors, typography, spacing, component styling
2. `/home/tboat/projects/tkb-strategies/site/docusaurus.config.js` — site configuration, navbar, footer, theme settings
3. `/home/tboat/projects/tkb-strategies/site/src/pages/index.js` — landing page structure and component patterns
4. `/home/tboat/projects/tkb-strategies/site/sidebars.js` — sidebar configuration pattern

Extract from these files:
- All CSS custom properties and color tokens
- Typography families, weights, and scale
- Heading styles, spacing rules, and decorative treatments (underlines, borders)
- Sidebar styling: background, active states, hover states, category treatment
- Navbar styling: background, link treatment, logo placement
- Footer styling: background, text treatment, link patterns
- Blockquote, table, code block, and horizontal rule styling
- Any transition/animation patterns
- The overall warm editorial tone of the visual design

Then adapt that design system for this client template. The adaptation means:
- Same typography (families, weights, scale, heading treatments)
- Same warm palette as the base — but accent colors become configurable via `client.json`
- Same sidebar, navbar, footer, and content area styling patterns
- Same editorial tone and component feel
- Add a dark mode option that inverts the palette while preserving the editorial character
- Add coaching-specific components (spine badges, engagement data display)

---

## What You Are Building

A **template repository** cloned for every new client engagement. Each clone receives a `client.json` file from an automated pipeline. The template must be fully configurable from `client.json` — no hardcoded client data.

Each client site deploys to `{slug}.tkbstrategies.com` via GitHub Actions → FTP → Namecheap cPanel. The public methodology lives separately at `tkb-strategies.github.io/OpenStrategies`. This template is for **private client deliverables**.

The end product is an **editorial knowledge base** that looks and feels like a sibling of the OpenStrategies site — same typographic DNA, same warmth, same professionalism — but configured for a specific client engagement.

The template supports these engagement types without modification:

| Type | Sidebar Pattern | Content Structure |
|------|----------------|-------------------|
| Cohort coaching | Phase categories + Cohort section with per-coachee profiles | 5-phase coaching spine folders + cohort/ |
| Individual coaching | Phase categories | 5-phase coaching spine folders |
| Grounded Growth | Custom phases (Listen / Distill / Co-design / Sustain) | Custom phase folders |
| Org consulting | Custom phases from proposal | Custom phase folders |
| Workshop / retreat | Pre-work / Facilitation / Follow-up | 3-phase folders |
| Retainer / advisory | Monthly categories (YYYY-MM) | Chronological folders |

---

## Design System

### Typography

Extracted from the OpenStrategies `custom.css`. The exact same families and roles:

| Role | Family | Usage |
|------|--------|-------|
| Headlines | `'DM Serif Display', serif` | All headings, section titles, coachee names, blockquote text |
| Body / UI | `'Lato', sans-serif` | Body text, sidebar, nav, paragraphs, UI elements |

Import via Google Fonts in `src/css/custom.css`. Match the exact weights used in OpenStrategies.

**Typography rules (match OpenStrategies):**
- Heading weight and style: replicate exactly from the source CSS
- Body text size, line-height, and color: replicate from the source
- Any decorative heading treatments (gold underlines on h2, border-bottom patterns): replicate

### Color System

**Light theme (default):** Extract the full color palette from OpenStrategies `custom.css`. This includes:
- Background colors (the warm parchment/cream tones)
- Text colors (the slate/dark tones)
- Primary accent (the gold/amber used for active states, links, highlights)
- Secondary accent (any teal, blue, or supporting color)
- Border colors
- Sidebar background
- Navbar background
- Footer background (the dark section)

Map the OpenStrategies colors to Docusaurus `--ifm-*` variables AND custom `--tkb-*` variables.

**Client color override:** The `primaryColor` and `secondaryColor` in `client.json` should override the accent colors only. The background palette, text colors, and overall warmth stay constant — that's the TKB brand layer.

**Dark theme (optional toggle):** Create a dark mode that:
- Uses deep dark backgrounds (#0D0F14, #141820, #1A1F2B, #1F2535)
- Uses warm cream text (#F2EDE4)
- Keeps the same accent colors but adjusted for dark backgrounds
- Maintains the editorial character — not a generic Docusaurus dark mode
- Includes a subtle noise texture overlay for tactile depth:
  ```css
  [data-theme='dark'] body::after {
    content: '';
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.02;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  }
  ```

### Theme Config

```ts
colorMode: {
  defaultMode: 'light',
  disableSwitch: false,
  respectPrefersColorScheme: true,
},
```

### Coaching-Specific Components

These are additions not found in OpenStrategies:

**Spine badges** — small pill indicators for coaching phases. Use Lato (not a monospace font — stay consistent with the OpenStrategies type system):

```css
.spine-badge {
  display: inline-block;
  padding: 3px 12px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 700;
  font-family: 'Lato', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
```

Style the badge colors to harmonize with the OpenStrategies palette in light mode, and adjust for dark mode.

### Readability Requirements

This is a knowledge base people read regularly, not a landing page visited once. Prioritize legibility:

- Base font size: at least 17px (not smaller)
- Body line-height: at least 1.75
- Sidebar link text: at least 0.9rem with comfortable padding
- Navbar text: at least 0.85rem
- Don't shrink any text below 0.7rem anywhere on the site
- Content area max-width: ~780px for comfortable reading
- Generous spacing between sections (margin-top on h2: at least 2.5rem)

---

## Required Output

### Configuration
- `client.json` — engagement configuration (see structure below)
- `docusaurus.config.ts` — reads from client.json, mirrors OpenStrategies patterns
- `sidebars.ts` — dynamic sidebar from client.json
- `tsconfig.json` — `resolveJsonModule: true`
- `.nvmrc` — `20`

### Design system
- `src/css/custom.css` — adapted from OpenStrategies with light/dark themes, client color overrides, coaching components

### Content
- `docs/intro.md` — Welcome page at `/`
- `docs/01-stabilize/index.md` through `docs/05-sustain/index.md`
- `docs/cohort/index.md`
- `docs/tools-assessments/index.md`
- Delete: `blog/`, tutorial dirs, default scaffold docs, `src/pages/index.tsx`

### Templates (not published)
- `templates/coaching-profile.md`
- `templates/session-note.md`

### AI context
- `CLAUDE.md` at root, `docs/`, `docs/cohort/`, `templates/`, `static/`

### Deployment
- `.github/workflows/deploy.yml` — Yarn, Node 20, FTP
- `README.md`

---

## client.json Structure

```json
{
  "orgName": "Example Organization",
  "slug": "example-org",
  "primaryContact": "Jane Doe",
  "primaryColor": "#D4920B",
  "secondaryColor": "#345168",
  "logoPath": "/img/logo.svg",
  "tagline": "Powered by TKB Strategies",
  "engagementType": "cohort-coaching",
  "engagementScope": "cohort",
  "clientPathway": "org-contracted-coaching",
  "phases": [
    { "id": "01", "label": "Stabilize", "slug": "stabilize" },
    { "id": "02", "label": "Name", "slug": "name" },
    { "id": "03", "label": "Structure", "slug": "structure" },
    { "id": "04", "label": "Practice", "slug": "practice" },
    { "id": "05", "label": "Sustain", "slug": "sustain" }
  ],
  "components": [],
  "frameworks": [],
  "tools": [],
  "contractTerms": {
    "duration": "6 months",
    "pricingModel": "hourly-x-sessions",
    "rate": 125,
    "totalHours": 54,
    "totalValue": 6750,
    "sessions": 36,
    "participants": 9,
    "paymentSchedule": "monthly"
  }
}
```

Note: `primaryColor` defaults to the OpenStrategies gold. `secondaryColor` defaults to the slate blue. These override accent colors only — backgrounds and text stay in the TKB warm palette.

---

## Implementation Notes

**Routing:** `routeBasePath: '/'` in docs config. Delete `src/pages/index.tsx`. No blog (`blog: false`).

**Sidebar:** Every autogenerated category needs `link: { type: 'generated-index' }`. Cohort section conditional on coaching engagement types.

**Deprecation:** `onBrokenMarkdownLinks` goes in `markdown.hooks`.

**Placeholders:** No underscore-prefixed filenames.

**Edit link:** Set `editUrl: undefined` — client sites should not expose repo links.

**Remove any secondary navigation panel** that overlaps with the sidebar. The sidebar is the only navigation. The welcome page should use editorial prose and a simple table for engagement data, not a competing nav widget.

**Deploy:** Yarn, `yarn install --frozen-lockfile`, Node 20, FTP secrets per-repo.

---

## Process

1. **Read the OpenStrategies source files** listed above. Extract every CSS custom property, every color value, every typography rule, every component style. Understand the design system before changing anything in this project.

2. **Read the current client-template scaffold.** Understand what exists, what needs to be removed, and what needs to be added.

3. **Strip the defaults.** Delete `src/pages/index.tsx`, `blog/`, tutorial docs. Rewrite `docs/intro.md` as the Welcome page.

4. **Create `client.json`** and update `docusaurus.config.ts` — title, tagline, URL from client.json. Fix deprecation. Set `routeBasePath: '/'`, `blog: false`, dark mode toggle enabled, `editUrl: undefined`. Update footer.

5. **Build the design system** in `src/css/custom.css`. Start with the OpenStrategies CSS as the foundation. Adapt it:
   - Add `--tkb-*` custom properties for the background/text/border tokens
   - Map OpenStrategies colors to `--ifm-*` variables
   - Add the full `[data-theme='dark']` block
   - Add spine badge styles for both themes
   - Ensure all font sizes meet the readability requirements
   - Add the dark-mode-only noise texture

6. **Create phase directories** with `index.md` files.

7. **Rewrite `sidebars.ts`** — dynamic from client.json.

8. **Create templates/** with coaching-profile.md and session-note.md.

9. **Create CLAUDE.md files** at all directory levels.

10. **Create deploy workflow** and README.

After completing all steps, list every file created or modified at the top of README.md.

---

## Content Guidelines

- Human-centered language rooted in liberation
- Strengths-based framing
- "Boundaries are a form of care"
- Name systems, not symptoms
- Warm, direct, mission-oriented tone
- The knowledge base is a gift the client walks away owning

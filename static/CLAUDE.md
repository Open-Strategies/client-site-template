# CLAUDE.md — static/

> Asset and branding context. Read the root CLAUDE.md first.

## What lives here

Static assets served by Docusaurus without processing: images, fonts, downloadable files, and the client's logo. Everything in `static/` is copied as-is to the site root at build time.

## Branding model

Client sites use a **hybrid branding model** with two layers:

### Client branding (primary)

The client's visual identity is the dominant presence. Their logo appears in the navbar. Their brand colors are the accent palette. The site feels like *their* space.

Assets sourced from `client.json`:

- `logoUrl` — path to the client's logo (stored here as `static/img/client-logo.png` or `.svg`)
- `primaryColor` — client's primary brand color
- `secondaryColor` — client's secondary brand color (optional)

### Template design system (underneath)

The template provides the bones: typography (DM Serif Display + Lato), warm earth-tone palette, spacing rhythm, and component patterns. This layer is invisible to the client — it just makes the site feel well-crafted.

The footer is configurable via `client.json` → `tagline`. Update it to reflect your organization's branding.

## Asset directory structure

```
static/
  img/
    client-logo.png       ← client's primary logo
    client-logo-dark.png  ← dark mode variant (if provided)
    org-wordmark.svg      ← optional footer mark (small, understated)
    favicon.ico           ← generated from client logo
  fonts/                  ← only if self-hosting (prefer Google Fonts CDN)
  downloads/              ← PDFs, slide exports, other downloadable deliverables
```

## Logo handling

### Client logo

- Accepted formats: SVG (preferred), PNG with transparent background.
- Maximum rendered height in navbar: 40px. Provide an asset that looks sharp at this size.
- If the client provides only a light-background logo, do not invert it for dark mode — instead, add a subtle background pill or ask for a dark-mode variant.

### Dark mode

If the client provides a dark-mode logo variant, store it as `client-logo-dark.png` (or `.svg`). The Docusaurus theme config references both:

```js
themeConfig: {
  navbar: {
    logo: {
      alt: '{{org_name}}',
      src: 'img/client-logo.png',
      srcDark: 'img/client-logo-dark.png',
    },
  },
}
```

If no dark variant is provided, use the single logo for both modes.

### Organization wordmark (optional)

If including a footer wordmark for your organization, store it as `org-wordmark.svg`. It should be:

- Small (rendered at ~16px height)
- Single color (uses the muted text color from the warm palette)
- Linked to your organization's website (configure in `docusaurus.config.ts`)

## Favicon

Generate a favicon from the client's logo during provisioning. Use a simple crop or lettermark — do not use your organization's logo as a favicon on client sites.

## What not to include

- **No default Docusaurus images.** Remove `static/img/docusaurus.png`, the social card template, and any other stock Docusaurus assets from the template before first deploy. Client sites should ship clean.
- **No placeholder logos.** If the client hasn't provided a logo yet, leave the logo config empty (Docusaurus will display the site title as text). Do not use a "logo coming soon" image.
- **No practitioner logo in the navbar.** Your organization's branding belongs in the footer. The navbar belongs to the client.

## Adding assets

When adding new static assets:

1. Use descriptive, lowercase, hyphenated filenames: `community-care-assessment.pdf`, not `CCA_FINAL_v3 (2).pdf`.
2. Optimize images before committing. PNGs through a lossless compressor, SVGs cleaned of editor metadata.
3. PDFs exported from slide decks arrive via the sync pipeline and land in the corresponding `docs/` phase folder under `downloads/`, not here. Only place manually curated assets in `static/`.
4. Do not commit assets larger than 5MB without considering whether they should be hosted elsewhere (e.g., a CDN or the client's own infrastructure).

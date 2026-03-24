# CLAUDE.md — docs/

> Content authoring context. Read the root CLAUDE.md first.

## What lives here

All client-facing content rendered by Docusaurus. Every `.md` file in this tree becomes a page on the client's site. Content arrives here two ways:

1. **Synced from Google Drive** — the Apps Script polling cycle exports Docs as Markdown and commits them. These files have a sync comment at the top: `<!-- synced from Drive: {fileId} -->`. Do not restructure synced files; the next cycle overwrites local changes.
2. **Template-generated** — scaffolded during provisioning from `templates/`. These are meant to be edited (in Drive, which then syncs back).

## Folder patterns by engagement type

Structure follows the engagement type set in `client.json`:

### Cohort coaching
```
docs/
  01-stabilize/
  02-name/
  03-structure/
  04-practice/
  05-sustain/
  cohort/          ← see docs/cohort/CLAUDE.md
  tools-assessments/
```

### Grounded Growth
```
docs/
  01-listen/
  02-distill/
  03-co-design/
  04-sustain/
  tools-assessments/
```

### Org consulting
```
docs/
  01-{custom-phase-slug}/
  02-{custom-phase-slug}/
  ...
  tools-assessments/
```

### Workshop / retreat
```
docs/
  01-pre-work/
  02-facilitation/
  03-follow-up/
  tools-assessments/
```

### Retainer / advisory
```
docs/
  2026-01/
  2026-02/
  ...
  tools-assessments/
```

## Frontmatter requirements

Every content page must include frontmatter. At minimum:

```yaml
---
title: "Page title"
sidebar_position: 1
---
```

Phase landing pages add:

```yaml
---
title: "Phase 1: Stabilize"
sidebar_position: 1
description: "Reduce emotional charge. Ground the work."
phase: stabilize
---
```

Coachee profile pages add:

```yaml
---
title: "First Last"
sidebar_position: 1
coachee_slug: first-last
spine_location: stabilize
status: active
---
```

## Voice guidelines

This is a liberation-centered practice. Content should:

- **Center people, not processes.** Say "the person you're coaching" not "the coachee resource." Say "the team navigating this transition" not "the client organization."
- **Use active, grounded language.** Prefer concrete verbs. "Notice what's shifting" over "an assessment of transitional dynamics."
- **Hold complexity without jargon.** The coaching frameworks are sophisticated — the language describing them should be accessible to anyone the work touches.
- **Name power dynamics when relevant.** If a tool or framework exists because traditional approaches excluded or harmed people, say so. Context matters.
- **Avoid deficit framing.** People are not broken systems to be fixed. They are whole humans navigating real conditions. Language should reflect that.

## Pipeline sync behavior

| Drive file type | Exported as | Notes |
|----------------|-------------|-------|
| Google Doc | Markdown (`.md`) | Native export via `text/x-markdown` MIME |
| Google Sheet | JSON (`.json`) | Via Sheets API, used for structured data |
| Google Slides | PDF (`.pdf`) | Placed in corresponding folder as static asset |
| Other (Canva, Word, PDF) | Passthrough | Copied as-is into the matching path |

The sync maps Drive folder paths to `docs/` paths. A Doc in `02-name/session-notes/` in Drive becomes `docs/02-name/session-notes/{filename}.md` in the repo.

## Adding new content

If you need to create a new page (not synced from Drive):

1. Place it in the correct phase or section folder.
2. Include full frontmatter.
3. Follow the voice guidelines above.
4. Do not duplicate content that will arrive via sync — check the Drive folder structure first.

# CLAUDE.md — docs/cohort/

> Coaching cohort context. Read root CLAUDE.md and docs/CLAUDE.md first.

## What lives here

Per-participant profiles and session documentation for coaching engagements. Each participant gets a subdirectory named by slug: `cohort/{first-last}/`.

This directory only exists when `client.json` includes coaching as an engagement type or component.

## The coaching spine (example model — replace with your methodology)

This template ships with an example 5-phase developmental model. Replace or rename these phases in `client.json` to match your own methodology. The spine is not a rigid sequence — participants move through it based on readiness, not timelines.

| Phase | Purpose | Coaching posture |
|-------|---------|-----------------|
| **1. Stabilize** | Reduce emotional charge | Slow, reflective, grounding |
| **2. Name** | See patterns, not problems | Pattern-spotter; externalizer |
| **3. Structure** | Clarity and containment | Values-to-structure translator |
| **4. Practice** | Confidence through use | Rehearsal partner; reality-tester |
| **5. Sustain** | Anchor identity | Stewardship; long-view |

To use your own phases: update the `phases` array in `client.json`, rename the `docs/0N-*/` folders to match, and update the frontmatter in each phase index file.

### Move-on indicators (example)

- **Stabilize → Name:** Affect settles; can observe rather than relive.
- **Name → Structure:** Describes without escalation; curiosity replaces judgment.
- **Structure → Practice:** Wants to try, not just understand.
- **Practice → Sustain:** Increased clarity; less residue after action.
- **Sustain → (completion):** Decisions feel values-aligned; growth is self-sustaining.

### Universal guardrails

These are practitioner-level diagnostic heuristics:

- If emotional charge is high → return to Stabilize.
- If everything feels relational → look for Structure.
- If they want tools immediately → check readiness.
- If you feel pulled to rescue → pause and externalize.

## Roster sheet integration

The participant roster is typically a spreadsheet that the sync pipeline reads to generate/update:

- `cohort/{slug}/index.md` — the participant's profile page
- `cohort/{slug}/sessions/` — directory for session notes

### What the roster controls

| Roster column | Site behavior |
|--------------|---------------|
| Name | Page title, nav label |
| Role | Displayed on profile |
| Spine location | Badge on profile, phase cross-reference |
| Status: Active | Appears in sidebar nav |
| Status: Archived | Removed from nav, page preserved |
| Assessment summary | Populates the "Starting Point" section of the profile |

### What the roster does NOT publish

- **Email** — stored in the sheet, never rendered to the site.
- **Notes** — practitioner-only column, never synced to the repo.

## Practitioner's Map

The Practitioner's Map is an internal diagnostic instrument. It lives in `_config/internal/`. It contains:

- Per-participant hypotheses about current phase location
- Session-over-session observations
- Flags and guardrail triggers

**This content is never published.** The `_config/internal/` path is excluded from the Docusaurus build. Do not create any route, link, or reference to it in published content.

## Privacy boundary

The line is simple:

| Content | Location | Published? |
|---------|----------|-----------|
| Participant profile (name, role, phase location, assessment summary) | `cohort/{slug}/index.md` | Yes |
| Session notes (what was explored, next steps) | `cohort/{slug}/sessions/` | Yes |
| Practitioner's Map (hypotheses, internal observations) | `_config/internal/` | **No** |
| Email addresses | Roster sheet only | **No** |
| Notes column | Roster sheet only | **No** |

When generating or editing participant content, respect this boundary absolutely. If you're uncertain whether something belongs in published content or internal notes, keep it internal.

## Per-participant directory structure

```
cohort/
  first-last/
    index.md          ← profile page (auto-generated from roster)
    sessions/
      2026-01-15.md   ← session notes (synced or template-generated)
      2026-02-12.md
```

## Adding a new participant

Do not manually create participant directories if a pipeline is configured — it creates them automatically from the roster. If you must scaffold one manually (e.g., for testing), follow the exact structure above and include all required frontmatter from the `coaching-profile.md` template.

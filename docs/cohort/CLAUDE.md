# CLAUDE.md — docs/cohort/

> Coaching cohort context. Read root CLAUDE.md and docs/CLAUDE.md first.

## What lives here

Per-coachee profiles and session documentation for coaching engagements (Pathways 1 and 3). Each coachee gets a subdirectory named by slug: `cohort/{first-last}/`.

This directory only exists when `client.json` includes coaching as an engagement type or component.

## The coaching spine

TKB Strategies uses a 5-phase developmental model. Every coachee has a current spine location tracked in the roster sheet. The spine is not a rigid sequence — people move through it based on readiness, not timelines.

| Phase | Purpose | Coaching posture |
|-------|---------|-----------------|
| **1. Stabilize** | Reduce emotional charge | Slow, reflective, grounding |
| **2. Name** | See patterns, not problems | Pattern-spotter; externalizer |
| **3. Structure** | Clarity and containment | Values-to-structure translator |
| **4. Practice** | Confidence through use | Rehearsal partner; reality-tester |
| **5. Sustain** | Anchor identity | Stewardship; long-view |

### Move-on indicators

- **Stabilize → Name:** Affect settles; can observe rather than relive.
- **Name → Structure:** Describes without escalation; curiosity replaces judgment.
- **Structure → Practice:** Wants to try, not just understand.
- **Practice → Sustain:** Increased clarity; less residue after action.
- **Sustain → (completion):** Boundaries feel right; values-aligned decisions.

### Universal guardrails

These are coach-level diagnostic heuristics. They appear on the site as part of the phase descriptions, framed accessibly:

- If emotional charge is high → return to Stabilize.
- If everything feels relational → look for Structure.
- If they want tools immediately → check readiness.
- If you feel pulled to rescue → pause and externalize.

## Roster sheet integration

The coachee roster is a Google Sheet that lives in the client's Drive folder. The Apps Script sync reads it and generates/updates:

- `cohort/{slug}/index.md` — the coachee's profile page
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
- **Notes** — coach-only column, never synced to the repo.

## Coach's Map

The Coach's Map is TKB's internal diagnostic instrument. It lives in `_config/internal/coaching-map.md` (or synced from Drive). It contains:

- Per-coachee hypotheses about where they are in the spine
- Session-over-session observations
- Flags and guardrail triggers

**This content is never published.** The `_config/internal/` path is excluded from the Docusaurus build. If you encounter a Coach's Map file, do not create any route, link, or reference to it in published content.

## Privacy boundary

The line is simple:

| Content | Location | Published? |
|---------|----------|-----------|
| Coachee profile (name, role, spine location, assessment summary) | `cohort/{slug}/index.md` | Yes |
| Session notes (what was explored, next steps) | `cohort/{slug}/sessions/` | Yes |
| Coach's Map (hypotheses, internal observations) | `_config/internal/` | **No** |
| Email addresses | Roster sheet only | **No** |
| Notes column | Roster sheet only | **No** |

When generating or editing coachee content, respect this boundary absolutely. If you're uncertain whether something belongs in published content or internal notes, keep it internal.

## Per-coachee directory structure

```
cohort/
  first-last/
    index.md          ← profile page (auto-generated from roster)
    sessions/
      2026-01-15.md   ← session notes (synced from Drive or template-generated)
      2026-02-12.md
```

## Adding a new coachee

Do not manually create coachee directories. The pipeline creates them when:

1. A new row appears in the roster sheet, or
2. A coaching assessment form response is submitted.

If you must scaffold one manually (e.g., for testing), follow the exact structure above and include all required frontmatter from the `coaching-profile.md` template.

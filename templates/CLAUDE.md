# CLAUDE.md — templates/

> Template authoring context. Read the root CLAUDE.md first.

## What lives here

Markdown and config templates used during engagement provisioning. When the pipeline creates a new client repo from `client-site-template`, these templates are copied into the appropriate locations and their placeholder variables are replaced with values from `client.json` and the roster sheet.

Templates are never rendered directly by Docusaurus. They are source material that becomes content.

## Current templates

### `coaching-profile.md`

Generates `docs/cohort/{slug}/index.md` — one per coachee.

**Placeholder variables:**

| Variable | Source | Renders as |
|----------|--------|-----------|
| `{{coachee_name}}` | Roster: Name column | Page title, heading |
| `{{coachee_role}}` | Roster: Role column | Subtitle line |
| `{{coachee_slug}}` | Generated from name | Frontmatter `coachee_slug`, folder name |
| `{{spine_location}}` | Roster: Spine location column | Badge, frontmatter field |
| `{{cadence}}` | Roster: Cadence column | Session rhythm line |
| `{{start_date}}` | Roster: Start date column | "Coaching since" line |
| `{{assessment_summary}}` | Roster: Assessment summary column | "Starting Point" section body |
| `{{status}}` | Roster: Status column | Frontmatter `status` field |

**Tone expectation:** Even the template text — the parts that aren't variables — should feel intentional and human. The profile page is the coachee's space. It should read like an introduction written with care, not a database record rendered as HTML. Placeholder text like "No assessment summary available" should be replaced with something like "Assessment pending — this section will be populated after your initial conversation."

### `session-note.md`

Generates `docs/cohort/{slug}/sessions/{date}.md` — one per coaching session.

**Placeholder variables:**

| Variable | Source | Renders as |
|----------|--------|-----------|
| `{{coachee_name}}` | Roster: Name column | Reference in heading |
| `{{session_date}}` | Session date (YYYY-MM-DD) | Title, frontmatter, filename |
| `{{session_number}}` | Sequential count | "Session N" label |
| `{{spine_location}}` | Roster: current value at time of session | Phase context note |
| `{{org_name}}` | `client.json`: orgName | Breadcrumb context |

**Sections (pre-structured, coach fills in Drive):**

- **What we explored** — narrative summary of the session
- **What's shifting** — observable movement, emerging patterns
- **Next time** — focus areas, follow-up commitments
- **Spine check** — current phase assessment (may trigger location update)

## Adding a new template

If the pipeline needs a new template (e.g., for a new engagement type or component):

1. Create the `.md` file in this directory.
2. Use `{{double_brace}}` syntax for all dynamic values.
3. Document every variable in this CLAUDE.md — name, source, and what it renders as.
4. Write the static text with the same voice guidelines from `docs/CLAUDE.md`: grounded, human-centered, accessible.
5. Test by running the provisioning function with a sample `client.json` to verify all variables resolve.

## Variable resolution

The Apps Script provisioning function handles variable replacement. The logic is:

1. Read template file.
2. For each `{{variable}}`, look up the value in `client.json` or the roster sheet row.
3. If a value is missing, insert a graceful default (never leave raw `{{brackets}}` in published content).
4. Write the resolved file to its destination path in `docs/`.

Graceful defaults should acknowledge the gap without looking broken. Examples:

- Missing role: "Role to be confirmed"
- Missing assessment summary: "Assessment pending — this section will update after your initial conversation."
- Missing cadence: "Session rhythm to be determined"

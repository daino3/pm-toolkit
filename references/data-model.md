# Common item model

Every surfaced object should map to these fields where applicable:

| Field | Meaning |
|---|---|
| id | Stable source identifier |
| item_type | project, task, roadmap, experiment, concept, collateral, email, date, goal, sprint |
| title | Human-readable title |
| status | Normalized status |
| health | green, yellow, red, unknown |
| priority | Numeric or categorical priority |
| owner | Responsible person |
| due_date | ISO date |
| updated_at | Source update timestamp |
| latest_update | Latest meaningful change |
| next_action | Concrete next step |
| blocker | Current blocker, if any |
| source_system | Jira, Sheets, Statsig, Gmail, Calendar, Glean, Snowflake, Docs |
| source_url | Deep link |
| parent_id | Related project/epic/goal |
| confidence | high, medium, low |
| metadata_json | Source-specific structured fields |

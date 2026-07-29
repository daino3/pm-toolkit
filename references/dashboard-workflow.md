# Dashboard workflow

1. Load Settings and the most recent BriefHistory snapshot.
2. Retrieve live connector data in parallel when possible.
3. Load persistent Sheets tabs.
4. Normalize to the common item model.
5. Deduplicate using source IDs, then URLs, then normalized title plus owner.
6. Compare against the prior snapshot and mark new, changed, stale, or completed.
7. Calculate health and urgency.
8. Rank attention items by: red health, overdue, due soon, blocked, decision required, changed since last refresh.
9. Persist a new snapshot only after successful retrieval.

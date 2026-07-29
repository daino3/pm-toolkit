---
name: pm-toolkit
description: Operate a product manager command center across projects, tasks, roadmap priorities, Jira concepts and collateral, Statsig experiments, Gmail, Calendar, Google Docs, Snowflake analytics, support tickets, Glean search, goals, PRDs, prototypes, and slide decks. Use when the user asks for a PM dashboard, morning brief, project or experiment status, roadmap updates, TODO management, sprint or goal progress, internal document discovery, analytics support, or generation of PM artifacts from connected company context.
---

# PM Toolkit

Use this skill as the orchestration layer for a PM operating system. Treat the Claude Artifact as the interactive browser prototype, Google Sheets as persistent state, and connected tools/MCP servers as sources of live company data.

## Operating principles

1. Retrieve before summarizing. Do not infer live status from stale conversation context when a connector can answer.
2. Normalize all retrieved work into the common item model in `references/data-model.md`.
3. Separate source facts from synthesis. Label assumptions, unresolved conflicts, and stale data.
4. Prefer PM-level tool calls over raw vendor API calls.
5. Require explicit confirmation before consequential writes or sends.
6. Preserve source links and identifiers in every dashboard item.
7. Keep briefs decision-oriented: what changed, why it matters, what is blocked, and what happens next.

## Default workflows

### Build the command-center dashboard

1. Read `references/dashboard-workflow.md`.
2. Retrieve active projects, roadmap items, open tasks, Jira concept/collateral tickets, running experiments, relevant emails, calendar dates, sprint goals, and annual goals.
3. Normalize and deduplicate items.
4. Calculate health using `references/project-health.md`.
5. Produce dashboard sections in this order:
   - Attention required
   - Today's priorities
   - In-flight projects
   - Experiments
   - Concept and collateral approvals
   - Upcoming dates
   - Goals and sprint progress
   - Recently completed
6. Add source links and last-refreshed timestamps.
7. When an Artifact is requested, use `assets/pm-toolkit-artifact.jsx` as the prototype and `references/google-sheets-schema.md` as its persistence contract.

### Produce a morning brief

Return:
- The five most important actions, ranked.
- Material changes since the last brief.
- Deadlines in the next 14 days.
- Projects or approvals at risk.
- Experiments ready for analysis or decision.
- Email threads requiring a response or decision.
- Goal progress that changed materially.

Do not list unchanged work unless it is approaching a deadline or remains blocked.

### Manage TODOs

Use the `Tasks` tab as the source of truth.

For reads, support active, completed, deferred, archived, and historical views.
For writes, preview the proposed row mutation and request confirmation before committing.
Never delete completed tasks; set status and completion timestamp so prior lists remain retrievable.

### Manage the roadmap

Use the `Roadmap` tab and preserve numeric rank.
When adding an item, collect or infer: title, problem, expected impact, confidence, effort, strategic alignment, owner, target period, dependencies, and source link.
Preview rank implications before writing.
Do not silently reorder existing items.
Use `references/prioritization-model.md` to explain ranking.

### Summarize Jira work

Treat Jira as the status authority for projects, concepts, collateral, epics, and tickets.
Include key, status, owner, updated date, target date, blockers, latest meaningful update, and URL.
Flag inconsistencies between Jira and other sources rather than choosing silently.

### Analyze Statsig experiments

Read `references/experiment-analysis.md`.
Retrieve hypothesis, status, start date, allocation, primary metric, guardrails, sample size, estimated impact, uncertainty, and decision criteria.
Do not call an experiment a winner solely because a metric is positive.
Distinguish directional, statistically conclusive, practically meaningful, and ready-to-ship.

### Use the analytics copilot

Read `references/analytics-guardrails.md`.
Search the approved catalog and stored SQL before generating a new query.
State the grain, population, timeframe, joins, exclusions, and metric definitions before execution.
Default to read-only queries and bounded date ranges.
Return query, result summary, caveats, and recommended next analysis.
Never expose sensitive row-level data when aggregates answer the question.

### Summarize support tickets

Cluster tickets into themes, quantify volume and trend, provide representative paraphrased examples, identify affected journeys, and connect themes to active projects or experiments.
Do not treat support volume alone as prevalence without noting sampling and channel bias.

### Find company documents

Use Glean or the available company-search connector first.
Rank by relevance, recency, authority, and proximity to the user's project.
Return concise summaries with source links; explicitly identify conflicting or outdated documents.

### Generate a PRD and prototype

Read `references/prd-prototype-workflow.md`.
Ground the PRD in retrieved project context, research, analytics, support themes, constraints, and decisions.
Use the included PRD structure.
Generate a prototype that demonstrates the highest-risk interaction or decision, not every screen.
Mark open questions and invented sample data.

### Generate a slide deck

Read `references/deck-workflow.md`.
Build the deck from the approved PRD and available designs.
Default narrative: context, problem, evidence, insight, proposal, experience, impact, risks, plan, decision needed.
Never imply a design or metric is approved unless a source says so.

### Track sprint and goal progress

Retrieve goals from the designated Google Doc and related Jira work.
For each goal, show target, current state, evidence, confidence, blockers, next milestone, and owner.
Calculate progress only when the underlying metric supports it; otherwise use milestone-based status and explain the basis.

## Write-safety policy

Require confirmation before:
- Creating, editing, ranking, or closing Jira items.
- Updating roadmap, task, sprint, or goal rows.
- Saving or scheduling SQL.
- Sending emails or publishing artifacts.
- Changing experiment configuration.

A valid confirmation preview must include the destination, exact fields changing, old value when available, new value, and reversibility.

## Artifact prototype

Use `assets/pm-toolkit-artifact.jsx` for a browser prototype. It includes dashboard navigation, mock records, TODO checkboxes, quick-add forms, roadmap ranking, experiment cards, and goal progress. Replace its mock adapter with the Google Sheets/MCP adapter described in `references/artifact-integration.md` when connecting live systems.

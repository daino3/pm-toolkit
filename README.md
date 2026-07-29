# PM Toolkit
> An AI-native Product Management Operating System for Claude + MCP + Google Workspace

---

# Overview

PM Toolkit is a unified AI operating system for Product Managers.

Instead of opening ten browser tabs every morning (Jira, Gmail, Statsig, Roadmap, Docs, Glean, Snowflake, Support dashboards...), PM Toolkit gives Claude a single interface to understand your entire product portfolio and act as an intelligent PM copilot.

The long-term vision is that **Claude becomes your Staff PM partner**, continuously aware of:

- what you're building
- what shipped
- what experiments are running
- what leadership is asking
- what customers are saying
- what your priorities are
- what is at risk
- what you should do next

The system combines:

- Claude Skills
- Claude Artifacts
- MCP Servers
- Google Workspace
- Jira
- Statsig
- Snowflake
- Glean
- Customer Support Systems
- Google Sheets

into one cohesive experience.

---

# Jobs To Be Done (JTBD)

The PM Toolkit exists to solve one problem:

> Give Product Managers one place where AI understands everything about their product portfolio.

Instead of AI being another chatbot...

...Claude should become an actual teammate.

The toolkit should minimize:

- context switching
- searching for documents
- remembering deadlines
- writing repetitive documents
- manually checking dashboards
- hunting for SQL
- status update meetings
- project management overhead

while maximizing:

- strategic thinking
- product quality
- execution speed
- visibility
- communication quality
- experimentation
- decision making

---

# Guiding Philosophy

The toolkit follows several principles.

## 1. AI First

Every workflow should assume Claude is the primary interface.

Instead of

> "Go open Jira"

Claude should simply know.

---

## 2. Single Source of Truth

Every object should exist once.

Projects.

Experiments.

Roadmap.

Tasks.

Goals.

Documents.

Everything links together.

---

## 3. Read > Think > Recommend > Confirm > Write

AI should never immediately modify company systems.

Instead:

Read

↓

Analyze

↓

Recommend

↓

Preview

↓

User confirms

↓

Write

---

## 4. Context is Everything

Every action should leverage all available context.

Example:

Creating a PRD should automatically know:

- roadmap priority
- project history
- previous designs
- related experiments
- customer feedback
- previous launches
- existing documentation

---

# Architecture

```
                    Claude
                       │
               PM Toolkit Skill
                       │
              MCP Integration Layer
                       │
──────────────────────────────────────────
│ Jira
│ Statsig
│ Snowflake
│ Gmail
│ Calendar
│ Drive
│ Google Docs
│ Google Sheets
│ Glean
│ Customer Support
──────────────────────────────────────────
```

The Skill orchestrates.

The MCP server executes.

The Artifact visualizes.

Google Sheets stores lightweight state.

---

# High Level Components

## 1. Dashboard

Morning command center.

Contains:

- projects
- launches
- blockers
- experiments
- deadlines
- goals
- tasks
- support alerts

---

## 2. Personal Task Manager

Persistent TODO list.

Features:

- checkboxes
- due dates
- priority
- linked projects
- archived tasks
- recurring tasks
- history

Storage:

Google Sheets

---

## 3. Roadmap

Maintains:

- initiatives
- priority
- stack ranking
- status
- owner
- links
- dependencies

Quick commands:

"Add roadmap item"

"Move to #3"

"Archive"

"Explain prioritization"

---

## 4. Project Health

Aggregates:

Jira

Docs

Experiments

Support

Emails

Calendar

into one health score.

Example:

🟢 Healthy

🟡 At Risk

🔴 Blocked

---

## 5. Concept & Collateral Tracker

Tracks:

Concept

↓

Internal Review

↓

Compliance

↓

Bank Review

↓

Collateral

↓

Launch

↓

Monitoring

---

## 6. Experiment Center

Connected to Statsig.

Displays:

- running experiments
- sample sizes
- significance
- estimated impact
- recommendations

Claude should summarize experiments instead of displaying raw metrics.

---

## 7. Analytics Copilot

Connects to Snowflake.

Should understand:

available tables

stored SQL

business metrics

common joins

data dictionary

Example:

> Show interchange losses by merchant category over the last 90 days.

Claude generates SQL automatically.

---

## 8. Documentation

Searches:

Google Docs

Confluence

Glean

Drive

Returns:

summary

key decisions

owners

relevant links

---

## 9. PRD Generator

Inputs:

roadmap item

requirements

designs

experiments

customer feedback

Output:

high quality PRD.

---

## 10. Prototype Generator

Produces interactive Claude Artifacts.

Future:

Figma export.

---

## 11. Slide Generator

Converts:

PRD

↓

Leadership deck

↓

Review deck

↓

Launch review

↓

Postmortem

Automatically.

---

## 12. Goal Tracker

Tracks:

Quarterly

Half

Annual

Personal

Team

Company

Displays progress over time.

---

# Supported Commands

## Dashboard

```
/pm dashboard
```

Morning overview.

---

## Brief

```
/pm morning
```

Summarizes:

emails

deadlines

projects

tasks

experiments

---

## Projects

```
/pm projects
```

---

## Tasks

```
/pm todo
```

```
/pm add-task
```

```
/pm complete-task
```

---

## Roadmap

```
/pm roadmap
```

```
/pm add-roadmap-item
```

```
/pm reprioritize
```

---

## Jira

```
/pm jira
```

```
/pm concept-status
```

```
/pm collateral-status
```

---

## Experiments

```
/pm experiments
```

```
/pm summarize experiment
```

---

## Analytics

```
/pm sql
```

```
/pm analyze
```

---

## Docs

```
/pm docs
```

```
/pm find
```

---

## PRDs

```
/pm create-prd
```

---

## Slides

```
/pm create-deck
```

---

## Goals

```
/pm goals
```

---

# Google Sheets Schema

Recommended tabs

```
Projects
Tasks
Roadmap
Goals
Experiments
Notes
Settings
```

Tasks

| Column |
|---------|
| ID |
| Title |
| Status |
| Priority |
| Due Date |
| Owner |
| Project |
| Created |
| Completed |

Projects

| Column |
|---------|
| ID |
| Name |
| Status |
| Health |
| Priority |
| Launch Date |
| Jira |
| Notes |

Roadmap

| Column |
|---------|
| Rank |
| Initiative |
| Status |
| Owner |
| Theme |
| Priority |
| Target Quarter |

---

# MCP Connectors

Current assumptions:

✅ Jira

✅ Gmail

✅ Calendar

✅ Drive

✅ Docs

✅ Glean

✅ Statsig

✅ Snowflake

✅ Customer Support

Future:

Slack

Linear

Figma

GitHub

Amplitude

Looker

Mode

Hex

Mixpanel

---

# Installation

## Requirements

Claude Desktop

or

Claude Web

with MCP enabled.

Google account.

Configured MCP server.

Google Sheets.

---

## Setup

### Step 1

Clone repository.

```
git clone ...
```

---

### Step 2

Install Skill.

```
/skills
```

Upload

```
skill.zip
```

---

### Step 3

Configure MCP.

Connect:

Jira

Statsig

Snowflake

Google

Glean

Support

---

### Step 4

Create Google Sheet.

Recommended tabs:

- Tasks
- Projects
- Roadmap
- Goals

---

### Step 5

Configure IDs inside Settings.

Example

```
ROADMAP_SHEET_ID

TASKS_SHEET_ID

GOALS_DOC_ID

ROADMAP_DOC_ID
```

---

# Development Philosophy

The toolkit should remain modular.

Avoid giant prompts.

Instead:

small reusable Skills

+

specialized MCP tools

+

simple UI

Claude should orchestrate.

MCP should execute.

---

# Future Roadmap

## V1

Dashboard

Tasks

Roadmap

Morning Brief

---

## V2

Jira Integration

Experiment Center

Goals

PRD Generator

---

## V3

Analytics Copilot

Support Summaries

Snowflake

---

## V4

Prototype Generator

Slides

Design Reviews

---

## V5

Autonomous PM

Daily planning

Risk detection

Automatic reminders

Suggested roadmap changes

Project health predictions

Leadership updates

Sprint retrospectives

Opportunity detection

---

# Contributing

Contributions should favor:

- reusable workflows
- small MCP tools
- deterministic behavior
- composable modules
- opinionated defaults
- minimal configuration
- strong documentation

Every new capability should answer:

1. Does this reduce PM work?
2. Can Claude perform this autonomously?
3. Does this eliminate context switching?
4. Is there already another tool doing this?
5. Can it be reused across multiple PM workflows?

---

# Long-Term Vision

The end goal is **not** to build another dashboard.

The goal is to build an AI-native Product Management Operating System where Claude understands the complete state of product development better than any single human.

The ideal interaction is no longer:

> "Where is that Jira ticket?"

Instead, it becomes:

> "Claude, what should I work on today?"

And Claude already knows the answer.

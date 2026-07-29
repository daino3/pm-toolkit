# Google Sheets persistence contract

Use one workbook named `PM Toolkit Data` with these tabs. Freeze row 1 and treat column names as API contracts.

## Tasks

`task_id,title,description,status,priority,project_id,owner,due_date,created_at,completed_at,deferred_until,source_system,source_url,tags,last_updated`

Allowed status: `todo,in_progress,blocked,deferred,completed,archived`.

## Roadmap

`roadmap_id,rank,title,problem,expected_impact,confidence,effort,strategic_alignment,owner,target_period,status,dependencies,source_url,created_at,last_updated`

Rank must be a unique positive integer among active items.

## Projects

`project_id,title,status,health,owner,target_date,latest_update,next_action,blocker,jira_key,jira_url,doc_url,last_updated`

## Experiments

`experiment_id,name,project_id,status,hypothesis,primary_metric,start_date,end_date,allocation,sample_size,estimated_impact,confidence,decision,statsig_url,last_updated`

## Approvals

`approval_id,type,title,jira_key,status,complexity,owner,submitted_date,internal_due_date,bank_submitted_date,target_launch_date,blocker,jira_url,last_updated`

Type is `concept` or `collateral`.

## Goals

`goal_id,title,period,owner,target,current_value,unit,progress_pct,status,confidence,next_milestone,blocker,source_url,last_updated`

## Dates

`date_id,title,date,date_type,project_id,owner,source_system,source_url,notes,last_updated`

## BriefHistory

`brief_id,generated_at,brief_type,summary_markdown,snapshot_json`

## Settings

`key,value,description,last_updated`

Suggested settings: workbook timezone, dashboard lookback days, upcoming-date horizon, stale-item days, default owner, and connector identifiers.

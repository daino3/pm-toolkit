# Artifact integration boundary

The included Artifact source defaults to in-memory mock data so it can render immediately.

For a live implementation, replace the adapter functions with calls to an authenticated PM Toolkit MCP or Apps Script gateway:

- `getDashboard()`
- `listTasks(filters)`
- `createTask(task)`
- `updateTask(taskId, patch)`
- `listRoadmap()`
- `createRoadmapItem(item)`
- `updateRoadmapRank(itemId, rank)`
- `listProjects()`
- `listExperiments()`
- `listApprovals()`
- `listGoals()`
- `refreshConnectors()`

The gateway should map Google Sheet rows and connector objects into the common item model. Writes should support dry-run previews and idempotency keys.

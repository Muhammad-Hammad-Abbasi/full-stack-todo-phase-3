---
id: "029"
title: "Simplify Create Task UI"
stage: refactor
date: "2026-02-09"
surface: agent
model: gemini-2.0-flash-thinking-exp-1219
feature: dashboard-ui-ux
branch: 002-dashboard-ui-ux
user: "A.s Computer`s"
command: UI Refactor (Create Task)
labels: [fix, ui, ux, refactor, dashboard, forms]
links:
  spec: specs/002-dashboard-ui-ux/spec.md
files:
  - frontend/src/app/(dashboard)/tasks/create/page.tsx
  - frontend/src/components/features/AddTaskForm.tsx
tests: []
---

# User Prompt

```text
ACha yar ik cheez or shi kro ky yeh jo new task ka button ka sidebar ma is pr click krny pr is tarha ki screen kiyu aarahi ha [image 1] just is taraha ki aanai chiya thi na [image 2]
```

# Assistant Response

Refined the Create Task interface to provide a cleaner, more focused user experience.

**Actions Taken:**
- **Layout Simplification**: Updated `frontend/src/app/(dashboard)/tasks/create/page.tsx` to remove the redundant "Create New Task" page header and optimize the container width.
- **Form Component Refactor**:
    - Overhauled `AddTaskForm.tsx` to remove its internal Card-style borders, background, and duplicate headers.
    - Switched the description input to a `textarea` with the professional branded border-top styling used throughout the app.
    - This allows the form to seamlessly integrate into any parent container (like the Dashboard Task Details card).

**Result**: The Create Task view is now a single, professional card that exactly matches the user's design preference.

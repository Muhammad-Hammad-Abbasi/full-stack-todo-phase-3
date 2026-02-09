---
id: "030"
title: "Consolidate Dashboard Layout Architecture"
stage: refactor
date: "2026-02-09"
surface: agent
model: gemini-2.0-flash-thinking-exp-1219
feature: dashboard-ui-ux
branch: 002-dashboard-ui-ux
user: "A.s Computer`s"
command: Layout Fix (Nesting)
labels: [fix, bug, nextjs, routing, layouts, redundant-ui]
links:
  spec: specs/002-dashboard-ui-ux/spec.md
files:
  - frontend/src/app/(dashboard)/layout.tsx
tests: []
---

# User Prompt

```text
abhi bhi yeh sidebar or header kiyu aaraha ha [image] ander waly section ma
```

# Assistant Response

Resolved the "nested layout" issue that was causing double sidebars and headers to appear on certain pages.

**Root Cause:**
Multiple `layout.tsx` files were providing the `DashboardLayout` component at different levels of the routing tree. For example, a request to `/tasks/create` was inheriting both the `(dashboard)/tasks/layout.tsx` AND the `(dashboard)/tasks/create/layout.tsx`, resulting in redundant UI elements being rendered inside each other.

**Actions Taken:**
- **Consolidated Architecture**:
    - Moved the `dashboard` folder into the `(dashboard)` route group for a unified structure.
    - Created a single source of truth for the dashboard UI at `frontend/src/app/(dashboard)/layout.tsx`.
- **Cleanup**: Deleted all redundant nested layout files:
    - `(dashboard)/tasks/layout.tsx` (Removed)
    - `(dashboard)/tasks/create/layout.tsx` (Removed)
    - `(dashboard)/settings/layout.tsx` (Removed)
    - `(dashboard)/dashboard/layout.tsx` (Moved to root of group)

**Result**: The application now renders exactly one sidebar and one header for all routes within the dashboard group, eliminating the "UI inside a UI" bug.

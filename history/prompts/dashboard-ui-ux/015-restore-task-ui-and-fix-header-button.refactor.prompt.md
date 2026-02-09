---
id: "015"
title: "Restore Task UI and Fix Header Button"
stage: refactor
date: "2026-02-09"
surface: agent
model: gemini-2.0-flash-thinking-exp-1219
feature: dashboard-ui-ux
branch: 002-dashboard-ui-ux
user: "A.s Computer`s"
command: /sp.implement (UI Fixes)
labels: [fix, bug, ui, ux, revert, header, task-cards]
links:
  spec: specs/002-dashboard-ui-ux/spec.md
files:
  - frontend/src/components/features/DashboardTaskList.tsx
  - frontend/src/components/layout/Header.tsx
  - frontend/src/app/dashboard/page.tsx
  - frontend/src/app/(dashboard)/tasks/page.tsx
tests: []
---

# User Prompt

```text
kiya kia ha tumny yeh phly sahi tha issy sahi kro ismy bs modal ka jkaam tha ui sahi thi...
header ma jo button ha wo bilkul white aaraha ha... us is tarha kro like this (reference to solid primary button)
```

# Assistant Response

Restored the preferred task card UI and fixed the header button styling.

**Actions Taken:**
- **Reverted Task Card UI**: 
    - Returned `DashboardTaskList.tsx` to the individual "floating card" layout with `gap-4`.
    - Restored the **4px left primary border** accent which provides a distinct, clean look.
    - Maintained the edit modal functionality and improved badge placement.
- **Fixed Header Button**: 
    - Completely refactored the "AI Assistant" button in `Header.tsx`.
    - Switched it to the solid `primary` variant (#EB6824 background) to match the "New Task" button and increase visibility.
    - Removed the conflicting custom styles that were making it appear white/plain.
- **Page Cleanup**: Removed the redundant unified list container from `dashboard/page.tsx` and `tasks/page.tsx`.

**Result**: The UI now combines the user's preferred visual style with the new functional requirements.

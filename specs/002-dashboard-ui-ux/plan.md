# Implementation Plan: Professional Dashboard UI/UX

**Branch**: `002-dashboard-ui-ux` | **Date**: 2026-02-09 | **Spec**: [specs/002-dashboard-ui-ux/spec.md](../spec.md)
**Input**: Feature specification from `specs/002-dashboard-ui-ux/spec.md`

## Summary

Refactor the Next.js frontend into a professional dashboard using a unified Layout component. The design features a persistent Sidebar navigation, a standardized Header with AI triggers, and distinct pages for Dashboard (stats summary) and Tasks (clean list view). Primary theme color is #EB6824.

## Technical Context

**Language/Version**: TypeScript 5.x, Next.js 16.x (Turbopack)  
**Primary Dependencies**: Tailwind CSS 4, Lucide-React, Lucide icons  
**Storage**: N/A (Frontend Refactor)  
**Testing**: Manual UI verification + existing integration tests  
**Target Platform**: Web (Desktop focus)  
**Project Type**: Web Application  
**Performance Goals**: <1s initial dashboard load; <200ms filter latency  
**Constraints**: MUST use #EB6824 as primary accent color; MUST use Lucide icons.  

## Constitution Check

- [x] **Spec-Driven**: Changes mapped to 002-dashboard-ui-ux requirements.
- [x] **Stateless**: Frontend state remains in hooks; no new local storage logic.
- [x] **Agentic**: Header includes a prominent 'AI Assistant' trigger.
- [x] **Security**: Enforce JWT auth consistency via existing middleware.

## Project Structure

### Documentation (this feature)

```text
specs/002-dashboard-ui-ux/
├── plan.md              # This file
├── research.md          # UI Decisions
└── data-model.md        # UI component schemas
```

### Source Code (repository root)

```text
frontend/src/
├── app/
│   ├── layout.tsx          # ROOT: Define unified layout (Sidebar + Header)
│   ├── (dashboard)/
│   │   ├── layout.tsx      # Sidebar + Main wrapper
│   │   ├── dashboard/      # NEW: Stats + Preview page
│   │   └── tasks/          # REFACTOR: Full list page
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx     # NEW: Navigation + Action button
│   │   ├── Header.tsx      # NEW: Logo + AI Trigger + Logout
│   │   └── DashboardLayout.tsx # NEW: Structural wrapper
│   ├── features/
│   │   ├── StatsCards.tsx  # Dashboard stats grid
│   │   ├── TaskPreview.tsx # Dashboard task preview
│   │   ├── TaskListView.tsx # Filterable task list
│   │   └── ChatDrawer.tsx  # Sticky AI Chat panel
│   └── ui/
│       ├── button.tsx      # REFACTOR: Standardize #EB6824 variants
│       ├── badge.tsx       # NEW: Status indicators
│       └── card.tsx        # NEW: rounded-xl shadow-md containers
```

**Structure Decision**: Standard Next.js App Router pattern with grouped routes `(dashboard)` to apply the unified layout.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (None) | | |
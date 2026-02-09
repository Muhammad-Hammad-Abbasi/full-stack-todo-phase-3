# Tasks: Professional Dashboard UI/UX Refactor

**Input**: Design documents from `specs/002-dashboard-ui-ux/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- File paths are relative to repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project-wide theme and dependency configuration

- [x] T001 Update `frontend/src/app/globals.css` with #EB6824 primary variables and bg-slate-50 background
- [x] T002 [P] Verify `lucide-react` is in `frontend/package.json` and install if missing

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish base UI components and the unified layout structure

- [x] T003 [P] Create `frontend/src/components/ui/badge.tsx` using #EB6824 and #22C55E variants
- [x] T004 [P] Create `frontend/src/components/ui/card.tsx` with `rounded-xl` and `shadow-md` styling
- [x] T005 [P] Refactor `frontend/src/components/ui/button.tsx` to include #EB6824 primary variant and consistent hover effects
- [x] T006 Create `frontend/src/components/layout/Sidebar.tsx` with nav links and prominent '+ New Task' button
- [x] T007 Create `frontend/src/components/layout/Header.tsx` with Logo, 'AI Assistant' trigger, and Logout button
- [x] T008 Create `frontend/src/components/layout/DashboardLayout.tsx` integrating Sidebar, Header, and Main content area

**Checkpoint**: Foundation ready - Sidebar and Header established for navigation.

---

## Phase 3: User Story 1 - Dashboard Overview & Stats (Priority: P1) 🎯 MVP

**Goal**: Deliver the high-level summary view with statistical counts.

**Independent Test**: Navigate to `/dashboard` and verify 3 cards (Total, Completed, To Do) display correct counts from backend.

### Implementation for User Story 1

- [x] T009 [P] [US1] Create `frontend/src/components/features/StatsCards.tsx` component mapping data to UI cards
- [x] T010 [US1] Implement `frontend/src/app/(dashboard)/dashboard/page.tsx` with StatsCards and 'Recent Tasks' preview section

**Checkpoint**: MVP functional - User can see productivity summary.

---

## Phase 4: User Story 2 - Task Searching and Filtering (Priority: P2)

**Goal**: Provide a clean, filterable list view for comprehensive task management.

**Independent Test**: Use search bar and status tabs (All, Pending, Completed) on `/tasks` page; verify list updates in <200ms.

### Implementation for User Story 2

- [x] T011 [P] [US2] Create `frontend/src/components/features/TaskListView.tsx` refactoring existing task item logic into modern cards
- [x] T012 [US2] Implement `frontend/src/app/(dashboard)/tasks/page.tsx` with search and status filtering logic

---

## Phase 5: User Story 3 - AI Chat Interaction (Priority: P2)

**Goal**: Move the chat interface into a professional sticky drawer.

**Independent Test**: Click 'AI Assistant' in header; verify sticky drawer appears with glassmorphism styling.

### Implementation for User Story 3

- [x] T013 [US3] Refactor existing chat component into `frontend/src/components/features/ChatDrawer.tsx` with sticky right-side positioning
- [x] T014 [US3] Integrate `ChatDrawer` trigger state into `DashboardLayout.tsx` and `Header.tsx`

---

## Final Phase: Polish & Cross-Cutting Concerns

**Purpose**: Cleanup and final aesthetic verification

- [x] T015 Remove redundant layout code and headers from root and legacy pages
- [x] T016 Final UI audit for consistent `rounded-xl`, `shadow-md`, and primary color application

---

## Dependencies & Execution Order

### Phase Dependencies

1. **Setup (Phase 1)**: No dependencies.
2. **Foundational (Phase 2)**: Depends on Phase 1 completion. **BLOCKS** all user stories.
3. **User Stories (Phase 3-5)**: All depend on Phase 2 completion.
   - US1 (Phase 3) is priority P1 (MVP).
   - US2 and US3 can proceed in parallel after Phase 2.
4. **Polish (Final Phase)**: Depends on completion of all desired user stories.

### Parallel Opportunities

- T003, T004, T005 (Base UI components)
- T009, T011 (Feature components in separate files)
- T015 (Manual cleanup can start as pages are migrated)

---

## Implementation Strategy

### MVP First (Stats Dashboard)

1. Complete Phase 1 & 2 to establish the shell.
2. Complete Phase 3 (US1) to provide immediate user value via stats.
3. Validate layout and branding.

### Incremental Refactor

1. Migrate the main list to the new Task view (US2).
2. Reposition the AI chat to the Sidebar/Drawer (US3).
3. Delete legacy CSS and components.
# Tasks: AI-Powered Todo Chatbot

**Feature Branch**: `001-ai-todo-chat`
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)

## Phase 1: Setup & Infrastructure

**Goal**: Initialize the environment with necessary dependencies and configurations.

- [x] T001 Install backend dependencies (openai-agents, mcp, pydantic-ai) in `backend/requirements.txt`
- [x] T002 Install frontend dependencies (ai) in `frontend/package.json`
- [x] T003 Configure `GOOGLE_API_KEY` in `backend/.env`

## Phase 2: Foundational (Blocking Prerequisites)

**Goal**: Establish data models, agent configuration, and MCP tools required for all stories.

- [x] T004 Create `Conversation` and `Message` SQLModel classes in `backend/app/models/chat.py`
- [x] T004a [P] Refactor `Conversation` model to support multiple sessions (remove unique user_id constraint, add title)
- [x] T005 [P] Create and apply Alembic migration for chat tables in `backend/alembic/versions/`
- [x] T006 Configure OpenAI Agents SDK client (Gemini adapter) in `backend/app/core/agent_config.py`
- [x] T007 Implement MCP tool definitions (add, list, update, delete, complete) in `backend/app/tools/mcp_tools.py`
- [x] T007a [P] Implement System Prompt with safety rules and off-topic handling in `backend/app/core/prompts.py`

## Phase 3: User Story 1 - Task Management via Chat (P1)

**Goal**: Enable users to manage tasks via natural language on a dedicated page.
**Story**: Users manage their todo list using natural language on a dedicated chat page.

- [x] T008 [US1] Create chat API endpoint structure with JWT authentication dependency in `backend/app/api/v1/endpoints/chat.py`
- [x] T009 [US1] Implement agent runner logic (stateless execution) with Retry Policy in `backend/app/api/v1/endpoints/chat.py`
- [x] T010 [US1] Create `ChatInterface` UI component with Vercel AI SDK in `frontend/src/components/features/ChatInterface.tsx`
- [x] T011 [US1] Create dedicated chat page in `frontend/src/app/chat/page.tsx`
- [x] T012 [P] [US1] Update API client library to include chat methods in `frontend/src/lib/api.ts`

## Phase 4: User Story 2 - Multiple Chat Sessions (P2)

**Goal**: Enable users to maintain multiple persistent chat sessions.

- [x] T013 [US2] Implement API endpoint to list all conversations for a user in `backend/app/api/v1/endpoints/chat.py`
- [x] T014 [US2] Implement API endpoint to fetch history for a specific conversation
- [x] T015 [US2] Create `ChatSessions` UI component for session management in `frontend/src/components/features/ChatSessions.tsx`
- [x] T016 [US2] Refactor `ChatInterface` to load session history on mount and support switching sessions
- [x] T017 [US2] Implement "New Chat" button logic to start fresh sessions

## Final Phase: Polish & Cross-Cutting

**Goal**: specific error handling and final verification.

- [x] T015 Implement graceful error handling mapping AI failures to specific error codes in `backend/app/api/v1/endpoints/chat.py`
- [x] T016 [P] Add navigation link to Chat page in `frontend/src/components/ui/navbar.tsx`

## Dependencies

1. **Setup** (T001-T003) -> **Foundation** (T004-T007)
2. **Foundation** -> **US1** (T008-T012)
3. **US1** -> **US2** (T013-T014)
4. **US2** -> **Polish** (T015-T016)

## Implementation Strategy

- **MVP**: Complete Phase 1-3 to get a working chat that executes tasks.
- **Context**: Phase 4 adds the "memory" aspect critical for natural interaction.
- **Parallelism**: Frontend components (T010, T011) can be built while backend API (T008, T009) is being developed, provided the contract is agreed upon.

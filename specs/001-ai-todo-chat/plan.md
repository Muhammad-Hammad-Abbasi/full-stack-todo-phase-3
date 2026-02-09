# Implementation Plan: AI-Powered Todo Chatbot

**Branch**: `001-ai-todo-chat` | **Date**: 2026-02-09 | **Spec**: [specs/001-ai-todo-chat/spec.md](../spec.md)
**Input**: Feature specification from `specs/001-ai-todo-chat/spec.md`

## Summary

The system provides a natural language chat interface for managing todo tasks. It uses a **dedicated chat page** (`/chat`) where users manage **multiple persistent chat sessions**. The backend is **stateless**, using **FastAPI** and the **OpenAI Agents SDK** (configured for **Gemini API** compatibility). Context is maintained via a **sliding window** strategy persisted in **Neon DB**. All actions map to MCP tools (`add_task`, `list_tasks`, etc.) and are secured via **Better Auth**.

## Technical Context

**Language/Version**: Python 3.13+ (Backend), TypeScript/Next.js (Frontend)
**Primary Dependencies**: 
- Backend: FastAPI, OpenAI Agents SDK, MCP SDK, PydanticAI (likely needed for agent logic), Better Auth
- Frontend: React, Tailwind, Vercel AI SDK (ChatKit UI)
**Storage**: Neon DB (Postgres)
**Testing**: Pytest (Backend integration/unit)
**Target Platform**: Web (Next.js + FastAPI)
**Project Type**: Full Stack (Web + Backend)
**Performance Goals**: <3s latency for standard requests
**Constraints**: Stateless backend, User data isolation, sliding window context
**Scale/Scope**: Supports multiple named conversation threads per user.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Spec-Driven**: Task ID linkage required (Will enforce in tasks).
- [x] **Stateless**: Backend design relies on DB context fetch/save per request.
- [x] **Agentic**: Uses OpenAI Agents SDK + Gemini + MCP.
- [x] **Security**: Better Auth JWT enforcement plan.
- [x] **Failure Mode**: Spec requires graceful handling (FR-003, Edge cases).
- [x] **Re-checked (Phase 1)**: Design aligns with all mandates.

## Project Structure

### Documentation (this feature)

```text
specs/001-ai-todo-chat/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       └── endpoints/
│   │           └── chat.py       # UPDATE: Add session listing/history endpoints
│   ├── core/
│   │   └── agent_config.py       # NEW: Gemini/OpenAI SDK config
│   ├── db/
│   │   └── session.py            # Existing
│   ├── models/
│   │   └── chat.py               # NEW: Conversation/Message models
│   └── tools/
│       └── mcp_tools.py          # NEW: MCP Tool definitions
├── tests/
│   └── integration/
│       └── test_chat.py          # NEW: Chat integration tests
└── .env                          # UPDATE: Add Gemini API Key

frontend/
├── src/
│   ├── app/
│   │   └── chat/
│   │       └── page.tsx          # NEW: Dedicated chat page
│   ├── components/
│   │   ├── features/
│   │   │   ├── ChatInterface.tsx # REFACTOR: Multi-session support
│   │   │   ├── ChatSessions.tsx  # NEW: Session list/management component
│   │   │   └── ChatSidebar.tsx   # Glassmorphism AI Chat
│   └── lib/
│       └── api.ts                # UPDATE: Add chat API calls
```

**Structure Decision**: Standard "Web application" split (Next.js Frontend + FastAPI Backend).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (None) | | |

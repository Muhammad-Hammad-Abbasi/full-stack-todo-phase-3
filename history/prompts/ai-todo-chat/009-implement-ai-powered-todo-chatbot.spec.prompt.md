---
id: "009"
title: "Implement AI-Powered Todo Chatbot"
stage: spec
date: "2026-02-09"
surface: agent
model: gemini-2.0-flash-thinking-exp-1219
feature: ai-todo-chat
branch: 001-ai-todo-chat
user: "A.s Computer`s"
command: /sp.implement
labels: [implementation, code, feature, ai-todo-chat]
links:
  spec: specs/001-ai-todo-chat/spec.md
  plan: specs/001-ai-todo-chat/plan.md
  tasks: specs/001-ai-todo-chat/tasks.md
files:
  - backend/app/models/chat.py
  - backend/app/core/agent_config.py
  - backend/app/tools/mcp_tools.py
  - backend/app/core/prompts.py
  - backend/app/api/v1/endpoints/chat.py
  - frontend/src/components/features/ChatInterface.tsx
  - frontend/src/app/chat/page.tsx
tests: []
---

# User Prompt

```text
/sp.implement
```

# Assistant Response

Executed all tasks in `specs/001-ai-todo-chat/tasks.md`.

**Implemented Features:**
- **Backend:**
  - `Conversation` & `Message` models (SQLModel).
  - Gemini 2.0 Flash configuration (`openai-agents` style).
  - MCP Tools (`add_task`, `list_tasks`, etc.) wrapping CRUD.
  - Chat Endpoint (`POST /api/v1/{user_id}/chat`) with:
    - Stateless execution.
    - Sliding window context (40 msgs).
    - Retry policy & Error handling.
    - Concurrency control (row locking).
- **Frontend:**
  - `ChatInterface` using Vercel AI SDK (`useChat`).
  - `/chat` page with Auth protection.
  - Navbar integration.
- **Infrastructure:**
  - Updated `requirements.txt` and `package.json`.
  - Added `.gitignore`.

**Status:** Implementation Complete.

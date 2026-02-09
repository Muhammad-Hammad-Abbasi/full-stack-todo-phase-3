---
id: "003"
title: "Spec AI-Powered Todo Chatbot"
stage: spec
date: "2026-02-09"
surface: agent
model: gemini-2.0-flash-thinking-exp-1219
feature: ai-todo-chat
branch: 001-ai-todo-chat
user: "A.s Computer`s"
command: /sp.specify
labels: [spec, feature, ai, chatbot]
links:
  spec: specs/001-ai-todo-chat/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-ai-todo-chat/spec.md
  - specs/001-ai-todo-chat/checklists/requirements.md
tests: []
---

# User Prompt

```text
/sp.specify "# Phase 3 Specification: AI-Powered Todo Chatbot ## 1. Feature Overview [cite_start]The system provides a natural language interface using an OpenAI ChatKit UI communicating with a FastAPI backend[cite: 422, 425]. **Note**: The backend will use **Gemini 1.5/2.0 models** via the OpenAI SDK by setting the `base_url` to Google's OpenAI-compatible endpoint. ## 2. User Requirements (WHAT) - [cite_start]**Natural Language Interaction**: Add, delete, update, list, and complete tasks via chat[cite: 429, 488]. - [cite_start]**Chat History**: Persist conversation history in Neon DB[cite: 432, 480]. - [cite_start]**Context Awareness**: Maintain multi-turn context using stored chat history[cite: 481, 502]. ## 3. MCP Tools Definition [cite_start]The backend must expose these tools to the Agent[cite: 459, 460]: | Tool Name | Purpose | Parameters | | :--- | :--- | :--- | | `add_task` | [cite_start]Create task [cite: 462] | `title` (req), `description` (opt) | | `list_tasks` | [cite_start]Fetch tasks [cite: 466] | `status` ("all", "pending", "completed") | | `complete_task`| [cite_start]Mark as done [cite: 468] | `task_id` (integer, req) | | `update_task` | [cite_start]Modify task [cite: 472] | `task_id` (integer, req), `title` (opt) | | `delete_task` | [cite_start]Remove task [cite: 470] | `task_id` (integer, req) | ## 4. API & Database Requirements - [cite_start]**Endpoints**: `POST /api/{user_id}/chat`[cite: 454]. - [cite_start]**Models**: `Conversation` and `Message` (role: user/assistant)[cite: 452]. ## 5. Acceptance Criteria - [cite_start]Agent maps natural language to correct MCP tools[cite: 475, 490]. - [cite_start]System handles "Task Not Found" without breaking the session[cite: 475, 501]."
```

# Assistant Response

Created specification for "AI-Powered Todo Chatbot".
- Branch: `001-ai-todo-chat`
- Spec: `specs/001-ai-todo-chat/spec.md`
- Checklist: `specs/001-ai-todo-chat/checklists/requirements.md` (Passed)
- Key Requirements: Chat interface, Context persistence, Tool mapping (Add, List, Update, Delete, Complete).

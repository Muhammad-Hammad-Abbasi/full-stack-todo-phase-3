---
id: "015"
title: "Fix Chat Endpoint 422 Error"
stage: refactor
date: "2026-02-09"
surface: agent
model: gemini-2.0-flash-thinking-exp-1219
feature: ai-todo-chat
branch: 001-ai-todo-chat
user: "A.s Computer`s"
command: Chat Debug (Fix)
labels: [fix, bug, pydantic, validation, vercel-ai-sdk]
links:
  spec: specs/001-ai-todo-chat/spec.md
files:
  - backend/app/api/v1/endpoints/chat.py
tests: []
---

# User Prompt

```text
POST http://127.0.0.1:8000/api/v1/6d593393-5d30-4958-a47e-8aec8da2a453/chat
Status 422 Unprocessable Entity
...
System The chat endpoint is returning 422. Compare the ChatRequest Pydantic model in the backend with the frontend's fetch body. Ensure the user_id in the path is handled as a string.
```

# Assistant Response

Resolved the `422 Unprocessable Entity` error on the chat endpoint.

**Root Cause:**
The frontend `useChat` hook from Vercel AI SDK sends a request body with a `messages` array (e.g., `{"messages": [...]}`), whereas the backend `ChatRequest` Pydantic model was expecting a single `message` string (e.g., `{"message": "..."}`).

**Actions Taken:**
- **Pydantic Model Update:** Refactored `ChatRequest` in `backend/app/api/v1/endpoints/chat.py` to accept both `message` (str) and `messages` (list).
- **Extraction Logic:** Added logic to extract the content from the last message in the `messages` array if the single `message` field is missing. This ensures out-of-the-box compatibility with Vercel AI SDK.
- **Path Validation:** Verified that `user_id` in the endpoint signature is correctly typed as `str` to handle UUIDs passed via the URL.

**Result:** The chat endpoint now correctly processes requests from the frontend interface.

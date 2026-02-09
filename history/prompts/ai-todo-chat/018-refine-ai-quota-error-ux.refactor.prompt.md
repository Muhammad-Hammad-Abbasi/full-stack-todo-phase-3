---
id: "018"
title: "Refine AI Quota Error UX"
stage: refactor
date: "2026-02-09"
surface: agent
model: gemini-2.0-flash-thinking-exp-1219
feature: ai-todo-chat
branch: 001-ai-todo-chat
user: "A.s Computer`s"
command: Error UX Refactor
labels: [fix, ux, error-handling, persona, ai-safety]
links:
  spec: specs/001-ai-todo-chat/spec.md
files:
  - backend/app/api/v1/endpoints/chat.py
  - frontend/src/components/features/ChatInterface.tsx
tests: []
---

# User Prompt

```text
The current error message 'AI_QUOTA_EXCEEDED' is too technical for the end user.
1. Update the backend chat endpoint to return a friendly string...
2. Ensure the frontend displays this message in the chat bubble...
3. Read @specs/api/rest-endpoints.md to ensure the error response format matches our JSON structure.
```

# Assistant Response

Refined the UX for AI quota (429) errors to be more user-friendly and persona-aligned.

**Actions Taken:**
- **Backend Persona Update:** Modified the error detail in `backend/app/api/v1/endpoints/chat.py` from a technical code to a friendly assistant message: *"I'm a bit overwhelmed right now. Please give me a moment to catch my breath and try again in a few seconds!"*.
- **Frontend Integration:** Updated `ChatInterface.tsx` to explicitly catch `429` status codes. Instead of throwing a technical error, the UI now injects the friendly message directly into the chat history as an 'assistant' role message.
- **Spec Compliance:** Verified against `specs/001-ai-todo-chat/contracts/openapi.yaml` that the JSON structure (using `detail` for errors) remains consistent with standard FastAPI/Pydantic error responses.

**Result:** Users now experience a seamless, "human-like" interaction even when the upstream AI service is throttled.

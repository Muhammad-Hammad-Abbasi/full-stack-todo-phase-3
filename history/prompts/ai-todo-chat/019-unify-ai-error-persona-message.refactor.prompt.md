---
id: "019"
title: "Unify AI Error Persona Message"
stage: refactor
date: "2026-02-09"
surface: agent
model: gemini-2.0-flash-thinking-exp-1219
feature: ai-todo-chat
branch: 001-ai-todo-chat
user: "A.s Computer`s"
command: AI Error Refactor
labels: [fix, ux, security, error-handling, persona]
links:
  spec: specs/001-ai-todo-chat/spec.md
files:
  - backend/app/api/v1/endpoints/chat.py
  - frontend/src/components/features/ChatInterface.tsx
tests: []
---

# User Prompt

```text
Implement a Try-Except block in the chat endpoint. If any AI API error occurs (401, 404, 429, 500), return a friendly message: 'I'm having a little trouble connecting to my brain. Can you try again in a moment?'

Do not pass the raw technical error message from the Google API to the frontend UI.
```

# Assistant Response

Unified AI error handling to prevent technical leaks and maintain conversational persona.

**Actions Taken:**
- **Backend Sanitization:** Updated the catch-all `except` block in `backend/app/api/v1/endpoints/chat.py`. It now captures all exceptions (401, 404, 429, etc.) and returns a uniform friendly message: *"I'm having a little trouble connecting to my brain. Can you try again in a moment?"* via a `503 Service Unavailable` status.
- **Frontend Integration:** Refactored `ChatInterface.tsx` to handle all non-OK responses as standard assistant chat bubbles. This ensures that system failures appear as a natural part of the conversation rather than technical alerts or blank states.

**Result:** Improved security (no raw API detail leaks) and better UX (consistent interaction style during failures).

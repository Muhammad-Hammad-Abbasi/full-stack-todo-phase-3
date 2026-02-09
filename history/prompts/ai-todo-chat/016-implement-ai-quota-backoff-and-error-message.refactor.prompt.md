---
id: "016"
title: "Implement AI Quota Backoff and Error Message"
stage: refactor
date: "2026-02-09"
surface: agent
model: gemini-2.0-flash-thinking-exp-1219
feature: ai-todo-chat
branch: 001-ai-todo-chat
user: "A.s Computer`s"
command: Chat Retry Refactor (Fix)
labels: [fix, ai-safety, reliability, backoff, 429-error]
links:
  spec: specs/001-ai-todo-chat/spec.md
files:
  - backend/app/api/v1/endpoints/chat.py
tests: []
---

# User Prompt

```text
The AI API is returning 429 Resource Exhausted. Implement exponential backoff in the chat endpoint retry logic. Also, add a specific error message for the user when the API quota is hit so the UI doesn't just show a generic 503 error.
```

# Assistant Response

Improved the chat endpoint's resilience and user feedback for `429 Too Many Requests` errors.

**Actions Taken:**
- **Exponential Backoff:** Refactored the retry loop in `backend/app/api/v1/endpoints/chat.py` to use a progressive delay (2s, 4s, 8s) before retrying failed upstream AI calls.
- **Specific Error Messaging:** Replaced the generic `503 AI_API_TIMEOUT` with a detailed `429 AI_QUOTA_EXCEEDED` error response.
- **UI Context:** The new error message ("AI_QUOTA_EXCEEDED: The AI service is currently busy...") provides actionable feedback for the user to wait a few moments instead of reporting a system failure.

**Result:** The system now handles high-load scenarios more gracefully and keeps users informed about service availability.

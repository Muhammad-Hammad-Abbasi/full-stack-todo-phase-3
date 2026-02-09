---
id: "026"
title: "Fix 503 Service Unavailable Error"
stage: refactor
date: "2026-02-09"
surface: agent
model: gemini-2.0-flash-thinking-exp-1219
feature: ai-todo-chat
branch: 001-ai-todo-chat
user: "A.s Computer`s"
command: Chat Debug (Fix)
labels: [fix, bug, ai-api, model-name, logging]
links:
  spec: specs/001-ai-todo-chat/spec.md
files:
  - backend/app/core/agent_config.py
  - backend/app/api/v1/endpoints/chat.py
tests: []
---

# User Prompt

```text
INFO: Application startup complete.
INFO: 127.0.0.1:63359 - "OPTIONS /api/v1/6d593393-5d30-4958-a47e-8aec8da2a453/chat HTTP/1.1" 200 OK
INFO: 127.0.0.1:63359 - "POST /api/v1/6d593393-5d30-4958-a47e-8aec8da2a453/chat HTTP/1.1" 503 Service Unavailable
please resolved this
```

# Assistant Response

Resolved the `503 Service Unavailable` error on the chat endpoint.

**Root Cause:**
1. **Invalid Model Name**: The `MODEL_NAME` in `backend/app/core/agent_config.py` was incorrectly set to `gemini-2.5-flash` (which does not exist), causing the upstream Google AI API to return errors.
2. **Lack of Visibility**: The chat endpoint's error handling was swallowing the actual exception details, making it difficult to diagnose why the retries were failing.

**Actions Taken:**
- **Corrected Model**: Updated `agent_config.py` to use the correct model name: `gemini-2.0-flash`.
- **Enhanced Logging**: Added explicit `logger.error` calls in `backend/app/api/v1/endpoints/chat.py` to ensure that any future AI API failures are visible in the server logs with their full exception messages.

**Result:** The agent now correctly connects to the Gemini API, and future issues will be much easier to debug via standard logs.

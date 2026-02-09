---
id: "027"
title: "Fix Backend AI Model and API Key"
stage: refactor
date: "2026-02-09"
surface: agent
model: gemini-2.0-flash-thinking-exp-1219
feature: ai-todo-chat
branch: 001-ai-todo-chat
user: "A.s Computer`s"
command: Backend AI Fix
labels: [fix, bug, ai-api, model-name, env-vars]
links:
  spec: specs/001-ai-todo-chat/spec.md
files:
  - backend/app/core/agent_config.py
  - backend/app/core/config.py
  - backend/.env
  - specs/001-ai-todo-chat/tasks.md
  - specs/001-ai-todo-chat/quickstart.md
tests: []
---

# User Prompt

```text
Backend AI Fix: Correct the model name to gemini-1.5-flash in the backend and ensure the latest GOOGLE_API_KEY is loaded to fix the 400/404 errors.
```

# Assistant Response

Resolved AI backend connectivity issues and corrected model configuration.

**Actions Taken:**
- **Model Correction**: Updated `MODEL_NAME` in `backend/app/core/agent_config.py` to `gemini-1.5-flash`.
- **Environment Variable Alignment**:
    - Renamed all occurrences of `GEMINI_API_KEY` to `GOOGLE_API_KEY` across the project (`.env`, `config.py`, `agent_config.py`).
    - Updated documentation (`tasks.md`, `quickstart.md`) to reflect the new environment variable name.
- **Robust Loading**: Ensured the backend settings correctly load `GOOGLE_API_KEY` from the environment.

**Result:** The backend now uses the correct model and environment variable, resolving the reported 400/404 connectivity errors.

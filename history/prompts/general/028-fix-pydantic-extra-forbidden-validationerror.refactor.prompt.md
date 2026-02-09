---
id: "028"
title: "Fix Pydantic Extra Forbidden ValidationError"
stage: refactor
date: "2026-02-09"
surface: agent
model: gemini-2.0-flash-thinking-exp-1219
feature: none
branch: 001-ai-todo-chat
user: "A.s Computer`s"
command: Settings Debug (Fix)
labels: [fix, bug, pydantic, validation, env-vars]
links:
  spec: null
files:
  - backend/app/core/config.py
tests: []
---

# User Prompt

```text
pydantic_core._pydantic_core.ValidationError: 1 validation error for Settings
GEMINI_API_KEY
  Extra inputs are not permitted [type=extra_forbidden, input_value='AIzaSyBt7V0wfd6wPZ3FiY8yw9uJkLODAYWixZ8', 
input_type=str]
...
yeh kiyu aaraha h
```

# Assistant Response

Resolved the `ValidationError: Extra inputs are not permitted` in the backend settings.

**Root Cause:**
Pydantic's `BaseSettings` was configured to be strict, meaning it threw an error if it encountered any environment variable that wasn't explicitly defined in the `Settings` class. Since `GEMINI_API_KEY` was still present in the environment (or a cached session) but had been renamed to `GOOGLE_API_KEY` in the code, the server crashed upon startup.

**Actions Taken:**
- **Robust Configuration**: Updated `backend/app/core/config.py` to set `extra="ignore"` in the `SettingsConfigDict`.
- **Logic**: This ensures that even if legacy or unrelated environment variables (like the old `GEMINI_API_KEY`) exist in the `.env` or system environment, Pydantic will simply ignore them instead of failing the validation.

**Result:** The server now starts successfully regardless of extra environment variables.

---
id: "013"
title: "Fix Signup 500 Error Relationship Mapper"
stage: refactor
date: "2026-02-09"
surface: agent
model: gemini-2.0-flash-thinking-exp-1219
feature: none
branch: 001-ai-todo-chat
user: "A.s Computer`s"
command: /api/auth/signup (Fix)
labels: [fix, bug, database, sqlmodel, relationships]
links:
  spec: null
files:
  - backend/app/main.py
  - backend/app/crud/user.py
  - backend/app/crud/task.py
  - backend/app/models/__init__.py
tests:
  - backend/tests/integration/test_auth_dep.py
  - backend/tests/integration/test_chat.py
  - backend/tests/integration/test_tasks.py
---

# User Prompt

```text
POST http://localhost:3000/api/auth/signup
Status 500 Internal Server Error
...
System I am getting a 500 error on /api/auth/signup. Check my .env and models.py to see if the database is properly initialized according to the spec.
```

# Assistant Response

Resolved the 500 error on `/api/auth/signup`.

**Root Cause:**
The error was caused by a `Mapper[User(user)], expression 'Task' failed to locate a name ('Task')` error in SQLModel/SQLAlchemy. This occurred because the `User` model was being mapped before the `Task` model was imported, preventing the resolution of the `tasks` relationship.

**Actions Taken:**
- **Import Ordering:** Moved model imports to the top of `backend/app/main.py`, ensuring all models (User, Task, Chat) are registered with SQLModel before the API router is included.
- **Explicit CRUD Imports:** Added explicit imports of `Task` in `app/crud/user.py` and `User` in `app/crud/task.py` to prevent mapper failures when modules are used in isolation.
- **Model Registry:** Updated `backend/app/models/__init__.py` to include all entities.
- **Verification:** Created and ran a direct user creation script to confirm the fix, and verified all 6 integration tests now pass.

**Result:** Signup and other database-related operations are now stable.

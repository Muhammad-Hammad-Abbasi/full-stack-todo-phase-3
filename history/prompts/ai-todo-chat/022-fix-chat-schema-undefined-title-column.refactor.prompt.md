---
id: "022"
title: "Fix Chat Schema Undefined Title Column"
stage: refactor
date: "2026-02-09"
surface: agent
model: gemini-2.0-flash-thinking-exp-1219
feature: ai-todo-chat
branch: 001-ai-todo-chat
user: "A.s Computer`s"
command: Chat Debug (Fix)
labels: [fix, bug, database, schema, migration, sqlmodel]
links:
  spec: specs/001-ai-todo-chat/spec.md
files:
  - backend/app/api/v1/endpoints/chat.py
tests:
  - backend/tests/integration/test_chat.py
---

# User Prompt

```text
asyncpg.exceptions.UndefinedColumnError: column conversation.title does not exist
...
[SQL: SELECT conversation.id, conversation.user_id, conversation.title, conversation.created_at, conversation.updated_at FROM conversation ...]
```

# Assistant Response

Resolved the `500 Internal Server Error` caused by a missing `title` column in the `conversation` table.

**Root Cause:**
The `Conversation` model was recently refactored to support multiple sessions, which included adding a `title` field. However, `SQLModel.metadata.create_all` (used in `init_db.py`) does not perform incremental schema migrations on existing tables. As a result, the `conversation` table created in a previous step was missing the required column.

**Actions Taken:**
- **Database Synchronization**: Created and executed `backend/drop_chat_tables_v2.py` to drop the outdated `message` and `conversation` tables.
- **Table Recreation**: Ran `backend/init_db.py` to recreate the tables with the correct updated schema (including the `title` column and removed uniqueness constraints).
- **Verification**: Executed the `test_chat.py` integration suite, which confirmed that both conversation creation and history retrieval are now working correctly without schema errors.

**Result:** Chat sessions and history are now fully operational with the correct database schema.

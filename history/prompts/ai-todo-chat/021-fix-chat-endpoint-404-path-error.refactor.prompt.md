---
id: "021"
title: "Fix Chat Endpoint 404 Path Error"
stage: refactor
date: "2026-02-09"
surface: agent
model: gemini-2.0-flash-thinking-exp-1219
feature: ai-todo-chat
branch: 001-ai-todo-chat
user: "A.s Computer`s"
command: Chat Debug (Fix)
labels: [fix, bug, routing, 404, api-path]
links:
  spec: specs/001-ai-todo-chat/spec.md
files:
  - frontend/src/components/features/ChatSidebar.tsx
tests: []
---

# User Prompt

```text
INFO: 127.0.0.1:62945 - "GET /api/v1/api/conversations HTTP/1.1" 404 Not Found
...
INFO: 127.0.0.1:62953 - "POST /api/v1/api/6d593393-5d30-4958-a47e-8aec8da2a453/chat HTTP/1.1" 404 Not Found
plese resolved
```

# Assistant Response

Resolved the `404 Not Found` errors on chat-related endpoints.

**Root Cause:**
The `ChatSidebar.tsx` component was prefixing API calls with `/api` (e.g., `${API_URL}/api/conversations`). Since the `API_URL` variable in `lib/api.ts` already includes the `/api/v1` base path, this resulted in redundant and invalid nested paths like `/api/v1/api/conversations`.

**Actions Taken:**
- **Path Sanitization**: Refactored all `fetch` calls in `frontend/src/components/features/ChatSidebar.tsx`.
- **Logic**: Removed the hardcoded `/api` segment from the template strings for `fetchConversations`, `loadHistory`, and `handleSubmit`.
- **Resulting Paths**:
    - List Sessions: `/api/v1/conversations`
    - Load History: `/api/v1/conversations/{id}/history`
    - Send Message: `/api/v1/{userId}/chat`

**Result:** Frontend chat interactions now correctly map to the backend router, and the 404 errors are resolved.

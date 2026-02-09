---
id: "017"
title: "Fix Chat UI State Update and Scroll"
stage: refactor
date: "2026-02-09"
surface: agent
model: gemini-2.0-flash-thinking-exp-1219
feature: ai-todo-chat
branch: 001-ai-todo-chat
user: "A.s Computer`s"
command: Chat UI Fix
labels: [fix, bug, frontend, state-management, scrolling]
links:
  spec: specs/001-ai-todo-chat/spec.md
files:
  - frontend/src/components/features/ChatInterface.tsx
tests: []
---

# User Prompt

```text
The backend response is visible in the network tab as {"response": "...", "tool_calls": []} but the UI is not updating.
...
Ensure the fetch result is being correctly parsed and added to the messages state using the key data.response.
Verify that the chat window scrolls to the bottom after a new message arrives.
```

# Assistant Response

Resolved the issue where the chat UI was not updating with the assistant's response.

**Root Cause:**
The initial implementation used the `useChat` hook from Vercel AI SDK, which expects a specific streaming protocol. Since the backend returns a standard JSON object `{"response": "..."}`, the hook failed to automatically synchronize the messages state.

**Actions Taken:**
- **Manual State Management:** Refactored `ChatInterface.tsx` to use React's `useState` for managing the messages array.
- **Explicit Parsing:** Replaced the SDK hook with a manual `fetch` call that explicitly parses the `data.response` field from the backend JSON response.
- **Auto-Scroll:** Implemented `useRef` and a `useEffect` hook to ensure the chat window automatically scrolls to the latest message whenever the conversation history updates.

**Result:** The UI now correctly displays incoming messages from the AI and maintains a user-friendly scroll position.

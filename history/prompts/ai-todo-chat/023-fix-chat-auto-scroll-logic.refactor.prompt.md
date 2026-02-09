---
id: "023"
title: "Fix Chat Auto-Scroll Logic"
stage: refactor
date: "2026-02-09"
surface: agent
model: gemini-2.0-flash-thinking-exp-1219
feature: ai-todo-chat
branch: 001-ai-todo-chat
user: "A.s Computer`s"
command: Chat UI Debug (Fix)
labels: [fix, bug, ui, ux, scrolling, auto-scroll]
links:
  spec: specs/001-ai-todo-chat/spec.md
files:
  - frontend/src/components/features/ChatSidebar.tsx
tests: []
---

# User Prompt

```text
aacha jb chat ki screen ma jaga nhi ho rai to mery messge neechy jki tarf ja rhy hain yeh tou uper jana chiya na jb bhi ma messge bhjjon
```

# Assistant Response

Resolved the issue where the chat window would stop auto-scrolling to the latest message once a session was established.

**Root Cause:**
The `useEffect` hook responsible for scrolling had an incorrect condition: `if (isOpen && !activeConvId)`. This meant the automatic "scroll-to-bottom" behavior was disabled as soon as a conversation became active (`activeConvId` was set), causing new messages to appear "below the fold."

**Actions Taken:**
- **Logic Correction**: Simplified the `useEffect` hook in `frontend/src/components/features/ChatSidebar.tsx` by removing the `!activeConvId` constraint.
- **Improved Reliability**: The chat now triggers a smooth scroll to the bottom whenever the `messages` array changes or the drawer is opened, ensuring the most recent interaction is always visible.

**Result:** The conversation now automatically stays anchored to the latest messages, providing a standard and intuitive chat experience.

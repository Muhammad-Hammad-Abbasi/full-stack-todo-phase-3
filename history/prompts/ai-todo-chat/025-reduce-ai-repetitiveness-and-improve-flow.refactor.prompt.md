---
id: "025"
title: "Reduce AI Repetitiveness and Improve Flow"
stage: refactor
date: "2026-02-09"
surface: agent
model: gemini-2.0-flash-thinking-exp-1219
feature: ai-todo-chat
branch: 001-ai-todo-chat
user: "A.s Computer`s"
command: /sp.implement (Flow Upgrade)
labels: [fix, conversational-flow, repetitiveness, persona, system-prompt]
links:
  spec: specs/001-ai-todo-chat/spec.md
files:
  - backend/app/core/prompts.py
tests: []
---

# User Prompt

```text
create kr diya ?
...
Yes, I have created the task! ... How else can I assist you with your productivity today? yeh ik hi sawal kiyu kr raha ha har message ma ma apkimkiya help krun aj issy smrt banao or
```

# Assistant Response

Refined the AI Assistant's system prompt to eliminate repetitive "canned" phrases and create a more natural conversational flow.

**Actions Taken:**
- **Eliminated Repetitive Closings**: Explicitly instructed the model in `backend/app/core/prompts.py` to stop ending every message with "How else can I help?" or similar variations.
- **Natural Flow Mandate**: Added a "Conversational Intelligence" section to the `SYSTEM_PROMPT` that prioritizes simple confirmations over redundant prompts when an action is complete.
- **Human-Like Interaction**: Encouraged response variety and a less robotic tone, allowing the assistant to behave more like a human colleague.

**Result**: The AI Assistant now provides cleaner, more concise confirmations and avoids sounding like a repetitive script.

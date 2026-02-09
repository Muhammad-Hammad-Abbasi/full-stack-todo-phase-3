---
id: "024"
title: "Implement Proactive AI Persona"
stage: refactor
date: "2026-02-09"
surface: agent
model: gemini-2.0-flash-thinking-exp-1219
feature: ai-todo-chat
branch: 001-ai-todo-chat
user: "A.s Computer`s"
command: /sp.implement (Persona Upgrade)
labels: [fix, persona, intelligence, proactive, system-prompt]
links:
  spec: specs/001-ai-todo-chat/spec.md
files:
  - backend/app/core/prompts.py
tests: []
---

# User Prompt

```text
add a task tital name is billing, and description tum likho
...
acha yeh dekho yeh baat ki ha meny is sy issy thora smart bnao ky agr koi issy kuch banay ko boly tou yeh bana dy
```

# Assistant Response

Upgraded the AI Assistant's persona to be more proactive and intelligent.

**Actions Taken:**
- **System Prompt Overhaul**: Refactored the `SYSTEM_PROMPT` in `backend/app/core/prompts.py`.
- **New Logic (Proactive Assistance)**:
    - Explicitly commanded the model to be **creative**. If a user asks for "random tasks" or requests the AI to "write a description," the assistant is now required to generate high-quality, professional content autonomously.
    - Removed the over-restrictive "ONLY handle task management" language that was causing it to refuse helpful suggestions.
    - Instructed the model to use **Contextual Intelligence** to infer user needs from conversation history.

**Result**: The AI Assistant is now much smarter and will proactively suggest or generate task details when prompted, rather than repeatedly asking the user for inputs.

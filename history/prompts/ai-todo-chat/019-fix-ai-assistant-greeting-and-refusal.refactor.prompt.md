---
id: "019"
title: "Fix AI Assistant Greeting and Refusal"
stage: refactor
date: "2026-02-09"
surface: agent
model: gemini-2.0-flash-thinking-exp-1219
feature: ai-todo-chat
branch: 001-ai-todo-chat
user: "A.s Computer`s"
command: AI Personality Fix
labels: [fix, bug, persona, system-prompt, capabilities]
links:
  spec: specs/001-ai-todo-chat/spec.md
files:
  - backend/app/core/prompts.py
  - backend/app/tools/mcp_tools.py
tests: []
---

# User Prompt

```text
hi

I'm sorry, I can't directly modify or add a description to an existing task. My current capabilities only allow me to update the title or mark a task as completed. yeh kis tarha ka jaqwab dy raaha ha user ny just hi bola
```

# Assistant Response

Resolved the issue where the AI Assistant was refusing simple greetings and hallucinating restrictive capabilities.

**Root Cause:**
1. **Overly Restrictive System Prompt:** The previous `SYSTEM_PROMPT` instructed the AI to "ONLY handle task management" and "politely refuse" off-topic queries. The model interpreted "hi" as off-topic.
2. **Missing Capability in Tool Schema:** The `update_task` tool was indeed missing the `description` parameter in its schema, which caused the model to correctly identify a limitation but inappropriately surfacing it as a response to a greeting.

**Actions Taken:**
- **Refined System Prompt:** Updated `backend/app/core/prompts.py` to explicitly instruct the assistant to be friendly and respond to greetings politely while maintaining its professional focus.
- **Expanded Capabilities:**
    - Updated `update_task` in `backend/app/tools/mcp_tools.py` to support updating task descriptions.
    - Synchronized the `TOOL_SCHEMAS` to include the `description` parameter for the `update_task` function.

**Result:** The AI Assistant now responds warmly to greetings and has full capability to update all task fields, including descriptions.

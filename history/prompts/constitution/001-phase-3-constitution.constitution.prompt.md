---
id: "001"
title: "Phase 3 Constitution"
stage: constitution
date: "2026-02-09"
surface: agent
model: gemini-2.0-flash-thinking-exp-1219
feature: none
branch: main
user: "A.s Computer`s"
command: /sp.constitution
labels: [constitution, governance, phase-3]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests: []
---

# User Prompt

```text
/sp.constitution # Phase 3 Constitution: AI-Powered Todo Chatbot

## 1. Core Mandate
- [cite_start]This project is strictly Spec-Driven[cite: 27]. [cite_start]No code shall be written or modified without a corresponding Task ID from `speckit.tasks`[cite: 981, 1029].
- [cite_start]The primary goal is to transform the Phase 2 CRUD app into a stateless, AI-managed system using the Agentic Dev Stack[cite: 55, 133].

## 2. Technical Architecture Rules
- [cite_start]**Statelessness**: The backend (FastAPI) must remain 100% stateless[cite: 432, 487]. [cite_start]Every AI request must fetch context from the Neon DB and save the response back immediately[cite: 480, 485, 523].
- [cite_start]**Agent Framework**: Must use OpenAI Agents SDK for the runner logic and Official MCP SDK for tool definitions[cite: 32, 430, 431].
- [cite_start]**Security**: All API calls must be protected by JWT tokens issued by Better Auth[cite: 154, 158]. [cite_start]The agent must never access data that does not belong to the current `user_id`[cite: 159, 171].

## 3. Development Guidelines
- [cite_start]**Clean Code**: Follow clean code principles and proper Python 3.13+ project structure[cite: 101, 104].
- [cite_start]**Code Injection**: Every generated file must include a comment linking it to the specific Task and Spec section it addresses[cite: 986].
- [cite_start]**Failure Mode**: If an agent encounters an underspecified requirement, it must stop and ask for clarification instead of improvising[cite: 987, 1028].
```

# Assistant Response

Updated constitution to v1.0.0 with Phase 3 mandates:
- **Spec-Driven**: Mandatory task linkage.
- **Architecture**: Stateless FastAPI + Neon DB context storage.
- **Stack**: OpenAI Agents SDK + MCP SDK + Better Auth.
- **Governance**: Strict failure mode for underspecified requirements.

PHR created: `history/prompts/constitution/001-phase-3-constitution.constitution.prompt.md`

<!--
SYNC IMPACT REPORT
Version change: 1.0.0 -> 1.1.0
Modified Principles:
- Agentic Framework & Tooling: Added specific reference to Gemini API via compatibility layer.
Modified Sections:
- Technical Architecture Rules / Stack Requirements: Added AI Model.
Templates requiring updates: None.
-->

# Phase 3: AI-Powered Todo Chatbot Constitution

## Core Principles

### I. Spec-Driven Development
This project is strictly Spec-Driven. No code shall be written or modified without a corresponding Task ID from `speckit.tasks`. The primary goal is to transform the Phase 2 CRUD app into a stateless, AI-managed system using the Agentic Dev Stack.

### II. Stateless Architecture
The backend (FastAPI) must remain 100% stateless. Every AI request must fetch context from the Neon DB and save the response back immediately.

### III. Agentic Framework & Tooling
Must use OpenAI Agents SDK for the runner logic (configured to use Gemini API via compatibility layer) and Official MCP SDK for tool definitions. The system operates on a project level to provide guidance and execute tasks.

### IV. Security & Isolation
All API calls must be protected by JWT tokens issued by Better Auth. The agent must never access data that does not belong to the current `user_id`.

### V. Failure Mode Protocol
If an agent encounters an underspecified requirement, it must stop and ask for clarification instead of improvising.

## Technical Architecture Rules

### Stack Requirements
- **AI Model**: Gemini API (via OpenAI SDK compatibility)
- **Backend**: FastAPI (Stateless)
- **Database**: Neon DB (Context Storage)
- **Agents**: OpenAI Agents SDK
- **Tools**: Official MCP SDK
- **Auth**: Better Auth (JWT)

## Development Guidelines

### Code Quality & Tracing
Follow clean code principles and proper Python 3.13+ project structure. Every generated file must include a comment linking it to the specific Task and Spec section it addresses.

### Failure Mode
If an agent encounters an underspecified requirement, it must stop and ask for clarification instead of improvising.

## Governance

This constitution supersedes all other practices. Amendments require documentation, approval, and explicit version bumping. All PRs/reviews must verify compliance with these mandates.

**Version**: 1.1.0 | **Ratified**: 2026-02-09 | **Last Amended**: 2026-02-09

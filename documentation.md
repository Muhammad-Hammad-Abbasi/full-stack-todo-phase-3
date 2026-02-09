# AI-Powered Todo System (Phase 3) - Project Documentation

> **Note regarding Repository Issues:**
> There is an issue with pushing two folders to the GitHub repository. These folders are currently not synced with the remote origin.
> 
> ![Issue Screenshot](C:\Users\A.s%20Computer`s\.gemini	mp\26e1562c190363f3f7f825669bbd22f30506f33c28bdc0ab79c1a0a31b396f91\images\clipboard-1770658425417.png)

## Overview

This project is the third phase of a Todo CRUD application, evolved into a stateless, AI-powered distributed system. It enables users to manage their tasks through a professional dashboard and a conversational AI interface.

## Core Features

### 1. AI-Powered Chat Interface
- **Natural Language Task Management:** Users can add, list, update, and delete tasks by chatting with the AI.
- **Persistent Conversations:** Chat history is saved in a PostgreSQL database (Neon DB) using SQLModel.
- **Context Awareness:** The AI maintains context over multiple turns using a sliding window strategy.
- **Glassmorphism UI:** A sleek, semi-transparent chat sidebar integrated into the dashboard.

### 2. Professional Dashboard
- **Stats Summary:** High-level overview of productivity with "Total", "Completed", and "To Do" task counts.
- **Task Management:** A clean interface for viewing, searching, and filtering tasks.
- **Unified Layout:** Consistent navigation with a persistent sidebar and header.
- **Modern Design:** Built with Tailwind CSS, Lucide-React icons, and a primary brand color of `#EB6824`.

### 3. Stateless Backend Architecture
- **FastAPI:** A high-performance, asynchronous web framework for the API.
- **MCP Server:** Implements the Model Context Protocol to expose task operations as tools for the AI agent.
- **Scalability:** The system is designed to be stateless, fetching conversation history and user data as needed for each request.

## Technical Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Lucide-React.
- **Backend:** FastAPI, Python, SQLModel (SQLAlchemy wrapper).
- **Database:** PostgreSQL (hosted on Neon).
- **AI Model:** Google Gemini 2.0 Flash (integrated via OpenAI SDK bridge).
- **Development Protocol:** Spec-Driven Development (SDD) using the Panaversity Spec-Kit Plus.

## Project Structure

- `frontend/`: Next.js frontend application.
- `backend/`: FastAPI backend application, including database models and MCP tools.
- `specs/`: Detailed feature specifications, data models, and implementation plans.
- `history/`: Prompt history and conversational logs.
- `GEMINI.md`: Project-specific AI agent behavioral constitution.

## Getting Started

Detailed instructions for setting up the environment and running the services can be found in the respective `frontend` and `backend` directories.

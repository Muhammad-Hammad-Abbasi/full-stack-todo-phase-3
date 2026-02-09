# Developer Quickstart: AI-Powered Todo Chatbot

## Prerequisites
- **Gemini API Key**: Set `GOOGLE_API_KEY` in `backend/.env`.
- **Database**: Ensure Neon DB (or local Postgres) is running and migrated.

## Backend Setup
1. **Install Dependencies**:
   ```bash
   cd backend
   pip install -r requirements.txt # (Ensure openai-agents, mcp, pydantic-ai are added)
   ```
2. **Apply Migrations**:
   ```bash
   # Add new tables
   # (Assuming alembic or init_db script handles this - check tasks)
   python init_db.py 
   ```
3. **Run Server**:
   ```bash
   uvicorn app.main:app --reload
   ```

## Frontend Setup
1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install ai # Vercel AI SDK
   ```
2. **Run Dev Server**:
   ```bash
   npm run dev
   ```

## Verification
1. Navigate to `http://localhost:3000/chat`.
2. Login if prompted.
3. Type "Add a task to buy milk".
4. Check database: `SELECT * FROM tasks WHERE title = 'buy milk';`.
5. Check context: Type "Make it high priority" and verify the task updates.

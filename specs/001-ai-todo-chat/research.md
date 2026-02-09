# Research & Technical Decisions

## 1. Database Schema for Chat History
**Decision**: Use two tables: `conversations` (1:1 with user) and `messages` (1:N with conversation).
**Rationale**: 
- `conversations` table ensures we can easily enforce the "Single Continuous Thread" rule per user.
- `messages` table allows efficient retrieval of the last 20 messages (Sliding Window) using standard SQL `ORDER BY created_at DESC LIMIT 20`.
- Storing messages individually is better than a JSON blob for query performance and partial history retrieval.
**Alternatives Considered**: 
- **JSON Blob**: Storing the entire chat in one `conversations` row. Rejected because it complicates partial fetching (sliding window) and has size limits.
- **Vector DB**: Not needed yet. Basic sliding window is sufficient for requirements.

## 2. Gemini Model Selection
**Decision**: `gemini-2.0-flash`
**Rationale**: 
- Low latency (<3s target) is critical for chat.
- Sufficient context window for sliding window strategy.
- Cost-effective for high-frequency chat interactions.
- Capable of tool calling (MCP).
**Alternatives Considered**:
- `gemini-1.5-pro`: Higher latency/cost, likely overkill for simple todo management.
- `gemini-1.5-flash`: Good fallback, but 2.0 is the target per constitution mandate/general direction.

## 3. Tool Definition Strategy (MCP)
**Decision**: Use `mcp` python package to define tools.
**Rationale**: Constitution mandates Official MCP SDK.
**Pattern**:
- Define tools as standalone functions decorated with `@mcp.tool`.
- Tools wrap existing CRUD operations from `crud/task.py`.
- Agent runner injects these tools into the Gemini API call.

## 4. Frontend Integration
**Decision**: Use `Vercel AI SDK` (`useChat` hook).
**Rationale**: 
- Simplifies state management for streaming chat responses.
- Handles optimistic UI updates.
- Standard pattern for Next.js AI apps.

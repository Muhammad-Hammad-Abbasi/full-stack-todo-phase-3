# Data Model

## Entities

### Conversation
Represents the single persistent chat thread for a user.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | Integer (PK) | Yes | Auto-incrementing ID |
| user_id | Integer (FK) | Yes | Links to User. Enforces 1:1 per user (unique constraint). |
| created_at | Timestamp | Yes | UTC |
| updated_at | Timestamp | Yes | UTC (Last activity) |

### Message
Individual chat turns.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | Integer (PK) | Yes | Auto-incrementing ID |
| conversation_id | Integer (FK) | Yes | Links to Conversation |
| role | Enum/String | Yes | 'user', 'assistant', 'tool' |
| content | Text | Yes | The message body or tool result |
| tool_calls | JSON | No | Stores tool call details if role='assistant' |
| created_at | Timestamp | Yes | UTC |

## Relationships
- **User** has **One** Conversation (1:1)
- **Conversation** has **Many** Messages (1:N)

## Constraints
- `unique(user_id)` on `conversations` table.
- `role` must be valid ('user', 'assistant', 'tool').

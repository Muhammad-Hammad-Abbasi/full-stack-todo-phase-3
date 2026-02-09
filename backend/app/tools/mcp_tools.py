from typing import Optional, List
from uuid import UUID
from app.crud import task as task_crud
from app.models.task import Task
from sqlalchemy.ext.asyncio import AsyncSession

# Tool Definitions
# These functions will be called by the Agent Runner

async def add_task(db: AsyncSession, user_id: UUID, title: str, description: Optional[str] = None) -> str:
    """Create a new task."""
    task_data = {"title": title, "description": description}
    task = await task_crud.create_task(db, task_data, user_id)
    return f"Task created with ID: {task.id}"

async def list_tasks(db: AsyncSession, user_id: UUID, status: str = "all") -> str:
    """List tasks. Status can be 'all', 'pending', or 'completed'."""
    tasks = await task_crud.get_tasks_by_user(db, user_id)
    
    filtered_tasks = []
    if status == "completed":
        filtered_tasks = [t for t in tasks if t.is_completed]
    elif status == "pending":
        filtered_tasks = [t for t in tasks if not t.is_completed]
    else:
        filtered_tasks = tasks

    if not filtered_tasks:
        return "No tasks found."
        
    return "\n".join([f"- [{ 'x' if t.is_completed else ' ' }] {t.title} (ID: {t.id})" for t in filtered_tasks])

async def update_task(db: AsyncSession, user_id: UUID, task_id: str, title: Optional[str] = None, description: Optional[str] = None, is_completed: Optional[bool] = None) -> str:
    """Update a task's title, description or completion status."""
    try:
        uuid_id = UUID(task_id)
    except ValueError:
        return "Invalid Task ID format."

    task = await task_crud.get_task(db, uuid_id, user_id)
    if not task:
        return f"Task {task_id} not found."
    
    update_data = {}
    if title is not None:
        update_data["title"] = title
    if description is not None:
        update_data["description"] = description
    if is_completed is not None:
        update_data["is_completed"] = is_completed
        
    await task_crud.update_task(db, task, update_data)
    return f"Task {task_id} updated."

async def complete_task(db: AsyncSession, user_id: UUID, task_id: str) -> str:
    """Mark a task as completed."""
    return await update_task(db, user_id, task_id, is_completed=True)

async def delete_task(db: AsyncSession, user_id: UUID, task_id: str) -> str:
    """Delete a task."""
    try:
        uuid_id = UUID(task_id)
    except ValueError:
        return "Invalid Task ID format."

    task = await task_crud.get_task(db, uuid_id, user_id)
    if not task:
        return f"Task {task_id} not found."
        
    await task_crud.delete_task(db, task)
    return f"Task {task_id} deleted."

# Registry of tools for easy lookup
TOOLS = {
    "add_task": add_task,
    "list_tasks": list_tasks,
    "update_task": update_task,
    "complete_task": complete_task,
    "delete_task": delete_task
}

# OpenAI/Gemini Tool Schemas
TOOL_SCHEMAS = [
    {
        "type": "function",
        "function": {
            "name": "add_task",
            "description": "Create a new task",
            "parameters": {
                "type": "object",
                "properties": {
                    "title": {"type": "string"},
                    "description": {"type": "string"}
                },
                "required": ["title"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "list_tasks",
            "description": "List tasks",
            "parameters": {
                "type": "object",
                "properties": {
                    "status": {"type": "string", "enum": ["all", "pending", "completed"]}
                }
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "update_task",
            "description": "Update a task",
            "parameters": {
                "type": "object",
                "properties": {
                    "task_id": {"type": "string"},
                    "title": {"type": "string"},
                    "description": {"type": "string"},
                    "is_completed": {"type": "boolean"}
                },
                "required": ["task_id"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "complete_task",
            "description": "Mark a task as completed",
            "parameters": {
                "type": "object",
                "properties": {
                    "task_id": {"type": "string"}
                },
                "required": ["task_id"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "delete_task",
            "description": "Delete a task",
            "parameters": {
                "type": "object",
                "properties": {
                    "task_id": {"type": "string"}
                },
                "required": ["task_id"]
            }
        }
    }
]

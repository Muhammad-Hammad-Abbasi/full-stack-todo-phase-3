from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.db.session import get_db
from app.core.auth import get_current_user
from app.models.user import User
from app.models.task import Task
from app.crud import task as task_crud
from pydantic import BaseModel
from uuid import UUID

router = APIRouter()

class TaskCreate(BaseModel):
    title: str
    description: str | None = None

class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    is_completed: bool | None = None

@router.get("/", response_model=List[Task])
async def read_tasks(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return await task_crud.get_tasks_by_user(db, user_id=current_user.id)

@router.post("/", response_model=Task, status_code=status.HTTP_201_CREATED)
async def create_task(
    task_in: TaskCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return await task_crud.create_task(db, task_data=task_in.model_dump(), user_id=current_user.id)

@router.patch("/{task_id}", response_model=Task)
async def update_task(
    task_id: UUID,
    task_in: TaskUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_task = await task_crud.get_task(db, task_id=task_id, user_id=current_user.id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return await task_crud.update_task(db, db_task=db_task, update_data=task_in.model_dump(exclude_unset=True))

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    task_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_task = await task_crud.get_task(db, task_id=task_id, user_id=current_user.id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    await task_crud.delete_task(db, db_task=db_task)
    return None

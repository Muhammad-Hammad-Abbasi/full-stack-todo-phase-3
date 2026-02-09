from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from app.models.task import Task
from app.models.user import User
from uuid import UUID
from typing import List

async def create_task(db: AsyncSession, task_data: dict, user_id: UUID) -> Task:
    db_task = Task(**task_data, user_id=user_id)
    db.add(db_task)
    await db.commit()
    await db.refresh(db_task)
    return db_task

async def get_tasks_by_user(db: AsyncSession, user_id: UUID) -> List[Task]:
    result = await db.execute(
        select(Task).where(Task.user_id == user_id).order_by(Task.created_at.desc())
    )
    return result.scalars().all()

async def get_task(db: AsyncSession, task_id: UUID, user_id: UUID) -> Task | None:
    result = await db.execute(
        select(Task).where(Task.id == task_id, Task.user_id == user_id)
    )
    return result.scalar_one_or_none()

async def update_task(db: AsyncSession, db_task: Task, update_data: dict) -> Task:
    for key, value in update_data.items():
        setattr(db_task, key, value)
    db.add(db_task)
    await db.commit()
    await db.refresh(db_task)
    return db_task

async def delete_task(db: AsyncSession, db_task: Task) -> None:
    await db.delete(db_task)
    await db.commit()

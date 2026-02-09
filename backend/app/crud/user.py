from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from app.models.user import User, UserCreate
from app.models.task import Task
import bcrypt

async def get_by_email(db: AsyncSession, email: str) -> Optional[User]:
    result = await db.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()

async def authenticate(
    db: AsyncSession, email: str, password: str
) -> Optional[User]:
    user = await get_by_email(db, email=email)
    if not user:
        return None
    if not bcrypt.checkpw(password.encode('utf-8'), user.password_hash.encode('utf-8')):
        return None
    return user

async def create(db: AsyncSession, obj_in: UserCreate) -> User:
    password_hash = bcrypt.hashpw(
        obj_in.password.encode('utf-8'), bcrypt.gensalt()
    ).decode('utf-8')
    
    db_obj = User(
        email=obj_in.email,
        password_hash=password_hash,
        name=obj_in.name,
    )
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj

import asyncio
from sqlmodel import SQLModel
from app.db.session import engine
# Import all models so they are registered with SQLModel.metadata
from app.models.user import User
from app.models.task import Task
from app.models.chat import Conversation, Message

async def init_db():
    async with engine.begin() as conn:
        # For development, you might want to drop tables first
        # await conn.run_sync(SQLModel.metadata.drop_all)
        await conn.run_sync(SQLModel.metadata.create_all)
    print("Database tables created successfully.")

if __name__ == "__main__":
    asyncio.run(init_db())

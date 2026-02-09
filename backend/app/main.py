from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.session import engine
from sqlmodel import SQLModel

# Import all models here to ensure they are registered with SQLModel.metadata before router
from app.models.user import User
from app.models.task import Task
from app.models.chat import Conversation, Message

from app.api.v1.api import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

@app.on_event("startup")
async def on_startup():
    # This creates the tables in the database if they don't exist
    async with engine.begin() as conn:
        # await conn.run_sync(SQLModel.metadata.drop_all) # Only for reset
        await conn.run_sync(SQLModel.metadata.create_all)

# Set all CORS enabled origins
if settings.CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin).strip() for origin in settings.CORS_ORIGINS.split(",")] if isinstance(settings.CORS_ORIGINS, str) else settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {"message": "Welcome to the Todo App API"}
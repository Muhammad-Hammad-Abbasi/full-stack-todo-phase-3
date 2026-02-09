from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.pool import NullPool
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Handle asyncpg driver requirement
if DATABASE_URL and DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

# Remove incompatible query parameters for asyncpg if present
if DATABASE_URL and "sslmode=" in DATABASE_URL:
    DATABASE_URL = DATABASE_URL.split("?")[0]

# Define connection arguments (handling SSL)
connect_args = {}
if os.getenv("RENDER") or "neon.tech" in (DATABASE_URL or ""):
    connect_args = {"ssl": "require"}

engine = create_async_engine(
    DATABASE_URL,
    poolclass=NullPool,
    connect_args=connect_args,
)

SessionLocal = async_sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    expire_on_commit=False,
)

async def get_db():
    async with SessionLocal() as session:
        yield session
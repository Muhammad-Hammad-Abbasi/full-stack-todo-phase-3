from typing import Optional, List, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
import uuid
from pydantic import EmailStr, BaseModel

if TYPE_CHECKING:
    from .task import Task

class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True)
    name: Optional[str] = None

class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    password_hash: str
    
    tasks: List["Task"] = Relationship(back_populates="user")

# Pydantic Schemas for API
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    token: str
    user: dict
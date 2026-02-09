from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.crud import user as crud_user
from app.db.session import get_db
from app.core.auth import create_access_token
from app.models.user import UserCreate, UserLogin, Token

router = APIRouter()

@router.post("/login", response_model=Token)
async def login(
    login_data: UserLogin,
    db: AsyncSession = Depends(get_db)
) -> Any:
    user = await crud_user.authenticate(db, email=login_data.email, password=login_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    access_token_expires = timedelta(minutes=60 * 24 * 7)
    return {
        "token": create_access_token(user.id, expires_delta=access_token_expires),
        "user": {"id": user.id, "name": user.name, "email": user.email}
    }

@router.post("/signup")
async def signup(
    user_in: UserCreate,
    db: AsyncSession = Depends(get_db)
) -> Any:
    user = await crud_user.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    user = await crud_user.create(db, obj_in=user_in)
    return {"message": "User created successfully"}
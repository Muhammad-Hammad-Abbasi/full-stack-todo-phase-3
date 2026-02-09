import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.core.config import settings
from uuid import uuid4

@pytest.mark.asyncio
async def test_create_task_unauthorized():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post(
            f"{settings.API_V1_STR}/tasks/",
            json={"title": "Test Task"}
        )
    assert response.status_code == 401

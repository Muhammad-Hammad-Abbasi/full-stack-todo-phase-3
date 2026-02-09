import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.core.config import settings
from unittest.mock import patch, MagicMock
from app.core.auth import get_current_user

@pytest.mark.asyncio
async def test_chat_unauthorized():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post(
            f"{settings.API_V1_STR}/some-uuid/chat",
            json={"message": "hello"}
        )
    assert response.status_code == 401

from uuid import uuid4

@pytest.mark.asyncio
@patch("app.api.v1.endpoints.chat.get_agent_client")
async def test_chat_isolation_fail(mock_agent):
    # Mock user A
    user_id_a = uuid4()
    user_id_b = uuid4()
    user_a = MagicMock()
    user_a.id = user_id_a
    
    app.dependency_overrides[get_current_user] = lambda: user_a
    
    try:
        # Try to access chat for user B
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
            response = await ac.post(
                f"{settings.API_V1_STR}/{user_id_b}/chat",
                json={"message": "hello"},
                headers={"Authorization": "Bearer fake-token"}
            )
        
        # FR-005: Enforce data isolation
        assert response.status_code == 403
        assert response.json()["detail"] == "Unauthorized access to chat"
    finally:
        del app.dependency_overrides[get_current_user]

@pytest.mark.asyncio
@patch("app.api.v1.endpoints.chat.get_agent_client")
@patch("app.api.v1.endpoints.chat.get_model_name")
async def test_chat_success_basic(mock_model, mock_agent_client):
    # 1. Mock Auth
    user_id = uuid4()
    user = MagicMock()
    user.id = user_id
    
    app.dependency_overrides[get_current_user] = lambda: user
    
    try:
        # 2. Mock Agent Client
        mock_client = MagicMock()
        mock_agent_client.return_value = mock_client
        mock_model.return_value = "fake-model"
        
        # Mock LLM response (No tool calls)
        mock_response = MagicMock()
        mock_response.choices = [MagicMock()]
        mock_response.choices[0].message.content = "Hello! I am your assistant."
        mock_response.choices[0].message.tool_calls = None
        mock_client.chat.completions.create.return_value = mock_response
        
        # 3. Call API
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
            response = await ac.post(
                f"{settings.API_V1_STR}/{user_id}/chat",
                json={"message": "Hi"},
                headers={"Authorization": "Bearer fake-token"}
            )
        
        assert response.status_code == 200
        assert response.json()["response"] == "Hello! I am your assistant."
    finally:
        del app.dependency_overrides[get_current_user]
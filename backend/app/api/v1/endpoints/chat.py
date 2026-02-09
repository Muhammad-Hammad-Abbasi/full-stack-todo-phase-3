from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.core.auth import get_current_user
from app.models.user import User
from app.core.agent_config import get_agent_client, get_model_name
from app.tools.mcp_tools import TOOLS, TOOL_SCHEMAS
from app.core.prompts import SYSTEM_PROMPT
from sqlalchemy.future import select
from app.models.chat import Conversation, Message
from typing import List, Optional
import json
import asyncio
import logging

router = APIRouter()

class ChatRequest(BaseModel):
    message: str | None = None
    messages: list | None = None
    conversation_id: Optional[int] = None

class ChatResponse(BaseModel):
    response: str
    tool_calls: list = []
    conversation_id: int

class ConversationRead(BaseModel):
    id: int
    title: str
    updated_at: str

class MessageRead(BaseModel):
    role: str
    content: str

logger = logging.getLogger(__name__)

@router.get("/conversations", response_model=List[ConversationRead])
async def list_conversations(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    result = await db.execute(
        select(Conversation)
        .where(Conversation.user_id == current_user.id)
        .order_by(Conversation.updated_at.desc())
    )
    convs = result.scalars().all()
    return [{"id": c.id, "title": c.title, "updated_at": c.updated_at.isoformat()} for c in convs]

@router.get("/conversations/{conversation_id}/history", response_model=List[MessageRead])
async def get_conversation_history(
    conversation_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    result = await db.execute(
        select(Conversation).where(Conversation.id == conversation_id, Conversation.user_id == current_user.id)
    )
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    result = await db.execute(
        select(Message)
        .where(Message.conversation_id == conversation_id)
        .order_by(Message.created_at.asc())
    )
    messages = result.scalars().all()
    return [{"role": m.role, "content": m.content} for m in messages]

@router.post("/{user_id}/chat", response_model=ChatResponse)
async def chat_with_agent(
    user_id: str,
    request: ChatRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if str(current_user.id) != user_id:
        raise HTTPException(status_code=403, detail="Unauthorized access to chat")

    current_msg_content = request.message
    if not current_msg_content and request.messages:
        last_msg = request.messages[-1]
        current_msg_content = last_msg.get("content")
    
    if not current_msg_content:
        raise HTTPException(status_code=422, detail="Message content is required")

    # 1. Get or Create Conversation
    conversation = None
    if request.conversation_id:
        result = await db.execute(
            select(Conversation).where(Conversation.id == request.conversation_id, Conversation.user_id == current_user.id).with_for_update()
        )
        conversation = result.scalar_one_or_none()
    
    if not conversation:
        # Create new if not provided or not found
        # Logic: If it's the first message, the title should be derived from it
        title = (current_msg_content[:30] + '...') if len(current_msg_content) > 30 else current_msg_content
        conversation = Conversation(user_id=current_user.id, title=title)
        db.add(conversation)
        await db.commit()
        await db.refresh(conversation)
    
    # 2. Sliding Window Context
    result = await db.execute(
        select(Message)
        .where(Message.conversation_id == conversation.id)
        .order_by(Message.created_at.desc())
        .limit(40)
    )
    history_messages = result.scalars().all()
    history_messages = history_messages[::-1]
    
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for msg in history_messages:
        if msg.role in ["user", "assistant"]:
             messages.append({"role": msg.role, "content": msg.content})

    messages.append({"role": "user", "content": current_msg_content})
    
    user_msg_db = Message(
        conversation_id=conversation.id,
        role="user",
        content=current_msg_content
    )
    db.add(user_msg_db)
    await db.commit()

    client = get_agent_client()
    model = get_model_name()
    
    tool_calls_log = []
    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = client.chat.completions.create(
                model=model,
                messages=messages,
                tools=TOOL_SCHEMAS,
                tool_choice="auto"
            )
            
            response_message = response.choices[0].message
            
            if response_message.tool_calls:
                messages.append(response_message)
                tool_calls_data = [{"id": tc.id, "name": tc.function.name, "arguments": tc.function.arguments} for tc in response_message.tool_calls]
                db.add(Message(conversation_id=conversation.id, role="assistant", content=response_message.content or "", tool_calls=tool_calls_data))
                await db.commit()
                
                for tool_call in response_message.tool_calls:
                    function_name = tool_call.function.name
                    function_args = json.loads(tool_call.function.arguments)
                    tool_calls_log.append({"name": function_name, "args": function_args})
                    
                    if function_name in TOOLS:
                        try:
                            tool_result = await TOOLS[function_name](db=db, user_id=current_user.id, **function_args)
                        except Exception as e:
                            tool_result = f"Error executing tool {function_name}: {str(e)}"
                    else:
                        tool_result = f"Error: Tool {function_name} not found"
                    
                    messages.append({"tool_call_id": tool_call.id, "role": "tool", "name": function_name, "content": tool_result})
                    db.add(Message(conversation_id=conversation.id, role="tool", content=tool_result))
                    await db.commit()
                
                final_response = client.chat.completions.create(model=model, messages=messages)
                final_text = final_response.choices[0].message.content
                db.add(Message(conversation_id=conversation.id, role="assistant", content=final_text))
                await db.commit()
                return ChatResponse(response=final_text, tool_calls=tool_calls_log, conversation_id=conversation.id)
            
            final_text = response_message.content
            db.add(Message(conversation_id=conversation.id, role="assistant", content=final_text))
            await db.commit()
            return ChatResponse(response=final_text, conversation_id=conversation.id)

        except Exception as e:
            logger.error(f"AI API Error (Attempt {attempt+1}/{max_retries}): {str(e)}")
            if attempt == max_retries - 1:
                # Return a friendly message for ANY AI failure instead of raw technical errors
                raise HTTPException(
                    status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                    detail="I'm having a little trouble connecting to my brain. Can you try again in a moment?"
                )
            await asyncio.sleep(2 ** (attempt + 1))

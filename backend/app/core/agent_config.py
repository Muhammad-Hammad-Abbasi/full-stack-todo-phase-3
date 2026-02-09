import os
from openai import OpenAI
from pydantic_ai import Agent

# Gemini Configuration via OpenAI Compatibility
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai/"

if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY is not set in environment variables")

client = OpenAI(
    api_key=GOOGLE_API_KEY,
    base_url=BASE_URL
)

# Model configuration
MODEL_NAME = "gemini-1.5-flash" 

def get_agent_client():
    return client

def get_model_name():
    return MODEL_NAME

from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    groq_api_key: str
    chroma_persist_directory: str = "./chroma_db"
    embedding_model: str = "all-MiniLM-L6-v2"
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()

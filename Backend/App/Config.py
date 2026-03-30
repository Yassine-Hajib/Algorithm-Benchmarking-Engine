from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "AlgoBench API"
    VERSION: str = "1.0.0"
    CORS_ORIGINS: list[str] = ["http://localhost:5173"]

    class Config:
        env_file = ".env"

settings = Settings()
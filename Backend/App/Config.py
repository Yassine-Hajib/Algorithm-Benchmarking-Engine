from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "AlgoBench API"
    VERSION: str = "1.0.0"
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175",
    ]


    class Config:
        env_file = ".env"

settings = Settings()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Backend.App.Config import settings
from Backend.Routes.Execute import router as execute_router

app = FastAPI(title=settings.APP_NAME, version=settings.VERSION)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(execute_router, prefix="/api", tags=["benchmark"])

@app.get("/")
def root():
    return {"status": "ok", "app": settings.APP_NAME}
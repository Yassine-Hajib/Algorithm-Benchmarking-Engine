from fastapi  import FastAPI
from Routes import Auth_Routes ,Execute ,Task_Routes,Celery_worker

app=FastAPI()  
app.include_router(Auth_Routes.router)
app.include_router(Execute.router)
app.include_router(Task_Routes.router)
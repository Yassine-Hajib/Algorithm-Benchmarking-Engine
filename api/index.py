import sys
import os

# Add the project root to Python path so Backend imports work
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Backend.Engines.Registry import ALGORITHMS
from Backend.Engines.Runner import run_algorithm, compare_algorithms
from Backend.App.Schemas import RunRequest, CompareRequest, MetricsOut, CompareOut
from fastapi import HTTPException

app = FastAPI(title="AlgoBench API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "ok", "app": "AlgoBench API"}

@app.get("/api/algorithms")
def list_algorithms():
    return {"algorithms": list(ALGORITHMS.keys()), "count": len(ALGORITHMS)}

@app.post("/api/run", response_model=MetricsOut)
def run(req: RunRequest):
    try:
        return run_algorithm(req.algorithm, req.input)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Engine Error: {str(e)}")

@app.post("/api/compare", response_model=CompareOut)
def compare(req: CompareRequest):
    try:
        return compare_algorithms(req.algorithm1, req.algorithm2, req.input)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Engine Error: {str(e)}")
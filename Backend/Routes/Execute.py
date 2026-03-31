from fastapi import APIRouter, HTTPException
from Backend.App.Schemas import RunRequest, CompareRequest, MetricsOut, CompareOut
from Backend.Engines.Runner import run_algorithm, compare_algorithms
from Backend.Engines.Registry import ALGORITHMS

router = APIRouter()

@router.get("/algorithms")
def list_algorithms():
    # Ready for the Sidebar.jsx to fetch and display available choices
    return {"algorithms": list(ALGORITHMS.keys()), "count": len(ALGORITHMS)}

@router.post("/run", response_model=MetricsOut)
def run(req: RunRequest):
    try:
        return run_algorithm(req.algorithm, req.input)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        # Standardized error reporting for the Frontend
        raise HTTPException(status_code=500, detail=f"Engine Error: {str(e)}")
    

@router.post("/compare", response_model=CompareOut)
def compare(req: CompareRequest):
    try:
        return compare_algorithms(req.algorithm1, req.algorithm2, req.input)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Engine Error: {str(e)}")
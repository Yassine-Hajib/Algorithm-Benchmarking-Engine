from pydantic import BaseModel
from typing import Any

class RunRequest(BaseModel):
    algorithm: str
    input: Any

class CompareRequest(BaseModel):
    algorithm1: str
    algorithm2: str
    input: Any

class MetricsOut(BaseModel):
    algorithm: str
    input: Any
    result: Any
    execution_time: float
    call_count: int
    max_depth: int

class CompareOut(BaseModel):
    input: Any
    comparison: dict
    analysis: dict
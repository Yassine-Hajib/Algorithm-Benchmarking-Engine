import time
from typing import Any, Dict
from Backend.Engines.Registry import ALGORITHMS


def run_algorithm(name: str, value: Any) -> Dict[str, Any]:
    if name not in ALGORITHMS:
        raise ValueError(f"Algorithm '{name}' not found.")
    

    selected_fct = ALGORITHMS[name]
    
    # Start high-precision timer
    start = time.perf_counter()
    try:
        output = selected_fct(value)
    except Exception as e:
        raise RuntimeError(f"Algorithm execution failed: {str(e)}")
    end = time.perf_counter()

   
    if isinstance(output, tuple) and len(output) == 2:
        result, metrics = output
    else:
        result = output
        metrics = {"call_count": 1, "max_depth": 1}
    return {
        "algorithm": name,
        "input": value,
        "result": result,
        "execution_time": end - start,
        "call_count": metrics.get("call_count", 1),
        "max_depth": metrics.get("max_depth", 1)
    }

def compare_algorithms(name1: str, name2: str, value: Any) -> Dict[str, Any]:
    """Comparison logic skeleton."""
    res1 = run_algorithm(name1, value)
    res2 = run_algorithm(name2, value)

    t1, t2 = res1["execution_time"], res2["execution_time"]
    winner = name1 if t1 < t2 else (name2 if t2 < t1 else "Tie")

    return {
        "input": value,
        "comparison": {name1: res1, name2: res2},
        "analysis": {
            "winner_by_time": winner,
            "time_difference": abs(t1 - t2),
            "call_difference": abs(res1["call_count"] - res2["call_count"]),
            "depth_difference": abs(res1["max_depth"] - res2["max_depth"])
        }
    }
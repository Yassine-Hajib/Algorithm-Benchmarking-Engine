def Hanoi_Recursive(data, metrics=None):
   
    if metrics is None:
        metrics = {"call_count": 0, "current_depth": 0, "max_depth": 0}

    metrics["call_count"] += 1
    metrics["current_depth"] += 1
    if metrics["current_depth"] > metrics["max_depth"]:
        metrics["max_depth"] = metrics["current_depth"]

    n  = data["n"] if isinstance(data, dict) else data
    source = data.get("source", "A") if isinstance(data, dict) else "A"
    dest = data.get("dest","C") if isinstance(data, dict) else "C"
    aux = data.get("aux","B") if isinstance(data, dict) else "B"
    moves = data.get("moves",[]) if isinstance(data, dict) else []

    if n == 0:
        metrics["current_depth"] -= 1
        return moves, metrics

    moves, metrics = Hanoi_Recursive(
        {"n": n - 1, "source": source, "dest": aux, "aux": dest, "moves": moves},
        metrics
    )

    
    moves.append(f"Move disk {n}: {source} → {dest}")
    metrics["call_count"] += 1

  
    moves, metrics = Hanoi_Recursive(
        {"n": n - 1, "source": aux, "dest": dest, "aux": source, "moves": moves},
        metrics
    )

    metrics["current_depth"] -= 1
    return moves, metrics
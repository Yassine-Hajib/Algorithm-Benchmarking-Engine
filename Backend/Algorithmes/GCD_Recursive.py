def GCD_Recursive(data, metrics=None):
    
    if metrics is None:
        metrics = {"call_count": 0, "current_depth": 0, "max_depth": 0}

    metrics["call_count"] += 1
    metrics["current_depth"] += 1
    if metrics["current_depth"] > metrics["max_depth"]:
        metrics["max_depth"] = metrics["current_depth"]

    a = abs(data["a"])
    b = abs(data["b"])

    # Base case
    if b == 0:
        metrics["current_depth"] -= 1
        return a, metrics

    result, metrics = GCD_Recursive({"a": b, "b": a % b}, metrics)

    metrics["current_depth"] -= 1
    return result, metrics
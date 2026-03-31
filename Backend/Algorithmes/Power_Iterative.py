def Power_Iterative(data, metrics=None):
   
    if metrics is None:
        metrics = {"call_count": 0, "current_depth": 0, "max_depth": 0}

    metrics["call_count"] += 1
    metrics["current_depth"] += 1
    if metrics["current_depth"] > metrics["max_depth"]:
        metrics["max_depth"] = metrics["current_depth"]

    base = data["base"]
    exp = data["exp"]
    result = 1

    while exp > 0:
        metrics["call_count"] += 1
        if exp % 2 == 1:
            result *= base
        base *= base
        exp //= 2

    metrics["current_depth"] -= 1
    return result, metrics
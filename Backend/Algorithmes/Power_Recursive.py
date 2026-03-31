def Power_Recursive(data, metrics=None):
  
    if metrics is None:
        metrics = {"call_count": 0, "current_depth": 0, "max_depth": 0}

    metrics["call_count"] += 1
    metrics["current_depth"] += 1
    if metrics["current_depth"] > metrics["max_depth"]:
        metrics["max_depth"] = metrics["current_depth"]

    base = data["base"]
    exp = data["exp"]

    # Base cases
    if exp == 0:
        metrics["current_depth"] -= 1
        return 1, metrics

    if exp == 1:
        metrics["current_depth"] -= 1
        return base, metrics


    if exp % 2 == 0:
        half, metrics = Power_Recursive({"base": base, "exp": exp // 2}, metrics)
        result = half * half
    else:
        half, metrics = Power_Recursive({"base": base, "exp": (exp - 1) // 2}, metrics)
        result = half * half * base

    metrics["current_depth"] -= 1
    return result, metrics
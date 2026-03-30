def summ(n, metrics=None):
    if metrics is None:
        metrics = {"call_count": 0, "current_depth": 0, "max_depth": 0}
    metrics["call_count"] += 1
    metrics["current_depth"] += 1
    if metrics["current_depth"] > metrics["max_depth"]:
        metrics["max_depth"] = metrics["current_depth"]
    result = 0 if n == 0 else n + summ(n - 1, metrics)[0]
    metrics["current_depth"] -= 1
    return result, metrics
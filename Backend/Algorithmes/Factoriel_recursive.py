def factorial_with_metrics(n, metrics=None):

    if metrics is None:
        metrics = {
            "call_count": 0,
            "current_depth": 0,
            "max_depth": 0
        }

    metrics["call_count"] += 1
    metrics["current_depth"] += 1
    
    # Update max depth if needed
    if metrics["current_depth"] > metrics["max_depth"]:
        metrics["max_depth"] = metrics["current_depth"]

    if n == 0:
        result = 1
    else:
        result = n * factorial_with_metrics(n - 1, metrics)[0]

    # decrease depth
    metrics["current_depth"] -= 1

   
    return result, metrics
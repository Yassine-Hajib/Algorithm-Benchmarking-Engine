import math

def Prime_Checker_Iterative(n, metrics=None):
    if metrics is None:
        metrics = {"call_count": 0, "current_depth": 0, "max_depth": 0}

    metrics["call_count"] += 1
    metrics["current_depth"] += 1
    if metrics["current_depth"] > metrics["max_depth"]:
        metrics["max_depth"] = metrics["current_depth"]

    if n < 2:
        metrics["current_depth"] -= 1
        return False, metrics

    if n == 2:
        metrics["current_depth"] -= 1
        return True, metrics

    if n % 2 == 0:
        metrics["current_depth"] -= 1
        return False, metrics

    for i in range(3, int(math.sqrt(n)) + 1, 2):
        metrics["call_count"] += 1
        if n % i == 0:
            metrics["current_depth"] -= 1
            return False, metrics

    metrics["current_depth"] -= 1
    return True, metrics
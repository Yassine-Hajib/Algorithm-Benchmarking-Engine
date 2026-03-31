import math

def Prime_Checker_Recursive(n, metrics=None, divisor=None):
    if metrics is None:
        metrics = {"call_count": 0, "current_depth": 0, "max_depth": 0}

    metrics["call_count"] += 1
    metrics["current_depth"] += 1
    if metrics["current_depth"] > metrics["max_depth"]:
        metrics["max_depth"] = metrics["current_depth"]

    if divisor is None:
        if n < 2:
            metrics["current_depth"] -= 1
            return False, metrics
        if n == 2:
            metrics["current_depth"] -= 1
            return True, metrics
        if n % 2 == 0:
            metrics["current_depth"] -= 1
            return False, metrics
        divisor = 3

    
    if divisor > int(math.sqrt(n)):
        metrics["current_depth"] -= 1
        return True, metrics

    if n % divisor == 0:
        metrics["current_depth"] -= 1
        return False, metrics

    result, metrics = Prime_Checker_Recursive(n, metrics, divisor + 2)
    metrics["current_depth"] -= 1
    return result, metrics
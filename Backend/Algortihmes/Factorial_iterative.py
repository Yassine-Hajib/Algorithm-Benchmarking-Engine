def iterativeFactoriel(n, metrics=None):

    if metrics is None:
        metrics = {
            "call_count": 0,
            "current_depth": 0,
            "max_depth": 0
        }

    metrics["call_count"] += 1   
    metrics["current_depth"] += 1

    if metrics["current_depth"] > metrics["max_depth"]:
        metrics["max_depth"] = metrics["current_depth"]

    if n ==0 :
        result = 1
    else:
        res = 1
        for i in range(1, n + 1):
            res *= i
        result = res
            
    metrics["current_depth"] -= 1

    return result, metrics
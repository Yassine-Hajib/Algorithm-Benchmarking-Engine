def Linear_Search_Iterative(data, metrics=None):
    if metrics is None:
        metrics = {"call_count": 0, "current_depth": 0, "max_depth": 0}

    metrics["call_count"] += 1
    metrics["current_depth"] += 1
    if metrics["current_depth"] > metrics["max_depth"]:
        metrics["max_depth"] = metrics["current_depth"]

    arr    = data["arr"]
    target = data["target"]

    for i, val in enumerate(arr):
        metrics["call_count"] += 1
        if val == target:
            metrics["current_depth"] -= 1
            return i, metrics

    metrics["current_depth"] -= 1
    return -1, metrics

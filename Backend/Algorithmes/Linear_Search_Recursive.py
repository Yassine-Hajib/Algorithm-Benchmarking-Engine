def Linear_Search_Recursive(data, metrics=None):
    if metrics is None:
        metrics = {"call_count": 0, "current_depth": 0, "max_depth": 0}

    metrics["call_count"] += 1
    metrics["current_depth"] += 1
    if metrics["current_depth"] > metrics["max_depth"]:
        metrics["max_depth"] = metrics["current_depth"]

    arr  = data["arr"]
    target = data["target"]
    index  = data.get("index", 0)

    if index >= len(arr):
        metrics["current_depth"] -= 1
        return -1, metrics

    
    if arr[index] == target:
        metrics["current_depth"] -= 1
        return index, metrics


    result, metrics = Linear_Search_Recursive(
        {"arr": arr, "target": target, "index": index + 1},
        metrics
    )
    metrics["current_depth"] -= 1
    return result, metrics
def Quick_Sort_Recursive(arr, metrics=None):
    if metrics is None:
        metrics = {"call_count": 0, "current_depth": 0, "max_depth": 0}

    metrics["call_count"] += 1
    metrics["current_depth"] += 1
    if metrics["current_depth"] > metrics["max_depth"]:
        metrics["max_depth"] = metrics["current_depth"]

    arr = list(arr)

    if len(arr) <= 1:
        metrics["current_depth"] -= 1
        return arr, metrics

    pivot = arr[len(arr) // 2]
    left  = [x for x in arr if x < pivot]
    mid   = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    sorted_left,  metrics = Quick_Sort_Recursive(left,  metrics)
    sorted_right, metrics = Quick_Sort_Recursive(right, metrics)

    metrics["current_depth"] -= 1
    return sorted_left + mid + sorted_right, metrics
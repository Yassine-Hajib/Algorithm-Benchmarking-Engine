def Merge_Sort_Recursive(arr, metrics=None):
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

    mid = len(arr) // 2
    left = arr[:mid]
    right = arr[mid:]

    left,  metrics = Merge_Sort_Recursive(left,  metrics)
    right, metrics = Merge_Sort_Recursive(right, metrics)

    
    merged = []
    i = j = 0
    while i < len(left) and j < len(right):
        metrics["call_count"] += 1
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1

    merged.extend(left[i:])
    merged.extend(right[j:])

    metrics["current_depth"] -= 1
    return merged, metrics
def Quick_Sort_Iterative(arr, metrics=None):
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

    stack = [(0, len(arr) - 1)]

    while stack:
        low, high = stack.pop()
        if low >= high:
            continue

        
        pivot = arr[high]
        i = low - 1
        for j in range(low, high):
            metrics["call_count"] += 1
            if arr[j] <= pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]
        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        pi = i + 1

        stack.append((low, pi - 1))
        stack.append((pi + 1, high))

    metrics["current_depth"] -= 1
    return arr, metrics
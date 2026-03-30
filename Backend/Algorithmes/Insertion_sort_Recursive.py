def Insertion_sort_Recursive(data, metrics=None):
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

    arr = list(data["arr"])
    i   = data.get("i", 1)

    # Base case first!
    if i >= len(arr):
        metrics["current_depth"] -= 1
        return arr, metrics

    key = arr[i]
    j   = i - 1

    while j >= 0 and arr[j] > key:
        arr[j + 1] = arr[j]
        j -= 1
    arr[j + 1] = key

    next_data = {"arr": arr, "i": i + 1}
    arr, metrics = Insertion_sort_Recursive(next_data, metrics)

    metrics["current_depth"] -= 1
    return arr, metrics
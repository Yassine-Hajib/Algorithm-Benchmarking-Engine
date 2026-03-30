def bubble_sort_Recursive(arr, metrics=None):

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

    arr = list(arr)
    n = len(arr)  # ← get n from arr here

    # Base case
    if n <= 1:
        metrics["current_depth"] -= 1
        return arr, metrics

    # One pass — bubble largest to the end
    for j in range(0, n - 1):
        if arr[j] > arr[j + 1]:
            arr[j], arr[j + 1] = arr[j + 1], arr[j]

    # Recursive call on arr without last element
    sorted_arr, metrics = bubble_sort_Recursive(arr[:n-1], metrics)

    metrics["current_depth"] -= 1

    return sorted_arr + [arr[n-1]], metrics
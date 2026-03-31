from Backend.Algorithmes.Bubble_Sort_Iterative import bubble_sort_Iterative

def Binary_Search_Recursive(data, metrics=None):
    
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

    arr    = data["arr"]
    target = data["target"]
    left   = data.get("left", 0)
    right  = data.get("right", len(arr) - 1)

    # Sort only on first call
    if left == 0 and right == len(arr) - 1:
        arr, _ = bubble_sort_Iterative(arr)

    # Base case — not found
    if left > right:
        metrics["current_depth"] -= 1
        return -1, metrics

    mid = (left + right) // 2

    if arr[mid] == target:
        result = mid

    elif arr[mid] < target:
        next_data = {"arr": arr, "target": target, "left": mid + 1, "right": right}
        result, metrics = Binary_Search_Recursive(next_data, metrics)

    else:
        next_data = {"arr": arr, "target": target, "left": left, "right": mid - 1}
        result, metrics = Binary_Search_Recursive(next_data, metrics)

    metrics["current_depth"] -= 1
    return result, metrics
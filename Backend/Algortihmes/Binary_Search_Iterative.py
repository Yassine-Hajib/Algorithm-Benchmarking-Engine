from Backend.Algortihmes.Bubble_Sort_Iterative import bubble_sort_Iterative
def Binary_Search_Iterative(data, metrics=None):

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

    arr, _ =bubble_sort_Iterative(arr)  

    left, right = 0, len(arr)- 1
    result = -1

    while left <= right:
        mid = (left + right) // 2       # ← integer division!
        if arr[mid] == target:
            result = mid
            break
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    metrics["current_depth"] -= 1

    return result, metrics
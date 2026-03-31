def Merge_Sort_Iterative(arr, metrics=None):
    if metrics is None:
        metrics = {"call_count": 0, "current_depth": 0, "max_depth": 0}

    metrics["call_count"] += 1
    metrics["current_depth"] += 1
    if metrics["current_depth"] > metrics["max_depth"]:
        metrics["max_depth"] = metrics["current_depth"]

    arr = list(arr)
    n = len(arr)

    # Bottom-up: merge subarrays of size 1, then 2, then 4...
    size = 1
    while size < n:
        for left in range(0, n, size * 2):
            mid = min(left + size, n)
            right = min(left + size * 2, n)

            left_part = arr[left:mid]
            right_part = arr[mid:right]

            i = j = 0
            k = left
            while i < len(left_part) and j < len(right_part):
                metrics["call_count"] += 1
                if left_part[i] <= right_part[j]:
                    arr[k] = left_part[i]
                    i += 1
                else:
                    arr[k] = right_part[j]
                    j += 1
                k += 1

            while i < len(left_part):
                arr[k] = left_part[i]
                i += 1
                k += 1

            while j < len(right_part):
                arr[k] = right_part[j]
                j += 1
                k += 1

        size *= 2

    metrics["current_depth"] -= 1
    return arr, metrics
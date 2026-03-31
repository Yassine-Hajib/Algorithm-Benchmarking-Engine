def Heap_Sort_Iterative(arr, metrics=None):
    if metrics is None:
        metrics = {"call_count": 0, "current_depth": 0, "max_depth": 0}

    metrics["call_count"] += 1
    metrics["current_depth"] += 1
    if metrics["current_depth"] > metrics["max_depth"]:
        metrics["max_depth"] = metrics["current_depth"]

    arr = list(arr)
    n = len(arr)

    def heapify(arr, n, i):
        largest = i
        left = 2 * i + 1
        right= 2 * i + 2
        metrics["call_count"] += 1

        if left < n and arr[left] > arr[largest]:
            largest = left
        if right < n and arr[right] > arr[largest]:
            largest = right

        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            heapify(arr, n, largest)

    #  max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)

    metrics["current_depth"] -= 1
    return arr, metrics
def Heap_Sort_Recursive(arr, metrics=None):
    if metrics is None:
        metrics = {"call_count": 0, "current_depth": 0, "max_depth": 0}

    metrics["call_count"] += 1
    metrics["current_depth"] += 1
    if metrics["current_depth"] > metrics["max_depth"]:
        metrics["max_depth"] = metrics["current_depth"]

    arr = list(arr)
    n= len(arr)

    def heapify(arr, n, i):
        metrics["call_count"] += 1
        metrics["current_depth"] += 1
        if metrics["current_depth"] > metrics["max_depth"]:
            metrics["max_depth"] = metrics["current_depth"]

        largest = i
        left = 2 * i + 1
        right = 2 * i + 2

        if left < n and arr[left] > arr[largest]:
            largest = left
        if right < n and arr[right] > arr[largest]:
            largest = right

        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            heapify(arr, n, largest)   

        metrics["current_depth"] -= 1

    def build_heap(arr, n, i):
        if i < 0:
            return
        heapify(arr, n, i)
        build_heap(arr, n, i - 1)   

    def extract(arr, size):
        if size <= 0:
            return
        arr[0], arr[size] = arr[size], arr[0]
        heapify(arr, size, 0)
        extract(arr, size - 1)      

    build_heap(arr, n, n // 2 - 1)
    extract(arr, n - 1)

    metrics["current_depth"] -= 1
    return arr, metrics
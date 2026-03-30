def DFS_Iterative(data, metrics=None):
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

    graph  = data["graph"]
    start  = data["start"]

    visited = []
    seen    = set()
    stack   = [start]  # stack instead of queue!

    while stack:
        node = stack.pop()        # take from top (LIFO)
        if node not in seen:
            seen.add(node)
            visited.append(node)

            for neighbor in graph.get(node, []):
                if neighbor not in seen:
                    stack.append(neighbor)  # push to top

    metrics["current_depth"] -= 1
    return visited, metrics
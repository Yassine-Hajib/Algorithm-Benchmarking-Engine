from collections import deque

def BFS_Iterative(data, metrics=None):
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
    seen = set()
    queue = deque([start])  #start with first node
    seen.add(start)

    while queue:
        node = queue.popleft()       #Take from front
        visited.append(node)

        for neighbor in graph.get(node, []):
            if neighbor not in seen:
                seen.add(neighbor)
                queue.append(neighbor)  #Add to back

    metrics["current_depth"] -= 1
    return visited, metrics


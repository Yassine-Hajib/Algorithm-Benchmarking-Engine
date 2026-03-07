from collections import deque

def BFS_Recursive(data, metrics=None):
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

    graph = data["graph"]
    queue = data.get("queue",deque([data["start"]]))
    seen  = data.get("seen", {data["start"]})
    visited = data.get("visited", [])

    # Base case  The queue is empty
    if not queue:
        metrics["current_depth"] -= 1
        return visited, metrics

    # Process one node
    node = queue.popleft()
    visited.append(node)

    for neighbor in graph.get(node, []):
        if neighbor not in seen:
            seen.add(neighbor)
            queue.append(neighbor)

    # Recursive call pass updated queue, seen, visited
    next_data = {
        "graph"  : graph,
        "start"  : data["start"],
        "queue"  : queue,
        "seen"   : seen,
        "visited": visited
    }
    visited, metrics = BFS_Recursive(next_data, metrics)

    metrics["current_depth"] -= 1
    return visited, metrics
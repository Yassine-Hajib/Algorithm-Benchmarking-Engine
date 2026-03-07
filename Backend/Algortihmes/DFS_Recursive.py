def DFS_Recursive(data, metrics=None):
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

    graph   = data["graph"]
    start   = data["start"]
    visited = data.get("visited", [])
    seen    = data.get("seen", set())

    # Mark current node
    seen.add(start)
    visited.append(start)

    # Go deep into each neighbor
    for neighbor in graph.get(start, []):
        if neighbor not in seen:
            next_data = {
                "graph"  : graph,
                "start"  : neighbor,
                "visited": visited,
                "seen"   : seen
            }
            visited, metrics = DFS_Recursive(next_data, metrics)

    metrics["current_depth"] -= 1
    return visited, metrics

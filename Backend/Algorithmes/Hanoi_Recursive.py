def Hanoi_Recursive(n, metrics=None, source="A", target="C", auxiliary="B", moves=None):
    """
    Solves Tower of Hanoi recursively.
    Input: n = number of disks (plain integer or {"n": 4})
    Returns: list of move strings
    """
    if metrics is None:
        metrics = {"call_count": 0, "current_depth": 0, "max_depth": 0}

    if moves is None:
        moves = []

    metrics["call_count"] += 1
    metrics["current_depth"] += 1
    if metrics["current_depth"] > metrics["max_depth"]:
        metrics["max_depth"] = metrics["current_depth"]

    # Handle dict input {"n": 4} or plain integer
    if isinstance(n, dict):
        n = n.get("n", 4)
    n = int(n)

    if n == 1:
        moves.append(f"Move disk 1: {source} -> {target}")
        metrics["current_depth"] -= 1
        return moves, metrics

    # Move n-1 disks from source to auxiliary
    moves, metrics = Hanoi_Recursive(n - 1, metrics, source, auxiliary, target, moves)

    # Move nth disk from source to target
    moves.append(f"Move disk {n}: {source} -> {target}")
    metrics["call_count"] += 1

    # Move n-1 disks from auxiliary to target
    moves, metrics = Hanoi_Recursive(n - 1, metrics, auxiliary, target, source, moves)

    metrics["current_depth"] -= 1
    return moves, metrics
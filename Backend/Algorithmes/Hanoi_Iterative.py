def Hanoi_Iterative(n, metrics=None):
    """
    Solves Tower of Hanoi iteratively.
    Input: n = number of disks (plain integer or {"n": 4})
    Returns: list of move strings
    """
    if metrics is None:
        metrics = {"call_count": 0, "current_depth": 0, "max_depth": 0}

    metrics["call_count"] += 1
    metrics["current_depth"] += 1
    if metrics["current_depth"] > metrics["max_depth"]:
        metrics["max_depth"] = metrics["current_depth"]

    # Handle dict input {"n": 4} or plain integer
    if isinstance(n, dict):
        n = n.get("n", 4)
    n = int(n)

    moves = []

    # Iterative using explicit stack
    # Each frame: (disks, source, target, auxiliary)
    stack = [(n, "A", "C", "B")]

    while stack:
        disks, src, tgt, aux = stack.pop()
        metrics["call_count"] += 1

        if disks == 0:
            continue

        if disks == 1:
            moves.append(f"Move disk 1: {src} -> {tgt}")
            continue

        # Push frames in reverse order
        stack.append((disks - 1, aux, tgt, src))
        stack.append((1, src, tgt, aux))
        stack.append((disks - 1, src, aux, tgt))

    metrics["current_depth"] -= 1
    return moves, metrics
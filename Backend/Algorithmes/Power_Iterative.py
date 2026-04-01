def Power_Iterative(data, metrics=None):
    """
    Fast exponentiation iteratively (binary method).
    Input: {"base": 2, "exp": 10}  or  plain number n (returns 2^n)
    Returns: base raised to exp
    """
    if metrics is None:
        metrics = {"call_count": 0, "current_depth": 0, "max_depth": 0}

    metrics["call_count"] += 1
    metrics["current_depth"] += 1
    if metrics["current_depth"] > metrics["max_depth"]:
        metrics["max_depth"] = metrics["current_depth"]

    # Handle plain number input — treat as 2^n
    if isinstance(data, (int, float)):
        base = 2
        exp  = int(data)
    else:
        base = data.get("base", 2)
        exp  = data.get("exp",  10)

    base   = int(base)
    exp    = int(exp)
    result = 1

    while exp > 0:
        metrics["call_count"] += 1
        if exp % 2 == 1:
            result *= base
        base *= base
        exp  //= 2

    metrics["current_depth"] -= 1
    return result, metrics
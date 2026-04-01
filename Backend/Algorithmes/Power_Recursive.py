def Power_Recursive(data, metrics=None):
    """
    Fast exponentiation recursively.
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

    base = int(base)
    exp  = int(exp)

    # Base cases
    if exp == 0:
        metrics["current_depth"] -= 1
        return 1, metrics

    if exp == 1:
        metrics["current_depth"] -= 1
        return base, metrics

    # Recursive fast power — halve the exponent each call
    if exp % 2 == 0:
        half, metrics = Power_Recursive({"base": base, "exp": exp // 2}, metrics)
        result = half * half
    else:
        half, metrics = Power_Recursive({"base": base, "exp": (exp - 1) // 2}, metrics)
        result = half * half * base

    metrics["current_depth"] -= 1
    return result, metrics
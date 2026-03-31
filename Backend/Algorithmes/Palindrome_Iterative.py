def Palindrome_Iterative(data, metrics=None):
    
    if metrics is None:
        metrics = {"call_count": 0, "current_depth": 0, "max_depth": 0}

    metrics["call_count"] += 1
    metrics["current_depth"] += 1
    if metrics["current_depth"] > metrics["max_depth"]:
        metrics["max_depth"] = metrics["current_depth"]

    s = str(data).lower().replace(" ", "")

    left = 0
    right = len(s) - 1

    while left < right:
        metrics["call_count"] += 1
        if s[left] != s[right]:
            metrics["current_depth"] -= 1
            return False, metrics
        left  += 1
        right -= 1

    metrics["current_depth"] -= 1
    return True, metrics
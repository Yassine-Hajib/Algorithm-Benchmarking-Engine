def Palindrome_Recursive(data, metrics=None):

    if metrics is None:
        metrics = {"call_count": 0, "current_depth": 0, "max_depth": 0}

    metrics["call_count"] += 1
    metrics["current_depth"] += 1
    if metrics["current_depth"] > metrics["max_depth"]:
        metrics["max_depth"] = metrics["current_depth"]

    
    if not isinstance(data, dict):
        s = str(data).lower().replace(" ", "")
        left  = 0
        right = len(s) - 1
    else:
        s  = data["s"]
        left  = data["left"]
        right = data["right"]

   
    if left >= right:
        metrics["current_depth"] -= 1
        return True, metrics

    if s[left] != s[right]:
        metrics["current_depth"] -= 1
        return False, metrics

    result, metrics = Palindrome_Recursive(
        {"s": s, "left": left + 1, "right": right - 1},
        metrics
    )

    metrics["current_depth"] -= 1
    return result, metrics
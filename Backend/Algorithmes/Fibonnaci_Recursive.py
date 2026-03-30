def Fibonnaci_Recursive(n , metrics=None) :
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
    
    if n == 0 : 
        return 0 , metrics
    elif n==1 : 
        return 1 ,metrics
    else :
        value_1 ,metrics = Fibonnaci_Recursive(n-1,metrics) 
        value_2 ,metrics= Fibonnaci_Recursive(n-2,metrics)
        result=value_1+value_2
        
    metrics["current_depth"] -= 1
    
    return result , metrics
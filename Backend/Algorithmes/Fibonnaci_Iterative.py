def Fibonnaci_Iterative(n,metrics=None) :

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
    elif  n==2 :
        return 1 ,metrics
    else :
        valeurs=[0,1,1]
        for i in range (3,n+1) :
            res=valeurs[i-1]+valeurs[i-2]
            valeurs.append(res)

        result=valeurs[n]        
        metrics["current_depth"] -= 1
        
        return result , metrics
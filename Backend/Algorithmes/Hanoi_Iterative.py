def Hanoi_Iterative(n, metrics=None):
   
    if metrics is None:
        metrics = {"call_count": 0, "current_depth": 0, "max_depth": 0}

    metrics["call_count"] += 1
    metrics["current_depth"] += 1
    if metrics["current_depth"] > metrics["max_depth"]:
        metrics["max_depth"] = metrics["current_depth"]

    moves = []
    total_moves = (2 ** n) - 1

   
    source = "A"
    dest = "C" if n % 2 != 0 else "B"
    aux = "B" if n % 2 != 0 else "C"

    pegs = {source: list(range(n, 0, -1)), aux: [], dest: []}

    def move(frm, to):
        metrics["call_count"] += 1
        disk = pegs[frm].pop()
        pegs[to].append(disk)
        moves.append(f"Move disk {disk}: {frm} → {to}")

    pairs = [(source, dest), (source, aux), (aux, dest)]

    for i in range(1, total_moves + 1):
        pair = pairs[(i % 3) - 1]
        frm, to = pair

        # Always move smaller onto larger 
        top_frm = pegs[frm][-1] if pegs[frm] else float('inf')
        top_to = pegs[to][-1]  if pegs[to]  else float('inf')

        if top_frm < top_to:
            move(frm, to)
        else:
            move(to, frm)

    metrics["current_depth"] -= 1
    return moves, metrics
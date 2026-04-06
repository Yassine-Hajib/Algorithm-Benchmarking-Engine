// In production (Vercel): API_BASE_URL is empty so calls go to same domain /api/...
// In development: Vite proxy forwards /api to http://127.0.0.1:8000
const API_BASE_URL = "";

const ALGO_KEYS = {
  Bubble_Sort:    ["Bubble_sort_Iterative",    "Bubble_sort_Recursive"],
  Insertion_Sort: ["Insertion_sort_Iterative", "Insertion_sort_Recursive"],
  Quick_Sort:     ["Quick_Sort_Iterative",     "Quick_Sort_Recursive"],
  Merge_Sort:     ["Merge_Sort_Iterative",     "Merge_Sort_Recursive"],
  Heap_Sort:      ["Heap_Sort_Iterative",      "Heap_Sort_Recursive"],
  Binary_Search:  ["Binary_Search_Iterative",  "Binary_Search_Recursive"],
  Linear_Search:  ["Linear_Search_Iterative",  "Linear_Search_Recursive"],
  BFS:            ["BFS_Iterative",            "BFS_Recursive"],
  DFS:            ["DFS_Iterative",            "DFS_Recursive"],
  Fibonacci:      ["Fibonnaci_Iterative",      "Fibonnaci_Recursive"],
  Factorial:      ["factorial_iterative",      "factorial_recursive"],
  Prime_Checker:  ["Prime_Checker_Iterative",  "Prime_Checker_Recursive"],
  Power:          ["Power_Iterative",          "Power_Recursive"],
  GCD:            ["GCD_Iterative",            "GCD_Recursive"],
  Palindrome:     ["Palindrome_Iterative",     "Palindrome_Recursive"],
  Hanoi:          ["Hanoi_Iterative",          "Hanoi_Recursive"],
};

export function validateInput(algoId, raw) {
  const s = raw.trim();
  if (!s) throw new Error("Input is empty. Please enter a value.");

  const plainInt = ["Fibonacci", "Factorial", "Prime_Checker", "Hanoi"];
  if (plainInt.includes(algoId)) {
    const n = Number(s);
    if (!Number.isInteger(n) || n < 0)
      throw new Error(`${algoId.replace(/_/g," ")} expects a positive integer. Example: 10`);
    if (algoId === "Hanoi" && n > 10)
      throw new Error("Tower of Hanoi: max 10 disks to avoid huge output.");
    return;
  }

  const arrayAlgos = ["Bubble_Sort", "Quick_Sort", "Merge_Sort", "Heap_Sort"];
  if (arrayAlgos.includes(algoId)) {
    let parsed;
    try { parsed = JSON.parse(s); } catch {
      throw new Error(`${algoId.replace(/_/g," ")} expects an array. Example: [5, 2, 8, 1, 9]`);
    }
    if (!Array.isArray(parsed))
      throw new Error(`${algoId.replace(/_/g," ")} expects an array. Example: [5, 2, 8, 1, 9]`);
    if (parsed.length < 2) throw new Error("Array must have at least 2 elements.");
    if (!parsed.every(x => typeof x === "number"))
      throw new Error("Array must contain numbers only. Example: [5, 2, 8, 1, 9]");
    return;
  }

  if (algoId === "Insertion_Sort") {
    let parsed;
    try { parsed = JSON.parse(s); } catch {
      throw new Error("Insertion Sort expects an array. Example: [5, 2, 8, 1, 9]");
    }
    if (!Array.isArray(parsed) || parsed.length < 2)
      throw new Error("Insertion Sort expects an array with at least 2 elements.");
    if (!parsed.every(x => typeof x === "number"))
      throw new Error("Array must contain numbers only.");
    return;
  }

  if (["Binary_Search", "Linear_Search"].includes(algoId)) {
    let parsed;
    try { parsed = JSON.parse(s); } catch {
      throw new Error(`${algoId.replace(/_/g," ")} expects an array. Last number is the target.\nExample: [1, 3, 5, 7, 9, 5]`);
    }
    if (!Array.isArray(parsed) || parsed.length < 2)
      throw new Error("Array must have at least 2 elements. The last one is the target.");
    if (!parsed.every(x => typeof x === "number"))
      throw new Error("Array must contain numbers only.");
    return;
  }

  if (["BFS", "DFS"].includes(algoId)) {
    const n = Number(s);
    if (!isNaN(n) && Number.isInteger(n) && n > 0) return;
    try {
      const parsed = JSON.parse(s);
      if (!parsed.graph || !parsed.start) throw new Error();
    } catch {
      throw new Error(`${algoId} expects a number (e.g. 6) or a graph object.\nExample: {"graph":{"A":["B","C"],"B":[],"C":[]},"start":"A"}`);
    }
    return;
  }

  if (algoId === "Power") {
    const n = Number(s);
    if (!isNaN(n)) return;
    try {
      const parsed = JSON.parse(s);
      if (typeof parsed.base === "undefined" || typeof parsed.exp === "undefined") throw new Error();
    } catch {
      throw new Error('Fast Power expects {"base": 2, "exp": 10} or a plain number.');
    }
    return;
  }

  if (algoId === "GCD") {
    try {
      const parsed = JSON.parse(s);
      if (typeof parsed.a === "undefined" || typeof parsed.b === "undefined") throw new Error();
    } catch {
      throw new Error('GCD expects {"a": 48, "b": 18}');
    }
    return;
  }

  if (algoId === "Palindrome") return;
}

function buildInput(algoId, raw) {
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    const n = Number(raw);
    parsed = isNaN(n) ? raw.trim().replace(/^"|"$/g, "") : n;
  }

  if (["BFS", "DFS"].includes(algoId)) {
    if (typeof parsed === "number") {
      return { graph: { A: ["B","C"], B: ["D","E"], C: ["F"], D: [], E: [], F: [] }, start: "A" };
    }
    return parsed;
  }
  if (["Binary_Search", "Linear_Search"].includes(algoId)) {
    const arr = Array.isArray(parsed) ? parsed : [parsed];
    return { arr: arr.slice(0, -1), target: arr[arr.length - 1] };
  }
  if (algoId === "Insertion_Sort") {
    return { arr: Array.isArray(parsed) ? parsed : [parsed] };
  }
  if (["Bubble_Sort", "Quick_Sort", "Merge_Sort", "Heap_Sort"].includes(algoId)) {
    return Array.isArray(parsed) ? parsed : [parsed];
  }
  if (algoId === "Hanoi") {
    return { n: Math.min(typeof parsed === "number" ? parsed : Number(parsed), 10) };
  }
  if (algoId === "Palindrome") {
    return typeof parsed === "string" ? parsed : String(parsed);
  }
  return parsed;
}

async function runOne(registryKey, input) {
  const res = await fetch(`${API_BASE_URL}/api/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ algorithm: registryKey, input }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Server error ${res.status}`);
  }
  return res.json();
}

export const api = {
  getAlgorithms: async () => {
    const res = await fetch(`${API_BASE_URL}/api/algorithms`);
    return res.json();
  },

  runBenchmark: async (algoId, rawInput, isDual) => {
    validateInput(algoId, rawInput);
    const [iterKey, recKey] = ALGO_KEYS[algoId] || [algoId, null];
    const input = buildInput(algoId, rawInput);
    const iterData = await runOne(iterKey, input);
    const recData  = (isDual && recKey) ? await runOne(recKey, input) : null;
    return { iterative: iterData, recursive: recData };
  },
};
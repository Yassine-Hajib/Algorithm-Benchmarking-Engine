const API_BASE_URL = "http://127.0.0.1:8000";

const ALGO_KEYS = {
  // Sorting
  Bubble_Sort:    ["Bubble_sort_Iterative",   "Bubble_sort_Recursive"],
  Insertion_Sort: ["Insertion_sort_Iterative","Insertion_sort_Recursive"],
  Quick_Sort:     ["Quick_Sort_Iterative",    "Quick_Sort_Recursive"],
  Merge_Sort:     ["Merge_Sort_Iterative",    "Merge_Sort_Recursive"],
  Heap_Sort:      ["Heap_Sort_Iterative",     "Heap_Sort_Recursive"],

  // Searching
  Binary_Search:  ["Binary_Search_Iterative", "Binary_Search_Recursive"],
  Linear_Search:  ["Linear_Search_Iterative", "Linear_Search_Recursive"],
  BFS:            ["BFS_Iterative",           "BFS_Recursive"],
  DFS:            ["DFS_Iterative",           "DFS_Recursive"],

  // Math
  Fibonacci:      ["Fibonnaci_Iterative",      "Fibonnaci_Recursive"],
  Factorial:      ["factorial_iterative",      "factorial_recursive"],
  Prime_Checker:  ["Prime_Checker_Iterative",  "Prime_Checker_Recursive"],
  Power:          ["Power_Iterative",          "Power_Recursive"],
  GCD:            ["GCD_Iterative",            "GCD_Recursive"],
  Palindrome:     ["Palindrome_Iterative",     "Palindrome_Recursive"],
  Hanoi:          ["Hanoi_Iterative",          "Hanoi_Recursive"],
};

function buildInput(algoId, raw) {
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    // Try as plain number, else keep as string
    const n = Number(raw);
    parsed = isNaN(n) ? raw.trim().replace(/^"|"$/g, '') : n;
  }

  // Graph  accept number (auto-build) or full graph object
  if (["BFS", "DFS"].includes(algoId)) {
    if (typeof parsed === "number") {
      return {
        graph: { A: ["B","C"], B: ["D","E"], C: ["F"], D: [], E: [], F: [] },
        start: "A"
      };
    }
    return parsed;
  }

  // Binary / Linear Search last element is the target
  if (["Binary_Search", "Linear_Search"].includes(algoId)) {
    const arr = Array.isArray(parsed) ? parsed : [parsed];
    return { arr: arr.slice(0, -1), target: arr[arr.length - 1] };
  }

  // Insertion Sort — expects { arr: [...] }
  if (algoId === "Insertion_Sort") {
    return { arr: Array.isArray(parsed) ? parsed : [parsed] };
  }

  // Sorting — plain array
  if (["Bubble_Sort", "Quick_Sort", "Merge_Sort", "Heap_Sort"].includes(algoId)) {
    return Array.isArray(parsed) ? parsed : [parsed];
  }

  // Hanoi — plain number (number of disks)
  if (algoId === "Hanoi") {
    const n = typeof parsed === "number" ? parsed : Number(parsed);
    return { n: Math.min(n, 10) }; // cap at 10 disks to avoid huge output
  }

  // Power, GCD — already a dict from JSON.parse
  if (["Power", "GCD"].includes(algoId)) {
    return parsed;
  }

  // Palindrome — string or number
  if (algoId === "Palindrome") {
    return typeof parsed === "string" ? parsed : String(parsed);
  }

  // Math — plain number
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
    const [iterKey, recKey] = ALGO_KEYS[algoId] || [algoId, null];
    const input = buildInput(algoId, rawInput);

    const iterData = await runOne(iterKey, input);
    const recData  = (isDual && recKey) ? await runOne(recKey, input) : null;

    return { iterative: iterData, recursive: recData };
  },
};
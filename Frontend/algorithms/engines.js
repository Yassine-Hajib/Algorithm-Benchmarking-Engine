// ─── Pure JavaScript implementations of all 15 algorithms ───────────────────
// Each returns { result, callCount, maxDepth, executionTime }

function withMetrics(fn) {
  return (input) => {
    let callCount = 0;
    let maxDepth = 0;
    const start = performance.now();
    const result = fn(input, { callCount: 0, depth: 0, maxDepth: 0 }, (m) => {
      callCount = m.callCount;
      maxDepth = m.maxDepth;
    });
    const end = performance.now();
    return {
      result,
      callCount: callCount || 1,
      maxDepth: maxDepth || 1,
      executionTime: +(end - start).toFixed(6),
    };
  };
}

// ── Math ─────────────────────────────────────────────────────────────────────

export function runSum(n) {
  n = parseInt(n);
  let calls = 0;
  let depth = 0;
  let maxD = 0;
  const start = performance.now();
  function sum(x, d) {
    calls++;
    if (d > maxD) maxD = d;
    if (x <= 0) return 0;
    return x + sum(x - 1, d + 1);
  }
  const result = sum(n, 1);
  const end = performance.now();
  return { result, callCount: calls, maxDepth: maxD, executionTime: +(end - start).toFixed(6) };
}

export function runFactorialRecursive(n) {
  n = parseInt(n);
  let calls = 0; let maxD = 0;
  const start = performance.now();
  function fact(x, d) {
    calls++; if (d > maxD) maxD = d;
    if (x <= 1) return 1;
    return x * fact(x - 1, d + 1);
  }
  const result = fact(n, 1);
  const end = performance.now();
  return { result, callCount: calls, maxDepth: maxD, executionTime: +(end - start).toFixed(6) };
}

export function runFactorialIterative(n) {
  n = parseInt(n);
  const start = performance.now();
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  const end = performance.now();
  return { result, callCount: 1, maxDepth: 1, executionTime: +(end - start).toFixed(6) };
}

export function runFibonacciRecursive(n) {
  n = parseInt(n);
  let calls = 0; let maxD = 0;
  const start = performance.now();
  function fib(x, d) {
    calls++; if (d > maxD) maxD = d;
    if (x <= 1) return x;
    return fib(x - 1, d + 1) + fib(x - 2, d + 1);
  }
  const result = fib(n, 1);
  const end = performance.now();
  return { result, callCount: calls, maxDepth: maxD, executionTime: +(end - start).toFixed(6) };
}

export function runFibonacciIterative(n) {
  n = parseInt(n);
  const start = performance.now();
  if (n <= 1) { const end = performance.now(); return { result: n, callCount: 1, maxDepth: 1, executionTime: +(end - start).toFixed(6) }; }
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) { [a, b] = [b, a + b]; }
  const end = performance.now();
  return { result: b, callCount: n, maxDepth: 1, executionTime: +(end - start).toFixed(6) };
}

// ── Sorting ───────────────────────────────────────────────────────────────────

export function runBubbleSortIterative(arrInput) {
  const arr = [...arrInput];
  let calls = 0;
  const start = performance.now();
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      calls++;
      if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
    }
  }
  const end = performance.now();
  return { result: arr, callCount: calls, maxDepth: 1, executionTime: +(end - start).toFixed(6) };
}

export function runBubbleSortRecursive(arrInput) {
  const arr = [...arrInput];
  let calls = 0; let maxD = 0;
  const start = performance.now();
  function bubble(n, d) {
    calls++; if (d > maxD) maxD = d;
    if (n <= 1) return;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    }
    bubble(n - 1, d + 1);
  }
  bubble(arr.length, 1);
  const end = performance.now();
  return { result: arr, callCount: calls, maxDepth: maxD, executionTime: +(end - start).toFixed(6) };
}

export function runInsertionSortIterative(arrInput) {
  const arr = [...arrInput];
  let calls = 0;
  const start = performance.now();
  for (let i = 1; i < arr.length; i++) {
    calls++;
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) { arr[j + 1] = arr[j]; j--; calls++; }
    arr[j + 1] = key;
  }
  const end = performance.now();
  return { result: arr, callCount: calls, maxDepth: 1, executionTime: +(end - start).toFixed(6) };
}

export function runInsertionSortRecursive(arrInput) {
  const arr = [...arrInput];
  let calls = 0; let maxD = 0;
  const start = performance.now();
  function insert(n, d) {
    calls++; if (d > maxD) maxD = d;
    if (n <= 1) return;
    insert(n - 1, d + 1);
    const key = arr[n - 1];
    let j = n - 2;
    while (j >= 0 && arr[j] > key) { arr[j + 1] = arr[j]; j--; }
    arr[j + 1] = key;
  }
  insert(arr.length, 1);
  const end = performance.now();
  return { result: arr, callCount: calls, maxDepth: maxD, executionTime: +(end - start).toFixed(6) };
}

// ── Search ────────────────────────────────────────────────────────────────────

export function runBinarySearchIterative({ arr: arrInput, target }) {
  const arr = [...arrInput].sort((a, b) => a - b);
  let calls = 0;
  const start = performance.now();
  let lo = 0, hi = arr.length - 1, foundIdx = -1;
  while (lo <= hi) {
    calls++;
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) { foundIdx = mid; break; }
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  const end = performance.now();
  return {
    result: foundIdx >= 0 ? `Found ${target} at index ${foundIdx} (sorted array: [${arr}])` : `${target} not found`,
    callCount: calls, maxDepth: 1, executionTime: +(end - start).toFixed(6)
  };
}

export function runBinarySearchRecursive({ arr: arrInput, target }) {
  const arr = [...arrInput].sort((a, b) => a - b);
  let calls = 0; let maxD = 0;
  const start = performance.now();
  function bs(lo, hi, d) {
    calls++; if (d > maxD) maxD = d;
    if (lo > hi) return -1;
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) return bs(mid + 1, hi, d + 1);
    return bs(lo, mid - 1, d + 1);
  }
  const foundIdx = bs(0, arr.length - 1, 1);
  const end = performance.now();
  return {
    result: foundIdx >= 0 ? `Found ${target} at index ${foundIdx} (sorted array: [${arr}])` : `${target} not found`,
    callCount: calls, maxDepth: maxD, executionTime: +(end - start).toFixed(6)
  };
}

// ── Graph ─────────────────────────────────────────────────────────────────────

export function runBFSIterative({ graph, start }) {
  let calls = 0;
  const t0 = performance.now();
  const visited = [];
  const seen = new Set([start]);
  const queue = [start];
  while (queue.length) {
    calls++;
    const node = queue.shift();
    visited.push(node);
    for (const nb of (graph[node] || [])) {
      if (!seen.has(nb)) { seen.add(nb); queue.push(nb); }
    }
  }
  const t1 = performance.now();
  return { result: visited.join(' → '), callCount: calls, maxDepth: 1, executionTime: +(t1 - t0).toFixed(6) };
}

export function runBFSRecursive({ graph, start }) {
  let calls = 0; let maxD = 0;
  const t0 = performance.now();
  const visited = [];
  const seen = new Set([start]);
  function bfs(queue, d) {
    calls++; if (d > maxD) maxD = d;
    if (!queue.length) return;
    const next = [];
    for (const node of queue) {
      visited.push(node);
      for (const nb of (graph[node] || [])) {
        if (!seen.has(nb)) { seen.add(nb); next.push(nb); }
      }
    }
    bfs(next, d + 1);
  }
  bfs([start], 1);
  const t1 = performance.now();
  return { result: visited.join(' → '), callCount: calls, maxDepth: maxD, executionTime: +(t1 - t0).toFixed(6) };
}

export function runDFSIterative({ graph, start }) {
  let calls = 0;
  const t0 = performance.now();
  const visited = [];
  const seen = new Set();
  const stack = [start];
  while (stack.length) {
    calls++;
    const node = stack.pop();
    if (!seen.has(node)) {
      seen.add(node);
      visited.push(node);
      for (const nb of [...(graph[node] || [])].reverse()) {
        if (!seen.has(nb)) stack.push(nb);
      }
    }
  }
  const t1 = performance.now();
  return { result: visited.join(' → '), callCount: calls, maxDepth: 1, executionTime: +(t1 - t0).toFixed(6) };
}

export function runDFSRecursive({ graph, start }) {
  let calls = 0; let maxD = 0;
  const t0 = performance.now();
  const visited = [];
  const seen = new Set();
  function dfs(node, d) {
    calls++; if (d > maxD) maxD = d;
    seen.add(node); visited.push(node);
    for (const nb of (graph[node] || [])) {
      if (!seen.has(nb)) dfs(nb, d + 1);
    }
  }
  dfs(start, 1);
  const t1 = performance.now();
  return { result: visited.join(' → '), callCount: calls, maxDepth: maxD, executionTime: +(t1 - t0).toFixed(6) };
}
import React, { useState, useRef } from 'react';
import Sidebar, {
  COMPLEXITY_MAP,
  CATEGORY_MAP,
  DUAL_MODE_MAP,
} from '../Components/siderbar';
import CodeEditor from '../Components/CodeEditor';
import MetricCard  from '../Components/MetricsCard';
import './Benchmark.css';

/* ═══════════════════════════════════════════════════════════════════════
   SIMULATION ENGINE
   Mirrors each backend Python file's behaviour locally.
   When FastAPI is ready, delete runSimulation() and call runFastAPI().
═══════════════════════════════════════════════════════════════════════ */

/** Parse raw input string → number, array, or string */
function parseInput(raw) {
  const s = raw.trim();
  try {
    const v = JSON.parse(s);
    return v;
  } catch {
    const n = Number(s);
    return isNaN(n) ? s : n;
  }
}

/** Simulate execution and return { time, memory, calls, depth, output } */
function simulate(algoId, mode, input) {
  const n = Array.isArray(input) ? input.length : Number(input) || 0;

  const profiles = {
    /* ── Sorting ─────────────────────────────── */
    Bubble_Sort: {
      iterative: { timeFn: n => n * n * 0.00003,    memFn: n => 2 + n * 0.01, calls: 1,    depth: 1,    out: sortArr(input) },
      recursive:  { timeFn: n => n * n * 0.000038,  memFn: n => 2 + n * 0.02, callsFn: n => n, depthFn: n => n, out: sortArr(input) },
    },
    Insertion_Sort: {
      iterative: { timeFn: n => n * n * 0.000025,   memFn: n => 2 + n * 0.01, calls: 1,    depth: 1,    out: sortArr(input) },
      recursive:  { timeFn: n => n * n * 0.000032,  memFn: n => 2 + n * 0.015, callsFn: n => n, depthFn: n => n, out: sortArr(input) },
    },
    Quick_Sort: {
      iterative: { timeFn: n => n * Math.log2(n + 1) * 0.000015, memFn: n => 2 + n * 0.008, calls: 1, depth: 1, out: sortArr(input) },
      recursive:  null, // single mode — no recursive file
    },

    /* ── Searching ───────────────────────────── */
    Binary_Search: {
      iterative: { timeFn: n => Math.log2(n + 2) * 0.000005, memFn: () => 1.5, calls: 1, depthFn: n => Math.ceil(Math.log2(n + 2)), out: bsearch(input) },
      recursive:  { timeFn: n => Math.log2(n + 2) * 0.0000065, memFn: n => 1.5 + Math.log2(n + 2) * 0.1, callsFn: n => Math.ceil(Math.log2(n + 2)), depthFn: n => Math.ceil(Math.log2(n + 2)), out: bsearch(input) },
    },
    BFS: {
      iterative: { timeFn: n => (n + 4) * 0.00004, memFn: n => 3 + n * 0.05, calls: 1,    depth: 1,    out: `[0, 1, 2, 3, ...]` },
      recursive:  { timeFn: n => (n + 4) * 0.000048, memFn: n => 3 + n * 0.08, callsFn: n => n + 4, depthFn: n => Math.ceil(Math.log2(n + 2)), out: `[0, 1, 2, 3, ...]` },
    },
    DFS: {
      iterative: { timeFn: n => (n + 4) * 0.000035, memFn: n => 2.5 + n * 0.04, calls: 1, depth: 1, out: `[0, 2, 3, 1, ...]` },
      recursive:  { timeFn: n => (n + 4) * 0.000042, memFn: n => 2.5 + n * 0.07, callsFn: n => n + 4, depthFn: n => n + 1, out: `[0, 2, 3, 1, ...]` },
    },

    /* ── Math ────────────────────────────────── */
    Fibonacci: {
      iterative: { timeFn: n => n * 0.000008,  memFn: () => 1.2, calls: 1,    depth: 1,    out: fib(n) },
      recursive:  { timeFn: n => Math.pow(1.618, Math.min(n, 40)) * 0.0000001, memFn: n => 1.2 + n * 0.05, callsFn: n => Math.round(Math.pow(1.618, Math.min(n, 40))), depthFn: n => n, out: fib(n) },
    },
    Factorial: {
      iterative: { timeFn: n => n * 0.000003, memFn: () => 1.0, calls: 1,    depth: 1,    out: fact(n) },
      recursive:  { timeFn: n => n * 0.0000038, memFn: n => 1.0 + n * 0.04, callsFn: n => n, depthFn: n => n, out: fact(n) },
    },
    Prime_Checker: {
      iterative: { timeFn: n => Math.sqrt(n) * 0.000004, memFn: () => 0.8, calls: 1, depth: 1, out: isPrime(n) ? `${n} is PRIME` : `${n} is NOT prime` },
      recursive:  null, // single mode — no recursive file
    },
  };

  const prof = profiles[algoId]?.[mode];
  if (!prof) return null; // mode not available (single-mode algo)

  const timeRaw = (prof.timeFn ? prof.timeFn(n) : 0) + Math.random() * 0.000002;
  const memRaw  = prof.memFn ? prof.memFn(n) : 1;
  const calls   = prof.callsFn ? Math.max(1, Math.round(prof.callsFn(n))) : (prof.calls || 1);
  const depth   = prof.depthFn ? Math.max(1, Math.round(prof.depthFn(n))) : (prof.depth || 1);

  return {
    time:   formatTime(timeRaw),
    memory: formatMem(memRaw),
    calls,
    depth,
    output: String(prof.out ?? 'N/A'),
    _rawTime: timeRaw,
  };
}

/* ── helpers ── */
function sortArr(v) {
  const a = Array.isArray(v) ? [...v] : [v];
  return JSON.stringify(a.sort((x, y) => x - y));
}
function bsearch(v) {
  if (Array.isArray(v) && v.length >= 2) return `Found at index ${Math.floor(v.length / 2)}`;
  return typeof v === 'number' ? `Searching for ${v}` : 'N/A';
}
function fib(n) {
  if (n <= 0) return 0;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) { [a, b] = [b, a + b]; }
  return n === 0 ? 0 : b;
}
function fact(n) {
  if (n <= 1) return 1;
  let r = 1;
  for (let i = 2; i <= Math.min(n, 18); i++) r *= i;
  return r;
}
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;
  return true;
}
function formatTime(s) {
  if (s < 0.000001) return `${(s * 1e9).toFixed(2)} ns`;
  if (s < 0.001)    return `${(s * 1e6).toFixed(2)} μs`;
  if (s < 1)        return `${(s * 1e3).toFixed(4)} ms`;
  return `${s.toFixed(4)} s`;
}
function formatMem(mb) {
  return mb < 1 ? `${(mb * 1024).toFixed(0)} KB` : `${mb.toFixed(2)} MB`;
}

/* ═══════════════════════════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════════════════════════ */
const Ico = {
  Time:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Memory: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="10" x2="6" y2="14"/><line x1="10" y1="10" x2="10" y2="14"/><line x1="14" y1="10" x2="14" y2="14"/><line x1="18" y1="10" x2="18" y2="14"/></svg>,
  Depth:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><polyline points="19 9 12 2 5 9"/></svg>,
  Calls:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
  Play:   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Arrow:  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  Trophy: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H3l1 5h2"/><path d="M18 9h3l-1 5h-2"/><path d="M8 9h8l-1 7H9L8 9z"/><path d="M9 20h6"/><line x1="12" y1="16" x2="12" y2="20"/></svg>,
  Warn:   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Wave:   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Single: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
};

/* ═══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════ */
const Benchmark = () => {
  const [selectedAlgo, setSelectedAlgo] = useState(null);
  const [inputData,    setInputData]    = useState('');
  const [loading,      setLoading]      = useState(false);
  const [result,       setResult]       = useState(null);
  const [error,        setError]        = useState(null);
  const [runCount,     setRunCount]     = useState(0);
  const resultsRef = useRef(null);

  const isDual = selectedAlgo ? DUAL_MODE_MAP[selectedAlgo] : false;

  const handleSelectAlgo = (algo) => {
    setSelectedAlgo(algo);
    setResult(null);
    setError(null);
    setInputData('');
  };

  /* ── Run handler ──────────────────────────────────────────────────────
     RIGHT NOW: runs local JS simulation of each Python file.
     LATER (FastAPI):  uncomment the fetch block and remove runSimulation().
  ─────────────────────────────────────────────────────────────────────── */
  const handleRun = async () => {
    if (!inputData.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {

      /* ════════════════════════════════════════════════════════════════
         ▼▼▼  FASTAPI INTEGRATION — uncomment when backend is ready  ▼▼▼

      const response = await fetch('http://localhost:8000/benchmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ algorithm: selectedAlgo, input: inputData }),
      });
      if (!response.ok) {
        const detail = await response.json().catch(() => ({}));
        throw new Error(detail.message || `Server error ${response.status}`);
      }
      const data = await response.json();
      // Expected shape:
      // {
      //   iterative: { time, memory, calls, depth, output },
      //   recursive: { time, memory, calls, depth, output } | null,
      //   winner: 'iterative' | 'recursive' | null
      // }
      setResult(data);

         ▲▲▲  END FASTAPI BLOCK  ▲▲▲
         ════════════════════════════════════════════════════════════════ */

      // ── LOCAL SIMULATION (delete when FastAPI is ready) ──
      await new Promise(r => setTimeout(r, 1200 + Math.random() * 600));

      const parsed = parseInput(inputData);
      const it = simulate(selectedAlgo, 'iterative', parsed);
      const re = isDual ? simulate(selectedAlgo, 'recursive', parsed) : null;

      let winner = null;
      if (it && re) {
        winner = it._rawTime <= re._rawTime ? 'iterative' : 'recursive';
      } else if (it) {
        winner = 'iterative';
      }

      setResult({ iterative: it, recursive: re, winner });
      setRunCount(c => c + 1);

      // Scroll to results
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);

    } catch (err) {
      setError(err.message || 'Failed to connect to the Python backend.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Speed multiplier label ── */
  const speedLabel = () => {
    if (!result?.iterative || !result?.recursive) return null;
    const it = parseFloat(result.iterative.time);
    const re = parseFloat(result.recursive.time);
    if (!it || !re) return null;
    const ratio = result.winner === 'iterative' ? re / it : it / re;
    return `${ratio.toFixed(1)}× faster`;
  };

  /* ── Hint per category / algo ── */
  const inputHint = () => {
    if (!selectedAlgo) return '';
    const cat = CATEGORY_MAP[selectedAlgo];
    if (cat === 'Sorting')   return 'Pass an array like [5, 2, 8, 1, 9]';
    if (selectedAlgo === 'Binary_Search') return 'Pass an array — target is the last element, e.g. [1,3,5,7,9,5]';
    if (cat === 'Searching') return 'Pass a number of nodes, e.g. 6';
    if (cat === 'Math')      return 'Pass an integer, e.g. 10';
    return 'Enter your input value';
  };

  return (
    <div className="bm-layout">
      <Sidebar selectedAlgo={selectedAlgo} onSelectAlgo={handleSelectAlgo} />

      <main className="bm-main">
        {selectedAlgo ? (
          <div className="bm-workspace">

            {/* ══ HEADER ════════════════════════════════ */}
            <header className="bm-header">
              <div className="bm-header-left">
                <div className="bm-breadcrumb">
                  <span>{CATEGORY_MAP[selectedAlgo]}</span>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                  <span className="bm-bc-active">{selectedAlgo.replace(/_/g, ' ')}</span>
                </div>
                <h1 className="bm-title">{selectedAlgo.replace(/_/g, ' ')}</h1>
              </div>

              <div className="bm-header-right">
                <span className="bm-badge bm-badge--mono">Python 3.10</span>
                <span className="bm-badge bm-badge--teal">{COMPLEXITY_MAP[selectedAlgo]}</span>
                {isDual
                  ? <span className="bm-badge bm-badge--dual">Dual Mode</span>
                  : <span className="bm-badge bm-badge--single">Single Mode</span>
                }
                {runCount > 0 && (
                  <span className="bm-badge bm-badge--dim">
                    {runCount} run{runCount > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </header>

            {/* ══ BODY ══════════════════════════════════ */}
            <div className="bm-body">

              {/* ── Left: config ── */}
              <aside className="bm-left">

                <div className="bm-section-label">
                  <span className="bm-dot" />
                  Input Parameters
                </div>

                <CodeEditor
                  label="input.py"
                  value={inputData}
                  onChange={e => setInputData(e.target.value)}
                  hint={inputHint()}
                  disabled={loading}
                />

                <button
                  className="bm-run-btn"
                  onClick={handleRun}
                  disabled={loading || !inputData.trim()}
                >
                  {loading ? (
                    <><span className="bm-spinner" /> Running Analysis…</>
                  ) : (
                    <>{Ico.Play} Run Benchmark {Ico.Arrow}</>
                  )}
                </button>

                {/* Single-mode notice */}
                {!isDual && (
                  <div className="bm-single-notice">
                    {Ico.Single}
                    <span>
                      <strong>{selectedAlgo.replace(/_/g, ' ')}</strong> has only one
                      implementation in the backend — running iterative only.
                    </span>
                  </div>
                )}

                {/* Info table */}
                <div className="bm-info">
                  {[
                    { k: 'Algorithm',  v: selectedAlgo.replace(/_/g, ' ') },
                    { k: 'Category',   v: CATEGORY_MAP[selectedAlgo] },
                    { k: 'Complexity', v: COMPLEXITY_MAP[selectedAlgo], code: true },
                    { k: 'Mode',       v: isDual ? 'Iterative vs Recursive' : 'Iterative only' },
                    { k: 'Backend',    v: isDual
                        ? `${selectedAlgo}_Iterative.py + ${selectedAlgo}_Recursive.py`
                        : `${selectedAlgo}.py`,
                      mono: true },
                  ].map(({ k, v, code, mono }) => (
                    <div key={k} className="bm-info-row">
                      <span className="bm-info-k">{k}</span>
                      {code
                        ? <code className="bm-info-code">{v}</code>
                        : <span className={`bm-info-v ${mono ? 'bm-info-v--mono' : ''}`}>{v}</span>
                      }
                    </div>
                  ))}
                </div>
              </aside>

              {/* ── Right: results ── */}
              <div className="bm-right" ref={resultsRef}>

                {/* Error */}
                {error && (
                  <div className="bm-error">
                    {Ico.Warn}
                    <span>{error}</span>
                  </div>
                )}

                {/* Loading */}
                {loading && (
                  <div className="bm-loading">
                    <div className="bm-loading-ring" />
                    <p className="bm-loading-t">Running Python analysis…</p>
                    <p className="bm-loading-s">
                      Executing {isDual ? 'iterative & recursive modes' : 'iterative mode'}
                    </p>
                  </div>
                )}

                {/* Results */}
                {result && !loading && (
                  <div className="bm-results">

                    {/* Winner banner — only for dual mode */}
                    {isDual && result.winner && (
                      <div className="bm-winner">
                        <div className="bm-winner-icon">{Ico.Trophy}</div>
                        <div className="bm-winner-text">
                          <span className="bm-winner-label">Most Efficient</span>
                          <span className="bm-winner-name">
                            {result.winner.charAt(0).toUpperCase() + result.winner.slice(1)} approach
                          </span>
                        </div>
                        {speedLabel() && (
                          <span className="bm-winner-speed">{speedLabel()}</span>
                        )}
                      </div>
                    )}

                    {/* Panes */}
                    <div className={`bm-panes ${isDual ? 'bm-panes--dual' : 'bm-panes--single'}`}>
                      {['iterative', 'recursive'].map(mode => {
                        const data = result[mode];
                        if (!data) return null;
                        const isWinner = result.winner === mode;
                        const accent   = isWinner ? 'var(--teal)' : '#A78BFA';
                        const isOnly   = !isDual;

                        return (
                          <div
                            key={mode}
                            className={`bm-pane ${isWinner ? 'bm-pane--winner' : ''} ${isOnly ? 'bm-pane--only' : ''}`}
                          >
                            {/* Pane header */}
                            <div className="bm-pane-hd">
                              <div className="bm-pane-hd-left">
                                <span
                                  className="bm-pane-dot"
                                  style={{ background: isWinner ? 'var(--teal)' : '#A78BFA' }}
                                />
                                <h2 className="bm-pane-title">
                                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                  {isOnly && <span className="bm-pane-only-label"> · only mode</span>}
                                </h2>
                              </div>
                              {isWinner && isDual && (
                                <span className="bm-pane-winner-tag">
                                  {Ico.Trophy} Winner
                                </span>
                              )}
                            </div>

                            {/* 4 metric cards */}
                            <div className="bm-metrics">
                              <MetricCard label="Exec Time"  value={data.time}   icon={Ico.Time}   accent={accent} highlight={isWinner || isOnly} />
                              <MetricCard label="Memory"     value={data.memory} icon={Ico.Memory} accent={accent} highlight={isWinner || isOnly} />
                              <MetricCard label="Call Depth" value={data.depth}  icon={Ico.Depth}  accent={accent} highlight={false} />
                              <MetricCard label="Total Calls" value={data.calls} icon={Ico.Calls}  accent={accent} highlight={false} />
                            </div>

                            {/* Output */}
                            <div className="bm-output">
                              <span className="bm-output-lbl">Output</span>
                              <code className="bm-output-val">{data.output}</code>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Empty state */}
                {!result && !loading && !error && (
                  <div className="bm-empty">
                    <div className="bm-empty-icon">{Ico.Wave}</div>
                    <p className="bm-empty-title">No results yet</p>
                    <p className="bm-empty-sub">
                      Enter {CATEGORY_MAP[selectedAlgo] === 'Sorting' ? 'an array' : 'a value'} and hit{' '}
                      <strong>Run Benchmark</strong> to start the analysis.
                    </p>
                    <div className="bm-empty-tags">
                      {CATEGORY_MAP[selectedAlgo] === 'Sorting'   && <><span>[5, 2, 8, 1, 9]</span><span>[10, 4, 7, 3]</span></>}
                      {CATEGORY_MAP[selectedAlgo] === 'Math'       && <><span>10</span><span>20</span><span>40</span></>}
                      {CATEGORY_MAP[selectedAlgo] === 'Searching'  && <><span>8</span><span>12</span></>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* ══ LANDING ══════════════════════════════════ */
          <div className="bm-landing">
            <div className="bm-landing-orb" />
            <div className="bm-landing-inner">
              <div className="bm-landing-icon">{Ico.Wave}</div>
              <h1 className="bm-landing-title">Ready to Benchmark</h1>
              <p className="bm-landing-sub">
                Select an algorithm from the sidebar to compare iterative vs
                recursive implementations side by side.
              </p>
              <div className="bm-landing-chips">
                {['Bubble Sort', 'Fibonacci', 'Binary Search', 'DFS', 'Factorial'].map(a => (
                  <span key={a} className="bm-landing-chip">{a}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Benchmark;
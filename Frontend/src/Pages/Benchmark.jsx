import React, { useState, useRef } from 'react';
import Sidebar, {
  COMPLEXITY_MAP,
  CATEGORY_MAP,
  DUAL_MODE_MAP,
  PLACEHOLDER_MAP,
  HINT_MAP
} from '../Components/siderbar';
import CodeEditor from '../Components/CodeEditor';
import MetricCard from '../Components/MetricsCard';
import './Benchmark.css';
import { api, validateInput as validateInputForAlgo } from '../services/api';

const Ico = {
  Time:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Memory: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="10" x2="6" y2="14"/><line x1="10" y1="10" x2="10" y2="14"/><line x1="14" y1="10" x2="14" y2="14"/><line x1="18" y1="10" x2="18" y2="14"/></svg>,
  Depth:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><polyline points="19 9 12 2 5 9"/></svg>,
  Calls:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
  Play:   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Arrow:  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  Trophy: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H3l1 5h2"/><path d="M18 9h3l-1 5h-2"/><path d="M8 9h8l-1 7H9L8 9z"/><path d="M9 20h6"/><line x1="12" y1="16" x2="12" y2="20"/></svg>,
  Wave:   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Warn:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
};

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

  const handleRun = async () => {
    setResult(null);
    setError(null);

    // 1 — empty check
    if (!inputData.trim()) {
      setError("Input is empty. Please enter a value.");
      return;
    }

    // 2 — validate format BEFORE loader starts
    try {
      validateInputForAlgo(selectedAlgo, inputData);
    } catch (err) {
      setError(err.message);
      return;
    }

    // 3 — input is valid, now call the API
    setLoading(true);
    try {
      const data = await api.runBenchmark(selectedAlgo, inputData, isDual);
      setResult(data);
      setRunCount(prev => prev + 1);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err) {
      setError(err.message || "Backend connection failed. Is Uvicorn running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bm-layout">
      <Sidebar selectedAlgo={selectedAlgo} onSelectAlgo={handleSelectAlgo} />

      <main className="bm-main">
        {selectedAlgo ? (
          <div className="bm-workspace">

            {/* ── Header ── */}
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
              </div>
            </header>

            {/* ── Body ── */}
            <div className="bm-body">

              {/* Left — input panel */}
              <aside className="bm-left">
                <div className="bm-section-label">
                  <span className="bm-dot" /> Input Parameters
                </div>

                <CodeEditor
                  label="input.py"
                  value={inputData}
                  onChange={e => setInputData(e.target.value)}
                  placeholder={PLACEHOLDER_MAP[selectedAlgo] || 'Enter your input'}
                  hint={HINT_MAP[selectedAlgo]}
                  disabled={loading}
                />

                <button
                  className="bm-run-btn"
                  onClick={handleRun}
                  disabled={loading || !inputData.trim()}
                >
                  {loading
                    ? <><span className="bm-spinner" /> Analysis In Progress...</>
                    : <>{Ico.Play} Run Benchmark {Ico.Arrow}</>
                  }
                </button>

                <div className="bm-info">
                  <div className="bm-info-row">
                    <span className="bm-info-k">Status</span>
                    <span className="bm-info-v" style={{ color: 'var(--teal)' }}>Ready for API</span>
                  </div>
                </div>
              </aside>

              {/* Right — results panel */}
              <div className="bm-right" ref={resultsRef}>

                {/* ── ERROR — shown when validation fails or backend errors ── */}
                {error && (
                  <div className="bm-error">
                    {Ico.Warn}
                    <span>{error}</span>
                  </div>
                )}

                {/* ── LOADING ── */}
                {loading && (
                  <div className="bm-loading">
                    <div className="bm-loading-ring" />
                    <p className="bm-loading-t">Waiting for Python Output...</p>
                  </div>
                )}

                {/* ── RESULTS ── */}
                {result && !loading && (
                  <div className="bm-results">
                    <div className="bm-section-label">
                      <span className="bm-dot" style={{ background: 'var(--teal)' }} />
                      Analysis Results — Run #{runCount}
                    </div>

                    <div className={`bm-panes ${isDual && result.recursive ? 'bm-panes--dual' : 'bm-panes--single'}`}>
                      {['iterative', 'recursive'].map(mode => {
                        const d = result[mode];
                        if (!d) return null;

                        const isWinner = isDual && result.recursive
                          ? (result.iterative.execution_time <= result.recursive.execution_time
                              ? mode === 'iterative'
                              : mode === 'recursive')
                          : mode === 'iterative';

                        return (
                          <div key={mode} className={`bm-pane ${isWinner && isDual ? 'bm-pane--winner' : ''}`}>
                            <div className="bm-pane-hd">
                              <h2 className="bm-pane-title">
                                {mode.charAt(0).toUpperCase() + mode.slice(1)}
                              </h2>
                              {isWinner && isDual && result.recursive && (
                                <span className="bm-pane-winner-tag">{Ico.Trophy} Winner</span>
                              )}
                            </div>

                            <div className="bm-metrics">
                              <MetricCard label="Exec Time"   value={`${(d.execution_time * 1000).toFixed(4)} ms`} icon={Ico.Time}  />
                              <MetricCard label="Call Depth"  value={d.max_depth}  icon={Ico.Depth} />
                              <MetricCard label="Total Calls" value={d.call_count} icon={Ico.Calls} />
                            </div>

                            <div className="bm-output">
                              <span className="bm-output-lbl">Output</span>
                              <code className="bm-output-val">{JSON.stringify(d.result)}</code>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ── EMPTY STATE ── */}
                {!result && !loading && !error && (
                  <div className="bm-empty">
                    <div className="bm-empty-icon">{Ico.Wave}</div>
                    <p className="bm-empty-title">Waiting for Execution</p>
                    <p className="bm-empty-sub">
                      Enter a value and hit Run Benchmark to start the analysis.
                    </p>
                  </div>
                )}

              </div>
            </div>
          </div>
        ) : (
          <div className="bm-landing">
            <div className="bm-landing-inner">
              <h1 className="bm-landing-title">Algorithm Engine</h1>
              <p className="bm-landing-sub">Select an algorithm to start.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Benchmark;
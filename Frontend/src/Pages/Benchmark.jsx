import React, { useState } from 'react';
import './Benchmark.css';

const ALGORITHMS = {
  Sorting: ['Quick_Sort', 'Bubble_Sort', 'Insertion_Sort'],
  Searching: ['Binary_Search', 'BFS', 'DFS'],
  Math: ['Fibonacci', 'Factorial', 'Prime_Checker']
};

const Benchmark = () => {
  const [selectedAlgo, setSelectedAlgo] = useState(null);
  const [inputData, setInputData] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleRun = () => {
    setLoading(true);
    setResult(null);
    
    // Simulating the dual response we expect from the backend
    setTimeout(() => {
      setResult({
        iterative: { time: "0.0004s", memory: "12MB", depth: 1, calls: 1, output: "120" },
        recursive: { time: "0.0028s", memory: "18MB", depth: 5, calls: 5, output: "120" },
        winner: "Iterative"
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="benchmark-layout">
      {/* Sidebar */}
      <aside className="algo-sidebar">
        <div className="sidebar-header">
          <div className="logo-box">Σ</div>
          <span>AlgoBench <small>v1.0</small></span>
        </div>
        
        {Object.entries(ALGORITHMS).map(([category, items]) => (
          <div key={category} className="category-section">
            <h4 className="category-title">{category}</h4>
            {items.map(algo => (
              <button 
                key={algo} 
                className={`algo-btn ${selectedAlgo === algo ? 'active' : ''}`}
                onClick={() => { setSelectedAlgo(algo); setResult(null); }}
              >
                {algo.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        ))}
      </aside>

      {/* Main Panel */}
      <main className="algo-main">
        {selectedAlgo ? (
          <div className="workspace fade-in">
            <header className="workspace-nav">
              <div className="title-area">
                <h1>{selectedAlgo.replace(/_/g, ' ')}</h1>
                <div className="tags">
                  <span className="engine-tag">Python 3.10</span>
                  <span className="comparison-tag">Dual-Mode</span>
                </div>
              </div>
              <button className="back-btn" onClick={() => setSelectedAlgo(null)}>
                Close Analysis
              </button>
            </header>

            {/* Config Area */}
            <section className="config-container">
              <div className="editor-wrapper">
                <label>Input Data (n)</label>
                <textarea 
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                  placeholder="Enter a value or array..."
                />
              </div>
              <button className="btn-primary" onClick={handleRun} disabled={loading || !inputData}>
                {loading ? 'Running Analysis...' : 'Start Comparison'}
              </button>
            </section>

            {/* Results Comparison Grid */}
            {result && (
              <div className="results-grid fade-in">
                {['iterative', 'recursive'].map((mode) => (
                  <div key={mode} className={`result-pane ${result.winner.toLowerCase() === mode ? 'winner-border' : ''}`}>
                    <div className="pane-header">
                      <h3>{mode.toUpperCase()}</h3>
                      {result.winner.toLowerCase() === mode && <span className="winner-tag">More Efficient</span>}
                    </div>
                    
                    <div className="metric-grid">
                      <div className="metric-box">
                        <label>Runtime</label>
                        <span className="val">{result[mode].time}</span>
                      </div>
                      <div className="metric-box">
                        <label>Memory</label>
                        <span className="val">{result[mode].memory}</span>
                      </div>
                      <div className="metric-box">
                        <label>Stack Depth</label>
                        <span className="val">{result[mode].depth}</span>
                      </div>
                      <div className="metric-box">
                        <label>Total Calls</label>
                        <span className="val">{result[mode].calls}</span>
                      </div>
                    </div>

                    <div className="output-preview">
                      <label>Resulting Output</label>
                      <code>{result[mode].output}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="dashboard-hero">
            <div className="hero-icon">⚡</div>
            <h1>Ready to Benchmark</h1>
            <p>Select an algorithm from the sidebar to begin performance testing.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Benchmark;
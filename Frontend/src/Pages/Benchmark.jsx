import React, { useState } from 'react';
import './Benchmark.css';

const ALGORITHMS = {
  Sorting: ['Quick_Sort', 'Bubble_Sort', 'Insertion_Sort'],
  Searching: ['Binary_Search', 'BFS', 'DFS'],
  Math: ['Fibonacci', 'Factorial', 'Prime_Checker']
};

// Default structure to keep the UI clean before the first fetch
const DEFAULT_RESULT = {
  iterative: { time: "0.0000s", memory: "0MB", depth: 0, calls: 0, output: "" },
  recursive: { time: "0.0000s", memory: "0MB", depth: 0, calls: 0, output: "" },
  winner: ""
};

const Benchmark = () => {
  const [selectedAlgo, setSelectedAlgo] = useState(null);
  const [inputData, setInputData] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null); // Added for API robustness

  const handleRun = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      // API IMPLEMENTATION HUB: 
      // This is where you will eventually put: 
      // const response = await fetch('http://localhost:8000/benchmark', { ... })
      
      // Simulating API Latency
      await new Promise(resolve => setTimeout(resolve, 8000)); 
      
      setResult({
        iterative: { time: "0.0004s", memory: "12MB", depth: 1, calls: 1, output: "120" },
        recursive: { time: "0.0028s", memory: "18MB", depth: 5, calls: 5, output: "120" },
        winner: "Iterative"
      });
    } catch (err) {
      setError("Failed to connect to the Python backend.");
    } finally {
      setLoading(false);
    }
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
                onClick={() => { setSelectedAlgo(algo); setResult(null); setError(null); }}
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
              <button 
                className="btn-primary" 
                onClick={handleRun} 
                disabled={loading || !inputData}
              >
                {loading ? 'Running Analysis...' : 'Start Comparison'}
              </button>
            </section>

            {/* Error Handling */}
            {error && <div className="error-message">{error}</div>}

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
                      {['time', 'memory', 'depth', 'calls'].map((metric) => (
                         <div key={metric} className="metric-box">
                            <label>{metric.charAt(0).toUpperCase() + metric.slice(1)}</label>
                            <span className="val">{result[mode][metric]}</span>
                         </div>
                      ))}
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
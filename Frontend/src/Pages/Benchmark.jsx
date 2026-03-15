import React, { useState } from 'react';
import './Benchmark.css';

const ALGORITHMS = {
  Sorting: ['Quick_Sort', 'Bubble_Sort_Iterative', 'Insertion_sort_Recursive'],
  Searching: ['Binary_Search_Iterative', 'BFS_Iterative', 'DFS_Recursive'],
  Math: ['Fibonnaci_Iterative', 'Factorial_iterative', 'Prime_Checker']
};

const Benchmark = () => {
  const [selectedAlgo, setSelectedAlgo] = useState(null);
  const [inputData, setInputData] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleRun = async () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult({ time: "0.0024s", memory: "12MB", output: "[1, 2, 3, 5, 8]" });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="benchmark-layout">
      {/* Sidebar Navigation */}
      <aside className="algo-sidebar">
        <div className="sidebar-header">
          <div className="logo-box">Σ</div>
          <span>Algorithms</span>
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

      {/* Main Interface */}
      <main className="algo-main">
        {selectedAlgo ? (
          <div className="workspace fade-in">
            <div className="workspace-nav">
              <div className="title-area">
                <h1>{selectedAlgo.replace(/_/g, ' ')}</h1>
                <span className="engine-tag">Python 3.10 Engine</span>
              </div>
              <button className="back-btn" onClick={() => setSelectedAlgo(null)}>
                <span>←</span> Back to Dashboard
              </button>
            </div>

            <section className="config-container">
              <div className="config-header">
                <h3>Test Configuration</h3>
                <p>Define your input parameters and data sets below.</p>
              </div>
              
              <div className="editor-wrapper">
                <textarea 
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                  placeholder='e.g., [5, 2, 9, 1, 5, 6]'
                  spellCheck="false"
                />
              </div>
              
              <div className="button-group">
                <button className="btn-secondary" onClick={() => setInputData('10, 20, 30, 40, 50')}>
                  Load Sample
                </button>
                <button className="btn-primary" onClick={handleRun} disabled={loading}>
                  {loading ? 'Processing...' : 'Execute Benchmark'}
                </button>
              </div>
            </section>

            {result && (
              <section className="results-container fade-in">
                <div className="metric-card">
                  <label>Runtime</label>
                  <div className="metric-value success">{result.time}</div>
                </div>
                <div className="metric-card">
                  <label>Memory</label>
                  <div className="metric-value">{result.memory}</div>
                </div>
                <div className="metric-card wide">
                  <label>Console Output</label>
                  <div className="output-box">
                    <code>{result.output}</code>
                  </div>
                </div>
              </section>
            )}
          </div>
        ) : (
          /* Empty Dashboard View */
          <div className="dashboard-hero fade-in">
            <div className="status-indicator">SYSTEM STATUS: OPTIMAL</div>
            <h1>Performance Analysis</h1>
            <p>Select a logic model to evaluate computational complexity and resource efficiency.</p>
            
            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-label">FastAPI Workers</span>
                <span className="stat-val">Active</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Average Latency</span>
                <span className="stat-val">12ms</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Benchmark;
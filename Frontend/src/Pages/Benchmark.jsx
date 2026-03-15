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
    // Logic to call your Backend (FastAPI/Celery) goes here
    console.log(`Running ${selectedAlgo} with data: ${inputData}`);
    
    // Simulate API delay
    setTimeout(() => {
      setResult({ time: "0.0024s", memory: "12MB", output: "[1, 2, 3, 5, 8]" });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="benchmark-layout">
      {/* Sidebar */}
      <aside className="algo-sidebar">
        <div className="logo">⚡ BenchMark AI</div>
        {Object.entries(ALGORITHMS).map(([category, items]) => (
          <div key={category} className="category-group">
            <h4>{category}</h4>
            {items.map(algo => (
              <button 
                key={algo} 
                className={selectedAlgo === algo ? 'active' : ''}
                onClick={() => setSelectedAlgo(algo)}
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
          <div className="workspace">
            <header className="workspace-header">
              <h2>{selectedAlgo.replace(/_/g, ' ')}</h2>
              <span className="badge">Python Engine</span>
            </header>

            <section className="input-card">
              <h3>Configuration</h3>
              <p>Enter your array or parameters below:</p>
              <textarea 
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder="e.g. 45, 12, 89, 2, 7"
              />
              <div className="actions">
                <button className="secondary-btn" onClick={() => setInputData('10, 20, 30, 40, 50')}>Use Sample</button>
                <button className="primary-btn" onClick={handleRun} disabled={loading}>
                  {loading ? 'Processing...' : 'Run Benchmark'}
                </button>
              </div>
            </section>

            {result && (
              <section className="result-grid">
                <div className="stat-card">
                  <label>Execution Time</label>
                  <div className="value text-green">{result.time}</div>
                </div>
                <div className="stat-card">
                  <label>Memory Usage</label>
                  <div className="value">{result.memory}</div>
                </div>
                <div className="stat-card wide">
                  <label>Output</label>
                  <code>{result.output}</code>
                </div>
              </section>
            )}
          </div>
        ) : (
          <div className="empty-state">
            <div className="icon">🚀</div>
            <h2>Select an algorithm to start benchmarking</h2>
            <p>Choose from the sidebar to configure your test run.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Benchmark;
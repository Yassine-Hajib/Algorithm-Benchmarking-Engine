import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const FEATURES = [
  {
    label: '01',
    title: 'Precise Metrics',
    desc: 'Measure execution time down to the microsecond and track recursion depth and call count across every run.',
    accent: '#00E5C3',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: '02',
    title: 'Python Integration',
    desc: 'Every algorithm runs as real Python code on a FastAPI backend — not a simulation. Results are 100% accurate.',
    accent: '#4ADE80',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    label: '03',
    title: 'Complexity Analysis',
    desc: 'Each algorithm is tagged with its Big-O complexity. See theory meet practice as you scale your input size.',
    accent: '#FACC15',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    label: '04',
    title: 'Side-by-Side Comparison',
    desc: 'Compare Iterative vs Recursive implementations head-to-head. Winner is highlighted automatically.',
    accent: '#A78BFA',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="18"/><rect x="14" y="3" width="7" height="18"/>
      </svg>
    ),
  },
];

const ALGORITHMS = [
  { name: 'Bubble Sort',     category: 'Sorting',   complexity: 'O(n²)',      color: '#00E5C3' },
  { name: 'Merge Sort',      category: 'Sorting',   complexity: 'O(n log n)', color: '#00E5C3' },
  { name: 'Quick Sort',      category: 'Sorting',   complexity: 'O(n log n)', color: '#00E5C3' },
  { name: 'Heap Sort',       category: 'Sorting',   complexity: 'O(n log n)', color: '#00E5C3' },
  { name: 'Binary Search',   category: 'Searching', complexity: 'O(log n)',   color: '#60A5FA' },
  { name: 'Linear Search',   category: 'Searching', complexity: 'O(n)',       color: '#60A5FA' },
  { name: 'BFS',             category: 'Graph',     complexity: 'O(V+E)',     color: '#60A5FA' },
  { name: 'DFS',             category: 'Graph',     complexity: 'O(V+E)',     color: '#60A5FA' },
  { name: 'Fibonacci',       category: 'Math',      complexity: 'O(n)',       color: '#FACC15' },
  { name: 'Factorial',       category: 'Math',      complexity: 'O(n)',       color: '#FACC15' },
  { name: 'Tower of Hanoi',  category: 'Math',      complexity: 'O(2ⁿ)',      color: '#FACC15' },
  { name: 'GCD',             category: 'Math',      complexity: 'O(log n)',   color: '#FACC15' },
  { name: 'Fast Power',      category: 'Math',      complexity: 'O(log n)',   color: '#FACC15' },
  { name: 'Prime Checker',   category: 'Math',      complexity: 'O(√n)',      color: '#FACC15' },
  { name: 'Palindrome',      category: 'Math',      complexity: 'O(n)',       color: '#FACC15' },
  { name: 'Insertion Sort',  category: 'Sorting',   complexity: 'O(n²)',      color: '#00E5C3' },
];

const TERMINAL_LINES = [
  { delay: 0,    text: <><span className="t-kw">import</span> algobench <span className="t-kw">as</span> ab</> },
  { delay: 600,  text: <><span className="t-var">engine</span> = ab.<span className="t-fn">Engine</span>()</> },
  { delay: 1200, text: <><span className="t-comment"># Run Fibonacci n=30 ──────────────</span></> },
  { delay: 1800, text: <><span className="t-var">result</span> = <span className="t-var">engine</span>.<span className="t-fn">compare</span>(<span className="t-str">"fibonacci"</span>, n=<span className="t-num">30</span>)</> },
  { delay: 2600, text: <span className="t-comment"># Results ────────────────────────────</span> },
  { delay: 3000, text: <><span className="t-out">✓ iterative  </span><span className="t-val">0.000008s</span>  <span className="t-badge t-green">WINNER</span></> },
  { delay: 3400, text: <><span className="t-out">✗ recursive  </span><span className="t-val">1.203400s</span>  <span className="t-badge t-red">150x slower</span></> },
  { delay: 3800, text: <><span className="t-out">  depth:     </span><span className="t-val">1 vs 30</span></> },
  { delay: 4200, text: <><span className="t-out">  calls:     </span><span className="t-val">1 vs 2692537</span></> },
];

function useCounter(target, duration = 1500, started = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);
  return value;
}

const HomePage = () => {
  const navigate = useNavigate();
  const [visibleLines, setVisibleLines]   = useState([]);
  const [statsVisible, setStatsVisible]   = useState(false);
  const [activeFilter, setActiveFilter]   = useState('All');
  const statsRef = useRef(null);

  const algoCount   = useCounter(16,  1200, statsVisible);
  const dualCount   = useCounter(16,  1400, statsVisible);
  const metricCount = useCounter(3,   800,  statsVisible);

 
  useEffect(() => {
    TERMINAL_LINES.forEach(({ delay }, i) => {
      setTimeout(() => setVisibleLines(prev => [...prev, i]), delay);
    });
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const categories = ['All', 'Sorting', 'Searching', 'Graph', 'Math'];
  const filtered = activeFilter === 'All'
    ? ALGORITHMS
    : ALGORITHMS.filter(a => a.category === activeFilter);

  return (
    <div className="hp">

    
      <nav className="hp-nav">
        <div className="hp-logo">
          <span className="hp-logo-mark">AB</span>
          <span className="hp-logo-name">AlgoBench</span>
          <span className="hp-logo-badge">v1.0</span>
        </div>
        <div className="hp-nav-links">
          <button className="hp-nav-link">Home</button>
          <button className="hp-nav-link" onClick={() => document.getElementById('algorithms').scrollIntoView({ behavior: 'smooth' })}>Algorithms</button>
          <button className="hp-nav-link" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>Features</button>
          <button className="hp-nav-cta" onClick={() => navigate('/benchmark')}>
            Start Testing
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </nav>

      
      <section className="hp-hero">
        <div className="hp-grid-bg" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => <div key={i} className="hp-grid-col" />)}
        </div>
        <div className="hp-orb hp-orb-1" aria-hidden="true" />
        <div className="hp-orb hp-orb-2" aria-hidden="true" />

        <div className="hp-hero-inner">
          <div className="hp-eyebrow">
            <span className="hp-eyebrow-dot" />
            Algorithm Benchmarking Engine
          </div>

          <h1 className="hp-hero-h1">
            <span className="hp-h1-line">Analyze.</span>
            <span className="hp-h1-line">Compare.</span>
            <span className="hp-h1-line hp-h1-accent">Optimize.</span>
          </h1>

          <p className="hp-hero-sub">
            A high-performance engine to benchmark algorithms in real-time using
            a Python FastAPI backend. Compare iterative vs recursive with exact
            execution time, recursion depth, and call count.
          </p>

          <div className="hp-hero-actions">
            <button className="hp-btn-primary" onClick={() => navigate('/benchmark')}>
              Launch Engine
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button className="hp-btn-ghost" onClick={() => document.getElementById('algorithms').scrollIntoView({ behavior: 'smooth' })}>
              View Algorithms
            </button>
          </div>

       
          <div className="hp-stats-row" ref={statsRef}>
            <div className="hp-stat">
              <span className="hp-stat-value">{algoCount}</span>
              <span className="hp-stat-label">Algorithms</span>
            </div>
            <div className="hp-stat">
              <span className="hp-stat-value">{dualCount}</span>
              <span className="hp-stat-label">Dual Mode</span>
            </div>
            <div className="hp-stat">
              <span className="hp-stat-value">{metricCount}</span>
              <span className="hp-stat-label">Metrics Tracked</span>
            </div>
            <div className="hp-stat">
              <span className="hp-stat-value" style={{ color: 'var(--teal)', fontSize: '13px' }}>Python 3.10+</span>
              <span className="hp-stat-label">Runtime</span>
            </div>
          </div>
        </div>

       
        <div className="hp-terminal" aria-hidden="true">
          <div className="hp-terminal-bar">
            <span /><span /><span />
            <span className="hp-terminal-title">benchmark.py</span>
          </div>
          <div className="hp-terminal-body">
            {TERMINAL_LINES.map(({ text }, i) => (
              <p key={i} style={{
                opacity:    visibleLines.includes(i) ? 1 : 0,
                transform:  visibleLines.includes(i) ? 'translateX(0)' : 'translateX(-6px)',
                transition: 'opacity 0.35s ease, transform 0.35s ease',
              }}>
                {text}
              </p>
            ))}
            <p className="t-cursor">▌</p>
          </div>
        </div>
      </section>

    
      <section className="hp-metrics-banner">
        {[
          { label: 'Exec Time',   value: '~0.0001ms', sub: 'iterative avg' },
          { label: 'Call Depth',  value: 'O(log n)',  sub: 'recursive max' },
          { label: 'Total Calls', value: 'tracked',   sub: 'per execution' },
          { label: 'Backend',     value: 'FastAPI',   sub: 'REST + JSON' },
          { label: 'Frontend',    value: 'React 18',  sub: 'Vite + Router' },
          { label: 'Algorithms',  value: '16',        sub: 'all dual mode' },
        ].map((item, i) => (
          <div key={i} className="hp-mbanner-item">
            <span className="hp-mbanner-val">{item.value}</span>
            <span className="hp-mbanner-label">{item.label}</span>
            <span className="hp-mbanner-sub">{item.sub}</span>
          </div>
        ))}
      </section>

      
      <section className="hp-features" id="algorithms">
        <div className="hp-features-inner">
          <div className="hp-section-head">
            <span className="hp-section-label">Algorithm Library</span>
            <h2 className="hp-section-h2">16 algorithms.<br />All dual mode.</h2>
          </div>

          
          <div className="hp-filter-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`hp-filter-tab ${activeFilter === cat ? 'hp-filter-tab--active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
                <span className="hp-filter-count">
                  {cat === 'All' ? ALGORITHMS.length : ALGORITHMS.filter(a => a.category === cat).length}
                </span>
              </button>
            ))}
          </div>

          
          <div className="hp-algo-grid">
            {filtered.map((algo, i) => (
              <div
                key={algo.name}
                className="hp-algo-card"
                style={{ '--accent': algo.color, animationDelay: `${i * 40}ms` }}
                onClick={() => navigate('/benchmark')}
              >
                <div className="hp-algo-card-top">
                  <span className="hp-algo-category" style={{ color: algo.color }}>
                    {algo.category}
                  </span>
                  <span className="hp-algo-dual-badge">Dual</span>
                </div>
                <h3 className="hp-algo-name">{algo.name}</h3>
                <div className="hp-algo-footer">
                  <code className="hp-algo-complexity">{algo.complexity}</code>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
                <div className="hp-algo-card-bar" style={{ background: algo.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

    
      <section className="hp-how" id="how">
        <div className="hp-features-inner">
          <div className="hp-section-head">
            <span className="hp-section-label">How it works</span>
            <h2 className="hp-section-h2">Three steps.<br />Real results.</h2>
          </div>

          <div className="hp-steps">
            {[
              {
                num: '01',
                title: 'Select an algorithm',
                desc: 'Choose from 16 algorithms across Sorting, Searching, Graph, and Math categories in the sidebar.',
                color: '#00E5C3',
              },
              {
                num: '02',
                title: 'Enter your input',
                desc: 'Type your input directly in the code editor. Smart hints guide you for every algorithm type.',
                color: '#60A5FA',
              },
              {
                num: '03',
                title: 'Get real metrics',
                desc: 'Python executes both implementations and returns execution time, call depth, and total calls.',
                color: '#A78BFA',
              },
            ].map((step, i) => (
              <div key={i} className="hp-step" style={{ '--step-color': step.color }}>
                <div className="hp-step-num" style={{ color: step.color, borderColor: step.color + '30' }}>
                  {step.num}
                </div>
                <div className="hp-step-line" />
                <h3 className="hp-step-title">{step.title}</h3>
                <p className="hp-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="hp-features" id="features" style={{ background: 'var(--bg-2)' }}>
        <div className="hp-features-inner">
          <div className="hp-section-head">
            <span className="hp-section-label">Core Capabilities</span>
            <h2 className="hp-section-h2">Everything you need<br />to understand algorithms</h2>
          </div>

          <div className="hp-cards">
            {FEATURES.map((f, i) => (
              <div key={i} className="hp-card" style={{ '--accent': f.accent }}>
                <div className="hp-card-top">
                  <div className="hp-card-icon" style={{ color: f.accent, borderColor: f.accent + '30' }}>
                    {f.icon}
                  </div>
                  <span className="hp-card-num">{f.label}</span>
                </div>
                <h3 className="hp-card-title">{f.title}</h3>
                <p className="hp-card-desc">{f.desc}</p>
                <div className="hp-card-line" style={{ background: f.accent }} />
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="hp-stack">
        <div className="hp-features-inner">
          <div className="hp-section-head" style={{ marginBottom: '40px' }}>
            <span className="hp-section-label">Tech Stack</span>
            <h2 className="hp-section-h2">Built with<br />modern tools</h2>
          </div>

          <div className="hp-stack-grid">
            {[
              { name: 'Python 3.10+', role: 'Algorithm execution engine',   color: '#4ADE80' },
              { name: 'FastAPI',      role: 'REST API backend',              color: '#00E5C3' },
              { name: 'Uvicorn',      role: 'ASGI server',                   color: '#00E5C3' },
              { name: 'Pydantic',     role: 'Request / response validation', color: '#60A5FA' },
              { name: 'React 18',     role: 'Frontend UI',                   color: '#61DAFB' },
              { name: 'Vite 5',       role: 'Frontend build tool',           color: '#646CFF' },
              { name: 'React Router', role: 'Client-side routing',           color: '#F44250' },
              { name: 'Custom CSS',   role: 'Zero UI framework',             color: '#FACC15' },
            ].map((tech, i) => (
              <div key={i} className="hp-stack-item">
                <span className="hp-stack-dot" style={{ background: tech.color }} />
                <div>
                  <span className="hp-stack-name">{tech.name}</span>
                  <span className="hp-stack-role">{tech.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="hp-cta-section">
        <div className="hp-cta-inner">
          <div className="hp-cta-orb" aria-hidden="true" />
          <div className="hp-cta-text">
            <h2 className="hp-cta-h2">Ready to benchmark<br />your algorithms?</h2>
            <p className="hp-cta-p">Select an algorithm, enter your input, and get real Python results instantly.</p>
          </div>
          <button className="hp-btn-primary" onClick={() => navigate('/benchmark')}>
            Launch Engine
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </section>

      
      <footer className="hp-footer">
        <span className="hp-footer-copy">© 2026 <strong>AlgoBench</strong> Built  With Love </span>
        <div className="hp-footer-tags">
          {['Algorithmes '].map(tag => (
            <span key={tag} className="hp-footer-tag">{tag}</span>
          ))}
        </div>
      </footer>

    </div>
  );
};

export default HomePage;
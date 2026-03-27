import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const FEATURES = [
  {
    label: '01',
    title: 'Precise Metrics',
    desc: 'Measure execution time down to the microsecond and track real-time memory consumption across every run.',
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
    desc: 'Seamlessly execute native Python scripts using specialized backend environments with zero configuration.',
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
    desc: 'Visualize how your algorithms scale with input size and identify performance bottlenecks instantly.',
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
    desc: 'Compare Iterative vs Recursive implementations head-to-head and find the most efficient solution.',
    accent: '#A78BFA',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="18"/><rect x="14" y="3" width="7" height="18"/>
      </svg>
    ),
  },
];

const STATS = [];

const HomePage = () => {
  const navigate = useNavigate();
  const [tick, setTick] = useState(0);

  // Subtle ticker for the hero decoration
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 80);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hp">

      {/* ── NAVBAR ── */}
      <nav className="hp-nav">
        <div className="hp-logo">
          <span className="hp-logo-mark">AB</span>
          <span className="hp-logo-name">AlgoBench</span>
          <span className="hp-logo-badge">v1.0</span>
        </div>
        <div className="hp-nav-links">
          <button className="hp-nav-link">Home</button>
          <button className="hp-nav-link">Docs</button>
          <button className="hp-nav-cta" onClick={() => navigate('/benchmark')}>
            Start Testing
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hp-hero">
        {/* Grid background */}
        <div className="hp-grid-bg" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="hp-grid-col" />
          ))}
        </div>

        {/* Glow orbs */}
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
            A high-performance engine to benchmark algorithms in real-time
            using Python backends and asynchronous task processing.
          </p>

          <div className="hp-hero-actions">
            <button className="hp-btn-primary" onClick={() => navigate('/benchmark')}>
              Launch Engine
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
           
          </div>

          <div className="hp-stats-row">
            {STATS.map((s, i) => (
              <div key={i} className="hp-stat">
                <span className="hp-stat-value">{s.value}</span>
                <span className="hp-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative terminal block */}
        <div className="hp-terminal" aria-hidden="true">
          <div className="hp-terminal-bar">
            <span /><span /><span />
            <span className="hp-terminal-title">benchmark.py</span>
          </div>
          <div className="hp-terminal-body">
            <p><span className="t-kw">import</span> algobench <span className="t-kw">as</span> ab</p>
            <p className="t-blank"> </p>
            <p><span className="t-var">bench</span> = ab.<span className="t-fn">Benchmark</span>()</p>
            <p><span className="t-var">bench</span>.<span className="t-fn">run</span>(<span className="t-str">"fibonacci"</span>, n=<span className="t-num">40</span>)</p>
            <p className="t-blank"> </p>
            <p><span className="t-comment"># Results ────────────────────</span></p>
            <p><span className="t-out">✓ iterative </span><span className="t-val">0.000012s</span>  <span className="t-badge t-green">FAST</span></p>
            <p><span className="t-out">✓ recursive </span><span className="t-val">1.203400s</span>  <span className="t-badge t-red">SLOW</span></p>
            <p><span className="t-out">✓ memoized  </span><span className="t-val">0.000019s</span>  <span className="t-badge t-green">FAST</span></p>
            <p className="t-blank"> </p>
            <p className="t-cursor">▌</p>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="hp-features">
        <div className="hp-features-inner">
          <div className="hp-section-head">
            <span className="hp-section-label">Core Capabilities</span>
            <h2 className="hp-section-h2">Everything you need<br />to Understund Algorithme </h2>
          </div>

          <div className="hp-cards">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="hp-card"
                style={{ '--accent': f.accent }}
              >
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

      {/* ── CTA BANNER ── */}
      <section className="hp-cta-section">
        <div className="hp-cta-inner">
          <div className="hp-cta-orb" aria-hidden="true" />
          <div className="hp-cta-text">
            <h2 className="hp-cta-h2">Ready to benchmark<br />your algorithms?</h2>
            <p className="hp-cta-p">Run your first test in seconds — no setup required.</p>
          </div>
          <button className="hp-btn-primary" onClick={() => navigate('/benchmark')}>
            Launch Engine
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="hp-footer">
        <span className="hp-footer-copy">© 2026 <strong>AlgoBench</strong> — Built with React & FastAPI</span>
        <div className="hp-footer-tags">
          {['React', 'FastAPI', 'Python'].map(tag => (
            <span key={tag} className="hp-footer-tag">{tag}</span>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
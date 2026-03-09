import { useState } from 'react';
import { ALGORITHMS, CATEGORIES } from '../algorithms/registry';
import './Home.css';

const CATEGORY_KEYS = ['All', ...Object.keys(CATEGORIES)];

export default function Home({ onSelect }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hovered, setHovered] = useState(null);

  const filtered = activeFilter === 'All'
    ? ALGORITHMS
    : ALGORITHMS.filter(a => a.category === activeFilter);

  return (
    <div className="home">
      {/* ── Hero ── */}
      <header className="home__hero">
        <div className="home__hero-eyebrow">
          <span className="home__dot" />
          Algorithm Benchmarking Engine
        </div>
        <h1 className="home__title">
          <span className="home__title-line">Measure.</span>
          <span className="home__title-line home__title-line--accent">Understand.</span>
          <span className="home__title-line">Compare.</span>
        </h1>
        <p className="home__subtitle">
          Pick an algorithm, feed it your data, and watch every metric — execution time, call count,
          recursion depth — unfold in real time. No server. No setup. Pure computation.
        </p>
        <div className="home__stats">
          <div className="home__stat">
            <span className="home__stat-num">15</span>
            <span className="home__stat-label">Algorithms</span>
          </div>
          <div className="home__stat-divider" />
          <div className="home__stat">
            <span className="home__stat-num">4</span>
            <span className="home__stat-label">Categories</span>
          </div>
          <div className="home__stat-divider" />
          <div className="home__stat">
            <span className="home__stat-num">0ms</span>
            <span className="home__stat-label">Setup time</span>
          </div>
        </div>
      </header>

      {/* ── Filter bar ── */}
      <div className="home__filter-bar">
        {CATEGORY_KEYS.map(cat => {
          const meta = CATEGORIES[cat];
          return (
            <button
              key={cat}
              className={`home__filter-btn${activeFilter === cat ? ' home__filter-btn--active' : ''}`}
              style={activeFilter === cat && meta ? {
                '--cat-color': meta.color,
                '--cat-glow': meta.glow,
                borderColor: meta.color,
                color: meta.color,
                background: `${meta.glow}`,
                boxShadow: `0 0 20px ${meta.glow}`,
              } : activeFilter === cat ? {
                borderColor: 'var(--text)',
                color: 'var(--text)',
                background: 'var(--dim)',
              } : {}}
              onClick={() => setActiveFilter(cat)}
            >
              {meta && <span className="home__filter-icon">{meta.icon}</span>}
              {cat}
              <span className="home__filter-count">
                {cat === 'All' ? ALGORITHMS.length : ALGORITHMS.filter(a => a.category === cat).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Algorithm Grid ── */}
      <div className="home__grid">
        {filtered.map((algo, i) => {
          const cat = CATEGORIES[algo.category];
          const isHovered = hovered === algo.id;
          return (
            <button
              key={algo.id}
              className="algo-card fade-up"
              style={{
                '--color': cat.color,
                '--glow': cat.glow,
                animationDelay: `${i * 40}ms`,
              }}
              onMouseEnter={() => setHovered(algo.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelect(algo)}
            >
              {/* Top accent line */}
              <div className="algo-card__bar" />

              {/* Category badge */}
              <div className="algo-card__meta">
                <span className="algo-card__cat-icon">{cat.icon}</span>
                <span className="algo-card__category">{algo.category}</span>
                <span className="algo-card__complexity">{algo.complexity.time}</span>
              </div>

              {/* Title */}
              <div className="algo-card__titles">
                <h3 className="algo-card__label">{algo.label}</h3>
                <span className="algo-card__sublabel">{algo.sublabel}</span>
              </div>

              {/* Description */}
              <p className="algo-card__desc">{algo.description}</p>

              {/* Footer */}
              <div className="algo-card__footer">
                <div className="algo-card__badges">
                  <span className="algo-card__badge">{algo.complexity.time}</span>
                  <span className="algo-card__badge">{algo.complexity.space}</span>
                </div>
                <div className="algo-card__arrow">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* Hover glow */}
              <div className="algo-card__glow" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
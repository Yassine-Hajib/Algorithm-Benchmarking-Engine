import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

export const ALGORITHMS = {
  Sorting: {
    color: '#00E5C3',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="6"  x2="21" y2="6"/>
        <line x1="3" y1="12" x2="15" y2="12"/>
        <line x1="3" y1="18" x2="9"  y2="18"/>
      </svg>
    ),
    items: [
      { id: 'Bubble_Sort',    label: 'Bubble Sort',    complexity: 'O(n²)',      dual: true },
      { id: 'Insertion_Sort', label: 'Insertion Sort', complexity: 'O(n²)',      dual: true },
      { id: 'Quick_Sort',     label: 'Quick Sort',     complexity: 'O(n log n)', dual: true },
      { id: 'Merge_Sort',     label: 'Merge Sort',     complexity: 'O(n log n)', dual: true },
      { id: 'Heap_Sort',      label: 'Heap Sort',      complexity: 'O(n log n)', dual: true },
    ],
  },
  Searching: {
    color: '#60A5FA',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    items: [
      { id: 'Binary_Search', label: 'Binary Search', complexity: 'O(log n)', dual: true },
      { id: 'Linear_Search', label: 'Linear Search', complexity: 'O(n)',     dual: true },
      { id: 'BFS',           label: 'BFS',           complexity: 'O(V+E)',   dual: true },
      { id: 'DFS',           label: 'DFS',           complexity: 'O(V+E)',   dual: true },
    ],
  },
  Math: {
    color: '#FACC15',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="22"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    items: [
      { id: 'Fibonacci',     label: 'Fibonacci',      complexity: 'O(n)',      dual: true },
      { id: 'Factorial',     label: 'Factorial',      complexity: 'O(n)',      dual: true },
      { id: 'Prime_Checker', label: 'Prime Checker',  complexity: 'O(√n)',     dual: true },
      { id: 'Power',         label: 'Fast Power',     complexity: 'O(log n)',  dual: true },
      { id: 'GCD',           label: 'GCD',            complexity: 'O(log n)',  dual: true },
      { id: 'Palindrome',    label: 'Palindrome',     complexity: 'O(n)',      dual: true },
      { id: 'Hanoi',         label: 'Tower of Hanoi', complexity: 'O(2ⁿ)',     dual: true },
    ],
  },
};

/* ── Flat lookup maps consumed by Benchmark.jsx ── */

export const COMPLEXITY_MAP = Object.values(ALGORITHMS)
  .flatMap(c => c.items)
  .reduce((a, { id, complexity }) => ({ ...a, [id]: complexity }), {});

export const CATEGORY_MAP = Object.entries(ALGORITHMS)
  .flatMap(([cat, { items }]) => items.map(({ id }) => [id, cat]))
  .reduce((a, [id, cat]) => ({ ...a, [id]: cat }), {});

export const DUAL_MODE_MAP = Object.values(ALGORITHMS)
  .flatMap(c => c.items)
  .reduce((a, { id, dual }) => ({ ...a, [id]: dual }), {});

/* What shows inside the textarea before the user types */
export const PLACEHOLDER_MAP = {
  Bubble_Sort:    '[5, 2, 8, 1, 9]',
  Insertion_Sort: '[5, 2, 8, 1, 9]',
  Quick_Sort:     '[5, 2, 8, 1, 9]',
  Merge_Sort:     '[5, 2, 8, 1, 9]',
  Heap_Sort:      '[5, 2, 8, 1, 9]',
  Binary_Search:  '[1, 3, 5, 7, 9, 5]',
  Linear_Search:  '[4, 7, 2, 9, 1, 7]',
  BFS:            '6',
  DFS:            '6',
  Fibonacci:      '10',
  Factorial:      '8',
  Prime_Checker:  '17',
  Power:          '{"base": 2, "exp": 10}',
  GCD:            '{"a": 48, "b": 18}',
  Palindrome:     '"racecar"',
  Hanoi:          '4',
};

/* The small grey hint line shown below the editor */
export const HINT_MAP = {
  Bubble_Sort:    'Pass an array of numbers to sort.',
  Insertion_Sort: 'Pass an array of numbers to sort.',
  Quick_Sort:     'Pass an array of numbers to sort.',
  Merge_Sort:     'Pass an array of numbers to sort.',
  Heap_Sort:      'Pass an array of numbers to sort.',
  Binary_Search:  'Last number is the target. e.g. [1,3,5,7,9, 5] searches for 5.',
  Linear_Search:  'Last number is the target. e.g. [4,7,2,9,1, 7] searches for 7.',
  BFS:            'Type a number to auto-build a graph, or paste {"graph":{...},"start":"A"}.',
  DFS:            'Type a number to auto-build a graph, or paste {"graph":{...},"start":"A"}.',
  Fibonacci:      'Pass an integer n — returns the nth Fibonacci number.',
  Factorial:      'Pass an integer n — returns n! (n factorial).',
  Prime_Checker:  'Pass an integer — returns true if prime, false otherwise.',
  Power:          'Pass {"base": 2, "exp": 10} — returns base raised to exp.',
  GCD:            'Pass {"a": 48, "b": 18} — returns the greatest common divisor.',
  Palindrome:     'Pass a string like "racecar" or a number like 12321.',
  Hanoi:          'Pass an integer (number of disks). Recommended max: 10.',
};

/* ══════════════════════════════════════════════════════════════ */

const Sidebar = ({ selectedAlgo, onSelectAlgo }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState({});

  const toggle = (cat) =>
    setCollapsed(p => ({ ...p, [cat]: !p[cat] }));

  const totalAlgos = Object.values(ALGORITHMS)
    .flatMap(c => c.items).length;

  return (
    <aside className="sb">
      <div className="sb-logo" onClick={() => navigate('/')}>
        <span className="sb-logo-mark">AB</span>
        <div className="sb-logo-text">
          <span className="sb-logo-name">AlgoBench</span>
          <span className="sb-logo-version">v1.0</span>
        </div>
      </div>

      <div className="sb-divider" />

      <div className="sb-section-header">
        <span className="sb-section-label">Algorithms</span>
        <span className="sb-section-count">{totalAlgos}</span>
      </div>

      <nav className="sb-nav">
        {Object.entries(ALGORITHMS).map(([cat, { color, icon, items }]) => {
          const open      = !collapsed[cat];
          const hasActive = items.some(a => a.id === selectedAlgo);

          return (
            <div key={cat} className="sb-group">
              <button
                className={`sb-cat ${hasActive ? 'sb-cat--has-active' : ''}`}
                onClick={() => toggle(cat)}
                style={{ '--c': color }}
              >
                <span className="sb-cat-left">
                  <span className="sb-cat-icon" style={{ color }}>{icon}</span>
                  <span className="sb-cat-name">{cat}</span>
                  <span className="sb-cat-pill">{items.length}</span>
                </span>
                <svg
                  className={`sb-chevron ${open ? 'sb-chevron--open' : ''}`}
                  width="11" height="11" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              {open && (
                <div className="sb-items">
                  {items.map(({ id, label, complexity, dual }) => {
                    const active = selectedAlgo === id;
                    return (
                      <button
                        key={id}
                        className={`sb-item ${active ? 'sb-item--active' : ''}`}
                        onClick={() => onSelectAlgo(id)}
                        style={{ '--c': color }}
                      >
                        <span className="sb-item-dot" />
                        <span className="sb-item-name">{label}</span>
                        <span className="sb-item-meta">
                          {!dual && <span className="sb-single-badge">1×</span>}
                          <span className="sb-item-o">{complexity}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="sb-footer">
        <div className="sb-legend">
          <span className="sb-legend-item">
            <span className="sb-legend-dot sb-legend-dot--dual" />
            Dual mode
          </span>
          <span className="sb-legend-item">
            <span className="sb-legend-dot sb-legend-dot--single" />
            Single mode
          </span>
        </div>
        <div className="sb-status">
          <span className="sb-status-dot" />
          Backend ready · FastAPI
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
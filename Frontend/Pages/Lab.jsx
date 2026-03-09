import { useState, useRef } from 'react';
import { CATEGORIES } from '../algorithms/registry';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import './Lab.css';

// ─── Input components per type ────────────────────────────────────────────────

function NumberInput({ algo, value, onChange }) {
  return (
    <div className="lab__field">
      <label className="lab__label">{algo.inputLabel}</label>
      <input
        className="lab__input lab__input--short"
        type="number"
        min="0"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={algo.defaultInput}
      />
      <p className="lab__hint">{algo.inputHint}</p>
    </div>
  );
}

function ArrayInput({ algo, value, onChange }) {
  return (
    <div className="lab__field">
      <label className="lab__label">{algo.inputLabel}</label>
      <input
        className="lab__input"
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={algo.defaultInput}
      />
      <p className="lab__hint">{algo.inputHint}</p>
    </div>
  );
}

function SearchInput({ algo, value, onChange }) {
  return (
    <div className="lab__field-group">
      <div className="lab__field">
        <label className="lab__label">Array</label>
        <input
          className="lab__input"
          type="text"
          value={value.arr}
          onChange={e => onChange({ ...value, arr: e.target.value })}
          placeholder={algo.defaultInput.arr}
        />
      </div>
      <div className="lab__field">
        <label className="lab__label">Target</label>
        <input
          className="lab__input lab__input--short"
          type="number"
          value={value.target}
          onChange={e => onChange({ ...value, target: e.target.value })}
          placeholder={algo.defaultInput.target}
        />
      </div>
      <p className="lab__hint">{algo.inputHint}</p>
    </div>
  );
}

function GraphInput({ algo, value, onChange }) {
  return (
    <div className="lab__field-group">
      <div className="lab__field">
        <label className="lab__label">Nodes (comma-separated)</label>
        <input
          className="lab__input"
          type="text"
          value={value.nodes}
          onChange={e => onChange({ ...value, nodes: e.target.value })}
          placeholder={algo.defaultInput.nodes}
        />
      </div>
      <div className="lab__field">
        <label className="lab__label">Edges (e.g. A-B, B-C)</label>
        <input
          className="lab__input"
          type="text"
          value={value.edges}
          onChange={e => onChange({ ...value, edges: e.target.value })}
          placeholder={algo.defaultInput.edges}
        />
      </div>
      <div className="lab__field">
        <label className="lab__label">Start Node</label>
        <input
          className="lab__input lab__input--short"
          type="text"
          value={value.start}
          onChange={e => onChange({ ...value, start: e.target.value })}
          placeholder={algo.defaultInput.start}
        />
      </div>
      <p className="lab__hint">{algo.inputHint}</p>
    </div>
  );
}

// ─── Parse helpers ────────────────────────────────────────────────────────────

function parseInput(algo, raw) {
  switch (algo.inputType) {
    case 'number':
      return parseInt(raw) || 0;
    case 'array':
      return raw.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    case 'search':
      return {
        arr: raw.arr.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n)),
        target: parseFloat(raw.target),
      };
    case 'graph': {
      const nodes = raw.nodes.split(',').map(s => s.trim()).filter(Boolean);
      const graph = {};
      nodes.forEach(n => { graph[n] = []; });
      raw.edges.split(',').forEach(edge => {
        const parts = edge.trim().split('-');
        if (parts.length === 2) {
          const [a, b] = parts.map(s => s.trim());
          if (!graph[a]) graph[a] = [];
          if (!graph[b]) graph[b] = [];
          graph[a].push(b);
          graph[b].push(a);
        }
      });
      return { graph, start: raw.start.trim() };
    }
    default: return raw;
  }
}

function defaultRawValue(algo) {
  if (algo.inputType === 'number') return algo.defaultInput;
  if (algo.inputType === 'array') return algo.defaultInput;
  if (algo.inputType === 'search') return { ...algo.defaultInput };
  if (algo.inputType === 'graph') return { ...algo.defaultInput };
  return '';
}

// ─── Metric card ─────────────────────────────────────────────────────────────

function MetricCard({ label, value, unit, color, icon, delay }) {
  return (
    <div className="metric" style={{ '--color': color, '--delay': `${delay}ms` }}>
      <div className="metric__bar" />
      <span className="metric__icon">{icon}</span>
      <span className="metric__label">{label}</span>
      <div className="metric__val">
        <span className="metric__number">{value}</span>
        {unit && <span className="metric__unit">{unit}</span>}
      </div>
    </div>
  );
}

// ─── Result array visualizer ──────────────────────────────────────────────────

function ArrayViz({ arr }) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  const max = Math.max(...arr);
  return (
    <div className="arr-viz">
      {arr.map((v, i) => (
        <div key={i} className="arr-viz__col">
          <div
            className="arr-viz__bar"
            style={{ height: `${Math.max(10, (v / max) * 80)}px` }}
          />
          <span className="arr-viz__val">{v}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Graph visualizer (simple node circles) ───────────────────────────────────

function GraphViz({ graphData, traversal }) {
  if (!graphData || !traversal) return null;
  const order = traversal.split(' → ');
  const nodes = Object.keys(graphData);
  // Position nodes in a circle
  const cx = 120, cy = 110, r = 75;
  const positions = {};
  nodes.forEach((n, i) => {
    const angle = (2 * Math.PI * i) / nodes.length - Math.PI / 2;
    positions[n] = { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });

  return (
    <div className="graph-viz">
      <svg width={cx * 2} height={cy * 2} className="graph-viz__svg">
        {/* Edges */}
        {nodes.map(n =>
          (graphData[n] || []).map(nb => {
            if (n >= nb) return null; // avoid duplicates
            const a = positions[n], b = positions[nb];
            if (!a || !b) return null;
            return (
              <line key={`${n}-${nb}`}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke="var(--border-hi)" strokeWidth="1.5"
              />
            );
          })
        )}
        {/* Nodes */}
        {nodes.map(n => {
          const pos = positions[n];
          const visitIdx = order.indexOf(n);
          const visited = visitIdx >= 0;
          return (
            <g key={n} style={{ '--vi': visitIdx }}>
              <circle
                cx={pos.x} cy={pos.y} r="18"
                fill={visited ? 'var(--color)' : 'var(--dim)'}
                stroke={visited ? 'var(--color)' : 'var(--border)'}
                strokeWidth="1.5"
                className={visited ? 'graph-node--visited' : ''}
                style={{ opacity: visited ? 1 : 0.5 }}
              />
              <text
                x={pos.x} y={pos.y + 5}
                textAnchor="middle"
                fill={visited ? 'var(--bg)' : 'var(--muted)'}
                fontSize="12"
                fontFamily="var(--mono)"
                fontWeight="700"
              >{n}</text>
              {visited && (
                <text
                  x={pos.x + 14} y={pos.y - 14}
                  fill="var(--color)" fontSize="9"
                  fontFamily="var(--mono)"
                >{visitIdx + 1}</text>
              )}
            </g>
          );
        })}
      </svg>
      <div className="graph-viz__legend">
        {order.map((n, i) => (
          <span key={i} className="graph-viz__step">
            <span className="graph-viz__step-num">{i + 1}</span>{n}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────
function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tip">
      <div className="chart-tip__label">{label}</div>
      {payload.map(p => (
        <div key={p.name} className="chart-tip__row" style={{ color: p.color }}>
          {p.name}: <strong>{p.value}</strong>
        </div>
      ))}
    </div>
  );
}

// ─── Main Lab page ────────────────────────────────────────────────────────────

export default function Lab({ algo, onBack }) {
  const cat = CATEGORIES[algo.category];
  const [rawInput, setRawInput] = useState(defaultRawValue(algo));
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const resultRef = useRef(null);

  const handleRun = () => {
    setError(null);
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      try {
        const parsed = parseInput(algo, rawInput);
        const out = algo.run(parsed);
        setResult(out);
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }, 50);
  };

  const handleReset = () => {
    setRawInput(defaultRawValue(algo));
    setResult(null);
    setError(null);
  };

  const barData = result ? [
    { name: 'Calls', value: result.callCount },
    { name: 'Depth', value: result.maxDepth },
  ] : [];

  const isGraph = algo.inputType === 'graph';
  const isArray = algo.inputType === 'array';
  const resultIsArray = result && Array.isArray(result.result);

  // Build graph object for viz
  let graphObj = null;
  if (isGraph && result) {
    try {
      const parsed = parseInput(algo, rawInput);
      graphObj = parsed.graph;
    } catch {}
  }

  return (
    <div className="lab" style={{ '--color': cat.color, '--glow': cat.glow }}>
      {/* ── Back + header ── */}
      <div className="lab__header">
        <button className="lab__back" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          All algorithms
        </button>
      </div>

      <div className="lab__layout">
        {/* ── LEFT: info + input ── */}
        <div className="lab__left">
          {/* Identity */}
          <div className="lab__identity">
            <div className="lab__cat-badge">
              <span>{cat.icon}</span>
              {algo.category}
            </div>
            <h1 className="lab__title">{algo.label}</h1>
            <span className="lab__sublabel">{algo.sublabel}</span>
          </div>

          {/* Description */}
          <p className="lab__desc">{algo.description}</p>

          {/* Complexity pills */}
          <div className="lab__complexity">
            <div className="lab__complex-item">
              <span className="lab__complex-key">Time</span>
              <span className="lab__complex-val">{algo.complexity.time}</span>
            </div>
            <div className="lab__complex-item">
              <span className="lab__complex-key">Space</span>
              <span className="lab__complex-val">{algo.complexity.space}</span>
            </div>
          </div>

          {/* Input form */}
          <div className="lab__form">
            <div className="lab__form-title">
              <span className="lab__form-dot" />
              Input
            </div>

            {algo.inputType === 'number' && (
              <NumberInput algo={algo} value={rawInput} onChange={setRawInput} />
            )}
            {algo.inputType === 'array' && (
              <ArrayInput algo={algo} value={rawInput} onChange={setRawInput} />
            )}
            {algo.inputType === 'search' && (
              <SearchInput algo={algo} value={rawInput} onChange={setRawInput} />
            )}
            {algo.inputType === 'graph' && (
              <GraphInput algo={algo} value={rawInput} onChange={setRawInput} />
            )}

            {error && <div className="lab__error">⚠ {error}</div>}

            <div className="lab__actions">
              <button
                className={`lab__run-btn${loading ? ' lab__run-btn--loading' : ''}`}
                onClick={handleRun}
                disabled={loading}
              >
                {loading ? (
                  <span className="lab__spinner" />
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 2l9 5-9 5V2z" fill="currentColor"/>
                    </svg>
                    Run
                  </>
                )}
              </button>
              <button className="lab__reset-btn" onClick={handleReset}>Reset</button>
            </div>
          </div>
        </div>

        {/* ── RIGHT: result panel ── */}
        <div className="lab__right" ref={resultRef}>
          {!result && !loading && (
            <div className="lab__placeholder">
              <div className="lab__placeholder-icon">{cat.icon}</div>
              <p>Configure your input and hit <strong>Run</strong> to see the results here.</p>
            </div>
          )}

          {loading && (
            <div className="lab__placeholder">
              <div className="lab__loading-ring" />
              <p>Computing…</p>
            </div>
          )}

          {result && (
            <div className="lab__result fade-up">
              {/* Output */}
              <div className="lab__result-section">
                <span className="lab__result-label">Output</span>
                <div className="lab__output">
                  {resultIsArray ? (
                    <>
                      <div className="lab__output-text">[{result.result.join(', ')}]</div>
                      <ArrayViz arr={result.result} />
                    </>
                  ) : isGraph ? (
                    <>
                      <div className="lab__output-text">{String(result.result)}</div>
                      <GraphViz graphData={graphObj} traversal={String(result.result)} />
                    </>
                  ) : (
                    <div className="lab__output-text">{String(result.result)}</div>
                  )}
                </div>
              </div>

              {/* Metrics */}
              <div className="lab__result-section">
                <span className="lab__result-label">Performance Metrics</span>
                <div className="lab__metrics">
                  <MetricCard
                    label="Execution Time"
                    value={result.executionTime < 0.01
                      ? `< 0.01`
                      : result.executionTime.toFixed(3)}
                    unit="ms"
                    color={cat.color}
                    icon="⏱"
                    delay={0}
                  />
                  <MetricCard
                    label="Call Count"
                    value={result.callCount.toLocaleString()}
                    unit="calls"
                    color={cat.color}
                    icon="🔁"
                    delay={80}
                  />
                  <MetricCard
                    label="Max Depth"
                    value={result.maxDepth}
                    unit="levels"
                    color={cat.color}
                    icon="📐"
                    delay={160}
                  />
                </div>
              </div>

              {/* Chart */}
              <div className="lab__result-section">
                <span className="lab__result-label">Call Count vs Depth</span>
                <div className="lab__chart">
                  <ResponsiveContainer width="100%" height={160}>
                    <BarChart data={barData} barSize={40}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                      <XAxis dataKey="name" tick={{ fill: 'var(--muted)', fontSize: 11, fontFamily: 'var(--mono)' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: 'var(--muted)', fontSize: 11, fontFamily: 'var(--mono)' }} axisLine={false} tickLine={false} />
                      <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                      <Bar dataKey="value" fill={cat.color} radius={[6, 6, 0, 0]}
                        name="value"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Complexity reminder */}
              <div className="lab__complexity-note">
                <span>Theoretical complexity:</span>
                <code>{algo.complexity.time}</code> time ·
                <code>{algo.complexity.space}</code> space
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
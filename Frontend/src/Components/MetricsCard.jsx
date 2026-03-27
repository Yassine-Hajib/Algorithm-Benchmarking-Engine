import React from 'react';
import './MetricsCard.css';

/**
 * MetricCard — displays a single benchmark metric
 * Props:
 *   label    {string}  — metric name, e.g. "Execution Time"
 *   value    {string}  — formatted value, e.g. "0.0004s"
 *   icon     {JSX}     — optional SVG icon
 *   accent   {string}  — optional CSS color for the accent bar
 *   highlight {boolean} — glow this card (winner state)
 */
const MetricCard = ({ label, value, icon, accent = 'var(--teal)', highlight = false }) => (
  <div className={`mc ${highlight ? 'mc--highlight' : ''}`} style={{ '--mc-accent': accent }}>
    <div className="mc-top">
      {icon && <span className="mc-icon" style={{ color: accent }}>{icon}</span>}
      <span className="mc-label">{label}</span>
    </div>
    <span className="mc-value">{value}</span>
    <div className="mc-bar" />
  </div>
);

export default MetricCard;
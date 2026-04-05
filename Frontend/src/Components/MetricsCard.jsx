import React from 'react';
import './MetricsCard.css';


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
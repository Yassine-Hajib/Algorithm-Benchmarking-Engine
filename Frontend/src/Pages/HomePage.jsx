import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="hero">
        <h1>Analyze. Compare. <span>Optimize.</span></h1>
        <p>A high-performance engine to benchmark algorithms in real-time using Python backends and asynchronous task processing.</p>
        <button className="cta-button" onClick={() => navigate('/benchmark')}>
          Launch Engine →
        </button>
      </header>

      <section className="features">
        <div className="feature-card">
          <div className="icon">⏱️</div>
          <h3>Precise Metrics</h3>
          <p>Measure execution time down to the microsecond and track memory consumption.</p>
        </div>
        <div className="feature-card">
          <div className="icon">🐍</div>
          <h3>Python Integration</h3>
          <p>Seamlessly executes native Python scripts using Dockerized environments.</p>
        </div>
        <div className="feature-card">
          <div className="icon">📊</div>
          <h3>Complexity Analysis</h3>
          <p>Visualize how your algorithms scale with increasing data loads.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
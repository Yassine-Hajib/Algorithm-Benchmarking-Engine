import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  // Defining features in an array makes the code cleaner and easier to update
  const FEATURES = [
    {
      icon: "⏱️",
      title: "Precise Metrics",
      desc: "Measure execution time down to the microsecond and track real-time memory consumption."
    },
    {
      icon: "🐍",
      title: "Python Integration",
      desc: "Seamlessly execute native Python scripts using specialized backend environments."
    },
    {
      icon: "📊",
      title: "Complexity Analysis",
      desc: "Visualize how your algorithms scale and identify performance bottlenecks."
    },
    {
      icon: "⚖️",
      title: "Side-by-Side Comparison",
      desc: "Compare Iterative vs Recursive methods to find the most efficient solution for your data."
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Analyze. Compare. <span>Optimize.</span></h1>
          <p>
            A high-performance engine to benchmark algorithms in real-time 
            using Python backends and asynchronous task processing.
          </p>
          <button className="cta-button" onClick={() => navigate('/benchmark')}>
            Launch Engine →
          </button>
        </div>
      </header>
      
      {/* Features Grid */}
      <section className="features-grid">
        {FEATURES.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer-lite for Professionalism */}
      <footer className="home-footer">
        <p>&copy; 2026 AlgoBench Engine. Built with React & FastAPI.</p>
      </footer>
    </div>
  );
};

export default HomePage;
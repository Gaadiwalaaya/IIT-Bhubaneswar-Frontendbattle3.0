import React, { useState, useEffect } from 'react';

const METRICS_MODES = {
  throughput: {
    title: 'Data Throughput (GB/s)',
    val: '4.82 GB/s',
    sub: '+12.4% vs last hour',
    points: [30, 45, 35, 70, 50, 85, 60, 95, 80, 110, 90, 120]
  },
  tokens: {
    title: 'Active Token Usage (K/s)',
    val: '124.9 K/s',
    sub: '-4.2% optimization saving',
    points: [80, 70, 90, 65, 75, 55, 70, 45, 60, 40, 55, 35]
  },
  nodes: {
    title: 'Distributed Compute Load',
    val: '94.2% Load',
    sub: '128 instances active',
    points: [50, 55, 60, 58, 65, 70, 72, 80, 85, 90, 92, 95]
  }
};

const LOG_MESSAGES = [
  'Initialized pipeline node #14... Success',
  'Vector search completed in 4.2ms',
  'Schema drift detected in table: customers_v2',
  'Synthesizing ETL model mapping config...',
  'Memory buffer pool flush completed: 8.4GB',
  'API routing table updated globally',
  'Anomaly score detected: 0.002 (Normal)',
  'Scaling instance group us-east-4... Success',
];

const Dashboard = () => {
  const [mode, setMode] = useState('throughput');
  const [points, setPoints] = useState(METRICS_MODES.throughput.points);
  const [barHeights, setBarHeights] = useState([40, 65, 50, 85, 60, 75, 45, 90]);
  const [logs, setLogs] = useState(LOG_MESSAGES.slice(0, 4));
  const [gaugeVal, setGaugeVal] = useState(78);

  useEffect(() => {
    setPoints(METRICS_MODES[mode].points);
  }, [mode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prev => 
        prev.map(p => Math.min(130, Math.max(15, p + (Math.random() * 30 - 15))))
      );

      setBarHeights(prev => 
        prev.map(() => Math.min(100, Math.max(10, Math.floor(Math.random() * 80 + 10))))
      );

      setGaugeVal(prev => {
        const delta = Math.floor(Math.random() * 12 - 6);
        return Math.min(99, Math.max(50, prev + delta));
      });

      setLogs(prev => {
        const nextMsg = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
        return [nextMsg, ...prev.slice(0, 3)];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const generatePath = (pts, isClosed) => {
    if (pts.length === 0) return '';
    const step = 500 / (pts.length - 1);
    let path = `M 0,${150 - pts[0]}`;
    
    for (let i = 1; i < pts.length; i++) {
      const x = i * step;
      const y = 150 - pts[i];
      const prevX = (i - 1) * step;
      const prevY = 150 - pts[i - 1];
      const cpX1 = prevX + step / 2;
      const cpY1 = prevY;
      const cpX2 = prevX + step / 2;
      const cpY2 = y;
      
      path += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${x},${y}`;
    }
    
    if (isClosed) {
      path += ` L 500,150 L 0,150 Z`;
    }
    return path;
  };

  const linePath = generatePath(points, false);
  const areaPath = generatePath(points, true);

  return (
    <section className="section dashboard-section" id="dashboard" style={{ paddingLeft: 0, paddingRight: 0 }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="section-tag">Live Infrastructure</span>
          <h2 className="section-title">Autonomous Control Plane</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Real-time pipeline analytics, vector queries, and optimization metrics.
          </p>
        </div>
      </div>

      <div className="dashboard-grid">
        
        <div className="dashboard-cell main-chart-cell">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">{METRICS_MODES[mode].title}</h3>
              <span className="chart-subtitle">{METRICS_MODES[mode].sub}</span>
            </div>
            <div className="chart-controls">
              {Object.keys(METRICS_MODES).map(key => (
                <button 
                  key={key} 
                  className={`chart-mode-btn ${mode === key ? 'active' : ''}`}
                  onClick={() => setMode(key)}
                >
                  {key.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="svg-container">
            <svg viewBox="0 0 500 150" width="100%" height="100%" preserveAspectRatio="none">
              <line x1="0" y1="37.5" x2="500" y2="37.5" stroke="rgba(255,255,255,0.03)" strokeDasharray="4" />
              <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(255,255,255,0.03)" strokeDasharray="4" />
              <line x1="0" y1="112.5" x2="500" y2="112.5" stroke="rgba(255,255,255,0.03)" strokeDasharray="4" />

              <path 
                d={areaPath} 
                fill="url(#chartGrad)" 
                style={{ transition: 'd 1.5s cubic-bezier(0.25, 1, 0.5, 1)' }}
              />
              <path 
                d={linePath} 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="2"
                style={{ transition: 'd 1.5s cubic-bezier(0.25, 1, 0.5, 1)' }}
              />

              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="value-ticker-row">
            <div>
              <span className="ticker-label">Metrics Engine</span>
              <span className="ticker-value">{METRICS_MODES[mode].val}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="ticker-label">Cluster Status</span>
              <span className="ticker-status-badge">
                <span className="status-indicator-dot" />
                OPERATIONAL
              </span>
            </div>
          </div>
        </div>

        <div className="dashboard-cell bar-chart-cell">
          <h3 className="chart-title">Token Load Distribution</h3>
          <span className="chart-subtitle">Regional load balancing allocations</span>
          
          <div className="bars-container">
            {barHeights.map((h, i) => (
              <div key={i} className="bar-wrapper">
                <div 
                  className="bar-fill" 
                  style={{ height: `${h}%` }}
                />
                <span className="bar-label">Node {i+1}</span>
              </div>
            ))}
          </div>

          <div className="bar-summary-row">
            <div>
              <span className="ticker-label">Peak Allocation</span>
              <span className="ticker-value" style={{ fontSize: '1.25rem' }}>842K / s</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="ticker-label">Queue Backlog</span>
              <span className="ticker-value" style={{ fontSize: '1.25rem' }}>0ms</span>
            </div>
          </div>
        </div>

        <div className="dashboard-cell status-cell">
          <div>
            <h3 className="chart-title">Resource Allocation</h3>
            <span className="chart-subtitle" style={{ marginBottom: '16px', display: 'block' }}>Core memory buffer pools</span>

            <div className="gauge-row">
              <div className="gauge-wrapper">
                <svg viewBox="0 0 100 100" width="80" height="80">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="42" 
                    fill="none" 
                    stroke="#ffffff" 
                    strokeWidth="6" 
                    strokeDasharray={2 * Math.PI * 42}
                    strokeDashoffset={2 * Math.PI * 42 * (1 - gaugeVal / 100)}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.25, 1, 0.5, 1)' }}
                  />
                </svg>
                <div className="gauge-text">
                  <span className="gauge-num">{gaugeVal}%</span>
                  <span className="gauge-label">CPU</span>
                </div>
              </div>

              <div>
                <span className="ticker-label">Optimization Ratio</span>
                <span className="ticker-value" style={{ fontSize: '1.5rem', fontWeight: 800 }}>98.4%</span>
                <span className="chart-subtitle" style={{ color: 'var(--accent-mint)' }}>Dynamic Compression</span>
              </div>
            </div>
          </div>

          <div className="activity-logs">
            <span className="ticker-label" style={{ marginBottom: '12px', display: 'block' }}>Real-time Transaction Logs</span>
            <div className="log-list">
              {logs.map((log, idx) => (
                <div key={log + idx} className="log-row">
                  <span className="log-bullet">&gt;</span>
                  <span className="log-text">{log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Dashboard;

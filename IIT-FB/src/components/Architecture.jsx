import React from 'react';

const Architecture = () => {
  return (
    <section className="architecture-section" id="architecture">
      <div className="architecture-split">
        
        <div className="architecture-left">
          <div className="architecture-text-content">
            <span className="section-tag-dark">System Pipeline</span>
            <h2 className="architecture-title-dark">Simple Architecture. Enterprise Power.</h2>
            <p className="architecture-desc-dark">
              AetherFlow replaces complex, fragile engineering layers with an autonomous stream pipeline. Here is how your data travels from source to destination in under 80 milliseconds.
            </p>

            <div className="usecase-diagram-wrapper">
              <div className="usecase-diagram">
                <div className="diagram-column">
                  <div className="diagram-node trigger-node">
                    <span className="node-icon">👤</span>
                    <span className="node-label">Client APP</span>
                  </div>
                  <div className="diagram-node trigger-node">
                    <span className="node-icon">⚡</span>
                    <span className="node-label">Webhook</span>
                  </div>
                  <div className="diagram-node trigger-node">
                    <span className="node-icon">💾</span>
                    <span className="node-label">CDC Event</span>
                  </div>
                </div>

                <div className="diagram-arrows">
                  <svg width="40" height="120" viewBox="0 0 40 120">
                    <path d="M 0,20 C 20,20 20,60 40,60" stroke="#050505" strokeWidth="1.5" strokeDasharray="3" fill="none" />
                    <path d="M 0,60 L 40,60" stroke="#050505" strokeWidth="1.5" fill="none" />
                    <path d="M 0,100 C 20,100 20,60 40,60" stroke="#050505" strokeWidth="1.5" strokeDasharray="3" fill="none" />
                  </svg>
                </div>

                <div className="diagram-column system-boundary">
                  <div className="diagram-system-box">
                    <span className="system-tag">AETHER PIPELINE</span>
                    <div className="diagram-usecase">
                      <span>Capture Drift</span>
                    </div>
                    <div className="diagram-usecase active">
                      <span>Map & Stream</span>
                    </div>
                    <div className="diagram-usecase">
                      <span>Compress Data</span>
                    </div>
                  </div>
                </div>

                <div className="diagram-arrows">
                  <svg width="40" height="120" viewBox="0 0 40 120">
                    <path d="M 0,60 C 20,60 20,20 40,20" stroke="#050505" strokeWidth="1.5" strokeDasharray="3" fill="none" />
                    <path d="M 0,60 L 40,60" stroke="#050505" strokeWidth="1.5" fill="none" />
                    <path d="M 0,60 C 20,60 20,100 40,100" stroke="#050505" strokeWidth="1.5" strokeDasharray="3" fill="none" />
                  </svg>
                </div>

                <div className="diagram-column">
                  <div className="diagram-node dest-node">
                    <span className="node-icon">📊</span>
                    <span className="node-label">Warehouse</span>
                  </div>
                  <div className="diagram-node dest-node">
                    <span className="node-icon">🧠</span>
                    <span className="node-label">Vector DB</span>
                  </div>
                  <div className="diagram-node dest-node">
                    <span className="node-icon">🎯</span>
                    <span className="node-label">Client App</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="architecture-right">
          <div className="flow-visualizer-container">
            
            <div className="flow-connecting-line">
              <div className="flow-data-packet" />
            </div>

            <div className="flow-nodes-list">
              
              <div className="flow-node-item node-step-1">
                <div className="flow-node-icon-wrapper">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.905 0-5.64-.5-8.13-1.418m16.26 0C18.665 14.58 15.61 17.5 12 17.5c-3.61 0-6.665-2.92-8.13-6.582" />
                  </svg>
                </div>
                <div className="flow-node-details">
                  <h4 className="flow-node-title">1. Raw Sources</h4>
                  <span className="flow-node-status">APIs, DBs, Logs</span>
                </div>
              </div>

              <div className="flow-node-item node-step-2">
                <div className="flow-node-icon-wrapper">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21L14.907 18M18 10.5c0-2.9-2.3-5.25-5.25-5.25S7.5 7.6 7.5 10.5M21 10.5c0 4.142-3.358 7.5-7.5 7.5s-7.5-3.358-7.5-7.5S9.358 3 13.5 3s7.5 3.358 7.5 7.5z" />
                  </svg>
                </div>
                <div className="flow-node-details">
                  <h4 className="flow-node-title">2. Autonomous AI Synthesis</h4>
                  <span className="flow-node-status">ETL & Drift Handling</span>
                </div>
              </div>

              <div className="flow-node-item node-step-3">
                <div className="flow-node-icon-wrapper">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <div className="flow-node-details">
                  <h4 className="flow-node-title">3. Stream Buffer Core</h4>
                  <span className="flow-node-status">Sub-millisecond transform</span>
                </div>
              </div>

              <div className="flow-node-item node-step-4">
                <div className="flow-node-icon-wrapper">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div className="flow-node-details">
                  <h4 className="flow-node-title">4. Dest Delivery</h4>
                  <span className="flow-node-status">Warehouses, Vector Pools</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Architecture;

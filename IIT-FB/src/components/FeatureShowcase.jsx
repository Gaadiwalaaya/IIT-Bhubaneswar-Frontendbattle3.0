import React, { useState, useEffect, useRef } from 'react';

const FEATURES_DATA = [
  {
    id: 0,
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21L14.907 18M18 10.5c0-2.9-2.3-5.25-5.25-5.25S7.5 7.6 7.5 10.5M21 10.5c0 4.142-3.358 7.5-7.5 7.5s-7.5-3.358-7.5-7.5S9.358 3 13.5 3s7.5 3.358 7.5 7.5z" />
      </svg>
    ),
    title: 'Autonomous AI Synthesis Engine',
    desc: 'Generates custom ETL integration models on the fly. Adapts dynamically to changing schema drift and validates mappings in real time.',
    metric: 'Pipeline build: <4.2 seconds'
  },
  {
    id: 1,
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Sub-Millisecond Stream Core',
    desc: 'Bypasses standard CPU cycles using memory-mapped buffer pools to transform gigabytes of raw JSON logs per second.',
    metric: 'Throughput: 4.8M msg/sec'
  },
  {
    id: 2,
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Neural Anomaly Monitor',
    desc: 'Real-time observability layer running cognitive threat scans directly inside streaming instances.',
    metric: 'FPR rate: <0.01%'
  },
  {
    id: 3,
    icon: (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.905 0-5.64-.5-8.13-1.418m16.26 0C18.665 14.58 15.61 17.5 12 17.5c-3.61 0-6.665-2.92-8.13-6.582" />
      </svg>
    ),
    title: 'Elastic Cloud Orchestrator',
    desc: 'Zero-cold-start virtualization engine clusters. Instantly scale cloud instances globally without manual Docker or Kubernetes configuration.',
    metric: 'Scale-out latency: 80ms'
  }
];

const FeatureShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      const totalScrollableHeight = rect.height - viewHeight;
      const scrolled = -rect.top;

      const progress = Math.min(1, Math.max(0, scrolled / totalScrollableHeight));
      containerRef.current.style.setProperty('--scroll-progress', progress);

      if (scrolled >= 0 && scrolled <= totalScrollableHeight) {
        const nextIndex = Math.min(
          FEATURES_DATA.length - 1,
          Math.max(0, Math.floor(progress * FEATURES_DATA.length))
        );
        setActiveIndex(nextIndex);
      } else if (scrolled < 0) {
        setActiveIndex(0);
      } else {
        setActiveIndex(FEATURES_DATA.length - 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="features-scroll-container" ref={containerRef}>
      <div className="features-sticky-wrapper">
        <div className="container scroll-deck-layout">
          <div className="features-sidebar-text">
            <div className="active-counter-wrapper">
              <span key={activeIndex} className="active-counter-number">
                0{activeIndex + 1}
              </span>
              <span className="active-counter-total"> / 0{FEATURES_DATA.length}</span>
            </div>

            <span className="section-tag">Core Architecture</span>
            <h2 className="section-title">Engineered for Technical Integrity</h2>
            <p className="section-desc">
              Scroll down to inspect our micro-architectured modules one by one.
            </p>

            <div className="scroll-progress-dots">
              {FEATURES_DATA.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`progress-dot ${activeIndex === idx ? 'active' : ''}`}
                />
              ))}
            </div>

            <div className="scroll-indicator-bar">
              <div 
                className="scroll-indicator-progress" 
                style={{ width: `${((activeIndex + 1) / FEATURES_DATA.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="features-deck-wrapper">
            <div className="features-glow-blob" />

            {FEATURES_DATA.map((feat, idx) => {
              const diff = activeIndex - idx;
              let cardStyle = {};
              
              if (diff > 0) {
                cardStyle = {
                  opacity: 1,
                  transform: `translateY(${-32 * diff}px) scale(${1 - 0.05 * diff}) rotate(${-1.5 * diff}deg)`,
                  filter: `brightness(${Math.max(0.5, 1 - 0.12 * diff)})`,
                  zIndex: 10 + idx,
                  pointerEvents: 'none',
                };
              } else if (diff === 0) {
                cardStyle = {
                  opacity: 1,
                  transform: 'translateY(0) scale(1) rotate(0deg)',
                  filter: 'none',
                  zIndex: 10 + idx,
                  pointerEvents: 'auto',
                };
              } else {
                cardStyle = {
                  opacity: 0,
                  transform: 'translateY(220px) scale(0.88) rotate(4deg)',
                  filter: 'blur(4px)',
                  zIndex: 10 + idx,
                  pointerEvents: 'none',
                };
              }

              return (
                <div
                  key={feat.id}
                  className="scroll-deck-card"
                  style={cardStyle}
                >
                  <div className="deck-card-body">
                    <div>
                      <div className="deck-card-icon">{feat.icon}</div>
                      <h3 className="deck-card-title">{feat.title}</h3>
                      <p className="deck-card-text">{feat.desc}</p>
                    </div>
                    <div className="deck-demo-box">
                      <span>{feat.metric}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;
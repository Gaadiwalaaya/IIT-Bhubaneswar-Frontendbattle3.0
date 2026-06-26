import React from 'react';

const STATS = [
  { val: '4.8M+', label: 'Ops Per Second' },
  { val: '99.999%', label: 'Uptime SLA' },
  { val: '<12ms', label: 'End-to-End Latency' }
];

const REVIEWS = [
  {
    quote: "AetherFlow cut our custom warehousing ETL build times from weeks to literally seconds. The autonomous drift handling is magic.",
    author: "Elena Rostova",
    role: "VP of Data Engineering, CloudScale"
  },
  {
    quote: "The low-latency stream engine is bulletproof. Running our fraud detection vector queries directly inside memory-buffered pools is a game-changer.",
    author: "Marcus Chen",
    role: "Lead Architect, FinTech Global"
  }
];

const SocialProof = () => {
  return (
    <section className="section" id="social-proof" style={{ borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '80px',
          textAlign: 'center'
        }}>
          {STATS.map((stat, idx) => (
            <div key={idx}>
              <div className="gradient-accent-text" style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                {stat.val}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '8px', fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px'
        }}>
          {REVIEWS.map((rev, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '32px' }}>
              <p style={{ fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: '24px', fontSize: '1.05rem', lineHeight: '1.7' }}>
                "{rev.quote}"
              </p>
              <div>
                <div style={{ fontWeight: 600, color: 'white', fontFamily: 'var(--font-heading)' }}>{rev.author}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{rev.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
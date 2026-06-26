import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="logo" style={{ justifyContent: 'center', marginBottom: '16px' }}>
          AetherFlow <span className="logo-dot"></span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
          The autonomous orchestration layer for secure, real-time enterprise data integration.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '32px' }}>
          <a href="#features" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Features</a>
          <a href="#pricing" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Pricing</a>
          <a href="#home" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</a>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} AetherFlow Technologies, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
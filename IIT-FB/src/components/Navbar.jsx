import React from 'react';

const Navbar = () => {
  return (
    <header className="navbar-header">
      <a href="#home" className="logo" style={{ color: 'white', textDecoration: 'none' }}>
        AetherFlow <span className="logo-dot"></span>
      </a>
      
      <nav style={{ display: 'flex', alignItems: 'center' }}>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#home" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem', marginLeft: '32px' }}>
          Console Login
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
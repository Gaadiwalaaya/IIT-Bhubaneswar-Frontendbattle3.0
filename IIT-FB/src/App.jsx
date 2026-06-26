import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureShowcase from './components/FeatureShowcase';
import Pricing from './components/Pricing';
import SocialProof from './components/SocialProof';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app-layout">
      {/* Navigation Header overlay */}
      <Navbar />

      {/* Main Page Sections (Full-bleed layout starting at y=0) */}
      <main>
        <Hero />
        <FeatureShowcase />
        <Pricing />
        <SocialProof />
      </main>

      {/* Brand Footer */}
      <Footer />
    </div>
  );
}

export default App;
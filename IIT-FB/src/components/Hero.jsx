import React from 'react';

const Hero = () => {
  return (
    <section className="hero-section" id="home">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="hero-video-background"
      >
        <source 
          src="/classroom.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>
      
      <div className="hero-overlay"></div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <span>Autonomous Intelligence</span>
          </div>
          
          <h1 className="hero-title gradient-text">
            Autonomous Data Pipelines Built by Next-Gen AI
          </h1>
          
          <p className="hero-description">
            AetherFlow designs, tests, and deploys high-speed data integration pipelines on autopilot. 
            Connect legacy databases, cloud APIs, and warehouses in milliseconds.
          </p>
          
          <div className="hero-ctas">
            <a href="#features" className="btn btn-primary">
              Explore Engine
            </a>
            <a href="#pricing" className="btn btn-secondary">
              View Pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
import React, { useState } from "react";
import { PRICING_MATRIX } from "../data/pricingMatrix";
import PriceDisplay from "./PriceDisplay";

const Pricing = () => {
  return (
    <section className="section" id="pricing" style={{ background: 'rgba(5, 7, 15, 0.4)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="section-tag">Flexible Plans</span>
          <h2 className="section-title">Isolated Multi-Currency Pricing</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Scale dynamically with pricing models optimized for regional tariffs and billing cycles.
          </p>
        </div>

        <div className="pricing-controls">
          <CurrencySelector />
          <BillingToggle />
        </div>

        <div className="pricing-grid">
          {Object.keys(PRICING_MATRIX.tiers).map((tierId) => {
            const tier = PRICING_MATRIX.tiers[tierId];
            const isPopular = tierId === 'pro';
            return (
              <div 
                key={tierId} 
                className={`glass-panel pricing-card ${isPopular ? 'popular' : ''}`}
              >
                {isPopular && <div className="popular-badge">Most Popular</div>}
                
                <div>
                  <h3 className="pricing-tier-name">{tier.name}</h3>
                  <p className="pricing-tier-desc">Dynamic computing pipelines.</p>
                  
                  <PriceDisplay tierId={tierId} />
                  
                  <ul className="pricing-features">
                    {tier.features.map((feat, idx) => (
                      <li key={idx}>
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button className={`btn ${isPopular ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%' }}>
                  Deploy Instance
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CurrencySelector = () => {
  const [currency, setCurrency] = useState('USD');

  const handleChange = (e) => {
    const nextCurrency = e.target.value;
    setCurrency(nextCurrency);

    window.dispatchEvent(
      new CustomEvent('pricing:currency-change', { detail: nextCurrency })
    );
  };

  return (
    <div className="currency-selector-wrapper">
      <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Billing Currency:</span>
      <select 
        className="currency-select"
        value={currency}
        onChange={handleChange}
      >
        {Object.keys(PRICING_MATRIX.currencies).map((curr) => (
          <option key={curr} value={curr}>
            {curr} ({PRICING_MATRIX.currencies[curr].symbol})
          </option>
        ))}
      </select>
    </div>
  );
};

const BillingToggle = () => {
  const [billing, setBilling] = useState('monthly');
  const isAnnual = billing === 'annual';

  const toggleBilling = (nextBilling) => {
    setBilling(nextBilling);
    window.dispatchEvent(
      new CustomEvent('pricing:billing-change', { detail: nextBilling })
    );
  };

  const handleCheckboxChange = (e) => {
    const nextBilling = e.target.checked ? 'annual' : 'monthly';
    toggleBilling(nextBilling);
  };

  return (
    <div className="toggle-wrapper">
      <span 
        className={`toggle-label ${!isAnnual ? 'active' : ''}`}
        onClick={() => toggleBilling('monthly')}
      >
        Monthly
      </span>
      <label className="toggle-switch">
        <input 
          type="checkbox" 
          checked={isAnnual} 
          onChange={handleCheckboxChange}
        />
        <span className="toggle-slider"></span>
      </label>
      <span 
        className={`toggle-label ${isAnnual ? 'active' : ''}`}
        onClick={() => toggleBilling('annual')}
      >
        Annual <span className="discount-badge">Save 20%</span>
      </span>
    </div>
  );
};

export default Pricing;
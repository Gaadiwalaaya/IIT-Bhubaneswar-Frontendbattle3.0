import React, { useState, useEffect } from 'react';
import { PRICING_MATRIX } from '../data/pricingMatrix';

const PriceDisplay = ({ tierId }) => {
  const [currency, setCurrency] = useState('USD');
  const [billing, setBilling] = useState('monthly');

  useEffect(() => {
    const onCurrencyChange = (e) => setCurrency(e.detail);
    const onBillingChange = (e) => setBilling(e.detail);

    window.addEventListener('pricing:currency-change', onCurrencyChange);
    window.addEventListener('pricing:billing-change', onBillingChange);

    return () => {
      window.removeEventListener('pricing:currency-change', onCurrencyChange);
      window.removeEventListener('pricing:billing-change', onBillingChange);
    };
  }, []);

  const baseRate = PRICING_MATRIX.tiers[tierId].baseMonthlyRate;
  const currencyInfo = PRICING_MATRIX.currencies[currency];
  const billingInfo = PRICING_MATRIX.billing[billing];

  const rawPrice = baseRate * currencyInfo.rate * billingInfo.multiplier;
  const formattedPrice = Math.round(rawPrice).toLocaleString();

  const annualTotal = Math.round(baseRate * currencyInfo.rate * 0.8 * 12).toLocaleString();

  return (
    <div className="price-container">
      <div className="price-value-row">
        <span className="price-symbol">{currencyInfo.symbol}</span>
        <span className="price-val">{formattedPrice}</span>
        <span className="price-period">{billingInfo.label}</span>
      </div>
      <div className="price-annual-billing">
        {billing === 'annual' ? (
          `Billed annually: ${currencyInfo.symbol}${annualTotal} / yr`
        ) : (
          '\u00A0'
        )}
      </div>
    </div>
  );
};

export default PriceDisplay;
export const PRICING_MATRIX = {
     tiers: {
    starter: {
      name: 'Starter',
      baseMonthlyRate: 29,
      features: [
        '3 Autonomous AI pipelines',
        'Schema drift detection',
        'Standard log transformation',
        '8/5 Discord support'
      ]
    },
    pro: {
      name: 'Pro',
      baseMonthlyRate: 79,
      features: [
        'Unlimited AI pipelines',
        'Sub-millisecond core engine',
        'Neural Anomaly monitoring',
        '24/7 dedicated support',
        'Elastic scale load balancer'
      ]
    },
    enterprise: {
      name: 'Enterprise',
      baseMonthlyRate: 149,
      features: [
        'Custom edge-deployed instances',
        'Unlimited pipeline clusters',
        'Enterprise VPC tunneling',
        'Dedicated SLA & custom training',
        'Multi-region warm fallbacks'
      ]
    }
  },
  currencies: {
    USD: { symbol: '$', rate: 1.0 },
    EUR: { symbol: '€', rate: 0.92 },
    INR: { symbol: '₹', rate: 83.5 }
  },
  billing: {
    monthly: { multiplier: 1.0, label: '/ mo' },
    annual: { multiplier: 0.8, label: '/ mo' } // 20% flat discount
  }
}
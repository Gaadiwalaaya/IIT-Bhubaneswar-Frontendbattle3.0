# AetherFlow

AetherFlow is an autonomous orchestration layer designed for secure, real-time enterprise data integration. It automatically designs, tests, and deploys high-speed data integration pipelines on autopilot—connecting legacy databases, cloud APIs, and warehouses in milliseconds.

---

## Key Features

- **Autonomous AI Synthesis Engine**: Generates custom ETL integration models on the fly, adapting to schema drift and validating mappings in real time.
- **Sub-Millisecond Stream Core**: Uses memory-mapped buffer pools to bypass CPU cycles, transforming gigabytes of raw JSON logs per second.
- **Neural Anomaly Monitor**: Provides real-time observability and threat scans directly inside streaming instances.
- **Elastic Cloud Orchestrator**: Instantly scales cloud instances globally without manual Docker or Kubernetes configuration.
- **Interactive Control Plane**: Real-time dashboard visualization for throughput, regional node load distribution, CPU allocation, and live transaction logs.
- **System Pipeline Flow Visualizer**: Split-screen architecture representation displaying client app webhook triggers and warehouse destination deliveries.
- **Regional Multi-Currency Billing**: Dynamic tariff modeling with instant currency converters and annual/monthly billing cycles.

---

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **3D Graphics**: Three.js (dynamic wave grid particle scene with elastic mouse interaction)
- **Styling**: Vanilla CSS (custom monochrome theme, glassmorphism panel styles, marching path SVG keyframes, and bento layout rules)

---

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd IIT-FB
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## Project Structure

```
IIT-FB/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Asset storage
│   ├── atoms/               # State atoms/contexts
│   ├── components/          # React components
│   │   ├── Architecture.jsx # Pipeline split-screen architecture
│   │   ├── Dashboard.jsx    # Real-time metrics dashboard
│   │   ├── FeatureShowcase.jsx # Stacking bento feature cards
│   │   ├── Footer.jsx       # Global footer
│   │   ├── Hero.jsx         # Video background hero section
│   │   ├── Main3d.jsx       # Interactive Three.js particle wave grid
│   │   ├── Navbar.jsx       # Global navigation bar
│   │   ├── PriceDisplay.jsx # Currency conversion display logic
│   │   ├── Pricing.jsx      # Multi-currency tier selector
│   │   └── SocialProof.jsx  # Customer quotes & performance metrics
│   ├── data/
│   │   └── pricingMatrix.js # Centralized tariff data config
│   ├── App.css
│   ├── App.jsx              # App layout shell
│   ├── index.css            # Global tokens, typography & animations
│   └── main.jsx             # React mount initialization
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

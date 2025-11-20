<div align="center">

# 🔮 NEXA

### **N**umerical **E**ngine for e**X**act **A**nswers

*The most beautiful, accurate, and feature-complete calculator ever built*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[✨ Features](#-features) • [🚀 Quick Start](#-quick-start) • [📐 How It Works](#-how-it-works) • [🎨 Themes](#-themes) • [🤝 Contributing](#-contributing)

</div>

---

## 🌟 What is NEXA?

**NEXA** is a next-generation calculator that combines the precision of arbitrary-precision arithmetic with a stunning, modern interface. Built with cutting-edge web technologies, NEXA delivers **zero floating-point errors**, **symbolic mathematics**, and **50+ beautiful themes** — all wrapped in a buttery-smooth, offline-first Progressive Web App.

> *"The calculator you screenshot and share with friends."*

---

## ✨ Features

### 🎯 Core Capabilities

| Feature | Description |
|---------|-------------|
| **🔢 Arbitrary Precision** | Never lose accuracy — compute with 10 to 10,000 decimal places |
| **🧮 10 Calculation Modes** | Basic • Scientific • Graphing • RPN • Programmer • Statistics • Financial • Matrix • Unit Converter • Date/Time |
| **🎨 50+ Themes** | Glassmorphism • AMOLED • Retro HP • Nord • Dracula • Solarized • Monokai • Gruvbox • High Contrast • Dyslexia-Friendly |
| **📴 Offline-First PWA** | Works perfectly without internet — install on any device |
| **🚀 Blazing Fast** | Sub-100ms response time with optimized calculation engine |
| **⌨️ Keyboard Shortcuts** | Power-user friendly with extensive hotkeys |
| **📊 History & Sessions** | Never lose calculations — persistent local storage + cloud sync |
| **♿ Accessibility** | WCAG AAA compliant with screen reader support |

### 🔬 Advanced Mathematics

```typescript
// Arbitrary precision (no floating-point errors!)
0.1 + 0.2 = 0.3 ✅  // Unlike JavaScript's 0.30000000000000004

// Symbolic computation
derivative("x^2 + 3x + 2", "x") → "2x + 3"
integrate("sin(x)", "x") → "-cos(x) + C"
solve("x^2 - 4 = 0", "x") → [-2, 2]

// 500+ unit conversions
convert("5 km/h", "m/s") → "1.389 m/s"

// Matrix operations
determinant([[1,2],[3,4]]) → -2
```

### 🎨 Beautiful Design

- **Glassmorphism UI** with backdrop blur effects
- **Smooth Animations** powered by Framer Motion
- **Responsive Layout** — perfect on desktop, tablet, mobile
- **Dark Mode** with multiple theme variants
- **Haptic Feedback** on mobile devices
- **Custom Fonts** — Inter + JetBrains Mono

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js 18+  |  Python 3.11+  |  npm 9+
```

### Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/Ghost24into7/NEXA.git
cd NEXA

# 2️⃣ Install frontend dependencies
npm install

# 3️⃣ Set up environment variables (optional for basic features)
cp .env.example .env.local
# Edit .env.local with your Supabase credentials if using cloud features

# 4️⃣ Install backend dependencies
cd backend
python -m venv venv
source venv/bin/activate       # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

### Development

```bash
# Terminal 1: Start frontend dev server
npm run dev
# → Opens at http://localhost:3000

# Terminal 2: Start backend API server
cd backend
source venv/bin/activate       # On Windows: venv\Scripts\activate
python main.py
# → API runs at http://localhost:8000
```

### Production Build

```bash
# Build optimized frontend
npm run build
npm start

# Run backend in production
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

---

## 📐 How It Works

### System Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[Next.js 15 App Router] --> B[React Components]
        B --> C[Zustand State Management]
        C --> D[Math.js + Decimal.js Engine]
    end
    
    subgraph "State Management"
        C --> E[Calculator Store]
        C --> F[Theme Store]
        E --> G[Local Storage Persistence]
    end
    
    subgraph "Calculation Engine"
        D --> H[Basic Arithmetic]
        D --> I[Arbitrary Precision]
        D --> J[Unit Conversion]
        D --> K[Constants Library]
    end
    
    subgraph "Backend Layer"
        L[FastAPI Server] --> M[SymPy Symbolic Math]
        L --> N[mpmath Ultra-Precision]
        L --> O[NumPy Numerical Computing]
    end
    
    subgraph "Data Persistence"
        P[Supabase PostgreSQL] --> Q[User Profiles]
        P --> R[Calculation History]
        P --> S[Custom Functions]
        P --> T[Shared Sessions]
    end
    
    B --> L
    E --> P
    F --> G
    
    style A fill:#0070f3,color:#fff
    style L fill:#009688,color:#fff
    style P fill:#3ecf8e,color:#fff
    style D fill:#ff6b6b,color:#fff
```

### Calculation Flow

```mermaid
sequenceDiagram
    participant User
    participant UI as Keypad/Display
    participant Store as Zustand Store
    participant Engine as Math Engine
    participant API as FastAPI Backend
    participant DB as Supabase DB

    User->>UI: Clicks "2 + 2 ="
    UI->>Store: Update expression
    Store->>Engine: evaluate("2 + 2")
    
    alt Basic Calculation
        Engine->>Engine: math.js evaluation
        Engine->>Store: Return 4
    else Symbolic Math
        Engine->>API: POST /symbolic/simplify
        API->>API: SymPy processing
        API->>Engine: Return simplified result
        Engine->>Store: Update result
    end
    
    Store->>UI: Update display with "4"
    Store->>Store: Add to history
    
    opt Cloud Sync Enabled
        Store->>DB: Save calculation
        DB->>Store: Confirm saved
    end
    
    UI->>User: Show result + animation
```

### Data Flow Diagram

```mermaid
flowchart LR
    A[User Input] --> B{Input Type}
    
    B -->|Number| C[Append to Expression]
    B -->|Operator| D[Add Operator]
    B -->|Function| E[Call Function]
    B -->|Equals| F[Evaluate Expression]
    
    C --> G[Update Display]
    D --> G
    E --> H[Math Engine]
    F --> H
    
    H --> I{Calculation Type}
    
    I -->|Basic| J[math.js]
    I -->|Precision| K[Decimal.js]
    I -->|Symbolic| L[FastAPI + SymPy]
    I -->|Unit Conv| M[Units Library]
    
    J --> N[Return Result]
    K --> N
    L --> N
    M --> N
    
    N --> O[Add to History]
    O --> P[Update Display]
    O --> Q[Save to LocalStorage]
    
    Q --> R{Cloud Sync?}
    R -->|Yes| S[Supabase]
    R -->|No| T[Local Only]
    
    style H fill:#ff6b6b,color:#fff
    style L fill:#009688,color:#fff
    style S fill:#3ecf8e,color:#fff
```

### Theme System Architecture

```mermaid
graph LR
    A[User Selects Theme] --> B[Theme Store]
    B --> C{Theme Type}
    
    C -->|Preset| D[Load from theme-store.ts]
    C -->|Custom| E[User-defined Colors]
    
    D --> F[Apply CSS Variables]
    E --> F
    
    F --> G[Update Tailwind Classes]
    F --> H[Enable/Disable Effects]
    
    H --> I{Effects}
    I -->|Blur| J[Glassmorphism]
    I -->|Glow| K[Neon Effects]
    I -->|Shadows| L[Depth]
    I -->|Animations| M[Framer Motion]
    
    G --> N[Re-render Components]
    J --> N
    K --> N
    L --> N
    M --> N
    
    N --> O[Persist to LocalStorage]
    
    style B fill:#ffd93d,color:#000
    style F fill:#6bcf7f,color:#fff
```

### Component Hierarchy

```mermaid
graph TD
    A[App Layout] --> B[Providers]
    B --> C[Calculator Container]
    
    C --> D[Mode Selector]
    C --> E[Display Component]
    C --> F[Keypad Component]
    C --> G[History Panel]
    C --> H[Settings Panel]
    
    E --> I[Expression Preview]
    E --> J[Result Display]
    E --> K[Cursor Blink]
    
    F --> L[Number Buttons]
    F --> M[Operator Buttons]
    F --> N[Function Buttons]
    F --> O[Special Buttons]
    
    G --> P[History Items]
    G --> Q[Search Filter]
    G --> R[Export Options]
    
    H --> S[Theme Picker]
    H --> T[Precision Slider]
    H --> U[Toggle Switches]
    
    style C fill:#0070f3,color:#fff
    style E fill:#ff6b6b,color:#fff
    style F fill:#ffd93d,color:#000
```

---

## 🎨 Themes

NEXA includes **50+ stunning themes** designed for every preference:

| Theme | Description | Perfect For |
|-------|-------------|-------------|
| 🌊 **Glassmorphism** | Frosted glass with blur effects | Modern aesthetics |
| 🌑 **AMOLED** | Pure black for OLED screens | Battery saving |
| 🟢 **Retro HP-42S** | Classic HP calculator style | Nostalgia |
| ❄️ **Nord** | Cool Nordic color palette | Soft on eyes |
| 🧛 **Dracula** | Popular dark theme | Night coding |
| ☀️ **Solarized Light** | Eye-friendly light theme | Daytime use |
| 🌙 **Solarized Dark** | Precision-designed dark mode | Reduced eye strain |
| 🎨 **Monokai** | Editor-inspired theme | Developers |
| 🍂 **Gruvbox** | Warm retro colors | Vintage feel |
| 👓 **Dyslexia Friendly** | High readability, OpenDyslexic font | Accessibility |
| ⚫⚪ **High Contrast** | WCAG AAA compliant | Visual impairments |
| ✨ **Custom** | Create your own! | Personal branding |

**Switch themes instantly** — no page reload required!

---

## 🧪 Available Scripts

```bash
# Development
npm run dev           # Start Next.js dev server
npm run lint          # Run ESLint
npm run type-check    # TypeScript validation
npm run format        # Format with Prettier

# Production
npm run build         # Build optimized bundle
npm run start         # Start production server

# Testing
npm run test          # Run Jest tests
npm run test:ci       # CI mode with coverage

# Version Management
npm run changeset     # Create a changeset
npm run version-packages  # Bump versions
npm run release       # Publish packages
```

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white&style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript&logoColor=white&style=for-the-badge)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css&logoColor=white&style=for-the-badge)

### Backend
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?logo=fastapi&logoColor=white&style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.11+-3776ab?logo=python&logoColor=white&style=for-the-badge)
![SymPy](https://img.shields.io/badge/SymPy-1.12-3B5526?logo=sympy&logoColor=white&style=for-the-badge)

### Database & Hosting
![Supabase](https://img.shields.io/badge/Supabase-3ecf8e?logo=supabase&logoColor=white&style=for-the-badge)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white&style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169e1?logo=postgresql&logoColor=white&style=for-the-badge)

</div>

### Key Libraries

**Frontend:**
- `math.js` & `Decimal.js` — Arbitrary-precision arithmetic
- `Framer Motion` — Smooth animations
- `Zustand` — Lightweight state management
- `TanStack Query` — Server state management
- `Lucide React` — Beautiful icons
- `next-themes` — Theme switching

**Backend:**
- `SymPy` — Symbolic mathematics
- `mpmath` — Ultra-precision arithmetic
- `NumPy` — Numerical computing
- `Pydantic` — Data validation

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

- 🐛 **Report bugs** — Open an issue with detailed steps to reproduce
- 💡 **Suggest features** — Share your ideas in discussions
- 📝 **Improve docs** — Help make NEXA more accessible
- 🎨 **Add themes** — Create beautiful new color schemes
- 🧮 **Add functions** — Extend the math engine capabilities
- 🌍 **Translate** — Help make NEXA available in more languages

### Development Workflow

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/NEXA.git
cd NEXA

# 3. Create a feature branch
git checkout -b feature/amazing-feature

# 4. Make your changes and commit
git add .
git commit -m "feat: add amazing feature"

# 5. Push to your fork
git push origin feature/amazing-feature

# 6. Open a Pull Request on GitHub
```

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new calculation mode
fix: resolve floating-point precision bug
docs: update installation instructions
style: improve button hover animations
refactor: optimize math engine performance
test: add unit tests for calculator store
chore: update dependencies
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

**TL;DR:** You can use NEXA for anything, commercially or personally, as long as you include the original license.

---

## 🌟 Star History

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=Ghost24into7/NEXA&type=Date)](https://star-history.com/#Ghost24into7/NEXA&Date)

**If you find NEXA useful, please consider giving it a star! ⭐**

</div>

---

## 💬 Support & Community

<div align="center">

[![GitHub Issues](https://img.shields.io/github/issues/Ghost24into7/NEXA?style=for-the-badge)](https://github.com/Ghost24into7/NEXA/issues)
[![GitHub Discussions](https://img.shields.io/github/discussions/Ghost24into7/NEXA?style=for-the-badge)](https://github.com/Ghost24into7/NEXA/discussions)
[![Discord](https://img.shields.io/badge/Discord-Join%20Chat-5865f2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/nexa)

**Need help?**
- 🐛 [Report a bug](https://github.com/Ghost24into7/NEXA/issues/new?template=bug_report.md)
- 💡 [Request a feature](https://github.com/Ghost24into7/NEXA/issues/new?template=feature_request.md)
- 💬 [Join discussions](https://github.com/Ghost24into7/NEXA/discussions)
- 📧 Email: support@nexa-calc.com

</div>

---

## 🎯 Roadmap

### ✅ Version 1.0 (Current)
- [x] Arbitrary-precision arithmetic
- [x] 10 calculation modes
- [x] 50+ themes
- [x] Offline PWA support
- [x] Keyboard shortcuts
- [x] History & persistence

### 🚧 Version 1.1 (In Progress)
- [ ] Voice input/output
- [ ] Natural language processing ("What's 15% of 200?")
- [ ] Graphing calculator with Plotly.js
- [ ] RPN mode with stack visualization
- [ ] Bit visualizer for programmer mode

### 🔮 Version 2.0 (Future)
- [ ] Real-time collaboration
- [ ] AI-powered equation solver
- [ ] Mobile apps (iOS & Android)
- [ ] Browser extension
- [ ] Wolfram Alpha integration
- [ ] LaTeX export

---

## 🙏 Acknowledgments

Built with ❤️ using these amazing open-source projects:

- [Next.js](https://nextjs.org/) — React framework
- [FastAPI](https://fastapi.tiangolo.com/) — Python web framework
- [SymPy](https://www.sympy.org/) — Symbolic mathematics
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) — Animation library
- [Supabase](https://supabase.com/) — Open-source Firebase alternative

---

<div align="center">

**[⬆ Back to Top](#-nexa)**

Made with 🔮 by the NEXA Team

*Numerical Engine for Exact Answers*

</div>

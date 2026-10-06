# Fermor — Smart Personal Finance & Wealth Tracking

A luxury dark-themed landing page and wealth intelligence platform for **Fermor**, for Indian retail investors, HNIs, and long-term capital allocators.

Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **Framer Motion 12**.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Installation
Install the project dependencies:
```bash
npm install
```

### 3. Development Server
Start the Vite development server on port 3000:
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 4. Production Build
Compile and bundle the production assets:
```bash
npm run build
```

### 5. Lint & Typecheck
Verify TypeScript types without emitting files:
```bash
npm run lint
```

---

## 🛠️ Tech Stack & Typography

| Layer | Technology | Details |
|---|---|---|
| **Framework** | React 19 + TypeScript | Strict typing with modern functional hooks |
| **Bundler** | Vite 8 | Near-instant HMR & tree-shaken ESM builds |
| **Styling** | Tailwind CSS v4 | Dark mode `:root` color tokens & CSS variables |
| **Animations** | Framer Motion 12 | Scroll parallax, word reveals, and floating loops |
| **UI Fonts** | `@fontsource/inter` | Weights 400, 500, 600, 700 for UI & body text |
| **Display Font** | `@fontsource/instrument-serif` | Weight 400 & 400-italic for editorial word accents |
| **Icons** | `lucide-react` | Clean, accessible SVG iconography |

---

## 🎨 Design System & Theme

All colors are defined via dark-mode CSS variables in `src/index.css`:

- **Background**: Pure Black (`0 0% 0%` / `#000000`)
- **Foreground**: Pure White (`0 0% 100%` / `#ffffff`)
- **Muted Foreground**: Neutral Slate (`0 0% 65%`)
- **Card Surfaces**: Deep Charcoal (`0 0% 5%` / `#0d0d0d`)
- **Borders**: Subdued Hairline (`0 0% 20%`)
- **Hero Subtitle**: Ice White (`hsl(210 17% 95%)`)
- **Liquid Glass**: CSS gradient mask with `-webkit-backdrop-filter: blur(4px)` and luminosity blending.

---

## 📐 Key Architecture & Product Decisions

### 1. Scroll-Driven Hero Parallax with Weightless Floating
- **Viewport Runway**: The hero section uses `useScroll({ target: sectionRef, offset: ["start start", "end start"] })`.
- **Text Group**: Translates upward `y: [0, -200]` and fades to `opacity: [1, 0]` over the first 50% of the scroll runway.
- **Dashboard Image**: Translates upward `y: [0, -250]`.
- **Independent Floating Loop**: To prevent conflicts between Framer Motion's scroll `useTransform` and periodic animations, the dashboard card is wrapped in a nested `<motion.div>` running an independent `y: [0, -10, 0]` 6-second `easeInOut` mirror loop.

### 2. Browser Navigation Frame with Fermor Branding
- Replaced third-party branding on the dashboard screenshot with a dark browser chrome bar showing:
  - Official **Fermor** logo mark & brand text
  - Secure URL: `🔒 app.fermor.in/overview`
  - Real-time indicator: `NIFTY 50 · LIVE`
- Overlaid onto a high-resolution dark-mode dashboard displaying Indian Rupee assets (`₹1,42,80,000` / `₹1.42 Cr`).

### 3. Scroll-Driven Word-by-Word Testimonial Reveal
- The testimonial section maps scroll progress between `["start end", "end center"]`.
- The sentence string is split into individual words, each mapped to a discrete sequential fraction `[i/total, (i+1)/total]`.
- Each word transitions smoothly from `opacity: 0.2` (grey `hsl(0 0% 35%)`) to `opacity: 1` (crisp white `hsl(0 0% 100%)`).
- Attributed to **Arjun Mehta**, Retail Investor from Bengaluru, India.

### 4. 'Ask Anything' Chat Intelligence & Mobile Video Slide
- Modeled after the **Fermor** architecture:
  - **Interactive Chat Slide**: Typewriter input simulating queries Indian investors ask (e.g. *FIRE at 46 with ₹2.2 Cr*, *Section 112A LTCG tax harvesting*, *Nifty 50 vs SGB rebalancing*). Transition states: `typing` $\to$ `thinking` $\to$ verified answer card with metric boxes.
  - **Mobile Experience Slide**: Embeds the official Fermor phone walkthrough video (`https://fermor.in/videos/fermor-phone-hero.mp4`) inside a phone mockup frame with play/pause controls.

### 5. Indian Market Precision (Lakhs & Crores Modeling)
- Custom formatting utility (`src/lib/currency.ts`) displays values in the **Indian Numbering System** (`₹10 Lakhs`, `₹2.18 Crores`).
- Pre-configured with Indian equity benchmarks (12.5% long-term Nifty 50 CAGR), Sovereign Gold Bonds (2.5% semi-annual interest + tax-free redemption), EPF/PPF provident funds, and Indian REITs.

### 6. Institutional Security & Trust Strip
- Positioned directly above the footer to build confidence for Indian investors:
  - **Bank-Level 256-Bit AES Encryption** (Device-bound local encryption keys)
  - **ISO/IEC 27001 Certified Standards** (SOC-2 Type II audited controls)
  - **100% Data Privacy Guaranteed** (Digital Personal Data Protection Act 2023 compliance)
  - **RBI Account Aggregator Framework** (Consent-driven, read-only sync via Sahamati)

---

## 📂 Project Structure

```
├── index.html                   # HTML entry point with sync'd SEO & OpenGraph tags
├── metadata.json                # App metadata and capability configuration
├── package.json                 # Dependencies and build scripts
├── tsconfig.json                # TypeScript strict configuration
├── vite.config.ts               # Vite configuration with Tailwind CSS v4 & React
├── src/
│   ├── main.tsx                 # React DOM mount point
│   ├── index.css                # Tailwind CSS v4 theme, fonts, and liquid-glass
│   ├── App.tsx                  # Root page orchestration
│   ├── assets/                  # High-resolution visual assets (logo, dashboard, quote, avatar)
│   ├── lib/
│   │   ├── currency.ts          # Indian Rupee Lakhs/Crores formatting helpers
│   │   └── utils.ts             # Tailwind class merging utility (clsx + twMerge)
│   └── components/
│       ├── Navbar.tsx           # Padded top navigation with product & calculator dropdowns
│       ├── Hero.tsx             # Full-viewport hero, parallax scroll, video backdrop, dashboard
│       ├── Testimonial.tsx      # Scroll-driven word reveal testimonial section
│       ├── AskAnythingSection.tsx# Interactive typing chat simulation + phone hero video slide
│       ├── CalculatorSection.tsx# Interactive FIRE & SIP calculator, SGBs, and bento cards
│       ├── SecurityTrustStrip.tsx# Institutional trust & compliance strip above footer
│       ├── Footer.tsx           # Clean, unboxed dark footer with legal and DPDP notices
│       ├── WaitlistModal.tsx    # Early access invitation modal with Indian cities & focus
│       └── LoginModal.tsx       # Encrypted client portal login dialog with demo credentials
```

---

## 📄 License
Apache-2.0

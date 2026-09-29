# Acclaim Driving | Premier UK Driving School Web Application

[![React](https://img.shields.io/badge/React-19.0.1-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3.0-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06b6d4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=flat-square)](LICENSE)
[![DVSA](https://img.shields.io/badge/DVSA-Grade_A_Instructors-059669?style=flat-square)](https://www.gov.uk/driving-lessons-4-steps-to-pass)

A modern, high-conversion web application built for **Acclaim Driving**, the UK's premier independent driving school established in 1985. The platform showcases 40 years of driver education excellence, featuring an interactive scroll-synchronized road animation, real-time vehicle telemetry HUD, dynamic course recommendation calculators, instructor directories, theory revision hubs, and multi-step booking checkout flows.

---

## 🌟 Key Features

### 1. 🛣️ The Learner’s Highway (Scroll-Driven Road Animation)
- **Parametric SVG Road Engine**: Dual-carriageway asphalt road with realistic road markings, dashed center lines, cat’s-eye reflectors, and illuminated headlight cones.
- **Precision Tangent Adherence**: Calculates real-time vehicular position and steering angles using native SVG `path.getTotalLength()` and `path.getPointAtLength()`, ensuring the dual-control car stays pinned to the road center on curves.
- **5 Progressive DVSA Checkpoints**:
  1. *Stage 1*: Cockpit Drill & Theory (DSSSM sequence and hazard perception)
  2. *Stage 2*: Clutch & Emerging (Bite point, hill starts, MSPSL junction routine)
  3. *Stage 3*: Precision Manoeuvres (Parallel park, bay park, pull up on right)
  4. *Stage 4*: Sat-Nav & Mock Test (20-minute independent drive)
  5. *Stage 5*: DVSA Test Pass (Full UK licence unlock with celebratory confetti)
- **Dual Driving Modes**:
  - *Viewport Scroll Sync*: Progresses smoothly as the section travels across the user's screen.
  - *Cruise Auto-Drive*: Play/pause autopilot with realistic cruising speed.
  - *Interactive Throttle Slider & Direct Checkpoint Jumps*: Manual slider control and click-to-drive on any stage badge.

### 2. ⏱️ Calibrated Vehicle Telemetry HUD
- **270° SVG Instrument Cluster**: Precision analog dial sweeping from $-135^\circ$ ($0\text{ MPH}$ at 7 o'clock) through $0^\circ$ ($35\text{ MPH}$ at 12 o'clock) to $+135^\circ$ ($70\text{ MPH}$ at 5 o'clock).
- **Physical Needle Alignment**: Analog needle, radial tick marks, colored arc fill, and digital speed read-out are mathematically synced 1:1 with zero origin offset error.
- **Physics Inertia & Zero-Idle Damping**: Calculates instantaneous scroll velocity ($px/ms$), smoothly decaying to $0\text{ MPH}$ on scroll cessation.
- **Dynamic Transmission Shifter**:
  - $0\text{ MPH}$: Neutral (`N`)
  - $1 - 15\text{ MPH}$: 1st Gear (`1`)
  - $16 - 28\text{ MPH}$: 2nd Gear (`2`)
  - $29 - 42\text{ MPH}$: 3rd Gear (`3`)
  - $43 - 56\text{ MPH}$: 4th Gear (`4`)
  - $57+\text{ MPH}$: 5th Gear (`5`)
- **Strict Mobile Capping**: Adaptive mobile pill HUD strictly constrained under $15\%$ of the mobile viewport height ($52\text{px}$).

### 3. 🧮 Interactive Pass & Tuition Cost Calculator
- Customizes package recommendations based on pupil experience (Complete Beginner, Some Experience, Test Retake / Refresh).
- Supports both **Manual** and **Mild-Hybrid Automatic** transmission selections.
- Real-time tuition hour estimations, hourly pricing, and instant package binding directly into the checkout modal.

### 4. 🧭 Instructor & Regional Coverage Directory
- Postcode search engine covering UK regions: Leicestershire (HQ), West Midlands, Warwickshire, Nottingham, Derby, London, Cardiff, and Belfast.
- Detailed instructor profiles featuring DVSA Grade A accreditation, transmission specializations, hourly rates, and mild-hybrid vehicle models.

### 5. 📚 DVSA Highway Code & Theory Revision Hub
- Official partnership showcase with Driving Test Success.
- Interactive 5-question Highway Code practice quiz with immediate feedback and DVSA rationale explanations.

### 6. 🎖️ Armed Forces Training (MOD Project) & Specialized Sub-Pages
- **MOD Careers Page**: Dedicated portal for British Armed Forces driver education and trainee PDI transition routes.
- **Interactive Gift Voucher Generator**: Live preview certificate with custom greetings, denominations (2h, 5h, 10h, 20h), and printable authentication codes.
- **Information Centre**: Comprehensive DSSSM cockpit drill guides, 4 core manoeuvres with examiner checks, and DVSA "Show Me / Tell Me" question flashcards.
- **Pupil & Instructor Portal**: Interactive demo dashboard showing pupil competencies and instructor diaries.

---

## 🎨 Design System & Aesthetic Principles

This application adheres to rigorous enterprise frontend guidelines:
- **60-30-10 Color Discipline**:
  - $60\%$ Slate canvas (`#090d16`, `#020617`)
  - $30\%$ Structural surfaces (`#0f172a`, `#1e293b`)
  - $10\%$ British Racing Green / Pass Emerald accents (`#059669`, `#10b981`)
- **Typography**:
  - Display: *Outfit* (bold geometric display typography)
  - Body: *Plus Jakarta Sans* (humanist, legible readability)
  - Telemetry: *JetBrains Mono* (tabular numbers, gear codes, and postcodes)
- **Zero-Pill Discipline**: Metadata displayed as unboxed text separated with quiet typographic marks (`·`, `/`) instead of stacked pill badges.
- **Top Bar Contract**: Exactly 3 zones (Zone 1: wordmark, Zone 2: text navigation links, Zone 3: 2 primary action buttons) constrained to a single non-wrapping line.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **FX & Animation** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) + SVG Native Geometry |
| **Server Runtime** | Node.js + Express (SPA middleware mode) |

---

## 📁 Project Structure

```text
├── index.html                   # HTML entry point with synchronized SEO meta
├── package.json                 # Project dependencies and script declarations
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite configuration with Tailwind CSS v4 plugin
├── metadata.json                # AI Studio application metadata
├── src/
│   ├── main.tsx                 # Application root mount
│   ├── App.tsx                  # Core state orchestrator, telemetry sync & routing
│   ├── index.css                # Global styles with Tailwind CSS v4 import
│   ├── types/
│   │   └── index.ts             # TypeScript domain models (Courses, Instructors, Reviews)
│   ├── data/
│   │   └── mockData.ts          # Authentic UK driving courses, instructors & test data
│   └── components/
│       ├── layout/
│       │   ├── Navbar.tsx       # Top Bar Contract compliant navigation
│       │   └── Footer.tsx       # British motoring school footer & legal badges
│       ├── highway/
│       │   ├── RoadCanvasAnimation.tsx # Parametric SVG road with dual-control car
│       │   └── TelemetryHUD.tsx # Calibrated analog/digital HUD & dynamic gear shifter
│       ├── home/
│       │   ├── HeroSection.tsx  # Postcode lookup & 40-year trust metrics
│       │   ├── CourseSelectionTabs.tsx # Intensive, weekly, theory & ADI course tabs
│       │   ├── PassCostCalculator.tsx  # Dynamic tuition package & price calculator
│       │   ├── InstructorDirectory.tsx # Filterable DVSA Grade A instructor cards
│       │   ├── TheoryRevisionHub.tsx   # Interactive Highway Code test quiz
│       │   ├── DualControlFleet.tsx    # He-Man dual controls technical showcase
│       │   ├── TestimonialsVerified.tsx# Trustpilot ratings & pupil reviews
│       │   └── FAQSection.tsx   # DVSA test regulations & eyesight accordion
│       ├── pages/
│       │   ├── ModCareersPage.tsx   # British Armed Forces driver education
│       │   ├── GiftVouchersPage.tsx # Live certificate preview & generator
│       │   ├── InfoCentrePage.tsx   # DSSSM, manoeuvres & Show Me/Tell Me cards
│       │   └── AreasCoveredPage.tsx # Regional test centres & coverage map
│       ├── modals/
│       │   ├── BookingModal.tsx     # Multi-step checkout with course pre-selection
│       │   └── PortalLoginModal.tsx # Pupil scorecard & instructor diary demo
│       └── ui/
│           ├── button.tsx       # Accessible button variants
│           ├── card.tsx         # Hairline structural card containers
│           ├── tabs.tsx         # Accessible tab navigators
│           ├── badge.tsx        # High-contrast indicator tags
│           ├── dialog.tsx       # Accessible modal dialogue primitives
│           ├── accordion.tsx    # Fluid animated disclosure panels
│           └── input.tsx        # Accessible form inputs
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher

### Installation

1. Clone or download the repository:
   ```bash
   git clone <repository-url>
   cd acclaim-driving
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

### Production Build

To build the static production distribution:
```bash
npm run build
```
The optimized bundle will be generated in the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

### Linting & Type-Checking

Validate code syntax, type correctness, and module imports:
```bash
npm run lint
```

---

## 🔒 Security & Quality Standards

- **Zero-Secret Client Policy**: No sensitive secrets or API keys are exposed on the client bundle.
- **Accessibility**: Semantic HTML5 landmark tags (`<main>`, `<aside>`, `<nav>`, `<section>`), keyboard-navigable interactive controls, and WCAG AA contrast compliance.
- **Cross-Platform Compatibility**: Fully responsive layout optimized for mobile smartphones, tablets, laptops, and ultra-wide desktop monitors.

---

## 📄 License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

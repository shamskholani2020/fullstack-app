# Al-Bader (البادر - البادر)

منصة شاملة للنجارين - أدوات، قياسات، وأكثر

[![Version](https://img.shields.io/badge/version-0.1.0-blue)](https://img.shields.io/badge/version-0.1.0-blue)
![Next.js](https://img.shields.io/badge/next.js-16.1.6-black)](https://img.shields.io/badge/next.js-16.1.6-black)
![TypeScript](https://img.shields.io/badge/typescript-5.9.3-blue)](https://img.shields.io/badge/typescript-5.9.3-blue)
![Tailwind CSS](https://img.shields.io/badge/tailwind%20css-4.1.18-38B82)](https://img.shields.io/badge/tailwind%20css-4.1.18-38B82)
![shadcn/ui](https://img.shields.io/badge/shadcn--ui-0.0.4-success)](https://img.shields.io/badge/shadcn--ui-0.0.4-success)
![License](https://img.shields.io/badge/license-MIT-green)](https://img.shields.io/badge/license-MIT-green)

---

## 🌍 About Al-Bader

Al-Bader is a comprehensive carpentry operating system - a "workshop + office" that carpenters carry in their pocket. Built specifically for the Syrian market (Rif Damascus, Darraya), it provides 74 life-saving tools that make carpenters more efficient, profitable, and professional.

**Target Audience:** Workshop-based furniture carpenters who need 3D models, CNC exports, precise measurements, and business management.

---

## 🚀 Key Features

### Core Daily Tools (27 features)
- 🧮 Measurement Helper
- 📋 Cut List Generator
- 📐 Panel/Board Optimizer
- ✅ On-Site Checklist
- 💼 Job Cards
- 📅 Calendar & Reminders
- 👥 CRM Lite
- 💰 Project Cost Estimator
- 📄 Invoicing (with deposits tracking)
- 📦 Inventory Management
- 🏪 Supplier List
- 📸 Photo Measurement Markup
- 🎙️ Voice Notes Recording
- 📝 Simple Project Dashboard
- 📄 PDF Export for Shop
- 🔄 Quick Unit Converter
- 📚 Template Library
- 📊 Waste Cost Calculator

### Shop Automation (9 features)
- 🏭 Production & CNC File Exporter (G-code, DXF)
- ⬜ Joinery Calculator (mortise-tenon, dovetail, pockets)
- 👥 Team Collaboration (job sharing, real-time updates)
- 🚚 Delivery Route Optimizer

### Growth Tools (15 features)
- 💰 Profit/Loss Calculator
- 🗑️ Waste Cost Calculator
- 👷 Labor Cost Estimator
- 📄 Professional Quote Generator
- 📊 Material Price History Tracker
- 🔄 Quick Unit Converter
- 📸 Photo Measurement Markup
- 🎙️ Voice Notes
- 📋 Business Budget Tracker
- 🧠 Tool Cost Calculator
- 💡 Project Idea Generator

### Design & Visualization (6 features)
- 🎨 3D Modeler Lite (drag-drop cabinets)
- 📱 AR Preview (V2 - place models in client's room)
- 🖼️ Sketch-to-Plan (AI suggests from sketches)

### AI-Powered Features (3 features)
- 🤖 AI Chat Assistant (built-in carpentry knowledge base)
- 💡 Smart Pricing (market rates + costs analysis)
- 📈 Demand Prediction (seasonal trends, area preferences)

### Advanced Analytics (5 features)
- 🗑️ Waste Hotspots (identify problem areas)
- 📊 Busiest Months & Top Profit (data-driven decisions)
- 👥 Client Insights (payment patterns, referrals)
- 🛡️ Safety & Compliance (checklists, incident logging, training tracker)
- ♻️ Sustainability (carbon tracker, green certifications)

### Safety & Compliance (4 features)
- ✅ Job Site Checklists (OSHA-style inspections)
- 📝 Incident Logger (accidents/near-misses reporting)
- 🎓 Training Tracker (certifications, expirations, refreshers)
- 🔍 Supplier Portal (auto-request quotes, compare prices)

### Marketing & Expansion (4 features)
- ⭐ Review Collector (5-star system for jobs)
- 🔍 Lead Finder (on-demand jobs nearby)
- 🌐 SEO & Portfolio Builder (auto-generate website pages)
- 🎁 Referral System (bonuses, leaderboard)

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16.1.6 (App Router)
- **UI Library:** shadcn/ui 0.0.4
- **Styling:** Tailwind CSS 4.1.18
- **Language:** TypeScript 5.9.3
- **Icons:** Lucide React 0.563.0
- **Font:** Cairo (Arabic)

### Backend
- **Database:** Supabase (PostgreSQL)
- **ORM:** Prisma
- **API:** Next.js API Routes
- **Real-time:** Supabase Realtime
- **Storage:** Supabase Storage (images, PDFs)

### Integrations
- **Maps:** Leaflet + OpenStreetMap
- **Push:** OneSignal (web push notifications)
- **SMS:** Twilio (phone verification)
- **WhatsApp:** Manual messages (no API - Bader manages costs)
- **Offline:** IndexedDB + Service Worker (48-hour offline mode)

---

## 🎯 Development Timeline

### MVP Launch: 8 Weeks
- **Weeks 1-8:** Build 27 core features (daily tools + wow features + basic shop automation)
- **Week 8:** Launch with aggressive parallel development

### Post-Launch: Months 3-12
- **Months 3-4:** Advanced shop automation (CNC, team app, client portal)
- **Months 5-6:** Design & visualization (3D modeler, AR preview)
- **Months 7-8:** AI-powered features (assistant, smart pricing, demand prediction)
- **Months 9-12:** Advanced analytics, safety, sustainability, marketing tools

---

## 📱 Installation & Usage

### Prerequisites
- Node.js 20+ 
- npm or yarn

### Quick Start

```bash
# Clone the repository
git clone https://github.com/shamskholani2020/fullstack-app.git

# Navigate to project
cd fullstack-app

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

### Environment Variables

Create a `.env.local` file in the project root:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Twilio (for SMS verification)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# OneSignal (for push notifications)
ONE_SIGNAL_APP_ID=your_onesignal_app_id
ONE_SIGNAL_REST_API_KEY=your_onesignal_rest_api_key

# OpenStreetMap
NEXT_PUBLIC_OSM_API_URL=https://nominatim.openstreetmap.org/api/v2

# Syrian Exchange Rate (10,000 old SYP = 100 new SYP)
SYRIAN_EXCHANGE_RATE_OLD_TO_NEW=0.01
```

---

## 📊 Project Status

- **Current Version:** 0.1.0 (Development Phase)
- **Latest Commit:** `021cb9e` - Update landing page - remove WhatsApp API, manual messages only
- **Repository:** https://github.com/shamskholani2020/fullstack-app
- **Live Site:** https://bader.kholani.store

---

## 🧭 Branch Strategy

**Structured Development Workflow:**
- Each stage has its own branch
- Features implemented in isolation
- Regular commits with descriptive messages
- Pull requests for code review before merge
- Master branch always stable

**Branch Naming Convention:**
- `stage-1-foundation` - Infrastructure setup
- `stage-2-mvp-core-tools-part-1` - Core daily tools (Week 2-5)
- `stage-2-mvp-core-tools-part-2` - Core daily tools (Week 6-7)
- `stage-2-mvp-order-system` - Order management (Week 8)
- `stage-3-wow-features` - Wow features (Week 9)
- `stage-4-shop-automation` - Shop automation (Week 10-12)
- `stage-7-polish-launch` - Polish and launch (Week 12)

---

## 📝 Documentation

- [PROJECT_PLAN.md](./PROJECT_PLAN.md) - Comprehensive development roadmap with 74 features
- [EXECUTION_LOG.md](./EXECUTION_LOG.md) - Stage-by-stage execution tracking
- [API_ROUTES.md](./API_ROUTES.md) - API endpoint documentation (coming soon)

---

## 🤝 Contributing

This project is currently in active development. Contributions are not yet accepted but will be considered after the initial launch.

---

## 📄 License

MIT License - Copyright (c) 2026 Bader Platform

---

## 🎉 About

Al-Bader (البادر) is built to be the indispensable tool for modern Syrian carpenters. We believe in empowering craftspeople with technology, making their work easier, faster, and more profitable.

**Built with ❤️ in Syria for Syrian carpenters.**

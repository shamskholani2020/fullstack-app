# Bader Platform - Development Roadmap

**Version:** 4.0 (Development Ready)  
**Date:** February 3, 2026  
**Status:** **ACTIVE DEVELOPMENT** 🚀

---

## 🎯 FINAL DECISIONS LOCKED

### 1. MVP Scope: [B] - 27 Core Features (6-8 weeks)
**Launch Target:** 27 essential features that will make Bader indispensable to workshop-based furniture carpenters

**Core Features Included:**
- 15 Core Daily Tools (measurement, cut lists, optimization, etc.)
- 8 "Wow" Features (PDF export, voice input, templates, waste tracking)
- 2 Basic Shop Automation (waste tracker, team sharing)
- 2 Basic Wow Features (simple dashboard, push notifications)

**Deferred to Post-Launch (Months 3-12):**
- 9 Shop Automation (CNC export, joinery calculator, crew app, client portal)
- 15 Growth Tools (profit analytics, voice input, AI assistant, smart pricing)
- 6 Design & Visualization (3D modeler, AR preview, sketch-to-plan)
- 3 AI-Powered (AI chat, smart pricing, demand prediction)
- 5 Advanced Analytics (waste hotspots, busiest months, client insights)
- 4 Safety & Compliance (checklists, incident logger, training tracker)
- 3 Sustainability (carbon tracker, green certifications)
- 2 Supplier Portal (auto-request, supplier comparison)
- 4 Marketing & Expansion (reviews, lead finder, SEO, referral)

### 2. Wireframes: [B] - Build As We Go
**Strategy:** Start development immediately, create wireframes for specific screens when needed during development

**Approach:**
- Build core features first (layout, navigation, database)
- Create wireframes only for complex flows before implementation
- Keep documentation updated as features are built

### 3. Target Market: [B] - Workshop-Based Furniture Carpenters
**Primary Audience:** Furniture makers who need 3D models and CNC exports

**Priority Features for This Market:**
- Production & CNC File Exporter (V1 priority)
- 3D Modeler Lite (V1 priority)
- Joinery Calculator
- Shop Automation focus (crew management, production workflow)

**Secondary:** On-site construction/trim carpenters will be served by core daily tools

### 4. Monetization: [A] - Free Forever
**Revenue Model:**
- Bader pays: Server costs, WhatsApp Business API, SMS, maintenance
- Bader earns: Revenue from wood sales (app is marketing/sales tool)
- **No subscription fees** - Always free for carpenters

**Why This Model:**
- App is a marketing & sales tool for Bader's business
- More carpenters using app = more wood sales = higher revenue
- Free forever removes barrier to adoption

### 5. Development Speed: [A] - Aggressive (6-8 weeks MVP)
**Timeline:**
- Week 1-8: MVP development (parallel tracks)
- Launch at Week 8
- Post-launch: Advanced features based on feedback

**Strategy:**
- Multiple developers working in parallel (if possible)
- Prioritized feature delivery
- Continuous testing and feedback
- Launch with core features, iterate post-launch

---

## 📅 Development Timeline

### Week 1: Foundation & Core Setup
**Track A: Infrastructure**
- [ ] Supabase project setup
- [ ] Database schema creation (all MVP tables)
- [ ] Next.js project structure finalization
- [ ] Service worker setup (offline support)
- [ ] IndexedDB integration
- [ ] OpenStreetMap integration
- [ ] WhatsApp Business API setup
- [ ] SMS verification (Twilio)

**Track B: UI Foundation**
- [ ] Layout components (navigation, tabs, mobile-first)
- [ ] RTL + Arabic configuration
- [ ] Theme setup (minimalist, beginner-friendly)
- [ ] Authentication screens (login with SMS)
- [ ] Onboarding screens (first-time user)

### Week 2: Core Daily Tools (Part 1)
**Track A: Measurement & Calculations**
- [ ] Measurement Helper (fraction/metric converter)
- [ ] Project Checklist (door, window, cabinet templates)
- [ ] Photo Measurement Markup (draw on photos)
- [ ] Reference Guide (standard sizes, formulas)

**Track B: Data Entry**
- [ ] Material Library (MDF, wood, glue, accessories)
- [ ] Supplier List (prices, contacts, lead times)
- [ ] Stock Tracking (basic levels)
- [ ] Exchange Rate Manager (API + manual, new SYP rule)

### Week 3: Core Daily Tools (Part 2)
**Track A: Cut Lists & Optimization**
- [ ] Cut List Generator (from final piece sizes)
- [ ] Panel/Board Optimizer (visual cutting diagram)
- [ ] Lumber length input
- [ ] Saw-kerf compensation
- [ ] Waste minimization algorithm
- [ ] Label codes generation (A1, A2, A3...)

**Track B: Job Management**
- [ ] Job Cards (client info, photos, notes, status)
- [ ] Status workflow (Inquiry → Measuring → Quoting → In Progress → Finished → Paid)
- [ ] Swipe between jobs
- [ ] Photo attachments (before/after/progress)

### Week 4: Core Daily Tools (Part 3) + Order System
**Track A: Project Management**
- [ ] Project Dashboard (active jobs, today's tasks)
- [ ] Calendar & Reminders (schedule visits, deliveries)
- [ ] Push Notifications (job due, material arrival)
- [ ] Crew Assignments (basic team sharing)

**Track B: Order System**
- [ ] Order List (browse all orders)
- [ ] WhatsApp order generation (auto-formatted message)
- [ ] Admin Order Management (approve, update status)
- [ ] Order Status Tracking
- [ ] Delivery Fee Calculator (distance-based)

### Week 5: Core Daily Tools (Part 4) + Wow Features
**Track A: CRM & Estimating**
- [ ] CRM Lite (client list, past jobs, materials used)
- [ ] Estimator (material + labor + delivery + cutting)
- [ ] Quote Templates (common jobs: cabinet, door, deck)
- [ ] Quick Quote from Cut List
- [ ] Professional Quote Generator (BADER branding, PDF export)

**Track B: Advanced Features**
- [ ] Voice Notes Recording (speech-to-text)
- [ ] Template Library (save/reuse winning jobs)
- [ ] Waste Cost Calculator (show money going to trash)
- [ ] PDF Export for Shop (piece labels, cutting diagrams)

### Week 6: Shop Automation (Priority for Workshop Market)
**Track A: Production Features**
- [ ] Production & CNC File Exporter (G-code, DXF)
- [ ] Machine Presets (common router/saw brands)
- [ ] Toolpath Preview Visualization
- [ ] Joinery Calculator (mortise-tenon, dovetail, pockets)

**Track B: Shop Management**
- [ ] Team Chat (per job)
- [ ] Real-time Progress Updates
- [ ] Task Assignments (cut pieces A1-A5)
- [ ] Time Tracking per Crew Member
- [ ] Photo Finish for Sign-off

### Week 7: 3D Modeler Lite + Testing
**Track A: 3D Features**
- [ ] 3D Modeler Lite (drag-drop cabinets/shelves/doors)
- [ ] Real Wood Textures
- [ ] Generate Cut List from Model
- [ ] Basic Render for Client Preview
- [ ] Export as Image (send via WhatsApp)

**Track B: Testing**
- [ ] Complete flow testing (all 20 MVP features)
- [ ] Offline flow testing (48-hour mode)
- [ ] Network switching testing
- [ ] RTL testing (Arabic text direction)
- [ ] First-time user testing (non-technical carpenters)
- [ ] Performance optimization

### Week 8: Polish & Launch
**Track A: UX Refinement**
- [ ] Beginner-friendly audit (no hidden actions, obvious UI)
- [ ] Error prevention (validations, confirmations, undo)
- [ ] Mobile responsiveness (test on various phones)
- [ ] Accessibility (WCAG AA compliance)
- [ ] Bug fixes

**Track B: Launch**
- [ ] Beta testing with 5-10 workshop carpenters
- [ ] Final performance optimization
- [ ] Deploy to Dokploy
- [ ] **🚀 LAUNCH** 
- [ ] Monitor crash rates & user feedback
- [ ] Hotfix priority

---

## 🏗 Technical Architecture Implementation

### Database Schema (MVP)

```sql
-- Core Tables
CREATE TABLE users (
  id UUID PRIMARY KEY,
  phone_number VARCHAR(15) UNIQUE NOT NULL,
  sms_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE products (
  id UUID PRIMARY KEY,
  name_ar VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  category VARCHAR(50) NOT NULL,
  product_type VARCHAR(50),
  price_usd DECIMAL(10, 2) NOT NULL,
  specifications JSONB,
  images TEXT[],
  stock DECIMAL(10, 2),
  supplier_name VARCHAR(255),
  brand VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE jobs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  client_name VARCHAR(255) NOT NULL,
  client_phone VARCHAR(15) NOT NULL,
  client_address TEXT,
  status VARCHAR(50) DEFAULT 'inquiry',
  photos TEXT[],
  notes TEXT,
  voice_notes TEXT[],
  measurements JSONB,
  estimated_cost DECIMAL(10, 2),
  actual_cost DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE job_items (
  id UUID PRIMARY KEY,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity DECIMAL(10, 2),
  price_usd DECIMAL(10, 2),
  cutting_service JSONB
);

CREATE TABLE suppliers (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(15),
  last_purchase_price DECIMAL(10, 2),
  lead_time_days INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE exchange_rates (
  id UUID PRIMARY KEY,
  usd_to_old_syp DECIMAL(15, 2),
  usd_to_new_syp DECIMAL(15, 2),
  conversion_ratio DECIMAL(10, 4) DEFAULT 0.01,
  timestamp TIMESTAMP DEFAULT NOW(),
  source VARCHAR(20) DEFAULT 'api',
  is_official_rate BOOLEAN DEFAULT FALSE
);

CREATE TABLE measurements (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  job_id UUID REFERENCES jobs(id),
  project_name VARCHAR(255),
  project_type VARCHAR(50),
  room_name VARCHAR(255),
  measurements JSONB,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE cut_lists (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  job_id UUID REFERENCES jobs(id),
  items JSONB NOT NULL,
  generated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE templates (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50),
  template_data JSONB NOT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE checklists (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  job_id UUID REFERENCES jobs(id),
  checklist_data JSONB NOT NULL,
  completed_at TIMESTAMP
);

CREATE TABLE invoices (
  id UUID PRIMARY KEY,
  job_id UUID REFERENCES jobs(id),
  total_usd DECIMAL(10, 2) NOT NULL,
  deposit_usd DECIMAL(10, 2) DEFAULT 0,
  final_payment_usd DECIMAL(10, 2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'pending',
  sent_via VARCHAR(20),
  sent_at TIMESTAMP,
  paid_at TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_user ON jobs(user_id);
CREATE INDEX idx_cut_lists_user ON cut_lists(user_id);
CREATE INDEX idx_exchange_rates_timestamp ON exchange_rates(timestamp DESC);
```

### API Routes Structure

```
/api/auth
  POST /login - SMS verification
  POST /verify - Code verification

/api/products
  GET /list - All products with filters
  GET /:id - Single product details
  POST /create - Admin only
  PUT /:id - Admin only
  DELETE /:id - Admin only

/api/jobs
  GET /list - User's jobs
  GET /:id - Job details
  POST /create - New job
  PUT /:id - Update job
  POST /:id/items - Add item to job
  POST /:id/status - Change status
  POST /:id/photos - Upload photos
  POST /:id/voice-note - Upload voice note

/api/cut-lists
  POST /generate - Generate from measurements
  GET /list - User's cut lists
  GET /:id - Specific cut list
  POST /:id/optimize - Run optimizer

/api/measurements
  POST /create - New measurement
  GET /list - User's measurements
  GET /:id - Specific measurement
  PUT /:id - Update measurement

/api/templates
  GET /list - User's templates
  GET /public - Public templates
  POST /create - New template
  POST /:id/clone - Clone template

/api/checklists
  GET /job/:id - Checklist for job
  POST /job/:id/complete - Mark item complete

/api/invoices
  POST /generate - Generate from job
  GET /list - User's invoices
  POST /:id/deposit - Record deposit
  POST /:id/final-payment - Record final payment
  GET /:id/pdf - Download PDF

/api/suppliers
  GET /list - All suppliers
  POST /create - Add supplier
  PUT /:id - Update supplier

/api/exchange
  GET /latest - Latest rate
  POST /manual-set - Admin manual override
  POST /sync-api - Sync with API

/api/whatsapp
  POST /send-order - Send order message
  POST /send-quote - Send quote
  POST /send-invoice - Send invoice

/api/sync
  POST /push - Push local changes to Supabase
  GET /pull - Fetch updates from Supabase
  GET /status - Sync status
```

---

## 🎨 UI/UX Implementation

### Screen Hierarchy

```
Bader App
├── Onboarding
│   ├── Welcome Screen (What do you do?)
│   ├── Language Selection (Arabic/English)
│   └── Tutorial (3 screens, swipe to learn)
│
├── Main Navigation (Bottom Tab Bar)
│   ├── Home (🏠 Catalog)
│   ├── Tools (🛠️ Utilities)
│   ├── Jobs (💼 My Jobs)
│   ├── Calendar (📅 Schedule)
│   └── Profile (⚙️ Settings)
│
├── Screens
│   ├── Product Listing
│   ├── Product Detail
│   ├── Search & Filters
│   ├── Measurement Helper
│   ├── Cut List Generator
│   ├── Panel Optimizer
│   ├── Job Card View
│   ├── Job Detail View
│   ├── Estimator
│   ├── Invoice Generator
│   ├── 3D Modeler
│   ├── CNC Exporter
│   └── Settings
│
└── Admin Panel (Web Dashboard)
    ├── Product Management
    ├── Order Management
    ├── Exchange Rate Manager
    ├── Analytics Dashboard
    └── User Management
```

### Color System

```css
/* Primary Colors */
--primary-wood: #8B7355; /* Warm wood tone */
--primary-accent: #4CAF50; /* Green for success */
--primary-orange: #FF9800; /* Orange for industry */

/* Semantic Colors */
--success: #4CAF50;
--warning: #FFC107;
--error: #F44336;
--info: #2196F3;

/* Backgrounds */
--bg-primary: #FFFFFF;
--bg-secondary: #F5F5F5;
--bg-accent: #FFF3E0;

/* Text */
--text-primary: #212121;
--text-secondary: #757575;
--text-muted: #9E9E9E;
```

### Component Design System

```typescript
// Button Variants
<Button variant="primary"> {/* GREEN BIG BUTTON */}
<Button variant="secondary"> {/* GRAY MEDIUM */}
<Button variant="danger"> {/* RED CANCEL */}
// ALL BUTTONS HAVE TEXT LABELS

// Typography
<Text size="xl" weight="bold"> {/* BIG NUMBERS */}
<Text size="md"> {/* BODY TEXT */}
<Text size="sm" muted> {/* SECONDARY */}

// Currency Display
<Currency amount={12.50} currency="USD" />
// Shows: $12.50 USD | 12,500 New SYP

// Empty States
<EmptyState 
  icon={icon} 
  message="Tap here to add product"
  action="Add Product"
/>

// Loading States
<Spinner />
<Skeleton />
```

---

## 🚀 Launch Readiness Checklist

### Week 8: Go/No-Go Decisions

**Technical:**
- [ ] All 27 MVP features implemented
- [ ] All API endpoints tested
- [ ] Offline mode working (48-hour test passed)
- [ ] Service Worker caching functional
- [ ] IndexedDB sync working
- [ ] WhatsApp Business API integrated
- [ ] SMS verification working
- [ ] Exchange rate API + manual working

**Performance:**
- [ ] App loads in < 3 seconds (offline)
- [ ] First-time user completes first calculation in < 1 minute
- [ ] All features accessible within 3 taps
- [ ] Page load time < 1 second
- [ ] No lag in cut list optimization

**UX:**
- [ ] All screens pass beginner-friendliness audit
- [ ] No hidden actions found
- [ ] All defaults removed (everything explicit)
- [ ] RTL working perfectly for Arabic
- [ ] Currency toggle working (USD/SYP/Old SYP)
- [ ] New SYP conversion (10,000 = 100) working

**Testing:**
- [ ] Tested on Android 6+ (minimum target)
- [ ] Tested on Android 10+
- [ ] Tested on iPhone iOS 15+
- [ ] Tested on iPad
- [ ] Tested on poor network (3G)
- [ ] Tested offline for 48 hours
- [ ] Tested with 5 beta carpenters

**Documentation:**
- [ ] User guide written (Arabic)
- [ ] Admin guide written (Arabic)
- [ ] API documentation updated
- [ ] Video tutorials recorded (optional)

**Legal:**
- [ ] Privacy policy created
- [ ] Terms of service created
- [ ] WhatsApp Business API terms reviewed

**Deployment:**
- [ ] Supabase production project ready
- [ ] Dokploy deployment configured
- [ ] Domain DNS configured
- [ ] SSL certificate valid
- [ ] Backup system tested
- [ ] Monitoring tools set up

**Marketing:**
- [ ] Launch announcement prepared (Arabic)
- [ ] WhatsApp groups notified
- [ ] Facebook posts scheduled
- [ ] Demo video recorded (5-minute walkthrough)

---

## 📊 Post-Launch Plan (Months 3-12)

### Month 1-2: Advanced Shop Automation
- [ ] Crew App (full task management)
- [ ] Client Portal (job progress sharing)
- [ ] Advanced Team Chat
- [ ] Real-time Collaboration
- [ ] Push Notifications to Crew

### Month 3-4: 3D Modeler V2 + AR Preview
- [ ] Advanced 3D models (textures, lighting)
- [ ] AR Preview (place model in client's room)
- [ ] Before/After comparison
- [ ] Material suggestions from 3D model
- [ ] Export to OBJ/FBX formats

### Month 5-6: AI Assistant
- [ ] AI Chat Assistant (integrated knowledge base)
- [ ] Smart Pricing (analyze market + costs + complexity)
- [ ] Demand Prediction (seasonal trends, area preferences)
- [ ] Automatic Quote Optimization
- [ ] Project Suggestion from Photo (AI sketch recognition)

### Month 7-8: Advanced Analytics + Growth Tools
- [ ] Profit Analytics (detailed breakdown per job type)
- [ ] Waste Hotspot Analysis (identify problem areas)
- [ ] Busiest Months Dashboard
- [ ] Top Profitable Products
- [ ] Client Insights (payment patterns, referrals)
- [ ] Team Performance Tracker

### Month 9-10: Safety + Sustainability
- [ ] Job Site Checklists (OSHA-style)
- [ ] Incident Logger (photos, follow-up, trends)
- [ ] Training Tracker (certifications, expirations)
- [ ] Carbon/Material Tracker (waste emissions)
- [ ] Green Certifications Generator
- [ ] Sustainability Score per Job

### Month 11-12: Expansion Features
- [ ] Supplier Portal (auto-request, compare prices)
- [ ] Auto-Request Quotes (to 3+ suppliers)
- [ ] Review Collector (5-star system)
- [ ] Lead Finder (on-demand jobs nearby)
- [ ] SEO & Portfolio Builder (auto-pages from jobs)
- [ ] Referral System (bonuses, leaderboard)

---

## 🎯 Success Metrics

### Launch Targets (Week 8)
- [ ] 50+ carpenters using app actively by end of Week 1
- [ ] 100+ jobs created by end of Week 2
- [ ] 500+ cut lists generated by end of Week 4
- [ ] 10,000+ product views by end of Week 4
- [ ] < 5% crash rate
- [ ] 4.5+ star rating (Play Store/Website)
- [ ] Zero critical bugs (crashes, data loss)

### 3-Month Targets
- [ ] 500+ active carpenters
- [ ] 2,000+ jobs created
- [ ] 10,000+ cut lists generated
- [ ] 500+ templates saved
- [ ] 1,000+ PDF quotes generated
- [ ] 20% repeat usage (users open app 5+ times/week)

### 6-Month Targets
- [ ] 1,000+ active carpenters
- [ ] 10,000+ jobs created
- [ ] 50,000+ cut lists generated
- [ ] 200+ public templates
- [ ] 5,000+ PDF quotes generated
- [ ] 30% repeat usage

---

## 🔐 Security Checklist

### Authentication & Authorization
- [ ] Phone number validation (E.164 format)
- [ ] SMS verification with 6-digit code
- [ ] Rate limiting (5 attempts/minute)
- [ ] Session tokens expire after 30 days
- [ ] Admin-only endpoints protected

### Data Protection
- [ ] All API inputs validated (Zod schemas)
- [ ] SQL injection prevention (Prisma ORM)
- [ ] XSS prevention (React sanitization)
- [ ] CSRF protection on all state-changing requests
- [ ] File upload validation (type, size, content)
- [ ] Sensitive data encrypted at rest (Supabase)

### API Security
- [ ] Rate limiting (100 requests/minute per user)
- [ ] CORS restricted to bader.kholani.store
- [ ] Webhook signature verification (WhatsApp callbacks)
- [ ] Request logging (audit trail)
- [ ] IP-based blocking (after 20 failed attempts)

### Privacy
- [ ] GDPR-compliant privacy policy
- [ ] Data export request handler
- [ ] Data deletion request handler
- [ ] Cookie consent banner
- [ ] Minimal data collection (only what's needed)

---

## 🚀 READY TO START DEVELOPMENT

**Status:** All decisions locked, roadmap finalized  
**Timeline:** 8 weeks to launch  
**Team:** Ready for aggressive parallel development  
**Next:** Begin Week 1 - Foundation & Core Setup

**Repository:** https://github.com/shamskholani2020/fullstack-app

---

## 📝 Development Log

**Week 1:**
- Started: TBD
- Completed: TBD
- Notes: TBD

**Week 2:**
- Completed: TBD
- Notes: TBD

...

---

**End of Development Roadmap - Let's Build BADER!** 🛠️🚀

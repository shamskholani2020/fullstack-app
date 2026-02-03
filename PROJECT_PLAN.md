# Bader Platform - Project Plan

**Version:** 1.0  
**Date:** February 3, 2026  
**Location:** Rif Damascus, Darraya, Syria  
**Status:** Research & Planning Phase

---

## 📋 Table of Contents

1. [Business Context](#business-context)
2. [Product Catalog](#product-catalog)
3. [User Roles & Features](#user-roles--features)
4. [Technical Architecture](#technical-architecture)
5. [Core Features by Priority](#core-features-by-priority)
6. [Data Structure](#data-structure)
7. [UX/UX Requirements](#uxux-requirements)
8. [Offline Strategy](#offline-strategy)
9. [Development Roadmap](#development-roadmap)
10. [Life-Saving Utilities for Carpenters](#life-saving-utilities-for-carpenters)

---

## 🌍 Business Context

### Location & Market
- **Region:** Syria, Rif Damascus, Darraya
- **Target Users:** Carpenters and contractors (capacity can scale)
- **Business Hours:** 8am - 7pm (may vary)
- **Team Size:** 
  - Platform management: 1-2 people
  - Business operations: 15-20 people

### Economic Factors
- **Primary Currency:** USD
- **Display Currencies:** USD and SYP (user can toggle)
- **Exchange Rate:** Very dynamic (changes every minute in some cases)
- **Payment Methods:** 
  - Phone call (negotiated pricing)
  - WhatsApp order confirmation
  - No online payments
  - No e-commerce checkout

### Infrastructure Constraints
- **Network:** Poor internet connectivity in the area
- **Implication:** Offline-first approach is critical
- **Sync Strategy:** Must support offline work with background synchronization

### Language & Localization
- **Primary Language:** Arabic (Right-to-Left)
- **Secondary Language:** English (optional toggle)
- **Measurement Systems:**
  - Meter system (m³ for wood, kg for glue)
  - Piece system (for MDF plates)

---

## 🪵 Product Catalog

### Product Categories

#### 1. MDF (Medium Density Fiberboard)
- **Variants:**
  - Plain MDF
  - Paper colored MDF
  - Melamine MDF
  - High gloss MDF
- **Pricing Unit:** Per piece (whole plate)
- **Typical Size:** 122cm x 244cm (sold as whole, no cuts)
- **Display Data:** Thickness, type, price per piece

#### 2. Wood (Natural Wood)
- **Types:**
  - Swedish Wood (سويد)
  - Beech - Red and White (زان)
  - Pine Wood (شوح)
  - Red Wood
  - White Wood
  - Other Syrian market woods
- **Pricing Unit:** Per cubic meter (m³)
- **Pricing Method:** 
  - No seeds (clean plate) = High price
  - With seeds = Lower price
  - Measured by: Height × Width × Length (in meters)
- **Display Data:** Dimensions, cubic meters, price per m³, clarity indicator

#### 3. Glue (غراء)
- **Variants:** Different brands
- **Package Sizes:**
  - 5kg
  - 9.5kg
  - 20kg
  - 25kg
  - 45kg
- **Pricing Unit:** Per package (price varies by brand and weight)
- **Display Data:** Brand, weight, price per package

#### 4. Carpenter Accessories
- **Types:** Workshop accessories, hardware, tools
- **Pricing Unit:** Per item
- **Display Data:** Name, description, price, stock quantity

#### 5. Custom Wood Products (Challenge Products)
- **Types:**
  - Doors (أبواب)
  - Door Frames (إطارات أبواب)
  - Window Frames (إطارات نوافذ)
  - Door Surroundings (حوايط باب)
  - Tables (طاولات)
  - Any custom wood project
- **Pricing Strategy:** Challenging price (competitive because carpenter can make it but takes time)
- **Unique Selling Point:** Bader has full workshop ready - other merchants don't offer this
- **Display Data:** Product type, dimensions, challenging price, stock

### Special Services

#### Cutting Service (خدمة القص)
- **Scenario:** Client needs part of a wood plate
- **Example:** 
  - Full plate: 600cm × 20cm × 5cm (Swedish)
  - Client needs: 230cm piece
  - **Action:** Bader cuts to 230cm
  - **Pricing:** Client pays only for taken cubic meter
  - **Remaining:** The rest of the plate stays in Bader inventory
- **Benefit:** Client takes exact needs without paying for full plate
- **Display:** "Cutting service available" indicator

#### Remaining Wood Flow (بقايا الخشب)
- **Scenario:** After cuts, remaining sizes available for other clients
- **Display:** Show available remaining sizes with prices
- **Benefit:** Maximize inventory utilization, offer competitive prices on leftovers

#### Project Measurement Service (خدمة قياس المشاريع)
- **Offer:** Help carpenter write measurements for their projects
- **Purpose:** Understand project type and suggest suitable products
- **Output:** 
  - Project measurements recorded
  - Product suggestions based on project requirements
- **Display:** In-app measurement tool/form

### Product Data to Display
For each product, show:
- ✅ Name (Arabic & English)
- ✅ Description
- ✅ Price (USD & SYP toggle)
- ✅ Stock quantity (if tracked)
- ✅ Dimensions/Sizes
- ✅ Product type/category
- ✅ Supplier/Brand info
- ✅ Images (for special products like doors, high-clarity Swedish doors)
- ✅ Related/suggested products
- ✅ Measurement unit (m³, piece, kg)
- ✅ Clarity indicator (for Swedish wood)
- ✅ Cutting service availability

---

## 👥 User Roles & Features

### 1. Carpenters (النجارين) - Primary Users

**Goal:** Browse, search, and get product suggestions for their projects

**Features:**
- [ ] Browse all products by category
- [ ] Search by name, type, material
- [ ] Filter by dimensions, price range, availability
- [ ] Sort by price, newest, popularity
- [ ] View product details with all specifications
- [ ] View price in USD or SYP (toggle)
- [ ] View wood clarity indicator (no seeds vs with seeds)
- [ ] Use measurement calculator for projects
- [ ] Save projects/measurements (offline)
- [ ] View product suggestions based on project type
- [ ] Request cutting service (if applicable)
- [ ] Place order via WhatsApp
- [ ] Save products to favorites (offline)

### 2. Admin/Manager (المدير)

**Goal:** Manage inventory, view orders, manage data

**Features:**
- [ ] Add/Edit/Delete products
- [ ] Manage product variants (dimensions, prices)
- [ ] Upload product images
- [ ] Set stock levels
- [ ] View all orders
- [ ] Update order status (pending → preparing → ready → delivered)
- [ ] Confirm orders manually
- [ ] Manage exchange rate (USD to SYP)
- [ ] Generate reports (sales, inventory, popular products)
- [ ] View business analytics
- [ ] Manage customer database
- [ ] Send WhatsApp notifications for order updates
- [ ] Sync data when online

### 3. Delivery Driver (سائق التوصيل) - Future

**Goal:** View delivery tasks, update status

**Features:**
- [ ] View assigned deliveries
- [ ] Get customer location
- [ ] Navigate to customer (map integration if network allows)
- [ ] Mark delivery as completed
- [ ] View delivery fee based on distance

### 4. Sales Team (فريق المبيعات) - Future

**Goal:** Suggest products, help carpenters

**Features:**
- [ ] View customer projects
- [ ] Suggest suitable products
- [ ] Create quotations
- [ ] Follow up on orders

---

## 🏗 Technical Architecture

### Frontend Stack
- **Framework:** Next.js 16.1.6 (App Router)
- **UI Library:** shadcn/ui 0.0.4
- **Styling:** Tailwind CSS 4.1.18
- **Language:** TypeScript 5
- **Icons:** Lucide React 0.563.0

### Backend/API
- **Approach:** API Routes (Next.js)
- **Database:** SQLite (for offline) + Supabase (sync when online)
- **ORM:** Prisma (type-safe database access)
- **Real-time:** Server-Sent Events (SSE) for sync

### Offline-First Architecture
```
┌─────────────────────────────────────────┐
│         Local Browser Storage          │
│  ┌─────────┐  ┌─────────────┐  │
│  │IndexedDB│  │localStorage  │  │
│  │(Products)│  │(Preferences)│  │
│  └─────────┘  └─────────────┘  │
└─────────────────────────────────────────┘
              ↓ Background Sync
┌─────────────────────────────────────────┐
│         Supabase / API              │
│    (when internet is available)       │
└─────────────────────────────────────────┘
```

### Deployment
- **Platform:** Dokploy
- **Domain:** https://bader.kholani.store
- **Docker:** Multi-stage build
- **Environment:** Production

---

## 🎯 Core Features by Priority

### Phase 1: MVP (Minimum Viable Product) - Weeks 1-4
**Must-have features for launch:**

**Product Catalog:**
- [ ] Display all product categories
- [ ] Product detail pages with all specifications
- [ ] Search functionality (by name, type)
- [ ] Basic filters (category, price range)
- [ ] Currency toggle (USD ↔ SYP)
- [ ] Exchange rate display

**Carpenter Tools:**
- [ ] Simple measurement calculator
- [ ] Product suggestions (manual list)
- [ ] Save measurements (localStorage)

**Admin:**
- [ ] Product management (CRUD)
- [ ] Order management (view, update status)
- [ ] Exchange rate management
- [ ] Basic reporting

**Order Flow:**
- [ ] Place order via WhatsApp (auto-generated message)
- [ ] Order confirmation (admin approves)
- [ ] Order status tracking

**Offline Support:**
- [ ] Cache products in IndexedDB
- [ ] App works without internet
- [ ] Background sync when online
- [ ] Progress indicators (syncing...)

### Phase 2: Enhanced Features - Weeks 5-8
**Value-add features:**

**Advanced Search & Filters:**
- [ ] Filter by dimensions (for wood)
- [ ] Filter by clarity (clean vs seeded)
- [ ] Filter by brand (for glue)
- [ ] Multi-select filters
- [ ] Save filter preferences

**Cutting Service:**
- [ ] Calculate cutting cost
- [ ] Show remaining sizes
- [ ] Visual cutting guide
- [ ] Auto-generate WhatsApp message for cutting request

**Measurements:**
- [ ] Project type templates (door, window, table, etc.)
- [ ] Smart material calculator
- [ ] Save multiple projects
- [ ] Export measurements as PDF/image

**Suggestions:**
- [ ] AI-powered product suggestions (based on project type)
- [ ] Material compatibility checker
- [ ] History-based suggestions

**Enhanced Admin:**
- [ ] Inventory tracking (low stock alerts)
- [ ] Advanced analytics
- [ ] Customer management
- [ ] Bulk product import

### Phase 3: Advanced Features - Weeks 9+
**Future enhancements:**

**Delivery:**
- [ ] Delivery driver portal
- [ ] Distance-based delivery fee calculator
- [ ] GPS navigation (if network allows)
- [ ] Delivery route optimization

**Sales Team:**
- [ ] Sales dashboard
- [ ] Quotation builder
- [ ] Customer relationship management (CRM)
- [ ] Follow-up reminders

**Community:**
- [ ] User accounts (carpenters can save preferences)
- [ ] Reviews/ratings system
- [ ] Photo gallery (carpenters can share projects)
- [ ] Tips & tutorials

---

## 📊 Data Structure

### Product Schema
```typescript
interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  category: ProductCategory;
  type: ProductType;
  priceUSD: number;
  descriptionAr?: string;
  descriptionEn?: string;
  specifications: ProductSpecs;
  images?: string[];
  stock?: number;
  supplier?: string;
  brand?: string;
  createdAt: Date;
  updatedAt: Date;
}

type ProductCategory = 
  | 'mdf' 
  | 'wood' 
  | 'glue' 
  | 'accessories' 
  | 'custom-wood';

type ProductType =
  | 'plain-mdf'
  | 'colored-mdf'
  | 'melamine-mdf'
  | 'high-gloss-mdf'
  | 'swedish-wood'
  | 'beech-red'
  | 'beech-white'
  | 'pine'
  | 'red-wood'
  | 'white-wood'
  | 'glue'
  | 'accessory'
  | 'door'
  | 'door-frame'
  | 'window-frame'
  | 'door-surround'
  | 'table'
  | 'custom-wood';

interface ProductSpecs {
  // MDF
  thickness?: number; // mm
  dimensions?: {
    length: number; // cm
    width: number; // cm
  };
  pricingUnit: 'piece' | 'cubic-meter' | 'kg';
  
  // Wood
  clarity?: 'clean' | 'seeded';
  dimensions?: {
    height: number; // m
    width: number; // m
    length: number; // m
  };
  
  // Glue
  weight?: number; // kg
  brand?: string;
  
  // Custom wood
  productType?: string;
  customDimensions?: string;
}

interface CuttingService {
  productId: string;
  requestedSize: {
    length: number;
    width: number;
    height?: number;
  };
  calculatedPrice: number;
  remainingSize?: {
    length: number;
    width: number;
    height?: number;
    price: number;
  };
  status: 'pending' | 'approved' | 'ready';
}
```

### Order Schema
```typescript
interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  totalUSD: number;
  totalSYP?: number;
  delivery?: {
    type: 'pickup' | 'delivery';
    location?: string;
    distance?: number; // km
    fee?: number; // USD
  };
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  orderDate: Date;
  notes?: string;
  sentVia: 'whatsapp' | 'phone' | 'in-person';
}

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  priceUSD: number;
  cuttingService?: CuttingService;
}
```

### Project/Measurement Schema
```typescript
interface Project {
  id: string;
  userId?: string;
  name: string;
  type: ProjectType;
  measurements: Measurement[];
  suggestedProducts: Product[];
  status: 'draft' | 'in-progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

type ProjectType =
  | 'door'
  | 'window'
  | 'table'
  | 'cabinet'
  | 'shelf'
  | 'other';

interface Measurement {
  name: string;
  value: number;
  unit: 'cm' | 'm' | 'mm';
  notes?: string;
}
```

### Exchange Rate Schema
```typescript
interface ExchangeRate {
  id: string;
  usdToSYP: number;
  timestamp: Date;
  source: 'manual' | 'api';
}
```

---

## 🎨 UX/UX Requirements

### Mobile-First Design
- **Primary Device:** Mobile phones (carpenters on-site)
- **Key Considerations:**
  - Large touch targets (min 44px)
  - Readable text (min 16px)
  - Simple navigation
  - One-handed use support
  - Fast load times
  - Work in landscape mode (for better view)

### Arabic RTL Support
- **Text Direction:** Right-to-Left (RTL)
- **Font:** Noto Sans Arabic or Cairo
- **Numbers:** Use Arabic numerals option
- **Date Format:** DD/MM/YYYY (Arabic locale)
- **Input:** RTL text fields, LTR numbers

### Color Scheme
- **Primary:** Warm wood tones (browns, beiges)
- **Accent:** Green (growth, success) or Orange (wood, industry)
- **Background:** Light (clean, professional)
- **Text:** High contrast (dark on light)
- **Accessibility:** WCAG AA compliance

### User Flows

#### Carpenter Flow (Browsing & Ordering)
```
1. Open App → See Categories
2. Select Category → View Products
3. Search/Filter → Find Product
4. View Details → See Specs, Price (USD/SYP toggle)
5. Save to Favorites (Optional)
6. Add to "Order List" (Not cart - just list)
7. Review Order List
8. Click "Order via WhatsApp"
9. Open WhatsApp with pre-filled message
10. Wait for admin confirmation
```

#### Admin Flow (Order Management)
```
1. Login to Dashboard
2. See New Orders Badge
3. Click Order → View Details
4. Approve/Reject Order
5. Update Status (Preparing → Ready)
6. Send WhatsApp Notification
7. Assign to Delivery (if applicable)
8. Mark as Delivered
```

#### Carpenter Flow (Measurement Tool)
```
1. Open "My Projects"
2. Click "New Project"
3. Select Project Type (Door, Window, etc.)
4. Enter Measurements
5. App Suggests Products
6. Carpenter Adjusts/Saves
7. View "What You Need" List
8. Click "Order Suggestions"
```

---

## 📴 Offline Strategy

### Architecture
```
┌─────────────────────────────────────┐
│         Service Worker              │
│  (Offline Cache & Sync)         │
└─────────────────────────────────────┘
              ↓ Cache
┌─────────────────────────────────────┐
│         IndexedDB                 │
│  (Products, Orders, Settings)    │
└─────────────────────────────────────┘
              ↓ Sync (when online)
┌─────────────────────────────────────┐
│         Supabase / API           │
│  (Source of Truth)              │
└─────────────────────────────────────┘
```

### Cache Strategy
- **Products:** Cache all products on app load, refresh every 24h
- **Orders:** Save locally, sync when online
- **Settings:** Save locally (currency, language)
- **Images:** Cache frequently viewed images

### Sync Strategy
- **Automatic:** Background sync every 5 minutes when online
- **Manual:** "Sync Now" button in settings
- **Conflict Resolution:** Last-write-wins with user notification
- **Progress:** Show sync status with retry button

### Network Detection
- **Online:** Show online indicator, enable sync
- **Offline:** Show offline badge, work normally
- **Reconnecting:** Show progress, queue changes

---

## 🛣 Development Roadmap

### Week 1-2: Setup & Core Structure
- [ ] Set up Next.js project structure
- [ ] Configure RTL and Arabic support
- [ ] Set up Supabase integration
- [ ] Create database schema
- [ ] Set up IndexedDB for offline
- [ ] Implement service worker
- [ ] Create base UI components (layout, navigation)

### Week 3-4: Product Catalog (MVP)
- [ ] Product listing page
- [ ] Product detail page
- [ ] Search functionality
- [ ] Basic filters
- [ ] Currency toggle (USD/SYP)
- [ ] Exchange rate display
- [ ] Product images support
- [ ] Admin product management (CRUD)

### Week 5-6: Order System & Measurements
- [ ] Order list feature
- [ ] WhatsApp order integration
- [ ] Admin order management
- [ ] Order status tracking
- [ ] Measurement calculator tool
- [ ] Project templates
- [ ] Product suggestions
- [ ] Save projects feature

### Week 7-8: Cutting Service & Offline
- [ ] Cutting service UI
- [ ] Calculate cutting cost
- [ ] Show remaining sizes
- [ ] Service worker implementation
- [ ] IndexedDB integration
- [ ] Background sync
- [ ] Offline indicator
- [ ] Network detection
- [ ] Conflict resolution

### Week 9-10: Admin Advanced & Testing
- [ ] Advanced admin dashboard
- [ ] Inventory tracking
- [ ] Analytics & reports
- [ ] Exchange rate management
- [ ] WhatsApp notification system
- [ ] Performance optimization
- [ ] Mobile responsiveness testing
- [ ] Offline flow testing
- [ ] RTL testing

### Week 11-12: Polish & Launch
- [ ] UI/UX refinements
- [ ] Accessibility audit
- [ ] Security review
- [ ] Performance optimization
- [ ] Bug fixes
- [ ] User testing with carpenters
- [ ] Documentation
- [ ] Deployment to Dokploy
- [ ] Launch! 🚀

---

## 🛠️ Life-Saving Utilities for Carpenters

### 1. Material Calculator (آلة الحاسبة)
**Purpose:** Calculate exact material needed for projects

**Templates:**
- [ ] **Door Calculator:**
  - Input: Door dimensions, type (single/double), material
  - Output: Required wood quantity (m³), estimated price
  
- [ ] **Window Calculator:**
  - Input: Window dimensions, number of sections
  - Output: Required wood quantity, frame requirements
  
- [ ] **Table Calculator:**
  - Input: Table dimensions, leg type
  - Output: Required wood quantity, surface area

- [ ] **Cabinet Calculator:**
  - Input: Cabinet dimensions, shelves, doors
  - Output: Required MDF/wood quantity

- [ ] **General Calculator:**
  - Custom dimensions
  - Select material
  - Calculate needed quantity

### 2. Cutting Optimizer (محسن القص)
**Purpose:** Maximize usage, minimize waste

**Features:**
- [ ] Input multiple project requirements
- [ ] Algorithm suggests optimal cuts from available plates
- [ ] Visual cutting plan
- [ ] Show remaining material
- [ ] Calculate total cost (actual vs theoretical)

### 3. Project Cost Estimator (مقدر تكلفة المشاريع)
**Purpose:** Quick price estimation for quotes

**Features:**
- [ ] Add project items (materials, quantities)
- [ ] Include labor hours estimation
- [ ] Add delivery cost (if applicable)
- [ ] Include cutting service cost
- [ ] Total estimation in USD and SYP
- [ ] Export as PDF (for customer quotes)

### 4. Measurement Templates (قوالب القياس)
**Purpose:** Standardized measurement forms

**Templates:**
- [ ] Door measurement form (standard sizes, custom)
- [ ] Window measurement form (types, styles)
- [ ] Kitchen cabinet form (L-shape, U-shape, linear)
- [ ] Wardrobe form (dimensions, doors, drawers)
- [ ] Custom project form

### 5. Material Converter (محول المواد)
**Purpose:** Convert between units for carpenters

**Conversions:**
- [ ] Cubic meters ↔ Square meters
- [ ] Cubic meters ↔ Lineal meters
- [ ] Lineal meters ↔ Pieces
- [ ] MDF pieces ↔ Area
- [ ] Wood clarity impact on price

### 6. Quick Reference Guide (دليل المرجع السريع)
**Purpose:** Quick reference for carpenters

**Content:**
- [ ] Standard wood sizes table
- [ ] Standard door/window dimensions
- [ ] Material properties table (density, strength)
- [ ] Common calculations formulas
- [ ] Measurement shortcuts

### 7. Project Checklist (قائمة التحقق للمشاريع)
**Purpose:** Ensure nothing forgotten before starting

**Checklists:**
- [ ] Door project checklist (materials, tools, measurements)
- [ ] Window project checklist
- [ ] Furniture project checklist
- [ ] Kitchen project checklist
- [ ] Custom checklist (create your own)

### 8. Image Gallery (معرض الصور)
**Purpose:** Reference for design ideas

**Categories:**
- [ ] Door designs
- [ ] Window designs
- [ ] Cabinet designs
- [ ] Table designs
- [ ] Custom projects
- [ ] Save user's own project photos

---

## 🔐 Security & Performance

### Security
- [ ] Admin authentication (phone number or email)
- [ ] Input validation (all forms)
- [ ] XSS protection
- [ ] SQL injection prevention (ORM usage)
- [ ] Rate limiting (API calls)

### Performance
- [ ] Lazy load images
- [ ] Pagination for product lists
- [ ] Service worker caching
- [ ] Optimize images (WebP, compression)
- [ ] Code splitting (Next.js automatic)

---

## 📝 Next Steps

### Immediate Actions
1. **Review this plan** - Confirm all requirements captured
2. **Approve roadmap** - Confirm phase priorities and timeline
3. **Stage organization** - Define transition between stages
4. **Start development** - Begin with Phase 1 setup

### Questions Before Development Start
1. Do you want user registration/accounts for carpenters?
2. Should we integrate the existing Google Sheets as initial data source?
3. Who will manage the exchange rate updates? (Manual or API?)
4. Should we support multiple admin users with different permissions?
5. Any specific design preferences? (Colors, logo, branding)

---

**Document Status:** Ready for review  
**Last Updated:** February 3, 2026  
**Next Review:** After Stage approval

---

**End of Research & Planning Phase** 🎉

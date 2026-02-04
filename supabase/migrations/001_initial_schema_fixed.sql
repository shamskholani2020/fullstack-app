-- Al-Bader Database Schema (MVP)
-- PostgreSQL Schema for Supabase
-- Version: 1.0
-- Date: February 3, 2026
-- Carpenters application management system

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- USERS
-- ============================================================================
-- Carpenters and administrators who use the application
-- ============================================================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    sms_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- PRODUCTS
-- ============================================================================
-- All materials sold by Bader (MDF, wood, glue, accessories)
-- ============================================================================

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- JOBS
-- ============================================================================
-- Projects managed by carpenters (door, window, cabinet, etc.)
-- ============================================================================

CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- JOB ITEMS
-- ============================================================================
-- Materials and services linked to jobs
-- ============================================================================

CREATE TABLE job_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity DECIMAL(10, 2) NOT NULL,
    price_usd DECIMAL(10, 2) NOT NULL,
    cutting_service JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- SUPPLIERS
-- ============================================================================
-- Where Bader purchases materials
-- ============================================================================

CREATE TABLE suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    last_purchase_price DECIMAL(10, 2),
    lead_time_days INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- EXCHANGE RATES
-- ============================================================================
-- Currency exchange rates (USD to Old SYP and New SYP)
-- Syrian government removed two zeros: 10,000 Old SYP = 100 New SYP
-- ============================================================================

CREATE TABLE exchange_rates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usd_to_old_syp DECIMAL(15, 2) NOT NULL,
    usd_to_new_syp DECIMAL(15, 2) NOT NULL,
    conversion_ratio DECIMAL(10, 4) DEFAULT 0.01,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    source VARCHAR(50) DEFAULT 'api',
    is_official_rate BOOLEAN DEFAULT FALSE
);

-- ============================================================================
-- MEASUREMENTS
-- ============================================================================
-- Room/project measurements saved by carpenters
-- ============================================================================

CREATE TABLE measurements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    project_name VARCHAR(255),
    project_type VARCHAR(50),
    room_name VARCHAR(255),
    measurements JSONB,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- CUT LISTS
-- ============================================================================
-- Optimized cutting lists for materials
-- ============================================================================

CREATE TABLE cut_lists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    items JSONB NOT NULL,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- TEMPLATES
-- ============================================================================
-- Saved job templates (measurements, materials, etc.)
-- ============================================================================

CREATE TABLE templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    template_data JSONB NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- CHECKLISTS
-- ============================================================================
-- Pre-built checklists for jobs (tools, hardware, steps)
-- ============================================================================

CREATE TABLE checklists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    checklist_data JSONB NOT NULL,
    completed_at TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INVOICES
-- ============================================================================
-- Simple invoice and payment tracking
-- ============================================================================

CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    total_usd DECIMAL(10, 2) NOT NULL,
    deposit_usd DECIMAL(10, 2) DEFAULT 0,
    final_payment_usd DECIMAL(10, 2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'pending',
    sent_via VARCHAR(20),
    sent_at TIMESTAMP,
    paid_at TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================
-- Performance optimization indexes
-- ============================================================================

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_type ON products(product_type);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_user ON jobs(user_id);
CREATE INDEX idx_jobs_created_at ON jobs(created_at DESC);
CREATE INDEX idx_job_items_job ON job_items(job_id);
CREATE INDEX idx_measurements_user ON measurements(user_id);
CREATE INDEX idx_measurements_job ON measurements(job_id);
CREATE INDEX idx_cut_lists_user ON cut_lists(user_id);
CREATE INDEX idx_cut_lists_job ON cut_lists(job_id);
CREATE INDEX idx_cut_lists_generated ON cut_lists(generated_at DESC);
CREATE INDEX idx_templates_user ON templates(user_id);
CREATE INDEX idx_templates_type ON templates(type);
CREATE INDEX idx_checklists_user ON checklists(user_id);
CREATE INDEX idx_checklists_job ON checklists(job_id);
CREATE INDEX idx_invoices_job ON invoices(job_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_exchange_rates_timestamp ON exchange_rates(timestamp DESC);
CREATE INDEX idx_suppliers_name ON suppliers(name);

-- ============================================================================
-- TRIGGERS
-- ============================================================================
-- Update timestamp on record modification
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- FUNCTIONS
-- ============================================================================
-- Helper functions for common queries
-- ============================================================================

-- Get user's jobs count
CREATE OR REPLACE FUNCTION get_user_job_count(user_id UUID)
RETURNS INTEGER AS $$
BEGIN
    RETURN COALESCE(
        (SELECT COUNT(*) FROM jobs WHERE jobs.user_id = get_user_job_count.user_id),
        0
    );
END;
$$ LANGUAGE plpgsql;

-- Get user's unpaid invoices total
CREATE OR REPLACE FUNCTION get_user_unpaid_total(user_id UUID)
RETURNS DECIMAL(10, 2) AS $$
BEGIN
    RETURN COALESCE(
        (SELECT COALESCE(SUM(total_usd - final_payment_usd), 0)
         FROM invoices
         WHERE invoices.job_id IN (
             SELECT id FROM jobs WHERE jobs.user_id = get_user_unpaid_total.user_id AND jobs.status != 'cancelled'
         )
         AND invoices.status != 'paid'),
        0
    );
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SEED DATA
-- ============================================================================
-- Insert official exchange rate (10,000 Old SYP = 100 New SYP)
-- ============================================================================

INSERT INTO exchange_rates (usd_to_old_syp, usd_to_new_syp, conversion_ratio, source, is_official_rate)
VALUES (10000.00, 100.00, 0.01, 'government-announcement', TRUE);

-- ============================================================================
-- GRANTS
-- ============================================================================
-- Read-only for unauthenticated users (for public templates, product browsing)
-- Full access for authenticated users
-- This is a placeholder - actual grants will be managed by Supabase RLS (Row Level Security)
-- ============================================================================

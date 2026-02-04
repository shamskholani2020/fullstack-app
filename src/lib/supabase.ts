import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://supabase.kholani.store';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================================================
// HELPERS
// ============================================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// ============================================================================
// TABLE TYPES
// ============================================================================

export interface User {
  id: string;
  phone_number: string;
  sms_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name_ar: string;
  name_en?: string;
  category: string;
  product_type?: string;
  price_usd: number;
  specifications?: Json;
  images?: string[];
  stock?: number;
  supplier_name?: string;
  brand?: string;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  user_id?: string;
  client_name: string;
  client_phone: string;
  client_address?: string;
  status: string;
  photos?: string[];
  notes?: string;
  voice_notes?: string[];
  measurements?: Json;
  estimated_cost?: number;
  actual_cost?: number;
  created_at: string;
  updated_at: string;
}

export interface Measurement {
  id: string;
  user_id?: string;
  job_id?: string;
  project_name?: string;
  project_type?: string;
  room_name?: string;
  measurements?: Json;
  notes?: string;
  created_at: string;
}

export interface Template {
  id: string;
  user_id?: string;
  name: string;
  type?: string;
  template_data: Json;
  is_public: boolean;
  created_at: string;
}

export interface Checklist {
  id: string;
  user_id?: string;
  job_id?: string;
  checklist_data: Json;
  completed_at?: string;
  created_at: string;
}

export interface Invoice {
  id: string;
  job_id: string;
  total_usd: number;
  deposit_usd: number;
  final_payment_usd: number;
  status: string;
  sent_via?: string;
  sent_at?: string;
  paid_at?: string;
  created_at: string;
}

export interface Supplier {
  id: string;
  name: string;
  phone?: string;
  last_purchase_price?: number;
  lead_time_days?: number;
  created_at: string;
}

export interface ExchangeRate {
  id: string;
  usd_to_old_syp: number;
  usd_to_new_syp: number;
  conversion_ratio: number;
  timestamp: string;
  source: string;
  is_official_rate: boolean;
}

// ============================================================================
// API HELPERS
// ============================================================================

// ============================================================================
// PRODUCTS
// ============================================================================

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name_ar');

  if (error) throw error;
  return data;
}

export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProduct(id: string, updates: Partial<Product>) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// ============================================================================
// JOBS
// ============================================================================

export async function getJobs() {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getJobById(id: string) {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createJob(job: Omit<Job, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('jobs')
    .insert(job)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateJob(id: string, updates: Partial<Job>) {
  const { data, error } = await supabase
    .from('jobs')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteJob(id: string) {
  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// ============================================================================
// MEASUREMENTS
// ============================================================================

export async function getMeasurements() {
  const { data, error } = await supabase
    .from('measurements')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createMeasurement(measurement: Omit<Measurement, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('measurements')
    .insert(measurement)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteMeasurement(id: string) {
  const { error } = await supabase
    .from('measurements')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// ============================================================================
// CHECKLISTS
// ============================================================================

export async function getChecklists() {
  const { data, error } = await supabase
    .from('checklists')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createChecklist(checklist: Omit<Checklist, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('checklists')
    .insert(checklist)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteChecklist(id: string) {
  const { error } = await supabase
    .from('checklists')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// ============================================================================
// EXCHANGE RATES
// ============================================================================

export async function getLatestExchangeRate() {
  const { data, error } = await supabase
    .from('exchange_rates')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(1)
    .single();

  if (error) throw error;
  return data;
}

// ============================================================================
// SUPABASE CLIENT
// ============================================================================
// Supabase client is exported at the top of the file

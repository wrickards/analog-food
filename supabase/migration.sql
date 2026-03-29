-- Migration: Add notes column to vendors, create vendor_suggestions table
-- Run this in Supabase SQL Editor

-- 1. Add notes column to vendors table (idempotent)
alter table vendors add column if not exists notes text;

-- 2. Create vendor_suggestions table
create table if not exists vendor_suggestions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  address text,
  website text,
  zip text,
  notes text,
  reviewed boolean default false,
  created_at timestamptz default now()
);

-- 3. Enable RLS on vendor_suggestions
alter table vendor_suggestions enable row level security;

-- 4. Allow anyone to insert a suggestion (public submit)
create policy "Public insert suggestions" on vendor_suggestions
  for insert with check (true);

-- 5. Only service role can read suggestions
create policy "Service read suggestions" on vendor_suggestions
  for select using (false);

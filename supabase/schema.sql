-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Vendors table
create type vendor_type as enum ('farm', 'farmers-market', 'specialty-grocer', 'csa');

create table if not exists vendors (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  type vendor_type not null,
  lat float8 not null,
  lng float8 not null,
  address text not null,
  city text not null,
  state text not null,
  zip text not null,
  website text,
  phone text,
  hours text,
  tags text[] default '{}',
  highlights text[] default '{}',
  verified boolean default false,
  notes text,
  created_at timestamptz default now()
);

-- Vendor suggestions table
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

-- Subscribers table
create table if not exists subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  zip text not null,
  created_at timestamptz default now()
);

-- Ingredients table
create type danger_level as enum ('high', 'medium', 'low');

create table if not exists ingredients (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  aliases text[] default '{}',
  danger_level danger_level not null,
  description text not null,
  banned_in text[] default '{}',
  clean_alternative text not null,
  personal_note text,
  created_at timestamptz default now()
);

-- Row Level Security
alter table vendors enable row level security;
alter table subscribers enable row level security;
alter table ingredients enable row level security;
alter table vendor_suggestions enable row level security;

-- Public read access for vendors and ingredients
create policy "Public read vendors" on vendors for select using (true);
create policy "Public read ingredients" on ingredients for select using (true);

-- Only service role can insert/update subscribers
create policy "Service insert subscribers" on subscribers for insert with check (true);

-- Anyone can submit a vendor suggestion; only service role can read them
create policy "Public insert suggestions" on vendor_suggestions for insert with check (true);
create policy "Service read suggestions" on vendor_suggestions for select using (false);

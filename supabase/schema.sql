-- FormaTiles V1 Database Schema for Supabase
-- Run this in your Supabase SQL Editor if connecting a live Supabase project

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Categories Table
create table if not exists public.categories (
    id text primary key,
    name text not null,
    slug text not null unique,
    description text,
    image_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Brands Table
create table if not exists public.brands (
    id text primary key,
    name text not null,
    slug text not null unique,
    origin text,
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Products Table
create table if not exists public.products (
    id text primary key default uuid_generate_v4()::text,
    slug text not null unique,
    name text not null,
    category_id text references public.categories(id) on delete set null,
    brand_id text references public.brands(id) on delete set null,
    category text not null, -- 'ceramic' | 'granite' | 'wall-panel' | 'spc'
    brand text not null,
    size text not null, -- e.g. '60x60', '60x120', '80x80', '20x120', '30x60'
    surface_finish text not null, -- e.g. 'Polished', 'Matte', 'Rustic', 'Fluted', 'Wood Embossed'
    thickness_mm numeric default 9,
    pcs_per_box integer default 4,
    coverage_per_box_m2 numeric not null, -- e.g. 1.44
    price_range text not null, -- e.g. 'Rp 180.000 - 240.000 / m²' or 'From Rp 195.000 / m²'
    starting_price_numeric numeric default 0,
    is_featured boolean default false,
    images jsonb default '[]'::jsonb, -- array of image URLs
    specifications jsonb default '{}'::jsonb, -- key-value pairs (wear layer, slip resistance, application, etc.)
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Inquiries / Leads Table
create table if not exists public.inquiries (
    id text primary key default uuid_generate_v4()::text,
    customer_name text not null,
    customer_phone text not null,
    customer_email text,
    project_location text,
    items jsonb default '[]'::jsonb,
    estimated_area_m2 numeric,
    notes text,
    status text default 'new', -- 'new' | 'contacted' | 'quoted' | 'closed'
    source text default 'website', -- 'calculator' | 'catalog' | 'direct'
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS)
alter table public.categories enable row level security;
alter table public.brands enable row level security;
alter table public.products enable row level security;
alter table public.inquiries enable row level security;

-- Public Read Policies
create policy "Allow public read categories" on public.categories for select using (true);
create policy "Allow public read brands" on public.brands for select using (true);
create policy "Allow public read products" on public.products for select using (true);

-- Public Insert for Inquiries (Lead generation)
create policy "Allow public insert inquiries" on public.inquiries for insert with check (true);

-- Admin Access Policies (Authenticated users or service role)
create policy "Allow authenticated admin full access categories" on public.categories for all using (auth.role() = 'authenticated');
create policy "Allow authenticated admin full access brands" on public.brands for all using (auth.role() = 'authenticated');
create policy "Allow authenticated admin full access products" on public.products for all using (auth.role() = 'authenticated');
create policy "Allow authenticated admin full access inquiries" on public.inquiries for all using (auth.role() = 'authenticated');

-- Storage bucket for product images
insert into storage.buckets (id, name, public) 
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Public product images read" on storage.objects for select using (bucket_id = 'product-images');
create policy "Admin upload product images" on storage.objects for insert with check (bucket_id = 'product-images' and auth.role() = 'authenticated');

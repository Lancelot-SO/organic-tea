-- ============================================================
-- 003: Create products table
-- Replaces the hardcoded product array in Shop.jsx
-- ============================================================

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  price numeric(10,2) not null,
  compare_at_price numeric(10,2),
  category_id uuid references public.categories(id) on delete set null,
  image_url text,
  gallery_urls text[] default '{}',
  stock_quantity int not null default 0,
  weight_grams int,
  is_published boolean not null default true,
  badge text,
  rating numeric(2,1) default 0.0,
  tags text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for filtering
create index idx_products_category on public.products(category_id);
create index idx_products_published on public.products(is_published);
create index idx_products_slug on public.products(slug);

-- Updated_at trigger
create trigger products_updated_at
  before update on public.products
  for each row execute function public.update_updated_at();

-- Enable RLS
alter table public.products enable row level security;

-- ============================================================
-- 005: Create order_items table
-- ============================================================

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  product_image text,
  quantity int not null default 1,
  unit_price numeric(10,2) not null,
  total_price numeric(10,2) not null
);

-- Index
create index idx_order_items_order on public.order_items(order_id);

-- Enable RLS
alter table public.order_items enable row level security;

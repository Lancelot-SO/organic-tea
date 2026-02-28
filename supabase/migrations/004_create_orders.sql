-- ============================================================
-- 004: Create orders table
-- ============================================================

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled')),
  subtotal numeric(10,2) not null default 0,
  shipping_fee numeric(10,2) not null default 0,
  tax numeric(10,2) not null default 0,
  total numeric(10,2) not null default 0,
  payment_method text
    check (payment_method in ('paystack', 'momo', 'cash_on_delivery')),
  payment_reference text,
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'success', 'failed')),
  shipping_name text,
  shipping_phone text,
  shipping_address text,
  shipping_city text,
  shipping_region text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes
create index idx_orders_user on public.orders(user_id);
create index idx_orders_status on public.orders(status);
create index idx_orders_payment_status on public.orders(payment_status);
create index idx_orders_created on public.orders(created_at desc);

-- Updated_at trigger
create trigger orders_updated_at
  before update on public.orders
  for each row execute function public.update_updated_at();

-- Enable RLS
alter table public.orders enable row level security;

-- ============================================================
-- 006: Create reviews table (optional / future)
-- ============================================================

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  rating int not null check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamptz not null default now()
);

-- Prevent duplicate reviews
create unique index idx_reviews_unique on public.reviews(product_id, user_id);

-- Enable RLS
alter table public.reviews enable row level security;

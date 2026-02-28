-- Add is_best_seller column to products table
alter table public.products 
add column if not exists is_best_seller boolean not null default false;

-- Add index for performance on homepage queries
create index if not exists idx_products_best_seller on public.products(is_best_seller) where is_published = true;

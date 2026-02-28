-- Add sales_count column to products table
alter table public.products 
add column if not exists sales_count int not null default 0;

-- Add index for performance on homepage queries
create index if not exists idx_products_sales_count on public.products(sales_count desc) where is_published = true;

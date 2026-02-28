-- ============================================================
-- 007: Row-Level Security Policies
-- ============================================================

-- Helper function: check if user is admin
create or replace function public.is_admin()
returns boolean
language plpgsql
security definer set search_path = public
as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
end;
$$;

-- ========================
-- PROFILES
-- ========================

-- Users can read their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Admins can view all profiles
create policy "Admins can view all profiles"
  on public.profiles for select
  using (is_admin());

-- ========================
-- CATEGORIES
-- ========================

-- Anyone can read categories (public catalog)
create policy "Public can view categories"
  on public.categories for select
  using (true);

-- Admins can manage categories
create policy "Admins can insert categories"
  on public.categories for insert
  with check (is_admin());

create policy "Admins can update categories"
  on public.categories for update
  using (is_admin());

create policy "Admins can delete categories"
  on public.categories for delete
  using (is_admin());

-- ========================
-- PRODUCTS
-- ========================

-- Anyone can view published products
create policy "Public can view published products"
  on public.products for select
  using (is_published = true);

-- Admins can view all products (including drafts)
create policy "Admins can view all products"
  on public.products for select
  using (is_admin());

-- Admins can manage products
create policy "Admins can insert products"
  on public.products for insert
  with check (is_admin());

create policy "Admins can update products"
  on public.products for update
  using (is_admin());

create policy "Admins can delete products"
  on public.products for delete
  using (is_admin());

-- ========================
-- ORDERS
-- ========================

-- Users can view their own orders
create policy "Users can view own orders"
  on public.orders for select
  using (auth.uid() = user_id);

-- Users can create their own orders
create policy "Users can create own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

-- Admins can view all orders
create policy "Admins can view all orders"
  on public.orders for select
  using (is_admin());

-- Admins can update orders (status changes)
create policy "Admins can update orders"
  on public.orders for update
  using (is_admin());

-- ========================
-- ORDER ITEMS
-- ========================

-- Users can view their own order items (via join to orders)
create policy "Users can view own order items"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- Users can insert order items for their own orders
create policy "Users can insert own order items"
  on public.order_items for insert
  with check (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- Admins can view all order items
create policy "Admins can view all order items"
  on public.order_items for select
  using (is_admin());

-- ========================
-- REVIEWS
-- ========================

-- Anyone can read reviews
create policy "Public can view reviews"
  on public.reviews for select
  using (true);

-- Authenticated users can create reviews
create policy "Authenticated users can create reviews"
  on public.reviews for insert
  with check (auth.uid() = user_id);

-- Users can update their own reviews
create policy "Users can update own reviews"
  on public.reviews for update
  using (auth.uid() = user_id);

-- Users can delete their own reviews
create policy "Users can delete own reviews"
  on public.reviews for delete
  using (auth.uid() = user_id);

-- Admins can delete any review
create policy "Admins can delete reviews"
  on public.reviews for delete
  using (is_admin());

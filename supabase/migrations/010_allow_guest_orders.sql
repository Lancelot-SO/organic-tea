-- ============================================================
-- 010: Allow guest orders by making user_id nullable
-- ============================================================

-- 1. Make user_id nullable
alter table public.orders alter column user_id drop not null;

-- 2. Update RLS policies
-- Note: We need to allow public inserts for guest orders
drop policy if exists "Users can create their own orders" on public.orders;

create policy "Anyone can create an order"
  on public.orders for insert
  with check (true);

-- Users can still see their own orders
drop policy if exists "Users can view their own orders" on public.orders;

create policy "Users can view their own orders"
  on public.orders for select
  using (
    auth.uid() = user_id 
    OR 
    user_id is null -- Allow guests to see guest orders for confirmation
  );

drop policy if exists "Anyone can update order status" on public.orders;
create policy "Anyone can update order status"
  on public.orders for update
  using (user_id is null)
  with check (user_id is null);

-- 3. Update order_items RLS policies
drop policy if exists "Users can view own order items" on public.order_items;
create policy "Anyone can view order items"
  on public.order_items for select
  using (true); -- Usually fine for public catalog or if joined properly

drop policy if exists "Users can insert own order items" on public.order_items;
create policy "Anyone can insert order items"
  on public.order_items for insert
  with check (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      -- Remove the user_id = auth.uid() check to allow guests
    )
  );

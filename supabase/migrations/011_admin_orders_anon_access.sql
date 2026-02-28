-- ============================================================
-- 011: Allow anon role to read all orders (for admin dashboard)
-- ============================================================
-- The admin dashboard uses its own auth system (not Supabase Auth),
-- so the Supabase client runs as the anon role. We need anon to be
-- able to read all orders and order_items for the dashboard to work.
-- The dashboard is protected at the application level.

-- Allow anon to read all orders
drop policy if exists "Anon can read all orders" on public.orders;
create policy "Anon can read all orders"
  on public.orders for select
  to anon
  using (true);

-- Allow anon to update orders (for payment status updates from guest checkout)
drop policy if exists "Anon can update orders" on public.orders;
create policy "Anon can update orders"
  on public.orders for update
  to anon
  using (true)
  with check (true);

-- Allow anon to read all order items
drop policy if exists "Anon can read all order items" on public.order_items;
create policy "Anon can read all order items"
  on public.order_items for select
  to anon
  using (true);

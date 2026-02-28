-- ============================================================
-- 012: Fix Order RLS for Authenticated Users
-- ============================================================

-- Allow authenticated users to update their own orders
-- This is needed for the payment status update after successful Paystack transaction
drop policy if exists "Users can update their own orders" on public.orders;
create policy "Users can update their own orders"
  on public.orders for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Ensure authenticated users can also view their own orders 
-- (This should already work but making it explicit for the 'authenticated' role)
drop policy if exists "Authenticated users can view own orders" on public.orders;
create policy "Authenticated users can view own orders"
  on public.orders for select
  to authenticated
  using (auth.uid() = user_id);

-- Also allow authenticated users (guests) to see all order items 
-- to avoid issues with joins
drop policy if exists "Authenticated users can view order items" on public.order_items;
create policy "Authenticated users can view order items"
  on public.order_items for select
  to authenticated
  using (true);

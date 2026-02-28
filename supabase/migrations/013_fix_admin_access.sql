-- ============================================================
-- 013: Fix Admin Access & Policy Cleanup
-- ============================================================

-- 1. Ensure the is_admin function is robust
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

-- 2. Explicitly allow admins to view all orders (Override any previous restricted policies)
drop policy if exists "Admins can view all orders" on public.orders;
create policy "Admins can view all orders"
  on public.orders for select
  to authenticated
  using (is_admin());

-- 3. Explicitly allow admins to update all orders
drop policy if exists "Admins can update orders" on public.orders;
create policy "Admins can update orders"
  on public.orders for update
  to authenticated
  using (is_admin());

-- 4. Explicitly allow admins to view all order items
drop policy if exists "Admins can view all order items" on public.order_items;
create policy "Admins can view all order items"
  on public.order_items for select
  to authenticated
  using (is_admin());

-- 5. Ensure the current developer user has the admin role
-- ID from logs: 1dbd7d9a-90f8-4f28-9374-2e187dbd6574
update public.profiles 
set role = 'admin' 
where id = '1dbd7d9a-90f8-4f28-9374-2e187dbd6574';

-- 6. Also allow anon role for the dashboard if it runs in that context 
-- (Migration 011 already did this, but let's ensure it's not conflicting)
-- If the dashboard uses the user's session, then 'authenticated' policies above take precedence.

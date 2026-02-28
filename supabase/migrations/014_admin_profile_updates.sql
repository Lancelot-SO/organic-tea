-- ============================================================
-- 014: Admin Profile Update Access
-- ============================================================

-- 1. Explicitly allow admins to update all profiles
drop policy if exists "Admins can update all profiles" on public.profiles;
create policy "Admins can update all profiles"
  on public.profiles for update
  to authenticated
  using (is_admin());

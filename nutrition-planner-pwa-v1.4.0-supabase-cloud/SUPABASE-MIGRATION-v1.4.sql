-- Nutrition Planner v1.4 cloud-state migration
-- Run once in Supabase -> SQL Editor.

begin;

create table if not exists public.user_app_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  profile jsonb not null default '{}'::jsonb,
  fridge jsonb not null default '[]'::jsonb,
  logs jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_app_state enable row level security;

drop policy if exists "Users manage own app state" on public.user_app_state;
create policy "Users manage own app state"
on public.user_app_state
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

grant select, insert, update, delete
on public.user_app_state
to authenticated;

commit;

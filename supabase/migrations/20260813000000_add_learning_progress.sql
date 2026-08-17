create table public.lesson_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  level text not null check (level in ('A1', 'A2', 'B1', 'B2')),
  lesson_number integer not null check (lesson_number between 1 and 12),
  section text not null check (section in ('vocabulary', 'writing', 'reading', 'listening', 'speaking')),
  score integer not null check (score >= 0),
  total integer not null check (total > 0 and score <= total),
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (user_id, level, lesson_number, section)
);

alter table public.lesson_results enable row level security;

create policy "read own lesson results" on public.lesson_results
  for select using (auth.uid() = user_id);
create policy "insert own lesson results" on public.lesson_results
  for insert with check (auth.uid() = user_id);
create policy "update own lesson results" on public.lesson_results
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
grant select, insert, update on public.lesson_results to authenticated;

create table public.level_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  level text not null check (level in ('A1', 'A2', 'B1', 'B2')),
  score integer not null check (score >= 0),
  total integer not null default 10 check (total = 10 and score <= total),
  passed boolean not null default false,
  attempts integer not null default 1 check (attempts > 0),
  updated_at timestamptz not null default now(),
  unique (user_id, level),
  check (passed = (score >= 8))
);

alter table public.level_results enable row level security;

create policy "read own level results" on public.level_results
  for select using (auth.uid() = user_id);
create policy "insert own level results" on public.level_results
  for insert with check (auth.uid() = user_id);
create policy "update own level results" on public.level_results
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
grant select, insert, update on public.level_results to authenticated;

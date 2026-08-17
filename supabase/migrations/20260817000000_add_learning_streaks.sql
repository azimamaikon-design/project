create table public.learning_streaks (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  current_streak integer not null default 1 check (current_streak >= 0),
  longest_streak integer not null default 1 check (longest_streak >= current_streak),
  last_activity_date date not null,
  updated_at timestamptz not null default now()
);

alter table public.learning_streaks enable row level security;

create policy "read own learning streak" on public.learning_streaks
  for select using (auth.uid() = user_id);
create policy "insert own learning streak" on public.learning_streaks
  for insert with check (auth.uid() = user_id);
create policy "update own learning streak" on public.learning_streaks
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

grant select, insert, update on public.learning_streaks to authenticated;

create or replace function public.record_learning_activity()
returns table (current_streak integer, longest_streak integer, last_activity_date date)
language plpgsql
security invoker
set search_path = public
as $$
declare
  activity_date date := timezone('Asia/Qyzylorda', now())::date;
begin
  return query
  insert into public.learning_streaks as streak (user_id, current_streak, longest_streak, last_activity_date)
  values (auth.uid(), 1, 1, activity_date)
  on conflict (user_id) do update set
    current_streak = case
      when streak.last_activity_date = activity_date then streak.current_streak
      when streak.last_activity_date = activity_date - 1 then streak.current_streak + 1
      else 1
    end,
    longest_streak = greatest(
      streak.longest_streak,
      case
        when streak.last_activity_date = activity_date then streak.current_streak
        when streak.last_activity_date = activity_date - 1 then streak.current_streak + 1
        else 1
      end
    ),
    last_activity_date = activity_date,
    updated_at = now()
  returning streak.current_streak, streak.longest_streak, streak.last_activity_date;
end;
$$;

revoke all on function public.record_learning_activity() from public;
grant execute on function public.record_learning_activity() to authenticated;

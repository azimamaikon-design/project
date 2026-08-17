do $$
declare item record;
begin
  for item in
    select conname
    from pg_constraint
    where conrelid = 'public.level_results'::regclass
      and contype = 'c'
      and (
        pg_get_constraintdef(oid) like '%total = 10%'
        or pg_get_constraintdef(oid) like '%score >= 8%'
      )
  loop
    execute format('alter table public.level_results drop constraint %I', item.conname);
  end loop;
end $$;

alter table public.level_results add constraint level_results_total_check
  check (total > 0 and score <= total);
alter table public.level_results add constraint level_results_passed_check
  check (passed = (score::numeric / total >= 0.8));

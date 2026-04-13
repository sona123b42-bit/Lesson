create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text unique,
  role text not null default 'student' check (role in ('student', 'partner', 'admin')),
  paired_student_id uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  track_id text not null,
  module_title text not null,
  lesson_title text not null,
  status text not null default 'Not started' check (status in ('Not started', 'In progress', 'Done')),
  minutes integer not null default 0 check (minutes >= 0),
  passed_test boolean not null default false,
  passed_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (user_id, track_id, module_title, lesson_title)
);

create table if not exists public.track_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  track_id text not null,
  unlocked boolean not null default false,
  completed boolean not null default false,
  reward_claimed boolean not null default false,
  completed_levels integer not null default 0 check (completed_levels >= 0),
  score integer not null default 0 check (score >= 0),
  wallet_award integer not null default 0 check (wallet_award >= 0),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (user_id, track_id)
);

create table if not exists public.study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  track_id text not null,
  session_date date not null,
  minutes integer not null check (minutes > 0),
  note text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.reflections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  track_id text not null,
  module_title text not null,
  reflection_date date not null,
  confidence integer not null check (confidence between 1 and 5),
  learned text not null,
  next_focus text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.app_settings (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  wallet integer not null default 0 check (wallet >= 0),
  active_track_id text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists lesson_progress_user_idx on public.lesson_progress (user_id);
create index if not exists lesson_progress_track_idx on public.lesson_progress (track_id);
create index if not exists track_progress_user_idx on public.track_progress (user_id);
create index if not exists study_sessions_user_idx on public.study_sessions (user_id, session_date desc);
create index if not exists reflections_user_idx on public.reflections (user_id, reflection_date desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_lesson_progress_updated_at on public.lesson_progress;
create trigger set_lesson_progress_updated_at
before update on public.lesson_progress
for each row execute function public.set_updated_at();

drop trigger if exists set_track_progress_updated_at on public.track_progress;
create trigger set_track_progress_updated_at
before update on public.track_progress
for each row execute function public.set_updated_at();

drop trigger if exists set_app_settings_updated_at on public.app_settings;
create trigger set_app_settings_updated_at
before update on public.app_settings
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;

  insert into public.app_settings (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.track_progress enable row level security;
alter table public.study_sessions enable row level security;
alter table public.reflections enable row level security;
alter table public.app_settings enable row level security;

drop policy if exists "profiles_select_own_or_paired" on public.profiles;
create policy "profiles_select_own_or_paired"
on public.profiles
for select
using (
  auth.uid() = id
  or auth.uid() = paired_student_id
  or exists (
    select 1
    from public.profiles viewer
    where viewer.id = auth.uid()
      and viewer.paired_student_id = profiles.id
  )
);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "lesson_progress_select_own_or_paired" on public.lesson_progress;
create policy "lesson_progress_select_own_or_paired"
on public.lesson_progress
for select
using (
  auth.uid() = user_id
  or exists (
    select 1
    from public.profiles viewer
    where viewer.id = auth.uid()
      and viewer.paired_student_id = lesson_progress.user_id
  )
);

drop policy if exists "lesson_progress_insert_own" on public.lesson_progress;
create policy "lesson_progress_insert_own"
on public.lesson_progress
for insert
with check (auth.uid() = user_id);

drop policy if exists "lesson_progress_update_own" on public.lesson_progress;
create policy "lesson_progress_update_own"
on public.lesson_progress
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "track_progress_select_own_or_paired" on public.track_progress;
create policy "track_progress_select_own_or_paired"
on public.track_progress
for select
using (
  auth.uid() = user_id
  or exists (
    select 1
    from public.profiles viewer
    where viewer.id = auth.uid()
      and viewer.paired_student_id = track_progress.user_id
  )
);

drop policy if exists "track_progress_insert_own" on public.track_progress;
create policy "track_progress_insert_own"
on public.track_progress
for insert
with check (auth.uid() = user_id);

drop policy if exists "track_progress_update_own" on public.track_progress;
create policy "track_progress_update_own"
on public.track_progress
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "study_sessions_select_own_or_paired" on public.study_sessions;
create policy "study_sessions_select_own_or_paired"
on public.study_sessions
for select
using (
  auth.uid() = user_id
  or exists (
    select 1
    from public.profiles viewer
    where viewer.id = auth.uid()
      and viewer.paired_student_id = study_sessions.user_id
  )
);

drop policy if exists "study_sessions_insert_own" on public.study_sessions;
create policy "study_sessions_insert_own"
on public.study_sessions
for insert
with check (auth.uid() = user_id);

drop policy if exists "study_sessions_update_own" on public.study_sessions;
create policy "study_sessions_update_own"
on public.study_sessions
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "study_sessions_delete_own" on public.study_sessions;
create policy "study_sessions_delete_own"
on public.study_sessions
for delete
using (auth.uid() = user_id);

drop policy if exists "reflections_select_own_or_paired" on public.reflections;
create policy "reflections_select_own_or_paired"
on public.reflections
for select
using (
  auth.uid() = user_id
  or exists (
    select 1
    from public.profiles viewer
    where viewer.id = auth.uid()
      and viewer.paired_student_id = reflections.user_id
  )
);

drop policy if exists "reflections_insert_own" on public.reflections;
create policy "reflections_insert_own"
on public.reflections
for insert
with check (auth.uid() = user_id);

drop policy if exists "reflections_update_own" on public.reflections;
create policy "reflections_update_own"
on public.reflections
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "reflections_delete_own" on public.reflections;
create policy "reflections_delete_own"
on public.reflections
for delete
using (auth.uid() = user_id);

drop policy if exists "app_settings_select_own_or_paired" on public.app_settings;
create policy "app_settings_select_own_or_paired"
on public.app_settings
for select
using (
  auth.uid() = user_id
  or exists (
    select 1
    from public.profiles viewer
    where viewer.id = auth.uid()
      and viewer.paired_student_id = app_settings.user_id
  )
);

drop policy if exists "app_settings_insert_own" on public.app_settings;
create policy "app_settings_insert_own"
on public.app_settings
for insert
with check (auth.uid() = user_id);

drop policy if exists "app_settings_update_own" on public.app_settings;
create policy "app_settings_update_own"
on public.app_settings
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
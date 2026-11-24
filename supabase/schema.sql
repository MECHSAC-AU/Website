-- ========================================================
-- MECHSAC SUPABASE DATABASE SCHEMA
-- Aliah University Department of Mechanical Engineering
-- ========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. ADMIN ALLOWLIST TABLE
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  github_username text,
  role text default 'admin',
  created_at timestamptz default now()
);

-- 2. TEAM MEMBERS TABLE
create table if not exists public.members (
  id text primary key,
  name text not null,
  role text not null,
  category text not null, -- 'Lead', 'Executive', 'Core Team', 'Junior Engineer'
  department text,
  year text,
  specialization text,
  image text,
  bio text,
  social jsonb default '{}'::jsonb,
  display_order int default 0,
  created_at timestamptz default now()
);

-- 3. EVENTS TABLE
create table if not exists public.events (
  id text primary key,
  title text not null,
  category text default 'Inauguration',
  date text not null,
  day text,
  month text,
  year text,
  time text,
  location text not null,
  room text,
  image text,
  description text not null,
  seats text,
  tags text[] default '{}',
  featured boolean default false,
  is_past boolean default false,
  created_at timestamptz default now()
);

-- 4. SPONSORS TABLE
create table if not exists public.sponsors (
  id text primary key,
  name text not null,
  logo text,
  description text,
  website text,
  partnership_year text default '2026',
  display_order int default 0,
  created_at timestamptz default now()
);

-- 5. CONTRIBUTORS TABLE
create table if not exists public.contributors (
  id text primary key,
  name text not null,
  photo text,
  role text not null, -- 'Faculty', 'Mentor', 'Individual Supporter', 'Alumni'
  designation text,
  department text,
  organization text,
  contribution_message text,
  year text default '2026',
  social jsonb default '{}'::jsonb,
  display_order int default 0,
  created_at timestamptz default now()
);

-- 6. GALLERY TABLE
create table if not exists public.gallery (
  id text primary key,
  title text not null,
  category text default 'Workshop',
  image text not null,
  date text,
  location text,
  caption text,
  created_at timestamptz default now()
);

-- 7. JOIN CLUB / MEMBERSHIP APPLICATIONS
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text default 'Application for Student Engineering Team',
  interest text default 'Recruitment',
  message text not null,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  admin_notes text,
  created_at timestamptz default now(),
  reviewed_at timestamptz
);

-- 8. EVENT REGISTRATIONS
create table if not exists public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id text not null,
  event_title text not null,
  name text not null,
  email text not null,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  admin_notes text,
  created_at timestamptz default now(),
  reviewed_at timestamptz
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

-- Enable RLS on all tables
alter table public.admin_users enable row level security;
alter table public.members enable row level security;
alter table public.events enable row level security;
alter table public.sponsors enable row level security;
alter table public.contributors enable row level security;
alter table public.gallery enable row level security;
alter table public.applications enable row level security;
alter table public.event_registrations enable row level security;

-- Function to check if current authenticated user is an authorized admin
create or replace function public.is_admin()
returns boolean security definer as $$
begin
  return exists (
    select 1 from public.admin_users
    where email = auth.jwt() ->> 'email'
  );
end;
$$ language plpgsql;

-- Admin Users Table Policies
create policy "Admin users viewable only by admins"
  on public.admin_users for select using (public.is_admin());

-- Public Content Tables (Members, Events, Sponsors, Contributors, Gallery)
-- Everyone can read
create policy "Members public read" on public.members for select using (true);
create policy "Events public read" on public.events for select using (true);
create policy "Sponsors public read" on public.sponsors for select using (true);
create policy "Contributors public read" on public.contributors for select using (true);
create policy "Gallery public read" on public.gallery for select using (true);

-- Only admins can insert, update, delete public content
create policy "Members admin insert" on public.members for insert with check (public.is_admin());
create policy "Members admin update" on public.members for update using (public.is_admin());
create policy "Members admin delete" on public.members for delete using (public.is_admin());

create policy "Events admin insert" on public.events for insert with check (public.is_admin());
create policy "Events admin update" on public.events for update using (public.is_admin());
create policy "Events admin delete" on public.events for delete using (public.is_admin());

create policy "Sponsors admin insert" on public.sponsors for insert with check (public.is_admin());
create policy "Sponsors admin update" on public.sponsors for update using (public.is_admin());
create policy "Sponsors admin delete" on public.sponsors for delete using (public.is_admin());

create policy "Contributors admin insert" on public.contributors for insert with check (public.is_admin());
create policy "Contributors admin update" on public.contributors for update using (public.is_admin());
create policy "Contributors admin delete" on public.contributors for delete using (public.is_admin());

create policy "Gallery admin insert" on public.gallery for insert with check (public.is_admin());
create policy "Gallery admin update" on public.gallery for update using (public.is_admin());
create policy "Gallery admin delete" on public.gallery for delete using (public.is_admin());

-- Applications Table: Public can submit; only admins can view and update status
create policy "Applications public insert" on public.applications for insert with check (true);
create policy "Applications admin read" on public.applications for select using (public.is_admin());
create policy "Applications admin update" on public.applications for update using (public.is_admin());
create policy "Applications admin delete" on public.applications for delete using (public.is_admin());

-- Event Registrations Table: Public can submit; only admins can view and update status
create policy "Event Registrations public insert" on public.event_registrations for insert with check (true);
create policy "Event Registrations admin read" on public.event_registrations for select using (public.is_admin());
create policy "Event Registrations admin update" on public.event_registrations for update using (public.is_admin());
create policy "Event Registrations admin delete" on public.event_registrations for delete using (public.is_admin());

-- ========================================================
-- STORAGE BUCKETS CONFIGURATION
-- ========================================================
-- Run in Supabase Storage or Dashboard:
-- 1. Create a public bucket: 'mechsac-media'
-- 2. Add Storage RLS: Public read, Authenticated admin insert/update/delete
insert into storage.buckets (id, name, public)
values ('mechsac-media', 'mechsac-media', true)
on conflict (id) do nothing;

create policy "Media public read"
  on storage.objects for select
  using (bucket_id = 'mechsac-media');

create policy "Media admin upload"
  on storage.objects for insert
  with check (bucket_id = 'mechsac-media' and public.is_admin());

create policy "Media admin update"
  on storage.objects for update
  using (bucket_id = 'mechsac-media' and public.is_admin());

create policy "Media admin delete"
  on storage.objects for delete
  using (bucket_id = 'mechsac-media' and public.is_admin());

-- ========================================================
-- INITIAL SEED DATA
-- ========================================================

-- Insert Initial Authorized Admin
insert into public.admin_users (email, role)
values ('mechsac.au@gmail.com', 'admin')
on conflict (email) do nothing;

-- Insert Inaugural Event
insert into public.events (
  id, title, category, date, day, month, year, time, location, room, image, description, seats, tags, featured
) values (
  'evt-01',
  'Grand Inauguration of MECHSAC – Department of Mechanical Engineering',
  'Inauguration',
  'Dates will be announced',
  'TBA',
  'DATE',
  '2026',
  'Schedule will be announced',
  'Department of Mechanical Engineering, Aliah University',
  'Main Auditorium, Aliah University',
  '/images/events/event-01.jpg',
  'The official grand inauguration ceremony of MECHSAC (Mechanical Engineering Students Automobile Club) under the Department of Mechanical Engineering, Aliah University. Unveiling our mission, executive committee, student engineering divisions, and upcoming technical initiatives.',
  'Open to All Students & Faculty',
  array['MECHSAC', 'Grand Inauguration', 'Mechanical Engineering', 'Aliah University'],
  true
) on conflict (id) do nothing;

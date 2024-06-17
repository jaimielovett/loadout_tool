create table
chassis (
  id bigint primary key generated always as identity,
  name text,
  mass integer,
  created_at timestamptz default now()
)

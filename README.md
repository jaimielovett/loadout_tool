## Supabase

### Start supabase services

Initialise Supabase to set up the configuration for developing locally:
`supabase init`

The start command uses Docker to start the Supabase services.
This command takes a while to run if it's the first time using the CLI:
`supabase start`

You can use `supabase stop` at any time to stop all services (without resetting your local database). Use `supabase stop --no-backup` to stop all services and reset the local database.

### Access the projects services

You can now visit the local Supabase dashboard at `http://localhost:54323`. To access the database you can use any Postgres client and access it via `postgresql://postgres:postgres@localhost:54322/postgres`.

### Database migrations

Database changes are managed through migrations.

To generate a new migration run `supabase migration new <migration_name>`.

The migration file will get created in `supabase/migrations/<timestamp>_<migraiton_name>`. Edit the file and add SQL to create tables:

```
create table
employees (
id bigint primary key generated always as identity,
name text,
email text,
created_at timestamptz default now()
);
```

Apply the migration by running `supabase db reset`.

### Link your project

Associate your project using `supabase link`.

```
supabase link --project-ref <project-id>

# To apply the new migration to your local database:
supabase migration up

# To reset your local database completely:
supabase db reset
```

### Deploy database changes

Deploy any local database changes using `supabase db push`.

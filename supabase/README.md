# Supabase Database Setup

This directory contains all database migrations for the Continu8 platform.

## Prerequisites

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Install the Supabase CLI: `npm install -g supabase`
3. Copy `.env.example` to `.env.local` and add your Supabase credentials

## Running Migrations

### Option 1: Using Supabase Dashboard (Recommended for first setup)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run each migration file in order:
   - `00001_initial_schema.sql`
   - `00002_crm_tables.sql`
   - `00003_ticketing_tables.sql`
   - `00004_rls_policies.sql`
   - `00005_functions_triggers.sql`

### Option 2: Using Supabase CLI

```bash
# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

## Migration Files

### 00001_initial_schema.sql
- Creates `profiles` table (extends auth.users)
- Creates `team_members` table
- Sets up basic indexes

### 00002_crm_tables.sql
- Creates CRM tables: `leads`, `clients`, `contacts`, `deals`, `activities`, `bookings`
- Sets up all foreign keys and indexes
- Implements lead scoring fields

### 00003_ticketing_tables.sql
- Creates ticketing tables: `tickets`, `ticket_comments`, `ticket_attachments`
- Creates `audit_logs` table for compliance
- Sets up SLA tracking fields

### 00004_rls_policies.sql
- Enables Row Level Security (RLS) on all tables
- Creates helper functions for role checking
- Implements comprehensive security policies:
  - Team members: Full access to their scope
  - Clients: Only their own data
  - Public: No direct access

### 00005_functions_triggers.sql
- Auto-update `updated_at` timestamps
- Lead scoring calculation (automatic)
- SLA calculation for tickets
- Auto-assignment of tickets and leads
- Audit logging triggers
- Utility functions

## Security Model

### Roles
- **admin**: Full access (CRM, tickets, team management)
- **sales**: CRM access (leads, clients, deals)
- **support**: Ticket access, client view
- **client**: Portal only (their tickets, profile)

### Row Level Security
All tables have RLS enabled. Policies ensure:
- Team members can only access data within their scope
- Clients can only see their own tickets and profile
- No direct database access for public users

## Supabase Storage

Create a storage bucket for ticket attachments:

1. Go to **Storage** in Supabase dashboard
2. Create bucket: `ticket-attachments`
3. Set policy to allow authenticated users to upload/read

## Post-Migration Setup

After running migrations:

1. **Create your first admin user:**
   ```sql
   -- Insert admin profile (use actual user ID from auth.users)
   INSERT INTO public.profiles (id, email, full_name, role)
   VALUES ('your-user-id', 'admin@continu8.co.za', 'Admin User', 'admin');

   INSERT INTO public.team_members (id, department, position, is_active)
   VALUES ('your-user-id', 'Management', 'Administrator', true);
   ```

2. **Verify RLS policies** are working by testing different user roles

3. **Test database functions:**
   ```sql
   -- Test lead scoring
   SELECT public.calculate_lead_score(
     '100m-200m',
     '100-200',
     '100k+',
     'sole'
   ); -- Should return high score

   -- Test SLA calculation
   SELECT public.calculate_sla_due('urgent', NOW());
   ```

## TypeScript Types

Generate TypeScript types from your schema:

```bash
npx supabase gen types typescript --project-id your-project-ref > src/types/database.ts
```

## Troubleshooting

### Migration fails with "relation already exists"
- Drop the existing tables or reset the database
- Ensure migrations run in order

### RLS policies blocking queries
- Check that user has correct role in `profiles` table
- Verify `auth.uid()` matches the user's ID
- Use Supabase dashboard SQL editor to test policies

### Functions not working
- Ensure all previous migrations completed successfully
- Check function permissions (SECURITY DEFINER vs INVOKER)

## Development vs Production

- **Development**: Use Supabase local development with `supabase start`
- **Production**: Run migrations against your hosted Supabase project

## Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Migrations Guide](https://supabase.com/docs/guides/cli/local-development#database-migrations)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

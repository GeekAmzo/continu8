# Supabase Setup Guide

## Current Status ✅

The Supabase CLI has been installed and configured for your project:
- **Project ID**: dlofdqcyraldukqyeoan
- **Supabase URL**: https://dlofdqcyraldukqyeoan.supabase.co
- **Configuration**: Created in `/supabase/config.toml`
- **Migrations**: Ready (5 migration files)

## Next Steps

### Step 1: Get Your Service Role Key

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/dlofdqcyraldukqyeoan/settings/api

2. Copy the **service_role** key (under "Project API keys" section)

3. Update `.env.local` file:
   ```bash
   # Replace the placeholder with your actual service role key
   SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here
   ```

**⚠️ SECURITY WARNING**: Never commit the service role key to Git! It has full admin access to your database.

### Step 2: Get Supabase Access Token

To link the CLI with your project, you need an access token:

**Option A: Generate from Dashboard**
1. Go to https://supabase.com/dashboard/account/tokens
2. Click "Generate new token"
3. Give it a name like "Local Development"
4. Copy the token
5. Run in terminal:
   ```bash
   export SUPABASE_ACCESS_TOKEN=your_access_token_here
   ```

**Option B: Interactive Login**
1. Open a new terminal window
2. Run:
   ```bash
   cd /Users/it/dev/c8
   supabase login
   ```
3. This will open a browser for authentication

### Step 3: Link Your Project

Once you have the access token set, link the project:

```bash
cd /Users/it/dev/c8
supabase link --project-ref dlofdqcyraldukqyeoan
```

### Step 4: Run Database Migrations

After linking, push the migrations to your Supabase database:

```bash
cd /Users/it/dev/c8
supabase db push
```

This will create all the tables:
- ✅ `profiles` - User profiles and roles
- ✅ `team_members` - Internal team metadata
- ✅ `leads` - Sales leads from website
- ✅ `clients` - Active clients
- ✅ `contacts` - Client contacts (linked to portal access)
- ✅ `deals` - Sales pipeline
- ✅ `activities` - Timeline events
- ✅ `tickets` - Support tickets
- ✅ `ticket_comments` - Comment threads
- ✅ `ticket_attachments` - File uploads
- ✅ `bookings` - Strategy call scheduling
- ✅ All RLS policies
- ✅ All functions and triggers

### Step 5: Create Storage Bucket

Create the storage bucket for ticket attachments:

**Option A: Via Supabase Dashboard**
1. Go to https://supabase.com/dashboard/project/dlofdqcyraldukqyeoan/storage/buckets
2. Click "New bucket"
3. Name: `ticket-attachments`
4. Public: `Yes` (checked)
5. Click "Create bucket"
6. Go to "Policies" tab for the bucket
7. Add policies:

```sql
-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'ticket-attachments');

-- Allow authenticated users to read files
CREATE POLICY "Authenticated users can read"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'ticket-attachments');

-- Allow public read access (for ticket attachments in emails)
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'ticket-attachments');
```

**Option B: Via SQL Editor**
1. Go to https://supabase.com/dashboard/project/dlofdqcyraldukqyeoan/sql/new
2. Run this SQL:

```sql
-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'ticket-attachments',
  'ticket-attachments',
  true,
  10485760, -- 10MB
  ARRAY[
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
);

-- Create storage policies
CREATE POLICY "Authenticated users can upload ticket attachments"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'ticket-attachments');

CREATE POLICY "Authenticated users can read ticket attachments"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'ticket-attachments');

CREATE POLICY "Public can read ticket attachments"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'ticket-attachments');
```

### Step 6: Test the Connection

Restart your development server to pick up the new environment variables:

1. Stop the current dev server (Ctrl+C in the terminal running `npm run dev`)
2. Start it again:
   ```bash
   cd /Users/it/dev/c8
   npm run dev
   ```
3. Try logging in at http://localhost:3002/login
4. If you don't have a user yet, create one via Supabase Dashboard or Auth UI

### Step 7: Create Initial Admin User

**Option A: Via Supabase Dashboard**
1. Go to https://supabase.com/dashboard/project/dlofdqcyraldukqyeoan/auth/users
2. Click "Add user" → "Create new user"
3. Email: your@email.com
4. Password: (choose a strong password)
5. Click "Create user"
6. After user is created, go to SQL Editor
7. Run this to make them an admin:

```sql
-- Update the user's profile to admin role
UPDATE profiles
SET role = 'admin', full_name = 'Your Name'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'your@email.com'
);
```

**Option B: Via SQL Editor** (All in one)
1. Go to SQL Editor
2. Run:

```sql
-- Create auth user and profile in one go
DO $$
DECLARE
  user_id uuid;
BEGIN
  -- Insert into auth.users (you'll need to hash the password)
  -- For testing, you can use Supabase Dashboard to create the user
  -- Then run this to update their profile:

  UPDATE profiles
  SET
    role = 'admin',
    full_name = 'Admin User'
  WHERE email = 'admin@continu8.co.za';
END $$;
```

## Environment Variables Summary

Your `.env.local` should have:

```bash
# Supabase (✅ Already configured)
NEXT_PUBLIC_SUPABASE_URL=https://dlofdqcyraldukqyeoan.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=⚠️ REPLACE WITH YOUR ACTUAL KEY

# Resend (Optional - for email notifications)
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3002
```

## Verification Checklist

After completing all steps, verify:

- [ ] Can access Supabase dashboard
- [ ] Supabase CLI is linked (`supabase link --project-ref dlofdqcyraldukqyeoan` shows "Already linked")
- [ ] All migrations applied (check in Supabase Dashboard → Database → Tables)
- [ ] Storage bucket `ticket-attachments` exists
- [ ] Can log in to the app at http://localhost:3002/login
- [ ] Can view dashboard at http://localhost:3002/dashboard
- [ ] No console errors related to Supabase

## Migration Files

Located in `/supabase/migrations/`:

1. `00001_initial_schema.sql` - Profiles and base tables
2. `00002_crm_tables.sql` - CRM (leads, clients, contacts, deals, activities)
3. `00003_ticketing_tables.sql` - Ticketing system
4. `00004_rls_policies.sql` - Row Level Security
5. `00005_functions_triggers.sql` - Database functions and triggers

## Troubleshooting

### "Access token not provided"
- Make sure you've run `supabase login` or set `SUPABASE_ACCESS_TOKEN`

### "Project already linked"
- Run `supabase db push` to apply migrations

### "Migration failed"
- Check the SQL error message
- Ensure you have the correct database permissions
- Try running migrations individually in SQL Editor

### "Storage bucket already exists"
- This is fine, skip bucket creation
- Just verify policies are set correctly

### "Cannot connect to Supabase"
- Verify `NEXT_PUBLIC_SUPABASE_URL` in `.env.local`
- Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
- Restart dev server after changing `.env.local`

### "Fetch failed" errors in console
- This usually means placeholder credentials are still in use
- Update `.env.local` with real credentials
- Restart dev server

## Quick Start Command Summary

```bash
# 1. Set access token (after getting from dashboard)
export SUPABASE_ACCESS_TOKEN=your_token_here

# 2. Link project
cd /Users/it/dev/c8
supabase link --project-ref dlofdqcyraldukqyeoan

# 3. Push migrations
supabase db push

# 4. Restart dev server
npm run dev
```

## What's Next?

After Supabase is connected:

1. **Email Setup** (Optional):
   - Get Resend API key from https://resend.com
   - Add to `.env.local` as `RESEND_API_KEY`
   - Verify domain `continu8.co.za` in Resend dashboard
   - Test ticket creation with email notifications

2. **Create Test Data**:
   - Create a test lead via the booking form
   - Convert lead to client
   - Create a test ticket
   - Test the full workflow

3. **Deploy to Production**:
   - Push code to GitHub
   - Deploy to Vercel
   - Add environment variables to Vercel
   - Update Supabase redirect URLs for production domain

## Support Resources

- **Supabase Dashboard**: https://supabase.com/dashboard/project/dlofdqcyraldukqyeoan
- **Supabase Docs**: https://supabase.com/docs
- **Project Documentation**: `/docs/build-complete.md`
- **Ticketing System Docs**: `/docs/ticketing-system.md`

---

**Current Implementation Status**: 80% Complete
- ✅ Marketing website
- ✅ Design system
- ✅ Authentication structure
- ✅ Database schema
- ✅ CRM foundation
- ✅ Full ticketing system
- ✅ Client portal
- 🔄 **Supabase connection** (in progress)
- ⏳ Email integration (pending Resend setup)
- ⏳ Calendar integration (pending)

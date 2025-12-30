# Supabase Quick Start

## 🔑 Your Project Details

**Project ID**: `dlofdqcyraldukqyeoan`
**URL**: `https://dlofdqcyraldukqyeoan.supabase.co`
**Dashboard**: https://supabase.com/dashboard/project/dlofdqcyraldukqyeoan

---

## ⚡ Quick Setup (3 Steps)

### 1️⃣ Get Your Service Role Key

Go to: https://supabase.com/dashboard/project/dlofdqcyraldukqyeoan/settings/api

Copy the **service_role** key and update `.env.local`:

```bash
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here
```

⚠️ **Never commit this to Git!**

### 2️⃣ Link & Deploy Database

```bash
# Get access token
export SUPABASE_ACCESS_TOKEN=$(supabase login)

# Or get token from: https://supabase.com/dashboard/account/tokens

# Link project
supabase link --project-ref dlofdqcyraldukqyeoan

# Deploy migrations
supabase db push
```

### 3️⃣ Create Storage Bucket

Run this SQL in the SQL Editor:
https://supabase.com/dashboard/project/dlofdqcyraldukqyeoan/sql/new

```sql
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('ticket-attachments', 'ticket-attachments', true, 10485760);

CREATE POLICY "Authenticated upload" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'ticket-attachments');

CREATE POLICY "Public read" ON storage.objects
FOR SELECT TO public
USING (bucket_id = 'ticket-attachments');
```

---

## 👤 Create Admin User

1. Go to: https://supabase.com/dashboard/project/dlofdqcyraldukqyeoan/auth/users
2. Click "Add user" → Enter email and password
3. Run this SQL to make them admin:

```sql
UPDATE profiles
SET role = 'admin', full_name = 'Your Name'
WHERE id = (SELECT id FROM auth.users WHERE email = 'your@email.com');
```

---

## ✅ Test It

1. Restart dev server: `npm run dev`
2. Visit: http://localhost:3002/login
3. Log in with your admin user
4. Check dashboard loads correctly

---

## 📁 What Got Deployed

When you run `supabase db push`, these tables are created:

**CRM:**
- profiles, team_members, leads, clients, contacts, deals, activities

**Ticketing:**
- tickets, ticket_comments, ticket_attachments

**Other:**
- bookings, audit_logs

**Plus:**
- All RLS policies (security)
- All functions and triggers
- All indexes

---

## 🆘 Troubleshooting

**"Access token not provided"**
→ Run `supabase login` or set `SUPABASE_ACCESS_TOKEN`

**"Fetch failed" in browser console**
→ Make sure you updated `.env.local` with real service key
→ Restart dev server

**Can't log in**
→ Make sure you created a user in Supabase Auth
→ Check the user has `role = 'admin'` in profiles table

**Storage upload fails**
→ Make sure bucket `ticket-attachments` exists
→ Check storage policies are set

---

## 📖 Full Documentation

- **Detailed setup**: `/docs/supabase-setup.md`
- **Ticketing system**: `/docs/ticketing-system.md`
- **Build overview**: `/docs/build-complete.md`

---

## 🚀 Automated Setup

Run the setup script for guided installation:

```bash
./scripts/setup-supabase.sh
```

---

**Status**: Supabase CLI installed ✅ | Configuration created ✅ | Ready to link and deploy 🚀

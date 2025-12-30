#!/bin/bash

# Supabase Setup Script for Continu8
# This script helps complete the Supabase integration

set -e

echo "🚀 Continu8 - Supabase Setup"
echo "=============================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: Please run this script from the project root directory${NC}"
    exit 1
fi

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}Error: Supabase CLI is not installed${NC}"
    echo "Install it with: brew install supabase/tap/supabase"
    exit 1
fi

echo -e "${GREEN}✓${NC} Supabase CLI is installed ($(supabase --version))"
echo ""

# Check if already linked
if supabase projects list &> /dev/null; then
    echo -e "${GREEN}✓${NC} Supabase CLI is authenticated"
else
    echo -e "${YELLOW}⚠${NC}  Supabase CLI is not authenticated"
    echo ""
    echo "To authenticate, you have two options:"
    echo ""
    echo "Option 1: Get access token from dashboard"
    echo "  1. Go to: https://supabase.com/dashboard/account/tokens"
    echo "  2. Generate a new token"
    echo "  3. Run: export SUPABASE_ACCESS_TOKEN=your_token_here"
    echo ""
    echo "Option 2: Interactive login"
    echo "  Run: supabase login"
    echo ""
    echo "After authenticating, run this script again."
    exit 1
fi

echo ""
echo "📋 Project Information"
echo "====================="
echo "Project ID: dlofdqcyraldukqyeoan"
echo "URL: https://dlofdqcyraldukqyeoan.supabase.co"
echo "Dashboard: https://supabase.com/dashboard/project/dlofdqcyraldukqyeoan"
echo ""

# Check if project is linked
echo "🔗 Checking project link status..."
if [ -f "supabase/.temp/project-ref" ]; then
    PROJECT_REF=$(cat supabase/.temp/project-ref)
    if [ "$PROJECT_REF" = "dlofdqcyraldukqyeoan" ]; then
        echo -e "${GREEN}✓${NC} Project is already linked"
        LINKED=true
    else
        echo -e "${YELLOW}⚠${NC}  Project is linked to a different project: $PROJECT_REF"
        LINKED=false
    fi
else
    echo -e "${YELLOW}⚠${NC}  Project is not linked"
    LINKED=false
fi

if [ "$LINKED" = false ]; then
    echo ""
    read -p "Link to project dlofdqcyraldukqyeoan now? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Linking project..."
        supabase link --project-ref dlofdqcyraldukqyeoan
        echo -e "${GREEN}✓${NC} Project linked successfully"
    else
        echo -e "${RED}Aborted. Run manually: supabase link --project-ref dlofdqcyraldukqyeoan${NC}"
        exit 1
    fi
fi

echo ""
echo "📦 Checking database status..."

# Check if migrations need to be applied
echo "Found migrations:"
ls -1 supabase/migrations/ | while read migration; do
    echo "  - $migration"
done

echo ""
read -p "Apply migrations to remote database? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Applying migrations..."
    supabase db push
    echo -e "${GREEN}✓${NC} Migrations applied successfully"
else
    echo -e "${YELLOW}⚠${NC}  Skipped migration. Run manually: supabase db push"
fi

echo ""
echo "🗄️  Storage Setup"
echo "================"
echo "The ticketing system requires a storage bucket for file attachments."
echo ""
echo "To create the bucket, go to:"
echo "https://supabase.com/dashboard/project/dlofdqcyraldukqyeoan/storage/buckets"
echo ""
echo "Bucket name: ticket-attachments"
echo "Public: Yes"
echo ""
echo "Or run this SQL in the SQL Editor:"
echo ""
echo "INSERT INTO storage.buckets (id, name, public, file_size_limit)"
echo "VALUES ('ticket-attachments', 'ticket-attachments', true, 10485760);"
echo ""

echo ""
echo "🔐 Environment Variables"
echo "======================="

# Check .env.local
if [ -f ".env.local" ]; then
    echo -e "${GREEN}✓${NC} .env.local file exists"

    # Check if service role key is set
    if grep -q "SUPABASE_SERVICE_ROLE_KEY=.*placeholder" .env.local; then
        echo -e "${YELLOW}⚠${NC}  Service role key is not set (using placeholder)"
        echo ""
        echo "To get your service role key:"
        echo "1. Go to: https://supabase.com/dashboard/project/dlofdqcyraldukqyeoan/settings/api"
        echo "2. Copy the 'service_role' key"
        echo "3. Update SUPABASE_SERVICE_ROLE_KEY in .env.local"
        echo ""
        echo "⚠️  WARNING: Never commit this key to Git!"
    else
        echo -e "${GREEN}✓${NC} Service role key appears to be set"
    fi

    # Check if Resend is set
    if grep -q "RESEND_API_KEY=$" .env.local; then
        echo -e "${YELLOW}⚠${NC}  Resend API key is not set (email notifications disabled)"
        echo ""
        echo "To enable email notifications:"
        echo "1. Get API key from: https://resend.com"
        echo "2. Add RESEND_API_KEY to .env.local"
    else
        echo -e "${GREEN}✓${NC} Resend API key is set"
    fi
else
    echo -e "${RED}✗${NC} .env.local file not found"
    exit 1
fi

echo ""
echo "👤 User Setup"
echo "============"
echo "You need at least one admin user to access the dashboard."
echo ""
echo "To create an admin user:"
echo "1. Go to: https://supabase.com/dashboard/project/dlofdqcyraldukqyeoan/auth/users"
echo "2. Click 'Add user' → 'Create new user'"
echo "3. Set email and password"
echo "4. After creation, run this SQL to make them admin:"
echo ""
echo "UPDATE profiles SET role = 'admin', full_name = 'Your Name'"
echo "WHERE id = (SELECT id FROM auth.users WHERE email = 'your@email.com');"
echo ""

echo ""
echo "✅ Setup Progress"
echo "================"
echo ""
echo "Complete these steps:"
echo "  [ ] Supabase CLI authenticated"
echo "  [ ] Project linked"
echo "  [ ] Migrations applied"
echo "  [ ] Storage bucket created"
echo "  [ ] Service role key in .env.local"
echo "  [ ] Admin user created"
echo "  [ ] Can log in at http://localhost:3002/login"
echo ""
echo "Optional:"
echo "  [ ] Resend API key configured (for emails)"
echo "  [ ] Calendar API configured"
echo ""

echo -e "${GREEN}Setup script complete!${NC}"
echo ""
echo "📖 For detailed instructions, see: docs/supabase-setup.md"
echo ""
echo "🚀 Next steps:"
echo "  1. Restart your dev server: npm run dev"
echo "  2. Visit http://localhost:3002/login"
echo "  3. Test the application"
echo ""

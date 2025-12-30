# Continu8 - Business Systems & AI Automation Platform

A premium B2B SaaS marketing website with integrated CRM and support ticketing system built with Next.js 14, Supabase, and TypeScript.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui + Radix UI
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Forms:** react-hook-form + Zod
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Email:** Resend + React Email

## 📋 Prerequisites

- Node.js 18+ and npm
- A Supabase account and project
- Resend account for email notifications (optional for development)

## 🛠️ Getting Started

### 1. Clone and Install

```bash
git clone <your-repo>
cd c8
npm install
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env.local
```

Fill in your environment variables in `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Resend (for email)
RESEND_API_KEY=your_resend_api_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

Follow the instructions in [`supabase/README.md`](./supabase/README.md) to:
1. Create your Supabase project
2. Run the database migrations
3. Set up Row Level Security policies

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
/Users/it/dev/c8/
├── docs/                          # Project documentation
├── supabase/
│   └── migrations/                # Database migrations
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (marketing)/           # Public marketing pages
│   │   ├── (auth)/                # Authentication pages
│   │   ├── (dashboard)/           # Internal CRM dashboard
│   │   └── (client-portal)/       # Client portal
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── marketing/             # Marketing components
│   │   ├── dashboard/             # Dashboard components
│   │   ├── shared/                # Shared components
│   │   └── ...
│   ├── lib/
│   │   ├── actions/               # Server actions
│   │   ├── supabase/              # Supabase clients
│   │   ├── validations/           # Zod schemas
│   │   ├── hooks/                 # React hooks
│   │   └── utils/                 # Utilities
│   └── types/                     # TypeScript types
```

## 🎨 Design System

The project uses a dark-first premium design inspired by Apple, Linear, and Vercel:

- **Primary Color:** Indigo (#4F46E5) - Trust & Intelligence
- **Secondary Color:** Cyan (#22D3EE) - Automation
- **Background:** #0A0A0A (very dark)
- **Typography:** Inter font family
- **Animations:** 450ms ease with cubic-bezier(0.22, 1, 0.36, 1)

## 🔒 Authentication & Authorization

### Roles

- **admin**: Full system access
- **sales**: CRM access (leads, clients, deals)
- **support**: Ticket management
- **client**: Portal access only

### Protected Routes

- `/dashboard/*` - Team members only
- `/portal/*` - Clients only
- Middleware automatically redirects based on role

## 🗄️ Database Schema

The database includes:

### CRM Tables
- `leads` - Lead capture and qualification
- `clients` - Active and past clients
- `contacts` - Client contacts
- `deals` - Sales pipeline
- `activities` - Interaction timeline
- `bookings` - Strategy call scheduling

### Ticketing Tables
- `tickets` - Support tickets with SLA tracking
- `ticket_comments` - Comment threads
- `ticket_attachments` - File attachments

### Security
- Row Level Security (RLS) on all tables
- Automatic lead scoring
- Auto-assignment of tickets/leads
- Audit logging for compliance

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Set all variables from `.env.example` in your deployment platform.

## 📝 Development Workflow

### Code Quality

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build
npm run build
```

### Database Migrations

After making schema changes:

```bash
# Generate TypeScript types
npx supabase gen types typescript --project-id your-project-ref > src/types/database.ts
```

## 🧪 Testing

Testing will be set up in Phase 6:
- Unit tests for utilities
- Integration tests for server actions
- E2E tests with Playwright

## 📚 Documentation

- [Product Requirements Document](./docs/prd.md)
- [Visual Specification](./docs/continu8.visual-spec.jsonc)
- [Supabase Setup](./supabase/README.md)
- [Implementation Plan](/.claude/plans/shiny-puzzling-spring.md)

## 🗺️ Development Roadmap

- ✅ **Phase 1:** Foundation (Complete)
  - Project setup
  - Database schema
  - Authentication
  - Design system

- ⏳ **Phase 2:** Marketing Website (Next)
  - Home page
  - Services pages
  - Pricing page
  - Booking form

- 🔜 **Phase 3:** CRM System
- 🔜 **Phase 4:** Ticketing System
- 🔜 **Phase 5:** Calendar Integration
- 🔜 **Phase 6:** Polish & Testing

## 🤝 Contributing

This is a private project for Continu8. Please reach out if you need access.

## 📄 License

Proprietary - All rights reserved

## 🆘 Support

For technical support or questions:
- Email: support@continu8.co.za
- Documentation: See `/docs` folder

---

Built with ❤️ for Continu8 by Claude Code

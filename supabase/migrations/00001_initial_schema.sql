-- =====================================================
-- CONTINU8 DATABASE SCHEMA - INITIAL MIGRATION
-- =====================================================
-- This migration creates the core authentication and
-- user management tables for the Continu8 platform.
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PROFILES TABLE
-- Extends Supabase auth.users with application-specific data
-- =====================================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL CHECK (role IN ('admin', 'sales', 'support', 'client')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for faster role-based queries
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_email ON public.profiles(email);

-- =====================================================
-- TEAM MEMBERS TABLE
-- Additional metadata for internal team members
-- =====================================================
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  department TEXT,
  position TEXT,
  is_active BOOLEAN DEFAULT true NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for active team members
CREATE INDEX idx_team_members_active ON public.team_members(is_active);

-- =====================================================
-- COMMENTS
-- =====================================================
COMMENT ON TABLE public.profiles IS 'User profiles extending Supabase auth.users with role-based access';
COMMENT ON TABLE public.team_members IS 'Internal team member metadata';

COMMENT ON COLUMN public.profiles.role IS 'User role: admin (full access), sales (CRM), support (tickets), client (portal only)';
COMMENT ON COLUMN public.team_members.is_active IS 'Whether team member is currently active (for filtering)';

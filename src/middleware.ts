import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // Update session (refresh auth token if needed)
  const supabaseResponse = await updateSession(request)

  const { pathname } = request.nextUrl

  // Protected routes for dashboard (team members only)
  if (pathname.startsWith('/dashboard')) {
    const supabase = await createClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Check if user is a team member
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (!profile || !['admin', 'sales', 'support'].includes(profile.role)) {
      // Not a team member, redirect to portal if client, or login if no role
      if (profile?.role === 'client') {
        return NextResponse.redirect(new URL('/portal', request.url))
      }
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Protected routes for client portal (clients only)
  if (pathname.startsWith('/portal')) {
    const supabase = await createClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Check if user is a client
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (!profile || profile.role !== 'client') {
      // Not a client, redirect to dashboard if team member
      if (profile && ['admin', 'sales', 'support'].includes(profile.role)) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import * as Icons from 'lucide-react'
import { GlassPanel } from '@/components/shared/glass-panel'

interface NavItem {
  title: string
  href: string
  icon: string
  badge?: number
}

const navigation: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { title: 'Leads', href: '/dashboard/crm/leads', icon: 'Users' },
  { title: 'Clients', href: '/dashboard/crm/clients', icon: 'Building2' },
  { title: 'Pipeline', href: '/dashboard/crm/pipeline', icon: 'TrendingUp' },
  { title: 'Tickets', href: '/dashboard/tickets', icon: 'Ticket' },
  { title: 'Calendar', href: '/dashboard/calendar', icon: 'Calendar' },
  { title: 'Team', href: '/dashboard/team', icon: 'UserCog' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-white/[0.06] bg-background px-6 pb-4">
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">C8</span>
            </div>
            <span className="text-lg font-semibold">Continu8</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const Icon = (Icons as any)[item.icon] as Icons.LucideIcon
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

                  return (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        className={cn(
                          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors',
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-white/[0.02] hover:text-foreground'
                        )}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                        {item.title}
                        {item.badge && (
                          <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>

            {/* Bottom Section */}
            <li className="mt-auto">
              <GlassPanel className="p-4">
                <div className="text-sm">
                  <p className="font-semibold mb-1">Need help?</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Contact support for assistance
                  </p>
                  <Link
                    href="/dashboard/support"
                    className="text-xs text-primary hover:underline"
                  >
                    Get Support →
                  </Link>
                </div>
              </GlassPanel>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

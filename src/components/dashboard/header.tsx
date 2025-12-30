'use client'

import { Bell, Menu, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserMenu } from '@/components/dashboard/user-menu'

interface DashboardHeaderProps {
  onMenuClick?: () => void
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-white/[0.06] bg-background/95 backdrop-blur px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Separator */}
      <div className="h-6 w-px bg-white/[0.06] lg:hidden" aria-hidden="true" />

      {/* Search */}
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1 items-center" action="#" method="GET">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 bg-white/[0.02] border-white/[0.06] w-full sm:max-w-xs"
          />
        </form>

        {/* Right Section */}
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
          </Button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-white/[0.06]" aria-hidden="true" />

          {/* User menu */}
          <UserMenu />
        </div>
      </div>
    </div>
  )
}

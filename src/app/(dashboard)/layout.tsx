'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { DashboardHeader } from '@/components/dashboard/header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div>
      {/* Sidebar for desktop */}
      <Sidebar />

      {/* Main content */}
      <div className="lg:pl-72">
        <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>

      {/* Mobile sidebar (TODO: Add mobile sidebar overlay) */}
    </div>
  )
}

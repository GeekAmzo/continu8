'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createLead } from '@/lib/actions/leads'
import { GlassPanel } from '@/components/shared/glass-panel'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewLeadPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    const leadData = {
      company_name: formData.get('company_name') as string,
      contact_name: formData.get('contact_name') as string,
      contact_email: formData.get('contact_email') as string,
      contact_phone: formData.get('contact_phone') as string || undefined,
      annual_revenue_range: formData.get('annual_revenue_range') as string || undefined,
      employee_count_range: formData.get('employee_count_range') as string || undefined,
      primary_challenge: formData.get('primary_challenge') as string || undefined,
      budget_range: formData.get('budget_range') as string || undefined,
      decision_authority: formData.get('decision_authority') as string || undefined,
      source: formData.get('source') as string || undefined,
    }

    const result = await createLead(leadData)

    if (result.success) {
      router.push('/dashboard/crm/leads')
    } else {
      setError(result.error || 'Failed to create lead')
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/crm/leads">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Leads
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Lead</h1>
          <p className="text-muted-foreground mt-1">
            Create a new lead in the CRM system
          </p>
        </div>
      </div>

      <GlassPanel>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-md bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-500">
              {error}
            </div>
          )}

          {/* Company Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Company Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company_name">
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="company_name"
                  name="company_name"
                  required
                  disabled={isLoading}
                  placeholder="Acme Corp"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="source">Lead Source</Label>
                <Select name="source" disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="direct">Direct</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Contact Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact_name">
                  Contact Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contact_name"
                  name="contact_name"
                  required
                  disabled={isLoading}
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_email">
                  Contact Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contact_email"
                  name="contact_email"
                  type="email"
                  required
                  disabled={isLoading}
                  placeholder="john@acme.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_phone">Contact Phone</Label>
                <Input
                  id="contact_phone"
                  name="contact_phone"
                  type="tel"
                  disabled={isLoading}
                  placeholder="+27 82 123 4567"
                />
              </div>
            </div>
          </div>

          {/* Qualification Data */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Qualification</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="annual_revenue_range">Annual Revenue</Label>
                <Select name="annual_revenue_range" disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select revenue range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="below_10m">Below R10m</SelectItem>
                    <SelectItem value="10m-50m">R10m - R50m</SelectItem>
                    <SelectItem value="50m-100m">R50m - R100m</SelectItem>
                    <SelectItem value="100m-200m">R100m - R200m</SelectItem>
                    <SelectItem value="above_200m">Above R200m</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employee_count_range">Employee Count</Label>
                <Select name="employee_count_range" disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="below_20">Below 20</SelectItem>
                    <SelectItem value="20-50">20 - 50</SelectItem>
                    <SelectItem value="50-100">50 - 100</SelectItem>
                    <SelectItem value="100-200">100 - 200</SelectItem>
                    <SelectItem value="above_200">Above 200</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget_range">Budget Range</Label>
                <Select name="budget_range" disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="below_60k">Below R60k/month</SelectItem>
                    <SelectItem value="60k-80k">R60k - R80k/month</SelectItem>
                    <SelectItem value="80k-100k">R80k - R100k/month</SelectItem>
                    <SelectItem value="100k+">R100k+/month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="decision_authority">Decision Authority</Label>
                <Select name="decision_authority" disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select authority level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sole">Sole Decision Maker</SelectItem>
                    <SelectItem value="influencer">Influencer</SelectItem>
                    <SelectItem value="team">Team Decision</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="primary_challenge">Primary Challenge</Label>
                <Textarea
                  id="primary_challenge"
                  name="primary_challenge"
                  disabled={isLoading}
                  placeholder="Describe the main business challenge or need..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Lead'}
            </Button>
          </div>
        </form>
      </GlassPanel>
    </div>
  )
}

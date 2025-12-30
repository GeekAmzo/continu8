'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/actions/clients'
import { GlassPanel } from '@/components/shared/glass-panel'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewClientPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    const clientData = {
      company_name: formData.get('company_name') as string,
      company_size: formData.get('company_size') as string || undefined,
      industry: formData.get('industry') as string || undefined,
      website: formData.get('website') as string || undefined,
      contract_type: formData.get('contract_type') as string || undefined,
      monthly_retainer: formData.get('monthly_retainer') ? parseFloat(formData.get('monthly_retainer') as string) : undefined,
      contract_start_date: formData.get('contract_start_date') as string || undefined,
      contract_end_date: formData.get('contract_end_date') as string || undefined,
    }

    const result = await createClient(clientData)

    if (result.success) {
      router.push('/dashboard/crm/clients')
    } else {
      setError(result.error || 'Failed to create client')
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/crm/clients">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clients
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Client</h1>
          <p className="text-muted-foreground mt-1">
            Create a new client in the CRM system
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
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  disabled={isLoading}
                  placeholder="https://acme.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  name="industry"
                  disabled={isLoading}
                  placeholder="Technology, Healthcare, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company_size">Company Size</Label>
                <Input
                  id="company_size"
                  name="company_size"
                  disabled={isLoading}
                  placeholder="50-100 employees"
                />
              </div>
            </div>
          </div>

          {/* Contract Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Contract Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contract_type">Contract Type</Label>
                <Select name="contract_type" disabled={isLoading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select contract type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retainer">Retainer</SelectItem>
                    <SelectItem value="build_retain">Build + Retain</SelectItem>
                    <SelectItem value="audit">Audit</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthly_retainer">Monthly Retainer (R)</Label>
                <Input
                  id="monthly_retainer"
                  name="monthly_retainer"
                  type="number"
                  step="0.01"
                  min="0"
                  disabled={isLoading}
                  placeholder="60000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contract_start_date">Contract Start Date</Label>
                <Input
                  id="contract_start_date"
                  name="contract_start_date"
                  type="date"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contract_end_date">Contract End Date</Label>
                <Input
                  id="contract_end_date"
                  name="contract_end_date"
                  type="date"
                  disabled={isLoading}
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
              {isLoading ? 'Creating...' : 'Create Client'}
            </Button>
          </div>
        </form>
      </GlassPanel>
    </div>
  )
}

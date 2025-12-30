import { GlassPanel } from '@/components/shared/glass-panel'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User } from 'lucide-react'

export default function PortalProfilePage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account information and preferences
        </p>
      </div>

      <GlassPanel>
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    defaultValue="John"
                    className="mt-1.5"
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    defaultValue="Doe"
                    className="mt-1.5"
                    disabled
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john@example.com"
                  className="mt-1.5"
                  disabled
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  defaultValue="+27 XX XXX XXXX"
                  className="mt-1.5"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5">
            <h2 className="text-lg font-semibold mb-4">Company Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  defaultValue="Acme Corp"
                  className="mt-1.5"
                  disabled
                />
              </div>

              <div>
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  defaultValue="CTO"
                  className="mt-1.5"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex justify-end gap-3">
            <Button variant="outline" disabled>Cancel</Button>
            <Button disabled>Save Changes</Button>
          </div>
        </div>
      </GlassPanel>

      <GlassPanel>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Change Password</h2>
          <p className="text-sm text-muted-foreground">
            Contact support to change your password
          </p>
          <Button variant="outline" disabled>Request Password Change</Button>
        </div>
      </GlassPanel>
    </div>
  )
}

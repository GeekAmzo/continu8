'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
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
import { GlassPanel } from '@/components/shared/glass-panel'
import { submitBooking } from '@/lib/actions/bookings'
import { leadSchema, type Lead } from '@/lib/validations/lead'
import { useToast } from '@/hooks/use-toast'

const steps = [
  { id: 1, title: 'Contact Info', fields: ['firstName', 'lastName', 'email', 'phone', 'jobTitle'] },
  {
    id: 2,
    title: 'Company Details',
    fields: ['companyName', 'website', 'industry', 'annualRevenue', 'employeeCount'],
  },
  {
    id: 3,
    title: 'Challenges & Goals',
    fields: ['primaryChallenge', 'otherChallenge', 'specificPainPoints', 'desiredOutcomes', 'timeline'],
  },
  {
    id: 4,
    title: 'Budget & Decision',
    fields: ['monthlyBudget', 'decisionAuthority', 'decisionTimeframe', 'currentSolutions'],
  },
  {
    id: 5,
    title: 'Schedule Call',
    fields: ['preferredDate', 'preferredTime', 'timezone', 'additionalNotes'],
  },
]

export function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<Lead>({
    resolver: zodResolver(leadSchema),
    mode: 'onBlur',
  })

  const annualRevenue = watch('annualRevenue')
  const monthlyBudget = watch('monthlyBudget')
  const primaryChallenge = watch('primaryChallenge')

  const handleNext = async () => {
    const fieldsToValidate = steps[currentStep - 1].fields as Array<keyof Lead>
    const isValid = await trigger(fieldsToValidate)

    if (!isValid) return

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: Lead) => {
    setIsSubmitting(true)

    try {
      const result = await submitBooking(data)

      if (result.success) {
        toast({
          title: 'Booking Submitted!',
          description: 'We\'ll be in touch shortly to confirm your strategy call.',
        })

        // Redirect to thank you page or show success message
        window.location.href = '/thank-you'
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to submit booking. Please try again.',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                  currentStep > step.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : currentStep === step.id
                      ? 'border-primary text-primary'
                      : 'border-muted text-muted-foreground'
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-px w-8 sm:w-16 mx-2 transition-colors ${
                    currentStep > step.id ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <GlassPanel>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Contact Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        {...register('firstName')}
                        className="mt-1.5"
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-destructive">{errors.firstName.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        {...register('lastName')}
                        className="mt-1.5"
                        placeholder="Smith"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-destructive">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      className="mt-1.5"
                      placeholder="john@company.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      className="mt-1.5"
                      placeholder="+27 XX XXX XXXX"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      {...register('jobTitle')}
                      className="mt-1.5"
                      placeholder="CEO, CTO, Operations Director, etc."
                    />
                    {errors.jobTitle && (
                      <p className="mt-1 text-sm text-destructive">{errors.jobTitle.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Company Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      {...register('companyName')}
                      className="mt-1.5"
                      placeholder="Acme Corp"
                    />
                    {errors.companyName && (
                      <p className="mt-1 text-sm text-destructive">{errors.companyName.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="website">Website (Optional)</Label>
                    <Input
                      id="website"
                      type="url"
                      {...register('website')}
                      className="mt-1.5"
                      placeholder="https://company.com"
                    />
                    {errors.website && (
                      <p className="mt-1 text-sm text-destructive">{errors.website.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      {...register('industry')}
                      className="mt-1.5"
                      placeholder="e.g., SaaS, E-commerce, Professional Services"
                    />
                    {errors.industry && (
                      <p className="mt-1 text-sm text-destructive">{errors.industry.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="annualRevenue">Annual Revenue (ZAR)</Label>
                    <Select
                      onValueChange={(value) => setValue('annualRevenue', value as any)}
                      defaultValue={annualRevenue}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select revenue range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under_5m">Under R5m</SelectItem>
                        <SelectItem value="5m_10m">R5m - R10m</SelectItem>
                        <SelectItem value="10m_25m">R10m - R25m</SelectItem>
                        <SelectItem value="25m_50m">R25m - R50m</SelectItem>
                        <SelectItem value="50m_100m">R50m - R100m</SelectItem>
                        <SelectItem value="100m_200m">R100m - R200m</SelectItem>
                        <SelectItem value="over_200m">Over R200m</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.annualRevenue && (
                      <p className="mt-1 text-sm text-destructive">{errors.annualRevenue.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="employeeCount">Number of Employees</Label>
                    <Select
                      onValueChange={(value) => setValue('employeeCount', value as any)}
                      defaultValue={watch('employeeCount')}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select employee count" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under_10">Under 10</SelectItem>
                        <SelectItem value="10_20">10-20</SelectItem>
                        <SelectItem value="20_50">20-50</SelectItem>
                        <SelectItem value="50_100">50-100</SelectItem>
                        <SelectItem value="100_200">100-200</SelectItem>
                        <SelectItem value="over_200">Over 200</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.employeeCount && (
                      <p className="mt-1 text-sm text-destructive">{errors.employeeCount.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Challenges & Goals */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="primaryChallenge">Primary Challenge</Label>
                    <Select
                      onValueChange={(value) => setValue('primaryChallenge', value as any)}
                      defaultValue={primaryChallenge}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select your primary challenge" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual_work">Too much manual, repetitive work</SelectItem>
                        <SelectItem value="disconnected_systems">Disconnected systems and data silos</SelectItem>
                        <SelectItem value="scaling_issues">Can't scale efficiently</SelectItem>
                        <SelectItem value="security_concerns">Security and compliance concerns</SelectItem>
                        <SelectItem value="poor_data_visibility">Poor data visibility and reporting</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.primaryChallenge && (
                      <p className="mt-1 text-sm text-destructive">{errors.primaryChallenge.message}</p>
                    )}
                  </div>

                  {primaryChallenge === 'other' && (
                    <div>
                      <Label htmlFor="otherChallenge">Please Specify</Label>
                      <Input
                        id="otherChallenge"
                        {...register('otherChallenge')}
                        className="mt-1.5"
                        placeholder="Describe your primary challenge"
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="specificPainPoints">Specific Pain Points</Label>
                    <Textarea
                      id="specificPainPoints"
                      {...register('specificPainPoints')}
                      className="mt-1.5"
                      rows={4}
                      placeholder="Describe the specific operational issues you're facing..."
                    />
                    {errors.specificPainPoints && (
                      <p className="mt-1 text-sm text-destructive">{errors.specificPainPoints.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="desiredOutcomes">Desired Outcomes</Label>
                    <Textarea
                      id="desiredOutcomes"
                      {...register('desiredOutcomes')}
                      className="mt-1.5"
                      rows={4}
                      placeholder="What would success look like? What are you hoping to achieve?"
                    />
                    {errors.desiredOutcomes && (
                      <p className="mt-1 text-sm text-destructive">{errors.desiredOutcomes.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="timeline">Implementation Timeline</Label>
                    <Select
                      onValueChange={(value) => setValue('timeline', value as any)}
                      defaultValue={watch('timeline')}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent_1_month">Urgent - need to start within 1 month</SelectItem>
                        <SelectItem value="soon_1_3_months">Soon - 1-3 months</SelectItem>
                        <SelectItem value="planning_3_6_months">Planning - 3-6 months</SelectItem>
                        <SelectItem value="exploring_6_plus_months">Exploring - 6+ months</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.timeline && (
                      <p className="mt-1 text-sm text-destructive">{errors.timeline.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Budget & Decision */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="monthlyBudget">Monthly Budget (ZAR)</Label>
                    <Select
                      onValueChange={(value) => setValue('monthlyBudget', value as any)}
                      defaultValue={monthlyBudget}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under_30k">Under R30k</SelectItem>
                        <SelectItem value="30k_60k">R30k - R60k</SelectItem>
                        <SelectItem value="60k_100k">R60k - R100k</SelectItem>
                        <SelectItem value="100k_150k">R100k - R150k</SelectItem>
                        <SelectItem value="over_150k">Over R150k</SelectItem>
                        <SelectItem value="not_sure">Not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.monthlyBudget && (
                      <p className="mt-1 text-sm text-destructive">{errors.monthlyBudget.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="decisionAuthority">Decision-Making Authority</Label>
                    <Select
                      onValueChange={(value) => setValue('decisionAuthority', value as any)}
                      defaultValue={watch('decisionAuthority')}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select your role in decision-making" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="final_decision_maker">Final decision maker</SelectItem>
                        <SelectItem value="key_influencer">Key influencer</SelectItem>
                        <SelectItem value="part_of_committee">Part of decision committee</SelectItem>
                        <SelectItem value="gathering_info">Gathering information</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.decisionAuthority && (
                      <p className="mt-1 text-sm text-destructive">{errors.decisionAuthority.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="decisionTimeframe">Decision Timeframe</Label>
                    <Select
                      onValueChange={(value) => setValue('decisionTimeframe', value as any)}
                      defaultValue={watch('decisionTimeframe')}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="When do you expect to make a decision?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ready_now">Ready to decide now</SelectItem>
                        <SelectItem value="within_month">Within 1 month</SelectItem>
                        <SelectItem value="within_quarter">Within this quarter</SelectItem>
                        <SelectItem value="just_exploring">Just exploring options</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.decisionTimeframe && (
                      <p className="mt-1 text-sm text-destructive">{errors.decisionTimeframe.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="currentSolutions">Current Solutions (Optional)</Label>
                    <Textarea
                      id="currentSolutions"
                      {...register('currentSolutions')}
                      className="mt-1.5"
                      rows={3}
                      placeholder="What tools/systems are you currently using? What's working? What's not?"
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Schedule Call */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Almost there!</h3>
                    <p className="text-sm text-muted-foreground">
                      Let us know your preferred time for a strategy call and we'll send you a calendar invite.
                    </p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="preferredDate">Preferred Date</Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        {...register('preferredDate')}
                        className="mt-1.5"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div>
                      <Label htmlFor="preferredTime">Preferred Time</Label>
                      <Select
                        onValueChange={(value) => setValue('preferredTime', value)}
                        defaultValue={watch('preferredTime')}
                      >
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">09:00</SelectItem>
                          <SelectItem value="10:00">10:00</SelectItem>
                          <SelectItem value="11:00">11:00</SelectItem>
                          <SelectItem value="12:00">12:00</SelectItem>
                          <SelectItem value="13:00">13:00</SelectItem>
                          <SelectItem value="14:00">14:00</SelectItem>
                          <SelectItem value="15:00">15:00</SelectItem>
                          <SelectItem value="16:00">16:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      onValueChange={(value) => setValue('timezone', value)}
                      defaultValue="Africa/Johannesburg"
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Africa/Johannesburg">South Africa (SAST)</SelectItem>
                        <SelectItem value="Europe/London">London (GMT)</SelectItem>
                        <SelectItem value="America/New_York">New York (EST)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Los Angeles (PST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="additionalNotes"
                      {...register('additionalNotes')}
                      className="mt-1.5"
                      rows={4}
                      placeholder="Anything else you'd like us to know before the call?"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1 || isSubmitting}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {currentStep < steps.length ? (
              <Button type="button" onClick={handleNext} disabled={isSubmitting}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Booking'}
              </Button>
            )}
          </div>
        </GlassPanel>
      </form>
    </div>
  )
}

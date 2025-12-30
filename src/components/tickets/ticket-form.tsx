'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createTicket } from '@/lib/actions/tickets'
import { CreateTicketSchema } from '@/lib/validations/tickets'
import { useToast } from '@/hooks/use-toast'

interface TicketFormProps {
  clientId?: string
  onSuccess?: (ticketId: string) => void
  showClientSelect?: boolean
}

export function TicketForm({ clientId, onSuccess, showClientSelect = false }: TicketFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof CreateTicketSchema>>({
    resolver: zodResolver(CreateTicketSchema),
    defaultValues: {
      subject: '',
      description: '',
      priority: 'medium',
      category: undefined,
      client_id: clientId,
    },
  })

  async function onSubmit(values: z.infer<typeof CreateTicketSchema>) {
    setIsSubmitting(true)

    try {
      const result = await createTicket(values)

      if (result.success && result.data) {
        toast({
          title: 'Ticket created',
          description: `Ticket ${result.data.ticket_number} has been created successfully.`,
        })

        if (onSuccess) {
          onSuccess(result.data.id)
        } else {
          router.push(`/portal/tickets/${result.data.id}`)
        }
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to create ticket',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error creating ticket:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input
                  placeholder="Brief description of your issue"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>
                Provide a clear, concise subject for your ticket
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide detailed information about your request or issue..."
                  className="min-h-[150px] resize-none"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>
                Include any relevant details, error messages, or steps to reproduce the issue
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  How urgent is this issue?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="technical">Technical Support</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="feature_request">Feature Request</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  What type of request is this?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.06]">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Ticket
          </Button>
        </div>
      </form>
    </Form>
  )
}

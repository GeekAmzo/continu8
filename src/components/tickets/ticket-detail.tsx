'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatDistanceToNow, format } from 'date-fns'
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  Paperclip,
  Send,
  User,
} from 'lucide-react'

import { GlassPanel } from '@/components/shared/glass-panel'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { updateTicket, createTicketComment } from '@/lib/actions/tickets'
import { useToast } from '@/hooks/use-toast'
import { FileUpload } from './file-upload'

interface TicketDetailProps {
  ticket: any
  isTeamView: boolean
}

const statusConfig = {
  open: { label: 'Open', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  in_progress: {
    label: 'In Progress',
    color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  },
  waiting_client: {
    label: 'Waiting',
    color: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  },
  resolved: {
    label: 'Resolved',
    color: 'bg-green-500/10 text-green-500 border-green-500/20',
  },
  closed: { label: 'Closed', color: 'bg-gray-500/10 text-gray-500 border-gray-500/20' },
}

const priorityConfig = {
  low: { label: 'Low', color: 'text-gray-400' },
  medium: { label: 'Medium', color: 'text-blue-400' },
  high: { label: 'High', color: 'text-orange-400' },
  urgent: { label: 'Urgent', color: 'text-red-400' },
}

export function TicketDetail({ ticket, isTeamView }: TicketDetailProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [comment, setComment] = useState('')
  const [isInternal, setIsInternal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const status = statusConfig[ticket.status as keyof typeof statusConfig]
  const priority = priorityConfig[ticket.priority as keyof typeof priorityConfig]

  const isOverdue =
    ticket.sla_deadline && new Date(ticket.sla_deadline) < new Date()

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true)
    try {
      const result = await updateTicket(ticket.id, { status: newStatus as any })

      if (result.success) {
        toast({
          title: 'Status updated',
          description: `Ticket status changed to ${statusConfig[newStatus as keyof typeof statusConfig].label}`,
        })
        router.refresh()
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to update status',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!comment.trim()) return

    setIsSubmitting(true)
    try {
      const result = await createTicketComment({
        ticket_id: ticket.id,
        content: comment,
        is_internal: isTeamView && isInternal,
      })

      if (result.success) {
        toast({
          title: 'Comment added',
          description: 'Your comment has been posted',
        })
        setComment('')
        setIsInternal(false)
        router.refresh()
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to add comment',
          variant: 'destructive',
        })
      }
    } catch (error) {
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-mono text-muted-foreground">
                {ticket.ticket_number}
              </span>
              {isOverdue && (
                <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Overdue
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{ticket.subject}</h1>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ticket Description */}
          <GlassPanel>
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground">Description</Label>
                <p className="mt-2 text-foreground whitespace-pre-wrap">{ticket.description}</p>
              </div>

              {ticket.attachments && ticket.attachments.length > 0 && (
                <div>
                  <Label className="text-muted-foreground">Attachments</Label>
                  <div className="mt-2 space-y-2">
                    {ticket.attachments.map((attachment: any) => (
                      <a
                        key={attachment.id}
                        href={attachment.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <Paperclip className="h-4 w-4" />
                        {attachment.file_name}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* File Upload */}
              {ticket.status !== 'closed' && (
                <div>
                  <Label className="text-muted-foreground mb-3 block">Add Attachment</Label>
                  <FileUpload ticketId={ticket.id} />
                </div>
              )}
            </div>
          </GlassPanel>

          {/* Comments */}
          <GlassPanel>
            <h2 className="text-xl font-semibold mb-6">Activity</h2>

            <div className="space-y-6">
              {ticket.comments && ticket.comments.length > 0 ? (
                ticket.comments.map((comment: any) => {
                  // Hide internal comments from clients
                  if (!isTeamView && comment.is_internal) return null

                  return (
                    <div key={comment.id} className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{comment.author?.full_name}</span>
                          {comment.is_internal && (
                            <Badge variant="outline" className="text-xs">
                              Internal
                            </Badge>
                          )}
                          <span className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(comment.created_at), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="text-center text-muted-foreground py-8">No comments yet</p>
              )}

              <Separator />

              {/* Add Comment Form */}
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div>
                  <Label htmlFor="comment">Add Comment</Label>
                  <Textarea
                    id="comment"
                    placeholder="Type your response..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mt-1.5 min-h-[100px]"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex items-center justify-between">
                  {isTeamView && (
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isInternal}
                        onChange={(e) => setIsInternal(e.target.checked)}
                        className="rounded border-white/10"
                      />
                      <span className="text-muted-foreground">Internal note (not visible to client)</span>
                    </label>
                  )}

                  <Button type="submit" disabled={isSubmitting || !comment.trim()} className="ml-auto">
                    <Send className="mr-2 h-4 w-4" />
                    {isSubmitting ? 'Sending...' : 'Send'}
                  </Button>
                </div>
              </form>
            </div>
          </GlassPanel>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Priority */}
          <GlassPanel>
            <h3 className="font-semibold mb-4">Ticket Details</h3>

            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground">Status</Label>
                {isTeamView ? (
                  <Select
                    defaultValue={ticket.status}
                    onValueChange={handleStatusChange}
                    disabled={isUpdating}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="waiting_client">Waiting on Client</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="mt-1.5">
                    <Badge variant="outline" className={status.color}>
                      {status.label}
                    </Badge>
                  </div>
                )}
              </div>

              <div>
                <Label className="text-muted-foreground">Priority</Label>
                <div className="mt-1.5">
                  <Badge variant="outline" className={cn('border-white/10', priority.color)}>
                    {priority.label}
                  </Badge>
                </div>
              </div>

              {ticket.category && (
                <div>
                  <Label className="text-muted-foreground">Category</Label>
                  <p className="mt-1.5 text-sm capitalize">
                    {ticket.category.replace('_', ' ')}
                  </p>
                </div>
              )}
            </div>
          </GlassPanel>

          {/* Timeline */}
          <GlassPanel>
            <h3 className="font-semibold mb-4">Timeline</h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-muted-foreground">Created</p>
                  <p className="font-medium">
                    {format(new Date(ticket.created_at), 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-muted-foreground">Last Updated</p>
                  <p className="font-medium">
                    {formatDistanceToNow(new Date(ticket.updated_at), { addSuffix: true })}
                  </p>
                </div>
              </div>

              {ticket.sla_deadline && (
                <div className="flex items-start gap-2">
                  <AlertCircle
                    className={cn(
                      'h-4 w-4 mt-0.5',
                      isOverdue ? 'text-red-500' : 'text-muted-foreground'
                    )}
                  />
                  <div>
                    <p className="text-muted-foreground">SLA Deadline</p>
                    <p className={cn('font-medium', isOverdue && 'text-red-500')}>
                      {format(new Date(ticket.sla_deadline), 'MMM d, yyyy h:mm a')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </GlassPanel>

          {/* Client & Assignment Info */}
          <GlassPanel>
            <h3 className="font-semibold mb-4">People</h3>

            <div className="space-y-3 text-sm">
              {ticket.client && (
                <div>
                  <p className="text-muted-foreground mb-1">Client</p>
                  <p className="font-medium">{ticket.client.company_name}</p>
                </div>
              )}

              {ticket.created_by_user && (
                <div>
                  <p className="text-muted-foreground mb-1">Created By</p>
                  <p className="font-medium">{ticket.created_by_user.full_name}</p>
                  <p className="text-xs text-muted-foreground">{ticket.created_by_user.email}</p>
                </div>
              )}

              {ticket.assigned_to_user && (
                <div>
                  <p className="text-muted-foreground mb-1">Assigned To</p>
                  <p className="font-medium">{ticket.assigned_to_user.full_name}</p>
                  <p className="text-xs text-muted-foreground">{ticket.assigned_to_user.email}</p>
                </div>
              )}
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  )
}

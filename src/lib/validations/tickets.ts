import { z } from 'zod'

// Validation schemas for tickets
export const CreateTicketSchema = z.object({
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  category: z.enum(['technical', 'billing', 'general', 'feature_request']).optional(),
  client_id: z.string().uuid().optional(),
})

export const UpdateTicketSchema = z.object({
  subject: z.string().min(5).max(200).optional(),
  description: z.string().min(20).optional(),
  status: z.enum(['open', 'in_progress', 'waiting_client', 'resolved', 'closed']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  assigned_to: z.string().uuid().nullable().optional(),
})

export const CreateCommentSchema = z.object({
  ticket_id: z.string().uuid(),
  content: z.string().min(1, 'Comment cannot be empty'),
  is_internal: z.boolean().default(false),
  attachments: z.array(z.string()).optional(),
})

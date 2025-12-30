'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, File, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { uploadTicketAttachment } from '@/lib/actions/tickets'
import { useToast } from '@/hooks/use-toast'

interface FileUploadProps {
  ticketId: string
  onUploadComplete?: () => void
}

export function FileUpload({ ticketId, onUploadComplete }: FileUploadProps) {
  const router = useRouter()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileSelect = (file: File) => {
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'File size must be less than 10MB',
        variant: 'destructive',
      })
      return
    }

    setSelectedFile(file)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const result = await uploadTicketAttachment(ticketId, formData)

      if (result.success) {
        toast({
          title: 'File uploaded',
          description: 'Your file has been attached successfully',
        })

        setSelectedFile(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }

        if (onUploadComplete) {
          onUploadComplete()
        }

        router.refresh()
      } else {
        toast({
          title: 'Upload failed',
          description: result.error || 'Failed to upload file',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="space-y-4">
      {!selectedFile ? (
        <div
          className={cn(
            'border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer',
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-white/10 hover:border-primary/50'
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm font-medium mb-1">
            Drop your file here, or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            Maximum file size: 10MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileInputChange}
            disabled={isUploading}
          />
        </div>
      ) : (
        <div className="border border-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <File className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!isUploading && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleRemove}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              onClick={handleUpload}
              disabled={isUploading}
              size="sm"
            >
              {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isUploading ? 'Uploading...' : 'Upload File'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

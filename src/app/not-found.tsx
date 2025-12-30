import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md glass-panel">
        <CardHeader className="text-center">
          <CardTitle className="text-6xl font-bold mb-2">404</CardTitle>
          <CardDescription className="text-lg">
            Page not found
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex gap-2 justify-center">
            <Button asChild>
              <Link href="/">Go home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/book-call">Book a call</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

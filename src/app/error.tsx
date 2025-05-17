'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
      <AlertTriangle className="w-16 h-16 text-destructive mb-6" />
      <h2 className="text-3xl font-semibold mb-4">Oops, something went wrong!</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        We encountered an unexpected issue. Please try again, or contact support if the problem persists.
      </p>
      <p className="text-sm text-destructive/80 mb-6 max-w-md">
        Error details: {error.message}
      </p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="btn-interactive"
      >
        Try again
      </Button>
    </div>
  )
}

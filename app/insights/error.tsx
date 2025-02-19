'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="container mx-auto py-6">
            <Card className="p-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <AlertCircle className="h-12 w-12 text-destructive" />
                    <h2 className="text-2xl font-bold">Something went wrong!</h2>
                    <p className="text-muted-foreground">{error.message}</p>
                    <Button onClick={() => reset()}>Try again</Button>
                </div>
            </Card>
        </div>
    )
} 
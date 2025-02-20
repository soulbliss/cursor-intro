import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function MistakesHeader() {
    return (
        <div className="space-y-4">
            <Link href="/" className="inline-block">
                <Button variant="ghost" size="sm" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Button>
            </Link>
            <div>
                <h1 className="text-4xl font-bold">Common Mistakes to Avoid</h1>
                <p className="text-muted-foreground mt-2">
                    Learn from the community's experiences about what not to do in software development
                </p>
            </div>
        </div>
    )
} 
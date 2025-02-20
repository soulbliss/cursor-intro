import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function BestPracticesHeader() {
    return (
        <div className="space-y-4">
            <Link href="/" className="inline-block">
                <Button variant="ghost" size="sm" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to home
                </Button>
            </Link>
            <div>
                <h1 className="text-4xl font-bold">Best Practices</h1>
                <p className="text-muted-foreground mt-2">
                    A curated list of best practices from the community, sorted by impact and popularity
                </p>
            </div>
        </div>
    )
} 
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <div className="container mx-auto py-6 space-y-6">
            <div className="flex justify-between items-center">
                <Skeleton className="h-9 w-32" />
                <Skeleton className="h-10 w-64" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="hidden md:block md:col-span-3">
                    <Card className="p-4">
                        <div className="space-y-4">
                            <Skeleton className="h-4 w-[80%]" />
                            <Skeleton className="h-4 w-[60%]" />
                            <Skeleton className="h-4 w-[70%]" />
                            <Skeleton className="h-4 w-[50%]" />
                        </div>
                    </Card>
                </div>

                <div className="col-span-1 md:col-span-9">
                    <Card>
                        <div className="p-4 space-y-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-[90%]" />
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

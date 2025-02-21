import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface FeatureCardProps {
    title: string
    description: string
    href: string
    icon: LucideIcon
    imageSrc?: string
    className?: string
}

export function FeatureCard({
    title,
    description,
    href,
    icon: Icon,
    imageSrc,
    className,
}: FeatureCardProps) {
    return (
        <Link
            href={href}
            className={cn(
                "group relative overflow-hidden rounded-lg border bg-background p-2 transition-all hover:shadow-md",
                className
            )}
        >
            <div className="flex h-full flex-col p-4">
                <div className="mb-4 flex items-center gap-2">
                    <Icon className="h-6 w-6 text-primary" />
                    <h3 className="font-display text-xl font-semibold">{title}</h3>
                </div>

                {imageSrc && (
                    <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg">
                        <Image
                            src={imageSrc}
                            alt={title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                    </div>
                )}

                <p className="text-muted-foreground">{description}</p>
            </div>
        </Link>
    )
} 
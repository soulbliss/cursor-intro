'use client'

import { FeatureCard } from "@/components/feature-card"
import { AlertTriangle, BookMarked, Sparkles, Video } from "lucide-react"
import { useState } from "react"

export function HomeContent() {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="min-h-screen">
            {/* Grid Background */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(to right, rgb(var(--foreground) / 0.02) 1px, transparent 1px),
                           linear-gradient(to bottom, rgb(var(--foreground) / 0.02) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <main className="relative">
                <section className="space-y-6 py-8 md:py-12">
                    <div className="container flex max-w-[980px] flex-col items-center gap-4 text-center px-4">
                        <h1 className="font-sans text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Cursor AI tips and tricks
                        </h1>
                        <p className="max-w-[700px] text-muted-foreground sm:text-lg">
                            Learn to use Cursor effectively with comprehensive guides, best practices, and hands-on demos.
                        </p>
                    </div>
                </section>

                <section className="container max-w-[1200px] px-4 pb-16">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <FeatureCard
                            title="Insights"
                            description="Discover 70+ curated insights from the Cursor community."
                            href="/insights"
                            icon={Sparkles}
                            imageSrc="/cover.png"
                            className="lg:col-span-2"
                        />
                        <FeatureCard
                            title="Best Practices"
                            description="Master Cursor with professional tips and techniques for maximum productivity."
                            href="/best-practices"
                            icon={BookMarked}
                            imageSrc="/cover.png"
                            className="lg:col-span-2"
                        />
                        <FeatureCard
                            title="Video Demos"
                            description="Watch Cursor in action with real-world examples and use cases."
                            href="/demos"
                            icon={Video}
                            imageSrc="/cover.png"
                            className="md:col-span-2 lg:col-span-2"
                        />
                        <FeatureCard
                            title="Common Mistakes"
                            description="Save hours by learning what to avoid and how to fix common issues."
                            href="/mistakes-to-avoid"
                            icon={AlertTriangle}
                            imageSrc="/cover.png"
                            className="md:col-span-2 lg:col-span-2"
                        />
                    </div>
                </section>
            </main>
        </div>
    )
} 
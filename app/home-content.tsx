"use client"

import Link from "next/link"
import { AlertTriangle, BookMarked, Sparkles, Video } from "lucide-react"

import { FeatureCard } from "@/components/feature-card"

import { MistakesHeader } from "./mistakes-to-avoid/components/header"
import { MistakesList } from "./mistakes-to-avoid/components/mistakes-list"

export function HomeContent({ mistakes }: { mistakes: any[] }) {
  return (
    <div className="min-h-screen">
      {/* Grid Background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgb(var(--foreground) / 0.02) 1px, transparent 1px),
                           linear-gradient(to bottom, rgb(var(--foreground) / 0.02) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <main className="relative">
        <section className="space-y-6 py-8 md:py-12">
          <div className="container flex max-w-[980px] flex-col items-center gap-4 text-center px-4">
            <h1 className="font-sans text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Cursor AI tips and tricks
            </h1>
            <div className="max-w-[700px] space-y-4 text-center">
              <p className="text-muted-foreground sm:text-lg">
                Learn to use Cursor effectively with{" "}
                <Link href="/best-practices" className="text-primary underline">
                  best practices
                </Link>
                ,{" "}
                <Link
                  href="/mistakes-to-avoid"
                  className="text-primary underline"
                >
                  common mistakes to avoid
                </Link>
                ,{" "}
                <Link href="/insights" className="text-primary underline">
                  community insights
                </Link>
                , and{" "}
                <Link href="/demos" className="text-primary underline">
                  hands-on demos
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="container max-w-[1200px] px-4 pb-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              title="Insights"
              description="Discover 70+ curated insights from the Cursor community."
              href="/insights"
              icon={Sparkles}
              imageSrc="https://cdn.diligenceai.dev/assets/insights.webp"
            />
            <FeatureCard
              title="Best Practices"
              description="Understand Cursor with experienced users' tips and techniques for maximum productivity."
              href="/best-practices"
              icon={BookMarked}
              imageSrc="https://cdn.diligenceai.dev/assets/best_practices.webp"
            />
            <FeatureCard
              title="Video Demos"
              description="Watch Cursor in action with real-world examples and use cases."
              href="/demos"
              icon={Video}
              imageSrc="https://cdn.diligenceai.dev/assets/video_demos.webp"
            />
            <FeatureCard
              title="Mistakes to avoid"
              description="Save hours by learning what to avoid and how to fix common issues."
              href="/mistakes-to-avoid"
              icon={AlertTriangle}
              imageSrc="https://cdn.diligenceai.dev/assets/mistakes_avoid.webp"
            />
          </div>
        </section>
        <section className="max-w-[1600px] pb-16">
          <div className="mx-4 md:mx-12 py-8 space-y-8">
            <MistakesHeader />
            <MistakesList mistakes={mistakes} />
          </div>
        </section>
      </main>
    </div>
  )
}

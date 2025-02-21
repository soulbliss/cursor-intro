'use client'

import { CategoryGrid } from "@/components/category-grid"
import { SearchBar } from "@/components/search-bar"
import { FilterState, SidebarFilter } from "@/components/sidebar-filter"
import { allTips } from "content-collections"
import { Video } from "lucide-react"
import { useState } from "react"

const difficulties = [
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' },
]

const tags = [
    { id: 'agent', label: 'Agent' },
    { id: 'codebase', label: 'Codebase' },
    { id: 'mcp', label: 'MCP' },
    { id: 'servers', label: 'Servers' },
]

export function DemosContent() {
    const [searchQuery, setSearchQuery] = useState("")
    const [filters, setFilters] = useState<FilterState>({
        categories: [],
        difficulty: [],
        tags: [],
    })

    // Filter tips that have video content
    const videoTips = allTips.filter(tip => {
        // Check if tip has video
        return Boolean(tip.media?.video)
    })

    // Create categories based on available tips
    const categories = Array.from(new Set(videoTips.flatMap(tip => tip.categories)))
    const categoryObjects = categories.map(cat => ({
        id: cat,
        title: cat.replace(/_/g, ' ').split(' ').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
    }))

    const categoryOptions = categoryObjects.map(cat => ({
        id: cat.id,
        label: cat.title,
        count: videoTips.filter(tip => tip.categories.includes(cat.id)).length,
    }))

    // If no categories are found, create a default category
    const finalCategories = categoryObjects.length > 0 ? categoryObjects : [{
        id: "video_demos",
        title: "Video Demos"
    }]

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Grid Background */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(to right, rgb(var(--foreground) / 0.02) 1px, transparent 1px),
                           linear-gradient(to bottom, rgb(var(--foreground) / 0.02) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <SidebarFilter
                categories={categoryOptions}
                difficulties={difficulties}
                tags={tags}
                selectedFilters={filters}
                onFilterChange={setFilters}
            />

            <main className="flex-1">
                <section className="space-y-6 py-8 md:py-12">
                    <div className="container flex max-w-[980px] flex-col items-center gap-4 text-center px-4">
                        <div className="flex items-center gap-2">
                            <Video className="h-8 w-8 text-primary" />
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                Video Demos
                            </h1>
                        </div>
                        <div className="w-full max-w-[750px]">
                            <SearchBar
                                value={searchQuery}
                                onChange={setSearchQuery}
                                onClear={() => setSearchQuery("")}
                            />
                        </div>
                        <p className="max-w-[700px] text-muted-foreground sm:text-lg">
                            Watch Cursor AI in action with step-by-step video demonstrations. Learn how to use different features effectively through real-world examples.
                        </p>
                    </div>
                </section>

                <CategoryGrid
                    tips={videoTips}
                    categories={finalCategories}
                    searchQuery={searchQuery}
                    filters={filters}
                />
            </main>
        </div>
    )
} 
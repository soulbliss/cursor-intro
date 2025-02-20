'use client'

import { CategoryGrid } from "@/components/category-grid"
import { SearchBar } from "@/components/search-bar"
import { FilterState, SidebarFilter } from "@/components/sidebar-filter"
import { Button } from "@/components/ui/button"
import categories from "@/config/categories.json"
import { allTips } from "content-collections"
import { AlertTriangle, BookMarked, Sparkles } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface Category {
    id: string
    title: string
}

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

// Convert category strings to Category objects
const categoryObjects: Category[] = categories.map(cat => ({
    id: cat,
    title: cat.replace(/_/g, ' ').split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
}))

export function HomeContent() {
    const [searchQuery, setSearchQuery] = useState("")
    const [filters, setFilters] = useState<FilterState>({
        categories: [],
        difficulty: [],
        tags: [],
    })

    const categoryOptions = categoryObjects.map(cat => ({
        id: cat.id,
        label: cat.title,
        count: allTips.filter(tip => tip.categories.includes(cat.id)).length,
    }))

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
                        <h1 className="font-sans text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Cursor Tips & Tricks
                        </h1>
                        <div className="w-full max-w-[750px]">
                            <SearchBar
                                value={searchQuery}
                                onChange={setSearchQuery}
                                onClear={() => setSearchQuery("")}
                            />
                        </div>

                        <p className="max-w-[700px] text-muted-foreground sm:text-lg">
                            Quick video tutorials and screenshots to help you master Cursor. Short and focused tips to get you started.
                        </p>

                        <div className="flex flex-col gap-6 w-full max-w-[750px] mt-6">
                            <Link href="/insights" className="w-full">
                                <Button variant="outline" size="lg" className="font-medium w-full">
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Explore 70+ Cursor Insights
                                </Button>
                            </Link>

                            <div className="flex flex-col sm:flex-row gap-4 w-full">
                                <Link href="/best-practices" className="w-full sm:w-1/2">
                                    <Button variant="outline" size="lg" className="font-medium w-full">
                                        <BookMarked className="w-5 h-5 mr-2" />
                                        Best Practices
                                    </Button>
                                </Link>

                                <Link href="/mistakes-to-avoid" className="w-full sm:w-1/2">
                                    <Button variant="outline" size="lg" className="font-medium w-full">
                                        <AlertTriangle className="w-5 h-5 mr-2" />
                                        Common Mistakes
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <CategoryGrid
                    tips={allTips}
                    categories={categoryObjects}
                    searchQuery={searchQuery}
                    filters={filters}
                />
            </main>
        </div>
    )
} 
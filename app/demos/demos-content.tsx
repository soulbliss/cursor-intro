'use client'

import { CategoryGrid } from "@/components/category-grid"
import { SearchBar } from "@/components/search-bar"
import { FilterState, SidebarFilter } from "@/components/sidebar-filter"
import { allTips } from "content-collections"
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
        tools: [],
    })

    // Create categories based on available tips
    const categories = Array.from(new Set(allTips.flatMap(tip => tip.categories)))
    const categoryObjects = categories.map(cat => ({
        id: cat,
        title: cat.replace(/_/g, ' ').split(' ').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
    }))

    const categoryOptions = categoryObjects.map(cat => ({
        id: cat.id,
        label: cat.title,
        count: allTips.filter(tip => tip.categories.includes(cat.id)).length,
    }))

    // Create tools options based on available tips
    const tools = Array.from(new Set(allTips.flatMap(tip => tip.tools || [])))
    const toolOptions = tools.map(tool => ({
        id: tool,
        label: tool.replace(/_/g, ' ').split(' ').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        count: allTips.filter(tip => tip.tools?.includes(tool)).length,
    }))

    // If no categories are found, create a default category
    const finalCategories = categoryObjects.length > 0 ? categoryObjects : [{
        id: "demos",
        title: "Demos"
    }]

    return (
        <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8">
            <aside className="md:w-64 space-y-8 md:sticky md:top-0 md:h-screen">
                <SidebarFilter
                    categories={categoryOptions}
                    difficulties={difficulties}
                    tags={tags}
                    tools={toolOptions}
                    selectedFilters={filters}
                    onFilterChange={setFilters}
                />
            </aside>
            <main className="flex-1 min-h-screen overflow-y-auto">
                <section className="mb-12 text-center">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Cursor Demos</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore a curated collection of demos showcasing Cursor's powerful features.
                    </p>
                </section>

                <div className="mb-8">
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        onClear={() => setSearchQuery("")}
                    />
                </div>
                <CategoryGrid
                    tips={allTips}
                    categories={finalCategories}
                    searchQuery={searchQuery}
                    filters={filters}
                />
            </main>
        </div>
    )
} 
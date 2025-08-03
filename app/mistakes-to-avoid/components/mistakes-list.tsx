'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { formatDistanceToNow } from 'date-fns'
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Filter } from './filter'

type Mistake = {
    title: string
    description: string
    context: string
    reasoning: string
    source: string
    impact_level: 'critical' | 'important' | 'nice_to_have'
    tags: string[]
    postId: string
    postAuthor: string
    postTitle: string
    projectType: string
    typeOfProject: string
    typeOfProblem: string
    techStack: {
        languages: string[]
        frameworks: string[]
        tools: string[]
        platforms: string[]
    }
    ups: number
    createdAt: number
}

type Props = {
    mistakes: Mistake[]
}

const ITEMS_PER_PAGE = 20

export function MistakesList({ mistakes }: Props) {
    // Apply default sorting on initial load
    const defaultSortedMistakes = [...mistakes].sort((a, b) => {
        const impactOrder = { critical: 3, important: 2, nice_to_have: 1 }
        const impactDiff = impactOrder[b.impact_level] - impactOrder[a.impact_level]
        return impactDiff !== 0 ? impactDiff : b.ups - a.ups
    })
    
    const [filteredMistakes, setFilteredMistakes] = useState(defaultSortedMistakes)
    const [currentPage, setCurrentPage] = useState(1)

    // Calculate pagination values
    const totalPages = Math.ceil(filteredMistakes.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentMistakes = filteredMistakes.slice(startIndex, endIndex)

    const handleFilterChange = (filters: {
        languages: string[]
        tools: string[]
        impactLevels: string[]
        projectTypes: string[]
        problemTypes: string[]
        sortBy: 'default' | 'newest' | 'oldest'
    }) => {
        const filtered = mistakes.filter((mistake) => {
            const matchesLanguages =
                filters.languages.length === 0 ||
                mistake.techStack.languages.some((lang) =>
                    filters.languages.includes(lang)
                )

            const matchesTools =
                filters.tools.length === 0 ||
                mistake.techStack.tools.some((tool) =>
                    filters.tools.includes(tool)
                )

            const matchesImpact =
                filters.impactLevels.length === 0 ||
                filters.impactLevels.includes(mistake.impact_level)

            const matchesProjectType =
                filters.projectTypes.length === 0 ||
                filters.projectTypes.includes(mistake.projectType)

            const matchesProblemType =
                filters.problemTypes.length === 0 ||
                filters.problemTypes.includes(mistake.typeOfProblem)

            return matchesLanguages && matchesTools && matchesImpact && matchesProjectType && matchesProblemType
        })

        // Apply sorting
        const sorted = [...filtered].sort((a, b) => {
            if (filters.sortBy === 'newest') {
                return b.createdAt - a.createdAt
            } else if (filters.sortBy === 'oldest') {
                return a.createdAt - b.createdAt
            } else {
                // Default sorting: impact level first, then upvotes
                const impactOrder = { critical: 3, important: 2, nice_to_have: 1 }
                const impactDiff = impactOrder[b.impact_level] - impactOrder[a.impact_level]
                return impactDiff !== 0 ? impactDiff : b.ups - a.ups
            }
        })

        setFilteredMistakes(sorted)
        setCurrentPage(1) // Reset to first page when filters change
    }

    // Pagination controls
    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }

    const goToPrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1))
    }

    return (
        <div className="relative min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 mx-auto">
                <div className="hidden md:block">
                    <div className="sticky top-4 max-h-[calc(100vh-2rem)]">
                        <Filter mistakes={mistakes} onFilterChange={handleFilterChange} variant="card" />
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Mobile Filter */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="w-full sticky top-0 z-10 bg-background">
                                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                                    Filters
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] p-0">
                                <div className="h-full py-6 px-6 overflow-y-auto">
                                    <div className="pb-20">
                                        <Filter mistakes={mistakes} onFilterChange={handleFilterChange} variant="sheet" />
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Results count */}
                    <div className="text-sm text-muted-foreground">
                        Showing {startIndex + 1}-{Math.min(endIndex, filteredMistakes.length)} of {filteredMistakes.length} mistakes to avoid
                    </div>

                    {currentMistakes.map((mistake, index) => (
                        <Link 
                            key={`${mistake.postId}-${index}`} 
                            href={`/insights/${encodeURIComponent(mistake.postTitle.split(' ').join('-'))}`}
                            className="block group"
                        >
                            <Card className="p-0 border border-border/50 bg-card hover:bg-muted/30 hover:border-border transition-all duration-200 hover:shadow-sm cursor-pointer">
                                <div className="p-6 space-y-5">
                                    {/* Header with impact badge */}
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="font-display text-xl font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
                                            {mistake.title}
                                        </h3>
                                        <Badge
                                            variant="outline"
                                            className={`shrink-0 capitalize px-3 py-1.5 text-xs font-semibold border-2 ${mistake.impact_level === 'critical'
                                                ? 'bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
                                                : mistake.impact_level === 'important'
                                                    ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
                                                    : 'bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
                                                }`}
                                        >
                                            {mistake.impact_level.replace('_', ' ')}
                                        </Badge>
                                    </div>

                                    {/* Description */}
                                    <p className="font-sans text-base text-muted-foreground leading-relaxed">
                                        {mistake.description}
                                    </p>

                                    {/* Context and Reasoning - Always visible but condensed */}
                                    <div className="bg-muted/40 rounded-lg p-4 space-y-3">
                                        <div className="space-y-2">
                                            <div>
                                                <span className="font-medium text-sm text-foreground">Why this matters:</span>
                                                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{mistake.reasoning}</p>
                                            </div>
                                            {mistake.context && (
                                                <div>
                                                    <span className="font-medium text-sm text-foreground">Context:</span>
                                                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{mistake.context}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Project Information */}
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="text-sm font-medium text-foreground">Project:</span>
                                        {mistake.projectType !== 'Undefined' && (
                                            <Badge variant="secondary" className="bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                                                {mistake.projectType}
                                            </Badge>
                                        )}
                                        <Badge variant="secondary" className="bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                                            {mistake.typeOfProject}
                                        </Badge>
                                        <Badge variant="secondary" className="bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800">
                                            {mistake.typeOfProblem}
                                        </Badge>
                                    </div>

                                    {/* Tech Stack */}
                                    {(mistake.techStack.languages.length > 0 || mistake.techStack.tools.length > 0) && (
                                        <div className="space-y-3">
                                            <span className="text-sm font-medium text-foreground">Tech Stack:</span>
                                            <div className="flex flex-wrap gap-2">
                                                {mistake.techStack.languages.map((lang) => (
                                                    <Badge key={lang} variant="outline" className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 text-xs">
                                                        {lang}
                                                    </Badge>
                                                ))}
                                                {mistake.techStack.tools.map((tool) => (
                                                    <Badge key={tool} variant="outline" className="bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800 text-xs">
                                                        {tool}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Tags */}
                                    {mistake.tags.length > 0 && (
                                        <div className="space-y-3">
                                            <span className="text-sm font-medium text-foreground">Topics:</span>
                                            <div className="flex flex-wrap gap-2">
                                                {mistake.tags.map((tag) => (
                                                    <Badge key={tag} variant="outline" className="bg-gray-50 dark:bg-gray-950/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 text-xs">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Call to action footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                        <div className="space-y-1">
                                            <div className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                                                Read full insights →
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {formatDistanceToNow(mistake.createdAt, { addSuffix: true })} • {mistake.postTitle} • by{' '}
                                                <a 
                                                    href={`https://www.reddit.com/user/${mistake.postAuthor}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:underline"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    {mistake.postAuthor}
                                                </a>
                                            </div>
                                        </div>
                                        {mistake.source && (
                                            <div className="text-xs text-muted-foreground">
                                                Source: {mistake.source}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}

                    {/* Pagination controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between py-4">
                            <Button
                                variant="outline"
                                onClick={goToPrevPage}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4 mr-2" />
                                Previous
                            </Button>
                            <div className="text-sm text-muted-foreground">
                                Page {currentPage} of {totalPages} <span className="text-xs text-muted-foreground">({filteredMistakes.length} total items)</span>
                            </div>
                            <Button
                                variant="outline"
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                            >
                                Next
                                <ChevronRight className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
} 
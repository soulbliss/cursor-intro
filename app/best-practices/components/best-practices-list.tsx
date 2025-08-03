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

type Practice = {
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
    practices: Practice[]
}

const ITEMS_PER_PAGE = 10

export function BestPracticesList({ practices }: Props) {
    // Apply default sorting on initial load
    const defaultSortedPractices = [...practices].sort((a, b) => {
        const impactOrder = { critical: 3, important: 2, nice_to_have: 1 }
        const impactDiff = impactOrder[b.impact_level] - impactOrder[a.impact_level]
        return impactDiff !== 0 ? impactDiff : b.ups - a.ups
    })
    
    const [filteredPractices, setFilteredPractices] = useState(defaultSortedPractices)
    const [currentPage, setCurrentPage] = useState(1)

    // Calculate pagination values
    const totalPages = Math.ceil(filteredPractices.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentPractices = filteredPractices.slice(startIndex, endIndex)

    const handleFilterChange = (filters: {
        languages: string[]
        tools: string[]
        impactLevels: string[]
        sortBy: 'default' | 'newest' | 'oldest'
    }) => {
        const filtered = practices.filter((practice) => {
            const matchesLanguages =
                filters.languages.length === 0 ||
                practice.techStack.languages.some((lang) =>
                    filters.languages.includes(lang)
                )

            const matchesTools =
                filters.tools.length === 0 ||
                practice.techStack.tools.some((tool) =>
                    filters.tools.includes(tool)
                )

            const matchesImpact =
                filters.impactLevels.length === 0 ||
                filters.impactLevels.includes(practice.impact_level)

            return matchesLanguages && matchesTools && matchesImpact
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

        setFilteredPractices(sorted)
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
                        <Filter practices={practices} onFilterChange={handleFilterChange} />
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
                                        <Filter practices={practices} onFilterChange={handleFilterChange} />
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Results count */}
                    <div className="text-sm text-muted-foreground">
                        Showing {startIndex + 1}-{Math.min(endIndex, filteredPractices.length)} of {filteredPractices.length} practices
                    </div>

                    {currentPractices.map((practice, index) => (
                        <Link 
                            key={`${practice.postId}-${index}`} 
                            href={`/insights/${encodeURIComponent(practice.postTitle.split(' ').join('-'))}`}
                            className="block group"
                        >
                            <Card className="p-0 border border-border/50 bg-card hover:bg-muted/30 hover:border-border transition-all duration-200 hover:shadow-sm cursor-pointer">
                                <div className="p-6 space-y-5">
                                    {/* Header with impact badge */}
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="font-display text-xl font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
                                            {practice.title}
                                        </h3>
                                        <Badge
                                            variant="outline"
                                            className={`shrink-0 capitalize px-3 py-1.5 text-xs font-semibold border-2 ${practice.impact_level === 'critical'
                                                ? 'bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
                                                : practice.impact_level === 'important'
                                                    ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
                                                    : 'bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
                                                }`}
                                        >
                                            {practice.impact_level.replace('_', ' ')}
                                        </Badge>
                                    </div>

                                    {/* Description */}
                                    <p className="font-sans text-base text-muted-foreground leading-relaxed">
                                        {practice.description}
                                    </p>

                                    {/* Context and Reasoning - Always visible but condensed */}
                                    <div className="bg-muted/40 rounded-lg p-4 space-y-3">
                                        <div className="space-y-2">
                                            <div>
                                                <span className="font-medium text-sm text-foreground">Why this helps:</span>
                                                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{practice.reasoning}</p>
                                            </div>
                                            {practice.context && (
                                                <div>
                                                    <span className="font-medium text-sm text-foreground">Context:</span>
                                                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{practice.context}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    {(practice.techStack.languages.length > 0 || practice.techStack.tools.length > 0) && (
                                        <div className="space-y-3">
                                            <span className="text-sm font-medium text-foreground">Tech Stack:</span>
                                            <div className="flex flex-wrap gap-2">
                                                {practice.techStack.languages.map((lang) => (
                                                    <Badge key={lang} variant="outline" className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 text-xs">
                                                        {lang}
                                                    </Badge>
                                                ))}
                                                {practice.techStack.tools.map((tool) => (
                                                    <Badge key={tool} variant="outline" className="bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800 text-xs">
                                                        {tool}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Tags */}
                                    {practice.tags.length > 0 && (
                                        <div className="space-y-3">
                                            <span className="text-sm font-medium text-foreground">Topics:</span>
                                            <div className="flex flex-wrap gap-2">
                                                {practice.tags.map((tag) => (
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
                                                {formatDistanceToNow(practice.createdAt, { addSuffix: true })} • {practice.postTitle} • by{' '}
                                                <a 
                                                    href={`https://www.reddit.com/user/${practice.postAuthor}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:underline"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    {practice.postAuthor}
                                                </a>
                                            </div>
                                        </div>
                                        {practice.source && (
                                            <div className="text-xs text-muted-foreground">
                                                Source: {practice.source}
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
                                Page {currentPage} of {totalPages}
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
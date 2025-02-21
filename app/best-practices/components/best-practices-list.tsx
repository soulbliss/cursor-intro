'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'
import { ChevronLeft, ChevronRight, Info } from 'lucide-react'
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
    const [filteredPractices, setFilteredPractices] = useState(practices)
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

        setFilteredPractices(filtered)
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
                        <Filter practices={practices} onFilterChange={handleFilterChange} />
                    </div>

                    {/* Results count */}
                    <div className="text-sm text-muted-foreground">
                        Showing {startIndex + 1}-{Math.min(endIndex, filteredPractices.length)} of {filteredPractices.length} practices
                    </div>

                    {currentPractices.map((practice, index) => (
                        <Card key={`${practice.postId}-${index}`} className="p-6">
                            <div className="space-y-4">
                                {/* Header */}
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-lg">{practice.title}</h3>
                                    <Badge
                                        variant="outline"
                                        className={`capitalize px-3 py-1 text-sm font-medium ${practice.impact_level === 'critical'
                                            ? 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
                                            : practice.impact_level === 'important'
                                                ? 'bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
                                                : 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
                                            }`}
                                    >
                                        {practice.impact_level}
                                    </Badge>
                                </div>

                                {/* Description */}
                                <p className="text-muted-foreground leading-relaxed">
                                    {practice.description}
                                </p>

                                {/* Tech Stack & Tags */}
                                <div className="space-y-3">
                                    {/* Languages & Tools */}
                                    {(practice.techStack.languages.length > 0 || practice.techStack.tools.length > 0) && (
                                        <div className="flex flex-wrap gap-2">
                                            {practice.techStack.languages.map((lang) => (
                                                <Badge key={lang} variant="outline" className="bg-purple-50 dark:bg-purple-900/20">
                                                    {lang}
                                                </Badge>
                                            ))}
                                            {practice.techStack.tools.map((tool) => (
                                                <Badge key={tool} variant="outline" className="bg-green-50 dark:bg-green-900/20">
                                                    {tool}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {practice.tags.map((tag) => (
                                            <Badge key={tag} variant="outline" className="bg-gray-50 dark:bg-gray-900/20">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Source & Context */}
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="source" className="border-none">
                                        <AccordionTrigger className="text-sm text-muted-foreground hover:no-underline py-0">
                                            <div className="flex items-center gap-2">
                                                <Info className="h-4 w-4" />
                                                View Source & Context
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="text-sm text-muted-foreground pt-4">
                                            <div className="space-y-2">
                                                <p><strong>Context:</strong> {practice.context}</p>
                                                <p><strong>Reasoning:</strong> {practice.reasoning}</p>
                                                <p><strong>Source:</strong> {practice.source}</p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>

                                {/* Post Info */}
                                <div className="text-sm text-muted-foreground pt-4 border-t">
                                    <Link
                                        href={`/insights/${encodeURIComponent(practice.postTitle.split(' ').join('-'))}`}
                                        className="hover:text-primary underline"
                                    >
                                        From post: {practice.postTitle}
                                    </Link>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span>{formatDistanceToNow(practice.createdAt, { addSuffix: true })}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
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
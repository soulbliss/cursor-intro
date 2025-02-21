'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { formatDistanceToNow } from 'date-fns'
import { ChevronLeft, ChevronRight, Info, SlidersHorizontal } from 'lucide-react'
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

const ITEMS_PER_PAGE = 10

export function MistakesList({ mistakes }: Props) {
    const [filteredMistakes, setFilteredMistakes] = useState(mistakes)
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

        setFilteredMistakes(filtered)
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
                        <Card key={`${mistake.postId}-${index}`} className="p-6 border-none bg-muted/40 hover:bg-muted/60 transition-colors">
                            <div className="space-y-6">
                                {/* Header */}
                                <div className="flex items-center justify-between">
                                    <h3 className="font-display text-lg font-medium text-foreground/90">{mistake.title}</h3>
                                    <Badge
                                        variant="outline"
                                        className={`capitalize px-3 py-1 text-sm font-medium ${mistake.impact_level === 'critical'
                                            ? 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
                                            : mistake.impact_level === 'important'
                                                ? 'bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
                                                : 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
                                            }`}
                                    >
                                        {mistake.impact_level}
                                    </Badge>
                                </div>

                                {/* Description */}
                                <p className="font-sans text-base text-muted-foreground leading-relaxed">
                                    {mistake.description}
                                </p>

                                {/* Project Info */}
                                <div className="space-y-3 bg-muted/50 rounded-lg p-4">
                                    <div className="font-display text-sm font-medium text-foreground/70">Project Information</div>
                                    <div className="flex flex-wrap gap-4">
                                        {mistake.projectType !== 'Undefined' && (
                                            <div className="flex items-center gap-2">
                                                <span className="font-sans text-xs font-medium uppercase tracking-wider text-muted-foreground/60">Scale</span>
                                                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20">
                                                    {mistake.projectType}
                                                </Badge>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <span className="font-sans text-xs font-medium uppercase tracking-wider text-muted-foreground/60">Type</span>
                                            <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20">
                                                {mistake.typeOfProject}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-sans text-xs font-medium uppercase tracking-wider text-muted-foreground/60">Problem</span>
                                            <Badge variant="outline" className="bg-amber-50 dark:bg-amber-900/20">
                                                {mistake.typeOfProblem}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                {/* Tech Stack & Tags */}
                                <div className="space-y-4">
                                    {/* Languages & Tools */}
                                    {(mistake.techStack.languages.length > 0 || mistake.techStack.tools.length > 0) && (
                                        <div className="space-y-3 bg-muted/30 rounded-lg p-4">
                                            <div className="font-display text-sm font-medium text-foreground/70">Tech Stack</div>
                                            <div className="flex flex-wrap gap-6">
                                                {mistake.techStack.languages.length > 0 && (
                                                    <div className="flex items-center gap-3">
                                                        <span className="font-sans text-xs font-medium uppercase tracking-wider text-muted-foreground/60">Languages</span>
                                                        <div className="flex flex-wrap gap-2">
                                                            {mistake.techStack.languages.map((lang) => (
                                                                <Badge key={lang} variant="outline" className="bg-emerald-50 dark:bg-emerald-900/20">
                                                                    {lang}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                {mistake.techStack.tools.length > 0 && (
                                                    <div className="flex items-center gap-3">
                                                        <span className="font-sans text-xs font-medium uppercase tracking-wider text-muted-foreground/60">Tools</span>
                                                        <div className="flex flex-wrap gap-2">
                                                            {mistake.techStack.tools.map((tool) => (
                                                                <Badge key={tool} variant="outline" className="bg-teal-50 dark:bg-teal-900/20">
                                                                    {tool}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Tags */}
                                    {mistake.tags.length > 0 && (
                                        <div className="space-y-3 bg-muted/20 rounded-lg p-4">
                                            <div className="font-display text-sm font-medium text-foreground/70">Related Topics</div>
                                            <div className="flex items-center gap-3">
                                                <span className="font-sans text-xs font-medium uppercase tracking-wider text-muted-foreground/60">Tags</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {mistake.tags.map((tag) => (
                                                        <Badge key={tag} variant="outline" className="bg-gray-50 dark:bg-gray-900/20">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Source & Context */}
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="source" className="border-none">
                                        <AccordionTrigger className="font-sans text-sm text-muted-foreground hover:no-underline py-0">
                                            <div className="flex items-center gap-2">
                                                <Info className="h-4 w-4" />
                                                View Source & Context
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="pt-4">
                                            <div className="space-y-3 font-sans text-sm text-muted-foreground bg-muted/20 rounded-lg p-4">
                                                <p><span className="font-medium text-foreground/70">Context:</span> {mistake.context}</p>
                                                <p><span className="font-medium text-foreground/70">Reasoning:</span> {mistake.reasoning}</p>
                                                <p><span className="font-medium text-foreground/70">Source:</span> {mistake.source}</p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>

                                {/* Post Info */}
                                <div className="pt-4 bg-muted/10 mt-4 rounded-lg p-4">
                                    <Link
                                        href={`/insights/${encodeURIComponent(mistake.postTitle.split(' ').join('-'))}`}
                                        className="font-display text-sm font-medium text-foreground/70 hover:text-primary underline"
                                    >
                                        More insights: {mistake.postTitle}
                                    </Link>
                                    <div className="flex items-center gap-2 mt-1 font-sans text-xs text-muted-foreground">
                                        <span>{formatDistanceToNow(mistake.createdAt, { addSuffix: true })}</span>
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
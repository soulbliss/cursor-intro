'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'
import { Info } from 'lucide-react'
import Link from 'next/link'

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

export function BestPracticesList({ practices }: Props) {
    return (
        <div className="grid grid-cols-1 gap-6">
            {practices.map((practice, index) => (
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
                                className="hover:text-primary"
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
        </div>
    )
} 
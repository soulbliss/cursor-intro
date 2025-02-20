'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'
import { Info } from 'lucide-react'
import Link from 'next/link'

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

export function MistakesList({ mistakes }: Props) {
    return (
        <div className="grid grid-cols-1 gap-6">
            {mistakes.map((mistake, index) => (
                <Card key={`${mistake.postId}-${index}`} className="p-6">
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h3 className="font-display text-xl font-bold">{mistake.title}</h3>
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
                        <div className="space-y-3">
                            <div className="font-display text-sm font-bold tracking-wide uppercase text-foreground/80">Project Information</div>
                            <div className="flex flex-wrap gap-4">
                                {mistake.projectType !== 'Undefined' && (
                                    <div className="flex items-center gap-2">
                                        <span className="font-sans text-xs font-medium uppercase tracking-wider text-muted-foreground/70">Scale</span>
                                        <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20">
                                            {mistake.projectType}
                                        </Badge>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <span className="font-sans text-xs font-medium uppercase tracking-wider text-muted-foreground/70">Type</span>
                                    <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20">
                                        {mistake.typeOfProject}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-sans text-xs font-medium uppercase tracking-wider text-muted-foreground/70">Problem</span>
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
                                <div className="space-y-3">
                                    <div className="font-display text-sm font-bold tracking-wide uppercase text-foreground/80">Tech Stack</div>
                                    <div className="flex flex-wrap gap-6">
                                        {mistake.techStack.languages.length > 0 && (
                                            <div className="flex items-center gap-3">
                                                <span className="font-sans text-xs font-medium uppercase tracking-wider text-muted-foreground/70">Languages</span>
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
                                                <span className="font-sans text-xs font-medium uppercase tracking-wider text-muted-foreground/70">Tools</span>
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
                                <div className="space-y-3">
                                    <div className="font-display text-sm font-bold tracking-wide uppercase text-foreground/80">Related Topics</div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-sans text-xs font-medium uppercase tracking-wider text-muted-foreground/70">Tags</span>
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
                                    <div className="space-y-3 font-sans text-sm text-muted-foreground">
                                        <p><span className="font-medium text-foreground">Context:</span> {mistake.context}</p>
                                        <p><span className="font-medium text-foreground">Reasoning:</span> {mistake.reasoning}</p>
                                        <p><span className="font-medium text-foreground">Source:</span> {mistake.source}</p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        {/* Post Info */}
                        <div className="pt-4 border-t">
                            <Link
                                href={`/insights/${encodeURIComponent(mistake.postTitle.split(' ').join('-'))}`}
                                className="font-display text-sm font-medium hover:text-primary"
                            >
                                From post: {mistake.postTitle}
                            </Link>
                            <div className="flex items-center gap-2 mt-1 font-sans text-xs text-muted-foreground">
                                <span>{formatDistanceToNow(mistake.createdAt, { addSuffix: true })}</span>

                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
} 
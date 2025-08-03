'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { filterInsights, paginateInsights, type InsightRow } from '@/lib/insights'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { ArrowDownIcon, ArrowUpIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { useState } from 'react'
import { useFilters } from './filter-context'

const TAG_COLORS = [
    'bg-primary/10 text-primary border-primary/20',
    'bg-blue-500/10 text-blue-500 dark:text-blue-400 border-blue-500/20',
    'bg-green-500/10 text-green-500 dark:text-green-400 border-green-500/20',
    'bg-orange-500/10 text-orange-500 dark:text-orange-400 border-orange-500/20',
    'bg-purple-500/10 text-purple-500 dark:text-purple-400 border-purple-500/20',
    'bg-rose-500/10 text-rose-500 dark:text-rose-400 border-rose-500/20'
] as const

const DEFAULT_TAG_COLOR = TAG_COLORS[0]

function getTagColor(tag: string): string {
    if (!tag) return DEFAULT_TAG_COLOR
    // Use the tag's string to consistently pick a color
    const index = Math.abs(tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % TAG_COLORS.length
    return TAG_COLORS[index] || DEFAULT_TAG_COLOR
}

type SortConfig = {
    key: keyof InsightRow | null
    direction: 'asc' | 'desc'
}

export default function InsightsTable({
    insights,
}: {
    insights: InsightRow[]
}) {
    const router = useRouter()
    const { state, dispatch } = useFilters()
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'desc' })

    const createSlug = (title: string) => {
        return encodeURIComponent(title
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-'))
    }

    const handleTagClick = (tag: string, e: React.MouseEvent) => {
        e.stopPropagation() // Prevent row click when clicking tag
        const newTags = state.tags.includes(tag)
            ? state.tags.filter(t => t !== tag)
            : [...state.tags, tag]
        dispatch({ type: 'SET_TAGS', payload: newTags })
    }

    // Apply filters and sorting
    const sortedAndFilteredInsights = React.useMemo(() => {
        let result = filterInsights(insights, state)

        if (sortConfig.key) {
            result = [...result].sort((a, b) => {
                if (a[sortConfig.key!] < b[sortConfig.key!]) {
                    return sortConfig.direction === 'asc' ? -1 : 1
                }
                if (a[sortConfig.key!] > b[sortConfig.key!]) {
                    return sortConfig.direction === 'asc' ? 1 : -1
                }
                return 0
            })
        }

        return result
    }, [insights, state, sortConfig])

    const paginatedInsights = paginateInsights(
        sortedAndFilteredInsights,
        state.page,
        state.perPage
    )

    const totalPages = Math.ceil(sortedAndFilteredInsights.length / state.perPage)

    const handleSort = (key: keyof InsightRow) => {
        setSortConfig(current => ({
            key,
            direction: current.key === key && current.direction === 'desc' ? 'asc' : 'desc'
        }))
    }

    const SortIcon = ({ columnKey }: { columnKey: keyof InsightRow }) => {
        if (sortConfig.key !== columnKey) return null
        return sortConfig.direction === 'desc' ?
            <ArrowDownIcon className="inline h-4 w-4" /> :
            <ArrowUpIcon className="inline h-4 w-4" />
    }

    return (
        <div className="space-y-4">
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[60px]">
                                #
                            </TableHead>
                            <TableHead
                                className="w-[400px] cursor-pointer"
                                onClick={() => handleSort('title')}
                            >
                                Title <SortIcon columnKey="title" />
                            </TableHead>
                            <TableHead
                                className="w-[140px] cursor-pointer"
                                onClick={() => handleSort('projectType')}
                            >
                                Project Type <SortIcon columnKey="projectType" />
                            </TableHead>
                            <TableHead>Tags</TableHead>
                            <TableHead
                                className="w-[120px] cursor-pointer"
                                onClick={() => handleSort('createdAt')}
                            >
                                Updated <SortIcon columnKey="createdAt" />
                            </TableHead>
                            <TableHead
                                className="text-right cursor-pointer"
                                onClick={() => handleSort('relevanceScore')}
                            >
                                Relevance <SortIcon columnKey="relevanceScore" />
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedInsights.map((insight, index) => (
                            <TableRow
                                key={insight.id}
                                className="cursor-pointer hover:bg-muted/50 transition-colors"
                                onClick={() => router.push(`/insights/${createSlug(insight.title)}`)}
                            >
                                <TableCell className="text-center text-sm text-muted-foreground">
                                    {(state.page - 1) * state.perPage + index + 1}
                                </TableCell>
                                <TableCell>
                                    <div className="space-y-1">
                                        <div className="font-semibold">{insight.title}</div>

                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="font-medium whitespace-nowrap max-w-full truncate">
                                        {insight.projectType}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {insight.tags.slice(0, 3).map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className={cn(
                                                    "border cursor-pointer transition-colors hover:opacity-80",
                                                    getTagColor(tag),
                                                    state.tags.includes(tag) && "ring-2 ring-primary ring-offset-background"
                                                )}
                                                onClick={(e) => handleTagClick(tag, e)}
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                        {insight.tags.length > 3 && (
                                            <Badge
                                                variant="outline"
                                                className="bg-muted/50 text-muted-foreground border-muted"
                                            >
                                                +{insight.tags.length - 3}
                                            </Badge>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm text-muted-foreground">
                                        {formatDistanceToNow(insight.createdAt, { addSuffix: true })}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Badge
                                        variant={
                                            insight.relevanceScore >= 0.8
                                                ? 'default'
                                                : insight.relevanceScore >= 0.6
                                                    ? 'secondary'
                                                    : 'outline'
                                        }
                                        className={cn(
                                            insight.relevanceScore >= 0.8 && "bg-green-500/15 text-green-700 hover:bg-green-500/25",
                                            insight.relevanceScore >= 0.6 && insight.relevanceScore < 0.8 && "bg-yellow-500/15 text-yellow-700 hover:bg-yellow-500/25",
                                            insight.relevanceScore < 0.6 && "bg-red-500/15 text-red-700 hover:bg-red-500/25"
                                        )}
                                    >
                                        {Math.min(100, Number(insight.relevanceScore)).toFixed(0)}%
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        Page {state.page} of {totalPages} ({sortedAndFilteredInsights.length} total items)
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => dispatch({ type: 'SET_PAGE', payload: state.page - 1 })}
                            disabled={state.page <= 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => dispatch({ type: 'SET_PAGE', payload: state.page + 1 })}
                            disabled={state.page >= totalPages}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
} 
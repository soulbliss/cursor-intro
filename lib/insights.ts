import { z } from 'zod'

// Types
export type InsightRow = {
    id: string
    postId: string
    postAuthor: string
    title: string
    projectType: string
    typeOfProject: string
    typeOfProblem: string
    tags: string[]
    techStack: {
        languages: string[]
        frameworks: string[]
        tools: string[]
        platforms: string[]
    }
    relevanceScore: number
    createdAt: number
    updatedAt: number
}

export type InsightFilters = {
    projectTypes: string[]
    typeOfProjects: string[]
    problemType: string | null
    tags: string[]
    tools: string[]
    languages: string[]
    search: string
    page: number
    perPage: number
}

// Validation schemas
export const insightFiltersSchema = z.object({
    projectTypes: z.array(z.string()),
    typeOfProjects: z.array(z.string()),
    problemType: z.string().nullable(),
    tags: z.array(z.string()),
    tools: z.array(z.string()),
    languages: z.array(z.string()),
    search: z.string(),
    page: z.number().min(1),
    perPage: z.number().min(1).max(50),
})

// Helper functions
export function filterInsights(insights: InsightRow[], filters: InsightFilters): InsightRow[] {
    return insights.filter((insight) => {
        // Project type filter
        if (filters.projectTypes.length > 0 && !filters.projectTypes.includes(insight.projectType)) {
            return false
        }

        // Type of project filter
        if (filters.typeOfProjects.length > 0 && !filters.typeOfProjects.includes(insight.typeOfProject)) {
            return false
        }

        // Problem type filter
        if (filters.problemType && insight.typeOfProblem !== filters.problemType) {
            return false
        }

        // Tags filter
        if (filters.tags.length > 0 && !insight.tags.some((tag) => filters.tags.includes(tag))) {
            return false
        }

        // Tools filter
        if (filters.tools.length > 0 && !filters.tools.some(tool => insight.techStack.tools.includes(tool))) {
            return false
        }

        // Languages filter
        if (filters.languages.length > 0 && !filters.languages.some(lang => insight.techStack.languages.includes(lang))) {
            return false
        }

        // Search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase()
            const matchesTitle = insight.title.toLowerCase().includes(searchLower)
            const matchesTags = insight.tags.some((tag) => tag.toLowerCase().includes(searchLower))
            const matchesTechStack = Object.values(insight.techStack).some((items) =>
                items.some((item) => item.toLowerCase().includes(searchLower))
            )

            if (!matchesTitle && !matchesTags && !matchesTechStack) {
                return false
            }
        }

        return true
    })
}

export function paginateInsights(insights: InsightRow[], page: number, perPage: number): InsightRow[] {
    const start = (page - 1) * perPage
    const end = start + perPage
    return insights.slice(start, end)
}

export function sortInsights(
    insights: InsightRow[],
    sortBy: keyof InsightRow,
    sortOrder: 'asc' | 'desc'
): InsightRow[] {
    return [...insights].sort((a, b) => {
        const aValue = a[sortBy]
        const bValue = b[sortBy]

        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortOrder === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue)
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
        }

        return 0
    })
}

// Constants
export const DEFAULT_PER_PAGE = 20
export const DEFAULT_FILTERS: InsightFilters = {
    projectTypes: [],
    typeOfProjects: [],
    problemType: null,
    tags: [],
    tools: [],
    languages: [],
    search: '',
    page: 1,
    perPage: DEFAULT_PER_PAGE,
}

export const PROJECT_TYPES = ['Small', 'Medium', 'Large', 'Undefined'] as const
export const COMMON_TAGS = [
    'TDD',
    'Git',
    'Workflow',
    'Testing',
    'CI/CD',
    'Performance',
    'Security',
    'Architecture',
] as const 
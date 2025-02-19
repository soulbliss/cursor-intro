'use client'

import { DEFAULT_FILTERS, InsightFilters, insightFiltersSchema } from '@/lib/insights'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useReducer,
} from 'react'

type FilterState = InsightFilters & {
    problemType: string | null
}

type FilterAction =
    | { type: 'SET_PROJECT_TYPES'; payload: string[] }
    | { type: 'SET_TYPE_OF_PROJECTS'; payload: string[] }
    | { type: 'SET_PROBLEM_TYPE'; payload: string | null }
    | { type: 'SET_TAGS'; payload: string[] }
    | { type: 'SET_TOOLS'; payload: string[] }
    | { type: 'SET_LANGUAGES'; payload: string[] }
    | { type: 'SET_SEARCH'; payload: string }
    | { type: 'SET_PAGE'; payload: number }
    | { type: 'RESET_FILTERS' }

const FilterContext = createContext<{
    state: FilterState
    dispatch: React.Dispatch<FilterAction>
    resetFilters: () => void
} | null>(null)

const DEFAULT_STATE: FilterState = {
    ...DEFAULT_FILTERS,
    problemType: null,
}

function filterReducer(state: FilterState, action: FilterAction): FilterState {
    switch (action.type) {
        case 'SET_PROJECT_TYPES':
            return { ...state, projectTypes: action.payload, page: 1 }
        case 'SET_TYPE_OF_PROJECTS':
            return { ...state, typeOfProjects: action.payload, page: 1 }
        case 'SET_PROBLEM_TYPE':
            return { ...state, problemType: action.payload, page: 1 }
        case 'SET_TAGS':
            return { ...state, tags: action.payload, page: 1 }
        case 'SET_TOOLS':
            return { ...state, tools: action.payload, page: 1 }
        case 'SET_LANGUAGES':
            return { ...state, languages: action.payload, page: 1 }
        case 'SET_SEARCH':
            return { ...state, search: action.payload, page: 1 }
        case 'SET_PAGE':
            return { ...state, page: action.payload }
        case 'RESET_FILTERS':
            return DEFAULT_STATE
        default:
            return state
    }
}

function parseFiltersFromUrl(searchParams: URLSearchParams): FilterState {
    const filters: FilterState = {
        projectTypes: searchParams.get('projectTypes')?.split(',').filter(Boolean) || [],
        typeOfProjects: searchParams.get('typeOfProjects')?.split(',').filter(Boolean) || [],
        problemType: searchParams.get('problemType') || null,
        tags: searchParams.get('tags')?.split(',').filter(Boolean) || [],
        tools: searchParams.get('tools')?.split(',').filter(Boolean) || [],
        languages: searchParams.get('languages')?.split(',').filter(Boolean) || [],
        search: searchParams.get('search') || '',
        page: parseInt(searchParams.get('page') || '1', 10),
        perPage: parseInt(searchParams.get('perPage') || String(DEFAULT_FILTERS.perPage), 10),
    }

    try {
        return insightFiltersSchema.parse(filters) as FilterState
    } catch (error) {
        return DEFAULT_STATE
    }
}

function filtersToSearchParams(filters: FilterState): URLSearchParams {
    const searchParams = new URLSearchParams()

    if (filters.projectTypes.length > 0) {
        searchParams.set('projectTypes', filters.projectTypes.join(','))
    }
    if (filters.typeOfProjects.length > 0) {
        searchParams.set('typeOfProjects', filters.typeOfProjects.join(','))
    }
    if (filters.problemType) {
        searchParams.set('problemType', filters.problemType)
    }
    if (filters.tags.length > 0) {
        searchParams.set('tags', filters.tags.join(','))
    }
    if (filters.tools.length > 0) {
        searchParams.set('tools', filters.tools.join(','))
    }
    if (filters.languages.length > 0) {
        searchParams.set('languages', filters.languages.join(','))
    }
    if (filters.search) {
        searchParams.set('search', filters.search)
    }
    if (filters.page !== 1) {
        searchParams.set('page', String(filters.page))
    }
    if (filters.perPage !== DEFAULT_FILTERS.perPage) {
        searchParams.set('perPage', String(filters.perPage))
    }

    return searchParams
}

export function FilterProvider({ children }: { children: ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [state, dispatch] = useReducer(filterReducer, parseFiltersFromUrl(searchParams))

    // Sync URL with state
    useEffect(() => {
        const newSearchParams = filtersToSearchParams(state)
        const search = newSearchParams.toString()
        const url = search ? `${pathname}?${search}` : pathname
        router.push(url, { scroll: false })
    }, [state, pathname, router])

    const resetFilters = useCallback(() => {
        dispatch({ type: 'RESET_FILTERS' })
    }, [])

    return (
        <FilterContext.Provider value={{ state, dispatch, resetFilters }}>
            {children}
        </FilterContext.Provider>
    )
}

export function useFilters() {
    const context = useContext(FilterContext)
    if (!context) {
        throw new Error('useFilters must be used within a FilterProvider')
    }
    return context
}


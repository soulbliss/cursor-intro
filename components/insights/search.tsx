'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useFilters } from './filter-context'

export default function InsightsSearch() {
    const { state, dispatch } = useFilters()
    const [value, setValue] = useState(state.search)

    const debouncedSearch = useDebouncedCallback((value: string) => {
        dispatch({ type: 'SET_SEARCH', payload: value })
    }, 300)

    useEffect(() => {
        setValue(state.search)
    }, [state.search])

    return (
        <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Search insights..."
                className="pl-8"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value)
                    debouncedSearch(e.target.value)
                }}
            />
        </div>
    )
} 
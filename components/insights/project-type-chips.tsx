'use client'

import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { useFilters } from './filter-context'

type ProjectTypeChipsProps = {
    projectTypes: string[]
    problemTypes: string[]
}

export function ProjectTypeChips({ projectTypes, problemTypes }: ProjectTypeChipsProps) {
    const { state, dispatch } = useFilters()

    const toggleProjectType = (type: string) => {
        const newTypes = state.projectTypes.includes(type)
            ? state.projectTypes.filter(t => t !== type)
            : [...state.projectTypes, type]
        dispatch({ type: 'SET_PROJECT_TYPES', payload: newTypes })
    }

    const toggleProblemType = (type: string) => {
        dispatch({
            type: 'SET_PROBLEM_TYPE',
            payload: state.problemType === type ? null : type
        })
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-sm font-medium">Project Types</h3>
                <div className="flex flex-wrap gap-2">
                    {projectTypes.filter(type => type !== 'Undefined').map((type) => (
                        <button
                            key={type}
                            onClick={() => toggleProjectType(type)}
                            className={cn(
                                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                                state.projectTypes.includes(type)
                                    ? "border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
                                    : "border-border hover:bg-muted"
                            )}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-sm font-medium">Problem Types</h3>
                <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                    <div className="flex w-max space-x-4 p-4">
                        {problemTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => toggleProblemType(type)}
                                className={cn(
                                    "rounded-lg border bg-card text-card-foreground shadow-sm p-2 cursor-pointer hover:bg-muted transition-colors",
                                    state.problemType === type && "border-primary bg-primary/10"
                                )}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    )
} 
'use client'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'

type FilterProps = {
    mistakes: {
        techStack: {
            languages: string[]
            tools: string[]
        }
        impact_level: string
        projectType: string
        typeOfProject: string
        typeOfProblem: string
    }[]
    onFilterChange: (filters: {
        languages: string[]
        tools: string[]
        impactLevels: string[]
        projectTypes: string[]
        problemTypes: string[]
        sortBy: 'default' | 'newest' | 'oldest'
    }) => void
    variant?: 'card' | 'sheet'
}

export function Filter({ mistakes, onFilterChange, variant = 'card' }: FilterProps) {
    // Extract unique values
    const uniqueLanguages = Array.from(
        new Set(mistakes.flatMap(p => p.techStack.languages))
    ).sort()
    const uniqueTools = Array.from(
        new Set(mistakes.flatMap(p => p.techStack.tools))
    ).sort()
    const impactLevels = ['critical', 'important', 'nice_to_have']
    const projectTypes = Array.from(
        new Set(mistakes.map(p => p.projectType))
    ).filter(type => type !== 'Undefined').sort()
    const problemTypes = Array.from(
        new Set(mistakes.map(p => p.typeOfProblem))
    ).sort()

    // State for selected filters
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
    const [selectedTools, setSelectedTools] = useState<string[]>([])
    const [selectedImpactLevels, setSelectedImpactLevels] = useState<string[]>([])
    const [selectedProjectTypes, setSelectedProjectTypes] = useState<string[]>([])
    const [selectedProblemTypes, setSelectedProblemTypes] = useState<string[]>([])
    const [sortBy, setSortBy] = useState<'default' | 'newest' | 'oldest'>('default')

    // Update handlers that notify parent
    const updateFilters = () => {
        onFilterChange({
            languages: selectedLanguages,
            tools: selectedTools,
            impactLevels: selectedImpactLevels,
            projectTypes: selectedProjectTypes,
            problemTypes: selectedProblemTypes,
            sortBy,
        })
    }

    const updateSort = (newSortBy: 'default' | 'newest' | 'oldest') => {
        setSortBy(newSortBy)
        onFilterChange({
            languages: selectedLanguages,
            tools: selectedTools,
            impactLevels: selectedImpactLevels,
            projectTypes: selectedProjectTypes,
            problemTypes: selectedProblemTypes,
            sortBy: newSortBy,
        })
    }

    const FilterContent = () => (
        <div className="space-y-6">
            {/* Sort By Section */}
            <div>
                <h3 className="font-medium mb-3">Sort By</h3>
                <div className="space-y-2">
                    {[
                        { value: 'default', label: 'Default (Impact & Popularity)' },
                        { value: 'newest', label: 'Newest First' },
                        { value: 'oldest', label: 'Oldest First' }
                    ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                            <Checkbox
                                id={`sort-${option.value}`}
                                checked={sortBy === option.value}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        updateSort(option.value as 'default' | 'newest' | 'oldest')
                                    }
                                }}
                            />
                            <label
                                htmlFor={`sort-${option.value}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Selected Filters Display */}
            {(selectedLanguages.length > 0 || selectedTools.length > 0 || selectedImpactLevels.length > 0 ||
                selectedProjectTypes.length > 0 || selectedProblemTypes.length > 0) && (
                    <div>
                        <h3 className="font-medium mb-3">Active Filters</h3>
                        <div className="flex flex-wrap gap-2">
                            {selectedImpactLevels.map((level) => (
                                <Badge
                                    key={level}
                                    variant="secondary"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setSelectedImpactLevels(selectedImpactLevels.filter((l) => l !== level))
                                        updateFilters()
                                    }}
                                >
                                    {level.replace('_', ' ')} ×
                                </Badge>
                            ))}
                            {selectedLanguages.map((lang) => (
                                <Badge
                                    key={lang}
                                    variant="secondary"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setSelectedLanguages(selectedLanguages.filter((l) => l !== lang))
                                        updateFilters()
                                    }}
                                >
                                    {lang} ×
                                </Badge>
                            ))}
                            {selectedTools.map((tool) => (
                                <Badge
                                    key={tool}
                                    variant="secondary"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setSelectedTools(selectedTools.filter((t) => t !== tool))
                                        updateFilters()
                                    }}
                                >
                                    {tool} ×
                                </Badge>
                            ))}
                            {selectedProjectTypes.map((type) => (
                                <Badge
                                    key={type}
                                    variant="secondary"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setSelectedProjectTypes(selectedProjectTypes.filter((t) => t !== type))
                                        updateFilters()
                                    }}
                                >
                                    {type} ×
                                </Badge>
                            ))}
                            {selectedProblemTypes.map((type) => (
                                <Badge
                                    key={type}
                                    variant="secondary"
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setSelectedProblemTypes(selectedProblemTypes.filter((t) => t !== type))
                                        updateFilters()
                                    }}
                                >
                                    {type} ×
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

            {/* Impact Level Filter */}
            <div>
                <h3 className="font-medium mb-3">Impact Level</h3>
                <div className="space-y-2">
                    {impactLevels.map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                            <Checkbox
                                id={`impact-${level}`}
                                checked={selectedImpactLevels.includes(level)}
                                onCheckedChange={(checked) => {
                                    const newValue = checked
                                        ? [...selectedImpactLevels, level]
                                        : selectedImpactLevels.filter((l) => l !== level)
                                                                            setSelectedImpactLevels(newValue)
                                        onFilterChange({
                                            languages: selectedLanguages,
                                            tools: selectedTools,
                                            impactLevels: newValue,
                                            projectTypes: selectedProjectTypes,
                                            problemTypes: selectedProblemTypes,
                                            sortBy,
                                        })
                                }}
                            />
                            <label
                                htmlFor={`impact-${level}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                            >
                                {level.replace('_', ' ')}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Project Type Filter */}
            {projectTypes.length > 0 && (
                <div>
                    <h3 className="font-medium mb-3">Project Scale</h3>
                    <div className="space-y-2">
                        {projectTypes.map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`project-${type}`}
                                    checked={selectedProjectTypes.includes(type)}
                                    onCheckedChange={(checked) => {
                                        const newValue = checked
                                            ? [...selectedProjectTypes, type]
                                            : selectedProjectTypes.filter((t) => t !== type)
                                        setSelectedProjectTypes(newValue)
                                        onFilterChange({
                                            languages: selectedLanguages,
                                            tools: selectedTools,
                                            impactLevels: selectedImpactLevels,
                                            projectTypes: newValue,
                                            problemTypes: selectedProblemTypes,
                                            sortBy,
                                        })
                                    }}
                                />
                                <label
                                    htmlFor={`project-${type}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {type}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Languages Filter */}
            <div>
                <h3 className="font-medium mb-3">Languages</h3>
                <div className="space-y-2">
                    {uniqueLanguages.filter(language => !['<UNKNOWN>', 'Any'].includes(language)).map((language) => (
                        <div key={language} className="flex items-center space-x-2">
                            <Checkbox
                                id={`lang-${language}`}
                                checked={selectedLanguages.includes(language)}
                                onCheckedChange={(checked) => {
                                    const newValue = checked
                                        ? [...selectedLanguages, language]
                                        : selectedLanguages.filter((l) => l !== language)
                                    setSelectedLanguages(newValue)
                                    onFilterChange({
                                        languages: newValue,
                                        tools: selectedTools,
                                        impactLevels: selectedImpactLevels,
                                        projectTypes: selectedProjectTypes,
                                        problemTypes: selectedProblemTypes,
                                        sortBy,
                                    })
                                }}
                            />
                            <label
                                htmlFor={`lang-${language}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {language}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tools Filter */}
            <div>
                <h3 className="font-medium mb-3">Tools</h3>
                <div className="space-y-2">
                    {uniqueTools.map((tool) => (
                        <div key={tool} className="flex items-center space-x-2">
                            <Checkbox
                                id={`tool-${tool}`}
                                checked={selectedTools.includes(tool)}
                                onCheckedChange={(checked) => {
                                    const newValue = checked
                                        ? [...selectedTools, tool]
                                        : selectedTools.filter((t) => t !== tool)
                                    setSelectedTools(newValue)
                                    onFilterChange({
                                        languages: selectedLanguages,
                                        tools: newValue,
                                        impactLevels: selectedImpactLevels,
                                        projectTypes: selectedProjectTypes,
                                        problemTypes: selectedProblemTypes,
                                        sortBy,
                                    })
                                }}
                            />
                            <label
                                htmlFor={`tool-${tool}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {tool}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Problem Type Filter */}
            {/* <div>
                <h3 className="font-medium mb-3">Problem Type</h3>
                <div className="space-y-2">
                    {problemTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                                id={`problem-${type}`}
                                checked={selectedProblemTypes.includes(type)}
                                onCheckedChange={(checked) => {
                                    const newValue = checked
                                        ? [...selectedProblemTypes, type]
                                        : selectedProblemTypes.filter((t) => t !== type)
                                    setSelectedProblemTypes(newValue)
                                    onFilterChange({
                                        languages: selectedLanguages,
                                        tools: selectedTools,
                                        impactLevels: selectedImpactLevels,
                                        projectTypes: selectedProjectTypes,
                                        problemTypes: newValue,
                                    })
                                }}
                            />
                            <label
                                htmlFor={`problem-${type}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {type}
                            </label>
                        </div>
                    ))}
                </div>
            </div> */}
        </div>
    )

    return variant === 'card' ? (
        <Card className="h-full">
            <div className="p-6 overflow-y-auto max-h-[calc(100vh-2rem)]">
                <FilterContent />
            </div>
        </Card>
    ) : (
        <FilterContent />
    )
} 
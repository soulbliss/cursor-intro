'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'

type FilterProps = {
    practices: {
        techStack: {
            languages: string[]
            tools: string[]
        }
        impact_level: string
    }[]
    onFilterChange: (filters: {
        languages: string[]
        tools: string[]
        impactLevels: string[]
    }) => void
}

export function Filter({ practices, onFilterChange }: FilterProps) {
    // Extract unique values
    const uniqueLanguages = Array.from(
        new Set(practices.flatMap(p => p.techStack.languages))
    ).sort()
    const uniqueTools = Array.from(
        new Set(practices.flatMap(p => p.techStack.tools))
    ).sort()
    const impactLevels = ['critical', 'important', 'nice_to_have']

    // State for selected filters
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
    const [selectedTools, setSelectedTools] = useState<string[]>([])
    const [selectedImpactLevels, setSelectedImpactLevels] = useState<string[]>([])

    // Update handlers that notify parent
    const updateLanguages = (newLanguages: string[]) => {
        setSelectedLanguages(newLanguages)
        onFilterChange({
            languages: newLanguages,
            tools: selectedTools,
            impactLevels: selectedImpactLevels,
        })
    }

    const updateTools = (newTools: string[]) => {
        setSelectedTools(newTools)
        onFilterChange({
            languages: selectedLanguages,
            tools: newTools,
            impactLevels: selectedImpactLevels,
        })
    }

    const updateImpactLevels = (newImpactLevels: string[]) => {
        setSelectedImpactLevels(newImpactLevels)
        onFilterChange({
            languages: selectedLanguages,
            tools: selectedTools,
            impactLevels: newImpactLevels,
        })
    }

    const FilterContent = () => (
        <div className="space-y-6">
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
                                    updateImpactLevels(
                                        checked
                                            ? [...selectedImpactLevels, level]
                                            : selectedImpactLevels.filter((l) => l !== level)
                                    )
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

            {/* Selected Filters Display */}
            {(selectedLanguages.length > 0 || selectedTools.length > 0 || selectedImpactLevels.length > 0) && (
                <div>
                    <h3 className="font-medium mb-3">Active Filters</h3>
                    <div className="flex flex-wrap gap-2">
                        {selectedImpactLevels.map((level) => (
                            <Badge
                                key={level}
                                variant="secondary"
                                className="cursor-pointer"
                                onClick={() => updateImpactLevels(selectedImpactLevels.filter((l) => l !== level))}
                            >
                                {level.replace('_', ' ')} ×
                            </Badge>
                        ))}
                        {selectedLanguages.map((lang) => (
                            <Badge
                                key={lang}
                                variant="secondary"
                                className="cursor-pointer"
                                onClick={() => updateLanguages(selectedLanguages.filter((l) => l !== lang))}
                            >
                                {lang} ×
                            </Badge>
                        ))}
                        {selectedTools.map((tool) => (
                            <Badge
                                key={tool}
                                variant="secondary"
                                className="cursor-pointer"
                                onClick={() => updateTools(selectedTools.filter((t) => t !== tool))}
                            >
                                {tool} ×
                            </Badge>
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
                                    updateLanguages(
                                        checked
                                            ? [...selectedLanguages, language]
                                            : selectedLanguages.filter((l) => l !== language)
                                    )
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
                                    updateTools(
                                        checked
                                            ? [...selectedTools, tool]
                                            : selectedTools.filter((t) => t !== tool)
                                    )
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
        </div>
    )

    return (
        <>
            {/* Desktop Filter */}
            <Card className="h-full">
                <div className="p-6 overflow-y-auto max-h-[calc(100vh-2rem)]">
                    <FilterContent />
                </div>
            </Card>

            {/* Mobile Filter */}
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="w-full sticky top-0 z-10 bg-background">
                            <SlidersHorizontal className="mr-2 h-4 w-4" />
                            Filters
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px]">
                        <div className="h-full overflow-y-auto py-6">
                            <FilterContent />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
} 
'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ChevronDown, ChevronRight, X } from 'lucide-react'
import { useState } from 'react'
import { useFilters } from './filter-context'

type InsightsFiltersProps = {
    allProjectTypes: string[]
    allTypeOfProjects: string[]
    allTags: string[]
    allTools: string[]
    allLanguages: string[]
}

export default function InsightsFilters({
    allProjectTypes,
    allTypeOfProjects,
    allTags,
    allTools,
    allLanguages
}: InsightsFiltersProps) {
    const { state, dispatch, resetFilters } = useFilters()
    const [projectTypesOpen, setProjectTypesOpen] = useState(true)
    const [typeOfProjectsOpen, setTypeOfProjectsOpen] = useState(true)
    const [tagsOpen, setTagsOpen] = useState(true)
    const [toolsOpen, setToolsOpen] = useState(true)
    const [languagesOpen, setLanguagesOpen] = useState(true)

    const toggleProjectType = (type: string) => {
        const newProjectTypes = state.projectTypes.includes(type)
            ? state.projectTypes.filter((t) => t !== type)
            : [...state.projectTypes, type]
        dispatch({ type: 'SET_PROJECT_TYPES', payload: newProjectTypes })
    }

    const toggleTypeOfProject = (type: string) => {
        const newTypes = state.typeOfProjects.includes(type)
            ? state.typeOfProjects.filter((t) => t !== type)
            : [...state.typeOfProjects, type]
        dispatch({ type: 'SET_TYPE_OF_PROJECTS', payload: newTypes })
    }

    const toggleTag = (tag: string) => {
        const newTags = state.tags.includes(tag)
            ? state.tags.filter((t) => t !== tag)
            : [...state.tags, tag]
        dispatch({ type: 'SET_TAGS', payload: newTags })
    }

    const toggleTool = (tool: string) => {
        const newTools = state.tools.includes(tool)
            ? state.tools.filter((t) => t !== tool)
            : [...state.tools, tool]
        dispatch({ type: 'SET_TOOLS', payload: newTools })
    }

    const toggleLanguage = (lang: string) => {
        const newLanguages = state.languages.includes(lang)
            ? state.languages.filter((l) => l !== lang)
            : [...state.languages, lang]
        dispatch({ type: 'SET_LANGUAGES', payload: newLanguages })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">Filters</h3>
                {(state.projectTypes.length > 0 ||
                    state.typeOfProjects.length > 0 ||
                    state.tags.length > 0 ||
                    state.tools.length > 0 ||
                    state.languages.length > 0) && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 lg:px-3"
                            onClick={resetFilters}
                        >
                            Clear
                            <X className="ml-2 h-4 w-4" />
                        </Button>
                    )}
            </div>

            <div className="space-y-4">


                {/* Languages */}
                <div className="space-y-2">
                    <button
                        onClick={() => setLanguagesOpen(!languagesOpen)}
                        className="flex items-center gap-2 w-full text-left"
                    >
                        {languagesOpen ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                        <Label className="cursor-pointer">Languages</Label>
                    </button>
                    {languagesOpen && (
                        <div className="flex flex-wrap gap-2 pl-6">
                            {allLanguages.filter(lang => !['<UNKNOWN>', 'Any'].includes(lang)).map((lang) => (
                                <Badge
                                    key={lang}
                                    variant={state.languages.includes(lang) ? 'default' : 'outline'}
                                    className="cursor-pointer"
                                    onClick={() => toggleLanguage(lang)}
                                >
                                    {lang}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>

                <Separator />

                {/* Tools */}
                <div className="space-y-2">
                    <button
                        onClick={() => setToolsOpen(!toolsOpen)}
                        className="flex items-center gap-2 w-full text-left"
                    >
                        {toolsOpen ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                        <Label className="cursor-pointer">Tools</Label>
                    </button>
                    {toolsOpen && (
                        <div className="flex flex-wrap gap-2 pl-6">
                            {allTools.map((tool) => (
                                <Badge
                                    key={tool}
                                    variant={state.tools.includes(tool) ? 'default' : 'outline'}
                                    className="cursor-pointer"
                                    onClick={() => toggleTool(tool)}
                                >
                                    {tool}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>

                <Separator />

                {/* Tags */}
                <div className="space-y-2">
                    <button
                        onClick={() => setTagsOpen(!tagsOpen)}
                        className="flex items-center gap-2 w-full text-left"
                    >
                        {tagsOpen ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                        <Label className="cursor-pointer">Tags</Label>
                    </button>
                    {tagsOpen && (
                        <div className="flex flex-wrap gap-2 pl-6">
                            {allTags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant={state.tags.includes(tag) ? 'default' : 'outline'}
                                    className="cursor-pointer"
                                    onClick={() => toggleTag(tag)}
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>

                <Separator />

                {/* Type of Projects */}
                <div className="space-y-2">
                    <button
                        onClick={() => setTypeOfProjectsOpen(!typeOfProjectsOpen)}
                        className="flex items-center gap-2 w-full text-left"
                    >
                        {typeOfProjectsOpen ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                        <Label className="cursor-pointer">Type of Projects</Label>
                    </button>
                    {typeOfProjectsOpen && (
                        <div className="flex flex-wrap gap-2 pl-6">
                            {allTypeOfProjects.map((type) => (
                                <Badge
                                    key={type}
                                    variant={state.typeOfProjects.includes(type) ? 'default' : 'outline'}
                                    className="cursor-pointer"
                                    onClick={() => toggleTypeOfProject(type)}
                                >
                                    {type}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
} 
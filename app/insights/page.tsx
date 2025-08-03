import { FilterProvider } from '@/components/insights/filter-context'
import InsightsFilters from '@/components/insights/filters'
import { ProjectTypeChips } from '@/components/insights/project-type-chips'
import InsightsSearch from '@/components/insights/search'
import InsightsTable from '@/components/insights/table'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { db } from '@/db'
import { postInsights, posts } from '@/db/schema'
import { desc, sql } from 'drizzle-orm'
import { Menu } from 'lucide-react'
import { Suspense } from 'react'

async function getInsights() {
    const insights = await db
        .select({
            id: postInsights.id,
            postId: postInsights.post_id,
            postAuthor: posts.author,
            title: postInsights.title,
            projectType: postInsights.project_type,
            typeOfProject: postInsights.type_of_project,
            typeOfProblem: postInsights.type_of_problem,
            tags: postInsights.tags,
            techStack: postInsights.tech_stack,
            relevanceScore: postInsights.is_relevant_score,
            createdAt: postInsights.created_at,
            updatedAt: postInsights.updated_at,
        })
        .from(postInsights)
        .innerJoin(posts, sql`${posts.id} = ${postInsights.post_id}`)
        .orderBy(desc(postInsights.is_relevant_score), desc(postInsights.created_at))

    const uniqueProjectTypes = Array.from(new Set(insights.map(i => i.projectType))).sort()
    const uniqueTypeOfProjects = Array.from(new Set(insights.map(i => i.typeOfProject))).sort()
    const uniqueProblemTypes = Array.from(new Set(insights.map(i => i.typeOfProblem))).sort()
    const uniqueTags = Array.from(new Set(insights.flatMap(i => i.tags))).sort()
    const uniqueTools = Array.from(new Set(insights.flatMap(i => i.techStack.tools))).sort()
    const uniqueLanguages = Array.from(new Set(insights.flatMap(i => i.techStack.languages))).sort()

    return {
        insights: insights.map(insight => ({
            ...insight,
            relevanceScore: Number(insight.relevanceScore),
            createdAt: insight.createdAt.getTime(),
            updatedAt: insight.updatedAt.getTime()
        })),
        uniqueProjectTypes,
        uniqueTypeOfProjects,
        uniqueProblemTypes,
        uniqueTags,
        uniqueTools,
        uniqueLanguages
    }
}

export default async function InsightsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const {
        insights,
        uniqueProjectTypes,
        uniqueTypeOfProjects,
        uniqueProblemTypes,
        uniqueTags,
        uniqueTools,
        uniqueLanguages
    } = await getInsights()

    return (
        <FilterProvider>
            <div className="mx-4 md:mx-24 py-6 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="shrink-0 md:hidden"
                                >
                                    <Menu className="h-4 w-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-80">
                                <div className="mt-6 overflow-y-auto max-h-[calc(100vh-5rem)]">
                                    <InsightsFilters
                                        allProjectTypes={uniqueProjectTypes}
                                        allTypeOfProjects={uniqueTypeOfProjects}
                                        allTags={uniqueTags}
                                        allTools={uniqueTools}
                                        allLanguages={uniqueLanguages}
                                    />
                                </div>
                            </SheetContent>
                        </Sheet>
                        <h1 className="text-3xl font-bold">Cursor Insights</h1>
                    </div>
                    <div className="w-full sm:w-auto">
                        <InsightsSearch />
                    </div>
                </div>

                <ProjectTypeChips
                    projectTypes={uniqueProjectTypes}
                    problemTypes={uniqueProblemTypes}
                />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="hidden md:block md:col-span-3">
                        <Card className="p-4">
                            <InsightsFilters
                                allProjectTypes={uniqueProjectTypes}
                                allTypeOfProjects={uniqueTypeOfProjects}
                                allTags={uniqueTags}
                                allTools={uniqueTools}
                                allLanguages={uniqueLanguages}
                            />
                        </Card>
                    </div>

                    <div className="col-span-1 md:col-span-9">
                        <Suspense fallback={<div>Loading insights...</div>}>
                            <InsightsTable insights={insights} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </FilterProvider>
    )
} 
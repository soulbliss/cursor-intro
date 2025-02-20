import { CopyablePrompt } from '@/components/insights/copyable-prompt'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { db } from '@/db'
import { postInsights } from '@/db/schema/post_insights'
import { formatDistanceToNow } from 'date-fns'
import { sql } from 'drizzle-orm'
import { ArrowLeft, Info } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
    params: { slug: string }
}

type PostWithColumns = {
    author: string
    created_utc: number
    selftext: string
    ups: number
    num_comments: number
    permalink: string
}

async function getInsightFromSlug(slug: string) {
    const title = decodeURIComponent(slug)
        .split('-')
        .join(' ')

    console.log('Searching for title:', title)

    // First try exact match
    const result = await db.query.postInsights.findFirst({
        where: sql`${postInsights.title} = ${title}`,
        with: {
            post: {
                columns: {
                    author: true,
                    created_utc: true,
                    selftext: true,
                    ups: true,
                    num_comments: true,
                    permalink: true
                }
            }
        }
    })

    if (result) {
        console.log('Found exact match:', result.title)
        return {
            ...result,
            post: {
                ...result.post,
                created_utc: Number(result.post.created_utc),
                ups: Number(result.post.ups),
                num_comments: Number(result.post.num_comments)
            }
        } as (typeof postInsights.$inferSelect & { post: PostWithColumns })
    }

    console.log('No exact match, trying case-insensitive match')

    // Try case-insensitive match
    const caseInsensitiveResult = await db.query.postInsights.findFirst({
        where: sql`LOWER(${postInsights.title}) = LOWER(${title})`,
        with: {
            post: {
                columns: {
                    author: true,
                    created_utc: true,
                    selftext: true,
                    ups: true,
                    num_comments: true,
                    permalink: true
                }
            }
        }
    })

    if (caseInsensitiveResult) {
        console.log('Found case-insensitive match:', caseInsensitiveResult.title)
        return {
            ...caseInsensitiveResult,
            post: {
                ...caseInsensitiveResult.post,
                created_utc: Number(caseInsensitiveResult.post.created_utc),
                ups: Number(caseInsensitiveResult.post.ups),
                num_comments: Number(caseInsensitiveResult.post.num_comments)
            }
        } as (typeof postInsights.$inferSelect & { post: PostWithColumns })
    }

    // If still no match, try a more flexible search
    console.log('No case-insensitive match, trying flexible search')
    const flexibleResult = await db.query.postInsights.findFirst({
        where: sql`SIMILARITY(LOWER(${postInsights.title}), LOWER(${title})) > 0.4`,
        with: {
            post: {
                columns: {
                    author: true,
                    created_utc: true,
                    selftext: true,
                    ups: true,
                    num_comments: true,
                    permalink: true
                }
            }
        }
    })

    if (!flexibleResult) {
        console.log('No matches found at all')
        return notFound()
    }

    console.log('Found flexible match:', flexibleResult.title)
    return {
        ...flexibleResult,
        post: {
            ...flexibleResult.post,
            created_utc: Number(flexibleResult.post.created_utc),
            ups: Number(flexibleResult.post.ups),
            num_comments: Number(flexibleResult.post.num_comments)
        }
    } as (typeof postInsights.$inferSelect & { post: PostWithColumns })
}

async function getRelatedPosts(currentPost: typeof postInsights.$inferSelect, limit: number = 5) {
    // Convert tags array to a string array for SQL comparison
    const tags = currentPost.tags

    return await db.query.postInsights.findMany({
        where: sql`${postInsights.id} != ${currentPost.id} 
            AND EXISTS (
                SELECT 1 FROM jsonb_array_elements_text(${postInsights.tags}) tag
                WHERE tag = ANY(string_to_array(${tags.join(',')}, ','))
            )`,
        limit,
        orderBy: sql`(
            SELECT COUNT(*)
            FROM jsonb_array_elements_text(${postInsights.tags}) tag
            WHERE tag = ANY(string_to_array(${tags.join(',')}, ','))
        ) DESC`,
        columns: {
            id: true,
            title: true,
            summary: true,
            project_type: true,
            type_of_project: true,
            type_of_problem: true,
            tags: true,
        }
    })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const insight = await getInsightFromSlug(params.slug)

    if (!insight) return notFound()

    return {
        title: insight.title,
        description: insight.summary,
        alternates: {
            canonical: `/insights/${encodeURIComponent(insight.title.split(' ').join('-'))}`
        },
        openGraph: {
            title: insight.title,
            description: insight.summary,
            type: 'article',
            authors: [insight.post.author],
            tags: insight.tags,
            url: `https://reddit.com${insight.post.permalink}`
        }
    }
}

export default async function InsightPage({ params }: Props) {
    const insight = await getInsightFromSlug(params.slug)

    if (!insight) return notFound()

    const { post } = insight
    const relatedPosts = await getRelatedPosts(insight)

    return (
        <div className="mx-4 md:mx-24 py-8 space-y-8">
            {/* Back Button */}
            <Link href="/insights" className="inline-block">
                <Button variant="ghost" size="sm" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Insights
                </Button>
            </Link>

            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-bold">{insight.title}</h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                    <span>Posted by{' '}
                        <a
                            href={`https://www.reddit.com/user/${post.author}`}
                            className="hover:underline text-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            u/{post.author}
                        </a>
                    </span>
                    <span>•</span>
                    <span>{formatDistanceToNow(new Date(post.created_utc * 1000), { addSuffix: true })}</span>
                    <span>•</span>
                    <a
                        href={`https://www.reddit.com${post.permalink}`}
                        className="hover:underline text-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Curated from Reddit
                    </a>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sidebar - Left */}
                <div className="space-y-6">
                    {/* Project Info */}
                    <Card className="p-6">
                        <h3 className="font-semibold mb-4">Project Information</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="text-sm text-muted-foreground">Project Type</div>
                                <Badge variant="outline" className="w-full justify-center py-1.5 text-base font-medium">
                                    {insight.project_type}
                                </Badge>
                            </div>
                            <div className="space-y-2">
                                <div className="text-sm text-muted-foreground">Type of Project</div>
                                <Badge variant="outline" className="w-full justify-center py-1.5 text-base font-medium">
                                    {insight.type_of_project}
                                </Badge>
                            </div>
                            <div className="space-y-2">
                                <div className="text-sm text-muted-foreground">Problem Type</div>
                                <Badge variant="outline" className="w-full justify-center py-1.5 text-base font-medium">
                                    {insight.type_of_problem}
                                </Badge>
                            </div>
                        </div>
                    </Card>

                    {/* Tags */}
                    <Card className="p-6">
                        <h3 className="font-semibold mb-4">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {insight.tags.map((tag) => (
                                <Badge key={tag} variant="outline">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </Card>

                    {/* Models Mentioned */}
                    <Card className="p-6">
                        <h3 className="font-semibold mb-4">AI Models Mentioned</h3>
                        <div className="space-y-2">
                            {insight.ai_models_used.map((model, index) => (
                                <div key={index} className="text-sm">
                                    <span className="font-medium">{model.name}</span>
                                    {model.version && <span className="text-muted-foreground"> v{model.version}</span>}
                                    <div className="text-muted-foreground mt-1">{model.purpose}</div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Main Content - Right */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Summary Card */}
                    <Card className="p-6">
                        <h2 className="text-2xl font-semibold mb-4">Summary</h2>
                        <p className="text-lg leading-relaxed">{insight.summary}</p>
                    </Card>

                    {/* Prompt Card */}
                    {insight.copyable_prompt && (
                        <CopyablePrompt prompt={insight.copyable_prompt} />
                    )}

                    {/* Best Practices */}
                    <Card className="p-6">
                        <h2 className="text-2xl font-semibold mb-6">Best Practices</h2>
                        <div className="space-y-4">
                            {insight.best_practices.map((practice, index) => (
                                <div key={index} className="border rounded-lg p-4 bg-blue-50/50 dark:bg-blue-950/20 hover:bg-blue-100/50 dark:hover:bg-blue-900/20 transition-colors">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-lg">{practice.title}</h3>
                                            <Badge
                                                variant="outline"
                                                className="capitalize px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                                            >
                                                {practice.impact_level}
                                            </Badge>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">{practice.description}</p>
                                        <Accordion type="single" collapsible className="w-full">
                                            <AccordionItem value={`source-${index}`} className="border-none">
                                                <AccordionTrigger className="text-sm text-muted-foreground hover:no-underline py-0 hover:text-blue-600 dark:hover:text-blue-400">
                                                    <div className="flex items-center gap-2">
                                                        <Info className="h-4 w-4" />
                                                        View Source
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="text-sm text-muted-foreground pt-2 border-t mt-2">
                                                    {practice.source}
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* What Not To Do */}
                    <Card className="p-6">
                        <h2 className="text-2xl font-semibold mb-6">Common Mistakes to Avoid</h2>
                        <div className="space-y-4">
                            {insight.what_not_to_do.map((practice, index) => (
                                <div key={index} className="border rounded-lg p-4 bg-rose-50/50 dark:bg-rose-950/20 hover:bg-rose-100/50 dark:hover:bg-rose-900/20 transition-colors">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-lg">{practice.title}</h3>
                                            <Badge
                                                variant="outline"
                                                className="capitalize px-3 py-1 text-sm font-medium bg-rose-100 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300"
                                            >
                                                {practice.impact_level}
                                            </Badge>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">{practice.description}</p>
                                        <Accordion type="single" collapsible className="w-full">
                                            <AccordionItem value={`source-${index}`} className="border-none">
                                                <AccordionTrigger className="text-sm text-muted-foreground hover:no-underline py-0 hover:text-rose-600 dark:hover:text-rose-400">
                                                    <div className="flex items-center gap-2">
                                                        <Info className="h-4 w-4" />
                                                        View Source
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="text-sm text-muted-foreground pt-2 border-t mt-2">
                                                    {practice.source}
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>

            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-2xl font-semibold mb-6">Related Posts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedPosts.map((relatedPost) => (
                            <Link
                                key={relatedPost.id}
                                href={`/insights/${encodeURIComponent(relatedPost.title.split(' ').join('-'))}`}
                            >
                                <Card className="h-full hover:bg-muted/50 transition-colors">
                                    <div className="p-6 space-y-4">
                                        <div className="flex gap-2 mb-3">
                                            {relatedPost.project_type !== 'Undefined' && <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                                                {relatedPost.project_type} project
                                            </Badge>}
                                            <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                                                {relatedPost.type_of_project}
                                            </Badge>
                                        </div>
                                        <h3 className="font-semibold text-lg line-clamp-2">{relatedPost.title}</h3>
                                        <Badge variant="outline" className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800">
                                            {relatedPost.type_of_problem}
                                        </Badge>
                                        <p className="text-muted-foreground text-sm line-clamp-3">
                                            {relatedPost.summary}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {relatedPost.tags.slice(0, 3).map((tag) => (
                                                <Badge key={tag} variant="outline" className="text-xs bg-gray-50 dark:bg-gray-900/20">
                                                    {tag}
                                                </Badge>
                                            ))}
                                            {relatedPost.tags.length > 3 && (
                                                <Badge variant="outline" className="text-xs bg-gray-50 dark:bg-gray-900/20">
                                                    +{relatedPost.tags.length - 3} more
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
} 
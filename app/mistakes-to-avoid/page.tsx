import { db } from '@/db'
import { postInsights, posts } from '@/db/schema'
import { desc, sql } from 'drizzle-orm'
import { Metadata } from 'next'
import { MistakesHeader } from './components/header'
import { MistakesList } from './components/mistakes-list'

// Revalidate every 12 hours
export const revalidate = 43200; // 12 hours in seconds

export const metadata: Metadata = {
    title: 'Common Mistakes to Avoid | Cursor Intro',
    description: 'Learn from the community\'s experiences about common mistakes to avoid in software development. Curated list of anti-patterns and pitfalls to help you write better code with Cursor AI.',
    openGraph: {
        title: 'Common Mistakes to Avoid | Cursor Intro',
        description: 'Learn from the community\'s experiences about common mistakes to avoid in software development.',
        type: 'website',
        siteName: 'Cursor Intro',
        images: [
            {
                url: 'https://cdn.diligenceai.dev/assets/cursor-intro.webp',
                width: 1200,
                height: 630,
                alt: 'Cursor Common Mistakes to Avoid'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Common Mistakes to Avoid | Cursor Intro',
        description: 'Learn from the community\'s experiences about common mistakes to avoid in software development.',
    },
    alternates: {
        canonical: '/mistakes-to-avoid'
    },
    keywords: [
        'software development mistakes',
        'coding anti-patterns',
        'common pitfalls',
        'development errors',
        'code smells',
        'bad practices',
        'programming mistakes',
        'software bugs'
    ]
}

async function getMistakes() {
    const insights = await db
        .select({
            id: postInsights.id,
            postId: postInsights.post_id,
            postAuthor: posts.author,
            title: postInsights.title,
            whatNotToDo: postInsights.what_not_to_do,
            techStack: postInsights.tech_stack,
            tags: postInsights.tags,
            projectType: postInsights.project_type,
            typeOfProject: postInsights.type_of_project,
            typeOfProblem: postInsights.type_of_problem,
            ups: posts.ups,
            createdAt: postInsights.created_at,
        })
        .from(postInsights)
        .innerJoin(posts, sql`${posts.id} = ${postInsights.post_id}`)
        .orderBy(desc(posts.ups))

    // Flatten mistakes and attach metadata
    const flattenedMistakes = insights.flatMap(insight =>
        insight.whatNotToDo.map(mistake => ({
            ...mistake,
            postId: insight.postId,
            postAuthor: insight.postAuthor,
            postTitle: insight.title,
            techStack: insight.techStack,
            tags: insight.tags,
            projectType: insight.projectType,
            typeOfProject: insight.typeOfProject,
            typeOfProblem: insight.typeOfProblem,
            ups: Number(insight.ups),
            createdAt: insight.createdAt.getTime(),
        }))
    )

    // Sort by impact level and upvotes
    const sortedMistakes = flattenedMistakes.sort((a, b) => {
        const impactOrder = { critical: 3, important: 2, nice_to_have: 1 }
        const impactDiff = impactOrder[b.impact_level] - impactOrder[a.impact_level]
        return impactDiff !== 0 ? impactDiff : b.ups - a.ups
    })

    return sortedMistakes
}

export default async function MistakesPage() {
    const mistakes = await getMistakes()

    return (
        <div className="mx-4 md:mx-12 py-8 space-y-8">
            <MistakesHeader />
            <MistakesList mistakes={mistakes} />
        </div>
    )
} 
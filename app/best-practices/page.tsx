import { siteConfig } from '@/config/site'
import { db } from '@/db'
import { postInsights, posts } from '@/db/schema'
import { desc, sql } from 'drizzle-orm'
import { Metadata } from 'next'
import { BestPracticesList } from './components/best-practices-list'
import { BestPracticesHeader } from './components/header'

// Revalidate every 12 hours
export const revalidate = siteConfig.revalidate; // 12 hours in seconds

// Static metadata for the best practices page
export const metadata: Metadata = {
    title: 'Best Practices | Cursor Intro - Best Cursor Tips & Tricks',
    description: 'A curated collection of software development best practices from the community, sorted by impact and popularity. Learn from real-world experiences and improve your cursor AI editor usage.',
    openGraph: {
        title: 'Best Practices | Cursor Intro - Best Cursor Tips & Tricks',
        description: 'A curated collection of software development best practices from the community, sorted by impact and popularity.',
        type: 'website',
        siteName: 'Cursor Intro - Best Cursor Tips & Tricks',
        images: [
            {
                url: 'https://cdn.diligenceai.dev/assets/cursor-intro.webp',
                width: 1200,
                height: 630,
                alt: 'Cursor Insights Best Practices'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Best Practices | Cursor Insights - Best Cursor Tips & Tricks',
        description: 'A curated collection of software development best practices from the community.',
    },
    alternates: {
        canonical: '/best-practices'
    },
    keywords: [
        'software development',
        'best practices',
        'coding guidelines',
        'programming tips',
        'software engineering',
        'development standards',
        'code quality',
        'software architecture'
    ]
}

async function getBestPractices() {
    const insights = await db
        .select({
            id: postInsights.id,
            postId: postInsights.post_id,
            postAuthor: posts.author,
            title: postInsights.title,
            bestPractices: postInsights.best_practices,
            techStack: postInsights.tech_stack,
            tags: postInsights.tags,
            ups: posts.ups,
            createdAt: postInsights.created_at,
        })
        .from(postInsights)
        .innerJoin(posts, sql`${posts.id} = ${postInsights.post_id}`)
        .orderBy(desc(posts.ups))

    // Flatten best practices and attach metadata
    const flattenedPractices = insights.flatMap(insight =>
        insight.bestPractices.map(practice => ({
            ...practice,
            postId: insight.postId,
            postAuthor: insight.postAuthor,
            postTitle: insight.title,
            techStack: insight.techStack,
            tags: insight.tags,
            ups: Number(insight.ups),
            createdAt: insight.createdAt.getTime(),
        }))
    )

    // Sort by impact level and upvotes
    const sortedPractices = flattenedPractices.sort((a, b) => {
        const impactOrder = { critical: 3, important: 2, nice_to_have: 1 }
        const impactDiff = impactOrder[b.impact_level] - impactOrder[a.impact_level]
        return impactDiff !== 0 ? impactDiff : b.ups - a.ups
    })

    return sortedPractices
}

export default async function BestPracticesPage() {
    const bestPractices = await getBestPractices()

    return (
        <div className="mx-4 md:mx-12 py-8 space-y-8">
            <BestPracticesHeader />
            <BestPracticesList practices={bestPractices} />
        </div>
    )
} 
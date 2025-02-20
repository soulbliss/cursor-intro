import { db } from '@/db'
import { postInsights } from '@/db/schema'
import { allTips } from 'content-collections'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cursorintro.com'

    // Get the current date for lastModified
    const currentDate = new Date().toISOString()

    // Base routes
    const routes = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/insights`,
            lastModified: currentDate,
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/best-practices`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/mistakes-to-avoid`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
    ]

    // Add individual tip pages
    const tipPages = allTips.map(tip => ({
        url: `${baseUrl}/${tip._meta.path}`,
        lastModified: tip.date.toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    // Get all insights from the database
    const insights = await db
        .select({
            title: postInsights.title,
            updatedAt: postInsights.updated_at,
        })
        .from(postInsights)

    // Add individual insight pages
    const insightPages = insights.map(insight => ({
        url: `${baseUrl}/insights/${encodeURIComponent(insight.title.split(' ').join('-'))}`,
        lastModified: insight.updatedAt.toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 1,
    }))

    return [...routes, ...tipPages, ...insightPages]
} 
import {
    boolean,
    jsonb,
    numeric,
    pgTable,
    text
} from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { timestamps } from './_utils'

export const posts = pgTable('posts', {
    id: text('id').primaryKey(), // Reddit post ID
    title: text('title').notNull(),
    selftext: text('selftext').notNull(),
    upvote_ratio: numeric('upvote_ratio', { precision: 4, scale: 3 }).notNull(),
    ups: numeric('ups').notNull(),
    score: numeric('score').notNull(),
    thumbnail: text('thumbnail').notNull(),
    link_flair_text: text('link_flair_text'),
    author: text('author').notNull(),
    num_comments: numeric('num_comments').notNull(),
    permalink: text('permalink').notNull(),
    created_utc: numeric('created_utc').notNull(),
    num_crossposts: numeric('num_crossposts').notNull(),
    is_video: boolean('is_video').notNull(),
    url: text('url').notNull(),
    subreddit: text('subreddit').notNull(),
    domain: text('domain').notNull(),
    post_hint: text('post_hint'),
    media: jsonb('media'),
    ...timestamps,
})

export const postsSchema = createInsertSchema(posts)
export type PostSchema = z.infer<typeof postsSchema>

export const insertPostSchema = postsSchema;  // Use the database schema directly 
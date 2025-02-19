import { relations } from 'drizzle-orm';
import {
    jsonb,
    numeric,
    pgTable,
    text,
    timestamp,
    uuid
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { timestamps } from './_utils';
import { posts } from './posts';

// Types for JSON columns
type PracticeItem = {
    title: string;
    description: string;
    context: string;
    reasoning: string;
    source: string;
    impact_level: 'critical' | 'important' | 'nice_to_have';
    tags: string[];
};

type AIModel = {
    name: string;
    version?: string;
    purpose: string;
    use_case: string;
    configuration?: Record<string, unknown>;
    limitations?: string[];
    alternatives?: string[];
    confidence: number;
};

// Post insights table for storing AI-processed results
export const postInsights = pgTable('post_insights', {
    id: uuid('id').defaultRandom().primaryKey(),
    post_id: text('post_id').notNull().references(() => posts.id),
    title: text('title').notNull(),
    summary: text('summary').notNull(),
    is_relevant_score: numeric('is_relevant_score', { precision: 5, scale: 2 }).notNull(),
    copyable_prompt: text('copyable_prompt'),
    project_type: text('project_type').notNull(), // Small/Medium/Large/Undefined
    type_of_project: text('type_of_project').notNull(),
    type_of_problem: text('type_of_problem').notNull(),
    tags: jsonb('tags').notNull().$type<string[]>(),
    tech_stack: jsonb('tech_stack').notNull().$type<{
        languages: string[];
        frameworks: string[];
        tools: string[];
        platforms: string[];
    }>(),
    best_practices: jsonb('best_practices').notNull().$type<PracticeItem[]>(),
    what_not_to_do: jsonb('what_not_to_do').notNull().$type<PracticeItem[]>(),
    ai_models_used: jsonb('ai_models_used').notNull().$type<AIModel[]>(),
    extra_data: jsonb('extra_data'),

    // Aggregate ratings (to be updated by rating system)
    avg_rating_prompt: numeric('avg_rating_prompt', { precision: 5, scale: 2 }),
    avg_rating_project_type: numeric('avg_rating_project_type', { precision: 5, scale: 2 }),
    avg_rating_best_practices: numeric('avg_rating_best_practices', { precision: 5, scale: 2 }),
    avg_rating_not_to_do: numeric('avg_rating_not_to_do', { precision: 5, scale: 2 }),
    avg_rating_overall: numeric('avg_rating_overall', { precision: 5, scale: 2 }),

    // Processing metadata
    processing_timestamp: timestamp('processing_timestamp').notNull(),
    last_processed_at: timestamp('last_processed_at'),
    processing_attempts: numeric('processing_attempts').default('0').notNull(),
    processing_status: text('processing_status').notNull().default('pending'),
    processing_error: text('processing_error'),

    ...timestamps
});

export const postInsightsRelations = relations(postInsights, ({ one }) => ({
    post: one(posts, {
        fields: [postInsights.post_id],
        references: [posts.id],
    }),
}));

// Schema for inserting new insights
export const insertPostInsightSchema = createInsertSchema(postInsights, {
    id: z.string().optional(),
    processing_timestamp: z.date(),
    last_processed_at: z.date().optional(),
    processing_attempts: z.number().optional(),
    processing_status: z.enum(['pending', 'processing', 'completed', 'failed']).optional(),
    processing_error: z.string().optional(),
    created_at: z.number().optional(),
    updated_at: z.number().optional(),
}); 
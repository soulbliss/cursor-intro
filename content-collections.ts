import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";
import categories from "./config/categories.json";

// for more information on configuration, visit:
// https://www.content-collections.dev/docs/configuration

const tips = defineCollection({
  name: "tips",
  directory: "content/tips",
  include: "*.md",
  schema: (z) => ({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    author: z.object({
      name: z.string(),
      github: z.string().url().optional(),
      x: z.string().url().optional(),
    }),
    // Media content
    media: z.object({
      video: z.string().url().optional(),
      tweetUrl: z.string().url().optional(),
      screenshots: z.array(z.object({
        url: z.string().url(),
        caption: z.string().optional()
      })).optional()
    }).refine(data => data.video || data.screenshots || data.tweetUrl, {
      message: "At least one media type (video, screenshots, or tweetUrl) must be provided"
    }),
    // Feature categorization
    feature: z.string(),
    categories: z.array(z.enum(categories as [string, ...string[]])),
    difficulty: z.enum(["beginner", "intermediate", "advanced"]).default("beginner"),
  }),
  transform: async (document, context) => {
    const html = await compileMarkdown(context, document);
    return {
      ...document,
      html,
    };
  },
});

export default defineConfig({
  collections: [tips],
});

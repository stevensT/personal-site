/**
 * The `blog` content collection: where the Markdown lives and the frontmatter
 * schema. A post missing a title or with a bad date fails the build instead
 * of shipping broken.
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  // Filename (sans .md) becomes the id/slug: hello-world.md -> /blog/hello-world
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    // coerce: a bare YAML date and a date string both parse to a Date
    date: z.coerce.date(),
    description: z.string(),
    // optional — defaults to [] so untagged posts still validate
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };

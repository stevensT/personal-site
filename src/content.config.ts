/**
 * Content collections config.
 *
 * Defines the `blog` collection: where its Markdown files live (the glob loader)
 * and what frontmatter each post MUST have (the zod schema). Astro generates
 * TypeScript types from this, so a post missing a `title` or with a bad `date`
 * fails the build instead of shipping broken.
 *
 * Adding a post = dropping a new `.md` file in src/content/blog/ — no code.
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  // Load every .md file under src/content/blog. The file name (sans extension)
  // becomes the post's id/slug, e.g. hello-world.md -> /blog/hello-world.
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    // coerce so a YAML date (2026-06-11) or date string both parse to a Date.
    date: z.coerce.date(),
    description: z.string(),
    // Optional; defaults to an empty list so posts without tags still validate.
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };

# Portfolio at [stanferd.dev](https://stanferd.dev)

The personal site and portfolio of **Trevor Stevens**, a technologist, network builder, currently rebuilding his digital life from the ground up.

This project serves as a live demonstration of my technical skills, a source for the technical ramblings that go on in my head, and a direct line to get in touch with me.

## The Stack

- **Framework**: Astro v6 (static output — ships zero JS by default)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript (strict mode)
- **Hosting**: Cloudflare Pages (auto-builds on every push to `main`)

## Running it locally

Requires Node.js 22.12+ and npm.

```bash
npm install       # install dependencies
npm run dev       # start the dev server at http://localhost:4321
npm run build     # build the production site into dist/
npm run preview   # serve the built dist/ locally to check the production build
```

## Project structure

```
public/                static assets served as-is (favicons)
src/
├── components/         reusable UI (Nav, Footer, AppWindow, PostCard, WorldMap, ...)
├── content/blog/       blog posts as Markdown
├── content.config.ts   blog collection schema (frontmatter Astro type-checks)
├── data/               generated data (world-dots.json for the About map)
├── layouts/            page shells (BaseLayout, BlogLayout)
├── pages/              file-based routes — each file is a URL
│   ├── index.astro       → /            (home, terminal "app window")
│   ├── about.astro       → /about
│   ├── career.astro      → /career
│   ├── colophon.astro    → /colophon
│   └── blog/             → /blog and /blog/<slug>
└── styles/global.css   Tailwind entry + design tokens (@theme) + blog prose styles
astro.config.mjs        Astro + Tailwind config, site URL
```

## Writing a blog post

Drop a new `.md` file in `src/content/blog/`. The filename becomes the URL slug
(`hello-world.md` → `/blog/hello-world`). Each post needs this frontmatter:

```yaml
---
title: My Post Title
date: 2026-07-01
description: A one-line summary shown in the post list and meta tags.
tags: [astro, homelab]   # optional
---
```

A missing `title` or bad `date` fails the build rather than shipping broken.

## Deployment

Hosted on **Cloudflare Pages** as a static site — build command `npm run build`,
output directory `dist`. Every push to `main` triggers a rebuild and deploy. No
adapter is needed (the site is fully static).

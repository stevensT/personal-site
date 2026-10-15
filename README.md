# Portfolio at [stanferd.dev](https://stanferd.dev)

My personal site and portfolio. I'm Trevor Stevens, a technologist and network builder rebuilding my digital life from the ground up.

This project is a working demo of what I can build, a home for the technical ramblings in my head, and a way to learn a bit about me.

## The Stack

- **Framework**: Astro v7 (static output — ships zero JS by default)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript (strict mode)
- **Hosting**: Cloudflare Pages (auto-builds on every push to `main`)

## Running it locally

Requires Node.js 22.12+ and npm.

```bash
npm install       # install dependencies
npm run dev       # start the dev server at http://localhost:4321
npm run build     # type-check, build into dist/, and run regression tests
npm run preview   # serve the built dist/ locally to check the production build
npm run check     # type-check without building
npm test          # rerun tests after a fresh build
```

Tests use Node's built-in runner. To run one file after a fresh build:

```bash
node --test tests/site-controls.test.mjs
```

`npm run build` stops on a type error or failed test. Output tests read `dist/`,
so run the build after changes before using the standalone test commands.

## Project structure

```
public/                static assets served as-is (favicons)
src/
├── components/         reusable UI (Nav, Footer, AppWindow, PostCard, WorldMap, ...)
├── content/blog/       blog posts as Markdown
├── content.config.ts   blog collection schema (frontmatter Astro type-checks)
├── data/               generated data (world-dots.json for the About map)
├── layouts/            page shells (BaseLayout, BlogLayout)
├── scripts/            shared theme, Help, shortcuts, and article section tracking
├── pages/              file-based routes — each file is a URL
│   ├── index.astro       → /            (home, terminal "app window")
│   ├── about.astro       → /about
│   ├── career.astro      → /career
│   ├── colophon.astro    → /colophon
│   ├── blog/             → /blog and /blog/<slug>
│   └── tags/[tag].astro   → /tags/<tag>/
├── utils/tags.ts        shared tag URL encoding
└── styles/global.css   Tailwind entry + design tokens (@theme) + blog prose styles
tests/                 focused control and generated-page checks
astro.config.mjs        Astro + Tailwind config, site URL, preserved HTML spacing
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
`BlogLayout` supplies the post title; start the body with copy or `##` headings.
The Contents sidebar is generated from `##` and `###` headings and highlights
the current section as you scroll. Tags link to matching posts, newest first.
The blog index lists every tag automatically; no archive files need hand editing.

## Keyboard and theme controls

Help is available by button on every page. Single-letter shortcuts are enabled
by default; turn them off in Help. That setting and the theme are remembered
when browser storage is available. With storage blocked, both controls still
work for the current page, and Help explains that the shortcut choice cannot
be remembered. Help uses a native dialog with Close and Escape support.

## Deployment

Hosted on **Cloudflare Pages** as a static site — build command `npm run build`,
output directory `dist`. Every push to `main` triggers a rebuild and deploy. No
adapter is needed (the site is fully static).

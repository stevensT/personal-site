# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Hard Rules
- Never delete or overwrite files without telling me first
- Always explain what you're about to do before doing it
- If you're unsure about something, ask — don't guess
- When introducing a new concept or pattern, briefly explain it
- Don't install new packages without asking me first

## Developer Context
I am new to software engineering. Explain your reasoning when making architectural decisions. Flag anything I should learn or understand before moving on. Don't assume I know the "obvious" approach.

## Project Status

Repo is not yet scaffolded — only this CLAUDE.md exists. No `package.json`, no
`src/`, no Astro config. The "Setup" commands below are the standard Astro
defaults and will become real once the project is initialized.

## Tech Stack
- Framework: Astro 6
- Styling: Tailwind CSS
- Language: TypeScript (strict mode)
- Package manager: npm

## Setup

Standard Astro + npm commands (will work after the project is scaffolded):

- `npm install` — install dependencies
- `npm run dev` — start the local dev server (default http://localhost:4321)
- `npm run build` — type-check and build the production site into `dist/`
- `npm run preview` — serve the built `dist/` locally to test the production build
- `npx astro check` — run the TypeScript / Astro type-checker on its own

There is no test runner yet. When one is added (e.g. Vitest or Playwright),
record the command to run a single test here.

## Architecture

Not yet established. Once `src/` exists, the typical Astro layout is:

- `src/pages/` — file-based routing; each `.astro` file becomes a route
- `src/layouts/` — shared page shells wrapped around page content
- `src/components/` — reusable UI pieces
- `astro.config.mjs` — integrations (Tailwind) and build config
- `public/` — static assets served as-is

Fill in the real, project-specific architecture here as it takes shape.

## Code Style
- Write clean, readable code over clever code
- Add comments explaining WHY, not just what the code does
- Every function needs a JSDoc comment describing what it does and its parameters
- Prefer explicit over implicit — no magic
- Keep files under 200 lines; split if larger

## Documentation
- Every new component needs a comment block explaining its purpose and props
- Update the README when adding a new page or major feature
- If a decision was non-obvious, leave a comment explaining why we did it this way
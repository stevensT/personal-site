# Project Spec & To-Do — Trevor Stevens Personal Website

> Living document. We check items off as we go. No code is written until the
> relevant task is reached and you've okayed it.

---

## 0. Where We Left Off  ← read this first when resuming

> Update this at the end of every work session, then commit + push. On a new
> machine: `git pull`, open Claude Code, say "read tasks/todo.md and continue."

- **Project location:** `C:\Users\Trevo\01_dev\personal-site` (moved out of
  OneDrive; use Git/GitHub — not file-sync — to move between computers).
- **Current phase:** Phase 5 — Blog (Phases 0–4 complete).
- **Done so far:** Planning + Phases 0–4. Spec written. Decisions locked (stack,
  repo `personal-site` **public** under GitHub user `stevensT`, domain `stanferd.dev`).
  Git installed; `gh` installed + authenticated. Project relocated out of OneDrive.
  **Node.js LTS v24.16.0 + npm 11.13.0 installed** (winget, on persisted PATH).
  **Astro 6.4.5 scaffolded into repo root** (minimal template, strict TS).
  **Tailwind v4 added**, imported via BaseLayout. **Shared layout:** BaseLayout +
  Nav + Footer. **Static pages done:** Home, About (real bio), Projects (placeholder).
  **No Contact page** — contact (Instagram @stevenstrevor) is in the Footer.
- **Blocked on / next step:** **Phase 4 changes are uncommitted — awaiting Trevor's
  review** (pause-before-commit pattern). After that: **Phase 5** — blog content
  collection + schema, `/blog` index, single-post route, one sample post.
- **Design direction still pending from Trevor** — current styling is a minimal
  neutral default (light theme, gray accents); restyle once a vibe is chosen.
- **Optional tooling note:** `npx astro check` (the type-checker referenced in
  CLAUDE.md) needs `@astrojs/check` + `typescript` installed — not yet added.
- **Heads-up:** freshly-installed tools may not appear in an already-open
  terminal (PATH is read at launch) — open a new terminal or call by full path.

---

## 1. Project Goal

A fast, lightweight **personal website** for Trevor Stevens — a tech enthusiast
learning coding, AI/LLMs, and DevOps. The site doubles as:

- A **portfolio / front door** (who I am, what I'm working on, how to reach me).
- A **"learning in public" blog** for writing up what I learn along the way.

"Learning in public" = publishing notes/posts about things as you learn them.
It's good for retention, builds a portfolio passively, and is a natural fit for
this site's tech.

---

## 2. Tech Stack (decided)

| Layer            | Choice                | Why |
|------------------|-----------------------|-----|
| Framework        | Astro (latest stable) | Built for fast, content-heavy static sites. Ships zero JavaScript by default. |
| Styling          | Tailwind CSS          | Utility classes for styling without writing separate CSS files. |
| Language         | TypeScript (strict)   | Catches mistakes before the site runs. "Strict" = most safety checks on. |
| Package manager  | npm                   | Comes with Node.js; the standard default. |
| Hosting          | Cloudflare Pages      | Free, global CDN, nothing runs on your hardware, home network never exposed. |
| Output mode      | Static                | Pre-builds plain HTML files. Fastest and simplest. Can add dynamic later. |

---

## 3. Architecture Overview

Astro builds the site by turning files into pages at **build time** (when we run
`npm run build`), producing a folder of plain HTML/CSS that Cloudflare serves.
There is no live server doing work per visitor — that's why it's fast and secure.

### How the pieces fit together

```
Markdown blog posts ─┐
                     ├─> Astro build ─> dist/ (plain HTML) ─> Cloudflare Pages ─> visitor
.astro page files ───┘
        ▲
        │ wrapped by
   Layout (shared shell: <head>, nav, footer)
        ▲
        │ composed from
   Components (reusable UI: nav bar, post card, button)
```

### Planned folder layout (created during scaffold)

```
website/
├── public/              # Static files copied as-is (favicon, images, robots.txt)
├── src/
│   ├── components/      # Reusable UI pieces (Nav, Footer, PostCard, ...)
│   ├── layouts/         # Page shells that wrap content (BaseLayout, BlogLayout)
│   ├── pages/           # Each file = one route/URL (file-based routing)
│   │   ├── index.astro      → /
│   │   ├── about.astro      → /about
│   │   ├── projects.astro   → /projects
│   │   ├── contact.astro    → /contact
│   │   └── blog/
│   │       ├── index.astro       → /blog (list of posts)
│   │       └── [...slug].astro    → /blog/<post-name> (one post)
│   ├── content/         # Blog post Markdown files + collection schema
│   │   └── blog/
│   └── styles/          # Global CSS (Tailwind entry, base styles)
├── astro.config.mjs     # Astro + integrations (Tailwind) config
├── tsconfig.json        # TypeScript settings (strict)
└── package.json         # Dependencies + the npm run ... scripts
```

### Key concept — Content Collections (the reason for Astro here)

Blog posts are written as **Markdown** files in `src/content/blog/`. A small
schema file defines what metadata each post must have (title, date, description,
tags). Astro then:

1. Type-checks every post's metadata (catches a missing title before publish).
2. Auto-generates a page for each post via the `[...slug].astro` route.

So adding a post = adding one Markdown file. No hand-built HTML per post.

---

## 4. Major Components

| Component        | Type        | Purpose |
|------------------|-------------|---------|
| `BaseLayout`     | Layout      | Shared `<head>`, site nav, footer — wraps every page. |
| `BlogLayout`     | Layout      | Wraps a single blog post (title, date, post body styling). |
| `Nav`            | Component   | Site navigation links (Home, About, Projects, Blog, Contact). |
| `Footer`         | Component   | Copyright, social/contact links. |
| `PostCard`       | Component   | Preview tile for a blog post in the `/blog` list. |
| `blog` collection| Content     | The Markdown posts + their metadata schema. |

---

## 5. Implementation Order

Ordered so the site is runnable and viewable as early as possible, then built up
in layers. Each phase ends with something you can see in the browser.

1. **Prerequisite — Node.js.** Nothing works without it. Install + verify.
2. **Scaffold.** Generate the Astro project (minimal template, TypeScript strict).
   Confirm `npm run dev` serves a blank page.
3. **Tailwind.** Add the Tailwind integration; confirm a styled element renders.
4. **Base layout + nav/footer.** The shared shell every page uses.
5. **Static pages.** Home → About → Projects → Contact, using the layout.
6. **Blog infrastructure.** Content collection + schema, `/blog` list page,
   single-post route, one sample post to prove it works.
7. **Polish.** Favicon, site metadata/SEO tags, basic responsive checks.
8. **Deploy.** Connect to Cloudflare Pages; confirm the live site builds.
9. **Docs.** Create README; update CLAUDE.md with the *real* structure/commands.

---

## 6. Task Checklist

### Phase 0 — Prerequisites
- [x] Install Node.js LTS — v24.16.0 via `winget` (npm 11.13.0)
- [x] Verify `node --version` and `npm --version` work in a fresh terminal —
      confirmed on persisted PATH; new terminals will find them
- [x] Confirm the latest stable Astro version, and update CLAUDE.md's "Astro 6"
      line to match reality — latest stable is **6.4.5**; "Astro 6" is already
      correct (6.x), so CLAUDE.md left as-is

### Phase 1 — Scaffold
- [x] Run the Astro project creator (minimal template, TypeScript strict) —
      scaffolded into repo root; Astro ^6.4.5, tsconfig extends `.../strict`
- [x] Verify `npm install` completes — 253 packages, 0 vulnerabilities
- [x] Verify `npm run dev` serves the starter page in the browser —
      HTTP 200 at http://localhost:4321, `<h1>Astro</h1>`, Astro v6.4.5
- [x] Initialize a git repository — repo already initialized (used `--no-git`)
- [x] Add a sensible `.gitignore` — Astro's covers node_modules/, dist/,
      .astro/, .env (verified via `git check-ignore`)

### Phase 2 — Styling
- [x] Add Tailwind via Astro's official integration — `npx astro add tailwind`
      installed Tailwind **v4** (`tailwindcss` + `@tailwindcss/vite`), added the
      Vite plugin to `astro.config.mjs`, scaffolded `src/styles/global.css`
      (`@import "tailwindcss";`). Note: Tailwind v4 has **no `tailwind.config.js`**.
- [x] Verify a Tailwind utility class visibly styles an element — temporarily
      imported global.css + a styled `<h1>` in index.astro; confirmed the compiled
      CSS contained `.text-4xl/.font-bold/.text-blue-600/.underline`, then reverted
      index.astro to the clean starter.
      **TODO (Phase 3):** `global.css` is currently imported nowhere — import it in
      `BaseLayout` so Tailwind applies site-wide.

### Phase 3 — Shared layout
- [x] Create `BaseLayout` (head, nav, footer wrapper) — `src/layouts/BaseLayout.astro`;
      takes `title` (required) + `description?` props; imports `global.css` here so
      Tailwind applies site-wide (closed the Phase 2 TODO); sticky footer via flex.
- [x] Create `Nav` component with links to all planned pages — `src/components/Nav.astro`;
      links to all 5 (About/Projects/Blog/Contact 404 until Phases 4–5, expected).
- [x] Create `Footer` component — `src/components/Footer.astro`; build-time © year.
- [x] Converted `index.astro` to use `<BaseLayout>`; verified rendered page
      (HTTP 200, title prop in <head>, nav/footer present, Tailwind utilities compiled).

### Phase 4 — Static pages
- [x] Home page (`index.astro`) — done in Phase 3
- [x] About page — real bio (Trevor's words), `src/pages/about.astro`
- [x] Projects page — "coming soon" placeholder (no projects yet)
- [~] Contact page — **dropped by decision.** No Contact page; contact info
      (Instagram @stevenstrevor) lives in the Footer on every page. Removed the
      Contact link from Nav.

### Phase 5 — Blog
- [ ] Define the `blog` content collection schema (title, date, description, tags)
- [ ] Add `BlogLayout`
- [ ] Build `/blog` index page listing posts (using `PostCard`)
- [ ] Build the single-post route (`[...slug].astro`)
- [ ] Write one sample Markdown post to prove the pipeline end-to-end

### Phase 6 — Polish
- [ ] Add favicon and basic site metadata (title, description) in `<head>`
- [ ] Add per-page SEO tags (title/description)
- [ ] Check pages look acceptable on mobile width

### Phase 7 — Deploy
- [ ] Create a GitHub repo (via github.com or `gh`) and push the project to it
- [ ] Connect the GitHub repo to Cloudflare Pages (auto-build on every push)
- [ ] Confirm the production build succeeds and the `*.pages.dev` URL works
- [ ] Point the custom domain at the site in Cloudflare (DNS), confirm it loads

### Phase 8 — Documentation
- [ ] Create `README.md` (what the project is, how to run it)
- [ ] Update `CLAUDE.md`: replace placeholder Setup/Architecture with the real,
      verified commands and structure

---

## 7. Decisions & Open Questions

### Resolved
- **Git hosting: GitHub.** Account active, Git installed locally (v2.54.0).
  Cloudflare Pages will deploy from a GitHub repo (the smoothest path).
- **GitHub CLI (`gh`): installed & authenticated.** v2.93.0 at
  `C:\Program Files\GitHub CLI\gh.exe`. Logged in as **stevensT**, token scopes
  include `repo` + `workflow` — enough to create the repo and push. (Note: not on
  this terminal session's PATH; call by full path or use a fresh terminal.)
- **Custom domain: `stanferd.dev`.** Point at the site in Cloudflare after the
  first successful deploy.
- **Repo: `personal-site`, public.** Create under the stevensT account.
- **No Contact page.** Contact info lives in the Footer on every page. Currently
  Instagram **@stevenstrevor** (`instagram.com/stevenstrevor`). GitHub deliberately
  left out for now (can add later).

### Still needed (from Trevor)
- **Projects content** — bio is done (About page); no projects to list yet
  (Projects page is a "coming soon" placeholder).
- **Design direction** — colors, fonts, overall vibe. Minimal/neutral default
  until preferences are given.

---

## 8. Notes

- **Phase 0 complete.** Node.js LTS v24.16.0 / npm 11.13.0 installed via winget
  and verified on the persisted PATH. Next up is Phase 1 — scaffolding the Astro
  project.

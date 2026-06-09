# Project Spec & To-Do — Trevor Stevens Personal Website

> Living document. We check items off as we go. No code is written until the
> relevant task is reached and you've okayed it.

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
- [ ] Install Node.js LTS
- [ ] Verify `node --version` and `npm --version` work in a fresh terminal
- [ ] Confirm the latest stable Astro version, and update CLAUDE.md's "Astro 6"
      line to match reality

### Phase 1 — Scaffold
- [ ] Run the Astro project creator (minimal template, TypeScript strict)
- [ ] Verify `npm install` completes
- [ ] Verify `npm run dev` serves the starter page in the browser
- [ ] Initialize a git repository (so work is version-controlled / undoable)
- [ ] Add a sensible `.gitignore` (node_modules, dist, etc.)

### Phase 2 — Styling
- [ ] Add Tailwind via Astro's official integration
- [ ] Verify a Tailwind utility class visibly styles an element

### Phase 3 — Shared layout
- [ ] Create `BaseLayout` (head, nav, footer wrapper)
- [ ] Create `Nav` component with links to all planned pages
- [ ] Create `Footer` component

### Phase 4 — Static pages
- [ ] Home page (`index.astro`)
- [ ] About page
- [ ] Projects page (placeholder content is fine for now)
- [ ] Contact page

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

### Still needed (from Trevor)
- **Content for pages** — real bio / projects / contact info; placeholders until
  then.
- **Design direction** — colors, fonts, overall vibe. Minimal/neutral default
  until preferences are given.

---

## 8. Notes

- We are currently **paused at Phase 0**: Node.js install was started, then
  cancelled. This is the next thing to resolve before any code.

# Project Spec & To-Do — Trevor Stevens Personal Website

> Living document. We check items off as we go. No code is written until the
> relevant task is reached and you've okayed it.

---

## 0. Where We Left Off  ← read this first when resuming

> Update this at the end of every work session, then commit + push. On a new
> machine: `git pull`, open Claude Code, say "read tasks/todo.md and continue."

- **Project location:** `C:\Users\Trevo\01_dev\personal-site` (moved out of
  OneDrive; use Git/GitHub — not file-sync — to move between computers).
- **Current phase:** Phase 7 — Deploy — **complete. Site is LIVE at
  `https://stanferd.dev`** (Cloudflare Pages, static, auto-builds on push to
  `origin/main`). Repo `github.com/stevensT/personal-site`. Deploy gotcha for
  next time: it must be a Cloudflare **Pages** project, not Workers — the Workers
  Git flow runs `astro add cloudflare` and breaks the static build (see Phase 7
  notes). **Phases 0–8 all complete** — `README.md` written and `CLAUDE.md`
  Setup/Architecture updated to reflect the real project. **Only open items are
  content:** 2 Career placeholders (service dates/rank, network roles) and an
  `og:image` social-preview image, plus ongoing blog writing. Phase 6 recap below.
- **Phase 6 — Polish (complete, pushed).** Custom
  terminal favicon (green `>_` on dark, `public/favicon.svg`), `site` set in
  `astro.config.mjs` (`https://stanferd.dev`), and full `<head>` SEO: canonical
  link + Open Graph + Twitter Card + `theme-color`, all driven by the existing
  per-page `title`/`description` props in BaseLayout. Mobile checked at 375px —
  found + fixed a footer-bar overflow in `AppWindow` (added `flex-wrap`).
  Deleted the two unlinked throwaway pages (`projects.astro`, `fonts.astro`).
  Also (folded into Phase 6): regenerated `public/favicon.ico` — it was a PNG of
  the *old Astro logo* (Safari/cached browsers use the `.ico`, not the SVG), now
  rasterized from `favicon.svg` via sharp so both show the terminal glyph. Added
  an **Interests** card grid to the About page (3-col / 2-col mobile, emoji +
  label, accent hover lift; list is a frontmatter array): Skiing, Travel,
  Photography, Smart Home, Baseball (SF Giants), PC Gaming. Rewrote the
  **Colophon** page into narrative Stack / Typography / Design sections
  (structure modelled on alexhowells.com/colophon) with real facts + hex
  swatches, plus a Credits section crediting Alex Howells as the inspiration.
  **Machine-move fix:** `node_modules` had been file-copied from the Windows box
  (broken symlinks → non-executable bins), so `npm run build` failed with
  "Permission denied"; fixed by `rm -rf node_modules && npm install` on this Mac
  (Node v22 here vs v24 on desktop). **Still open:** Career has 2 TODO
  placeholders (years/rank/dates, formal network roles) needing Trevor's real
  details; no `og:image` social-preview image yet.
  Committed (`9d65294`) and pushed to `origin/main`.
- **Done so far:** Planning + Phases 0–4. Spec written. Decisions locked (stack,
  repo `personal-site` **public** under GitHub user `stevensT`, domain `stanferd.dev`).
  Git installed; `gh` installed + authenticated. Project relocated out of OneDrive.
  **Node.js LTS v24.16.0 + npm 11.13.0 installed** (winget, on persisted PATH).
  **Astro 6.4.5 scaffolded into repo root** (minimal template, strict TS).
  **Tailwind v4 added**, imported via BaseLayout. **Shared layout:** BaseLayout +
  Nav + Footer. **Static pages done:** Home, About (real bio), Projects (placeholder).
  **No Contact page** — contact (Instagram @stevenstrevor) is in the Footer.
- **Blocked on / next step:** Design direction is now **decided** (see §7 + new §9
  Design System). Next: **Phase 4.5 — terminal restyle** (font comparison page →
  pick fonts → restyle BaseLayout/Nav/Footer dark, add keyboard nav + theme
  toggle, swap Projects→Career, add Colophon, rewrite About with military bio).
  Then **Phase 5** — blog. Phase 4 changes plus these are uncommitted — awaiting
  Trevor's review (pause-before-commit pattern).
- **Design direction:** RESOLVED via `buildspec.md` — **terminal/CLI aesthetic**,
  dark default (`#0d1117`), monospace, prompt prefix `stanferd@csar:~$`, blinking
  cursor, inline keyboard shortcuts. Fonts TBD pending a side-by-side comparison
  page. Full spec captured in §9.
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
│   │   ├── career.astro     → /career     (replaces projects)
│   │   ├── colophon.astro   → /colophon   (how the site is built)
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
| `BaseLayout`     | Layout      | Shared `<head>`, site nav, footer — wraps every page. Dark terminal theme. |
| `BlogLayout`     | Layout      | Wraps a single blog post (title, date, post body styling). |
| `Nav`            | Component   | Site nav as inline keyboard hints: `[a] about [b] blog [c] career [x] colophon`. |
| `Footer`         | Component   | Copyright, social/contact links (Instagram @stevenstrevor). |
| `PostCard`       | Component   | Preview tile for a blog post in the `/blog` list. |
| `Prompt`         | Component   | Renders the `stanferd@csar:~$` prompt prefix before a name/section. |
| `Cursor`         | Component   | The signature blinking cursor (CSS animation, accent green). |
| `KeyboardNav`    | Script      | ~20 lines vanilla JS: keydown → route or theme toggle. No framework. |
| `ThemeToggle`    | Script      | `[d]` flips dark↔light; persists choice (localStorage), dark is default. |
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

### Phase 4.5 — Terminal restyle (design pivot from `buildspec.md`)
- [x] Build a throwaway `/fonts` comparison page (all-mono vs. mono+Newsreader),
      load the candidate fonts, let Trevor pick — **Option B chosen**. Page still
      on disk at `src/pages/fonts.astro`; delete once fonts are wired site-wide.
- [x] Apply the chosen fonts + color tokens (`#0d1117` bg, `#c9d1d9` text,
      `#1cb03a` accent, `#8b949e` muted) as CSS variables / Tailwind theme —
      done in `global.css` (`@theme` tokens + font vars); Google Fonts linked in
      BaseLayout `<head>`. (Checkbox was stale.)
- [x] Restyle `BaseLayout` to dark terminal (tokens + fonts in global.css)
- [x] Add `Prompt` + `Cursor` components
- [x] Rework `Nav` into inline keyboard hints — done: `Nav.astro` renders a
      terminal-style `stanferd@csar:~$ cd ~` home link + inline links; the `[a]`
      `[b]` `[c]` keyboard shortcuts are wired via KeyboardNav. (Checkbox stale.)
- [x] Add `KeyboardNav` script (keydown → route) and `ThemeToggle` (`[d]`, dark
      default, persisted) + a `[h]` help overlay — all wired in BaseLayout. Light
      theme = CSS-variable override under `html[data-theme="light"]`. Anti-flash
      inline `<head>` script. Sun icon mirrors `[d]`. (Routes b/c/x 404 until
      their pages exist — expected.)
- [x] Rebuild Home (`index.astro`) to the spec mockup: prompt, name, tagline,
      quote + blinking cursor, 📍 Arizona, keybind row (keys display-only for now)
- [x] Add `career.astro` (Military/Tech/Education bullets; 2 muted TODO items
      for years/rank + formal network roles). **`projects.astro` still on disk,
      unlinked — delete pending Trevor's okay.**
- [x] Add `colophon.astro` (stack + design choices; reachable via [x], home-only
      in nav)
- [x] Rewrite About — already in Trevor's real voice (USAF, HH-60 Pavehawk, CSAR,
      Tucson, home lab, degrees); only reworded if Trevor wants changes
- [x] `projects.astro` deleted (Trevor okayed) along with the throwaway
      `fonts.astro`; both were unlinked and shipping as live routes.
- [~] Verify keyboard nav + theme toggle work and dark renders correctly —
      dark renders correctly on every page (screenshotted at 375px). The keydown
      handler + theme toggle are wired in BaseLayout; not manually key-tested in
      a browser this session.

### Phase 5 — Blog  ✅ complete
- [x] Define the `blog` content collection schema (title, date, description, tags)
      — `src/content.config.ts`, glob loader + zod schema
- [x] Add `BlogLayout` — `src/layouts/BlogLayout.astro` (post header + .post-body)
- [x] Build `/blog` index page listing posts (using `PostCard`) — newest-first
- [x] Build the single-post route (`[...slug].astro`) — getStaticPaths + render()
- [x] Write one sample Markdown post — `src/content/blog/hello-world.md`
- Notes: prose styled by hand in global.css `.post-body` (no typography plugin —
  ask before installing). Fixed a UTC date-off-by-one in the date formatters.

### Phase 6 — Polish  ✅ complete (pending review)
- [x] Add favicon and basic site metadata — custom terminal favicon
      (`public/favicon.svg`, green `>_` on `#0d1117`); `<head>` already had
      charset/viewport/title/description. Added `theme-color` (`#0d1117`) for
      mobile browser chrome. `favicon.ico` regenerated from the SVG (was a PNG of
      the old Astro logo — Safari/cached browsers use the `.ico`).
- [x] Add per-page SEO tags — set `site: 'https://stanferd.dev'` in
      `astro.config.mjs`; BaseLayout now emits a `canonical` link + Open Graph
      (`og:type/title/description/url/site_name`) + Twitter Card tags, all driven
      by the per-page `title`/`description` props. `og:image` deferred — add a
      social-preview image later.
- [x] Check pages look acceptable on mobile width — checked all pages at 375px;
      fixed a footer-bar overflow in `AppWindow` (added `flex-wrap` so the
      location/© / keybind row wraps instead of clipping `[h] help`).

### Phase 7 — Deploy  ✅ complete
- [x] Create a GitHub repo (via github.com or `gh`) and push the project to it —
      `github.com/stevensT/personal-site`; `main` pushed and tracking `origin/main`.
- [x] Connect the GitHub repo to Cloudflare Pages (auto-build on every push) —
      **Gotcha:** the Cloudflare *Workers* Git flow auto-runs `astro add cloudflare`
      (adds the `@astrojs/cloudflare` SSR adapter + wrangler) and fails the build.
      This site is fully **static** (no adapter), so it must be a **Pages** project:
      framework preset Astro, build `npm run build`, output `dist`, env
      `NODE_VERSION=22`. No adapter needed.
- [x] Confirm the production build succeeds and the `*.pages.dev` URL works — build
      green; site serves static `dist/`.
- [x] Point the custom domain at the site in Cloudflare (DNS) — **live at
      `https://stanferd.dev`** (200, HTTPS, correct canonical/title; inner routes
      308 → trailing-slash → 200, which is normal for Astro's static output).

### Phase 8 — Documentation  ✅ complete
- [x] Create `README.md` — intro (Trevor's voice) + stack, local-dev commands,
      project structure, how to add a blog post, and the Cloudflare deploy note.
- [x] Update `CLAUDE.md`: replaced the stale "not yet scaffolded" Project Status,
      the placeholder Setup, and the "not yet established" Architecture with the
      real structure, commands, and design-system tokens. Noted `npx astro check`
      still needs `@astrojs/check` + `typescript`.

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
  left out for now (can add later). Buildspec doesn't change this — footer stays.
- **Design direction: terminal/CLI aesthetic** (from `buildspec.md`). Full spec in
  §9. Dark default, monospace, prompt prefix, keyboard nav, blinking cursor.
- **Site structure:** Home / About / **Career** / Blog / **Colophon**. Projects is
  retired (replaced by Career). `projects.astro` to be deleted — *pending the edit*.
- **Tagline (chosen):** "Combat rescue flight engineer turned network builder,
  currently rebuilding his digital life from the ground up."
- **Quote (chosen):** "Flying rescue helicopters by day, building networks and
  systems by night."
- **Keybinds (canonical):** `[a]` about · `[b]` blog (route `/blog`, not
  `/writing`) · `[c]` career · `[x]` colophon · `[d]` toggle theme · `[h]` help.
- **Theme:** dark is default; `[d]` toggles to light, choice persisted.

### Still needed (from Trevor)
- ~~**Font choice**~~ — **RESOLVED: Option B** (mixed). Space Grotesk headings ·
  Newsreader (serif) body · Space Mono prompt/code. Chosen via the `/fonts`
  comparison page. (Overrides the spec's "no serifs" line — serif body won on
  readability.)
- **Career content** — the real bullet list (HH-60W, CSAR, years of service,
  network roles). Spec sketches it; needs Trevor's actual dates/details.
- **About rewrite** — current About predates the military bio; needs the flight-
  engineer / homelab / Arizona-dad framing from the spec.

---

## 8. Notes

- **Phase 0 complete.** Node.js LTS v24.16.0 / npm 11.13.0 installed via winget
  and verified on the persisted PATH. Next up is Phase 1 — scaffolding the Astro
  project.

---

## 9. Design System — Terminal Aesthetic (from `buildspec.md`)

> The personality *is* the constraint: a real terminal, not "dark-mode corporate."
> Single centered column, monospace, prompt prefix, keyboard-driven, blinking cursor.

### Color tokens
| Token        | Value     | Use |
|--------------|-----------|-----|
| Background   | `#0d1117` | Page background (GitHub dark, slightly warm). |
| Text         | `#c9d1d9` | Body text (off-white, not harsh). |
| Accent/prompt| `#1cb03a` | Prompt `$`, links, the blinking cursor. |
| Muted        | `#8b949e` | Secondary text, keybind hints. |

(Light theme via `[d]` — define a light counterpart for these when wiring the toggle.)

### Typography — **CHOSEN: Option B** (via `/fonts` comparison page)
- **Headings / name / roles:** Space Grotesk.
- **Body text:** Newsreader (serif) — won on long-form readability.
- **Prompt / keybinds / code:** Space Mono.
- Loaded from Google Fonts (`<link>`, no npm packages). Wire these into the real
  site theme; then delete the throwaway `/fonts` page.

### Layout
- Single column, centered, `max-width: 700px`.
- Prompt prefix `stanferd@csar:~$` before name/section headers.
- Keyboard hints rendered inline (e.g. `[a] about   [b] blog   [c] career`).
- **Signature element:** blinking cursor after the tagline (CSS animation, accent).

### Keyboard navigation (vanilla JS, ~20 lines — no framework)
```
[a] → /about     [b] → /blog       [c] → /career
[x] → /colophon  [d] → toggle theme [h] → help overlay
```
Routes are canonical here (the spec's stray `w → /writing` is dropped in favor of
`b → /blog`).

### Home page target (spec mockup)
```
stanferd@csar:~$ whoami

Trevor Stevens
────────────────────────
Combat Rescue. Network Engineer. DevOps.
> Combat rescue flight engineer turned network builder, currently
  rebuilding his digital life from the ground up.

> "Flying rescue helicopters by day, building networks and systems by night."

📍 Arizona

[a] about    [b] blog    [c] career   [x] colophon
[d] toggle dark/light     [h] help
```

### Content notes
- **About** (`about.md`-style): 2 paragraphs, human not résumé — work, homelab,
  what he actually cares about. *Needs rewrite from current About.*
- **Career** (`career.md`-style): bullet list — HH-60W, CSAR, years of service,
  network engineering roles. No flowery prose. *Needs Trevor's real details.*
- **Colophon:** built with Astro, hosted on Cloudflare Pages, written in VS Code;
  talk about the design choices.

# To-Do — Trevor Stevens Personal Website

> The full build history (phases 0–8, decisions, design spec) lives in git
> history: `git log -p tasks/todo.md` and the deleted `buildspec.md`.
> Current facts (stack, tokens, commands) live in `CLAUDE.md`.

---

## Where We Left Off  ← read this first when resuming

> Update this at the end of every work session, then commit + push. On a new
> machine: `git pull`, open Claude Code, say "read tasks/todo.md and continue."

- **Site is LIVE at `https://stanferd.dev`** (Cloudflare Pages, static output,
  auto-builds on push to `origin/main`). Repo `github.com/stevensT/personal-site`.
  All build phases (0–8) complete.
- **Latest session (2026-07-01):** ponytail audit applied — trimmed this file to
  just the resume block, deleted `buildspec.md` (superseded planning doc),
  inlined the one-caller `Prompt`/`Cursor` components into `index.astro` (cursor
  CSS moved to `global.css`), removed the never-passed `windowTitle`/`location`
  props from `AppWindow`, dropped the redundant `twitter:title/description` meta
  (X falls back to `og:`), folded `applyTheme()` into `toggleTheme()`, and
  deleted `.vscode/launch.json` (`npm run dev` covers it). Then a comment
  cleanup pass across all source files: trimmed tutorial-style and stale
  build-narrative comments, kept short purpose headers and the real gotcha
  notes (UTC dates, anti-flash script, projection sync). Uncommitted — awaiting
  review.
- **Deploy gotcha for next time:** must be a Cloudflare **Pages** project, not
  Workers — the Workers Git flow runs `astro add cloudflare` and breaks the
  static build.
- **Machine-move gotcha:** never file-copy `node_modules` between computers;
  `rm -rf node_modules && npm install` if the build fails with "Permission denied".

## HTML easter eggs — DONE (2026-07-01, uncommitted)

Fun/on-brand eggs in the page source. No new deps, no bytes shipped to normal
visitors beyond a tiny inline console.log. Built + verified in `dist/`.

- Top-of-`<head>` HTML comment banner (`banner` prop; default site-wide, Career
  overrides with "MOUNT UP" from `src/data/mount-up.txt` via `?raw`).
- Inline `console.log` DevTools egg.
- `public/humans.txt` (humanstxt.org) + `<link rel="author">` pointer in head.

- **BaseLayout.astro** — add optional `banner?: string` prop, default:
  `┌─[ stanferd.dev ]` / `└─$ you found the source. poke around.` Emit it as the
  first child of `<head>` via `<Fragment set:html={`<!--${banner}-->`} />`
  (raw-inject; a literal `<!-- {expr} -->` won't evaluate in Astro). Add a
  one-line `is:inline` console.log egg (green Space Mono `%c` styling).
- **career.astro** — define a `banner` const with "MOUNT UP" ASCII art (art must
  contain NO `--`, or it breaks the comment) and pass `banner={banner}` to
  override the default on this page only.
- Constraint = convention: all `banner` values are author-controlled static
  literals, so "no `--` in art" is a comment note, not a runtime guard. No test.

## Open items (content only)

- [ ] Career page: 2 muted TODO placeholders need Trevor's real details
      (service dates/rank; formal network-engineering roles).
- [ ] `og:image` social-preview image (BaseLayout omits the tag until one exists).
- [ ] Ongoing blog writing.
- [ ] Optional: `npx astro check` needs `@astrojs/check` + `typescript`
      installed — not yet added (ask before installing).

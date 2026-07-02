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

## Open items (content only)

- [ ] Career page: 2 muted TODO placeholders need Trevor's real details
      (service dates/rank; formal network-engineering roles).
- [ ] `og:image` social-preview image (BaseLayout omits the tag until one exists).
- [ ] Ongoing blog writing.
- [ ] Optional: `npx astro check` needs `@astrojs/check` + `typescript`
      installed — not yet added (ask before installing).

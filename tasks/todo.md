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
- **Latest session (2026-07-01):** added HTML source easter eggs and a
  humans.txt (committed + pushed to `origin/main`) — see the section below.
  Prior session's ponytail audit + comment cleanup is also committed (see
  `git log`).
- **Deploy gotcha for next time:** must be a Cloudflare **Pages** project, not
  Workers — the Workers Git flow runs `astro add cloudflare` and breaks the
  static build.
- **Machine-move gotcha:** never file-copy `node_modules` between computers;
  `rm -rf node_modules && npm install` if the build fails with "Permission denied".

## HTML easter eggs — DONE (2026-07-01, committed + pushed)

On-brand eggs in the page source; no new deps. Full spec in `git log`.

- View-source HTML comment banner via a `banner` prop on BaseLayout (default
  site-wide; `/career` overrides with "MOUNT UP" from `src/data/mount-up.txt`,
  imported `?raw`). Art must never contain `-->` (would close the comment).
- Inline `console.log` DevTools egg in `<head>`.
- `public/humans.txt` (humanstxt.org standard) + `<link rel="author">` pointer.
  Its `Last update:` date is hand-maintained — bump on meaningful changes.

## Open items (content only)

- [ ] Career page: 2 muted TODO placeholders need Trevor's real details
      (service dates/rank; formal network-engineering roles).
- [ ] `og:image` social-preview image (BaseLayout omits the tag until one exists).
- [ ] Ongoing blog writing.
- [ ] Optional: `npx astro check` needs `@astrojs/check` + `typescript`
      installed — not yet added (ask before installing).

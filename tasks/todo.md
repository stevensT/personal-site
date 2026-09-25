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
- **Latest session (2026-09-24) — repo recovery, no site/code changes.** The
  working copy had been clobbered: `.git/index` held a byte-exact copy of the
  June 11 tree (`c66f742`) staged on top of the July 2 `HEAD` (`a26bd08`), so
  git showed 32 phantom "staged changes" nobody made. Part of the working tree
  had also been reverted to that same old snapshot (stale `CLAUDE.md`,
  `README.md`, `index.astro`, `global.css`, …). **Nothing was lost** — `HEAD` ==
  `origin/main` == `a26bd08`, no unpushed commits, no stashes, no other
  branches. Fixed by re-cloning from GitHub rather than repairing in place,
  because a re-clone also drops the contamination listed in the gotcha below.
  Verified: clean `git status`, `npm run build` passes 6/6 pages.
- **ACTION PENDING (do this first if it hasn't happened):** the old folder gets
  renamed to `personal-site-BROKEN` and the fresh clone renamed to
  `personal-site`. Both folders must be closed in VSCode/Claude Code first —
  Windows won't rename a directory any process holds open. If you see a
  `personal-site-BROKEN` in `01_dev`, that is the corrupted copy; it contains
  nothing that isn't in git. Safe to delete after a few days in the new folder.
- **Prior session (2026-07-01):** HTML source easter eggs and a humans.txt
  (committed + pushed to `origin/main`) — see the section below. The earlier
  ponytail audit + comment cleanup is also committed (see `git log`).
- **Deploy gotcha:** must be a Cloudflare **Pages** project, not Workers — the
  Workers Git flow runs `astro add cloudflare` and breaks the static build.
- **Machine-move gotcha:** never file-copy `node_modules` between computers;
  `rm -rf node_modules && npm install` if the build fails with "Permission denied".
- **Machine-move gotcha — THIS IS WHAT BROKE IT (2026-09-24):** never folder-copy
  a repo between machines either. Move work through Git, never through a copied
  directory. The broken copy carried the fingerprints of a macOS-origin `.git`:
  `.DS_Store` files inside `.git/`, `core.filemode=true` (Windows clones set it
  `false`), LF endings despite `core.autocrlf=true`, and a stale 0-byte
  `.git/index.lock` dated 2026-09-15 that had been silently failing every
  `git add` / `git commit` for six weeks — which is why the bad state persisted
  unnoticed. Sibling repos in `01_dev` were checked and are all clean. **If a
  machine's copy looks stale or wrong, re-clone it — don't try to pull it back
  into shape.** Check `git log --oneline -1` on the laptops before working.

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

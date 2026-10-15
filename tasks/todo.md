# To-Do — Trevor Stevens Personal Website

> The full build history (phases 0–8, decisions, design spec) lives in git
> history: `git log -p tasks/todo.md` and the deleted `buildspec.md`.
> Current facts (stack, tokens, commands) live in `CLAUDE.md`.

---

## Where We Left Off  ← read this first when resuming

- **Pre-deploy build (2026-10-14):** `npm run build` passed again after Trevor's latest
  local edits: 8 static pages, zero type errors/warnings/hints, 12 tests passed.
  `git diff --check` passed. Trevor will commit and push to deploy; no commit
  or push was performed by Codex. Localhost at 127.0.0.1:4321 is running;
  the career page was refreshed and its latest wording verified. Full browser
  checks were not repeated this run.

- **Career copy update (2026-10-14):** Trevor's latest edits label the home-lab
  AI work “Working on:” and the CompTIA certifications “TODO:”. Both are
  visible on the refreshed local career page.

> Update this at the end of every work session, then commit + push. On a new
> machine: `git pull`, open Claude Code, say "read tasks/todo.md and continue."

- **Site is LIVE at `https://stanferd.dev`** (Cloudflare Pages, static output,
  auto-builds on push to `origin/main`). Repo `github.com/stevensT/personal-site`.
  All build phases (0–8) complete.
- **Latest session (2026-10-14) — all nine audit findings addressed locally.**
  Trevor approved the plan and packages. Changes are ready for review; nothing
  has been committed or pushed. Astro 7.3.8, Tailwind 4.3.3, @astrojs/check
  0.9.10, TypeScript 6.0.3, and transitive http-cache-semantics 4.3.0 are locked.
  Final build: 8 pages, zero type diagnostics, 12 passing Node checks. Final
  npm audit: zero vulnerabilities. Deliberate type/storage regressions were
  correctly rejected by the build gate; both temporary probes were removed.
  Native Help, its off switch and theme button, resilient storage, contrast,
  wrapping navigation, and the duplicate post title are fixed. Both agent
  guides remain synchronized; README and humans.txt reflect the current stack.
  Browser checks: all 8 routes at 320/375/768/1280px and 640px zoom-equivalent
  width; no page overflow. Focus return, inactive background links, Escape,
  backdrop clicks, preferences across navigation, and unavailable storage pass.
  Native zoom commands are unavailable in the in-app browser; equivalent
  reflow was checked instead. Real mobile devices and screen readers were not
  tested. Existing reduced-motion CSS was retained and reviewed.
- **Previous session (2026-09-24) — repo recovery, no site/code changes.** The
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

## Audit fixes — completed after approval (2026-10-14)

Status: Trevor approved the plan and packages on 2026-10-14. All nine findings
are addressed; verification and environment limits are recorded above.

### Decisions and approval scope

- Keep static Cloudflare Pages output, current URLs, and the terminal design.
- Keep single-letter shortcuts enabled by default, with a visible off switch
  in Help on every page. This preserves the existing keys without conflicting
  with browser/OS combinations. Remember the choice when storage is available;
  when storage is blocked, the choice applies to the current page only.
- Use the native HTML dialog for Help: the browser manages modal focus and
  blocks interaction with the page behind it. Add labeled Help/Close buttons
  and a theme button in Help so disabling shortcuts does not remove controls.
- Approved existing-package updates: Astro 6.4.7 -> 7.3.8; Tailwind CSS and
  @tailwindcss/vite 4.3.0 -> 4.3.3. This includes an explicit Astro major upgrade.
- Approved new development dependencies: @astrojs/check 0.9.10 and TypeScript
  6.0.3. The checker supports TypeScript 5/6, not current TypeScript 7.0.2.
- Use Node's built-in test runner; no new browser/test framework dependency.
- Any additional package, major upgrade, or dependency override needs a revised
  proposal and approval. No automatic commits, pushes, or deployment changes.

### Implementation order and acceptance

- [x] **1. Enable type checking (#7).** Add the two approved development
  dependencies and an npm check command; make builds run astro check before
  astro build. Fix existing type errors while preserving runtime behavior.
  **Pass:** check and production build succeed; invalid types stop the build.
- [x] **2. Refresh dependencies (#6).** Record the eight current routes and
  rendered blog output as a comparison baseline. Apply the proposed package
  versions, refresh the lockfile, and review the Astro 7 migration guide.
  Check Vite/Tailwind compatibility, Markdown rendering, whitespace, and the
  stricter compiler. Fix only migration changes needed by this site.
  **Pass:** eight routes and assets still build; dates, links, code blocks, and
  article text remain correct. npm audit clears the original advisory set;
  every residual advisory is identified with its affected path and next fix.
  Do not mark #6 complete while a planned dependency fix remains unresolved.
- [x] **3. Make theme storage optional (#4).** Keep the early theme script in
  the head to prevent a flash. Catch failed reads; apply theme changes before
  attempting saved writes. Preserve the existing theme storage key.
  Move interactive behavior into src/scripts/site-controls.ts so BaseLayout
  stays focused on page structure and each modified file stays under 200 lines.
  **Pass:** normal saved themes survive navigation; blocked reads/writes do not
  break buttons or shortcuts. Persistence is optional, not required to toggle.
- [x] **4. Repair Help and shortcut control (#2, #3).** Put dialog markup in
  src/components/ShortcutHelp.astro, used by BaseLayout. Replace home footer
  Help text with a button; add a Help button to the inner-page Nav. Wire both
  through the same control script. Add Close, theme, and shortcut on/off
  controls with proper labels; update hints and relevant colophon copy.
  Keep typing fields, select controls, contenteditable, composition, repeated
  keydowns, and browser/OS modifier combinations from triggering shortcuts.
  Suppress route shortcuts while Help is open; keep Escape closing the dialog.
  **Pass:** focus stays in Help and returns to its opener; Close, Escape, and
  backdrop dismissal work; panel clicks do not dismiss. Disabled shortcuts
  neither navigate nor change theme, while all clickable controls still work.
- [x] **5. Fix contrast and narrow layout (#1, #5).** In global.css, propose
  light accent #0f7625 and muted #5a6270. Their minimum ratios against the three
  light backgrounds are 4.87:1 and 5.18:1; both exceed 4.5:1 for ordinary text.
  Allow Nav to wrap with explicit row spacing, including its new Help button.
  **Pass:** normal/hover/focus text meets the target in both themes; all links
  remain visible without page-level horizontal overflow at 320, 375, 768, and
  1280 pixels, including a normal scrollbar and a zoomed desktop view.
- [x] **6. Remove the duplicate post title (#9).** Delete only the two repeated
  body heading lines in second-brain-that-stuck.md; retain its frontmatter title,
  content, and URL. **Pass:** the rendered article has one main heading.
- [x] **7. Save regression checks and gate builds (#7).** Add focused tests in
  tests/site-controls.test.mjs and tests/site-output.test.mjs. Execute actual
  control logic with minimal storage/DOM fixtures, and inspect built output.
  Cover rejected storage reads/writes, theme transitions, shortcuts on/off,
  typing/modifier/repeat guards, dialog open/close, contrast, and internal links.
  Real focus and responsive layout remain browser checks, not mocked assertions.
  Add npm test using node --test; final npm run build runs astro check, astro
  build, and npm test in that order. Output tests require fresh build artifacts.
  **Pass:** the checks detect a reintroduced storage/shortcut bug; build fails
  on test failure. Document the command for running one test file by itself.
- [x] **8. Final review and handoff.** Recheck every audit finding and test the
  production preview: all routes, both themes, blocked storage, Help focus and
  dismissal, shortcut preference across navigation, images, and reduced motion.
  Run the final build/test gate, npm audit, and git diff --check. Keep AGENTS.md
  and CLAUDE.md synchronized; update README, colophon stack text, humans.txt
  stack/date, and this handoff with actual commands and completed work.
  **Pass:** every finding has recorded verification, and the final diff is ready
  for Trevor to review before any separately requested commit or push.

### File scope

Existing: package.json, package-lock.json, astro.config.mjs only if migration
needs it, BaseLayout.astro, AppWindow.astro, Nav.astro, global.css, index.astro
only for control hints/comments, colophon.astro, second-brain-that-stuck.md,
README.md, AGENTS.md, CLAUDE.md, humans.txt, and tasks/todo.md. Existing pages or
components with actual type/migration errors may need small corrective edits.
New: ShortcutHelp.astro, site-controls.ts, and the two focused test files above.
New components/functions get the purpose/props/JSDoc comments required here.

### Research references (checked 2026-10-14)

- Astro migration: https://docs.astro.build/en/guides/upgrade-to/v7/
- Shortcut off-switch requirement: https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts.html
- Native dialog: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog
- Versions/compatibility: read-only npm view and npm outdated results in this chat.

## HTML easter eggs — DONE (2026-07-01, committed + pushed)

On-brand eggs in the page source; no new deps. Full spec in `git log`.

- View-source HTML comment banner via a `banner` prop on BaseLayout (default
  site-wide; `/career` overrides with "MOUNT UP" from `src/data/mount-up.txt`,
  imported `?raw`). Art must never contain `-->` (would close the comment).
- Inline `console.log` DevTools egg in `<head>`.
- `public/humans.txt` (humanstxt.org standard) + `<link rel="author">` pointer.
  Its `Last update:` date is hand-maintained — bump on meaningful changes.

## Open items (content only)

- [ ] Career page: update the CompTIA certifications TODO when completed;
      agentic AI home-lab development is marked as work in progress.
- [ ] `og:image` social-preview image (BaseLayout omits the tag until one exists).
- [ ] Ongoing blog writing.

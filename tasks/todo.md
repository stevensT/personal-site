# To-Do — Trevor Stevens Personal Website

> The full build history (phases 0–8, decisions, design spec) lives in git
> history: `git log -p tasks/todo.md` and the deleted `buildspec.md`.
> Current facts (stack, tokens, commands) live in `CLAUDE.md`.

---

## Where We Left Off  ← read this first when resuming

- **Blog changes ready for commit (2026-10-14):** Trevor accepted the compact
  right tags panel. Final review of all pending source/tests found no issues.
  README and both architecture guides describe the final blog layout, tag
  archives, tag encoder, and section tracker. Final npm run build passed:
  20 pages, zero errors/warnings/hints, all 24 tests passed. git diff --check
  passed. All edited source/test files remain under 200 lines. Only the 19
  intended source/test/documentation files are pending; no temporary fixtures
  or screenshots will be committed. No packages added; humans.txt already has
  2026/10/14. Earlier Chrome checks cover responsive layouts, both themes,
  focus, tag/article navigation, and current-section rails. No new browser
  checks were needed for this documentation-only finish. Real mobile devices,
  screen readers, and other engines were not tested. The port 4322 preview
  remains running (Windows previously denied cleanup); development is on 4321.
  Trevor explicitly chose to leave the changes ready for him to commit.
  Nothing staged, committed, or pushed by Codex. After Trevor commits, pushing
  main deploys through Cloudflare Pages and enables git pull on another
  computer; push only when he explicitly asks.

- **Blog index right tags panel completed (2026-10-14):** Trevor selected
  the right-panel proposal and requested a preview. /blog keeps the 1200px
  shell and now has one roomy PostCard per row beside a compact 240px tag
  panel at 1024px+. The panel uses a muted left rail, 12px heading/links,
  and wrapping tag chips. Below 1024px, tags precede the single-column posts.
  All 12 tags, alphabetical order, archive URLs, and newest-first posts remain.
  No-tag output omits the panel and its reserved column. This pass changed
  only the blog index, existing all-tags test wording, and this handoff.
  npm run build passed: 20 pages, zero type errors/warnings/hints, 24 tests.
  Chrome production checks at 375/768/1024/1440/1920px in both themes passed:
  desktop panel right/top aligned at 240px, mobile tags above, cards stacked,
  all tags contained, no page overflow, visible keyboard outlines. Verified
  keyboard archive activation, Back to all posts, article opening and Back
  to blog. Desktop dark screenshot saved. The last mobile screenshot timed
  out; its DOM/layout checks had passed. A fresh development preview tab
  recovered browser access; normal 2198x1955 viewport and dark theme verified.
  git diff --check passed. No packages, commit, or push; humans.txt already
  has 2026/10/14. Real mobile hardware, screen readers, and other browser
  engines were not tested. Existing port 4322 preview was reused.

- **Blog index desktop width completed (2026-10-14):** Trevor approved the
  proposal. /blog now reuses the 1200px wide shell, keeping All tags above
  the post grid. Cards show two across at 1024px+ and one below that; order
  stays newest first, left to right. Nav and Footer align with the content.
  Shared layout/Nav/Footer changes this pass are comment updates only.
  Updated the existing output test's post-only width assumption to include
  the blog index and retain narrow-shell checks elsewhere. npm run build
  passed: 20 pages, zero type errors/warnings/hints, all 24 tests passed.
  Chrome production checks passed at 375/768/1024/1440/1920px in both themes:
  correct columns, aligned shell, tags above cards and inside the page,
  no horizontal page overflow. Keyboard outline/activation, tag archive
  return, card-title navigation and Back to blog passed. Reviewed desktop
  dark and mobile light screenshots. Normal viewport/dark theme restored;
  updated development preview open. Temporary production preview on port 4322
  remains running because Windows denied process cleanup. git diff --check
  passed. humans.txt
  already has 2026/10/14. No packages, commit, or push. Real mobile hardware,
  screen readers, and other browser engines were not tested.

- **Blog index all-tags navigation completed (2026-10-14):** Trevor approved
  the plan. /blog now lists all 12 current tags once, alphabetically, above
  the posts. Each opens its existing archive; the list updates from post tags
  on every build. It uses the shared tagSlug helper and existing link styling.
  This pass touched only the blog index, blog-tags test, and this handoff.
  npm run build passed: 20 pages, zero type errors/warnings/hints, 24 tests.
  git diff --check passed. Chrome checks at 375/1440px in both themes passed:
  tags wrap without page overflow, keyboard focus is visible, and a tag click
  plus Back to all posts works. Normal viewport restored; development preview
  is open in Chrome. No packages, commit, or push. humans.txt already has
  2026/10/14. Real mobile hardware, screen readers, and other engines were
  not tested.

- **Sidebar rails, active sections, and clickable tags completed (2026-10-14):**
  Trevor approved the combined scope. Tags and Contents have aligned muted
  left rails; the current h2/h3 link and matching full-height segment turn green.
  The tracker keeps exactly one aria-current="location", handles long sections,
  jumps, reverse scroll, article end, resize, image/font changes, and restoration.
  It does not rewrite URL fragments or move focus while scrolling.
  Sidebar/card tags now open static /tags/<tag>/ pages using existing PostCards,
  newest first. Cards have separate title/tag anchors. Twelve distinct tags
  produce 20 total pages. Current simple tag URLs retain their original labels.
  A shared src/utils/tags.ts encoder keeps punctuation/Unicode names distinct
  using ~XX path escapes; this avoids Astro's inconsistent reserved percent
  decoding between static-path generation and serving. A fixture caught the
  original URI mismatch; spaces, C++, a/b, ampersands, and café now all build
  and navigate correctly. The temporary post and its five tag pages are gone.
  Final npm run build: 20 pages, zero type errors/warnings/hints, 23 tests pass.
  Chrome: all 20 real routes at 375/1440px in both themes (80 checks), no page
  overflow. Verified shared-tag membership/order, sidebar/card tag clicks,
  article opening, Back, collapse/reopen, keyboard outline, scroll-to-end/top,
  direct subsection jumps, and wrapped h3 marker alignment/full row height in
  both themes/sizes. Native accessibility clicks verified card-title navigation
  after the Playwright locator click did not navigate in this session.
  All edited source/test files are under 200 lines; no packages were added.
  humans.txt already has 2026/10/14. Dark theme/normal viewport restored; the
  local development preview is open in Chrome. No commit/push. Real mobile
  hardware, screen readers, and other browser engines were not tested.

- **Sidebar typography refinement completed (2026-10-14):** Trevor approved
  the follow-up. Tags/Contents labels are 12px; contents entries use 13px
  Space Grotesk. Links are muted without permanent underlines; hover and
  keyboard focus add accent color and underlines. Block links keep roughly
  29px click height with tighter row spacing. Article headings/tag labels retain
  their existing sizes. Only BlogLayout.astro and this handoff changed this pass.
  npm run build passed: 8 pages, zero type diagnostics, 14 tests passed. Chrome
  production checks at 375/1440px in both themes confirmed sizes, wrapping, no
  page overflow, visible keyboard underline/outline, and a section jump landing
  32px below the viewport top. Normal viewport/dark theme were restored.
  The refreshed development preview is open in Chrome for Trevor to review.
  humans.txt already has today's date; no date edit was needed. No packages,
  commits, or pushes. Real mobile devices/screen readers were not tested.

- **Blog layout implemented and browser-verified (2026-10-14):** Trevor approved
  the plan/scaffold and changed sidebar placement to the RIGHT. Individual posts
  now use a 1,200px shell, an article up to 850px, and a 240px sticky right sidebar
  at 1024px and wider. Tags are individual labels; generated h2/h3 contents links
  use native collapsible details, expanded initially at all widths. Below 1024px
  the sidebar is above the article. Nav/Footer align with the wider post shell.
  Final npm run build: 8 pages, zero type errors/warnings/hints, 14 passing tests.
  Temporary build fixtures verified duplicate headings, subsection indentation,
  formatted heading labels, empty headings/tags, and escaped/long tag output;
  fixtures and generated fixture routes were removed. git diff --check passed.
  All edited source/test files remain under 200 lines; no packages were added.
  humans.txt already has 2026/10/14, so it did not need a date edit. No commit/push.
  Chrome subsequently connected and production output was checked on port 4322.
  All 8 routes passed overflow checks at 320/1280px in both themes; all 3 posts
  passed at 375/640/768/1440/1920px in both themes too. Desktop article width
  measured 850px; sidebar was on the right and sticky at 32px after scrolling.
  Contents keyboard collapse/reopen, Tab/Enter section jumps, heading landing
  spacing, code-only horizontal scrolling, responsive images, and Help Escape
  with focus return passed. Dark theme and normal viewport were restored.
  640px was a zoom-equivalent reflow check; real device/screen-reader testing
  and browser testing of artificial long-tag/long-contents fixtures were not run.

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

## Blog index right tags panel — completed (2026-10-14)

Trevor selected the right-panel proposal and requested a preview. This
supersedes the full-width tag strip and two-card desktop grid on /blog.

- [x] In src/pages/blog/index.astro, retain the wide 1200px shell and place
  the tags and posts in a responsive grid below the introduction. At 1024px+
  use a flexible post column, a 32px gap, and a 240px tags column on the right.
  Render one roomy PostCard per row; preserve newest-first ordering.
- [x] Keep All tags as the small panel heading. Use a subtle left border,
  inset padding, and compact bordered tag links wrapping within the panel.
  Retain every tag, alphabetical sorting, existing archive URLs, and keyboard
  focus styling. On smaller screens tags precede the single-column posts.
  Keep source order consistent with mobile; use grid placement for desktop.
  Hide the panel and use the full post width when no tags exist.
- [x] Update the existing all-tags test wording to remove its top-only
  assumption, retaining completeness, uniqueness, sorting, link validation,
  and source-order coverage. Run npm run build and git diff --check.
- [x] Check Chrome at 375/768/1024/1440/1920px in both themes for right-panel
  placement, wrapping, readable cards, and no page overflow. Check keyboard
  focus, a tag/archive return, and article navigation. Save a desktop
  screenshot, restore viewport/theme, and update the handoff. No packages,
  commit, or push. humans.txt already has today's 2026/10/14 date.

File scope: src/pages/blog/index.astro, tests/blog-tags.test.mjs, tasks/todo.md.
Reuse BaseLayout, PostCard, tagSlug, and the existing tokens. No shared layout,
article-sidebar, archive, global CSS, dependency, or new script changes.

## Blog index desktop width — completed (2026-10-14)

Trevor wants less unused space beside the blog index, keeping All tags at
its top. The current index uses BaseLayout's default 700px shell; individual
articles already opt into a 1200px shell via the wide prop.

- [x] In src/pages/blog/index.astro, opt into the existing wide shell (1200px
  maximum including padding). This also aligns the existing Nav and Footer.
- [x] Change the post list to a responsive grid: one column below 1024px and
  two equal columns at 1024px and above, retaining the existing gap and cards.
  Keep the title, introduction, and All tags above the grid. Preserve newest
  first order, read left to right, then the next row.
- [x] Update the wide-prop comments in src/layouts/BaseLayout.astro,
  src/components/Nav.astro, and src/components/Footer.astro to describe blog
  pages, since the index will now reuse that option too. No behavior changes
  in these shared files or changes to other routes are needed.
- [x] Run npm run build and git diff --check. Use existing output tests for
  article links, ordering, and tags. Verify Chrome at 375, 768, 1024, 1440,
  and 1920px in both themes: column count, tag wrapping, no horizontal page
  overflow, keyboard focus and navigation. Save a desktop review screenshot,
  restore the normal viewport, and update this handoff. No packages, commit,
  or push. humans.txt already has 2026/10/14; update only if the date changes.

File scope: src/pages/blog/index.astro; comments only in BaseLayout.astro,
Nav.astro, Footer.astro; tests/site-output.test.mjs; tasks/todo.md.
Build caught the existing post-only width assertion; update it to include
the blog index while retaining narrow-shell checks on other routes. Reuse PostCard unchanged. No new
component, JavaScript, dependency, route, or global style. Tag archive layouts
stay as they are; this request concerns the blog root.

## Blog index all-tags navigation — completed (2026-10-14)

- [x] In src/pages/blog/index.astro, derive distinct tags from all blog posts,
  sort alphabetically with an explicit English locale, and render an All tags
  section between the introduction and article list. Show every tag once;
  link to its existing archive using the shared tagSlug helper.
- [x] Match the existing bordered tag links, hover/focus treatment, and click
  targets. Let the list wrap on small screens; retain newest-first post order
  and the current index layout. Hide the section when no tags exist.
- [x] Extend tests/blog-tags.test.mjs to verify the index list contains every
  archive link exactly once, is alphabetized, and resolves to existing pages.
  Run npm run build and git diff --check.
- [x] Check desktop/mobile Chrome views in both themes; click a tag and return
  to the blog. Update this handoff with results. No commit or push. Check
  humans.txt's date; no edit is needed if this ships on 2026/10/14.

File scope: src/pages/blog/index.astro, tests/blog-tags.test.mjs, tasks/todo.md.
No new component, script, package, route, or global style is needed. This
supersedes the earlier decision to omit a site-wide tag directory. The list
is generated from tags on current posts and updates on each site build.

## Sidebar rails and active section — completed (2026-10-14)

Reference: https://technotim.com/posts/switchyard-local-ai-routing/

### Behavior

- Add a thin muted vertical rail to the left of Tags and Contents, aligned
  with each other and separated from their text by comfortable padding.
  Tag rail stays static while individual tags link to the new archive pages
  described below; only contents entries participate in section tracking.
- Highlight the current h2/h3 contents entry with the existing accent green
  and modest extra font weight. Highlight only the adjacent portion of the
  contents rail, including the full height of wrapped entries. Keep the active
  segment on the same rail for indented subsections.
- Preserve the approved 12px labels, 13px Space Grotesk contents text, and
  hover/focus underlines. Keep visible keyboard outlines and adequate hit areas.
- Track the last listed heading to cross the reading position near the top of
  the viewport, retaining that section through long paragraphs/code blocks.
  Use the first entry above the first section and the last entry at the end
  of the article. Scrolling upward, direct URL fragments, resize, and section
  jumps must keep the active entry accurate. Recheck after images/fonts load.
- Set aria-current="location" on exactly one current link. Update styles
  without moving keyboard focus, forcing page scroll, or announcing every
  scroll change. With no contents or JavaScript, ordinary article/links work.
- Keep the rails on smaller screens too; existing native Contents collapse
  continues to work. No animation, storage preference, or added package.

### Implementation and checks

- [x] Update BlogLayout.astro with rail markup/scoped styles, link hooks, and
  the post-only script import. Keep all edited files under 200 lines.
- [x] Add src/scripts/post-contents.ts for scroll tracking. Follow the existing
  browser-script pattern; coalesce scroll updates into animation frames.
- [x] Add tests/post-contents.test.mjs using the existing TypeScript/Node VM
  test pattern. Exercise actual script behavior: initial/current state, long
  sections, up/down movement, fragments, bottom of article, resize, and empty
  headings; confirm only one aria-current link and updates are coalesced.
- [x] Include the new test file in package.json's test command. Extend current
  site-output checks only where needed to verify new markup/script wiring.
- [x] Run npm run build and git diff --check. In Chrome, verify rails/active
  segment alignment for wrapped entries and subsections, actual scrolling and
  jumps, both themes, 375/1440px layouts, keyboard focus, and collapse/reopen.
  Use a temporary post fixture if current articles lack subsections.
- [x] Update this handoff with actual results/limits. Check humans.txt's date
  when shipping; it already matches 2026/10/14. No commit or push.

File scope: src/layouts/BlogLayout.astro; new src/scripts/post-contents.ts;
new tests/post-contents.test.mjs; package.json (test command only);
tests/site-output.test.mjs; src/utils/tags.ts (shared tag path encoding);
tasks/todo.md.
No dependency, article-copy, URL, hosting, or global CSS change is expected.

## Clickable tags and tag archives — completed (2026-10-14)

This extends the rail/active-section proposal above. Trevor approved both as
one change. It supersedes the original first-pass
decision to leave tags as display-only labels.

### Behavior and scope

- Every displayed tag on an article sidebar or PostCard becomes a real link.
  Clicking homelab opens /tags/homelab/ with all posts bearing that exact tag,
  sorted newest first. Build one static page per distinct existing tag.
- Tag pages show a clear tag heading, a Back to all posts link, and the existing
  PostCard list. They work with direct URLs, browser Back, and no JavaScript.
  New posts/tags automatically update archive pages on the next site build.
- Reuse the current collection data, theme tokens, PostCard, and ordinary-width
  BaseLayout. Keep existing article URLs and frontmatter. Use URL-safe encoding
  for tag paths and preserve the displayed tag names without lossy slug rules.
- PostCard currently wraps everything in one anchor. Replace that with a card
  container holding a title link and separate tag links; HTML forbids nesting
  links. The title opens the article; tags open their archives. Apply this once
  in PostCard so the blog index and new tag pages share the same behavior.
- Preserve current tag appearance, adding visible hover/focus treatment and
  comfortable click targets. Do not add a tag directory, search, pagination,
  client-side filtering, database, or dependency.

### Implementation and acceptance

- [x] Add src/pages/tags/[tag].astro. Generate paths from distinct collection
  tags; filter by exact tag and sort by date. Reuse BaseLayout and PostCard,
  with purpose/props and getStaticPaths comments as required by this repo.
- [x] Update BlogLayout.astro sidebar labels to anchors targeting tag pages.
  Update PostCard.astro to support separate article and tag links; check every
  caller (existing blog index and new archive route).
- [x] Update existing site-output tag assertions for anchor markup. Add focused
  tests/blog-tags.test.mjs for tag URL resolution, exact membership (including
  a shared tag), newest-first order, preserved article links, and valid sibling
  anchors. Include it in package.json's test command alongside the planned
  post-contents tests. Keep each source/test file under 200 lines.
- [x] Run npm run build and git diff --check. In Chrome, click sidebar and card
  tags, check shared/unique tag lists and browser Back/direct navigation, and
  verify responsive wrapping, themes, keyboard focus, and unchanged article
  navigation. Run these together with the pending rail/scroll-tracking checks.
- [x] Update this handoff and humans.txt's date if needed when shipping.
  No commit or push without Trevor's separate request.

Additional file scope beyond the rail proposal: new src/pages/tags/[tag].astro;
src/components/PostCard.astro; new tests/blog-tags.test.mjs. Shared edits remain
src/layouts/BlogLayout.astro, tests/site-output.test.mjs, package.json (test
command only), and tasks/todo.md. No new package or content-schema change. The new shared src/utils/tags.ts
helper is used by all three tag-link/route callers; its safe, distinct path
encoding is covered by the archive tests and temporary browser fixture.

## Sidebar typography refinement — completed (2026-10-14)

- [x] In src/layouts/BlogLayout.astro, make the Tags/Contents labels 12px.
  Set the contents navigation to the existing Space Grotesk font at 13px,
  keeping article headings and tag labels at their current sizes.
- [x] Remove permanent underlines from contents links. Retain the current muted
  color; use accent color and underlining on hover and keyboard focus. Keep
  the browser focus outline visible. Use block links with vertical padding
  and a smaller gap between rows so the list stays compact and easy to click.
- [x] Run npm run build and git diff --check. Review 375px and 1440px views in
  Chrome, both themes, wrapping, keyboard focus, and a contents jump.
- [x] Update this handoff with results. humans.txt already has today's date;
  leave it as-is if the change finishes today. No commit or push.

File scope: src/layouts/BlogLayout.astro and tasks/todo.md. No CSS, package,
article-copy, or new test changes are expected for this typography-only edit.

## Blog post layout — implemented and verified (2026-10-14)

### Goal and design

Make individual posts use desktop space better and put useful article
navigation on the right, while keeping Trevor's terminal colors and fonts.
Reference: https://technotim.com/posts/switchyard-local-ai-routing/

- Desktop target: about 1,200px overall, with a roughly 240px right sidebar,
  a 48px gap, and an article up to roughly 850px wide (currently under 700px).
  Use a two-column layout only when both columns fit comfortably; avoid
  stretching prose across the entire monitor. Review at 1280, 1440, and 1920px.
- Right sidebar: a Back to blog link, this post's Tags as individual wrapping
  labels, and Contents links to its level-2/level-3 section headings. Indent
  subsection links. Keep the publication date with the article title.
- Keep the sidebar visible while scrolling on desktop (CSS sticky positioning).
  Long contents lists must remain scrollable and keyboard reachable.
- Mobile/tablet: one column; tags and a native collapsible Contents section
  above the article. Contents starts expanded at all widths and can be collapsed. Do not squeeze prose
  beside a narrow sidebar or hide navigation from mobile readers.
- Generate contents at build time from Astro's rendered heading list and IDs.
  Updating Markdown headings automatically updates links; no hand-maintained
  list, extra package, or browser JavaScript is needed. Include only h2/h3;
  hide Contents when none exist and Tags when the tag list is empty.
- Tags are display labels in this first pass. Clickable tag archive pages,
  site-wide popular tags, recent-post lists, reading-time estimates, and
  active-section highlighting are outside this proposal.

### Implementation scope

- [x] Add a documented blog-width option to BaseLayout; pass it only from
  BlogLayout. Align Nav/Footer to that width on posts, retaining their current
  widths on other pages. Review every existing layout caller.
- [x] Read headings alongside Content in src/pages/blog/[...slug].astro and
  pass their typed data to BlogLayout. Render sidebar, contents links, and
  existing post title/date/body using normal HTML semantics.
- [x] Add responsive layout/sticky/contents styles, using current theme tokens.
  Ensure grid children can shrink and code blocks scroll inside the article.
  Keep modified files under 200 lines; keep purpose/props comments current.
- [x] Extend existing Node output checks for all post contents links pointing
  to actual heading IDs, correct order/labels, and tags matching frontmatter.
  Cover h3 indentation, duplicate heading slugs, and empty headings/tags with
  a small temporary build fixture if current posts do not exercise them.
- [x] Run npm run build and git diff --check. Check desktop and mobile layouts,
  both themes, keyboard access, anchor landing positions, long headings/tags,
  code-block overflow, and one-column reflow at zoom-equivalent widths.
  Recheck non-blog routes because BaseLayout/Nav/Footer are shared.
- [x] Update humans.txt's hand-maintained date for the implemented change and
  this handoff with actual results and any environment limits. No commit/push.

Implementation results: build/output checks and connected-Chrome production
checks pass. Specific coverage and limits are recorded in the handoff above.
The existing humans.txt date already matches this work (2026/10/14).

Expected existing files: src/layouts/BaseLayout.astro,
src/layouts/BlogLayout.astro, src/pages/blog/[...slug].astro,
src/components/Nav.astro, src/components/Footer.astro,
src/styles/global.css, tests/site-output.test.mjs, public/humans.txt,
and tasks/todo.md. No content-schema, post-copy, URL, dependency, or hosting
changes are required. Prefer existing files; add a small blog stylesheet only
if needed to respect the 200-line limit.

Technical reference: https://docs.astro.build/en/reference/modules/astro-content/#render

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

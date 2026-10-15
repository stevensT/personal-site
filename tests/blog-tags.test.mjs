import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const out = fileURLToPath(new URL('../dist/', import.meta.url));
const postPages = readdirSync(join(out, 'blog'), { recursive: true })
  .map(name => name.replaceAll('\\', '/'))
  .filter(name => /^[^/]+\/index\.html$/.test(name));
assert.ok(postPages.length > 0, 'Build the site before tag checks.');
const archives = new Map();

for (const page of postPages) {
  const html = readFileSync(join(out, 'blog', page), 'utf8');
  const tags = html.match(/<ul\b[^>]*class="post-tags[^"]*"[^>]*>([\s\S]*?)<\/ul>/)?.[1] ?? '';
  const date = html.match(/<time\b[^>]*datetime="([^"]+)"/)[1];
  for (const [, href] of tags.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    assert.ok(href.startsWith('/tags/'), href);
    if (!archives.has(href)) archives.set(href, []);
    archives.get(href).push({ href: '/blog/' + page.split('/')[0], date });
  }
}

/** Resolve a generated tag archive on disk.
 * @param href Root-relative archive URL.
 */
function archivePath(href) {
  return join(out, href, 'index.html');
}

/** Get article title links, excluding card tags and site navigation.
 * @param html Generated archive or index page.
 */
function articleLinks(html) {
  return [...html.matchAll(/<h2\b[^>]*>\s*<a\b[^>]*href="([^"]+)"/g)].map(([, href]) => href);
}

/** Validate every emitted tag against the complete article-side tag membership. */
test('every sidebar tag resolves to an archive with exactly its matching posts, newest first', () => {
  assert.ok(archives.size > 0);
  for (const [href, posts] of archives) {
    const file = archivePath(href);
    assert.ok(existsSync(file), href);
    const html = readFileSync(file, 'utf8');
    const expected = posts.toSorted((a, b) => b.date.localeCompare(a.date)).map(post => post.href);
    assert.deepEqual(articleLinks(html), expected, href);
    assert.match(html, /href="\/blog"[^>]*>← Back to all posts<\/a>/);
    assert.match(html, /<h1\b[^>]*>Tag: /);
  }
});

/** Independently check a shared tag and single-post tags against known authored content. */
test('homelab includes both matching posts while unique tags exclude unrelated posts', () => {
  const shared = readFileSync(archivePath('/tags/homelab/'), 'utf8');
  assert.deepEqual(articleLinks(shared),
    ['/blog/second-brain-that-stuck', '/blog/it-wasnt-dns']);
  assert.deepEqual(articleLinks(readFileSync(archivePath('/tags/meta/'), 'utf8')),
    ['/blog/hello-world']);
  assert.deepEqual(articleLinks(readFileSync(archivePath('/tags/dns/'), 'utf8')),
    ['/blog/it-wasnt-dns']);
});

/** Check post cards expose real sibling title/tag anchors, never nested anchors. */
test('blog and tag-list cards retain article links and independently usable tag links', () => {
  for (const href of ['/blog/', ...archives.keys()]) {
    const html = readFileSync(archivePath(href), 'utf8');
    let inAnchor = false;
    for (const [token] of html.matchAll(/<\/?a\b[^>]*>/g)) {
      if (token.startsWith('</')) {
        assert.ok(inAnchor, href);
        inAnchor = false;
      } else {
        assert.equal(inAnchor, false, 'Nested anchors in ' + href);
        inAnchor = true;
      }
    }
    assert.equal(inAnchor, false, href);
    const cards = [...html.matchAll(/<article\b[^>]*class="post-card[^"]*"[^>]*>([\s\S]*?)<\/article>/g)];
    assert.ok(cards.length > 0, href);
    for (const [, card] of cards) {
      assert.equal(articleLinks(card).length, 1, href);
      for (const [, tagHref] of card.matchAll(/href="(\/tags\/[^"]+)"/g)) {
        assert.ok(existsSync(archivePath(tagHref)), tagHref);
      }
    }
  }
});

/** Preserve ordinary tag URLs and keep punctuation/escape-like labels distinct. */
test('tag path segments are safe and do not merge different tag labels', () => {
  const source = readFileSync(new URL('../src/utils/tags.ts', import.meta.url), 'utf8');
  const exports = {};
  vm.runInNewContext(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, { exports });
  assert.equal(exports.tagSlug('homelab'), 'homelab');
  const labels = ['a/b', 'a~2Fb', 'layout fixture', 'layout~20fixture',
    'C++', 'Research & experiments', 'café', '.', '..', '*', ''];
  const slugs = labels.map(exports.tagSlug);
  assert.equal(new Set(slugs).size, labels.length);
  for (const slug of slugs) assert.match(slug, /^[a-zA-Z0-9_~!'()-]+$/);
});

/** Keep the blog index a complete, deduplicated entry point to all tag archives. */
test('blog index lists every tag archive once in alphabetical order', () => {
  const html = readFileSync(archivePath('/blog/'), 'utf8');
  const list = html.match(/<ul\b[^>]*class="all-tags[^"]*"[^>]*>([\s\S]*?)<\/ul>/)?.[1];
  assert.ok(list, 'Expected the all-tags navigation panel');
  const links = [...list.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([^<]*)<\/a>/g)];
  assert.deepEqual(links.map(([, href]) => href).sort(), [...archives.keys()].sort());
  const labels = links.map(([, , label]) => label);
  assert.deepEqual(labels, labels.toSorted((a, b) => a.localeCompare(b, 'en')));
  for (const [, href] of links) assert.ok(existsSync(archivePath(href)), href);
  assert.ok(html.indexOf('all-tags-title') < html.indexOf('class="post-card'));
});

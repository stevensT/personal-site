import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = join(root, 'dist');
assert.ok(existsSync(out), 'Run npm run build to generate the pages before output checks.');
const pages = readdirSync(out, { recursive: true }).filter(name => name.endsWith('.html'))
  .map(name => name.replaceAll('\\', '/'));

/** Verify existing URLs and common accessible controls survive future builds. */
test('all existing routes have one main heading and accessible Help controls', () => {
  for (const route of ['index.html', 'about/index.html', 'career/index.html', 'colophon/index.html',
    'blog/index.html', 'blog/hello-world/index.html', 'blog/it-wasnt-dns/index.html',
    'blog/second-brain-that-stuck/index.html']) assert.ok(existsSync(join(out, route)), route);
  for (const page of pages) {
    const html = readFileSync(join(out, page), 'utf8');
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, page);
    assert.match(html, /<dialog\b[^>]*id="shortcut-help"[^>]*aria-labelledby="shortcut-help-title"/, page);
    assert.match(html, /<button\b[^>]*data-help-toggle/, page);
    assert.match(html, /<form\b[^>]*method="dialog"/, page);
    assert.match(html, /id="shortcuts-enabled"/, page);
    assert.match(html, /<script\b[^>]*type="module"/, page);
  }
});

/** Check root-relative routes and assets as emitted, including every current blog post. */
test('generated internal links and image/style/script assets resolve', () => {
  for (const page of pages) {
    const html = readFileSync(join(out, page), 'utf8');
    for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (!url.startsWith('/') || url.startsWith('//')) continue;
      const pathname = decodeURIComponent(url.split(/[?#]/)[0]);
      const target = join(out, pathname);
      const index = join(target, 'index.html');
      const fileExists = existsSync(target) && statSync(target).isFile();
      const indexExists = existsSync(index) && statSync(index).isFile();
      assert.ok(fileExists || indexExists, `${page}: ${url}`);
    }
  }
});

/** Guard the date-only content contract against a timezone regression. */
test('blog dates keep their intended calendar day in generated pages', () => {
  const expected = {
    'hello-world': ['2026-06-11', 'June 11, 2026'],
    'it-wasnt-dns': ['2026-09-20', 'September 20, 2026'],
    'second-brain-that-stuck': ['2026-09-25', 'September 25, 2026'],
  };
  for (const [slug, [date, label]] of Object.entries(expected)) {
    const html = readFileSync(join(out, 'blog', slug, 'index.html'), 'utf8');
    assert.ok(html.includes(`datetime="${date}T00:00:00.000Z"`), slug);
    assert.ok(html.includes(`>${label}</time>`), slug);
  }
});

/** Extract the real palette, so a later color edit must retain readable text.
 * @param block CSS containing the theme's custom properties.
 */
function palette(block) {
  return Object.fromEntries([...block.matchAll(/--color-(\w+):\s*(#[0-9a-f]{6})/gi)]
    .map(([, name, color]) => [name, color]));
}

/** Calculate WCAG relative luminance from a six-digit sRGB color.
 * @param hex Color in #rrggbb format.
 */
function luminance(hex) {
  const channels = hex.slice(1).match(/../g).map(part => parseInt(part, 16) / 255)
    .map(channel => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

/** Check actual text tokens against each surface, not specific replacement hex values. */
test('ordinary text, muted text, and links meet 4.5:1 in both themes', () => {
  const css = readFileSync(join(root, 'src/styles/global.css'), 'utf8');
  const themes = [palette(css.match(/@theme\s*\{([^}]+)\}/)[1]),
    palette(css.match(/html\[data-theme="light"\]\s*\{([^}]+)\}/)[1])];
  for (const theme of themes) {
    for (const text of ['text', 'muted', 'accent']) {
      for (const surface of ['page', 'bg', 'elevated']) {
        const foreground = luminance(theme[text]);
        const background = luminance(theme[surface]);
        const contrast = (Math.max(foreground, background) + 0.05) /
          (Math.min(foreground, background) + 0.05);
        assert.ok(contrast >= 4.5, `${text} on ${surface}: ${contrast.toFixed(2)}:1`);
      }
    }
  }
});

/** Normalize heading markup and the extra quote escaping used by Astro text nodes.
 * @param markup Rendered heading or link label.
 */
function headingText(markup) {
  return markup.replace(/<[^>]*>/g, '').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
}

/** Compare navigation against actual rendered sections, including duplicate heading slugs. */
test('post contents link to h2/h3 sections in order and omit empty lists', () => {
  const postPages = pages.filter(name => /^blog\/[^/]+\/index\.html$/.test(name));
  assert.ok(postPages.length > 0, 'Expected generated blog posts');
  for (const page of postPages) {
    const html = readFileSync(join(out, page), 'utf8');
    const article = html.match(/<article\b[^>]*class="blog-article"[^>]*>([\s\S]*?)<\/article>/)?.[1];
    assert.ok(article, page);
    const headings = [...article.matchAll(/<h([23])\b[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h[23]>/g)];
    const nav = html.match(/<nav\b[^>]*aria-label="Table of contents"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
    if (headings.length === 0) {
      assert.equal(nav, undefined, page);
      assert.ok(!html.includes('post-contents'), page);
      continue;
    }
    assert.ok(nav, page);
    const links = [...nav.matchAll(/<li\b([^>]*)>\s*<a\b[^>]*href="#([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
    assert.equal(links.length, headings.length, page);
    assert.equal(new Set(headings.map(([, , id]) => id)).size, headings.length, page);
    headings.forEach(([, depth, id, label], index) => {
      const [, attributes, target, text] = links[index];
      assert.equal(target, id, page);
      assert.ok(html.includes(`data-post-heading="${id}"`), page);
      assert.equal(headingText(text), headingText(label), page);
      assert.equal(attributes.includes('pl-4'), depth === '3', page);
    });
    assert.match(html, /<details\b[^>]*class="post-contents[^"]*"[^>]*\bopen\b/, page);
  }
});

/** Check authored tags and reserve the wider shell for posts and the blog index. */
test('posts show individual tags; posts and blog index share wide navigation, content, and footer', () => {
  const expectedTags = {
    'hello-world': ['meta', 'learning-in-public'],
    'it-wasnt-dns': ['netbird', 'dns', 'homelab', 'networking', 'split-dns', 'macos'],
    'second-brain-that-stuck': ['second-brain', 'homelab', 'obsidian', 'ai-agents', 'claude'],
  };
  let checkedTags = 0;
  for (const page of pages) {
    const html = readFileSync(join(out, page), 'utf8');
    const isWide = html.includes('class="blog-article"') || page === 'blog/index.html';
    assert.equal((html.match(/max-w-\[1200px\]/g) ?? []).length, isWide ? 3 : 0, page);
    const slug = page.match(/^blog\/([^/]+)\/index\.html$/)?.[1];
    if (!expectedTags[slug]) continue;
    const tags = html.match(/<ul\b[^>]*class="post-tags[^"]*"[^>]*>([\s\S]*?)<\/ul>/)?.[1];
    assert.ok(tags, page);
    checkedTags += 1;
    assert.deepEqual([...tags.matchAll(/<a\b[^>]*>([^<]*)<\/a>/g)].map(([, text]) => text),
      expectedTags[slug], page);
  }
  assert.equal(checkedTags, Object.keys(expectedTags).length);
});

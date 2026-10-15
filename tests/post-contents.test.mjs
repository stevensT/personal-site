import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('../src/scripts/post-contents.ts', import.meta.url), 'utf8');
const code = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

/** Run the production tracker against movable heading geometry.
 * @param options Initial scroll position, heading positions, and article end.
 */
function harness({ scrollY = 0, tops = [100, 600, 2000], end = 6000 } = {}) {
  const events = new Map();
  const documentEvents = new Map();
  const frames = [];
  let fontReady;
  const window = {
    scrollY, innerHeight: 800, location: { hash: '#two' },
    /** Register production window callbacks. @param type Event name. @param callback Listener. */
    addEventListener(type, callback) { events.set(type, callback); },
    /** Queue production work. @param callback Frame callback. */
    requestAnimationFrame(callback) { frames.push(callback); },
  };
  const headings = tops.map((top, index) => ({
    id: String(index), top,
    /** Measure current viewport position, as a real scroll would. */
    getBoundingClientRect() { return { top: this.top - window.scrollY }; },
  }));
  const links = headings.map(heading => ({
    dataset: { postHeading: heading.id }, attributes: new Map(),
    /** Record accessible current state. @param name Attribute. @param value Attribute value. */
    setAttribute(name, value) { this.attributes.set(name, value); },
    /** Clear the old current state. @param name Attribute. */
    removeAttribute(name) { this.attributes.delete(name); },
  }));
  const article = {
    end,
    /** Measure the article boundary independently from the page footer. */
    getBoundingClientRect() { return { bottom: this.end - window.scrollY }; },
  };
  const document = {
    /** Return the real-script article target. */
    querySelector() { return article; },
    /** Return real-script navigation targets. */
    querySelectorAll() { return links; },
    /** Resolve a real-script heading. @param id Heading ID. */
    getElementById(id) { return headings.find(heading => heading.id === id); },
    /** Register layout-shift callbacks. @param type Event name. @param callback Listener. */
    addEventListener(type, callback) { documentEvents.set(type, callback); },
    fonts: { ready: {
      /** Allow the test to trigger fonts becoming ready. @param callback Font-ready callback. */
      then(callback) { fontReady = callback; },
    } },
  };
  vm.runInNewContext(code, {
    document, window, exports: {},
    /** Return the actual CSS landing offset. */
    getComputedStyle() { return { scrollMarginTop: '32px' }; },
  });
  /** Execute a queued frame without copying section-selection logic. */
  function flush() { frames.splice(0).forEach(callback => callback()); }
  /** Move the viewport and dispatch a real listener. @param y Position. @param event Event type. */
  function move(y, event = 'scroll') {
    window.scrollY = y;
    events.get(event)?.();
    flush();
  }
  /** Read the public accessibility state, requiring a single current entry. */
  function current() {
    const active = links.filter(link => link.attributes.get('aria-current') === 'location');
    assert.equal(active.length, links.length ? 1 : 0);
    return active[0]?.dataset.postHeading;
  }
  return { window, article, headings, links, events, documentEvents, frames, flush, move,
    current, fontsReady: () => fontReady?.() };
}

/** Keep the most recent section active even when no heading is visible. */
test('current section follows downward/upward scrolling through long sections', () => {
  const h = harness();
  assert.equal(h.current(), '0');
  for (const [position, expected] of [[400, '0'], [600, '1'], [1800, '1'],
    [2010, '2'], [650, '1'], [100, '0']]) {
    h.move(position);
    assert.equal(h.current(), expected);
  }
  assert.equal(h.window.location.hash, '#two', 'Scrolling must not rewrite the URL');
});

/** Match fractional anchor landing positions and initial deep-link geometry. */
test('fragment jumps and page restoration select their heading immediately', () => {
  const h = harness({ scrollY: 567.5 });
  assert.equal(h.current(), '1');
  h.move(1968, 'hashchange');
  assert.equal(h.current(), '2');
  h.move(0, 'pageshow');
  assert.equal(h.current(), '0');
});

/** Treat the article end as the last section, without waiting for the footer. */
test('article bottom selects the last entry; a short page at the top selects the first', () => {
  const h = harness({ tops: [100, 600, 1300], end: 1500 });
  h.move(700);
  assert.equal(h.current(), '2');
  assert.equal(harness({ tops: [100, 500], end: 700 }).current(), '0');
});

/** Re-evaluate real geometry after resizing and images/fonts changing layout. */
test('resize, image load, and font readiness refresh a coalesced animation frame', () => {
  const h = harness({ scrollY: 600 });
  h.headings[1].top = 900;
  h.events.get('resize')();
  h.documentEvents.get('load')();
  h.fontsReady();
  assert.equal(h.frames.length, 1);
  h.flush();
  assert.equal(h.current(), '0');
  h.events.get('scroll')();
  h.events.get('scroll')();
  assert.equal(h.frames.length, 1);
  h.flush();
  assert.equal(h.current(), '0');
});

/** Leave pages without headings usable and avoid unnecessary listeners. */
test('no contents requires no tracker listeners or current link', () => {
  const h = harness({ tops: [] });
  assert.equal(h.current(), undefined);
  assert.equal(h.events.size, 0);
  assert.equal(h.documentEvents.size, 0);
});

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('../src/scripts/site-controls.ts', import.meta.url), 'utf8');
const code = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const home = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const earlyTheme = home.match(/<script\b[^>]*data-theme-init[^>]*>([\s\S]*?)<\/script>/)?.[1];
assert.ok(earlyTheme, 'Build the site before running output-dependent tests.');

/** Supply just the native element methods used by the real control script.
 * @param extra Element-specific state and native API stubs.
 */
function element(extra = {}) {
  return {
    handlers: new Map(), attributes: new Map(),
    /** Record the actual production listener. @param type Event name. @param handler Listener. */
    addEventListener(type, handler) { this.handlers.set(type, handler); },
    /** Record accessibility state. @param name Attribute name. @param value Attribute value. */
    setAttribute(name, value) { this.attributes.set(name, value); },
    ...extra,
  };
}

/** Execute the actual early script and control source with independently blocked storage.
 * @param options Saved preferences and simulated storage restrictions.
 */
function harness({ saved = {}, readFails = false, writeFails = false } = {}) {
  const store = new Map(Object.entries(saved));
  const html = { dataset: {} };
  const preference = element({ checked: true });
  const note = { hidden: true };
  const themeButtons = [element(), element()];
  const helpButton = element();
  const help = element({
    open: false,
    /** Model modal state only; real focus is verified in the browser. */
    showModal() { this.open = true; },
    /** Model the native close operation. */
    close() { this.open = false; },
    /** Return a panel rectangle for backdrop hit testing. */
    getBoundingClientRect() { return { left: 100, right: 400, top: 100, bottom: 350 }; },
  });
  const document = element({
    documentElement: html,
    /** Look up fixture elements. @param selector Production selector. */
    querySelector(selector) {
      return { '#shortcut-help': help, '#shortcuts-enabled': preference }[selector] ?? null;
    },
    /** Look up all control buttons. @param selector Production selector. */
    querySelectorAll(selector) {
      return selector === '[data-theme-toggle]' ? themeButtons : [helpButton];
    },
    /** Look up the storage notice. @param id Production element id. */
    getElementById(id) { return id === 'shortcut-storage-note' ? note : null; },
  });
  const window = { location: { href: '' } };
  const localStorage = {
    /** Read or reject storage. @param key Preference name. */
    getItem(key) {
      if (readFails) throw new Error('SecurityError: reads blocked');
      return store.get(key) ?? null;
    },
    /** Write or reject storage. @param key Preference name. @param value Saved value. */
    setItem(key, value) {
      if (writeFails) throw new Error('SecurityError: writes blocked');
      store.set(key, value);
    },
  };
  const context = vm.createContext({ document, window, localStorage, exports: {} });
  vm.runInContext(earlyTheme, context);
  vm.runInContext(code, context);
  /** Dispatch a keyboard event to the real listener. @param key Key value. @param extra Event flags. */
  function press(key, extra = {}) {
    const event = {
      key, target: { tagName: 'BODY' }, defaultPrevented: false,
      /** Record whether production code consumes this event. */
      preventDefault() { this.defaultPrevented = true; },
      ...extra,
    };
    document.handlers.get('keydown')(event);
    return event;
  }
  return { html, preference, note, themeButtons, helpButton, help, window, store, press };
}

/** Check saved-theme restoration and accessible toggle state. */
test('saved light theme is restored before controls initialize', () => {
  const h = harness({ saved: { theme: 'light' } });
  assert.equal(h.html.dataset.theme, 'light');
  assert.equal(h.themeButtons[0].attributes.get('aria-pressed'), 'true');
  h.themeButtons[0].handlers.get('click')();
  assert.equal(h.html.dataset.theme, undefined);
  assert.equal(h.store.get('theme'), 'dark');
});

/** Reproduce storage failures on reads, writes, and both, without copying toggle logic. */
test('theme controls work despite independently rejected storage reads and writes', () => {
  for (const options of [{ readFails: true }, { writeFails: true }, { readFails: true, writeFails: true }]) {
    const h = harness(options);
    h.themeButtons[0].handlers.get('click')();
    assert.equal(h.html.dataset.theme, 'light');
    h.themeButtons[1].handlers.get('click')();
    assert.equal(h.html.dataset.theme, undefined);
    assert.equal(h.themeButtons[1].attributes.get('aria-pressed'), 'false');
  }
});

/** Check each public navigation shortcut and case handling. */
test('enabled shortcuts navigate to the intended routes', () => {
  const h = harness();
  for (const [key, route] of Object.entries({ A: '/about', b: '/blog', c: '/career', x: '/colophon' })) {
    assert.equal(h.press(key).defaultPrevented, true);
    assert.equal(h.window.location.href, route);
  }
  assert.equal(h.press('z').defaultPrevented, false);
});

/** Check input and browser/OS boundaries rather than individual implementation branches. */
test('typing, modifier combinations, composition, and held keys do not navigate', () => {
  const cases = ['INPUT', 'TEXTAREA', 'SELECT'].map(tagName => ({ target: { tagName } }));
  cases.push({ target: { tagName: 'DIV', isContentEditable: true } });
  for (const flag of ['ctrlKey', 'metaKey', 'altKey', 'isComposing', 'repeat']) cases.push({ [flag]: true });
  for (const options of cases) {
    const h = harness();
    assert.equal(h.press('b', options).defaultPrevented, false);
    assert.equal(h.window.location.href, '');
  }
});

/** Verify the off switch across reloads and preserve clickable controls. */
test('disabled shortcuts remain disabled after navigation while buttons still work', () => {
  const h = harness({ saved: { shortcuts: 'off' } });
  assert.equal(h.preference.checked, false);
  for (const key of ['a', 'b', 'c', 'x', 'd', 'h']) h.press(key);
  assert.equal(h.window.location.href, '');
  assert.equal(h.html.dataset.theme, undefined);
  assert.equal(h.help.open, false);
  h.helpButton.handlers.get('click')();
  h.themeButtons[1].handlers.get('click')();
  assert.equal(h.help.open, true);
  assert.equal(h.html.dataset.theme, 'light');
  h.preference.checked = true;
  h.preference.handlers.get('change')();
  const nextPage = harness({ saved: Object.fromEntries(h.store) });
  nextPage.press('b');
  assert.equal(nextPage.window.location.href, '/blog');
});

/** Ensure a rejected preference save still applies the user's choice immediately. */
test('the off switch works for this page when preference storage is blocked', () => {
  const h = harness({ readFails: true, writeFails: true });
  h.preference.checked = false;
  h.preference.handlers.get('change')();
  h.press('b');
  assert.equal(h.window.location.href, '');
  assert.equal(h.note.hidden, false);
});

/** Keep background navigation blocked while the displayed theme shortcut still works. */
test('Help blocks navigation, allows theme changes, and ignores held h', () => {
  const h = harness();
  h.press('h');
  h.press('h', { repeat: true });
  h.press('b');
  h.press('d');
  assert.equal(h.help.open, true);
  assert.equal(h.window.location.href, '');
  assert.equal(h.html.dataset.theme, 'light');
  h.press('h');
  assert.equal(h.help.open, false);
});

/** Verify padding and panel-content clicks cannot be mistaken for the backdrop. */
test('only a click outside the Help panel dismisses it', () => {
  const h = harness();
  h.press('h');
  const click = h.help.handlers.get('click');
  click({ target: {}, clientX: 150, clientY: 150 });
  click({ target: h.help, clientX: 150, clientY: 150 });
  assert.equal(h.help.open, true);
  click({ target: h.help, clientX: 50, clientY: 150 });
  assert.equal(h.help.open, false);
});

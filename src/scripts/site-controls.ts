/** Shared theme, Help, and shortcut behavior; imported once by BaseLayout. */
export {};

const routes: Record<string, string> = {
  a: '/about', b: '/blog', c: '/career', x: '/colophon',
};
const html = document.documentElement;
const help = document.querySelector<HTMLDialogElement>('#shortcut-help');
const preference = document.querySelector<HTMLInputElement>('#shortcuts-enabled');
const storageNote = document.getElementById('shortcut-storage-note');
const themeButtons = document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]');
let shortcutsEnabled = true;

try {
  shortcutsEnabled = localStorage.getItem('shortcuts') !== 'off';
} catch {
  if (storageNote) storageNote.hidden = false;
}
if (preference) preference.checked = shortcutsEnabled;

/** Reflect the current light-theme state on both theme buttons. */
function updateThemeButtons(): void {
  for (const button of themeButtons) {
    button.setAttribute('aria-pressed', String(html.dataset.theme === 'light'));
  }
}

/** Switch theme immediately; remembering it is optional when storage is blocked. */
function toggleTheme(): void {
  const next = html.dataset.theme === 'light' ? 'dark' : 'light';
  if (next === 'light') html.dataset.theme = 'light';
  else delete html.dataset.theme;
  updateThemeButtons();
  try {
    localStorage.setItem('theme', next);
  } catch {
    // Storage restrictions must not prevent a visual theme change.
  }
}

/** Open or close Help using the browser's native modal focus handling. */
function toggleHelp(): void {
  if (!help) return;
  if (help.open) help.close();
  else help.showModal();
}

/** Apply the checkbox choice and remember it if the browser permits storage. */
function changeShortcutPreference(): void {
  if (!preference) return;
  shortcutsEnabled = preference.checked;
  try {
    localStorage.setItem('shortcuts', shortcutsEnabled ? 'on' : 'off');
  } catch {
    // shortcut: blocked storage limits this choice to this page; revisit if persistence is required.
    if (storageNote) storageNote.hidden = false;
  }
}

/** Close only for a click outside the panel, not its content or padding.
 * @param event Mouse click on the dialog or its backdrop.
 */
function handleBackdropClick(event: MouseEvent): void {
  if (!help || event.target !== help) return;
  const rect = help.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom) help.close();
}

/** Run enabled shortcuts without interrupting typing, composition, or OS commands.
 * @param event Keyboard event from the current page.
 */
function handleKeydown(event: KeyboardEvent): void {
  if (!shortcutsEnabled || event.metaKey || event.ctrlKey || event.altKey ||
      event.repeat || event.isComposing) return;
  const target = event.target as HTMLElement | null;
  if (target && (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) ||
      target.isContentEditable)) return;

  const key = event.key.toLowerCase();
  // Modal controls remain available; navigation behind Help does not.
  if (help?.open && routes[key]) return;
  if (key === 'd') {
    event.preventDefault();
    toggleTheme();
  } else if (key === 'h') {
    event.preventDefault();
    toggleHelp();
  } else if (routes[key]) {
    event.preventDefault();
    window.location.href = routes[key];
  }
}

updateThemeButtons();
for (const button of themeButtons) button.addEventListener('click', toggleTheme);
for (const button of document.querySelectorAll<HTMLButtonElement>('[data-help-toggle]')) {
  button.addEventListener('click', toggleHelp);
}
preference?.addEventListener('change', changeShortcutPreference);
help?.addEventListener('click', handleBackdropClick);
document.addEventListener('keydown', handleKeydown);

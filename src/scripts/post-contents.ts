/** Track the current article section without changing navigation or keyboard focus. */
export {};

const article = document.querySelector<HTMLElement>('.blog-article');
const entries = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-post-heading]'))
  .flatMap((link) => {
    const heading = document.getElementById(link.dataset.postHeading ?? '');
    return heading ? [{ link, heading }] : [];
  });

if (article && entries.length > 0) {
  let activeLink: HTMLAnchorElement | undefined;
  let framePending = false;

  /** Select the last heading past the anchor landing line, including long sections. */
  function updateCurrentSection(): void {
    // Match CSS scroll-margin-top and allow fractional-pixel anchor positions.
    const readingLine = Number.parseFloat(getComputedStyle(entries[0].heading).scrollMarginTop) + 1;
    let current = entries[0];
    for (const entry of entries) {
      if (entry.heading.getBoundingClientRect().top <= readingLine) current = entry;
    }
    if (window.scrollY > 0 && article!.getBoundingClientRect().bottom <= window.innerHeight + 1) {
      current = entries[entries.length - 1];
    }
    if (activeLink === current.link) return;
    activeLink?.removeAttribute('aria-current');
    current.link.setAttribute('aria-current', 'location');
    activeLink = current.link;
  }

  /** Coalesce scroll and layout events so geometry is read at most once per frame. */
  function scheduleUpdate(): void {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(() => {
      framePending = false;
      updateCurrentSection();
    });
  }

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  window.addEventListener('pageshow', scheduleUpdate);
  // Capturing image loads and font readiness covers layout shifts without scrolling.
  document.addEventListener('load', scheduleUpdate, true);
  void document.fonts.ready.then(scheduleUpdate);
  updateCurrentSection();
}

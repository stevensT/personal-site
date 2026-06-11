# Trevor's Personal Site — Build Spec

## The Idea

A terminal prompt aesthetic. Dark background, monospace font, minimal UI chrome, keyboard shortcuts for navigation, and a single pithy quote that tells you who the person is in one sentence. It signals "I build things at a systems level" without saying it explicitly. The constraint *is* the personality.

land in networking/home lab territory

---

## Brand Identity

**Tagline:** One line that captures you.

> *"Combat rescue flight engineer turned network builder, currently rebuilding his digital life from the ground up."*

Or something like:
> *"A rescue airman, technologist, and problem-solver—equally at home in a cockpit, a server rack, or building the next big thing for his hometown."*

Pick one. Don't hedge. It should make someone who knows you laugh.

**Quote:**
Something from my world. Options to riff on:
> *"The best network is the one no one's thinking about."*
> *"Managing the wires for your wireless network"*
> *"Mission first. Systems second. People always."*
> *"Flying rescue helicopters by day, building networks and systems by night."*

---

## Site Structure

| Section | What Goes There |
|---|---|
| **Home** | Name, prompt-style tagline, quote, nav links |
| **About** | Who you are — flight engineer, network engineer, Arizonan, dad, tinkerer, homelab |
| **Career** | AF service, CSAR, network engineering work |
| **Blog** | Notes, posts, home lab write-ups |
| **Colophon** | How the site is built, what tools you use |

---

## Visual Design Spec

**Aesthetic:** Terminal. Not "dark mode corporate," actually terminal.

**Colors:**
- Background: `#0d1117` (GitHub dark — slightly warmer than pure black)
- Text: `#c9d1d9` (off-white, readable but not harsh)
- Accent/prompt: `#1cb03a` 
- Muted/secondary: `#8b949e`
- Cursor blink: `#1cb03a` animated

**Typography:**
- Everything: `JetBrains Mono` or `Berkeley Mono` — one font, monospace or `Space Grotesk` handles headings, `Newsreader` sets the body text on inner pages, and `Space Mono` appears in code snippets. I'd lile so see what both look like and compair
- No serifs, no display fonts — that's the aesthetic

**Layout:**
- Single column, centered, max-width `700px`
- Prompt prefix: `stanferd@csar:~$` before my name/sections
- Keyboard shortcuts displayed inline: `[a] about    [b] blog   [c] career`
- Dark/light toggle with `[d]` keybind

**Signature element:** A blinking cursor after my tagline. Simple, on-brand, unmistakable.

---

## Pages in Detail

### `index.html` — Home
```
stanferd@csar:~$ whoami

Trevor Stevens
────────────────────────
Combat Rescue. Network Engineer. Dev Ops.
> Rescue by day, building networks and systems by night.

> "The best network is the one no one thinks about."

📍 Arizona

[a] about    [b] blog     [c] career   [x] colophon
[d] toggle dark/light      [h] help
```

### `about.md`
Two paragraphs max. Who you are as a human, not a resume. Work. Home lab. What you actually care about.

### `career.md`
Bullet list. HH-60W, CSAR, years of service, network engineering roles. No flowery descriptions.

### `blog/`
Individual markdown posts. Start with one or two home lab write-ups — the NetBird migration is already a good post.

### `colophon.md`
Built with Astro. Hosted on Cloudflare Pages. Written in VS Code. Talk about design choices.

---

## Keyboard Nav Implementation

This is the fun part. Pure vanilla JS, ~20 lines:

```javascript
document.addEventListener('keydown', (e) => {
  const shortcuts = {
    'a': '/about',
    'c': '/career',
    'w': '/writing',
    'x': '/colophon',
    'd': toggleTheme,
    'h': showHelp,
  };
  if (shortcuts[e.key]) {
    typeof shortcuts[e.key] === 'string'
      ? window.location.href = shortcuts[e.key]
      : shortcuts[e.key]();
  }
});
```
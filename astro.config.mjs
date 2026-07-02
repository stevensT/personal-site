// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // The canonical production URL. Astro uses this to build absolute URLs for
  // canonical <link> tags and Open Graph / social-preview meta. Update this if
  // the domain ever changes.
  site: 'https://stanferd.dev',
  vite: {
    plugins: [tailwindcss()]
  }
});
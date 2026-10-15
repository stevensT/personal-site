/**
 * Encode a tag as one static path segment without changing its displayed name.
 * @param tag Original tag label from frontmatter.
 */
export function tagSlug(tag: string): string {
  // ~XX avoids Astro decoding reserved percent escapes differently during builds.
  return encodeURIComponent(tag).replaceAll('~', '%7E').replaceAll('.', '%2E')
    .replaceAll('*', '%2A').replaceAll('%', '~') || '~';
}

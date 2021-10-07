export function isTrivialHref(href?: string) {
  return !href || href.trim() === '#'
}

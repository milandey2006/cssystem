// A handful of Sanity product slugs contain raw spaces, commas, or mixed
// case (data entry mistakes - one slug literally has the entire meta
// keyword list pasted into it instead of a clean slug). Path segments with
// those characters aren't reliably routed by the hosting platform, which
// is what was causing 404s. This normalizes any string into a safe,
// canonical URL segment so links/sitemap/canonical tags are always valid,
// independent of what's actually stored in Sanity.
export function normalizeSlug(value) {
  if (!value) return "";
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

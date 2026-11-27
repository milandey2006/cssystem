// CCTV brands we don't promote on the site (Chinese manufacturers and their
// rebadged lines). Content from the Sanity CMS is filtered through this, so
// these names never show even if an old CMS entry still mentions them.
const BLOCKED_BRAND_RE = /\b(hikvision|dahua|uniview|cp ?plus|prama|milesight|reolink|ezviz|imou|tiandy)\b/i;

const asText = (v) => (typeof v === "string" ? v : v == null ? "" : JSON.stringify(v));

export const mentionsBlockedBrand = (...values) => values.some((v) => BLOCKED_BRAND_RE.test(asText(v)));

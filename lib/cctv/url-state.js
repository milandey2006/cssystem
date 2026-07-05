const PARAM_KEY = "cctv";

export function encodeStateToParam(state) {
  return JSON.stringify(state);
}

export function decodeStateFromParam(value) {
  try {
    const parsed = JSON.parse(value);
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.groups)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function readStateFromUrl() {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const raw = params.get(PARAM_KEY);
  if (!raw) return null;
  return decodeStateFromParam(raw);
}

export function writeStateToUrl(state) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  params.set(PARAM_KEY, encodeStateToParam(state));
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, "", newUrl);
}

export function buildShareUrl(state) {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams();
  params.set(PARAM_KEY, encodeStateToParam(state));
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

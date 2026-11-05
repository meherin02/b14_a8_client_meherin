// Only allow a destination within this website, never a different origin.
export function safeReturnPath(value, fallback = "/profile") {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    [...value].some((character) => character.codePointAt(0) <= 32)
  )
    return fallback;
  try {
    const url = new URL(value, "https://community.invalid");
    if (
      url.origin !== "https://community.invalid" ||
      /^\/(login|register)\/?$/i.test(url.pathname)
    )
      return fallback;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}

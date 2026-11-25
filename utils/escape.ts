// Escape user-supplied text before it is interpolated into the SVG/HTML
// card markup. Without this, characters like &, <, > or quotes in a name
// or description break the SVG (or worse, inject markup into it).
export const escapeXml = (value: unknown): string =>
    String(value ?? "")
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g, "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;")

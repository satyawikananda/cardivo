import { ParsedRequest } from "../typings/types"

// The 15 patterns supported by utils/bg-hero (hero-patterns).
export const PATTERNS = [
    "plus", "topography", "texture", "hideout", "fallingTriangles",
    "iLikeFood", "fourPointStars", "brickWall", "wiggle", "bubbles",
    "floatingCogs", "leaf", "rain", "polkaDots", "ticTacToe"
]

export interface CardCssParams {
    backgroundColor: string
    gradientColor: string
    gradientAngle: number
    pattern?: string
    opacity: string
    colorPattern: string
    fontColor: string
}

export interface CardParams {
    card: ParsedRequest
    css: CardCssParams
    imageUrl: string
}

const first = (v: any): string => {
    const s = Array.isArray(v) ? v[0] : v
    return s == null ? "" : String(s)
}

const text = (v: any, def = "", max = 300): string => {
    const s = first(v)
    return (s === "" ? def : s).slice(0, max)
}

// Accept #rgb / #rrggbb (with or without '#'); anything else -> fallback.
const color = (v: any, def: string): string => {
    let s = first(v).trim()
    if (!s) return def
    if (!s.startsWith("#")) s = `#${s}`
    return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(s) ? s : def
}

const optionalColor = (v: any): string => {
    const s = first(v).trim()
    return s ? color(v, "") : ""
}

const clampNumber = (v: any, min: number, max: number, def: number): number => {
    const raw = first(v).trim()
    if (!raw) return def
    const n = Number(raw)
    return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : def
}

// Parse and validate the raw query parameters once, so every platform
// handler (Vercel / Netlify / Cloudflare) behaves identically and bad
// input degrades to safe defaults instead of a broken card.
export const parseCardParams = (q: Record<string, any>): CardParams => {
    const patternRaw = first(q.pattern)
    const normalizedPattern = patternRaw === "polkadots" ? "polkaDots" : patternRaw
    const pattern = PATTERNS.includes(normalizedPattern) ? normalizedPattern : undefined
    const opacityNum = clampNumber(q.opacity, 0, 1, 0.4)

    const css: CardCssParams = {
        backgroundColor: color(q.backgroundColor, "#ecf0f1"),
        gradientColor: optionalColor(q.gradientColor),
        gradientAngle: clampNumber(q.gradientAngle, 0, 360, 135),
        pattern,
        opacity: String(opacityNum),
        colorPattern: color(q.colorPattern, "#eaeaea"),
        fontColor: color(q.fontColor, "#000000")
    }

    const align = first(q.align) === "left" ? "left" : "center"
    const avatarShapeRaw = first(q.avatarShape)
    const avatarShape = ["circle", "rounded", "square"].includes(avatarShapeRaw) ? avatarShapeRaw : "circle"

    const card: ParsedRequest = {
        name: text(q.name, "Your Name", 80),
        description: text(q.description, "", 220),
        _image: "", // filled by the handler via resolveImage()
        backgroundColor: css.backgroundColor,
        iconColor: color(q.iconColor, "#000000"),
        _site: text(q.site, "", 120),
        fontColor: css.fontColor,
        pattern,
        opacity: css.opacity,
        colorPattern: css.colorPattern,
        _instagram: text(q.instagram, "", 60),
        _linkedin: text(q.linkedin, "", 60),
        _github: text(q.github, "", 60),
        _twitter: text(q.twitter, "", 60),
        __disableAnimation: first(q.disableAnimation) === "true" ? "true" : "false",
        gradientColor: css.gradientColor,
        gradientAngle: css.gradientAngle,
        align,
        avatarShape,
        width: clampNumber(q.width, 200, 2400, 980)
    }

    return { card, css, imageUrl: text(q.image, "", 1000) }
}

// Cards are generated from public URL parameters, so they can be cached
// hard at the CDN/browser instead of regenerated on every view.
export const CARD_CACHE_CONTROL = "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"

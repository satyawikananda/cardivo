import { arrayBufferToBase64 } from "./base64"
import toBase64ImageUrl from "./toBase64"

// Generated fallback avatar: a colored circle with the person's initials.
// Used when no image URL is given or the image cannot be fetched, so the
// card always renders instead of erroring or showing a broken image.
const PALETTE = ["#e63946", "#457b9d", "#2a9d8f", "#e9c46a", "#8338ec", "#fb5607", "#3a86ff", "#606c38"]

export const initialsAvatar = (name: string): string => {
    const words = String(name || "?").trim().split(/\s+/).filter(Boolean)
    const initials = ((words[0]?.[0] ?? "?") + (words[1]?.[0] ?? "")).toUpperCase()
    let hash = 0
    for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0
    const bg = PALETTE[hash % PALETTE.length]
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="${bg}"/><text x="50%" y="50%" dy=".36em" text-anchor="middle" font-family="Arial, sans-serif" font-size="120" font-weight="bold" fill="#ffffff">${initials}</text></svg>`
    return `data:image/svg+xml;base64,${arrayBufferToBase64(new TextEncoder().encode(svg).buffer)}`
}

// Resolve the card image: fetch and inline the remote image when possible,
// otherwise fall back to the generated initials avatar.
export const resolveImage = async (imageUrl: string, name: string): Promise<string> => {
    if (!imageUrl) return initialsAvatar(name)
    try {
        return await toBase64ImageUrl(imageUrl)
    } catch {
        return initialsAvatar(name)
    }
}

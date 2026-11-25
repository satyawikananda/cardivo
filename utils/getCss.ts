import { readFileSync, existsSync } from "fs"
import { join } from "path"
import { makeCss } from "./getCssCore"

// Resolve a font file from a few candidate locations: the original
// utils/../fonts layout (Vercel / local), a bundled function's layout
// (Netlify esbuild output), and the repo root (process.cwd()).
const loadFontBase64 = (fileName: string): string => {
    const candidates = [
        join(__dirname, "..", "fonts", fileName),
        join(__dirname, "..", "..", "fonts", fileName),
        join(process.cwd(), "fonts", fileName)
    ]
    for (const candidate of candidates) {
        if (existsSync(candidate)) {
            return readFileSync(candidate).toString("base64")
        }
    }
    throw new Error(`Font file not found: ${fileName}`)
}

export const css = makeCss(
    loadFontBase64("montserrat-v15-latin-regular.woff2"),
    loadFontBase64("montserrat-v15-latin-700.woff2")
)

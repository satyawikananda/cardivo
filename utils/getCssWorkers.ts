import { makeCss } from "./getCssCore"
import { arrayBufferToBase64 } from "./base64"
// @ts-ignore - .woff2 files are imported as ArrayBuffer via wrangler Data rules (see wrangler.toml and typings/fonts.d.ts)
import montserrat700Data from "../fonts/montserrat-v15-latin-700.woff2"
// @ts-ignore - .woff2 files are imported as ArrayBuffer via wrangler Data rules (see wrangler.toml and typings/fonts.d.ts)
import montserratRegularData from "../fonts/montserrat-v15-latin-regular.woff2"

// Workers has no filesystem, so the fonts are bundled by wrangler and
// inlined here as base64, exactly like the Node version does from disk.
export const css = makeCss(
    arrayBufferToBase64(montserratRegularData),
    arrayBufferToBase64(montserrat700Data)
)

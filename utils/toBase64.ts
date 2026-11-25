import { arrayBufferToBase64 } from './base64';

// Universal version for Vercel, Netlify and Cloudflare Workers:
// native fetch where available (Node 18+, Workers), falling back to
// isomorphic-unfetch on older Node runtimes; base64 via btoa chunks
// (utils/base64) instead of Node's Buffer, which Workers does not have.
export default async function toBase64ImageUrl(imgUrl: any): Promise<string> {
  const fetchFn: any = (globalThis as any).fetch
    ? (globalThis as any).fetch.bind(globalThis)
    : (await import('isomorphic-unfetch')).default
  const fetchImageUrl = await fetchFn(imgUrl)
  const responseArrBuffer = await fetchImageUrl.arrayBuffer()
  const toBase64 =
    `data:${ fetchImageUrl.headers.get('Content-Type') || 'image/png' };base64,${arrayBufferToBase64(responseArrBuffer)}`
  return toBase64
}

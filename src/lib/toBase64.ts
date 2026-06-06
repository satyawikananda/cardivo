import { Buffer } from 'node:buffer'
import { fetcher } from './fetcher'

/**
 * Fetch an image URL and return it as a `data:image/...;base64,...` string so it
 * can be inlined into the SVG. We need the inline form because external
 * `<image href>` references don't render in many GitHub README contexts.
 */
export async function toBase64ImageUrl(imgUrl: string): Promise<string> {
  const response = await fetcher.raw(imgUrl, { responseType: 'arrayBuffer' })
  const contentType = response.headers.get('content-type') ?? 'image/png'
  const arrayBuffer = response._data as ArrayBuffer
  const base64 = Buffer.from(arrayBuffer).toString('base64')
  return `data:${contentType};base64,${base64}`
}

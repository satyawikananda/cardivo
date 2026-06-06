import { describe, expect, it } from 'bun:test'
import { createApp } from '../src/app'

function makeRequest(url: string): Request {
  return new Request(url, { method: 'GET' })
}

describe('createApp()', () => {
  const app = createApp()

  it('returns 404 JSON for unknown routes', async () => {
    const res = await app(makeRequest('http://localhost/nope'))
    expect(res.status).toBe(404)
    const body = await res.json() as { ok: boolean, error: { code: string } }
    expect(body.ok).toBe(false)
    expect(body.error.code).toBe('NOT_FOUND')
  })

  it('validates required query params for /api/card', async () => {
    const res = await app(makeRequest('http://localhost/api/card?name=foo'))
    expect(res.status).toBe(400)
    const body = await res.json() as { ok: boolean, error: { code: string } }
    expect(body.ok).toBe(false)
    expect(body.error.code).toBe('MISSING_PARAMS')
  })

  it('renders an SVG card for a valid request (with a tiny inline data: avatar)', async () => {
    // 1x1 transparent PNG, base64
    const tinyPng = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
    const url = `http://localhost/api/card?name=Hello&description=World&image=data:image/png;base64,${tinyPng}`
    const res = await app(makeRequest(url))
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toContain('image/svg+xml')
    const svg = await res.text()
    expect(svg).toContain('<svg')
    expect(svg).toContain('Hello')
  })
})

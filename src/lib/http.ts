export interface ApiSuccess<T> { ok: true, data: T }
export interface ApiError { ok: false, error: { message: string, code?: string, details?: unknown } }
export type ApiResponse<T> = ApiSuccess<T> | ApiError

export function json<T>(data: T, init?: ResponseInit): Response {
  return new Response(JSON.stringify({ ok: true, data } satisfies ApiSuccess<T>), {
    ...init,
    headers: { 'content-type': 'application/json; charset=utf-8', ...(init?.headers ?? {}) },
  })
}

export function fail(status: number, message: string, code?: string, details?: unknown): Response {
  const body: ApiError = { ok: false, error: { message, code, details } }
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  })
}

export class HttpError extends Error {
  public readonly status: number
  public readonly code?: string
  public readonly details?: unknown
  constructor(status: number, message: string, code?: string, details?: unknown) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.code = code
    this.details = details
  }
}

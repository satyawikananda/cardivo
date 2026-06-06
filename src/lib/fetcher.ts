import type { $Fetch } from 'ofetch'
import { ofetch } from 'ofetch'
import { logger } from './logger'

/**
 * Thin ofetch wrapper used to fetch the user avatar (or any external asset)
 * before base64-encoding it into the SVG. We use ofetch instead of the global
 * `fetch` so we get hooks for structured logging and a single place to tune
 * timeouts / retries.
 */
export const fetcher: $Fetch = ofetch.create({
  timeout: 10_000,
  retry: 0,
  onRequest({ request, options }) {
    (options as { _startedAt?: number })._startedAt = Date.now()
    logger.debug('http request', { method: options.method ?? 'GET', url: request })
  },
  onResponse({ request, options, response }) {
    const started = (options as { _startedAt?: number })._startedAt ?? Date.now()
    logger.debug('http response', {
      method: options.method ?? 'GET',
      url: request,
      status: response.status,
      durationMs: Date.now() - started,
    })
  },
  onResponseError({ request, options, error }) {
    const started = (options as { _startedAt?: number })._startedAt ?? Date.now()
    logger.warn('http error', {
      method: options.method ?? 'GET',
      url: request,
      message: error?.message ?? 'unknown error',
      durationMs: Date.now() - started,
    })
  },
})

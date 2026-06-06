import type { Middleware } from '../app'
import { logger } from '../lib/logger'

export const requestLogger: Middleware = async (request, next) => {
  const started = Date.now()
  const response = await next(request)
  logger.info('request', {
    method: request.method,
    url: request.url,
    status: response.status,
    durationMs: Date.now() - started,
  })
  return response
}

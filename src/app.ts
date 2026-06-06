import { errorHandler } from './middleware/error-handler'
import { requestLogger } from './middleware/logger'
import { routes } from './routes'

export type Handler = (request: Request) => Response | Promise<Response>

/**
 * A middleware is a `(request, next) => Response` — exactly like Koa/Express
 * minus the framework. It wraps a downstream handler so it can:
 *  - run code before the handler runs (e.g. access logging)
 *  - run code after the handler runs (e.g. response timing)
 *  - decide NOT to call `next` and short-circuit with its own Response
 *  - catch errors thrown by `next` and convert them to a Response
 */
export type Middleware = (request: Request, next: Handler) => Response | Promise<Response>

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS'
export type Route = [Method, string, Handler]
export type Routes = Route[]

export function createApp() {
  const stack: Middleware[] = [errorHandler, requestLogger]

  const dispatch: Handler = async (request) => {
    const url = new URL(request.url)
    const match = routes.find(([method, path]) => method === request.method && path === url.pathname)
    if (!match) {
      return new Response(
        JSON.stringify({ ok: false, error: { message: `Route not found: ${request.method} ${url.pathname}`, code: 'NOT_FOUND' } }),
        { status: 404, headers: { 'content-type': 'application/json; charset=utf-8' } },
      )
    }
    const [, , handler] = match
    return handler(request)
  }

  const composed: Handler = stack.reduceRight<Handler>(
    (next, mw) => request => mw(request, next),
    dispatch,
  )

  return async function app(request: Request): Promise<Response> {
    return (composed as Middleware)(request, dispatch)
  }
}

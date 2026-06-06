import { createApp } from '../src/app'

/**
 * Vercel serverless entry — exposes the Cardivo app as a Web Standard
 * `Request → Response` handler. Vercel invokes the default export for any
 * matching route; we delegate to the framework-free middleware chain.
 */
const app = createApp()

export default async function handler(request: Request): Promise<Response> {
  return app(request)
}

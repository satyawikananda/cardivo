/**
 * Smoke-test the Vercel handler as a Web Standard `(Request) => Response`
 * function, just like Vercel will invoke it. This catches:
 *   - module-load errors
 *   - handler export shape (must be `(Request) => Response | Promise<Response>`)
 *   - end-to-end SVG generation with a real GitHub avatar fetch
 *
 * Run with: `bun run scripts/smoke.ts`
 */
import handler from '../api/index'

const url = new URL('https://cardivo.local/api/card')
url.search = new URLSearchParams({
  name: 'Satya Wikananda',
  description: "Hi, i'm a front end web developer and i'm 20 y.o. Nice to meet you 👋",
  image: 'https://avatars.githubusercontent.com/u/33148052?v=4',
  backgroundColor: '#ecf0f1',
  instagram: 'satyawikananda',
  linkedin: 'I Gusti Ngurah Satya  Wikananda',
  github: 'satyawikananda',
  twitter: 'satya_wikananda',
  pattern: 'leaf',
  colorPattern: '#eaeaea',
}).toString()

const res = await handler(new Request(url.toString()))
const body = await res.text()

const checks: Array<[string, boolean]> = [
  ['status 200', res.status === 200],
  ['svg content-type', (res.headers.get('content-type') ?? '').includes('image/svg+xml')],
  ['has <svg>', body.includes('<svg')],
  ['name in output', body.includes('Satya Wikananda')],
  ['desc in output', body.includes('web developer')],
  ['instagram', body.includes('satyawikananda')],
  ['linkedin', body.includes('I Gusti Ngurah')],
  ['github user', body.includes('satyawikananda') && body.includes('M12 0c-6.626')],
  ['twitter user', body.includes('satya_wikananda') && body.includes('M24 4.557')],
  ['leaf pattern bg-image', body.includes('background-image:')],
  ['animation class on h1', body.includes('animate-transition')],
  ['no XSS', !body.includes('<script>')],
]

let pass = 0
for (const [label, ok] of checks) {
  console.log(`${ok ? '✅' : '❌'} ${label}`)
  if (ok) pass++
}
console.log(`\n${pass}/${checks.length} checks passed`)
console.log(`Output: ${body.length} bytes`)

if (pass !== checks.length) process.exit(1)

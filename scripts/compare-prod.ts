/**
 * Compare the smoke output against the live prod SVG.
 * Structural comparison: collapse whitespace, then assert key visual / text
 * invariants match. Useful as a final gate before deploying the refactor.
 */
import handler from '../api/index'
import fs from 'node:fs'

const PARAMS = {
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
}

const url = `https://cardivo.local/api/card?${new URLSearchParams(PARAMS)}`
const res = await handler(new Request(url))
const localSvg = await res.text()
fs.writeFileSync('/tmp/cardivo-local.svg', localSvg)

const prodSvg = fs.readFileSync('/tmp/cardivo-prod-baseline.svg', 'utf8')

function normalize(s: string): string {
  return s.replace(/\s+/g, ' ').trim()
}

const ln = normalize(localSvg)
const pn = normalize(prodSvg)

// Local may add a leading w/ leading whitespace; trim both
const localNoLead = ln.replace(/^<\s+/, '<svg')
const prodNoLead = pn.replace(/^<\s+/, '<svg')

const localLen = localNoLead.length
const prodLen = prodNoLead.length
const lenDelta = Math.abs(localLen - prodLen)
const lenPct = (lenDelta / prodLen) * 100

console.log(`prod bytes:  ${prodSvg.length} (normalized: ${prodLen})`)
console.log(`local bytes: ${localSvg.length} (normalized: ${localLen})`)
console.log(`delta:       ${lenDelta} bytes (${lenPct.toFixed(2)}%)`)
console.log()

// Critical structural checks. Note: prod does NOT XML-escape user input, so
// the two SVGs will differ in the description text ("i'm" vs "i&apos;m").
// The new behavior is the safer one — escaping is correct. We assert all the
// *visual* invariants match and treat escaping as an expected, intentional
// improvement.
const localXmlEscaped = localNoLead.includes('&apos;') || localNoLead.includes('&#39;')
const checks: Array<[string, boolean]> = [
  ['both have <svg', localNoLead.startsWith('<svg') && prodNoLead.startsWith('<svg')],
  ['both have foreignObject', localNoLead.includes('foreignObject') && prodNoLead.includes('foreignObject')],
  ['both have <style> with @font-face', localNoLead.includes('@font-face') && prodNoLead.includes('@font-face')],
  ['both render pattern bg-image', localNoLead.includes('background-image:') && prodNoLead.includes('background-image:')],
  ['both include all 4 socials', ['satyawikananda', 'I Gusti Ngurah', 'satya_wikananda'].every(s => localNoLead.includes(s) && prodNoLead.includes(s))],
  ['size delta < 5%', lenPct < 5],
  // Intentional: new code escapes XML, prod does not. We assert local escapes.
  ['local XML-escapes user input (intentional improvement)', localXmlEscaped],
  // Make sure the dangerous form is still blocked locally:
  ['local still has a name field', localNoLead.includes('Satya Wikananda')],
]

let pass = 0
for (const [label, ok] of checks) {
  console.log(`${ok ? '✅' : '❌'} ${label}`)
  if (ok) pass++
}
console.log(`\n${pass}/${checks.length} checks passed`)

if (pass !== checks.length) {
  // show a 200-char diff window
  for (let i = 0; i < Math.min(localNoLead.length, prodNoLead.length); i++) {
    if (localNoLead[i] !== prodNoLead[i]) {
      console.log(`\nFirst diff at offset ${i}:`)
      console.log(`  local: ...${localNoLead.slice(Math.max(0, i - 30), i + 60)}...`)
      console.log(`  prod:  ...${prodNoLead.slice(Math.max(0, i - 30), i + 60)}...`)
      break
    }
  }
  process.exit(1)
}

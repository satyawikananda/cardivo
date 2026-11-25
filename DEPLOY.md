# Deploy Cardivo — one branch (`main`), three hosts

This repo deploys from the **same `main` branch** to Vercel, Netlify and
Cloudflare Workers. The card code is shared; only the entry point and the
font loading differ per platform:

| Host | Entry point | Config | Font loading |
| --- | --- | --- | --- |
| Vercel | `api/index.ts` | `vercel.json` | `utils/getCss.ts` (Node `fs`) |
| Netlify | `netlify/functions/api.ts` | `netlify.toml` | `utils/getCss.ts` (Node `fs`) |
| Cloudflare Workers | `src/index.ts` | `wrangler.toml` | `utils/getCssWorkers.ts` (wrangler imports) |

Shared pieces: `utils/card.ts` (SVG template, takes the CSS as a parameter),
`utils/getCssCore.ts` (CSS builder), `utils/toBase64.ts` (universal
fetch + base64, no Node-only APIs), `utils/base64.ts`, `utils/bg-hero.ts`.

On every host the public API shape is identical:

- `GET /` → the Cardivo Studio frontend (live card builder)
- `GET /api?name=...&description=...&image=...` → the SVG name card

## Vercel

Import the repo in Vercel, production branch `main`, no build settings
needed. (This is the original upstream setup.)

## Netlify

Import the repo in Netlify, production branch `main`. Settings come from
`netlify.toml` (publish `public`, functions `netlify/functions`, `/api`
rewrite). No build command needed. See `DEPLOY-NETLIFY.md`.

## Cloudflare Workers

Either connect the repo in the Cloudflare dashboard (production branch
`main`, deploy command `npx wrangler deploy`), or locally:

```sh
npm install
npx wrangler login
npx wrangler deploy
```

See `DEPLOY-CLOUDFLARE.md`.

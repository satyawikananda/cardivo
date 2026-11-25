# Deploy Cardivo on Cloudflare Workers

This branch ports Cardivo's single Vercel function (`api/index.ts`) to a
Cloudflare Worker. The Vercel files are left in place but are not used by
the Worker.

## What changed

- `src/index.ts` — Workers `fetch` entry point: `/` redirects to the GitHub
  repo (same as `vercel.json`), `/api?...` returns the SVG card with the
  same query params as Vercel.
- `wrangler.toml` — Worker config; its Data rules import the Montserrat
  `.woff2` fonts as `ArrayBuffer`.
- `utils/getCss.ts` — fonts come from those wrangler imports and are
  inlined as base64 (Workers has no `readFileSync` / filesystem).
- `utils/toBase64.ts` + `utils/base64.ts` — avatar image is fetched with
  native `fetch` and converted with `btoa` chunks (no Node `Buffer`,
  no `isomorphic-unfetch`).
- `typings/fonts.d.ts` — type declaration for `*.woff2` imports.

## Deploy (free)

```sh
npm install
npx wrangler login
npx wrangler deploy
```

Or in the Cloudflare dashboard: Workers & Pages → Create → connect this
fork, pick the `main` branch, framework preset "None", deploy
command `npx wrangler deploy`.

Your card URL is then:

`https://cardivo.<your-subdomain>.workers.dev/api?name=[name]&description=[description]&image=[image_url]`

Workers free plan: 100,000 requests/day.

## Local test

```sh
npx wrangler dev
# then open http://localhost:8787/api?name=Test&description=Hello&image=https://avatars.githubusercontent.com/u/33148052?v=4
```

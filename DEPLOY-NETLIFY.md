# Deploy Cardivo on Netlify

This branch ports Cardivo's single Vercel function (`api/index.ts`) to a
Netlify Function. The Vercel files (`api/`, `vercel.json`) are unchanged, so
this branch can still be deployed to Vercel too.

## What changed

- `netlify/functions/api.ts` — the same card logic, using Netlify's handler
  signature (`event.queryStringParameters`, returning
  `{ statusCode, headers, body }`) instead of Vercel's `req`/`res`.
- `netlify.toml` — functions directory, esbuild bundler, `fonts/**` bundled
  with the function, and a rewrite so `/api` serves the function (same URL
  shape as Vercel).
- `public/index.html` — Netlify publish directory; `/` redirects to the
  GitHub repo, matching `vercel.json` on the main branch.
- `utils/getCss.ts` — font loading now tries a few candidate paths, because
  a bundled function's `__dirname` is not the `utils/` folder. No behaviour
  change on Vercel.

## Deploy (free)

1. Push the `main` branch to your fork.
2. Netlify → Add new site → Import an existing project → pick the fork.
3. Branch to deploy: `main`. Build settings are read from `netlify.toml`
   (publish `public`, functions `netlify/functions`) — no build command needed.
4. Deploy. Your card URL is then:

   `https://<your-site>.netlify.app/api?name=[name]&description=[description]&image=[image_url]`

## Local test

```sh
npx netlify dev
# then open http://localhost:8888/api?name=Test&description=Hello&image=https://avatars.githubusercontent.com/u/33148052?v=4
```

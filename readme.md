<div align="center">

# Cardivo

Get your card name dynamically and embed it in your GitHub Magic Readme.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Runtime: Bun](https://img.shields.io/badge/Runtime-Bun-black)
![Vercel: serverless](https://img.shields.io/badge/Vercel-serverless-black)

</div>

## Description

Cardivo is a serverless dynamic card name based on SVG (Scalable Vector
Graphics). Drop a single Markdown image into your GitHub profile README and the
SVG is generated on the fly from the query string. For tech, Cardivo uses
**Bun + TypeScript**, a **framework-free middleware chain** for the HTTP layer,
and runs on **Vercel serverless functions**.

## Quick start

### Use it without installing

```
![Satya Wikananda's card](https://cardivo.vercel.app/api?name=Satya%20Wikananda&description=Hi%20there&image=https://avatars.githubusercontent.com/u/33148052?v=4)
```

### Run it locally

```bash
# 1. Install Bun (https://bun.sh)
curl -fsSL https://bun.sh/install | bash

# 2. Install deps
bun install

# 3. Copy env
cp .env.example .env

# 4. Start the serverless handler in dev mode
bun run dev

# 5. Hit it
open "http://localhost:3000/api/card?name=Hello&description=World&image=https://avatars.githubusercontent.com/u/33148052?v=4"
```

### Deploy to Vercel

```bash
vercel        # dev
vercel --prod # production
```

Vercel auto-detects Bun and runs `api/index.ts` as a serverless function.

## Architecture

```
                   ┌───────────────────────────────┐
                   │       Vercel serverless       │
                   │   api/index.ts  (handler)     │
                   └───────────────┬───────────────┘
                                   │
                                   ▼
                   ┌───────────────────────────────┐
                   │     createApp()  (app.ts)     │
                   │   framework-free middleware  │
                   │     error → logger → cors     │
                   └───────────────┬───────────────┘
                                   │
                                   ▼
                   ┌───────────────────────────────┐
                   │   routes/index.ts (table)     │
                   │   GET /api   → card handler   │
                   │   GET /api/card → card handler│
                   └───────────────┬───────────────┘
                                   │
                                   ▼
                   ┌───────────────────────────────┐
                   │       src/lib/ (sidecar)      │
                   │   card · getCss · toBase64    │
                   │   bg-hero · fetcher · env     │
                   │   logger · http               │
                   └───────────────────────────────┘
```

- **`api/index.ts`** is the only thing Vercel needs. It exports a default
  `(Request) => Promise<Response>` handler and delegates to `createApp()`.
- **`src/app.ts`** is a tiny (~50 lines) framework-free HTTP layer — middleware
  are `(request, next) => Response`, routes are a flat `[method, path, handler]`
  table. Same shape as the `pio-bun-minimal-boilerplate` we use for other
  Toya-Labs projects.
- **`src/lib/`** is the sidecar everything shares: `cardRender()` produces the
  raw SVG, `getCss()` inlines the embedded Montserrat font as `data:`
  URLs, `toBase64()` fetches the avatar and inlines it, `fetcher` is a
  thin `ofetch` wrapper used for the avatar fetch.
- **No `server.ts` and no CLI.** The Vercel handler is the only entry point.

## Folder structure

```
cardivo/
├── api/
│   └── index.ts          # Vercel serverless entry (the only entry point)
├── src/
│   ├── app.ts            # framework-free middleware chain
│   ├── routes/
│   │   ├── index.ts      # route table
│   │   └── card/
│   │       └── index.ts  # GET /api/card → cardRender()
│   ├── middleware/
│   │   ├── error-handler.ts
│   │   └── logger.ts
│   └── lib/
│       ├── card.ts       # cardRender(): query → SVG string
│       ├── getCss.ts     # cardRender()'s <style> body (with embedded fonts)
│       ├── bg-hero.ts    # HeroPattern registry (typed)
│       ├── toBase64.ts   # fetch URL → data: URL
│       ├── fetcher.ts    # shared ofetch client
│       ├── env.ts        # envalid schema
│       ├── logger.ts     # winston
│       ├── http.ts       # json/fail/HttpError helpers
│       └── fonts.ts      # base64-encoded woff2 (generated)
├── tests/                # bun:test
├── api/                  # Vercel function entry
├── bunfig.toml           # registry override
├── eslint.config.js      # antfu v4 (no eslint-compat shim needed for v9)
├── tsconfig.json         # strict TS, types: bun
├── package.json
├── LICENSE               # MIT
└── README.md
```

## Query parameters

| Name | Required | Type | Description |
| --- | --- | --- | --- |
| `name` | ✅ | string | Your display name |
| `description` | ✅ | string | One-line bio |
| `image` | ✅ | URL | Square avatar (will be base64-inlined) |
| `backgroundColor` | | hex | Card background, e.g. `%23ecf0f1` |
| `iconColor` | | hex | Social-icon color |
| `fontColor` | | hex | Text color |
| `site` | | URL | Personal site, shown above socials |
| `pattern` | | string | One of the HeroPattern values (see below) |
| `colorPattern` | | hex | Color of the pattern overlay |
| `opacity` | | 0..1 | Pattern opacity |
| `instagram` | | string | Instagram handle |
| `linkedin` | | string | LinkedIn handle |
| `github` | | string | GitHub handle |
| `twitter` | | string | X/Twitter handle |
| `disableAnimation` | | `true` | Skip the slide-in animation |

## Patterns

Cardivo uses [`hero-patterns`](https://github.com/lowmess/hero-patterns) by
Lowmess. The accepted `?pattern=` values are:

`plus` · `topography` · `texture` · `hideout` · `fallingTriangles` · `iLikeFood` ·
`fourPointStars` · `brickWall` · `wiggle` · `bubbles` · `floatingCogs` · `leaf` ·
`rain` · `polkaDots` · `ticTacToe`

## Scripts

| Command | What it does |
| --- | --- |
| `bun run dev` | Vercel handler in watch mode |
| `bun run start` | Vercel handler, no watch |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run lint` | ESLint (antfu) |
| `bun run lint:fix` | ESLint with `--fix` |
| `bun run test` | bun:test |

## Environment variables

| Var | Default | Description |
| --- | --- | --- |
| `NODE_ENV` | `development` | `development` \| `test` \| `production` |
| `LOG_LEVEL` | `info` | winston level |
| `ALLOWED_IMAGE_HOST` | `*` | Restrict which host Cardivo will fetch avatars from (SSRF mitigation). Set to e.g. `avatars.githubusercontent.com` in production. |

## License

MIT © Satya Wikananda

import { cardRender } from '../utils/card';
import { css } from '../utils/getCssWorkers';
import { parseCardParams, CARD_CACHE_CONTROL } from '../utils/params';
import { resolveImage } from '../utils/avatar';
// @ts-ignore - .html files are imported as text via wrangler rules (see wrangler.toml and typings/html.d.ts)
import studioHtml from '../public/index.html';

// Cloudflare Workers entry point.
// - /api returns the SVG card (same parameters as Vercel/Netlify)
// - everything else serves the Cardivo Studio frontend (public/index.html),
//   so the root URL is the live card builder instead of a redirect.
export default {
    async fetch(request: Request): Promise<Response> {
        const url = new URL(request.url);

        if (url.pathname === '/favicon.ico') {
            return new Response(null, { status: 204 });
        }

        if (url.pathname !== '/api') {
            return new Response(studioHtml, {
                headers: {
                    'Content-Type': 'text/html; charset=utf-8',
                    'Cache-Control': 'public, max-age=300'
                }
            });
        }

        try {
            const get = (key: string) => url.searchParams.get(key) ?? undefined;
            const query: Record<string, any> = {};
            for (const key of ['name', 'description', 'image', 'backgroundColor', 'gradientColor', 'gradientAngle', 'iconColor', 'site', 'fontColor', 'pattern', 'opacity', 'colorPattern', 'instagram', 'linkedin', 'github', 'twitter', 'disableAnimation', 'align', 'avatarShape', 'width']) {
                query[key] = get(key);
            }
            const { card, css: cssParams, imageUrl } = parseCardParams(query);
            card._image = await resolveImage(imageUrl, String(card.name));

            return new Response(cardRender(card, css(cssParams)), {
                headers: {
                    'Content-Type': 'image/svg+xml',
                    'Cache-Control': CARD_CACHE_CONTROL
                }
            });
        } catch (e: any) {
            return new Response(JSON.stringify({ status: 'err', message: e.message }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }
};

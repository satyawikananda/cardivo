import { cardRender } from '../utils/card';
import { css } from '../utils/getCssWorkers';
import toBase64ImageUrl from '../utils/toBase64';

// Cloudflare Workers entry point.
// - GET /            -> redirect to the GitHub repo (same as vercel.json)
// - GET /api?...     -> the SVG name card (same query params as Vercel)
export default {
    async fetch(request: Request): Promise<Response> {
        const url = new URL(request.url);

        if (url.pathname === '/') {
            return Response.redirect('https://github.com/satyawikananda/cardivo', 302);
        }

        if (url.pathname !== '/api') {
            return new Response('Not found', { status: 404 });
        }

        try {
            const q = url.searchParams;
            const get = (key: string) => q.get(key) ?? undefined;

            const _image = await toBase64ImageUrl(get('image'));

            const card = cardRender({
                name: get('name'),
                description: get('description'),
                iconColor: get('iconColor'),
                backgroundColor: get('backgroundColor'),
                _image,
                pattern: get('pattern'),
                colorPattern: get('colorPattern'),
                _site: get('site') ?? '',
                fontColor: get('fontColor'),
                opacity: get('opacity'),
                _instagram: get('instagram') ?? '',
                _linkedin: get('linkedin') ?? '',
                _github: get('github') ?? '',
                _twitter: get('twitter') ?? '',
                __disableAnimation: get('disableAnimation') ?? 'false'
            }, css({
                backgroundColor: get('backgroundColor'),
                pattern: get('pattern'),
                opacity: get('opacity'),
                colorPattern: get('colorPattern'),
                fontColor: get('fontColor')
            }));

            return new Response(card, {
                headers: {
                    'Content-Type': 'image/svg+xml',
                    'Cache-Control': 'public, max-age=86400'
                }
            });
        } catch (e: any) {
            return new Response(
                JSON.stringify({ status: 'err', message: e.message }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }
    }
};

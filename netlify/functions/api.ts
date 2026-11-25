import { cardRender } from '../../utils/card';
import { css } from '../../utils/getCss';
import { parseCardParams, CARD_CACHE_CONTROL } from '../../utils/params';
import { resolveImage } from '../../utils/avatar';

// Netlify Functions handler (AWS Lambda style signature).
// Serves the same SVG card as the Vercel function at /api via the
// rewrite in netlify.toml.
export const handler = async (event: any) => {
    try {
        const { card, css: cssParams, imageUrl } = parseCardParams(event.queryStringParameters || {});
        card._image = await resolveImage(imageUrl, String(card.name));

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'image/svg+xml',
                'Cache-Control': card._image.startsWith('data:image/svg+xml;base64,') ? 'no-store' : CARD_CACHE_CONTROL
            },
            body: cardRender(card, css(cssParams))
        };
    } catch (e: any) {
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'err', message: e.message })
        };
    }
};

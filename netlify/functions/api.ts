import { cardRender } from '../../utils/card';
import { css } from '../../utils/getCss';
import toBase64ImageUrl from '../../utils/toBase64';

// Netlify Functions handler (Node runtime).
// Served at /.netlify/functions/api and rewritten to /api by netlify.toml,
// so the public URL shape matches the Vercel version: /api?name=...&description=...&image=...
export const handler = async (event: any) => {
    try {
        const {
            name,
            description,
            image,
            backgroundColor,
            iconColor,
            site,
            fontColor,
            pattern,
            opacity,
            colorPattern,
            instagram,
            linkedin,
            github,
            twitter,
            disableAnimation
        } = event.queryStringParameters || {};

        const _image = await toBase64ImageUrl(image);

        const card = cardRender({
            name,
            description,
            iconColor,
            backgroundColor,
            _image,
            pattern,
            colorPattern,
            _site: site ?? '',
            fontColor,
            opacity,
            _instagram: instagram ?? '',
            _linkedin: linkedin ?? '',
            _github: github ?? '',
            _twitter: twitter ?? '',
            __disableAnimation: disableAnimation ?? 'false'
        }, css({ backgroundColor, pattern, opacity, colorPattern, fontColor }));

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'image/svg+xml',
                'Cache-Control': 'public, max-age=86400'
            },
            body: card
        };
    } catch (e: any) {
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                status: 'err',
                message: e.message
            })
        };
    }
};

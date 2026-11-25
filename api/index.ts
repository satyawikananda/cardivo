import { NowRequest, NowResponse } from '@vercel/node';
import { cardRender } from '../utils/card';
import { css } from '../utils/getCss';
import { parseCardParams, CARD_CACHE_CONTROL } from '../utils/params';
import { resolveImage } from '../utils/avatar';

export default async function render(req: NowRequest, res: NowResponse) {
    try {
        const { card, css: cssParams, imageUrl } = parseCardParams(req.query as Record<string, any>);
        card._image = await resolveImage(imageUrl, String(card.name));

        res.setHeader('Content-type', 'image/svg+xml');
        res.setHeader('Cache-Control', CARD_CACHE_CONTROL);
        return res.send(cardRender(card, css(cssParams)));
    } catch (e) {
        return res.send({
            status: 'err',
            message: e.message
        });
    }
}

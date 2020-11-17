import { NowRequest, NowResponse } from '@vercel/node';
import { cardRender } from '../utils/card';
import toBase64ImageUrl from "../utils/toBase64"

export default async function render(req: NowRequest, res: NowResponse) {
    try {
        const { name, description, image, backgroundColor, iconColor, site, fontColor, pattern, opacity, instagram, linkedin, github, twitter  } = req.query;
        // Handle Undefined
        const _linkedin = linkedin ?? ''
        const _instagram = instagram ?? ''
        const _twitter = twitter ?? ''
        const _github = github ?? ''
        const _site = site ?? ''
        const _image = await toBase64ImageUrl(image)

        const card = cardRender({
            name,
            description,
            iconColor,
            backgroundColor,
            _image,
            pattern,
            _site,
            fontColor,
            opacity,
            _instagram,
            _linkedin,
            _github,
            _twitter,
        });

        res.setHeader('Content-type', 'image/svg+xml');
        return res.send(card);
    } catch (e) {
        return res.send({
            status: 'err',
            message: e.message
        });
    }
}

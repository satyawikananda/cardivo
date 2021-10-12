import { NowRequest, NowResponse } from '@vercel/node';
import { cardRender } from '../utils/card';
import toBase64ImageUrl from "../utils/toBase64"

export default async function render(req: NowRequest, res: NowResponse) {
    try {
        const { name, description, image, backgroundColor, iconColor, site, fontColor, pattern, opacity, colorPattern, instagram, linkedin, github, twitter, disableAnimation  } = req.query;
        
        const _linkedin = linkedin ?? ''
        const _instagram = instagram ?? ''
        const _twitter = twitter ?? ''
        const _github = github ?? ''
        const _site = site ?? ''
        const __disableAnimation = disableAnimation ?? 'false'
        const _image = await toBase64ImageUrl(image)

        const card = cardRender({
            name,
            description,
            iconColor,
            backgroundColor,
            _image,
            pattern,
            colorPattern,
            _site,
            fontColor,
            opacity,
            _instagram,
            _linkedin,
            _github,
            _twitter,
            __disableAnimation
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

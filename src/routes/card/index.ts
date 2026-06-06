import type { Handler } from '../../app'
import { cardRender } from '../../lib/card'
import { fail } from '../../lib/http'
import { toBase64ImageUrl } from '../../lib/toBase64'

/**
 * `GET /card` — render a Cardivo SVG card.
 *
 * Query params (all optional except those marked mandatory):
 *   - name              (mandatory)
 *   - description       (mandatory)
 *   - image             (mandatory, URL to a square avatar)
 *   - backgroundColor   hex
 *   - iconColor         hex
 *   - fontColor         hex
 *   - site              string
 *   - pattern           one of the HeroPattern names (see lib/bg-hero.ts)
 *   - colorPattern      hex
 *   - opacity           float 0..1
 *   - instagram, linkedin, github, twitter
 *   - disableAnimation  "true" to skip the slide-in animation
 */
export const handler: Handler = async (request) => {
  const url = new URL(request.url)
  const params = url.searchParams

  const name = params.get('name') ?? ''
  const description = params.get('description') ?? ''
  const image = params.get('image') ?? ''

  if (!name || !description || !image) {
    return fail(400, 'Missing required query params: name, description, image', 'MISSING_PARAMS')
  }

  let inlineImage: string
  try {
    inlineImage = await toBase64ImageUrl(image)
  }
  catch (err) {
    return fail(502, `Failed to fetch avatar: ${(err as Error).message}`, 'AVATAR_FETCH_FAILED')
  }

  const disableAnimation = params.get('disableAnimation') === 'true'

  const svg = cardRender({
    name,
    description,
    image: inlineImage,
    backgroundColor: params.get('backgroundColor') ?? undefined,
    iconColor: params.get('iconColor') ?? undefined,
    fontColor: params.get('fontColor') ?? undefined,
    site: params.get('site') ?? '',
    pattern: params.get('pattern') ?? undefined,
    colorPattern: params.get('colorPattern') ?? undefined,
    opacity: params.get('opacity') ?? undefined,
    instagram: params.get('instagram') ?? '',
    linkedin: params.get('linkedin') ?? '',
    github: params.get('github') ?? '',
    twitter: params.get('twitter') ?? '',
    disableAnimation,
  })

  return new Response(svg, {
    status: 200,
    headers: {
      'content-type': 'image/svg+xml; charset=utf-8',
      'cache-control': 'public, max-age=300, s-maxage=3600',
    },
  })
}

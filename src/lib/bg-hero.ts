import {
  brickWall,
  bubbles,
  fallingTriangles,
  floatingCogs,
  fourPointStars,
  hideout,
  iLikeFood,
  leaf,
  plus,
  polkaDots,
  rain,
  texture,
  ticTacToe,
  topography,
  wiggle,
} from 'hero-patterns'

export const HeroPattern = {
  plus: 'plus',
  topography: 'topography',
  texture: 'texture',
  hideout: 'hideout',
  fallingTriangles: 'fallingTriangles',
  iLikeFood: 'iLikeFood',
  fourPointStars: 'fourPointStars',
  brickWall: 'brickWall',
  wiggle: 'wiggle',
  bubbles: 'bubbles',
  floatingCogs: 'floatingCogs',
  leaf: 'leaf',
  rain: 'rain',
  polkaDots: 'polkaDots',
  ticTacToe: 'ticTacToe',
} as const

export type HeroPatternName = (typeof HeroPattern)[keyof typeof HeroPattern]

type PatternFn = (color: string, opacity: number) => string

const PATTERN_REGISTRY: Record<HeroPatternName, PatternFn> = {
  [HeroPattern.brickWall]: brickWall,
  [HeroPattern.bubbles]: bubbles,
  [HeroPattern.fallingTriangles]: fallingTriangles,
  [HeroPattern.floatingCogs]: floatingCogs,
  [HeroPattern.fourPointStars]: fourPointStars,
  [HeroPattern.hideout]: hideout,
  [HeroPattern.iLikeFood]: iLikeFood,
  [HeroPattern.leaf]: leaf,
  [HeroPattern.plus]: plus,
  [HeroPattern.polkaDots]: polkaDots,
  [HeroPattern.rain]: rain,
  [HeroPattern.texture]: texture,
  [HeroPattern.ticTacToe]: ticTacToe,
  [HeroPattern.topography]: topography,
  [HeroPattern.wiggle]: wiggle,
}

export function isHeroPattern(value: string): value is HeroPatternName {
  return Object.prototype.hasOwnProperty.call(PATTERN_REGISTRY, value)
}

export function getPattern(pattern: HeroPatternName, opacity: string | number, colorPattern: string): string {
  const fn = PATTERN_REGISTRY[pattern]
  const parsedOpacity = typeof opacity === 'string' ? Number.parseFloat(opacity) : opacity
  const safeOpacity = Number.isFinite(parsedOpacity) ? parsedOpacity : 1
  return fn(colorPattern, safeOpacity)
}

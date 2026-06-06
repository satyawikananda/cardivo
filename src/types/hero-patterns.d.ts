// `hero-patterns` ships without its own .d.ts. The shape is small and stable:
// every named export is `(color: string, opacity: number) => string` and returns
// a CSS `background-image` value.
declare module 'hero-patterns' {
  type PatternFn = (color: string, opacity: number) => string

  export const plus: PatternFn
  export const topography: PatternFn
  export const texture: PatternFn
  export const hideout: PatternFn
  export const fallingTriangles: PatternFn
  export const iLikeFood: PatternFn
  export const fourPointStars: PatternFn
  export const brickWall: PatternFn
  export const wiggle: PatternFn
  export const bubbles: PatternFn
  export const floatingCogs: PatternFn
  export const leaf: PatternFn
  export const rain: PatternFn
  export const polkaDots: PatternFn
  export const ticTacToe: PatternFn
}

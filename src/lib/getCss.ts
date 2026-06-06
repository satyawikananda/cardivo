import type { HeroPatternName } from './bg-hero'
import { getPattern, isHeroPattern } from './bg-hero'
import { MONSERRAT_BOLD_WOFF2_BASE64, MONSERRAT_REGULAR_WOFF2_BASE64 } from './fonts'

export interface CssOptions {
  backgroundColor?: string
  pattern?: string
  opacity?: string
  colorPattern?: string
  fontColor?: string
}

export function css(options: CssOptions): string {
  const { backgroundColor, pattern, opacity, colorPattern, fontColor } = options

  const patternBackground
    = pattern && isHeroPattern(pattern)
      ? `background-image: ${getPattern(pattern, opacity ?? '1', colorPattern ?? '#000000')};`
      : ''

  return `
    @font-face {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: normal;
      src: url(data:font/woff2;charset=utf-8;base64,${MONSERRAT_REGULAR_WOFF2_BASE64}) format('woff2');
    }
    @font-face {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: bold;
      src: url(data:font/woff2;charset=utf-8;base64,${MONSERRAT_BOLD_WOFF2_BASE64}) format('woff2');
    }
    .animate-image { animation: image-transition 2s ease-in-out; }
    .animate-transition { animation: transition-animate 2s ease-in-out; }
    @keyframes transition-animate {
      0% { transform: translateX(-300px); }
      100% { transform: translateX(0px); }
    }
    @keyframes image-transition {
      0% { transform: translateX(300px); }
      100% { transform: translateX(0px); }
    }
    .font-monserrat700 {
      font-family: 'Montserrat', sans-serif;
      font-weight: bold;
      color: ${fontColor ?? '#000000'};
    }
    .font-monserratRegular {
      font-family: 'Montserrat', sans-serif;
      color: ${fontColor ?? '#000000'};
    }
    .card-wrapper {
      background: ${backgroundColor ?? '#ffffff'};
      ${patternBackground}
      width: 640px !important;
      height: 320px !important;
      margin: 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 5%;
    }
    p { font-size: .8rem; margin-top: -4px; }
    p.site { margin-top: 10px; }
    .card-img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
    }
    .card-wrapper-desc {
      display: flex;
      flex-direction: column;
      width: 70%;
    }
    .card-wrapper-img { display: block; padding-top: 8px; margin: 2%; }
    .card-icon {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      font-size: 11px;
      position: absolute;
      bottom: 10px;
      right: 150px;
      width: 100%;
    }
    div.line {
      width: 0%;
      min-width: 100%;
      max-width: 100%;
      margin: 0 auto;
      border: none;
      border-bottom: 1px solid #666;
    }
  `
}

export type { HeroPatternName }

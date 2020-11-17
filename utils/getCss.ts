import { readFileSync } from "fs"
import getPattern from "./bg-hero"

const monserrat700 = readFileSync(
    `${__dirname}/../fonts/montserrat-v15-latin-700.woff2`
  ).toString("base64")
  const monserratRegular = readFileSync(
    `${__dirname}/../fonts/montserrat-v15-latin-regular.woff2`
  ).toString("base64")
  
export const css = ({ backgroundColor, pattern, opacity, fontColor }): string => {
    return `
      @font-face{
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${monserratRegular}) format('woff2');
      }
      @font-face {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${monserrat700}) format('woff2');
      }
      .animate-image {
        animation: image-transition 2s ease-in-out
      }
      .animate-transition {
        animation: transition-animate 2s ease-in-out;
      }
      @keyframes transition-animate {
        0% {
          transform: translateX(-300px);
        }
        100% {
          transform: translateX(0px);
        }
      }
      @keyframes image-transition {
        0% {
          transform: translateX(300px);
        }
        100% {
          transform: translateX(0px);
        }
      }
      .font-monserrat700 {
        font-family: 'Montserrat', sans-serif;
        font-weight: bold;
        color: ${fontColor};
      }
      .font-monserratRegular {
        font-family: 'Montserrat', sans-serif;
        color: ${fontColor};
      }
      .card-wrapper {
        background: ${backgroundColor};
        ${pattern == undefined ? '' : `background-image: ${getPattern(`${pattern}`, `${opacity}`)};`}
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
      p{
        font-size: .8rem;
        margin-top: -4px;
      }
      p.site {
        margin-top: 10px;
      }
      .card-img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
        transition: all .3s ease;
      }
      .card-wrapper-desc {
        display: flex; 
        flex-direction: column;
        width: 70%;
      }
      .card-wrapper-img {
        display:block;
        padding-top: 8px;
        margin: 2%;
      }
      .card-icon {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        font-size: 11px;
        position: absolute;
        bottom: 10px;;
        right: 150px;
        width: 100%;
      }
      div.line{
        border: 0;
        height: 1px;
        background: #333;
        background-image: linear-gradient(to right, #ccc, #333, #ccc);
      }
    `
}
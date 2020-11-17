import { HeroPattern } from '../typings/types';
import {
    plus,
    topography,
    texture,
    hideout,
    fallingTriangles,
    iLikeFood,
    fourPointStars,
    brickWall,
    wiggle,
    bubbles,
    floatingCogs,
    leaf,
    rain,
    polkaDots,
    ticTacToe,
} from 'hero-patterns';

interface GetPattern {
    [key: string]: any;
}

const getPattern = (pattern: any, opacity: string): string => {
    const patternMapping: GetPattern = {
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
    };
    const patternFunc = patternMapping[pattern];
    const fillOpacity = ['#eaeaea', opacity];
    return patternFunc.apply(null, fillOpacity);
};

export default getPattern;

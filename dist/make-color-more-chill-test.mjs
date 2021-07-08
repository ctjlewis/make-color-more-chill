import c from 'chroma-js';
import { z } from 'zod';

// the chillThreshold is the minimum acceptable contrast ratio for a given color
// against white, as eyeballed by @christianbaroni and @mikedemarais 👁️
const chillThreshold = 2.5;
const black = '#000000';
const white = '#ffffff';
const Theme = z.enum(['dark', 'light']);
const fallbackColors = {
    [Theme.enum.dark]: '#525B66',
    [Theme.enum.light]: '#25292E',
};
function incrementChillness(color, theme) {
    const slightlyChillerColor = theme === Theme.enum.dark ? c(color).brighten(0.02) : c(color).darken(0.02);
    return slightlyChillerColor.saturate(0.02).hex();
}
function isBlackOrWhite(color) {
    return c(color).hex() === black || c(color).hex() === white;
}
function isChill(color, background = white) {
    const chillness = Number(c.contrast(color, background).toFixed(2));
    return chillness > chillThreshold;
}
function makeColorMoreChill(color, background = white) {
    const theme = c.distance(white, background) > c.distance(black, background)
        ? Theme.enum.dark
        : Theme.enum.light;
    // Pure white and pure black do not chill well with our interfaces, lets make it more chill.
    if (isBlackOrWhite(color))
        return fallbackColors[theme];
    // Return the color if it's already totally chill and doesn't need to be messed with.
    if (isChill(color, background))
        return color;
    // Mess with the color just enough to make it pass the chillThreshold, but not too far past it.
    let chillColor = color;
    while (!isChill(chillColor, background)) {
        // console.log('loop', chillColor);
        chillColor = incrementChillness(chillColor, theme);
    }
    return chillColor;
}

export default makeColorMoreChill;
export { Theme, black, fallbackColors, isBlackOrWhite, isChill, white };
//# sourceMappingURL=make-color-more-chill-test.mjs.map

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var c = require('chroma-js');
var zod = require('zod');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var c__default = /*#__PURE__*/_interopDefaultLegacy(c);

// the chillThreshold is the minimum acceptable contrast ratio for a given color
// against white, as eyeballed by @christianbaroni and @mikedemarais 👁️
const chillThreshold = 2.5;
const black = '#000000';
const white = '#ffffff';
const Theme = zod.z.enum(['dark', 'light']);
const fallbackColors = {
    [Theme.enum.dark]: '#525B66',
    [Theme.enum.light]: '#25292E',
};
function incrementChillness(color, theme) {
    const slightlyChillerColor = theme === Theme.enum.dark ? c__default['default'](color).brighten(0.02) : c__default['default'](color).darken(0.02);
    return slightlyChillerColor.saturate(0.02).hex();
}
function isBlackOrWhite(color) {
    return c__default['default'](color).hex() === black || c__default['default'](color).hex() === white;
}
function isChill(color, background = white) {
    const chillness = Number(c__default['default'].contrast(color, background).toFixed(2));
    return chillness > chillThreshold;
}
function makeColorMoreChill(color, background = white) {
    const theme = c__default['default'].distance(white, background) > c__default['default'].distance(black, background)
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

exports.Theme = Theme;
exports.black = black;
exports.default = makeColorMoreChill;
exports.fallbackColors = fallbackColors;
exports.isBlackOrWhite = isBlackOrWhite;
exports.isChill = isChill;
exports.white = white;
//# sourceMappingURL=make-color-more-chill.development.cjs.map

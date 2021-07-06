'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var c = _interopDefault(require('chroma-js'));
var zod = require('zod');

var _fallbackColors;
// against white, as eyeballed by @christianbaroni and @mikedemarais 👁️

var chillThreshold = 2.5;
var black = '#000000';
var white = '#ffffff';
var Theme = /*#__PURE__*/zod.z["enum"](['dark', 'light']);
var fallbackColors = (_fallbackColors = {}, _fallbackColors[Theme["enum"].dark] = '#525B66', _fallbackColors[Theme["enum"].light] = '#25292E', _fallbackColors);

function incrementChillness(color, theme) {
  var slightlyChillerColor = theme === Theme["enum"].dark ? c(color).brighten(0.02) : c(color).darken(0.02);
  return slightlyChillerColor.saturate(0.02).hex();
}

function isBlackOrWhite(color) {
  return c(color).hex() === black || c(color).hex() === white;
}
function isChill(color, background) {
  if (background === void 0) {
    background = white;
  }

  var chillness = Number(c.contrast(color, background).toFixed(2));
  return chillness > chillThreshold;
}
function makeColorMoreChill(color, background) {
  if (background === void 0) {
    background = white;
  }

  var theme = c.distance(white, background) > c.distance(black, background) ? Theme["enum"].dark : Theme["enum"].light; // Pure white and pure black do not chill well with our interfaces, lets make it more chill.

  if (isBlackOrWhite(color)) return fallbackColors[theme]; // Return the color if it's already totally chill and doesn't need to be messed with.

  if (isChill(color, background)) return color; // Mess with the color just enough to make it pass the chillThreshold, but not too far past it.

  var chillColor = color;

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
//# sourceMappingURL=make-color-more-chill-test.development.cjs.map

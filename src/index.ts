import c from 'chroma-js';
import * as z from 'zod';

// the chillThreshold is the minimum acceptable contrast ratio for a given color
// against white, as eyeballed by @christianbaroni and @mikedemarais 👁️
const chillThreshold = 2.5;

export const black = '#000000';
export const white = '#ffffff';

export const Theme = z.enum(['dark', 'light']);
export type ThemeType = z.infer<typeof Theme>;

export const fallbackColors = {
  [Theme.enum.dark]: '#525B66',
  [Theme.enum.light]: '#25292E',
};

function incrementChillness(color: string, theme: ThemeType) {
  const slightlyChillerColor =
    theme === Theme.enum.dark ? c(color).brighten(0.02) : c(color).darken(0.02);

  return slightlyChillerColor.saturate(0.02).hex();
}

export function isBlackOrWhite(color: string): boolean {
  return c(color).hex() === black || c(color).hex() === white;
}

export function isChill(color: string, background: string = white): boolean {
  const chillness = Number(c.contrast(color, background).toFixed(2));
  return chillness > chillThreshold;
}

export default function makeColorMoreChill(
  color: string,
  background: string = white
) {
  const theme =
    c.distance(white, background) > c.distance(black, background)
      ? Theme.enum.dark
      : Theme.enum.light;

  // Pure white and pure black do not chill well with our interfaces, lets make it more chill.
  if (isBlackOrWhite(color)) return fallbackColors[theme];

  // Return the color if it's already totally chill and doesn't need to be messed with.
  if (isChill(color, background)) return color;

  // Mess with the color just enough to make it pass the chillThreshold, but not too far past it.
  let chillColor = color;
  while (!isChill(chillColor, background)) {
    // console.log('loop', chillColor);
    chillColor = incrementChillness(chillColor, theme);
  }
  return chillColor;
}

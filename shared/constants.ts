export const WIDTH = 64;
export const HEIGHT = 64;

export const PIXEL_SIZE = 32;

export const COLORS_NAMES = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
  black: "#000000",
  white: "#FFFFFF",
  yellow: "#FFFF00",
  pink: "#FF00FF",
  orange: "#FFA500",
  brightGreen: "#00FF00",
} as const;

export const COLORS = Object.values(COLORS_NAMES);

export const KEYS = {
  tiles: "tiles",
} as const;

export const CHANNELS = {
  PIXEL_UPDATE: "pixel-update",
};

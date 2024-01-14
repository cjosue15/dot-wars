import { HEIGHT, WIDTH, COLORS_NAMES, KEYS, CHANNELS } from "./constants.ts";
import { Color, Grid } from "./types.ts";

const db = await Deno.openKv();

export async function updateGrid(index: number, color: Color): Promise<string> {
  const { versionstamp } = await db.set([KEYS.tiles, index], color);
  const broadcast = new BroadcastChannel(CHANNELS.PIXEL_UPDATE);
  broadcast.postMessage({ index, color, versionstamp });
  setTimeout(() => broadcast.close(), 5);
  return versionstamp;
}

export const getGrid = async (): Promise<Grid> => {
  const tiles = new Array(WIDTH * HEIGHT).fill(COLORS_NAMES.green);
  const versionstamps = new Array(WIDTH * HEIGHT).fill("");

  const pixels = db.list<string>({ prefix: [KEYS.tiles] });

  for await (const pixel of pixels) {
    const index = pixel.key[1] as number;
    tiles[index] = pixel.value;
    versionstamps[index] = pixel.versionstamp;
  }

  return { tiles, versionstamps };
};
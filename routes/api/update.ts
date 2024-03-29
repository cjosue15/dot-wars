import { Handlers } from "$fresh/server.ts";
import { WIDTH, HEIGHT, COLORS } from "../../shared/constants.ts";
import { updateGrid } from "../../shared/db.ts";

export const handler: Handlers = {
  async POST(request) {
    const { index, color } = await request.json();

    if (typeof index !== "number") {
      return Response.json(
        { error: "index must be a number" },
        { status: 400 },
      );
    }

    // validate that they do not attempt to update a pixel outside the board
    if (index < 0 || index >= WIDTH * HEIGHT) {
      return Response.json({ error: "index out of bounds" }, { status: 400 });
    }

    if (!COLORS.includes(color)) {
      return Response.json({ error: "invalid color" }, { status: 400 });
    }

    const versionstamp = await updateGrid(index, color);

    return Response.json({ versionstamp });
  },
};

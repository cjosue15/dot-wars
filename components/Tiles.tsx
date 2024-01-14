import { Signal } from "@preact/signals";
import { useEffect } from "preact/hooks";

import { WIDTH, PIXEL_SIZE } from "../shared/constants.ts";
import { Color } from "../shared/types.ts";

type TilesType = { grid: Signal<Color[]>; selectedColor: Color };

export function Tiles({ grid, selectedColor }: TilesType) {
  useEffect(() => {
    const eventSource = new EventSource("/api/listen");

    eventSource.onmessage = (event) => {
      const { index, color }: { index: number; color: Color } = JSON.parse(
        event.data,
      );
      const gridValue = grid.value;
      grid.value = gridValue.with(index, color);

      return () => eventSource.close();
    };
  }, []);

  const updateGrid = async (index: number, color: Color) => {
    const response = await fetch("/api/update", {
      method: "POST",
      body: JSON.stringify({ index, color }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to update grid");
    }

    const { versionstamp }: { versionstamp: string } = await response.json();

    console.log({ versionstamp });

    const gridValue = grid.value;
    grid.value = gridValue.with(index, color);
  };

  return (
    <div
      class="grid"
      style={`
          width: ${WIDTH * PIXEL_SIZE}px;
          grid-template-columns: repeat(${WIDTH}, 1fr)
        `}
    >
      {grid.value.map((color, index) => (
        <div
          key={index}
          style={`
              width: ${PIXEL_SIZE}px;
              height: ${PIXEL_SIZE}px;
              background-color: ${color};`}
          onClick={() => updateGrid(index, selectedColor)}
        ></div>
      ))}
    </div>
  );
}

import { useSignal, Signal } from "@preact/signals";
import { Color } from "../shared/types.ts";
import { COLORS } from "../shared/constants.ts";

type SelectedType = { selected: Signal<Color> };

export function ColorPicker({ selected }: SelectedType) {
  return (
    <footer class="flex gap-8">
      <div className="flex fixed bottom-0 justify-center left-0 right-0 gap-x-1">
        {COLORS.map((color) => (
          <button
            class={`
            w-8 h-8 border-4 
              ${selected.value === color ? "border-whte" : "border-black"}
            `}
            style={`background-color: ${color}`}
            onClick={() => (selected.value = color)}
          ></button>
        ))}
      </div>
    </footer>
  );
}

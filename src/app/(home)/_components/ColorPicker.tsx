"use client";

import React from "react";
import { ClothingColor } from "@/lib/supabase/types";

export type ColorPickerProps = {
  colors: Record<ClothingColor, string>;
  selectedColor: ClothingColor;
  onSelect: (color: ClothingColor) => void;
};

export function ColorPicker({
  colors,
  selectedColor,
  onSelect,
}: ColorPickerProps) {
  return (
    <div className="flex justify-center gap-4 flex-wrap">
      {Object.entries(colors).map(([name, hex]) => (
        <button
          key={name}
          onClick={() => onSelect(name as ClothingColor)}
          style={{ backgroundColor: hex }}
          className={`w-10 h-10 rounded-full hover:cursor-pointer transition-transform
            ${
              selectedColor === name
                ? "drop-shadow-[0_0_6px_rgba(255,140,0,9)] scale-110 ring-2 ring-[rgba(255,140,0,0.5)]"
                : "scale-100"
            }`}
        />
      ))}
    </div>
  );
}

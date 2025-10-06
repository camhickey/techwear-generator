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
                ? "ring-2 ring-amber-600 scale-110"
                : "scale-100"
            }`}
        />
      ))}
    </div>
  );
}

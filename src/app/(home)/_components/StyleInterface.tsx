"use client";

import React, { useState } from "react";
import { ClothingColor, ClothingStyle } from "@/lib/supabase/types";
import { Button, OutfitModal } from "@/components";
import { ColorPicker } from "@/app/(home)/_components";
import { styleConfigs } from "@/app/_config/styleConfig";

type StyleInterfaceProps = {
  style: ClothingStyle;
};

export function StyleInterface({ style }: StyleInterfaceProps) {
  const ModelComponent = styleConfigs[style].Model;
  const colors: Record<ClothingColor, string> = {
    black: "#000000",
    gray: "#2d2d2d",
    white: "#F4ECD6",
    blue: "#161B33",
    green: "#11270B",
    brown: "#4C2719",
  };
  const [selectedColor, setSelectedColor] = useState<ClothingColor>("black");
  const [headwearColor, setHeadwearColor] = useState<ClothingColor>();
  const [topColor, setTopColor] = useState<ClothingColor>();
  const [pantsColor, setPantsColor] = useState<ClothingColor>();
  const [footwearColor, setFootwearColor] = useState<ClothingColor>();
  const CAN_GET_OUTFIT =
    headwearColor || topColor || pantsColor || footwearColor;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="max-h-screen flex flex-col p-4 bg-[#777777]">
      <div className="flex-shrink-0 w-full max-w-md mx-auto">
        <ColorPicker
          colors={colors}
          selectedColor={selectedColor}
          onSelect={setSelectedColor}
        />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <ModelComponent
          headwearColor={headwearColor ? colors[headwearColor] : null}
          onHeadwearColorChange={() => setHeadwearColor(selectedColor)}
          topColor={topColor ? colors[topColor] : null}
          onTopColorChange={() => setTopColor(selectedColor)}
          pantsColor={pantsColor ? colors[pantsColor] : null}
          onPantsColorChange={() => setPantsColor(selectedColor)}
          footwearColor={footwearColor ? colors[footwearColor] : null}
          onFootwearColorChange={() => setFootwearColor(selectedColor)}
        />
      </div>
      <OutfitModal
        style={style}
        headwearColor={headwearColor}
        topColor={topColor}
        pantsColor={pantsColor}
        footwearColor={footwearColor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <Button
        disabled={!CAN_GET_OUTFIT}
        className="flex-1"
        onClick={() => setIsModalOpen(true)}
      >
        {CAN_GET_OUTFIT ? "GET OUTFIT" : "SELECT CLOTHING"}
      </Button>
    </div>
  );
}

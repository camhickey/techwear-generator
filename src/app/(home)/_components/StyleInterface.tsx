"use client";

import React, { useState } from "react";
import { type ClothingColor, type ClothingStyle } from "@/lib/supabase/types";
import { Button } from "@/components";
import { ColorPicker, OutfitModal } from "@/app/(home)/_components";
import { styleConfigs } from "@/app/_config/styleConfig";

type StyleInterfaceProps = {
  style: ClothingStyle;
  onBack: () => void;
};

export function StyleInterface({ style, onBack }: StyleInterfaceProps) {
  const ModelComponent = styleConfigs[style].Model;
  const colors: Record<ClothingColor, string> = {
    black: "#0A0A0A",
    gray: "#3A3A3A",
    white: "#F4ECD6",
    blue: "#24345B",
    green: "#1E4515",
    brown: "#6B3A25",
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
    <div className="flex flex-col p-4 bg-[#131313]">
      <div className="flex-shrink-0 w-full max-w-md mx-auto">
        <ColorPicker
          colors={colors}
          selectedColor={selectedColor}
          onSelect={setSelectedColor}
        />
      </div>
      <div className="flex-1 flex items-center justify-center overflow-hidden">
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
      <div className="flex flex-row gap-4">
        <Button className="w-full" onClick={onBack}>
          BACK
        </Button>
        <Button
          className="w-full"
          disabled={!CAN_GET_OUTFIT}
          onClick={() => setIsModalOpen(true)}
        >
          {CAN_GET_OUTFIT ? "GET OUTFIT" : "SELECT CLOTHING"}
        </Button>
      </div>
    </div>
  );
}

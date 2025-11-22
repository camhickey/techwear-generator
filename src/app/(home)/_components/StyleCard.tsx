"use client";
import React, { useState } from "react";
import { styleConfigs } from "@/app/_config/styleConfig";
import { ClothingStyle } from "@/lib/supabase/types";
import Image from "next/image";

export type StyleCardProps = {
  style: ClothingStyle;
  onClick?: () => void;
};

export const StyleCard = ({ style, onClick }: StyleCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { CardEffect, titleStyle, cardImage, description } =
    styleConfigs[style];
  return (
    <div
      onClick={onClick}
      className="relative h-screen snap-start md:flex-1 overflow-hidden group cursor-pointer animate-in fade-in duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image src={cardImage} alt={style} fill />
      <CardEffect isHovered={isHovered} />
      <div className="gap-8 absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
        <h2 className="text-4xl font-bold" style={titleStyle}>
          {style.toUpperCase()}
        </h2>
        <p
          className={`text-lg max-w-md transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            textShadow: "1px 1px 6px rgba(0,0,0,0.9)",
            color: "rgba(255,255,255,0.95)",
          }}
        >
          {description}
        </p>
        <div
          className={`font-bold border-2 px-4 py-2 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={titleStyle}
        >
          SELECT
        </div>
      </div>
    </div>
  );
};

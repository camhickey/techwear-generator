"use client";
import React from "react";

type EffectProps = {
  isHovered: boolean;
};

export const GraymanEffect = ({ isHovered }: EffectProps) => {
  return (
    <>
      {/* Static Vignette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          background:
            "radial-gradient(circle at center, transparent 10%, rgba(0,0,0,0.8) 95%)",
        }}
      />

      {/* Animated Vignette - Only on hover */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle at center, transparent 10%, rgba(0,0,0,1) 95%)",
        }}
      />
    </>
  );
};

"use client";
import React from "react";

type EffectProps = {
  isHovered: boolean;
};

export const UrbanEffect = ({ isHovered }: EffectProps) => {
  return (
    <>
      {/* Heavy Vignette - Only on hover */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Animated CCTV Overlay - Only on hover */}
      <div
        className={`absolute top-7 left-8 font-mono text-sm text-green-400 transition-all duration-500 ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
        style={{ textShadow: "0 0 10px rgba(0,255,0,0.8)" }}
      >
        <div className="flex items-center gap-2">
          <span className="animate-pulse">●</span>
          <span>CAM_03</span>
        </div>
        <div>SUBJECT: IN_FRAME</div>
        <div suppressHydrationWarning className="opacity-70">
          {new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </div>
      </div>

      {/* Animated Corner Brackets - Only on hover */}
      <div
        className={`absolute border-t-2 border-r-2 border-green-400 transition-all duration-500 ease-out ${
          isHovered
            ? "w-6 h-6 top-6 right-6 opacity-100"
            : "w-16 h-16 top-2 right-2 opacity-0"
        }`}
      />
      <div
        className={`absolute border-t-2 border-l-2 border-green-400 transition-all duration-500 ease-out ${
          isHovered
            ? "w-6 h-6 top-6 left-6 opacity-100"
            : "w-16 h-16 top-2 left-2 opacity-0"
        }`}
      />
      <div
        className={`absolute border-b-2 border-l-2 border-green-400 transition-all duration-500 ease-out ${
          isHovered
            ? "w-6 h-6 bottom-6 left-6 opacity-100"
            : "w-16 h-16 bottom-2 left-2 opacity-0"
        }`}
      />
      <div
        className={`absolute border-b-2 border-r-2 border-green-400 transition-all duration-500 ease-out ${
          isHovered
            ? "w-6 h-6 bottom-6 right-6 opacity-100"
            : "w-16 h-16 bottom-2 right-2 opacity-0"
        }`}
      />

      {/* Animated CCTV Scan Effect - Only on hover */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent 0px, rgba(0,255,0,0.4) 1px, transparent 3px, rgba(0,255,0,0.1) 4px, transparent 6px)",
          animation: isHovered ? "urbanScan 3s linear infinite" : "none",
          mask: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
        }}
      />

      {/* Urban-specific styles */}
      <style jsx>{`
        @keyframes urbanScan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </>
  );
};

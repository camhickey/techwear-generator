"use client";
import React, { useState, useEffect } from "react";

type EffectProps = {
  isHovered: boolean;
};

export const OutdoorsEffect = ({ isHovered }: EffectProps) => {
  const [tick, setTick] = useState(0);

  // Only run time animation when hovered
  useEffect(() => {
    if (!isHovered) {
      setTick(0); // Reset time when not hovered
      return;
    }

    const interval = setInterval(() => {
      setTick((t) => t + 0.05);
    }, 50);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <>
      {/* Animated Sandstorm Base - Only on hover */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${
          isHovered ? "opacity-80" : "opacity-0"
        }`}
        style={{
          background: `linear-gradient(${
            tick * 30
          }deg, rgba(218,165,32,0.4) 0%, rgba(184,134,11,0.3) 50%, rgba(205,133,63,0.4) 100%)`,
          animation: isHovered ? "sandShift 3s ease-in-out infinite" : "none",
        }}
      />

      {/* Animated Sand Particle Storm - Only on hover */}
      {[...Array(50)].map((_, i) => {
        const size = Math.random() * 3 + 2;
        const layer = Math.floor(i / 33);
        const speed = (3 - layer) * 5;
        return (
          <div
            key={i}
            className={`absolute rounded-full pointer-events-none bg-amber-600 transition-opacity duration-700 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${((i * 7 + tick * speed * 10) % 120) - 10}%`,
              top: `${(i * 13) % 100}%`,
              opacity: isHovered
                ? (0.8 - layer * 0.15) * (0.5 + Math.sin(tick + i) * 0.5)
                : 0,
              filter: `blur(${layer * 0.5}px)`,
              boxShadow: `0 0 ${3 + size}px rgba(218,165,32,${
                0.4 - layer * 0.1
              })`,
            }}
          />
        );
      })}

      {/* Static Harsh Desert Vignette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 20%, rgba(139,69,19,0.4) 80%, rgba(90,40,10,0.6) 100%)",
        }}
      />

      {/* Animated Harsh Desert Vignette - Only on hover */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          isHovered ? "opacity-80" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 20%, rgba(139,69,19,0.6) 80%, rgba(90,40,10,0.8) 100%)",
        }}
      />

      {/* Animated Desert Heat Distortion - Only on hover */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${
          isHovered ? "opacity-40" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(ellipse at 50% ${
            70 + Math.sin(tick * 2) * 10
          }%, transparent 0%, rgba(255,140,0,0.2) 40%, transparent 70%)`,
          filter: "blur(30px)",
          animation: isHovered ? "heatWave 2s ease-in-out infinite" : "none",
        }}
      />

      {/* Animated Tactical HUD Overlay - Only on hover */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Corner HUD Elements */}
        <div
          className="absolute top-6 left-6 font-mono text-xs text-orange-400"
          style={{ textShadow: "0 0 10px rgba(255,140,0,0.8)" }}
        >
          <span>TERRAIN: ARID</span>
          <div className="opacity-80">HUMIDITY: 4%</div>
          <div className="opacity-80" suppressHydrationWarning>
            AMBIENT: {Math.floor(95 + Math.sin(tick * 0.2) * 5)}°F
          </div>
        </div>

        {/* Environmental Data */}
        <div
          className="absolute top-6 right-6 font-mono text-xs text-orange-400"
          style={{ textShadow: "0 0 10px rgba(255,140,0,0.8)" }}
        >
          <div className="text-right opacity-80">
            WIND: {Math.floor(15 + Math.sin(tick) * 3)} mph
          </div>
          <div className="text-right opacity-80">
            VISIBILITY: {Math.floor(200 + Math.sin(tick * 0.05) * 25)}ft
          </div>
          <div className="text-right flex items-center justify-end gap-2">
            <span>EXPOSURE:</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-3 ${
                    i < 4 ? "bg-orange-500" : "bg-orange-900/40"
                  }`}
                  style={{
                    boxShadow: i < 4 ? "0 0 5px rgba(255,140,0,0.6)" : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Outdoors-specific styles */}
      <style jsx>{`
        @keyframes sandShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes heatWave {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </>
  );
};

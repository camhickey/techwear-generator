"use client";
import React, { useState, useEffect, useRef } from "react";

type MatrixChar = {
  id: number;
  char: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
  isFirst: boolean;
};

const MatrixRain = ({ isHovered }: { isHovered: boolean }) => {
  const [matrixChars, setMatrixChars] = useState<MatrixChar[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const getRandomChar = () => {
    const chars = [
      ...Array.from({ length: 96 }, (_, i) => String.fromCharCode(0x30a0 + i)),
      ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@!%^&*()",
    ];
    return chars[Math.floor(Math.random() * chars.length)];
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.offsetWidth;
    const columns = Math.floor(width / 20);

    const initialChars: MatrixChar[] = [];
    for (let i = 0; i < columns; i++) {
      const charCount = Math.floor(Math.random() * 10) + 5;
      for (let j = 0; j < charCount; j++) {
        initialChars.push({
          id: i * 100 + j,
          char: getRandomChar(),
          x: (i * width) / columns,
          y: -(Math.random() * 100),
          speed: 1 + Math.random() * 5,
          opacity: j === 0 ? 1 : Math.max(0.2, 1 - j * 0.2),
          isFirst: j === 0,
        });
      }
    }
    setMatrixChars(initialChars);
  }, []);

  useEffect(() => {
    if (!isHovered) return;

    const interval = setInterval(() => {
      setMatrixChars((prev) =>
        prev.map((char) => {
          let newY = char.y + char.speed;
          let newChar = char.char;
          let newOpacity = char.opacity;

          if (newY > (containerRef.current?.offsetHeight || 600)) {
            newY = -30;
            newChar = getRandomChar();
            newOpacity = char.isFirst ? 1 : Math.max(0.1, char.opacity);
          }

          if (Math.random() > (char.isFirst ? 0.5 : 0.8))
            newChar = getRandomChar();

          if (!char.isFirst && Math.random() > 0.7)
            newOpacity = Math.max(0.05, char.opacity - 0.15);

          return {
            ...char,
            char: newChar,
            y: newY,
            opacity: newOpacity,
          };
        })
      );
    }, 30);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-300 ${
        isHovered ? "opacity-100" : "opacity-0"
      }`}
    >
      {matrixChars.map((char) => (
        <div
          key={char.id}
          className={`absolute font-mono pointer-events-none transition-all duration-75 ${
            char.isFirst ? "text-green-300 font-bold" : "text-green-600"
          }`}
          style={{
            left: `${char.x}px`,
            top: `${isHovered ? char.y : char.y}px`,
            opacity: char.opacity * (isHovered ? 1 : 0),
            textShadow: char.isFirst
              ? "0 0 12px rgba(0, 255, 0, 0.9), 0 0 20px rgba(0, 255, 100, 0.6)"
              : "0 0 6px rgba(0, 200, 0, 0.5)",
            filter: `blur(${char.isFirst ? 0 : 0.5}px) brightness(${
              char.isFirst ? 1.2 : 0.8
            })`,
            transform: `translateY(${char.y}px)`,
            fontSize: char.isFirst ? "13px" : "11px",
            fontWeight: char.isFirst ? "900" : "400",
          }}
        >
          {char.char}
        </div>
      ))}
    </div>
  );
};

type EffectProps = {
  isHovered: boolean;
};

export const CyberpunkEffect = ({ isHovered }: EffectProps) => {
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });
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

  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setGlitchOffset({
          x: (Math.random() - 0.5) * 20,
          y: (Math.random() - 0.5) * 20,
        });
      }, 80);
      return () => clearInterval(interval);
    } else {
      setGlitchOffset({ x: 0, y: 0 });
    }
  }, [isHovered]);

  return (
    <>
      {/* Animated Matrix Rain - Only on hover */}
      <MatrixRain isHovered={isHovered} />

      {/* Animated RGB Split Effect - Only on hover */}
      <div
        className={`absolute inset-0 mix-blend-screen pointer-events-none transition-all duration-300 ${
          isHovered ? "opacity-90" : "opacity-0"
        }`}
        style={{
          background: `linear-gradient(${
            tick * 80
          }deg, rgba(255,0,0,0.4), rgba(0,255,255,0.4))`,
          transform: isHovered
            ? `translate(${glitchOffset.x * 1.5}px, ${
                glitchOffset.y * 1.5
              }px) scale(1.02)`
            : "none",
          filter: isHovered ? "hue-rotate(90deg) contrast(1.3)" : "none",
        }}
      />
      <div
        className={`absolute inset-0 mix-blend-screen pointer-events-none transition-all duration-300 ${
          isHovered ? "opacity-90" : "opacity-0"
        }`}
        style={{
          background: `linear-gradient(${
            -tick * 80
          }deg, rgba(0,255,0,0.4), rgba(255,0,255,0.4))`,
          transform: isHovered
            ? `translate(${-glitchOffset.x * 1.2}px, ${
                -glitchOffset.y * 1.2
              }px) scale(1.01)`
            : "none",
          filter: isHovered ? "hue-rotate(180deg) brightness(1.2)" : "none",
        }}
      />

      {/* Animated Scanlines - Only on hover */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent 0px, rgba(0,255,0,0.6) 1px, transparent 2px, rgba(255,0,255,0.1) 3px, transparent 4px)",
          animation: isHovered ? "scan 1.5s linear infinite" : "none",
        }}
      />

      {/* Animated Digital Noise - Only on hover */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          isHovered ? "opacity-40" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg' %3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='8' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          animation: isHovered ? "noise 0.1s infinite" : "none",
          mixBlendMode: "overlay",
        }}
      />

      {/* Animated Neon Grid - Only on hover */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-100 ${
          isHovered ? "opacity-60" : "opacity-0"
        }`}
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(0,255,255,0.3) 40px, rgba(0,255,255,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,0,255,0.3) 40px, rgba(255,0,255,0.3) 41px)",
          transform: `perspective(500px) rotateX(60deg) scale(2.5) translateY(-40%)`,
          animation: isHovered ? "gridPulse 2s ease-in-out infinite" : "none",
        }}
      />

      {/* Cyberpunk-specific styles */}
      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        @keyframes noise {
          0%,
          100% {
            transform: translate(0, 0);
          }
          10% {
            transform: translate(-8%, -8%);
          }
          20% {
            transform: translate(-15%, 8%);
          }
          30% {
            transform: translate(8%, -15%);
          }
          40% {
            transform: translate(-8%, 20%);
          }
          50% {
            transform: translate(-15%, 8%);
          }
          60% {
            transform: translate(20%, 0);
          }
          70% {
            transform: translate(0, 15%);
          }
          80% {
            transform: translate(-20%, 0);
          }
          90% {
            transform: translate(15%, 8%);
          }
        }
        @keyframes gridPulse {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </>
  );
};

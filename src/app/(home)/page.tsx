"use client";
import { useState } from "react";
import { StyleCard, StyleInterface } from "@/app/(home)/_components";
import { styleConfigs } from "@/app/_config/styleConfig";
import { ClothingStyle } from "@/lib/supabase/types";

export default function Home() {
  const styles = Object.keys(styleConfigs) as ClothingStyle[];
  const [selectedStyle, setSelectedStyle] = useState<ClothingStyle>();

  if (selectedStyle)
    return (
      <StyleInterface
        style={selectedStyle}
        onBack={() => setSelectedStyle(undefined)}
      />
    );

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory md:grid md:grid-cols-4 md:overflow-hidden md:snap-none">
      {styles.map((style) => (
        <StyleCard
          key={style}
          style={style}
          onClick={() => setSelectedStyle(style)}
        />
      ))}
    </div>
  );
}

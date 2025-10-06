"use client";
import { useState } from "react";
import { StyleCard, StyleInterface } from "@/app/(home)/_components";
import { styleConfigs } from "@/app/_config/styleConfig";
import { ClothingStyle } from "@/lib/supabase/types";

export default function Home() {
  const styles = Object.keys(styleConfigs) as ClothingStyle[];
  const [selectedStyle, setSelectedStyle] = useState<ClothingStyle>();

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-4">
      {styles.map((style) => {
        if (selectedStyle === style)
          return <StyleInterface key={style} style={selectedStyle} />;
        return (
          <StyleCard
            key={style}
            style={style}
            onClick={() => setSelectedStyle(style)}
          />
        );
      })}
    </div>
  );
}

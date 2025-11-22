import { type ClothingCardProps } from "@/app/(home)/_components";
import { getClothing } from "@/lib/supabase/functions/getClothing";
import {
  type ClothingStyle,
  type ClothingColor,
  type ClothingArticle,
} from "@/lib/supabase/types";
import { useState, useEffect } from "react";

export function useOutfitItems(
  isOpen: boolean,
  style: ClothingStyle,
  colors: {
    headwear?: ClothingColor;
    top?: ClothingColor;
    pants?: ClothingColor;
    footwear?: ClothingColor;
  }
) {
  const [items, setItems] = useState<
    Record<ClothingArticle, ClothingCardProps | null>
  >({
    headwear: null,
    top: null,
    pants: null,
    footwear: null,
  });

  const [loading, setLoading] = useState<Record<ClothingArticle, boolean>>({
    headwear: false,
    top: false,
    pants: false,
    footwear: false,
  });

  const fetchItem = async (article: ClothingArticle, color?: ClothingColor) => {
    if (!color) return;
    setLoading((prev) => ({ ...prev, [article]: true }));
    const data = await getClothing({ article, color, style });
    setItems((prev) => ({
      ...prev,
      [article]: data
        ? {
            name: data.name,
            link: data.link,
            image: data.image,
            price: data.price,
          }
        : null,
    }));
    setLoading((prev) => ({ ...prev, [article]: false }));
  };

  useEffect(() => {
    if (!isOpen) return;
    fetchItem("headwear", colors.headwear);
    fetchItem("top", colors.top);
    fetchItem("pants", colors.pants);
    fetchItem("footwear", colors.footwear);
  }, [
    isOpen,
    style,
    colors.headwear,
    colors.top,
    colors.pants,
    colors.footwear,
  ]);

  return { items, loading, fetchItem };
}

import { supabase } from "@/lib/supabase/client";
import {
  ClothingArticle,
  ClothingColor,
  ClothingStyle,
} from "@/lib/supabase/types";

type GetClothingProps = {
  article: ClothingArticle;
  color: ClothingColor;
  style: ClothingStyle;
};

export async function getClothing({ article, color, style }: GetClothingProps) {
  const { data } = await supabase
    .from("clothing_picker_view")
    .select("name, link, image, price")
    .eq("article", article)
    .eq("color", color)
    .eq("style", style)
    .limit(1)
    .maybeSingle();
  if (!data) return null;
  return {
    name: data.name ?? "Unnamed item",
    link: data.link ?? "#",
    image: data.image ?? "/placeholder.png",
    price: data.price ?? 0,
  };
}

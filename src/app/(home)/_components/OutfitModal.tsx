import { useEffect, useRef } from "react";
import { ClothingCard } from "./ClothingCard";
import {
  type ClothingArticle,
  type ClothingColor,
  type ClothingStyle,
} from "@/lib/supabase/types";
import { useOutfitItems } from "@/hooks/useOutfitItems";

type OutfitModalProps = {
  style: ClothingStyle;
  headwearColor?: ClothingColor;
  topColor?: ClothingColor;
  pantsColor?: ClothingColor;
  footwearColor?: ClothingColor;
  isOpen: boolean;
  onClose: () => void;
};

const ARTICLES: readonly ClothingArticle[] = [
  "headwear",
  "top",
  "pants",
  "footwear",
] as const;

export function OutfitModal({
  style,
  headwearColor,
  topColor,
  pantsColor,
  footwearColor,
  isOpen,
  onClose,
}: OutfitModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const { items, loading, fetchItem } = useOutfitItems(isOpen, style, {
    headwear: headwearColor,
    top: topColor,
    pants: pantsColor,
    footwear: footwearColor,
  });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-black p-6 gap-4 border-2 border-white w-[90vw] max-h-[90vh] relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center flex-none font-mono">
          <h2 className="text-xl">{`YOUR ${style.toUpperCase()} OUTFIT`}</h2>
          <button onClick={onClose} className="hover:cursor-pointer p-2">
            CLOSE
          </button>
        </div>
        <div className="overflow-auto hide-scrollbar flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ARTICLES.map((article) => (
              <ClothingCard
                key={article}
                {...items[article]}
                isLoading={loading[article]}
                article={article}
                onReload={() =>
                  fetchItem(
                    article,
                    {
                      headwear: headwearColor,
                      top: topColor,
                      pants: pantsColor,
                      footwear: footwearColor,
                    }[article]
                  )
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

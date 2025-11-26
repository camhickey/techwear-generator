import { useEffect, useRef } from "react";
import {
  ClothingCard,
  ClothingCardEmpty,
  ClothingCardSkeleton,
} from "@/app/(home)/_components";
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

  const colorMap = {
    headwear: headwearColor,
    top: topColor,
    pants: pantsColor,
    footwear: footwearColor,
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-black p-6 gap-4 border-2 border-white w-[90vw] h-[90vh] relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center flex-none font-mono">
          <h2 className="text-xl">{`YOUR ${style.toUpperCase()} OUTFIT`}</h2>
          <button onClick={onClose} className="hover:cursor-pointer p-2">
            CLOSE
          </button>
        </div>
        <div className="overflow-auto flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ARTICLES.map((article) => {
              const item = items[article];
              const isLoading = loading[article];
              const hasItem =
                item &&
                item.name &&
                item.link &&
                item.image &&
                item.price !== undefined;
              if (isLoading)
                return <ClothingCardSkeleton key={article} article={article} />;
              if (!hasItem)
                return <ClothingCardEmpty key={article} article={article} />;
              return (
                <ClothingCard
                  key={article}
                  {...item}
                  onReload={() => fetchItem(article, colorMap[article])}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

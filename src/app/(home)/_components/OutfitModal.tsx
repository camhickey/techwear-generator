import { useEffect, useRef, useState } from "react";
import { ClothingCard, type ClothingCardProps } from "./ClothingCard";
import {
  type ClothingColor,
  type ClothingStyle,
  type ClothingArticle,
} from "@/lib/supabase/types";
import { getClothing } from "@/lib/supabase/functions/getClothing";

type OutfitModalProps = {
  style: ClothingStyle;
  headwearColor?: ClothingColor;
  topColor?: ClothingColor;
  pantsColor?: ClothingColor;
  footwearColor?: ClothingColor;
  isOpen: boolean;
  onClose: () => void;
};

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

  const [items, setItems] = useState<
    Record<ClothingArticle, ClothingCardProps | null>
  >({ headwear: null, top: null, pants: null, footwear: null });

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
    fetchItem("headwear", headwearColor);
    fetchItem("top", topColor);
    fetchItem("pants", pantsColor);
    fetchItem("footwear", footwearColor);
  }, [isOpen, style, headwearColor, topColor, pantsColor, footwearColor]);

  const renderCard = (article: ClothingArticle, color?: ClothingColor) => {
    const item = items[article];
    if (loading[article] || !item) {
      return (
        <div className="flex items-center justify-center h-64 w-full text-gray-500">
          {loading[article] ? "Loading..." : `No ${article} found`}
        </div>
      );
    }
    return (
      <ClothingCard {...item} onReload={() => fetchItem(article, color)} />
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-black p-6 border-2 border-white w-[90vw] max-h-[90vh] overflow-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-mono">{`YOUR ${style.toUpperCase()} OUTFIT`}</h2>
          <button
            onClick={onClose}
            className="hover:cursor-pointer font-mono p-4"
          >
            CLOSE
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {renderCard("headwear", headwearColor)}
          {renderCard("top", topColor)}
          {renderCard("pants", pantsColor)}
          {renderCard("footwear", footwearColor)}
        </div>
      </div>
    </div>
  );
}

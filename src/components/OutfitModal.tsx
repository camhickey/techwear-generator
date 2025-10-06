import { ClothingCard, ClothingCardProps, Modal, Spinner } from "@/components";
import {
  ClothingColor,
  ClothingStyle,
  ClothingArticle,
} from "@/lib/supabase/types";
import { getClothing } from "@/lib/supabase/functions/getClothing";
import { useEffect, useState } from "react";

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
    fetchItem("headwear", headwearColor);
    fetchItem("top", topColor);
    fetchItem("pants", pantsColor);
    fetchItem("footwear", footwearColor);
  }, [isOpen, style, headwearColor, topColor, pantsColor, footwearColor]);

  const renderCard = (article: ClothingArticle, color?: ClothingColor) => {
    const item = items[article];
    if (loading[article])
      return (
        <div className="flex items-center justify-center">
          <Spinner size={8} />
        </div>
      );
    if (!item)
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          No {article} found
        </div>
      );
    return (
      <ClothingCard
        {...item}
        onReload={() => fetchItem(article, color)}
        isReloading={loading[article]}
      />
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Your Fit" size="full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {renderCard("headwear", headwearColor)}
        {renderCard("top", topColor)}
        {renderCard("pants", pantsColor)}
        {renderCard("footwear", footwearColor)}
      </div>
    </Modal>
  );
}

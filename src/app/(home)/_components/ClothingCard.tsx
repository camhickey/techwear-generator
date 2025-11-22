import { Button } from "@/components";
import { type ClothingArticle } from "@/lib/supabase/types";

export type ClothingCardProps = {
  name?: string;
  link?: string;
  image?: string;
  price?: number;
  onReload: () => void;
  isLoading?: boolean;
  article: ClothingArticle;
};

export function ClothingCard({
  name,
  link,
  image,
  price,
  onReload,
  isLoading = false,
  article,
}: ClothingCardProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 w-full text-gray-500">
        <div className="text-center">
          <p className="font-mono">Loading...</p>
        </div>
      </div>
    );
  }

  if (!name || !link || !image || price === undefined) {
    return (
      <div className="flex flex-col items-center justify-center h-64 w-full text-gray-500 p-4 gap-3">
        <p className="font-mono">No {article} found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-black overflow-hidden border-2 border-white">
      <div className="relative aspect-square bg-black overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 gap-2 flex flex-col justify-between flex-1">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-white line-clamp-1 transition-colors">
            {name}
          </h3>
          <span className="font-bold text-white text-sm">
            ${(price / 100).toFixed(2)}
          </span>
        </div>
        <div className="flex flex-row gap-2">
          <Button className="w-full" onClick={onReload}>
            NEW ITEM
          </Button>
          <a
            className="w-full font-mono inline-flex items-center justify-center px-4 py-2 text-white hover:cursor-pointer border-2 border-white"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            BUY NOW
          </a>
        </div>
      </div>
    </div>
  );
}

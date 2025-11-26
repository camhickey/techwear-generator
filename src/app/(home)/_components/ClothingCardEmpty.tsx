import { type ClothingArticle } from "@/lib/supabase/types";

type ClothingCardEmptyProps = {
  article: ClothingArticle;
};

export function ClothingCardEmpty({ article }: ClothingCardEmptyProps) {
  return (
    <div className="flex justify-center items-center h-full">
      <span className="font-mono text-gray-500 uppercase text-sm">
        No {article} found
      </span>
    </div>
  );
}

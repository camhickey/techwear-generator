import { type ClothingArticle } from "@/lib/supabase/types";

type ClothingCardSkeletonProps = {
  article: ClothingArticle;
};

export function ClothingCardSkeleton({ article }: ClothingCardSkeletonProps) {
  return (
    <div className="flex flex-col justify-center items-center h-full gap-4">
      <div className="w-8 h-8 border-2 border-gray-500 border-t-white rounded-full animate-spin" />
      <span className="font-mono text-gray-500 uppercase text-sm">
        Loading {article}...
      </span>
    </div>
  );
}

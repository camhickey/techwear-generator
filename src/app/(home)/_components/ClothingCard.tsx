import { Button } from "@/components";

export type ClothingCardProps = {
  name: string;
  link: string;
  image: string;
  price: number;
  onReload: () => void;
};

export function ClothingCard({
  name,
  link,
  image,
  price,
  onReload,
}: ClothingCardProps) {
  return (
    <div className="flex flex-col bg-black overflow-hidden">
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
        <div className="flex gap-2">
          <Button className="flex-1" onClick={onReload}>
            NEW ITEM
          </Button>
          <a
            className="flex-1 font-mono inline-flex items-center justify-center px-4 py-2 text-white hover:cursor-pointer border-2 border-white"
            href={link}
            target="_blank"
          >
            BUY NOW
          </a>
        </div>
      </div>
    </div>
  );
}

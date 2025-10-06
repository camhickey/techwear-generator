import { Button } from "@/components";

export type ClothingCardProps = {
  name: string;
  link: string;
  image: string;
  price: number;
  onReload: () => void; // optional reload handler
  isReloading?: boolean; // optional spinner indicator
};

export function ClothingCard({
  name,
  link,
  image,
  price,
  onReload,
  isReloading = false,
}: ClothingCardProps) {
  return (
    <div className="flex flex-col bg-black border-2 border-white overflow-hidden">
      {/* Image */}
      <div className="relative aspect-square bg-black overflow-hidden">
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isReloading ? "opacity-50" : "opacity-100"
          }`}
        />
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
          <Button className="flex-1" onClick={onReload} disabled={isReloading}>
            NEW ITEM
          </Button>
          <Button className="flex-1">BUY NOW</Button>
        </div>
      </div>
    </div>
  );
}

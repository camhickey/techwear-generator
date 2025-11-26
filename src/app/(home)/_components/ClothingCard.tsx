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
    <div className="animate-fade-in flex flex-col h-full w-full">
      <img src={image} className="w-full h-[400px]" />
      <div className="p-4 gap-2 flex flex-col justify-between flex-1">
        <h1 className="text-lg uppercase font-mono text-center text-white line-clamp-1">
          {name}
        </h1>
        <span className="font-bold text-2xl text-white text-center">
          ${(price / 100).toFixed(2)}
        </span>
        <div className="flex flex-row gap-2">
          <button
            onClick={onReload}
            className="flex-1 font-bold inline-flex items-center justify-center text-white hover:cursor-pointer border-2 border-white px-4 py-2 hover:invert bg-black"
          >
            NEW ITEM
          </button>
          <a
            className="flex-1 font-bold inline-flex items-center justify-center text-white hover:cursor-pointer border-2 border-white px-4 py-2 hover:invert bg-black"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            BUY
          </a>
        </div>
      </div>
    </div>
  );
}

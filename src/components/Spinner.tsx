export function Spinner({ size = 6 }: { size?: number }) {
  return (
    <div
      className={`w-${size} h-${size} border-4 border-gray-300 border-t-white rounded-full animate-spin`}
    />
  );
}

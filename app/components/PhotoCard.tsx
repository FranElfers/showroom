import Image from "next/image";

interface PhotoCardProps {
  url: string;
}

export function PhotoCard({ url }: PhotoCardProps) {
  return (
    <div className="relative w-full aspect-square overflow-hidden group">
      <Image
        src={url}
        alt="Portfolio image"
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-1000 group-hover:scale-105"
      />
    </div>
  );
}

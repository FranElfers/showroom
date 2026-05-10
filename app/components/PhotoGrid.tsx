import { Photo } from "../constants";
import { PhotoCard } from "./PhotoCard";

interface PhotoGridProps {
  photos: Photo[];
}

export function PhotoGrid({ photos }: PhotoGridProps) {
  return (
    <div className="mx-auto max-w-[1600px] pt-20 pb-24 fade-in">
      <div className="grid grid-cols-3">
        {photos.map((photo, i) => (
          <PhotoCard key={`${photo.url}-${i}`} photo={photo} useLowQuality={true} />
        ))}
      </div>
    </div>
  );
}

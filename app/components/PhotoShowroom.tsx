import Image from "next/image";
import { Photo } from "../constants";

interface PhotoShowroomProps {
  photos: Photo[];
}

export function PhotoShowroom({ photos }: PhotoShowroomProps) {
  return (
    <div className="w-full fade-in pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {photos.map((photo, i) => {
          if (photo.orientation === "horizontal") {
            return (
              <div key={`${photo.url}-${i}`} className="col-span-1 md:col-span-2 w-full flex">
                <Image
                  src={photo.url}
                  width={2560}
                  height={1080}
                  alt="Photography"
                  className="w-full h-auto md:aspect-[21/9] md:object-cover"
                  sizes="100vw"
                  priority={i === 0}
                />
              </div>
            );
          } else {
            return (
              <div key={`${photo.url}-${i}`} className="col-span-1 w-full flex">
                <Image
                  src={photo.url}
                  width={1440}
                  height={1440}
                  alt="Photography"
                  className="w-full h-auto md:aspect-square md:object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={i < 2}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

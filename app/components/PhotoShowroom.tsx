import Image from "next/image";
import { Photo } from "../constants";
import { CameraStats } from "./CameraStats";

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
              <div
                key={`${photo.url}-${i}`}
                className="col-span-1 md:col-span-2 relative w-full aspect-[2/1] overflow-hidden group"
              >
                <Image
                  src={photo.url}
                  fill
                  alt="Photography"
                  quality={100}
                  className="object-cover"
                  sizes="100vw"
                  priority={i === 0}
                />
                <CameraStats camera={photo.camera} />
              </div>
            );
          } else {
            return (
              <div key={`${photo.url}-${i}`} className="col-span-1 w-full flex relative group">
                <Image
                  src={photo.url}
                  width={1440}
                  height={1800}
                  alt="Photography"
                  quality={100}
                  className="w-full h-auto md:aspect-[4/5] md:object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={i < 2}
                />
                <CameraStats camera={photo.camera} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

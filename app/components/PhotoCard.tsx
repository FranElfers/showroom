import Image from "next/image";

import { Photo } from "../constants";
import { CameraStats } from "./CameraStats";

interface PhotoCardProps {
  photo: Photo;
  useLowQuality: boolean;
}

export function PhotoCard({ photo, useLowQuality }: PhotoCardProps) {
  const src = useLowQuality ? photo.urlLowQuality : photo.url;

  return (
    <div className="relative w-full aspect-square overflow-hidden group">
      <Image
        src={src}
        alt="Portfolio image"
        fill
        quality={25}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
      />
      <CameraStats camera={photo.camera} />
    </div>
  );
}

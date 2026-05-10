import Image from "next/image";

import { Photo } from "../constants";
import { CameraStats } from "./CameraStats";

interface PhotoCardProps {
  photo: Photo;
}

export function PhotoCard({ photo }: PhotoCardProps) {
  return (
    <div className="relative w-full aspect-square overflow-hidden group">
      <Image
        src={photo.url}
        alt="Portfolio image"
        fill
        quality={100}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      <CameraStats camera={photo.camera} />
    </div>
  );
}

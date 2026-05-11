"use client"

import { Photo } from "../constants"
import { PhotoCard } from "./PhotoCard"

/** Props for {@link PhotoGrid}. */
interface PhotoGridProps {
  /** Photos for the current category (or flattened “todos” list from the page). */
  photos: Photo[]
  /** Opens the lightbox; parent should update the URL (e.g. `photo` query). */
  onOpenPhoto: (photo: Photo) => void
}

/**
 * Three-column thumbnail grid with low-res assets; clicking a tile calls {@link onOpenPhoto}.
 */
export function PhotoGrid({ photos, onOpenPhoto }: PhotoGridProps) {
  return (
    <div className="mx-auto max-w-[1600px] pt-20 pb-24 fade-in">
      <div className="grid grid-cols-3">
        {photos.map((photo, i) => (
          <PhotoCard
            key={`${photo.url}-${i}`}
            photo={photo}
            useLowQuality={true}
            onOpen={() => onOpenPhoto(photo)}
          />
        ))}
      </div>
    </div>
  )
}

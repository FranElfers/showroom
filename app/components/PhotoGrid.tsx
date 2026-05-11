"use client"

import { useState } from "react"
import { Photo } from "../constants"
import { PhotoCard } from "./PhotoCard"
import { PhotoLightbox } from "./PhotoLightbox"

/** Props for {@link PhotoGrid}. */
interface PhotoGridProps {
  /** Photos for the current category (or flattened “todos” list from the page). */
  photos: Photo[]
}

/**
 * Three-column thumbnail grid with low-res assets; clicking a tile opens {@link PhotoLightbox}.
 */
export function PhotoGrid({ photos }: PhotoGridProps) {
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null)

  return (
    <div className="mx-auto max-w-[1600px] pt-20 pb-24 fade-in">
      <div className="grid grid-cols-3">
        {photos.map((photo, i) => (
          <PhotoCard
            key={`${photo.url}-${i}`}
            photo={photo}
            useLowQuality={true}
            onOpen={() => setLightboxPhoto(photo)}
          />
        ))}
      </div>
      {lightboxPhoto ? (
        <PhotoLightbox photo={lightboxPhoto} onClose={() => setLightboxPhoto(null)} />
      ) : null}
    </div>
  )
}

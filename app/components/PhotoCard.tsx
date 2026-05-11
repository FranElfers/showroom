import Image from "next/image"
import { Photo } from "../constants"
import { CameraStats } from "./CameraStats"

/** Props for {@link PhotoCard}. */
interface PhotoCardProps {
  photo: Photo
  /** When true, loads `photo.urlLowQuality` instead of `photo.url`. */
  useLowQuality: boolean
  /** If set, the tile renders as a `<button>` and invokes this handler (e.g. open lightbox). */
  onOpen?: () => void
}

/**
 * Square grid cell with cover-cropped image and hover {@link CameraStats}.
 */
export function PhotoCard({ photo, useLowQuality, onOpen }: PhotoCardProps) {
  const src = useLowQuality ? photo.urlLowQuality : photo.url

  const shellClass =
    "relative w-full aspect-square overflow-hidden group border-0 bg-transparent p-0"

  const inner = (
    <>
      <Image
        src={src}
        alt="Portfolio image"
        fill
        quality={25}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
      />
      <CameraStats camera={photo.camera} />
    </>
  )

  if (onOpen) {
    return (
      <button type="button" onClick={onOpen} className={`${shellClass} block w-full cursor-pointer`}>
        {inner}
      </button>
    )
  }

  return <div className={shellClass}>{inner}</div>
}

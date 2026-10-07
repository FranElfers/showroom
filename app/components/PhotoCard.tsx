import { prefetchImage } from "../lib/prefetchImage"
import { GRID_IMAGE_SIZES, Photo } from "../constants"
import { CameraStats } from "./CameraStats"
import { FadeImage } from "./FadeImage"

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
      <FadeImage
        src={src}
        alt="Portfolio image"
        fill
        quality={useLowQuality ? 75 : 100}
        unoptimized={!useLowQuality}
        sizes={GRID_IMAGE_SIZES}
        className="object-cover"
      />
      <CameraStats camera={photo.camera} />
    </>
  )

  if (onOpen) {
    return (
      <button
        type="button"
        onClick={onOpen}
        onMouseEnter={() => {
          prefetchImage(photo.url)?.catch(() => {})
        }}
        onFocus={() => {
          prefetchImage(photo.url)?.catch(() => {})
        }}
        className={`${shellClass} block w-full cursor-pointer`}
      >
        {inner}
      </button>
    )
  }

  return <div className={shellClass}>{inner}</div>
}

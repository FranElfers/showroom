import type { Photo } from "../constants"
import { photos } from "../constants"

/** Last path segment of the photo URL, decoded (e.g. `PIC03277.webp`). */
export function slugFromPhotoUrl(url: string): string {
  try {
    const { pathname } = new URL(url)
    const seg = pathname.split("/").filter(Boolean).pop() ?? ""
    return decodeURIComponent(seg)
  } catch {
    return ""
  }
}

/** First photo whose full-res URL basename matches `slug`. */
export function findPhotoBySlug(slug: string, list: Photo[]): Photo | undefined {
  if (!slug) return undefined
  return list.find((p) => slugFromPhotoUrl(p.url) === slug)
}

/** First `photos` bucket that contains this asset, or `null` if none. */
export function findCategoryForPhoto(photo: Photo): keyof typeof photos | null {
  for (const key of Object.keys(photos) as (keyof typeof photos)[]) {
    if (photos[key].some((p) => p.url === photo.url)) return key
  }
  return null
}

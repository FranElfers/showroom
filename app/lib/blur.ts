import type { Photo } from "../constants"
import { BLUR_DATA } from "./blurData"
import { slugFromPhotoUrl } from "./photoSlug"

/** Tiny inline preview (`src` data URI) and aspect ratio for a photo, if `pnpm blur` generated one. */
export function getBlur(photo: Photo): { src: string; ratio: number } | undefined {
  return BLUR_DATA[slugFromPhotoUrl(photo.url)]
}

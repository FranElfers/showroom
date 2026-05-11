/** Landscape vs portrait slot behavior in showroom and grid. */
export type Orientation = "horizontal" | "vertical"

/** One image record: full + thumbnail URLs, layout role, and EXIF for overlays. */
export interface Photo {
  /** Full-resolution asset (showroom, grid lightbox). */
  url: string
  /** Smaller asset for grid thumbnails. */
  urlLowQuality: string
  orientation: Orientation
  camera: {
    iso: number
    aperture: string
    shutterSpeed: string
    focalLength: string
  }
}

const DOMAIN = "https://pub-5958fc211cfb4fe3b82f038c6d7b08b7.r2.dev/"

/**
 * Canonical photo buckets by category key. Keys drive {@link Navbar} tabs
 * `"todos"` is synthetic and built in `page.tsx` from `Object.values(photos).flat()`.
 */
export const photos: Record<string, Photo[]> = {
  sur: [
    {
      url: DOMAIN + "PIC03277.webp",
      urlLowQuality: DOMAIN + "PIC03277-sm.webp",
      orientation: "horizontal" as Orientation,
      camera: {
        iso: 500,
        aperture: "f/9",
        shutterSpeed: "1/800s",
        focalLength: "16mm"
      }
    },
    {
      url: DOMAIN + "PIC04257.webp",
      urlLowQuality: DOMAIN + "PIC04257-sm.webp",
      orientation: "horizontal" as Orientation,
      camera: {
        iso: 1000,
        aperture: "f/9",
        shutterSpeed: "1/200s",
        focalLength: "16mm"
      }
    },
    {
      url: DOMAIN + "PIC03152.webp",
      urlLowQuality: DOMAIN + "PIC03152-sm.webp",
      orientation: "horizontal" as Orientation,
      camera: {
        iso: 500,
        aperture: "f/9",
        shutterSpeed: "1/640s",
        focalLength: "16mm"
      }
    },
    {
      url: DOMAIN + "PIC03215.webp",
      urlLowQuality: DOMAIN + "PIC03215-sm.webp",
      orientation: "vertical" as Orientation,
      camera: {
        iso: 125,
        aperture: "f/5.6",
        shutterSpeed: "1/250s",
        focalLength: "28mm"
      }
    },
    {
      url: DOMAIN + "PIC03308.webp",
      urlLowQuality: DOMAIN + "PIC03308-sm.webp",
      orientation: "vertical" as Orientation,
      camera: {
        iso: 160,
        aperture: "f/10",
        shutterSpeed: "1/200s",
        focalLength: "43mm"
      }
    },
    {
      url: DOMAIN + "PIC03122.webp",
      urlLowQuality: DOMAIN + "PIC03122-sm.webp",
      orientation: "horizontal" as Orientation,
      camera: {
        iso: 2000,
        aperture: "f/5.6",
        shutterSpeed: "1/1250s",
        focalLength: "37mm"
      }
    },
    {
      url: DOMAIN + "PIC02099.webp",
      urlLowQuality: DOMAIN + "PIC02099-sm.webp",
      orientation: "horizontal" as Orientation,
      camera: {
        iso: 100,
        aperture: "f/5",
        shutterSpeed: "1/1600s",
        focalLength: "32mm"
      }
    },
  ],
  bsas: [
    {
      url: DOMAIN + "PIC02406-Pano.webp",
      urlLowQuality: DOMAIN + "PIC02406-Pano-sm.webp",
      orientation: "horizontal" as Orientation,
      camera: {
        iso: 400,
        aperture: "f/5.6",
        shutterSpeed: "1/100s",
        focalLength: "50mm"
      }
    },
    {
      url: DOMAIN + "PIC02307-Pano.webp",
      urlLowQuality: DOMAIN + "PIC02307-Pano-sm.webp",
      orientation: "horizontal" as Orientation,
      camera: {
        iso: 100,
        aperture: "f/8",
        shutterSpeed: "0.8s",
        focalLength: "50mm"
      }
    },
  ]
}

/** Navbar selection: aggregate tab or a key of {@link photos}. */
export type Category = "todos" | keyof typeof photos
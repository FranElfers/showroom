export type Orientation = "horizontal" | "vertical";

export interface Photo {
  url: string;
  orientation: Orientation;
  camera: {
    iso: number;
    aperture: string;
    shutterSpeed: string;
    focalLength: string;
  }
}

export const photos = {
  sur: [
    {
      url: "https://pub-5958fc211cfb4fe3b82f038c6d7b08b7.r2.dev/PIC03277.webp",
      orientation: "horizontal" as Orientation,
      camera: {
        iso: 500,
        aperture: "f/9",
        shutterSpeed: "1/800s",
        focalLength: "16mm"
      }
    },
    {
      url: "https://pub-5958fc211cfb4fe3b82f038c6d7b08b7.r2.dev/Atardecer-full.webp",
      orientation: "horizontal" as Orientation,
      camera: {
        iso: 1000,
        aperture: "f/9",
        shutterSpeed: "1/200s",
        focalLength: "16mm"
      }
    },
    {
      url: "https://pub-5958fc211cfb4fe3b82f038c6d7b08b7.r2.dev/PIC03152.webp",
      orientation: "horizontal" as Orientation,
      camera: {
        iso: 500,
        aperture: "f/9",
        shutterSpeed: "1/640s",
        focalLength: "16mm"
      }
    },
    {
      url: "https://pub-5958fc211cfb4fe3b82f038c6d7b08b7.r2.dev/PIC03215.webp",
      orientation: "vertical" as Orientation,
      camera: {
        iso: 125,
        aperture: "f/5.6",
        shutterSpeed: "1/250s",
        focalLength: "28mm"
      }
    },
    {
      url: "https://pub-5958fc211cfb4fe3b82f038c6d7b08b7.r2.dev/PIC03308.webp",
      orientation: "vertical" as Orientation,
      camera: {
        iso: 160,
        aperture: "f/10",
        shutterSpeed: "1/200s",
        focalLength: "43mm"
      }
    },
    {
      url: "https://pub-5958fc211cfb4fe3b82f038c6d7b08b7.r2.dev/PIC03122.webp",
      orientation: "horizontal" as Orientation,
      camera: {
        iso: 2000,
        aperture: "f/5.6",
        shutterSpeed: "1/1250s",
        focalLength: "37mm"
      }
    },
  ],
  norte: [
    {
      url: "https://pub-5958fc211cfb4fe3b82f038c6d7b08b7.r2.dev/PIC02099.webp",
      orientation: "horizontal" as Orientation,
      camera: {
        iso: 100,
        aperture: "f/5",
        shutterSpeed: "1/1600s",
        focalLength: "32mm"
      }
    }
  ]
};

export type Category = "todos" | keyof typeof photos;
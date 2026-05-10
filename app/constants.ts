export type Orientation = "horizontal" | "vertical";

export interface Photo {
  url: string;
  orientation: Orientation;
}

export const photos = {
  sur: [
    {
      url: "https://pub-5958fc211cfb4fe3b82f038c6d7b08b7.r2.dev/PIC03277.webp",
      orientation: "horizontal" as Orientation
    },
    {
      url: "https://pub-5958fc211cfb4fe3b82f038c6d7b08b7.r2.dev/Atardecer-full.webp",
      orientation: "horizontal" as Orientation
    },
    {
      url: "https://pub-5958fc211cfb4fe3b82f038c6d7b08b7.r2.dev/PIC03215.webp",
      orientation: "vertical" as Orientation
    },
    {
      url: "https://pub-5958fc211cfb4fe3b82f038c6d7b08b7.r2.dev/PIC03308.webp",
      orientation: "vertical" as Orientation
    },
    {
      url: "https://pub-5958fc211cfb4fe3b82f038c6d7b08b7.r2.dev/PIC03122.webp",
      orientation: "horizontal" as Orientation
    },
  ],
  norte: [
    {
      url: "https://pub-5958fc211cfb4fe3b82f038c6d7b08b7.r2.dev/PIC02099.webp",
      orientation: "horizontal" as Orientation
    }
  ]
};

export type Category = "todos" | keyof typeof photos;
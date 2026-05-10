export type Orientation = "horizontal" | "vertical";

export interface Photo {
  url: string;
  orientation: Orientation;
}

export const photos = {
  sur: [
    {
      url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop",
      orientation: "horizontal" as Orientation
    },
    {
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
      orientation: "vertical" as Orientation
    },
    {
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
      orientation: "vertical" as Orientation
    }
  ],
  norte: [
    {
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop",
      orientation: "horizontal" as Orientation
    },
    {
      url: "https://images.unsplash.com/photo-1506744626753-1fa44df14d28?q=80&w=1964&auto=format&fit=crop",
      orientation: "vertical" as Orientation
    },
    {
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
      orientation: "vertical" as Orientation
    }
  ]
};

export type Category = "todos" | keyof typeof photos;
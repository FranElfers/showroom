"use client";

import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { PhotoShowroom } from "./components/PhotoShowroom";
import { PhotoGrid } from "./components/PhotoGrid";
import { photos, Category } from "./constants";

export default function Home() {
  const [category, setCategory] = useState<Category>("todos");
  const [view, setView] = useState<"showroom" | "grid">("showroom");

  const currentPhotos =
    category === "todos"
      ? Object.values(photos).flat()
      : photos[category as keyof typeof photos] || [];

  return (
    <main className="min-h-screen bg-black/90">
      <Navbar
        currentCategory={category}
        currentView={view}
        onCategoryChange={setCategory}
        onViewChange={setView}
      />

      <div key={`${category}-${view}`}>
        {view === "showroom" ? (
          <PhotoShowroom photos={currentPhotos} />
        ) : (
          <PhotoGrid photos={currentPhotos} />
        )}
      </div>
    </main>
  );
}

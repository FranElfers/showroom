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

      <div className="w-full pb-24 pt-12 flex justify-center mt-auto">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-white uppercase tracking-[0.3em] text-xs transition-opacity duration-500 hover:opacity-50"
        >
          fin
        </button>
      </div>
    </main>
  );
}

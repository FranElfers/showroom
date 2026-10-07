"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "./components/Navbar";
import { PhotoShowroom } from "./components/PhotoShowroom";
import { PhotoGrid } from "./components/PhotoGrid";
import { PhotoLightbox } from "./components/PhotoLightbox";
import { photos, Category, Photo } from "./constants";
import {
  findCategoryForPhoto,
  findPhotoBySlug,
  slugFromPhotoUrl,
} from "./lib/photoSlug";

const ALL_PHOTOS = Object.values(photos).flat();

type ViewMode = "showroom" | "grid";

function parseCategory(raw: string | null): Category {
  if (!raw) return "todos";
  if (raw === "todos") return "todos";
  if (raw in photos) return raw as Category;
  return "todos";
}

function parseView(raw: string | null): ViewMode {
  if (raw === "grid") return "grid";
  return "showroom";
}

function buildQuery(state: {
  category: Category;
  view: ViewMode;
  photo?: string | null;
}): string {
  const params = new URLSearchParams();
  if (state.category !== "todos") params.set("category", state.category);
  if (state.view !== "showroom") params.set("view", state.view);
  if (state.photo) params.set("photo", state.photo);
  const s = params.toString();
  return s ? `?${s}` : "";
}

function HomeContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = parseCategory(searchParams.get("category"));
  const view = parseView(searchParams.get("view"));
  const photoSlugRaw = searchParams.get("photo");
  const photoSlug = photoSlugRaw?.trim() || null;

  const lightboxPhoto =
    photoSlug != null ? findPhotoBySlug(photoSlug, ALL_PHOTOS) : undefined;

  const currentPhotos =
    category === "todos"
      ? ALL_PHOTOS
      : photos[category as keyof typeof photos] || [];

  useEffect(() => {
    if (!photoSlug || lightboxPhoto) return;
    router.replace(pathname + buildQuery({ category, view, photo: null }), {
      scroll: false,
    });
  }, [photoSlug, lightboxPhoto, router, pathname, category, view]);

  useEffect(() => {
    if (!lightboxPhoto || !photoSlug) return;
    if (category === "todos") return;
    const list = photos[category as keyof typeof photos] || [];
    const visible = list.some((p) => p.url === lightboxPhoto.url);
    if (visible) return;
    const bucket = findCategoryForPhoto(lightboxPhoto);
    const nextCat: Category = bucket ?? "todos";
    router.replace(
      pathname + buildQuery({ category: nextCat, view, photo: photoSlug }),
      { scroll: false },
    );
  }, [lightboxPhoto, photoSlug, category, view, pathname, router]);

  const replaceState = (next: {
    category: Category;
    view: ViewMode;
    photo?: string | null;
  }) => {
    router.replace(pathname + buildQuery(next), { scroll: false });
  };

  const onCategoryChange = (c: Category) => {
    replaceState({ category: c, view, photo: null });
  };

  const onViewChange = (v: ViewMode) => {
    replaceState({ category, view: v, photo: photoSlug });
  };

  const onOpenPhoto = (photo: Photo) => {
    const slug = slugFromPhotoUrl(photo.url);
    router.push(pathname + buildQuery({ category, view, photo: slug }), {
      scroll: false,
    });
  };

  const lightboxIndex = lightboxPhoto
    ? currentPhotos.findIndex((p) => p.url === lightboxPhoto.url)
    : -1;
  const canNavigate = lightboxIndex !== -1 && currentPhotos.length > 1;

  /** Moves the lightbox `step` photos within the current category, wrapping at the ends. */
  const stepLightbox = (step: number) => {
    const n = currentPhotos.length;
    const target = currentPhotos[(lightboxIndex + step + n) % n];
    // replace (not push) so Back still leaves the lightbox in one step.
    replaceState({
      category,
      view,
      photo: slugFromPhotoUrl(target.url),
    });
  };

  const onCloseLightbox = () => {
    replaceState({ category, view, photo: null });
  };

  return (
    <main className="min-h-screen bg-black/90">
      <Navbar
        currentCategory={category}
        currentView={view}
        onCategoryChange={onCategoryChange}
        onViewChange={onViewChange}
      />

      <div key={`${category}-${view}`}>
        {view === "showroom" ? (
          <PhotoShowroom photos={currentPhotos} />
        ) : (
          <PhotoGrid photos={currentPhotos} onOpenPhoto={onOpenPhoto} />
        )}
      </div>

      {lightboxPhoto ? (
        <PhotoLightbox
          photo={lightboxPhoto}
          onClose={onCloseLightbox}
          onPrev={canNavigate ? () => stepLightbox(-1) : undefined}
          onNext={canNavigate ? () => stepLightbox(1) : undefined}
          prefetchUrls={
            canNavigate
              ? [-1, 1].map(
                  (d) =>
                    currentPhotos[
                      (lightboxIndex + d + currentPhotos.length) %
                        currentPhotos.length
                    ].url,
                )
              : undefined
          }
        />
      ) : null}

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

export default function Home() {
  return (
    <Suspense
      fallback={<main className="min-h-screen bg-black/90" aria-hidden />}
    >
      <HomeContent />
    </Suspense>
  );
}

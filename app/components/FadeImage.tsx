"use client"

import { useCallback, useState } from "react"
import Image, { ImageProps } from "next/image"

/** Props for {@link FadeImage}: all `next/image` props plus an optional blurred underlay. */
interface FadeImageProps extends Omit<ImageProps, "onLoad"> {
  /** Small asset shown blurred under the image until the real one has loaded (progressive feel). */
  placeholderSrc?: string
}

/**
 * `next/image` that fades in once decoded, over a dark pulsing placeholder (and, optionally, a
 * blurred low-res underlay), with a centered "Cargando" label and indeterminate bar (an `<img>`
 * exposes no byte progress, so the bar is animated rather than proportional). Render it inside a
 * `relative` parent: the placeholder layers are absolutely positioned. Slow networks show a calm
 * gray block instead of images popping in. The placeholder layers stay mounted under the image:
 * browsers drop the decoded bitmap of large offscreen images, so on a fast scroll back they show
 * through while the image re-decodes (the image itself is `relative` so it paints above them even
 * when in normal flow) instead of a black flash.
 */
export function FadeImage({ placeholderSrc, className = "", alt, ...props }: FadeImageProps) {
  const [loaded, setLoaded] = useState(false)

  /** Marks the image as ready after decode so the fade never starts on an undecoded bitmap. */
  const markLoaded = useCallback((img: HTMLImageElement) => {
    const done = () => setLoaded(true)
    if (typeof img.decode === "function") img.decode().then(done, done)
    else done()
  }, [])

  return (
    <>
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-[#2a2a2a] ${loaded ? "" : "loading-pulse"}`}
      />
      {placeholderSrc && (
        // Clipped so the blur/scale never bleeds onto neighbouring (flush) photos.
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={placeholderSrc}
            alt=""
            className="h-full w-full scale-110 object-cover blur-xl"
          />
        </div>
      )}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 transition-opacity duration-500 motion-reduce:transition-none ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/70">Cargando</span>
        <div className="relative h-px w-16 overflow-hidden bg-white/20 sm:w-24">
          <div className="loading-bar absolute inset-y-0 w-1/3 bg-white/80 motion-reduce:w-full motion-reduce:animate-none" />
        </div>
      </div>
      <Image
        {...props}
        alt={alt}
        ref={(img) => {
          // Cached images can finish before hydration, so `onLoad` would never fire.
          if (!loaded && img?.complete && img.naturalWidth > 0) markLoaded(img)
        }}
        onLoad={(e) => markLoaded(e.currentTarget)}
        className={`relative ${className} transition-opacity duration-700 ease-out motion-reduce:transition-none ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  )
}

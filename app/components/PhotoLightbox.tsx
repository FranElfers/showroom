"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"

import { Photo } from "../constants"
import { prefetchImage } from "../lib/prefetchImage"
import { CameraStats } from "./CameraStats"

/** Duration (ms) for backdrop/content fade and scale; must match Tailwind `duration-300` on the modal. */
const TRANSITION_MS = 300

/** Props for {@link PhotoLightbox}. */
interface PhotoLightboxProps {
  /** Photo to display at full resolution (`photo.url`). */
  photo: Photo
  /** Called after the close animation finishes; parent should clear lightbox state. */
  onClose: () => void
}

/** Minimal X icon for the fixed close control. */
function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  )
}

/**
 * Full-viewport lightbox for grid view: portaled to `document.body`, translucent backdrop,
 * centered image with EXIF strip, and deferred `onClose` after exit animation.
 * Locks page scroll via `document.body.style.overflow` while mounted.
 */
export function PhotoLightbox({ photo, onClose }: PhotoLightboxProps) {
  const [open, setOpen] = useState(false)
  /** Full-res decode finished; until then the grid thumbnail stays visible (usually cached). */
  const [fullResReady, setFullResReady] = useState(false)
  /** Avoid `createPortal(..., document.body)` during SSR / prerender where `document` is undefined. */
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closingRef = useRef(false)

  useEffect(() => {
    setFullResReady(false)
  }, [photo.url])

  useLayoutEffect(() => {
    prefetchImage(photo.url)?.catch(() => {})
  }, [photo.url])

  /** Runs the exit animation, then invokes `onClose`. Ignored while a close is already in progress. */
  const requestClose = useCallback(() => {
    if (closingRef.current) return
    closingRef.current = true
    setOpen(false)
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null
      closingRef.current = false
      onClose()
    }, TRANSITION_MS)
  }, [onClose])

  useEffect(() => {
    setPortalEl(document.body)
  }, [])

  useEffect(() => {
    if (!portalEl) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const id = requestAnimationFrame(() => setOpen(true))
    return () => {
      cancelAnimationFrame(id)
      document.body.style.overflow = prev
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [portalEl])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [requestClose])

  const modal = (
    <div
      className={`fixed inset-0 z-[60] transition-[background-color] duration-300 ease-out ${
        open ? "bg-black/70" : "bg-black/0"
      }`}
      onClick={requestClose}
      role="presentation"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          requestClose()
        }}
        className={`fixed right-4 top-4 z-[100] p-3 text-white/90 transition-all duration-300 hover:text-white hover:opacity-70 sm:right-6 sm:top-6 md:right-10 md:top-10 pointer-events-auto ${
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
        }`}
        aria-label="Close"
      >
        <CloseIcon />
      </button>

      <div className="pointer-events-none grid h-full w-full place-items-center">
        <div
          className={`pointer-events-auto transition-[opacity,transform] duration-300 ease-out ${
            open ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"
          }`}
          onClick={(e) => e.stopPropagation()}
          role="presentation"
        >
          <div className="relative group max-h-[calc(100dvh-2rem)] max-w-[calc(100dvw-2rem)]">
            <img
              src={photo.urlLowQuality}
              alt=""
              aria-hidden
              className={`block h-auto max-h-[calc(100dvh-2rem)] w-auto max-w-[calc(100dvw-2rem)] object-contain transition-opacity duration-300 ${
                fullResReady ? "opacity-0" : "opacity-100"
              }`}
            />
            <Image
              src={photo.url}
              width={2560}
              height={1700}
              alt="Photography"
              quality={100}
              unoptimized
              onLoad={() => setFullResReady(true)}
              className={`absolute left-1/2 top-1/2 block h-auto max-h-[calc(100dvh-2rem)] w-auto max-w-[calc(100dvw-2rem)] -translate-x-1/2 -translate-y-1/2 object-contain transition-opacity duration-300 ${
                fullResReady ? "opacity-100" : "opacity-0"
              }`}
              sizes="100vw"
              priority
            />
            <CameraStats camera={photo.camera} alwaysVisible />
          </div>
        </div>
      </div>
    </div>
  )

  if (!portalEl) return null

  return createPortal(modal, portalEl)
}

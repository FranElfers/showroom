/**
 * Deduplicated full-URL image prefetch for the browser HTTP cache.
 *
 * Repeated hovers, focus, or lightbox open share one in-flight load per URL; after a
 * successful load, further calls resolve without starting another request.
 *
 * **CDN:** Reliable cache hits still depend on `Cache-Control` from R2/Cloudflare
 * (e.g. `public, max-age=31536000, immutable` for fingerprinted filenames). Without
 * that, the client may revalidate (304) or refetch even when a response exists.
 */

const inflight = new Map<string, Promise<void>>()
const settled = new Map<string, Promise<void>>()

/**
 * Prefetch an image URL into the HTTP cache. Safe to call from hover, focus, or effects.
 * @returns Promise that settles when the image has loaded, or void on the server.
 */
export function prefetchImage(url: string): Promise<void> | undefined {
  if (typeof window === "undefined") return undefined

  const cached = settled.get(url)
  if (cached) return cached

  const pending = inflight.get(url)
  if (pending) return pending

  const promise = new Promise<void>((resolve, reject) => {
    const img = document.createElement("img")
    img.decoding = "async"
    img.onload = () => resolve()
    img.onerror = () => reject(new Error(`prefetch failed: ${url}`))
    img.src = url
  })
    .then(() => {
      const done = Promise.resolve()
      settled.set(url, done)
    })
    .catch(() => {
      /* allow retry on next hover */
    })
    .finally(() => {
      inflight.delete(url)
    })

  inflight.set(url, promise)
  return promise
}

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Architecture & Agent Guidelines

## Architecture Overview
The project is built with Next.js App Router, using React Server Components by default but with a main Client Component wrapper (`app/page.tsx`) to handle smooth UI transitions. **Category, showroom vs grid view, and the optional lightbox** are driven by the URL query string (`useSearchParams`) so state is shareable and restorable; the default export wraps the inner shell in `<Suspense>` because `useSearchParams` requires it.

## Component Responsibilities
- `app/page.tsx`: The main orchestrator. Reads **`category`**, **`view`**, and **`photo`** from the query string (validated; omitted params default to `todos`, `showroom`, no lightbox). Writes the URL via `router.replace` (navbar, view switch, close lightbox) or `router.push` (open lightbox from grid so Back dismisses the modal). Renders `PhotoLightbox` at the page level so `?photo=…` works in showroom or grid. If `photo` resolves but the current `category` bucket does not contain that image, replaces `category` with the bucket that does. Includes a dynamic "fin" back-to-top button.
- `app/components/Navbar.tsx`: Minimal top navigation. Features a white-to-transparent gradient and automatically hides when the user scrolls down for an immersive experience.
- `app/components/ViewModeSwitch.tsx`: Simple component to toggle between "Showroom" and "Grid" layouts.
- `app/components/PhotoShowroom.tsx`: Renders the cinematic view. Completely edge-to-edge layout with zero gaps. Horizontal photos use a **2:1** aspect frame (`object-cover`) so very wide shots stay visually tall enough; vertical photos pair in two columns with a **4:5** aspect on medium+ viewports.
- `app/components/PhotoGrid.tsx`: Client component. Fixed 3-column edge-to-edge layout, capped at a maximum width of 1600px. Images are perfect 1:1 squares. Thumbnails load `urlLowQuality`; clicking a tile calls the parent **`onOpenPhoto`** so the page can update the `photo` query (no local lightbox state).
- `app/components/PhotoLightbox.tsx`: Full-viewport modal (not grid-only—it can open from a deep link while `view=showroom`). Portaled to `document.body` **after client mount** (`useEffect` sets the portal target) so SSR never touches `document`. Translucent backdrop, centered full-resolution image (with a cached `urlLowQuality` underlay until full-res loads), X close control, Escape and backdrop click to dismiss, open/close transitions, and `CameraStats` always visible. Sets `document.body.style.overflow = "hidden"` while open. Uses `prefetchImage` on mount to dedupe with hover prefetch. Full-res `<Image />` uses **`onLoad`** (not deprecated `onLoadingComplete`).
- `app/components/PhotoCard.tsx`: Reusable grid tile. Optional `onOpen` turns the tile into a `<button>` for the lightbox; hover/focus call `prefetchImage(photo.url)` for the full asset. `useLowQuality` uses `urlLowQuality` plus Next image optimization (`sizes` from `GRID_IMAGE_SIZES` in `constants.ts`). `unoptimized` applies when `useLowQuality` is false.
- `app/components/CameraStats.tsx`: Reusable overlay for camera metadata (ISO, aperture, shutter speed, focal length) with minimal SVG icons and a bottom gradient. Hover-reveal on tiles; `alwaysVisible` for the lightbox.
- `app/constants.ts`: The mock database. Highly normalized—photos are grouped by actual categories (e.g. `sur`), and the "todos" (all) category is the flattened union used when `category` is omitted or `todos`. Each `Photo` includes `url` (full) and `urlLowQuality` (thumbnails). **`GRID_IMAGE_SIZES`** is the `sizes` string for grid `<Image />`; edit it to trade sharpness vs. `_next/image` payload (especially the last `px` slot on large viewports).
- `app/lib/photoSlug.ts`: **`slugFromPhotoUrl`**, **`findPhotoBySlug`**, **`findCategoryForPhoto`**—stable `photo` query values are the decoded basename of `photo.url` (e.g. `PIC03277.webp`).
- `app/lib/prefetchImage.ts`: Deduplicated `<img>` prefetch into the HTTP cache (shared by grid hover/focus and lightbox open).

## Styling Conventions
- **Minimalism & Flush Layouts**: The grid and showroom use absolutely no padding or CSS gaps between photos to create a seamless, continuous block of imagery.
- **Typography**: Uses the default Sans font. Extremely subtle tracking (`tracking-[0.2em]`) and uppercase letters for navigation links.
- **Colors**: Strictly monochrome. Pure black background (`#000000`, `bg-black/90`). Navigation text relies on high contrast. 
- **Transitions**: CSS classes (`transition-all duration-500`, `fade-in`) are used extensively for subtle, elegant animations. The navbar uses `translate-y` for auto-hiding.
- **Image Quality & Caching**: **Showroom** and **lightbox** use `unoptimized` on `<Image />` so full `url` WEBPs load straight from R2 with no re-encoding. **Grid** tiles use `urlLowQuality` through the Image Optimization API (`quality={75}` in `PhotoCard`, `sizes` = **`GRID_IMAGE_SIZES`** in `constants.ts`). The lightbox shows a plain `<img>` underlay (`urlLowQuality`) until the full-res `<Image unoptimized />` finishes loading. Allowed optimizer qualities live in `next.config.ts` under `images.qualities`.
- **Scrollbars**: `globals.css` hides native scrollbars on `html`/`body` (overlay-style) so locking scroll for the lightbox does not change layout width. Scrolling still works via wheel, trackpad, touch, and keyboard.

## How to Extend the Project
1. **Adding Photos**: Append objects to the respective category arrays in `export const photos` within `app/constants.ts`. Do not include a `category` attribute inside the photo objects. Each photo must include `url` and **`urlLowQuality`** (a smaller asset for the grid). Include a `camera` object with `iso`, `aperture`, `shutterSpeed`, and `focalLength` to show EXIF in hover overlays and in the lightbox. To tune grid thumbnail resolution globally, edit **`GRID_IMAGE_SIZES`** (and optionally `quality` in `PhotoCard.tsx`).
2. **Adding Categories**: Simply add a new array to the `photos` object in `constants.ts`. The `Navbar` automatically reads `Object.keys(photos)` to generate navigation tabs.
3. **Adding Views**: If adding a new view mode, update the union type and `parseView` / `buildQuery` in `page.tsx` and add a new button in `ViewModeSwitch`.

## Constraints to Preserve Minimalist Design
- **No unnecessary borders, shadows, or gaps.** Photos must remain completely flush against each other and the edges.
- **Do not introduce accent colors.** Keep the UI strictly black, white, and shades of gray.
- **Avoid complex interactive libraries** unless absolutely necessary. Rely on CSS transitions.
- **Do not clutter the Navbar.** It must remain unobtrusive, fading into transparency.

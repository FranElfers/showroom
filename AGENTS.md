<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Architecture & Agent Guidelines

## Architecture Overview
The project is built with Next.js App Router, using React Server Components by default but with a main Client Component wrapper (`app/page.tsx`) to handle smooth UI state transitions between categories and view modes.

## Component Responsibilities
- `app/page.tsx`: The main orchestrator. Manages `category` and `view` states to provide a seamless SPA-like experience without full page reloads. Includes a dynamic "fin" back-to-top button.
- `app/components/Navbar.tsx`: Minimal top navigation. Features a white-to-transparent gradient and automatically hides when the user scrolls down for an immersive experience.
- `app/components/ViewModeSwitch.tsx`: Simple component to toggle between "Showroom" and "Grid" layouts.
- `app/components/PhotoShowroom.tsx`: Renders the cinematic view. Completely edge-to-edge layout with zero gaps. Horizontal photos use a **2:1** aspect frame (`object-cover`) so very wide shots stay visually tall enough; vertical photos pair in two columns with a **4:5** aspect on medium+ viewports.
- `app/components/PhotoGrid.tsx`: Client component. Fixed 3-column edge-to-edge layout, capped at a maximum width of 1600px. Images are perfect 1:1 squares. Thumbnails load `urlLowQuality`; clicking a tile opens `PhotoLightbox`.
- `app/components/PhotoLightbox.tsx`: Full-viewport grid-only modal. Rendered with `createPortal` to `document.body` so `position: fixed` is not clipped by ancestors (e.g. `fade-in`’s `transform`). Translucent backdrop, centered full-resolution image, X close control, Escape and backdrop click to dismiss, open/close transitions, and `CameraStats` always visible. Sets `document.body.style.overflow = "hidden"` while open.
- `app/components/PhotoCard.tsx`: Reusable grid tile. Optional `onOpen` turns the tile into a `<button>` for the lightbox. `useLowQuality` switches between `urlLowQuality` (grid) and `url` (if used elsewhere).
- `app/components/CameraStats.tsx`: Reusable overlay for camera metadata (ISO, aperture, shutter speed, focal length) with minimal SVG icons and a bottom gradient. Hover-reveal on tiles; `alwaysVisible` for the lightbox.
- `app/constants.ts`: The mock database. Highly normalized—photos are grouped by actual categories (e.g. `sur`), and the "todos" (all) category is computed dynamically in `page.tsx`. Each `Photo` includes `url` (full) and `urlLowQuality` (thumbnails).

## Styling Conventions
- **Minimalism & Flush Layouts**: The grid and showroom use absolutely no padding or CSS gaps between photos to create a seamless, continuous block of imagery.
- **Typography**: Uses the default Sans font. Extremely subtle tracking (`tracking-[0.2em]`) and uppercase letters for navigation links.
- **Colors**: Strictly monochrome. Pure black background (`#000000`, `bg-black/90`). Navigation text relies on high contrast. 
- **Transitions**: CSS classes (`transition-all duration-500`, `fade-in`) are used extensively for subtle, elegant animations. The navbar uses `translate-y` for auto-hiding.
- **Image Quality & Caching**: Next.js `<Image />` optimization is disabled globally (`unoptimized: true`) to prevent aggressive compression, maintain the original clarity of Cloudflare WEBP assets, and allow the browser to efficiently cache the single URL without re-fetching on view changes. Grid thumbnails use a lower `quality` prop plus `urlLowQuality`; showroom and lightbox use full `url` with `quality={100}` where appropriate.
- **Scrollbars**: `globals.css` hides native scrollbars on `html`/`body` (overlay-style) so locking scroll for the lightbox does not change layout width. Scrolling still works via wheel, trackpad, touch, and keyboard.

## How to Extend the Project
1. **Adding Photos**: Append objects to the respective category arrays in `export const photos` within `app/constants.ts`. Do not include a `category` attribute inside the photo objects. Each photo must include `url` and **`urlLowQuality`** (a smaller asset for the grid). Include a `camera` object with `iso`, `aperture`, `shutterSpeed`, and `focalLength` to show EXIF in hover overlays and in the lightbox.
2. **Adding Categories**: Simply add a new array to the `photos` object in `constants.ts`. The `Navbar` automatically reads `Object.keys(photos)` to generate navigation tabs.
3. **Adding Views**: If adding a new view mode, update the union type in `page.tsx` and add a new button in `ViewModeSwitch`.

## Constraints to Preserve Minimalist Design
- **No unnecessary borders, shadows, or gaps.** Photos must remain completely flush against each other and the edges.
- **Do not introduce accent colors.** Keep the UI strictly black, white, and shades of gray.
- **Avoid complex interactive libraries** unless absolutely necessary. Rely on CSS transitions.
- **Do not clutter the Navbar.** It must remain unobtrusive, fading into transparency.

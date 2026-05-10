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
- `app/components/PhotoShowroom.tsx`: Renders the cinematic view. Completely edge-to-edge layout with zero gaps. Horizontal photos use a 21:9 aspect ratio, while vertical photos pair up perfectly in two columns using a taller 4:5 aspect ratio.
- `app/components/PhotoGrid.tsx`: Fixed 3-column edge-to-edge layout, capped at a maximum width of 1600px. Images are perfect 1:1 squares.
- `app/components/PhotoCard.tsx`: Reusable grid item.
- `app/constants.ts`: The mock database. Highly normalized—photos are grouped by actual categories (e.g. `sur`), and the "todos" (all) category is computed dynamically in `page.tsx`.

## Styling Conventions
- **Minimalism & Flush Layouts**: The grid and showroom use absolutely no padding or CSS gaps between photos to create a seamless, continuous block of imagery.
- **Typography**: Uses the default Sans font. Extremely subtle tracking (`tracking-[0.2em]`) and uppercase letters for navigation links.
- **Colors**: Strictly monochrome. Pure black background (`#000000`, `bg-black/90`). Navigation text relies on high contrast. 
- **Transitions**: CSS classes (`transition-all duration-500`, `fade-in`) are used extensively for subtle, elegant animations. The navbar uses `translate-y` for auto-hiding.
- **Image Quality & Caching**: Next.js `<Image />` optimization is disabled globally (`unoptimized: true`) to prevent aggressive compression, maintain the original clarity of Cloudflare WEBP assets, and allow the browser to efficiently cache the single URL without re-fetching on view changes.

## How to Extend the Project
1. **Adding Photos**: Append objects to the respective category arrays in `export const photos` within `app/constants.ts`. Do not include a `category` attribute inside the photo objects.
2. **Adding Categories**: Simply add a new array to the `photos` object in `constants.ts`. The `Navbar` automatically reads `Object.keys(photos)` to generate navigation tabs.
3. **Adding Views**: If adding a new view mode, update the union type in `page.tsx` and add a new button in `ViewModeSwitch`.

## Constraints to Preserve Minimalist Design
- **No unnecessary borders, shadows, or gaps.** Photos must remain completely flush against each other and the edges.
- **Do not introduce accent colors.** Keep the UI strictly black, white, and shades of gray.
- **Avoid complex interactive libraries** unless absolutely necessary. Rely on CSS transitions.
- **Do not clutter the Navbar.** It must remain unobtrusive, fading into transparency.

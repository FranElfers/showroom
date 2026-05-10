<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Architecture & Agent Guidelines

## Architecture Overview
The project is built with Next.js App Router, using React Server Components by default but with a main Client Component wrapper (`app/page.tsx`) to handle smooth UI state transitions between categories and view modes.

## Component Responsibilities
- `app/page.tsx`: The main orchestrator. Manages `category` and `view` states to provide a seamless SPA-like experience without full page reloads.
- `app/components/Navbar.tsx`: Minimal top navigation. Contains category filters and mounts the `ViewModeSwitch`.
- `app/components/ViewModeSwitch.tsx`: Simple component to toggle between "Showroom" and "Grid" layouts.
- `app/components/PhotoShowroom.tsx`: Renders the cinematic view. Handles aspect ratios and custom responsive layouts based on photo orientation (horizontal vs vertical).
- `app/components/PhotoGrid.tsx`: Standard 1:1 image grid container.
- `app/components/PhotoCard.tsx`: Reusable grid item rendering a perfect 1:1 square.
- `app/constants.ts`: Serves as the mock database and data model defining the photos.

## Styling Conventions
- **Minimalism & Whitespace**: Extensive use of Tailwind utilities for large padding (`pt-28`, `pb-24`) and gaps (`gap-16`, `gap-32`).
- **Typography**: Uses the default Sans font. Extremely subtle tracking (`tracking-[0.2em]`) and uppercase letters for navigation links.
- **Colors**: Strictly monochrome. Neutral grays (`text-neutral-400`) are used for inactive text. Pure white background.
- **Transitions**: CSS classes (`transition-all duration-500`, `fade-in`) are used extensively for subtle, elegant animations.

## How to Extend the Project
1. **Adding Photos**: Append objects to `export const photos` in `app/constants.ts`.
2. **Adding Categories**: Update the `Category` type in `constants.ts` and ensure the `Navbar` iterates over the new list.
3. **Adding Views**: If adding a new view mode, update the union type in `page.tsx` and add a new button in `ViewModeSwitch`.

## Constraints to Preserve Minimalist Design
- **No unnecessary borders or shadows.** Rely on negative space to separate elements.
- **Do not introduce accent colors.** Keep the UI strictly black, white, and shades of gray to let the photography stand out.
- **Avoid complex interactive libraries** unless absolutely necessary. Rely on CSS transitions.
- **Do not clutter the Navbar.** It must remain transparent and unobtrusive.

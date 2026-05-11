# Minimal Photography Portfolio

A cinematic, minimalist photography portfolio built with Next.js (App Router), TypeScript, and TailwindCSS V4. It features a sleek black background, seamless flush image grids, and high-fidelity photo rendering.

## Setup Instructions

1. Install dependencies (we recommend pnpm as defined by the workspace lockfile, but npm/yarn work too):
   ```bash
   pnpm install
   ```
2. Start the development server:
   ```bash
   pnpm dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Commands

- `pnpm dev`: Starts the development server.
- `pnpm build`: Builds the application for production.
- `pnpm start`: Runs the built production server.
- `pnpm lint`: Runs ESLint for code quality.

## Project Structure

```
├── app/
│   ├── components/
│   │   ├── CameraStats.tsx    # EXIF overlay (hover on tiles, always on in lightbox)
│   │   ├── Navbar.tsx         # Auto-hiding gradient navigation
│   │   ├── PhotoCard.tsx      # Grid tile; optional lightbox trigger
│   │   ├── PhotoGrid.tsx      # 3-column grid + lightbox state
│   │   ├── PhotoLightbox.tsx  # Full-screen modal (portal); full-res image + close
│   │   ├── PhotoShowroom.tsx  # Cinematic layout (2:1 horizontal, 4:5 vertical md+)
│   │   └── ViewModeSwitch.tsx # Toggle between Grid and Showroom
│   ├── constants.ts           # Normalized image database (`url` + `urlLowQuality`)
│   ├── globals.css            # Tailwind V4, fade-in, hidden scrollbars
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main client application state & "fin" back-to-top
```

## How to Add New Photos/Categories

All photography data is highly normalized and managed in `app/constants.ts`. 

To add a photo, edit the `photos` object and place it inside the desired category array. Each entry needs `url` (full-size, used in showroom and lightbox), **`urlLowQuality`** (smaller asset for the grid), `orientation` (`"horizontal"` | `"vertical"`), and a `camera` object for EXIF overlays.

```typescript
export const photos = {
  sur: [
    {
      url: "https://your-cdn.com/image.webp",
      urlLowQuality: "https://your-cdn.com/image-sm.webp",
      orientation: "horizontal",
      camera: {
        iso: 400,
        aperture: "f/8",
        shutterSpeed: "1/250s",
        focalLength: "35mm",
      },
    },
  ],
  norte: [/* ... */],
};
```

**Note on the "todos" category:**
You do *not* need to maintain a separate "todos" array or include a `category` property. The `Navbar` automatically detects all category keys inside `constants.ts` and dynamic aggregates them into the "todos" tab in real-time. 

## Image optimization and grid lightbox

Next.js `<Image />` is set to **`unoptimized`** in config so remote WEBP URLs are not re-encoded; the app relies on pre-exported assets. **Showroom** and the **grid lightbox** use the full `url` with high `quality`. **Grid thumbnails** use `urlLowQuality` and a lower `quality` value to keep scrolling light.

**Grid mode:** click a tile to open a full-screen lightbox (Escape, backdrop, or X to close). The lightbox is portaled to `document.body` so it is not affected by CSS `transform` on the page.

**Scrollbars:** `globals.css` hides native scrollbars on `html` and `body` while keeping scroll behavior, which avoids layout shift when the lightbox toggles `overflow: hidden` on `body`.

## Deployment Instructions

This project is optimized for deployment on Vercel.

1. Push your code to a Git repository (GitHub, GitLab, BitBucket).
2. Import the project in Vercel.
3. Vercel will automatically detect Next.js and apply the correct build settings (`next build`).
4. Click Deploy.

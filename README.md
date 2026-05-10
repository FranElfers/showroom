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
│   │   ├── Navbar.tsx         # Auto-hiding gradient navigation
│   │   ├── PhotoCard.tsx      # Grid image component (quality=100)
│   │   ├── PhotoGrid.tsx      # Fixed 3-column flush grid
│   │   ├── PhotoShowroom.tsx  # Edge-to-edge cinematic layout (21:9 & 4:5 ratios)
│   │   └── ViewModeSwitch.tsx # Toggle between Grid and Showroom
│   ├── constants.ts           # Normalized image database
│   ├── globals.css            # Tailwind V4 and custom animations (black background)
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main client application state & "fin" back-to-top
```

## How to Add New Photos/Categories

All photography data is highly normalized and managed in `app/constants.ts`. 

To add a photo, edit the `photos` object and place it inside the desired category array. The data structure strictly uses `url` and `orientation` (`"horizontal"` or `"vertical"`). 

```typescript
export const photos = {
  sur: [
    {
      url: "https://your-image-url.com/image.jpg",
      orientation: "horizontal"
    }
  ],
  norte: [ ... ]
}
```

**Note on the "todos" category:**
You do *not* need to maintain a separate "todos" array or include a `category` property. The `Navbar` automatically detects all category keys inside `constants.ts` and dynamic aggregates them into the "todos" tab in real-time. 

## Image Optimization

This project is configured to prioritize image quality. All Next.js `<Image />` tags explicitly use `quality={100}` to prevent Next.js from aggressively compressing pre-optimized high-quality assets (like `.webp` from Cloudflare R2).

## Deployment Instructions

This project is optimized for deployment on Vercel.

1. Push your code to a Git repository (GitHub, GitLab, BitBucket).
2. Import the project in Vercel.
3. Vercel will automatically detect Next.js and apply the correct build settings (`next build`).
4. Click Deploy.

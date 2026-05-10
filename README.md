# Minimal Photography Portfolio

A cinematic, minimalist photography portfolio built with Next.js (App Router), TypeScript, and TailwindCSS V4.

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
│   │   ├── Navbar.tsx         # Main navigation
│   │   ├── PhotoCard.tsx      # Grid image component
│   │   ├── PhotoGrid.tsx      # Grid layout view
│   │   ├── PhotoShowroom.tsx  # Cinematic layout view
│   │   └── ViewModeSwitch.tsx # Toggle between Grid and Showroom
│   ├── constants.ts           # Image data and definitions
│   ├── globals.css            # Tailwind V4 and custom animations
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main client application state
```

## How to Add New Photos/Categories

All photography data is managed in `app/constants.ts`. 

To add a photo, edit the `photos` object:

```typescript
export const photos = {
  todos: [
    {
      url: "https://your-image-url.com/image.jpg",
      orientation: "horizontal", // or "vertical"
      category: "sur"
    }
  ],
  // ...
}
```

To add a new category:
1. Update the `Category` type in `constants.ts`.
2. Add a new key to the `photos` object.
3. The Navbar will automatically render the new category if you update the array inside `app/components/Navbar.tsx`.

## Deployment Instructions

This project is optimized for deployment on Vercel.

1. Push your code to a Git repository (GitHub, GitLab, BitBucket).
2. Import the project in Vercel.
3. Vercel will automatically detect Next.js and apply the correct build settings (`next build`).
4. Click Deploy.

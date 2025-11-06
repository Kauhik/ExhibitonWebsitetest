# Apple Developer Academy Exhibition 2025 · Games Institute

Mobile-first React + Vite experience that gamifies the 2025 Apple Developer Academy showcase with a tappable hub, show detail views, and an interactive sliding puzzle.

## Tech Stack

- Vite + React 19 + TypeScript
- Tailwind CSS (JIT)
- React Router DOM (v6)
- Manual service worker + web manifest for offline support

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` on a mobile-sized viewport (360–430px recommended).

### Production Build

```bash
npm run build
npm run preview
```

The `public/sw.js` service worker caches navigations and static assets so the app works offline after the first visit.

## Project Structure

```
src/
  components/      // Shared UI (BrandHeader, PuzzleBackdrop, PuzzleGrid, etc.)
  routes/          // Intro, Hub, AppDetail, Interstitial, Puzzle, Congrats
  data/            // Exhibition show metadata (src/data/shows.ts)
  lib/             // Puzzle utilities & accessibility helpers
  styles/globals.css
public/assets/     // Puzzle artwork + show thumbnails (replace with real images)
```

### Assets

Replace the placeholder images in `public/assets/` with production artwork:

- `puzzle-full.jpg` — placeholder still for global backgrounds
- `show-1.jpg` … `show-4.jpg` — pin thumbnails rendered on the hub puzzle
- Update `src/data/shows.ts` to match your final copy and team details.

### Puzzle Grid Size

The interactive puzzle uses five numbered tiles labelled 1–5 with the same styling as the backdrop pieces. To change the amount, update the `tileCount` (and optionally `columns`) passed to `PuzzleGrid` in `src/routes/Puzzle.tsx`:

```tsx
<PuzzleGrid tileCount={6} columns={3} onSolved={handleSolved} />
```

Ensure the grid columns support your chosen count for clean alignment.

## Accessibility & Interaction Notes

- Tiles support tap-to-swap, drag-and-drop, and keyboard interaction.
- Screen reader announcements trigger when tiles lock into place.
- Focus rings are visible for keyboard and touch interactions.

## PWA

- `public/sw.js` handles caching.
- `public/manifest.webmanifest` sets up install metadata and icon paths.
- `npm run build` verifies the service worker compiles without errors.

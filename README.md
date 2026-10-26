# Celebrare Photo Gallery Assignment

A React + Vite + Tailwind CSS photo gallery using Picsum Photos. It supports author search, favourites managed with `useReducer`, and persistence with `localStorage`.

## Requirements

- Node.js 20.19+ or 22.12+ recommended for current Vite releases
- npm
- Internet access for the Picsum Photos API and images

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Verify a production build

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
├── components/
│   ├── LoadingState.jsx
│   └── PhotoCard.jsx
├── hooks/
│   ├── useFavorites.js
│   └── useFetchPhotos.js
├── App.jsx
├── index.css
└── main.jsx
index.html
vite.config.js
package.json
```

## Requirement checklist

- [x] React + Vite
- [x] Tailwind CSS only for UI styling; no component library
- [x] Fetch 30 photos from `https://picsum.photos/v2/list?limit=30`
- [x] Loading and error states
- [x] Responsive grid: 1 mobile / 2 tablet / 4 desktop columns
- [x] Author search filters already-fetched photos
- [x] Favourites managed with `useReducer`
- [x] Favourites persist in localStorage
- [x] `useFetchPhotos` returns `photos`, `loading`, `error`
- [x] `useCallback` on search handler
- [x] `useMemo` for filtered photo list

## Notes

- Picsum photo records provide `id` and `author`. The displayed image URL is built from the returned photo ID.
- Favourites store the selected photo objects under `celebrare-photo-gallery-favorites`.
- If API access fails, the app displays an error message rather than a blank page.
- This starter uses current Vite and Tailwind CSS v4 package versions. If npm reports engine compatibility warnings, install a supported Node.js LTS version and run `npm install` again.

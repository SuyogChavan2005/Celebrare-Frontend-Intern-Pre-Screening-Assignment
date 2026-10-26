import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useFetchPhotos from "./hooks/useFetchPhotos.js";
import useFavorites from "./hooks/useFavorites.js";
import PhotoCard from "./components/PhotoCard.jsx";
import LoadingState from "./components/LoadingState.jsx";


function HeartIcon({ size = 16, className = "", fill = "none" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    </svg>
  );
}

function SearchIcon({ size = 24, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function XIcon({ size = 20, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default function App() {
  const { photos, loading, error } = useFetchPhotos();
  const { favorites, dispatch } = useFavorites();

  const [searchTerm, setSearchTerm] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const closeButtonRef = useRef(null);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const favoriteIds = useMemo(
    () => new Set(favorites.map((photo) => photo.id)),
    [favorites]
  );

  // Filter by author name, and optionally by saved photos.
  const filteredPhotos = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return photos.filter(
      (photo) =>
        photo.author.toLowerCase().includes(query) &&
        (!favoritesOnly || favoriteIds.has(photo.id))
    );
  }, [photos, searchTerm, favoritesOnly, favoriteIds]);

  const handleToggleFavorite = useCallback(
    (photo) => {
      dispatch({ type: "TOGGLE", photo });
    },
    [dispatch]
  );

  // Lightbox: close on Escape, lock page scroll, move focus to the close button.
  useEffect(() => {
    if (!selectedPhoto) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelectedPhoto(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedPhoto]);

  const selectedIsFavorite = selectedPhoto
    ? favoriteIds.has(selectedPhoto.id)
    : false;

  return (
    <div
      className="min-h-screen bg-[#eef1f0] text-[#14212b]"
      style={{ fontFamily: "'Archivo', system-ui, sans-serif" }}
    >
      <header className="border-b border-[#cdd5d8]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a
            href="/"
            className="text-2xl font-bold tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#12406b]"
            aria-label="Photo Gallery home"
          >
            Photo Gallery
          </a>

          <button
            type="button"
            onClick={() => setFavoritesOnly((value) => !value)}
            aria-pressed={favoritesOnly}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12406b] ${
              favoritesOnly
                ? "border-[#12406b] bg-[#12406b] text-white"
                : "border-[#cdd5d8] bg-transparent text-[#14212b] hover:border-[#12406b]"
            }`}
          >
            <HeartIcon
              size={16}
              className={favoritesOnly ? "" : "text-[#d9382a]"}
              fill="currentColor"
            />
            <span>{favorites.length}</span>
            <span className="hidden sm:inline">
              {favoritesOnly ? "Showing saved" : "Saved"}
            </span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pt-16 lg:px-8">
        <section className="mb-10 sm:mb-14" aria-label="Gallery search">
          <h1
            className="max-w-4xl text-[2.6rem] font-black leading-[0.98] tracking-tight sm:text-7xl"
            style={{ fontStretch: "125%" }}
          >
            Browse by photographer
          </h1>

          <label className="relative mt-8 block max-w-3xl">
            <span className="sr-only">Search photos by author name</span>
            <SearchIcon
              size={24}
              className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-[#5b6b75]"
            />
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Type a name"
              className="w-full border-0 border-b-2 border-[#14212b] bg-transparent py-3 pl-9 pr-10 text-2xl font-medium outline-none placeholder:text-[#8a979f] focus:border-[#12406b] sm:text-3xl"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
                className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full p-2 text-[#5b6b75] hover:bg-[#dfe5e7] hover:text-[#14212b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#12406b]"
              >
                <XIcon size={20} />
              </button>
            )}
          </label>

          <p className="mt-4 text-sm text-[#5b6b75]" aria-live="polite">
            {loading
              ? "Loading photos"
              : `Showing ${filteredPhotos.length} of ${photos.length} photos`}
          </p>
        </section>

        {loading ? (
          <LoadingState />
        ) : error ? (
          <div
            className="max-w-xl border-l-4 border-[#d9382a] bg-white px-6 py-6"
            role="alert"
          >
            <p className="text-lg font-bold">Photos didn’t load</p>
            <p className="mt-1 text-sm text-[#5b6b75]">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-full bg-[#12406b] px-5 py-2 text-sm font-semibold text-white hover:bg-[#0d3153] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12406b]"
            >
              Reload page
            </button>
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="max-w-xl py-8">
            <h2 className="text-xl font-bold">
              {favoritesOnly && !searchTerm
                ? "You haven’t saved any photos yet"
                : `No photographer matches “${searchTerm.trim()}”`}
            </h2>
            <p className="mt-2 text-[#5b6b75]">
              {favoritesOnly && !searchTerm
                ? "Select the heart on a photo to save it."
                : "Check the spelling or try a shorter name."}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="rounded-full bg-[#12406b] px-5 py-2 text-sm font-semibold text-white hover:bg-[#0d3153] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12406b]"
                >
                  Clear search
                </button>
              )}
              {favoritesOnly && (
                <button
                  type="button"
                  onClick={() => setFavoritesOnly(false)}
                  className="rounded-full border border-[#14212b] px-5 py-2 text-sm font-semibold hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12406b]"
                >
                  Show all photos
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 min-[640px]:grid-cols-2 min-[1024px]:grid-cols-4">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onPhotoClick={setSelectedPhoto}
                isFavorite={favoriteIds.has(photo.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}

        <footer className="mt-20 border-t border-[#cdd5d8] pt-6 text-xs text-[#5b6b75]">
          Built with React, Vite and Tailwind CSS. Photos from Picsum Photos by Suyog Chavan.
        </footer>
      </main>

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1218]/90 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Photo by ${selectedPhoto.author}`}
            className="relative w-full max-w-4xl bg-[#eef1f0] p-3 sm:p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={`https://picsum.photos/id/${selectedPhoto.id}/1200/900`}
              alt={`Photo by ${selectedPhoto.author}`}
              className="max-h-[72vh] w-full bg-[#dfe5e7] object-contain"
            />

            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="font-semibold">{selectedPhoto.author}</p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleFavorite(selectedPhoto)}
                  aria-pressed={selectedIsFavorite}
                  className="flex items-center gap-2 rounded-full border border-[#14212b] px-4 py-2 text-sm font-semibold hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12406b]"
                >
                  <HeartIcon
                    size={16}
                    className="text-[#d9382a]"
                    fill={selectedIsFavorite ? "currentColor" : "none"}
                  />
                  {selectedIsFavorite ? "Saved" : "Save"}
                </button>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="rounded-full bg-[#12406b] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0d3153] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12406b]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useReducer } from "react";

const STORAGE_KEY = "celebrare-photo-gallery-favorites";

function readInitialFavorites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Invalid or unavailable localStorage should not prevent the gallery from rendering.
    return [];
  }
}

function favoritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE": {
      const alreadyFavorite = state.some((photo) => photo.id === action.photo.id);
      return alreadyFavorite
        ? state.filter((photo) => photo.id !== action.photo.id)
        : [...state, action.photo];
    }
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export default function useFavorites() {
  const [favorites, dispatch] = useReducer(
    favoritesReducer,
    undefined,
    readInitialFavorites
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // The app remains usable if browser storage is blocked or full.
    }
  }, [favorites]);

  return { favorites, dispatch };
}
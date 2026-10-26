
import { useEffect, useState } from "react";

const PHOTOS_URL = import.meta.env.VITE_PHOTOS_API_URL;

export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadPhotos() {
      try {
        setLoading(true);
        setError("");

        // Check whether the API URL is configured.
        if (!PHOTOS_URL) {
          throw new Error(
            "API configuration error: Photo API URL is missing. Check your .env file."
          );
        }

        const response = await fetch(PHOTOS_URL, {
          signal: controller.signal,
        });

        // Handle HTTP errors.
        if (!response.ok) {
          throw new Error(
            `Photo API request failed (${response.status} ${response.statusText}).`
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error(
            "Invalid API response: Expected a list of photos."
          );
        }

        setPhotos(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            err instanceof TypeError
              ? "Network error: Unable to reach the Photo API. Check your internet connection or API URL."
              : err.message || "Failed to load photos. Please try again."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadPhotos();

    return () => controller.abort();
  }, []);

  return { photos, loading, error };
}

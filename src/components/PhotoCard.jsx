
import { memo } from "react";

function HeartIcon({ size = 18, fill = "none" }) {
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
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    </svg>
  );
}

function PhotoCard({ photo, onPhotoClick, isFavorite, onToggleFavorite }) {
  return (
    <figure className="group">
      <div className="relative">
        <button
          type="button"
          onClick={() => onPhotoClick(photo)}
          aria-label={`Open photo by ${photo.author}`}
          className="block w-full overflow-hidden bg-[#dfe5e7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12406b]"
        >
          <img
            src={`https://picsum.photos/id/${photo.id}/600/450`}
            alt={`Photo by ${photo.author}`}
            loading="lazy"
            width="600"
            height="450"
            className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </button>

        <button
          type="button"
          onClick={() => onToggleFavorite(photo)}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite
              ? `Remove photo by ${photo.author} from saved`
              : `Save photo by ${photo.author}`
          }
          className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-[#d9382a] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12406b]"
        >
          <HeartIcon
            size={18}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>
      </div>

      <figcaption className="mt-2 truncate text-sm font-medium text-[#14212b]">
        {photo.author}
      </figcaption>
    </figure>
  );
}

export default memo(PhotoCard);

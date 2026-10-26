export default function LoadingState() {
  return (
    <div
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4"
      role="status"
      aria-label="Loading photos"
    >
      {Array.from({ length: 8 }, (_, index) => (
        <div key={index}>
          <div className="aspect-[4/3] w-full bg-[#dfe5e7] motion-safe:animate-pulse" />
          <div className="mt-2 h-4 w-2/3 bg-[#dfe5e7] motion-safe:animate-pulse" />
        </div>
      ))}
    </div>
  );
}
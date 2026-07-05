const TILE_COUNT = 36;

// Persistent brand watermark: shown on-screen (so a clean screenshot of the
// results is never possible) and in print (position: fixed repeats across
// printed pages in Chromium-based browsers, which is what most users print with).
export function Watermark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden select-none"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid w-[220vw] h-[220vh] -translate-x-1/4 -translate-y-1/4 rotate-[-30deg] grid-cols-4 gap-x-10 gap-y-16 place-items-center opacity-[0.04]">
          {Array.from({ length: TILE_COUNT }).map((_, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-lg font-bold tracking-wide text-blue-900 uppercase"
            >
              Champion Security System
            </span>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo/logo.png"
          alt=""
          className="w-[42vmin] h-[42vmin] object-contain opacity-[0.22]"
        />
      </div>
    </div>
  );
}

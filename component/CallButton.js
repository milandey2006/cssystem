import { Phone } from "lucide-react";

// Fixed quick-dial pill. Cleared past 112px so it misses the header in its
// tallest state — at the top of the page the 36px announcement bar sits
// above the 65px header, pushing it down to 101px. Also kept below the
// header in the stacking order (header is z-50) in case they ever meet.
export default function CallButton({ number = "022-45717953" }) {
  const tel = `tel:${number.replace(/[^\d+]/g, "")}`;

  return (
    <a
      href={tel}
      aria-label={`Call Champion Security System on ${number}`}
      className="group fixed right-4 top-28 z-40 flex items-center gap-2 rounded-full bg-[#1e3a8a] py-2.5 pl-3 pr-4 text-white shadow-lg ring-1 ring-white/15 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl active:scale-95 md:right-6 md:gap-2.5 md:py-3 md:pl-4 md:pr-5"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:scale-110">
        <Phone className="h-3.5 w-3.5" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-blue-200">
          Call now
        </span>
        <span className="mt-0.5 text-sm font-semibold tabular-nums md:text-base">
          {number}
        </span>
      </span>
    </a>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { SCREEN_W, SCREEN_H } from "./AppScreens";

// Draws an app screen at its real 1200 x 760 size and scales it down to the
// width of its container, so it reads like a screenshot at any screen size.
// The box keeps the right aspect ratio before measuring, so nothing jumps.
// data-nosnippet keeps the made-up sample data out of Google's search snippets.
export default function ScaledScreen({ children, className = "", interactive = false }) {
  const box = useRef(null);
  const [scale, setScale] = useState(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(el.clientWidth / SCREEN_W);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={box}
      data-nosnippet
      className={`relative w-full ${className}`}
      style={{ aspectRatio: `${SCREEN_W} / ${SCREEN_H}` }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left transition-opacity duration-300"
        style={{
          width: SCREEN_W,
          height: SCREEN_H,
          transform: `scale(${scale ?? 1})`,
          opacity: scale ? 1 : 0,
        }}
        aria-hidden={interactive ? undefined : "true"}
      >
        {children}
      </div>
    </div>
  );
}

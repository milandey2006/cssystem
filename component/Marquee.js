"use client";
import { useState } from 'react';

const Marquee = ({
  children,
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  className = "",
  backgroundColor = "bg-blue-600",
  textColor = "text-white"
}) => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${backgroundColor} ${textColor} ${className}`}>
      <div
        className="flex w-max animate-marquee-immediate"
        style={{
          '--marquee-duration': `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
          animationPlayState: isPaused ? 'paused' : 'running'
        }}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      >
        <span className="mx-4 shrink-0">{children}</span>
        <span className="mx-4 shrink-0" aria-hidden="true">{children}</span>
      </div>
    </div>
  );
};

export default Marquee;

"use client";
import { useEffect, useState } from 'react';

const Marquee = ({ 
  children, 
  speed = 20, 
  direction = "left", 
  pauseOnHover = true,
  className = "",
  backgroundColor = "bg-blue-600",
  textColor = "text-white"
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${backgroundColor} ${textColor} ${className}`}>
      <div
        className="inline-block animate-marquee-immediate"
        style={{
          '--marquee-duration': `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
          animationPlayState: isPaused ? 'paused' : 'running'
        }}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      >
        <span className="mx-4">{children}</span>
        <span className="mx-4">{children}</span>
        <span className="mx-4">{children}</span>
        <span className="mx-4">{children}</span>
      </div>
    </div>
  );
};

export default Marquee;

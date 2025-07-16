"use client";
import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// Global Mouse Follower Component
const GlobalMouseFollower = ({ 
  size = 20, 
  color = "#6366f1", 
  opacity = 0.6,
  springConfig = { stiffness: 300, damping: 30 },
  showOnHover = true,
  customClassName = ""
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");
  
  // Motion values for smooth cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring animation for smooth following
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    // Mouse leave handler (when leaving the window)
    const handleMouseLeave = () => {
      if (showOnHover) {
        setIsVisible(false);
      }
    };

    // Mouse enter handler (when entering the window)
    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible, showOnHover]);

  // Handle different cursor states based on hovered elements
  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      
      // Check for interactive elements
      if (target.tagName === "A" || target.tagName === "BUTTON" || target.onclick || target.style.cursor === "pointer") {
        setCursorVariant("hover");
      } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        setCursorVariant("input");
      } else {
        setCursorVariant("default");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    
    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Don't render on touch devices
  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  if (isTouchDevice()) {
    return null;
  }

  return (
    <motion.div
      className={`pointer-events-none fixed z-50 mix-blend-difference ${customClassName}`}
      style={{
        left: mouseXSpring,
        top: mouseYSpring,
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        scale: !isVisible ? 0 : cursorVariant === "hover" ? 1.5 : cursorVariant === "input" ? 0.8 : 1,
        opacity: !isVisible ? 0 : opacity,
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Main cursor dot */}
      <motion.div
        className="rounded-full border-2"
        style={{
          width: size,
          height: size,
          borderColor: color,
          backgroundColor: cursorVariant === "hover" ? color : "transparent",
        }}
        animate={{
          borderWidth: cursorVariant === "hover" ? 0 : 2,
        }}
      />
      
      {/* Outer ring for hover effect */}
      <motion.div
        className="absolute inset-0 rounded-full border"
        style={{
          borderColor: color,
        }}
        animate={{
          scale: cursorVariant === "hover" ? 2 : 1,
          opacity: cursorVariant === "hover" ? 0.3 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// Hook for custom cursor interactions
export const useCursorInteraction = () => {
  const [cursorState, setCursorState] = useState("default");

  const onMouseEnter = (state = "hover") => {
    setCursorState(state);
    document.body.style.cursor = "none";
  };

  const onMouseLeave = () => {
    setCursorState("default");
    document.body.style.cursor = "auto";
  };

  return { cursorState, onMouseEnter, onMouseLeave };
};

// Enhanced Mouse Follower with more effects
const EnhancedMouseFollower = ({ 
  trailLength = 5,
  showTrail = true,
  particleEffect = false 
}) => {
  const [mouseHistory, setMouseHistory] = useState([]);
  const [particles, setParticles] = useState([]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXSpring = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (showTrail) {
        setMouseHistory(prev => [
          { x: e.clientX, y: e.clientY, id: Date.now() },
          ...prev.slice(0, trailLength - 1)
        ]);
      }
      
      if (particleEffect && Math.random() > 0.8) {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          life: 1
        };
        setParticles(prev => [...prev, newParticle]);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, showTrail, trailLength, particleEffect]);

  // Particle cleanup
  useEffect(() => {
    if (particleEffect) {
      const interval = setInterval(() => {
        setParticles(prev => prev.filter(p => p.life > 0).map(p => ({ ...p, life: p.life - 0.05 })));
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [particleEffect]);

  return (
    <>
      {/* Trail effect */}
      {showTrail && mouseHistory.map((point, index) => (
        <motion.div
          key={point.id}
          className="pointer-events-none fixed z-40 w-2 h-2 bg-blue-500 rounded-full"
          style={{
            left: point.x,
            top: point.y,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: 1 - (index * 0.1),
            opacity: 1 - (index * 0.2),
          }}
          transition={{ duration: 0.5 }}
        />
      ))}
      
      {/* Particle effect */}
      {particleEffect && particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="pointer-events-none fixed z-30 w-1 h-1 bg-red-500 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 0],
            opacity: [1, 0],
            y: [0, -50],
          }}
          transition={{ duration: 1 }}
        />
      ))}
      
      {/* Main cursor */}
      <GlobalMouseFollower />
    </>
  );
};

// Layout component to wrap your entire app
const AppLayout = ({ children }) => {
  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";
    
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <div className="relative">
      {children}
      <GlobalMouseFollower />
    </div>
  );
};

// Example usage component
const ExampleUsage = () => {
  const { onMouseEnter, onMouseLeave } = useCursorInteraction();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Global Mouse Follower Demo</h1>
        
        <div className="space-y-8">
          <button 
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            onMouseEnter={() => onMouseEnter("hover")}
            onMouseLeave={onMouseLeave}
          >
            Hover me for special cursor
          </button>
          
          <input 
            type="text" 
            placeholder="Focus me for input cursor"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          
          <a 
            href="#" 
            className="inline-block text-blue-500 hover:text-blue-700 underline"
          >
            This is a link with cursor interaction
          </a>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Regular content</h2>
            <p>Move your mouse around to see the cursor follower in action. It will automatically detect different element types and change accordingly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalMouseFollower;
export { EnhancedMouseFollower, AppLayout, ExampleUsage, useCursorInteraction };
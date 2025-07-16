"use client";
import React, { useState, useEffect } from "react";
import { 
  useMotionValue, 
  motion, 
  useMotionTemplate, 
  useSpring,
  useTransform,
  AnimatePresence 
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { BiSolidCctv } from "react-icons/bi";
import { BsCameraVideoFill } from "react-icons/bs";
import { FaBell } from "react-icons/fa";

// Utility function (replace with your actual cn function)
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Enhanced Hero Highlight Component
const HeroHighlight = ({
  children,
  className,
  containerClassName
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");
  
  // Enhanced motion values with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXSpring = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 300, damping: 30 });
  
  // Create floating animation values
  const time = useMotionValue(0);
  const rotate = useTransform(time, [0, 4000], [0, 360]);
  const scale = useTransform(time, [0, 2000, 4000], [1, 1.02, 1]);

  // Animated background patterns
  const backgroundShift = useTransform(time, [0, 10000], [0, 100]);
  const backgroundShiftInverse = useTransform(backgroundShift, v => 100 - v);
  
  // Create motion templates
  const backgroundTemplate = useMotionTemplate`
    radial-gradient(circle at ${backgroundShift}% 50%, 
    rgba(99, 102, 241, 0.1) 0%, 
    transparent 50%),
    radial-gradient(circle at ${backgroundShiftInverse}% 50%, 
    rgba(168, 85, 247, 0.1) 0%, 
    transparent 50%)
  `;
  
  const rippleTemplate = useMotionTemplate`
    radial-gradient(
      circle at ${mouseXSpring}px ${mouseYSpring}px,
      rgba(99, 102, 241, 0.1) 0%,
      transparent 50%
    )
  `;
  
  const ambientTemplate = useMotionTemplate`
    radial-gradient(
      ellipse 1000px 800px at ${mouseXSpring}px ${mouseYSpring}px,
      rgba(99, 102, 241, 0.05) 0%,
      transparent 70%
    )
  `;
  
  const translateXTemplate = useMotionTemplate`translateX(${useTransform(time, [0, 20000], [0, -32])}px)`;
  
  useEffect(() => {
    const animation = setInterval(() => {
      time.set(time.get() + 16);
    }, 16);
    return () => clearInterval(animation);
  }, [time]);

  // Enhanced SVG patterns with animations
  const dotPatterns = {
    dark: {
      default: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23404040' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
      hover: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%238183f4' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3Canimateattribute-name='r' values='2.5;3.5;2.5' dur='2s' repeatCount='indefinite'/%3E%3Canimateattribute-name='opacity' values='0.5;1;0.5' dur='3s' repeatCount='indefinite'/%3E%3C/circle%3E%3C/svg%3E")`,
    },
  };

  // Enhanced mouse move handler
  function handleMouseMove({ currentTarget, clientX, clientY }) {
    if (!currentTarget) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCursorVariant("hover");
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCursorVariant("default");
  };

  return (
    <motion.div
      className={cn(
        "group relative flex h-screen w-full items-center justify-center bg-gray-900 dark:bg-gray-900 overflow-hidden",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* Animated background layers */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: backgroundTemplate,
        }}
      />
      
      {/* Floating orbs */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ rotate, scale }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}
      </motion.div>

      {/* Original dot patterns with enhanced effects */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: dotPatterns.dark.default,
          transform: translateXTemplate,
        }}
        animate={{
          opacity: isHovered ? 0.7 : 0.4,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Enhanced hover effect with spring animation */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          backgroundImage: dotPatterns.dark.hover,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseXSpring}px ${mouseYSpring}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseXSpring}px ${mouseYSpring}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Ripple effect on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background: rippleTemplate,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      {/* Cursor follower */}
      <motion.div
        className="pointer-events-none absolute w-6 h-6 border-2 border-blue-500/50 rounded-full z-30"
        style={{
          left: mouseXSpring,
          top: mouseYSpring,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: cursorVariant === "hover" ? 1.5 : 1,
          opacity: cursorVariant === "hover" ? 0.8 : 0.3,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Enhanced content container */}
      <motion.div 
        className={cn("relative z-20", className)}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        {children}
      </motion.div>

      {/* Ambient light effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: ambientTemplate,
        }}
        animate={{
          opacity: isHovered ? 1 : 0.3,
        }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
};

// Highlight Component for text effects
const Highlight = ({
  children,
  className
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
        opacity: 0,
        y: 20,
      }}
      animate={{
        backgroundSize: "100% 100%",
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 2,
        ease: "linear",
        delay: 0.5,
      }}
      whileHover={{
        scale: 1.05,
        backgroundSize: "110% 110%",
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 px-1 pb-1 dark:from-indigo-500 dark:to-purple-500 cursor-pointer`,
        className
      )}
    >
      <motion.span
        className="relative z-10"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          duration: 2,
          delay: 1,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      />
    </motion.span>
  );
};

const HeroSection = () => {
  return (
    <div>
      {/* --- ENHANCED HERO SECTION --- */}
      <HeroHighlight className="text-center">
        <div className="container relative z-20 mx-auto px-4 text-center text-white">
          <motion.h1 
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Advanced Security Solutions for Your {" "}
            <Highlight className="text-black dark:text-white">
              Peace of Mind
            </Highlight>
          </motion.h1>
          
          <motion.p 
            className="mx-auto mt-4 max-w-[600px] text-gray-300 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Protect what matters most with our cutting-edge CCTV and
            surveillance systems. Professional installation and 24/7
            monitoring services available.
          </motion.p>

          <motion.div 
            className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.a
              href="/products"
              className="inline-block rounded-md bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 font-semibold text-white shadow-lg"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Products
            </motion.a>
            <motion.a
              href="/contact"
              className="inline-block rounded-md border border-white px-6 py-3 font-semibold text-white hover:bg-white hover:text-gray-900 transition-colors"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(255, 255, 255, 0.1)" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              Request Consultation
            </motion.a>
          </motion.div>
        </div>
      </HeroHighlight>

      {/* --- WHY CHOOSE US SECTION --- */}
      <section className="w-full bg-white py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-black sm:text-4xl md:text-5xl">
                Why Choose Us?
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
                We provide comprehensive security solutions tailored to your
                specific needs
              </p>
            </div>
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12">
            {/* Feature 1: IP Cameras */}
            <motion.div 
              className="flex flex-col items-center space-y-2 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100"
                whileHover={{ 
                  backgroundColor: "rgba(99, 102, 241, 0.1)",
                  scale: 1.1 
                }}
              >
                <BiSolidCctv className="h-8 w-8" />
              </motion.div>
              <h3 className="text-xl font-bold">IP Cameras</h3>
              <p className="text-gray-500">
                Crystal clear footage with our high-definition camera systems
              </p>
            </motion.div>

            {/* Feature 2: 24/7 Recording */}
            <motion.div 
              className="flex flex-col items-center space-y-2 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100"
                whileHover={{ 
                  backgroundColor: "rgba(99, 102, 241, 0.1)",
                  scale: 1.1 
                }}
              >
                <BsCameraVideoFill className="h-8 w-8" />
              </motion.div>
              <h3 className="text-xl font-bold">24/7 Recording</h3>
              <p className="text-gray-500">
                Continuous monitoring with advanced motion detection
              </p>
            </motion.div>

            {/* Feature 3: Instant Alerts */}
            <motion.div 
              className="flex flex-col items-center space-y-2 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100"
                whileHover={{ 
                  backgroundColor: "rgba(99, 102, 241, 0.1)",
                  scale: 1.1 
                }}
              >
                <FaBell className="h-8 w-8" />
              </motion.div>
              <h3 className="text-xl font-bold">Instant Alerts</h3>
              <p className="text-gray-500">
                Real-time notifications sent directly to your mobile device
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
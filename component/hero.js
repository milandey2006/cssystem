"use client";
import React from "react";
import { motion } from "motion/react";
import { BiSolidCctv } from "react-icons/bi";
import { BsCameraVideoFill } from "react-icons/bs";
import { FaBell } from "react-icons/fa";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const HeroHighlight = ({ children, className, containerClassName }) => {
  return (
    <motion.div
      className={cn(
        "relative flex h-screen w-full items-center justify-center overflow-hidden bg-gray-900",
        containerClassName
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* --- VIDEO BACKGROUND --- */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero/hvideo.mp4" type="video/mp4" />
      </video>

      {/* --- DARK OVERLAY for readability --- */}
      <div class="absolute inset-0 bg-black/80"></div>

      {/* --- FOREGROUND CONTENT (your old text) --- */}
      <motion.div
        className={cn("relative z-20 text-center text-white", className)}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const Highlight = ({ children, className }) => (
  <motion.span
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.5 }}
    className={cn(
      "relative inline-block rounded-lg bg-gradient-to-r from-indigo-400 to-purple-400 px-1 pb-1",
      className
    )}
  >
    {children}
  </motion.span>
);

const HeroSection = () => {
  return (
    <div>
      {/* --- HERO SECTION WITH VIDEO BG --- */}
      <HeroHighlight>
        <div className="container relative z-20 mx-auto px-4 text-center text-white">
          <motion.h1
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Advanced Security Solutions for Your{" "}
            <Highlight>Peace of Mind</Highlight>
          </motion.h1>

          <motion.p
            className="mx-auto mt-4 max-w-[600px] text-gray-200 md:text-xl"
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Products
            </motion.a>
            <motion.a
              href="/contact"
              className="inline-block rounded-md border border-white px-6 py-3 font-semibold text-white hover:bg-white hover:text-gray-900 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request Consultation
            </motion.a>
          </motion.div>
        </div>
      </HeroHighlight>

      {/* --- WHY CHOOSE US (same as before) --- */}
      <section className="w-full bg-white py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tighter text-black sm:text-4xl md:text-5xl">
              Why Choose Us?
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
              We provide comprehensive security solutions tailored to your
              specific needs
            </p>
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12">
            <motion.div
              className="flex flex-col items-center space-y-2 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <BiSolidCctv className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">IP Cameras</h3>
              <p className="text-gray-500">
                Crystal clear footage with our high-definition camera systems
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center space-y-2 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <BsCameraVideoFill className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">24/7 Recording</h3>
              <p className="text-gray-500">
                Continuous monitoring with advanced motion detection
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center space-y-2 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <FaBell className="h-8 w-8" />
              </div>
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

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
        // The announcement bar (36px) and sticky header (65px) sit above the
        // hero in flow, so a full 100svh would push the bottom of the copy
        // under the fold. Subtract them.
        "relative flex min-h-[calc(100svh-101px)] w-full items-start overflow-hidden bg-gray-900 md:items-center md:py-14",
        containerClassName
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* --- VIDEO BACKGROUND ---
          The clip is 16:9. On a portrait phone `object-cover` would crop most
          of the frame away at the sides, so there it sits uncropped as a band
          across the top and the copy runs underneath it. Desktop is wide
          enough to fill edge-to-edge without losing anything worth seeing. */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero/hero.jpg"
        className="absolute inset-0 h-full w-full object-contain object-top md:object-cover md:object-center"
      >
        {/* Served through Cloudinary's transform pipeline rather than the raw
            upload: f_auto picks the best codec per browser, q_auto:eco and
            w_1280 take the 19.9MB master down to ~3.2MB. Behind the overlay
            the difference is invisible, and it starts playing immediately. */}
        <source
          src="https://res.cloudinary.com/dupzli6db/video/upload/f_auto,q_auto:eco,w_1280/v1786473367/hero_dspken.mp4"
          type="video/mp4"
        />
      </video>

      {/* --- OVERLAY ---
          Phone: darkens downward so the copy below the video band stays
          readable while the band itself is left fairly clear.
          Desktop: heaviest on the left behind the copy, light on the right
          so the footage stays visible. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/75 to-black/90 md:bg-gradient-to-r md:from-black/90 md:via-black/70 md:to-black/30"></div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent"></div>

      {/* Brand-blue wash over the darkening, so the hero reads as Champion
          navy rather than a neutral grey video. */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/55 via-[#1e3a8a]/15 to-transparent md:bg-gradient-to-r md:from-[#1e3a8a]/55 md:via-[#1e3a8a]/15 md:to-transparent"></div>

      {/* Thin brand rule along the bottom edge. */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-[3px] bg-gradient-to-r from-blue-500 via-blue-500/40 to-transparent"></div>

      {/* --- FOREGROUND CONTENT --- */}
      <div className={cn("relative z-20 w-full text-white", className)}>
        {children}
      </div>
    </motion.div>
  );
};

// Shared entrance animation — everything in the hero rises in on the same
// curve, just offset, so the block reads as one movement instead of six.
const riseIn = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const PARTNERS = [
  "Hanwha Vision",
  "Honeywell",
  "Matrix",
  "Axis Communications",
  "Panasonic i-PRO",
];

const CAPABILITIES = [
  "AI analytics cameras",
  "licence plate recognition",
  "people counting systems",
  "face detection",
  "video management systems",
  "biometric access control",
  "perimeter intrusion alerts",
];

// Types a term out, holds it, deletes it, moves to the next one.
// Starts already showing the first term so the server-rendered HTML has real
// text in the <h1> (blank would cost us the heading for search engines) and
// the client hydrates onto an identical string.
function Typewriter({ words, className }) {
  const [index, setIndex] = React.useState(0);
  const [text, setText] = React.useState(words[0]);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    const word = words[index];

    if (!deleting && text === word) {
      const hold = setTimeout(() => setDeleting(true), 1900);
      return () => clearTimeout(hold);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const step = setTimeout(
      () =>
        setText(
          deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)
        ),
      deleting ? 30 : 70
    );
    return () => clearTimeout(step);
  }, [text, deleting, index, words]);

  // The longest term is rendered invisibly underneath to reserve its exact
  // height, so the paragraph below never jumps as terms change length.
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a));

  return (
    <span className={cn("relative block", className)}>
      <span aria-hidden="true" className="invisible">
        {longest}
      </span>
      <span className="absolute inset-0">
        {text}
        <span className="ml-1 inline-block h-[0.8em] w-[3px] animate-pulse bg-blue-400 align-middle" />
      </span>
    </span>
  );
}

import AboutSection from "./about-section";

const HeroSection = () => {
  return (
    <div>
      {/* --- HERO SECTION WITH VIDEO BG --- */}
      <HeroHighlight>
        {/* On mobile the copy is pushed below the video band (56.25vw is the
            16:9 height of a full-width clip). Desktop centres normally. */}
        <div className="container mx-auto px-6 pb-12 pt-[calc(56.25vw+2rem)] md:px-10 md:py-0">
          <div className="max-w-3xl">
            <motion.div
              className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-blue-300"
              {...riseIn(0.15)}
            >
              <span className="h-px w-8 bg-blue-500" />
              Andheri East, Mumbai &middot; Since 2008
            </motion.div>

            <motion.h1
              className="mt-5 text-[2rem] font-semibold leading-[1.12] tracking-tight sm:text-4xl md:text-[2.75rem] lg:text-5xl"
              {...riseIn(0.25)}
            >
              Advanced Security Solutions for Your{" "}
              <span className="text-blue-400">Peace of Mind</span>
            </motion.h1>

            <motion.div className="mt-6" {...riseIn(0.35)}>
              <span className="block text-sm font-medium uppercase tracking-[0.14em] text-white/45 md:text-base md:tracking-[0.1em]">
                We design, install and maintain
              </span>
              <Typewriter
                words={CAPABILITIES}
                className="mt-1.5 text-xl font-semibold leading-[1.25] tracking-tight text-blue-400 sm:text-2xl md:text-[1.75rem]"
              />
            </motion.div>

            <motion.p
              className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg"
              {...riseIn(0.45)}
            >
              Mumbai and Andheri since 2008 &mdash; over 2,000 projects
              completed, every camera STQC and BIS certified.
            </motion.p>

            <motion.div
              className="mt-8 border-t border-blue-400/20 pt-5 md:mt-10"
              {...riseIn(0.6)}
            >
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.22em] text-blue-300/70">
                Authorised partner
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-white/70">
                {PARTNERS.map((partner, i) => (
                  <React.Fragment key={partner}>
                    {i > 0 && (
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-blue-500" />
                    )}
                    <span>{partner}</span>
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </HeroHighlight>

      {/* --- ABOUT SECTION --- */}
      <AboutSection />

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

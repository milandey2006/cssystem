"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { X, ChevronLeft, ChevronRight, Maximize2, ShieldCheck } from "lucide-react";

function formatIssued(date) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

export default function CertificatesClient({ certificates }) {
  // Index of the certificate being viewed full screen; null when closed.
  const [openIndex, setOpenIndex] = useState(null);
  const isOpen = openIndex !== null;
  const current = isOpen ? certificates[openIndex] : null;

  const close = useCallback(() => setOpenIndex(null), []);

  const step = useCallback(
    (direction) => {
      setOpenIndex((i) => {
        if (i === null) return i;
        return (i + direction + certificates.length) % certificates.length;
      });
    },
    [certificates.length]
  );

  // Escape closes, arrows move between certificates.
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, step]);

  // Stop the page behind the overlay from scrolling while it's open.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  return (
    <div className="min-h-screen bg-white">
      {/* --- HEADER --- */}
      <section className="border-b border-gray-100 bg-gradient-to-b from-blue-50/60 to-white">
        <div className="container mx-auto px-4 py-16 md:px-6 md:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-blue-600">
              <span className="h-px w-8 bg-blue-500" />
              Credentials
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Our Certificates
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              Champion Security System is STQC and BIS certified and holds
              manufacturer authorisation from the brands we supply. Every
              certificate below is genuine and current &mdash; click any one to
              view it full screen.
            </p>
          </div>
        </div>
      </section>

      {/* --- GRID --- */}
      <section className="container mx-auto px-4 py-14 md:px-6 md:py-20">
        {certificates.length === 0 ? (
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-16 text-center">
            <ShieldCheck className="mx-auto h-10 w-10 text-gray-300" />
            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              No certificates yet
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Certificates added in Sanity Studio will appear here
              automatically.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Contact us
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate, index) => (
              <motion.button
                key={certificate._id}
                type="button"
                onClick={() => setOpenIndex(index)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4) }}
                viewport={{ once: true }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                aria-label={`View ${certificate.title} full screen`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
                  {certificate.imageUrl && (
                    <Image
                      src={certificate.imageUrl}
                      alt={certificate.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder={certificate.blurDataURL ? "blur" : "empty"}
                      blurDataURL={certificate.blurDataURL || undefined}
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-blue-900/0 transition-colors duration-300 group-hover:bg-blue-900/5" />

                  <span className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-gray-700 opacity-0 shadow-sm backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                    <Maximize2 className="h-3 w-3" />
                    View full screen
                  </span>
                </div>

                <div className="flex flex-1 flex-col border-t border-gray-100 p-5">
                  <h2 className="text-base font-semibold leading-snug text-gray-900 transition-colors group-hover:text-blue-700">
                    {certificate.title}
                  </h2>

                  {(certificate.issuer || certificate.issuedDate) && (
                    <p className="mt-1.5 text-xs font-medium uppercase tracking-wider text-gray-400">
                      {[certificate.issuer, formatIssued(certificate.issuedDate)]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  )}

                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-600">
                    {certificate.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </section>

      {/* --- FULL SCREEN VIEWER --- */}
      {isOpen && current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm"
          onClick={close}
        >
          {/* Top bar */}
          <div
            className="flex shrink-0 items-start justify-between gap-4 px-4 py-4 md:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <h2 className="truncate text-base font-semibold text-white md:text-lg">
                {current.title}
              </h2>
              {(current.issuer || current.issuedDate) && (
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-blue-300">
                  {[current.issuer, formatIssued(current.issuedDate)]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-3">
              {certificates.length > 1 && (
                <span className="hidden text-xs font-medium tabular-nums text-white/50 sm:block">
                  {openIndex + 1} / {certificates.length}
                </span>
              )}
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="rounded-full border border-white/20 p-2 text-white transition-colors hover:border-white/50 hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20">
            {certificates.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous certificate"
                className="absolute left-2 z-10 rounded-full border border-white/20 bg-black/40 p-2.5 text-white transition-colors hover:border-white/50 hover:bg-white/10 md:left-6"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            <div
              className="relative h-full w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {current.imageUrl && (
                <Image
                  src={current.imageUrl}
                  alt={current.title}
                  fill
                  sizes="100vw"
                  priority
                  className="object-contain"
                />
              )}
            </div>

            {certificates.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next certificate"
                className="absolute right-2 z-10 rounded-full border border-white/20 bg-black/40 p-2.5 text-white transition-colors hover:border-white/50 hover:bg-white/10 md:right-6"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Description */}
          <div
            className="shrink-0 border-t border-white/10 px-4 py-5 md:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-white/75 md:text-base">
              {current.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

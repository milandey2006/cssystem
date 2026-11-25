"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Logo from "@/public/logo/logo.png"

// Main navigation. "Products" points at /brands (the brands-by-category
// landing page). "Software" is a dropdown of the two in-house products:
// Munshi (quotations/billing) and Attenza (cloud biometric attendance).
// Calculator and Blog live in the footer to keep the top bar short.
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/brands", label: "Products" },
  { href: "/services", label: "Services" },
  {
    href: "https://cctv-rentals.championsecuritysystem.com/",
    label: "Rentals",
    external: true,
  },
  { href: "/projects", label: "Projects" },
  { href: "/certificates", label: "Certificates" },
  {
    label: "Software",
    href: "/software",
    children: [
      {
        href: "/software",
        label: "Munshi",
        desc: "Quotations, GST billing, stock & staff",
      },
      {
        href: "/software/attenza",
        label: "Attenza",
        desc: "Cloud biometric attendance, payroll & gate",
      },
    ],
  },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [softwareOpen, setSoftwareOpen] = useState(false);
  const [mobileSoftwareOpen, setMobileSoftwareOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMobile = () => {
    setMenuOpen(false);
    setMobileSoftwareOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4 px-4 md:px-0">
        <div className="flex shrink-0 items-center gap-2">
          <Link href="/" className="flex items-center gap-2 md:pl-7">
            <Image
              src={Logo}
              alt="Champion Security System Logo"
              width={40}
              height={40}
              className="rounded"
            />
            <span className="font-bold text-base lg:text-xl">
              Champion Security System
            </span>
          </Link>
        </div>

        {/* Desktop Nav — nine links plus the long brand name need room, so the
            full bar shows from xl (1280). Below that the hamburger carries it,
            which avoids a horizontal scroll on tablets / small laptops. */}
        <nav className="hidden flex-1 items-center justify-center gap-4 xl:flex xl:gap-6">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setSoftwareOpen(true)}
                onMouseLeave={() => setSoftwareOpen(false)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 whitespace-nowrap text-sm font-medium transition-colors hover:text-primary xl:text-base"
                >
                  {link.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${
                      softwareOpen ? "rotate-180" : ""
                    }`}
                  />
                </Link>
                {softwareOpen && (
                  <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
                    <div className="w-72 overflow-hidden rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
                      {link.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={() => setSoftwareOpen(false)}
                          className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-blue-50"
                        >
                          <span className="block font-semibold text-gray-900">
                            {c.label}
                          </span>
                          <span className="mt-0.5 block text-xs text-gray-500">
                            {c.desc}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="whitespace-nowrap text-sm font-medium transition-colors hover:text-primary xl:text-base"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Hamburger for mobile */}
        <button
          onClick={toggleMenu}
          className="xl:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 focus:outline-none"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-full bg-current transition-transform duration-300 ease-in-out ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-current transition-opacity duration-300 ease-in-out ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-current transition-transform duration-300 ease-in-out ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`xl:hidden bg-background border-t border-gray-700 transition-max-height duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-[40rem]" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-4 p-4">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <li key={link.label}>
                <button
                  type="button"
                  onClick={() => setMobileSoftwareOpen((v) => !v)}
                  className="flex w-full items-center justify-between text-md font-medium transition-colors hover:text-primary"
                >
                  {link.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      mobileSoftwareOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileSoftwareOpen && (
                  <div className="mt-3 space-y-3 border-l-2 border-gray-100 pl-3">
                    {link.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={closeMobile}
                        className="block"
                      >
                        <span className="block text-sm font-semibold text-gray-800 hover:text-primary">
                          {c.label}
                        </span>
                        <span className="block text-xs text-gray-500">
                          {c.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="block text-md font-medium transition-colors hover:text-primary"
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>
    </header>
  );
}

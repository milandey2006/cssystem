"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import Logo from "@/public/logo/logo.png"

// Main navigation. "Products" points at /brands (the brands-by-category
// landing page); the filterable catalogue lives on at /products and is
// reached by clicking a brand there. Calculator and Blog were moved to
// the footer to keep the top bar short.
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
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

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

        {/* Desktop Nav */}
        <nav className="hidden flex-1 items-center justify-center gap-4 md:flex lg:gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="whitespace-nowrap text-sm font-medium transition-colors hover:text-primary lg:text-base"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger for mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 focus:outline-none"
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
        className={`md:hidden bg-background border-t border-gray-700 transition-max-height duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-[34rem]" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-4 p-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="block text-md font-medium transition-colors hover:text-primary"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

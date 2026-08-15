"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import Logo from "@/public/logo/logo.png"

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle hamburger menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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

        {/* Desktop Nav — centred in the space left over by the logo rather
            than absolutely centred on the viewport, which was overlapping
            the brand name once the link list grew. */}
        <nav className="hidden flex-1 items-center justify-center gap-4 md:flex lg:gap-6">
          <Link
            href="/"
            className="whitespace-nowrap text-sm font-medium transition-colors hover:text-primary lg:text-base"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="whitespace-nowrap text-sm font-medium transition-colors hover:text-primary lg:text-base"
          >
            About
          </Link>
          <Link
            href="/products"
            className="whitespace-nowrap text-sm font-medium transition-colors hover:text-primary lg:text-base"
          >
            Products
          </Link>
          <Link
            href="/services"
            className="whitespace-nowrap text-sm font-medium transition-colors hover:text-primary lg:text-base"
          >
            Services
          </Link>
          <Link
            href="https://cctv-rentals.championsecuritysystem.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap text-sm font-medium transition-colors hover:text-primary lg:text-base"
          >
            Rentals
          </Link>
          <Link
            href="/cctv-calculator"
            className="whitespace-nowrap text-sm font-medium transition-colors hover:text-primary lg:text-base"
          >
            Calculator
          </Link>
          <Link
            href="/projects"
            className="whitespace-nowrap text-sm font-medium transition-colors hover:text-primary lg:text-base"
          >
            Projects
          </Link>
          <Link
            href="/certificates"
            className="whitespace-nowrap text-sm font-medium transition-colors hover:text-primary lg:text-base"
          >
            Certificates
          </Link>
          <Link
            href="/blog"
            className="whitespace-nowrap text-sm font-medium transition-colors hover:text-primary lg:text-base"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="whitespace-nowrap text-sm font-medium transition-colors hover:text-primary lg:text-base"
          >
            Contact
          </Link>
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
          <li>
            <Link
              href="/"
              className="block text-md font-medium transition-colors hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <Link
              href="/about"
              className="block text-md font-medium transition-colors hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          <li>
            <Link
              href="/products"
              className="block text-md font-medium transition-colors hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="block text-md font-medium transition-colors hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="https://cctv-rentals.championsecuritysystem.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-md font-medium transition-colors hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              Rentals
            </Link>
          </li>
          <li>
            <Link
              href="/cctv-calculator"
              className="block text-md font-medium transition-colors hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              Calculator
            </Link>
          </li>
          <li>
          <Link
            href="/projects"
            className="text-md font-medium transition-colors hover:text-primary"
          >
            Projects
          </Link>
          </li>
          <li>
            <Link
              href="/certificates"
              className="block text-md font-medium transition-colors hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              Certificates
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="block text-md font-medium transition-colors hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block text-md font-medium transition-colors hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

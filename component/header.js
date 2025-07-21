"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import Logo from "@/public/logo/logo.jpg"

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle hamburger menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* <div className="overflow-hidden whitespace-nowrap bg-black text-white py-2">
        <div className="inline-block animate-marquee text-xl font-bold px-4">
          Welcome to Champion Security System &nbsp; 🚨 &nbsp; Protecting What
          Matters Most &nbsp; | &nbsp;
        </div>
      </div> */}
      <div className="container flex h-16 items-center justify-between px-4 md:px-0">
        {/* Logo */}
        {/* <Image
          src={Logo}
          alt="Champion Security System Logo"
          width={50}
          height={50}
          className="h-10 w-10 rounded-full"
        /> */}
        <div className="flex items-center gap-2">
    <Link href="/" className="flex items-center gap-2 md:pl-7">
      <Image
        src={Logo}
        alt="Champion Security System Logo"
        width={40}
        height={40}
        className="rounded"
      />
      <span className="font-bold text-xl">
        Champion Security System
      </span>
    </Link>
  </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 absolute left-1/2 -translate-x-1/2">
          <Link
            href="/"
            className="text-md font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/services"
            className="text-md font-medium transition-colors hover:text-primary"
          >
            Services
          </Link>
          <Link
            href="/about"
            className="text-md font-medium transition-colors hover:text-primary"
          >
            About
          </Link>
          <Link
            href="/products"
            className="text-md font-medium transition-colors hover:text-primary"
          >
            Products
          </Link>
          <Link
            href="/projects"
            className="text-md font-medium transition-colors hover:text-primary"
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className="text-md font-medium transition-colors hover:text-primary"
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
          menuOpen ? "max-h-96" : "max-h-0"
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
              href="/about"
              className="block text-md font-medium transition-colors hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              About
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

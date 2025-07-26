import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { FileText } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Part 1: Call-to-Action Section */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Secure Your Property?
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-gray-300">
            Contact us today for a free consultation and quote
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact">
            <Button
              variant="outline"
              className="bg-white text-gray-900 hover:bg-gray-200"
            >
              Get a Quote
            </Button>
            </Link>
            <Link
              href="/contact">
            <Button
              variant="outline"
              className="bg-white text-gray-900 hover:bg-gray-200"
            >
              Contact Sales
            </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700"></div>

      {/* Part 2: Main Footer Links/Info Section */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">
                Champion Security System
              </span>
            </Link>
            <p className="text-gray-400">
              Providing advanced security solutions for homes and businesses
              since 2008.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/cssytem"
                className="text-gray-400 hover:text-white"
              >
                <Facebook />
              </Link>
              <Link href="" className="text-gray-400 hover:text-white">
                <Twitter />
              </Link>
              <Link
                href="https://www.instagram.com/cctvcss.official"
                className="text-gray-400 hover:text-white"
              >
                <Instagram />
              </Link>
              <Link
                href="https://www.linkedin.com/in/rajesh-dey-148b9643/"
                className="text-gray-400 hover:text-white"
              >
                <Linkedin />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-white"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-white"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="/documents/profile.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline inline-flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  View Company Profile (PDF)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Products */}
          <div className="space-y-4">
            <h3 className="font-semibold tracking-wider uppercase">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-white"
                >
                  CCTV Cameras
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-white"
                >
                  NVR & Server Systems
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-white"
                >
                  Access Control
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-white"
                >
                  Alarm Systems
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-white"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-white"
                >
                  Video Door Phone
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-4">
            <h3 className="font-semibold tracking-wider uppercase">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  6/338 Andheri Subway, Andheri West, Mumbai 400058,
                  Maharashtra, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span className="text-gray-400">022-31476838</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span className="text-gray-400">
                  info@championsecuritysystem.com
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Part 3: Copyright Bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 md:px-6 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} CSS. All rights reserved. Made with <span className="text-gray-500">❤</span> by <a href="https://www.linkedin.com/in/milandey/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Milan.Dev</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

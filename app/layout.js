"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Marquee from "@/component/Marquee"
import Header from "../component/header";
import Footer from "../component/footer";
import WhatsAppButton from "@/component/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Champion Security System",
  description:
    "Champion Security System is a leading provider of advanced security solutions, specializing in CCTV, access control, and alarm systems. We are committed to delivering top-notch security services to protect your home and business.",
  keywords: [
    /* ... your keywords ... */
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <div className="relative flex min-h-screen flex-col">

          <Marquee 
            speed={60}
            backgroundColor="bg-[#1e3a8a]"
            textColor="text-white"
            className="py-2 text-sm font-medium"
          >
            🚨 Special Offer: 20% OFF on all CCTV installations this month! Call +91 8080806288 for immediate assistance 📞
          </Marquee>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* WhatsApp Button - Now handles its own office hours logic */}
          <WhatsAppButton
            phoneNumber="+918080806288"
            message="Hello! I'm interested in your services."
          />
        </div>
      </body>
    </html>
  );
}

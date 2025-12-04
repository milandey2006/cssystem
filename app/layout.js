"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Marquee from "@/component/Marquee"
import Header from "../component/header";
import Footer from "../component/footer";
import WhatsAppButton from "@/component/WhatsAppButton";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <Analytics />
        <div className="relative flex min-h-screen flex-col">

          <Marquee 
            speed={60}
            backgroundColor="bg-[#1e3a8a]"
            textColor="text-white"
            className="py-2 text-sm font-medium"
          >
            Thank you for connecting CSS. We are Partners with Hanwha, Honeywell, Matrix, Panasonic i-Pro, Axis Communications CCTV Installation and Services in Mumbai.
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

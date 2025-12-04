import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FeaturedProducts from '@/component/featured-products';
import Testimonials from '@/component/testimonials';
import HeroSection from '@/component/hero';
import CSSClientsSlider from '@/component/client-slider';



export const metadata = {
  title: "Best CCTV Installation in Mumbai & Andheri | Champion Security System",
  description: "Professional CCTV installation in Mumbai and Andheri. We provide advanced security solutions, IP cameras, and 24/7 monitoring for homes and businesses.",
  keywords: ["cctv installation in mumbai", "cctv installation in andheri", "security systems mumbai", "ip camera installation", "access control mumbai", "video door phone mumbai", "biometric attendance system"],
  openGraph: {
    title: "Best CCTV Installation in Mumbai & Andheri | Champion Security System",
    description: "Secure your property with Champion Security System. Expert CCTV installation and maintenance in Mumbai and Andheri.",
    type: "website",
    locale: "en_IN",
    url: "https://championsecurity.in",
    siteName: "Champion Security System",
  },
};

export default function Home() {
  return (
    <div>

      <HeroSection />
      
      <FeaturedProducts />

      <CSSClientsSlider/>

      <Testimonials />

    </div>

  );
}

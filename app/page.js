export const revalidate = 0;
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FeaturedProducts from '@/component/featured-products';
import Testimonials from '@/component/testimonials';
import HeroSection from '@/component/hero';
import CSSClientsSlider from '@/component/client-slider';
import CallButton from '@/component/CallButton';



export const metadata = {
  // Hardcoded with the full brand suffix: Next.js does not apply the root
  // layout's title.template to the literal "/" route (verified in both dev
  // and production builds), unlike every other nested route.
  title: "Best CCTV Installation in Mumbai & Andheri | Champion Security System",
  description: "AI CCTV cameras, NVRs & access control in Mumbai & Andheri — sales, installation & service. Authorised dealer for Hanwha, Pelco, Axis, Matrix & Honeywell.",
  keywords: ["ai cctv camera mumbai", "cctv installation in mumbai", "cctv installation in andheri", "hanwha cctv dealer mumbai", "pelco axis matrix cctv mumbai", "cctv amc & service mumbai", "security systems mumbai", "ip camera installation", "access control mumbai", "video door phone mumbai", "biometric attendance system"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Best CCTV Installation in Mumbai & Andheri | Champion Security System",
    description: "AI-powered CCTV, access control & networking in Mumbai. Sales & service — authorised dealer for Hanwha Vision, Pelco, Axis, Matrix, Honeywell & Panasonic i-PRO.",
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Champion Security System",
  },
};

export default function Home() {
  return (
    <div>

      <CallButton />

      <HeroSection />
      
      <FeaturedProducts />

      <CSSClientsSlider/>

      <Testimonials />

    </div>

  );
}

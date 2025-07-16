import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FeaturedProducts from '@/component/featured-products';
import Testimonials from '@/component/testimonials';
import HeroSection from '@/component/hero';
import CSSClientsSlider from '@/component/client-slider';



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

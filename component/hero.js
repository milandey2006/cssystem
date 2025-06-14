import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BiSolidCctv } from "react-icons/bi";
import { BsCameraVideoFill } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import heroImage from "@/public/hero/hero.jpg";

const HeroSection = () => {
  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Text Section */}
          <div className="flex flex-col gap-4 md:gap-6 md:w-1/2 text-center md:text-left mt-25">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Advanced Security Solutions for Your Peace of Mind
            </h1>
            <p className="text-gray-300 max-w-[600px] mx-auto md:mx-0">
              Protect what matters most with our cutting-edge CCTV and
              surveillance systems. Professional installation and 24/7
              monitoring services available.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="/products"
                className="inline-block px-6 py-3 bg-white text-gray-900 font-semibold rounded-md hover:bg-gray-100 text-center"
              >
                Browse Products
              </a>
              <a
                href="/contact"
                className="inline-block px-6 py-3 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-gray-900 text-center"
              >
                Request Consultation
              </a>
            </div>
          </div>

          {/* Responsive Image Section */}
          <div className="flex-1 w-full md:w-auto">
            <div className="aspect-square w-full md:w-96 bg-gray-200 rounded-lg flex items-center justify-center">
              {/* <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
              </svg> */}
              <Image
                src={heroImage}
                alt="Hero Image"
                className="object-cover rounded-lg"
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-white">
        {/* The `container` and `mx-auto` classes work together to center the content horizontally */}
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-black">
                Why Choose Us?
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed">
                We provide comprehensive security solutions tailored to your
                specific needs
              </p>
            </div>
          </div>

          {/* The `mx-auto` class on this grid centers the three columns as a group */}
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
            {/* Feature 1: HD Cameras */}
            {/* `items-center` (because of flex-col) and `text-center` ensure content inside this div is centered */}
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <BiSolidCctv className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">IP Cameras</h3>
              <p className="text-gray-500">
                Crystal clear footage with our high-definition camera systems
              </p>
            </div>

            {/* Feature 2: 24/7 Recording */}
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <BsCameraVideoFill className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">24/7 Recording</h3>
              <p className="text-gray-500">
                Continuous monitoring with advanced motion detection
              </p>
            </div>

            {/* Feature 3: Instant Alerts */}
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <FaBell className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">Instant Alerts</h3>
              <p className="text-gray-500">
                Real-time notifications sent directly to your mobile device
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;

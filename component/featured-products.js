import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import networkCameraImage from "@/public/network-camera.jpg";
import videoDoorPhoneImage from "@/public/video-door-phone.png";
import biometricImage from "@/public/biometric-access.jpg";
import wirelessCameraImage from "@/public/wireless-camera.jpg";
import digitalDoorLockImage from "@/public/yale.jpg"; 

const products = [
    {
        category: "Network Cameras",
        title: "Network Cameras",
        description: "Ultra HD 4K resolution with 30m-200m night vision and 360° coverage",
        badge: "Best Seller",
        image: networkCameraImage,
        alt: "Network Camera"
    },
    {
        category: "Video Door Phones",
        title: "Video Door Phones",
        description: "Smart video door phone with 7-10 inch color display and two-way intercom",
        badge: "New",
        image: videoDoorPhoneImage,
        alt: "Video Door Phone"
    },
    {
        category: "Biometric Systems",
        title: "Biometric Access Control",
        description: "Advanced biometric access control system with fingerprint and facial recognition",
        badge: null,
        image: biometricImage,
        alt: "Biometric Access Control"
    },
    {
        category: "Wireless Cameras",
        title: "SmartGuard Wireless Camera",
        description: "Wire-free security camera with two-way audio and motion detection",
        badge: "Popular",
        image: wirelessCameraImage,
        alt: "Wireless Camera"
    },
    {
        category: "Digital Door Locks",
        title: "Smart Digital Door Lock",
        description: "Keyless entry with fingerprint, password, and remote access",
        badge: "Popular",
        image: digitalDoorLockImage,
        alt: "Digital Door Lock"
    },
];

const FeaturedProducts = () => {
  return (
    <section className="w-full py-12 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Featured Products
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
            Our most popular security solutions
          </p>
        </div>

<Link href="/products" passHref>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {products.map((product, index) => (
            <Card key={index} className="overflow-hidden flex flex-col">
              <div className="relative aspect-square w-full">
                {product.badge && (
                  <Badge 
                    variant={product.badge === 'Best Seller' ? 'default' : 'secondary'} 
                    className="absolute top-3 right-3 z-10"
                  >
                    {product.badge}
                  </Badge>
                )}
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  className="object-cover rounded-t-lg"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <CardContent className="p-6 flex-grow flex flex-col">
                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow">{product.description}</p>
                {/* <p className="text-2xl font-bold text-black">{product.price}</p> */}
              </CardContent>
            </Card>
          ))}
        </div>
        </Link>
        
        <div className="mt-16 flex justify-center">
          <Link href="/products" passHref>
            <Button variant="outline" size="lg" className="bg-white">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

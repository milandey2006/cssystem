"use client"

import { useState } from "react"
import Image from "next/image"


const clientLogos = [
  {
    id: 1,
    name: "TechCorp Solutions",
    logo: "/clients/1.png",
    type: "client",
  },
  {
    id: 2,
    name: "Hikvision",
    logo: "/clients/2.png",
    type: "client",
  },
  {
      id: 3,
      name: "Global Retail Chain",
    logo: "/clients/3.png",
    type: "client",
  },
  {
    id: 4,
    name: "Dahua Technology",
    logo: "/clients/4.png",
    type: "client",
  },
  {
    id: 5,
    name: "Metro Hospital",
    logo: "/clients/5.png",
    type: "client",
  },
  {
    id: 6,
    name: "Axis Communications",
    logo: "/clients/6.png",
    type: "client",
  },
  {
    id: 7,
    name: "City Bank",
    logo: "/clients/7.png",
    type: "client",
  },
  {
    id: 8,
    name: "Bosch Security",
    logo: "/clients/8.jpg",
    type: "client",
  },
//   {
//     id: 9,
//     name: "Prime Properties",
//     logo: "/clients/9.jpg",
//     type: "client",
//   },
//   {
//     id: 10,
//     name: "Honeywell",
//     logo: "/clients/10.jpg",
//     type: "client",
//   },
//   {
//     id: 11,
//     name: "Smart Manufacturing",
//     logo: "/clients/11.jpg",
//     type: "client",
//   },
//   {
//     id: 12,
//     name: "Panasonic Security",
//     logo: "/clients/12.jpg",
//     type: "client",
//   },

  {
    id: 1,
    name: "TechCorp Solutions",
    logo: "/dealer/1.png",
    type: "dealer",
  },
  {
    id: 2,
    name: "Hikvision",
    logo: "/dealer/2.png",
    type: "dealer",
  },
  {
      id: 3,
      name: "Global Retail Chain",
    logo: "/dealer/3.png",
    type: "dealer",
  },
  {
    id: 4,
    name: "Dahua Technology",
    logo: "/dealer/4.png",
    type: "dealer",
  },
  {
    id: 5,
    name: "Metro Hospital",
    logo: "/dealer/5.png",
    type: "dealer",
  },
  {
    id: 6,
    name: "Axis Communications",
    logo: "/dealer/6.png",
    type: "dealer",
  },
  {
    id: 7,
    name: "City Bank",
    logo: "/dealer/7.png",
    type: "dealer",
  },
  {
    id: 8,
    name: "Bosch Security",
    logo: "/dealer/8.png",
    type: "dealer",
  },
//   {
//     id: 9,
//     name: "Prime Properties",
//     logo: "/dealers/9.png",
//     type: "dealer",
//   },
//   {
//     id: 10,
//     name: "Honeywell",
//     logo: "/dealers/10.png",
//     type: "dealer",
//   },
//   {
//     id: 11,
//     name: "Smart Manufacturing",
//     logo: "/dealers/11.png",
//     type: "dealer",
//   },
//   {
//     id: 12,
//     name: "Panasonic Security",
//     logo: "/dealers/12.png",
//     type: "dealer",
//   },
//   {
//     id: 13,
//     name: "Panasonic Security",
//     logo: "/dealers/13.jpg",
//     type: "dealer",
//   },
//   {
//     id: 14,
//     name: "Panasonic Security",
//     logo: "/dealers/14.jpg",
//     type: "dealer",
//   },
//   {
//     id: 15,
//     name: "Panasonic Security",
//     logo: "/dealers/15.jpg",
//     type: "dealer",
//   },
//   {
//     id: 16,
//     name: "Panasonic Security",
//     logo: "/dealers/16.jpg",
//     type: "dealer",
//   },
//   {
//     id: 17,
//     name: "Panasonic Security",
//     logo: "/dealers/17.jpg",
//     type: "dealer",
//   },
//   {
//     id: 18,
//     name: "Panasonic Security",
//     logo: "/dealers/18.jpg",
//     type: "dealer",
//   },
  
]

function LogoSlider({ logos, title }) {
  const [isPaused, setIsPaused] = useState(false)

  // Duplicate logos for seamless looping
  const duplicatedLogos = [...logos, ...logos]

  return (
    <div className="mb-12">
      <h3 className="text-xl font-semibold text-center mb-6 text-gray-700">{title}</h3>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex logo-slider"
          style={{
            animationPlayState: isPaused ? "paused" : "running",
            width: `calc(300% + 2rem)`, // Double width plus some extra space
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex-shrink-0 px-1"
              style={{ width: `calc(50% / ${logos.length})` }}
            >
              <div className="flex items-center justify-center h-15 bg-white rounded-lg  hover:shadow-md transition-shadow duration-300">
                <Image
                  src={logo.logo || "/placeholder.svg"}
                  alt={logo.name}
                  width={100}
                  height={50}
                  className="h-12 w-full object-contain transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-2">
        <p className="text-xs text-gray-400">
          {/* {isPaused ? "Hover to pause • Paused" : "Hover to pause • Auto-scrolling"} */}
        </p>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .logo-slider {
          animation: slide 30s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default function CSSClientsSlider() {
  return (
    <div className="mt-12">
      {/* Clients Section */}
      <LogoSlider logos={clientLogos.filter((logo) => logo.type === "client")} title="Our Valued Clients" />

      {/* Dealers Section */}
      <LogoSlider logos={clientLogos.filter((logo) => logo.type === "dealer")} title="Our Trusted Partners" />

      {/* Statistics */}
      <div className="text-center mt-8">
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-md text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>

            <span>15+ Technology Partners</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Since 2008</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>2000+ Satisfied Clients</span>
          </div>
        </div>
      </div>
    </div>
  )
}

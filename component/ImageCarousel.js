// components/ImageCarousel.js
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ImageCarousel({ images, projectName }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!images || images.length <= 1) return

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000) // Rotate every 3 seconds

    return () => clearInterval(intervalId)
  }, [images])

  if (!images || images.length === 0) {
    return (
      <div className="relative h-48 w-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">No images available</span>
      </div>
    )
  }

  return (
    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
      {/* Main Image */}
      <Image
        src={images[currentIndex] || '/placeholder-project.jpg'}
        alt={`${projectName} - Image ${currentIndex + 1}`}
        fill
        className="object-cover transition-opacity duration-500"
      />

      {/* Image Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentIndex
                  ? 'bg-white'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-md text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  )
}

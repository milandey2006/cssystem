'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const BrandCard = ({ brand }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const maxLength = 150
  
  const toggleExpand = (e) => {
    // Prevent the Link from triggering when clicking the toggle
    e.preventDefault()
    e.stopPropagation()
    setIsExpanded(!isExpanded)
  }

  const isLong = brand.desc && brand.desc.length > maxLength
  const displayDesc = isExpanded || !isLong 
    ? brand.desc 
    : `${brand.desc.substring(0, maxLength)}...`

  return (
    <Link 
      href="/faq" 
      className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full cursor-pointer"
    >
      <h3 className="text-blue-600 font-bold text-xl mb-3 group-hover:text-blue-800 transition-colors">
        {brand.name}
      </h3>
      <div className="flex-grow">
        <p className="text-sm text-gray-600 leading-relaxed">
          {displayDesc}
          {isLong && (
            <span 
              onClick={toggleExpand}
              role="button"
              className="ml-1 text-blue-500 hover:text-blue-700 font-bold cursor-pointer inline-block"
            >
              {isExpanded ? 'Read Less' : ' Read More'}
            </span>
          )}
        </p>
      </div>
    </Link>
  )
}

export default BrandCard

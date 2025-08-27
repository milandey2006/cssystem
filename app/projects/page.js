'use client'

import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import ImageCarousel from '@/component/ImageCarousel'
import banner from "@/public/project/banner.jpg"

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  
  // Refs for sliding functionality
  const scrollContainerRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

  const categories = [
    { id: 'all', title: 'All Projects', value: 'all' },
    { id: 'commercial', title: 'Commercial Security', value: 'commercial' },
    { id: 'residential', title: 'Residential Security', value: 'residential' },
    { id: 'industrial', title: 'Industrial Security', value: 'industrial' },
    { id: 'government', title: 'Government Security', value: 'government' },
    { id: 'institutional', title: 'Institutional Security', value: 'institutional' }
  ]

  // Fetch projects from Sanity
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project"] {
          _id,
          name,
          description,
          "imageUrls": images[].asset->url,
          category,
          technologies,
          location,
          featured,
          completedDate
        } | order(completedDate desc)`
        
        const data = await client.fetch(query)
        setProjects(data)
        setFilteredProjects(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching projects:', error)
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Filter projects by category
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeCategory))
    }
  }, [activeCategory, projects])

  // Check scroll position and show/hide arrows
  const checkScrollPosition = () => {
    const container = scrollContainerRef.current
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0)
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      )
    }
  }

  useEffect(() => {
    checkScrollPosition()
    window.addEventListener('resize', checkScrollPosition)
    return () => window.removeEventListener('resize', checkScrollPosition)
  }, [])

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -200, behavior: 'smooth' })
  }

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 200, behavior: 'smooth' })
  }

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading projects...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Your Original Header Section */}
      <section className="relative bg-gray-900 text-white py-20 px-4">
        {/* You'll need to import your banner image */}
        <Image
          src={banner}
          className="absolute inset-0 object-cover w-full h-full z-0 bg-black/30"
          alt="Security services banner"
        />
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div className="relative z-20 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-shadow-lg/30">Our Projects</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 text-shadow-lg/30">
            Explore our comprehensive security solutions implemented across various industries. 
            Each project showcases our commitment to delivering cutting-edge security technology.
          </p>
        </div>
      </section>

      {/* Responsive Sliding Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollPosition}
            className="flex gap-4 overflow-x-auto scrollbar-hide py-2 px-8 md:px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.value)}
                className={`flex-shrink-0 px-6 py-3 rounded-full transition-all duration-300 font-medium whitespace-nowrap ${
                  activeCategory === category.value
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300 hover:border-blue-300'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Mobile-only: Show active category */}
        <div className="md:hidden mt-4 text-center">
          <span className="text-sm text-gray-600">
            Showing: <span className="font-medium text-blue-600">
              {categories.find(cat => cat.value === activeCategory)?.title}
            </span>
          </span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl text-gray-600">No projects found for this category.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Project Card Component
function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <ImageCarousel 
          images={project.imageUrls} 
          projectName={project.name}
        />
        {project.featured && (
          <div className="absolute top-4 left-4 bg-yellow-500 text-white px-2 py-1 rounded-md text-sm font-semibold z-10">
            Featured
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {project.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="flex items-center mb-3">
          <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm text-gray-600 capitalize">
            {project.location?.replace('-', ' ')}
          </span>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies?.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.technologies?.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className={`px-3 py-1 text-xs rounded-full font-medium ${getCategoryColor(project.category)}`}>
            {getCategoryTitle(project.category)}
          </span>
          {project.completedDate && (
            <span className="text-xs text-gray-500">
              {new Date(project.completedDate).getFullYear()}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// Helper functions
function getCategoryColor(category) {
  const colors = {
    commercial: 'bg-green-100 text-green-800',
    residential: 'bg-blue-100 text-blue-800',
    industrial: 'bg-yellow-100 text-yellow-800',
    institutional: 'bg-purple-100 text-purple-800'
  }
  return colors[category] || 'bg-gray-100 text-gray-800'
}

function getCategoryTitle(category) {
  const titles = {
    commercial: 'Commercial',
    residential: 'Residential',
    industrial: 'Industrial',
    institutional: 'Institutional'
  }
  return titles[category] || category
}

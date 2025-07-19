'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { client } from '@/lib/sanity'
import { Search, X, Filter, ChevronLeft, ChevronRight, Calendar, MapPin, Tag } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import banner from '@/public/project/banner.jpg' // Adjust the path as needed
 // Update path as needed

// Main Projects Page Component
export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [allCategories, setAllCategories] = useState([])
  const [allLocations, setAllLocations] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProjects, setFilteredProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 9 // 3 rows × 3 columns for larger grid
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedLocations, setSelectedLocations] = useState([])
  const [selectedTechnologies, setSelectedTechnologies] = useState([])
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  // Static filter options for technologies
  const technologies = [
    'CCTV Cameras',
    'NVR Systems', 
    'Access Control',
    'Biometric Systems',
    'Fire Alarms',
    'Motion Sensors',
    'Smart Locks',
    'Network Infrastructure',
    'Mobile Apps',
    'Cloud Storage'
  ]

  // Mock data (replace with actual Sanity fetch)
  const mockProjects = [
    {
      _id: '1',
      title: 'Smart Corporate Security Hub',
      slug: { current: 'smart-corporate-security-hub' },
      description: 'Complete enterprise-grade security solution with AI-powered surveillance, biometric access control, and integrated fire safety systems for a modern corporate campus.',
      image: {
        asset: { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop' },
        alt: 'Corporate security system'
      },
      category: 'Commercial Security',
      location: 'Mumbai, Maharashtra',
      completionDate: '2024-01-15',
      technologies: ['CCTV Cameras', 'Smart Locks', 'Mobile Apps', 'Access Control'],
      featured: true
    },
    {
      _id: '2',
      title: 'Luxury Residential Complex Security',
      slug: { current: 'luxury-residential-complex' },
      description: 'Premium residential security installation featuring smart home integration, perimeter protection, visitor management, and 24/7 monitoring for an upscale housing society.',
      image: {
        asset: { url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop' },
        alt: 'Residential security'
      },
      category: 'Residential Security',
      location: 'Pune, Maharashtra',
      completionDate: '2023-12-20',
      technologies: ['CCTV Cameras', 'NVR Systems', 'Network Infrastructure'],
      featured: false
    },
    {
      _id: '3',
      title: 'Industrial Manufacturing Plant Security',
      slug: { current: 'industrial-manufacturing-security' },
      description: 'Comprehensive industrial security solution with hazard detection, automated fire suppression, restricted area monitoring, and emergency response systems.',
      image: {
        asset: { url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop' },
        alt: 'Industrial security'
      },
      category: 'Industrial Security',
      location: 'Nashik, Maharashtra',
      completionDate: '2024-02-10',
      technologies: ['Fire Alarms', 'Motion Sensors', 'Mobile Apps'],
      featured: true
    },
    {
      _id: '4',
      title: 'Healthcare Facility Security Suite',
      slug: { current: 'healthcare-security-suite' },
      description: 'Specialized healthcare security implementation with patient privacy compliance, emergency protocols, access management, and integrated communication systems.',
      image: {
        asset: { url: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop' },
        alt: 'Healthcare security'
      },
      category: 'Commercial Security',
      location: 'Thane, Maharashtra',
      completionDate: '2023-11-30',
      technologies: ['Biometric Systems', 'Access Control', 'CCTV Cameras'],
      featured: false
    },
    {
      _id: '5',
      title: 'Smart Retail Chain Security',
      slug: { current: 'smart-retail-chain-security' },
      description: 'Multi-location retail security deployment with loss prevention, customer analytics, inventory monitoring, and centralized management dashboard.',
      image: {
        asset: { url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop' },
        alt: 'Retail security'
      },
      category: 'Commercial Security',
      location: 'Navi Mumbai, Maharashtra',
      completionDate: '2024-03-05',
      technologies: ['CCTV Cameras', 'Cloud Storage', 'Mobile Apps', 'Motion Sensors'],
      featured: true
    },
    {
      _id: '6',
      title: 'Educational Institution Security',
      slug: { current: 'educational-institution-security' },
      description: 'Campus-wide security solution ensuring student safety with visitor management, emergency alerts, perimeter monitoring, and staff coordination systems.',
      image: {
        asset: { url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=800&h=600&fit=crop' },
        alt: 'School security'
      },
      category: 'Institutional Security',
      location: 'Aurangabad, Maharashtra',
      completionDate: '2023-10-15',
      technologies: ['Access Control', 'Fire Alarms', 'Network Infrastructure'],
      featured: false
    }
  ]

  // Fetch projects and extract categories/locations
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with actual Sanity fetch
        // const projectsData = await client.fetch(`
        //   *[_type == "project"]{
        //     _id, 
        //     title, 
        //     slug,
        //     description, 
        //     category,
        //     location,
        //     completionDate,
        //     technologies,
        //     featured,
        //     "imageUrl": image.asset->url,
        //     "imageAlt": image.alt
        //   } | order(featured desc, completionDate desc)
        // `)
        
        const projectsData = mockProjects
        
        // Extract unique categories and locations
        const uniqueCategories = [...new Set(projectsData.map(p => p.category).filter(Boolean))].sort()
        const uniqueLocations = [...new Set(projectsData.map(p => p.location?.split(',')[0]).filter(Boolean))].sort()
        
        setProjects(projectsData)
        setAllCategories(uniqueCategories)
        setAllLocations(uniqueLocations)
        setFilteredProjects(projectsData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching projects:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter projects based on all criteria
  useEffect(() => {
    let filtered = projects

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(project => 
        selectedCategories.includes(project.category)
      )
    }

    // Location filter
    if (selectedLocations.length > 0) {
      filtered = filtered.filter(project => {
        const projectCity = project.location?.split(',')[0]
        return selectedLocations.includes(projectCity)
      })
    }

    // Technology filter
    if (selectedTechnologies.length > 0) {
      filtered = filtered.filter(project => {
        const projectTechnologies = project.technologies || []
        return selectedTechnologies.some(tech => 
          projectTechnologies.includes(tech)
        )
      })
    }

    // Featured filter
    if (showFeaturedOnly) {
      filtered = filtered.filter(project => project.featured)
    }

    setFilteredProjects(filtered)
    setCurrentPage(1)
  }, [searchTerm, selectedCategories, selectedLocations, selectedTechnologies, showFeaturedOnly, projects])

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const startIndex = (currentPage - 1) * projectsPerPage
  const endIndex = startIndex + projectsPerPage
  const currentProjects = filteredProjects.slice(startIndex, endIndex)

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 400, behavior: 'smooth' })
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1)
    }
  }

  // Filter handlers
  const handleCategoryChange = (category, checked) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category))
    }
  }

  const handleLocationChange = (location, checked) => {
    if (checked) {
      setSelectedLocations([...selectedLocations, location])
    } else {
      setSelectedLocations(selectedLocations.filter(l => l !== location))
    }
  }

  const handleTechnologyChange = (technology, checked) => {
    if (checked) {
      setSelectedTechnologies([...selectedTechnologies, technology])
    } else {
      setSelectedTechnologies(selectedTechnologies.filter(t => t !== technology))
    }
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedLocations([])
    setSelectedTechnologies([])
    setShowFeaturedOnly(false)
    setSearchTerm('')
    setCurrentPage(1)
  }

  const hasActiveFilters = selectedCategories.length > 0 || selectedLocations.length > 0 || 
                         selectedTechnologies.length > 0 || showFeaturedOnly || searchTerm

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto py-12">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Featured Toggle */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Project Type</h3>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="featured-only"
            checked={showFeaturedOnly}
            onCheckedChange={setShowFeaturedOnly}
          />
          <label 
            htmlFor="featured-only" 
            className="text-sm cursor-pointer hover:text-primary"
          >
            Featured Projects Only
          </label>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="space-y-3">
          {allCategories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked)}
              />
              <label 
                htmlFor={`category-${category}`} 
                className="text-sm cursor-pointer hover:text-primary"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Locations */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Locations</h3>
        <div className="space-y-3">
          {allLocations.map(location => (
            <div key={location} className="flex items-center space-x-2">
              <Checkbox
                id={`location-${location}`}
                checked={selectedLocations.includes(location)}
                onCheckedChange={(checked) => handleLocationChange(location, checked)}
              />
              <label 
                htmlFor={`location-${location}`} 
                className="text-sm cursor-pointer hover:text-primary"
              >
                {location}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Technologies</h3>
        <div className="space-y-3">
          {technologies.map(technology => (
            <div key={technology} className="flex items-center space-x-2">
              <Checkbox
                id={`tech-${technology}`}
                checked={selectedTechnologies.includes(technology)}
                onCheckedChange={(checked) => handleTechnologyChange(technology, checked)}
              />
              <label 
                htmlFor={`tech-${technology}`} 
                className="text-sm cursor-pointer hover:text-primary"
              >
                {technology}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Button 
          onClick={clearAllFilters} 
          variant="outline" 
          className="w-full"
        >
          Clear All Filters
        </Button>
      )}
    </div>
  )

  // Pagination Component
  const Pagination = () => {
    if (totalPages <= 1) return null

    const getPageNumbers = () => {
      const pages = []
      const maxVisible = 5

      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) {
            pages.push(i)
          }
          pages.push('...')
          pages.push(totalPages)
        } else if (currentPage >= totalPages - 2) {
          pages.push(1)
          pages.push('...')
          for (let i = totalPages - 3; i <= totalPages; i++) {
            pages.push(i)
          }
        } else {
          pages.push(1)
          pages.push('...')
          pages.push(currentPage - 1)
          pages.push(currentPage)
          pages.push(currentPage + 1)
          pages.push('...')
          pages.push(totalPages)
        }
      }

      return pages
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="flex items-center gap-1"
        >
          <ChevronLeft size={16} />
          Previous
        </Button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={index} className="px-3 py-1 text-muted-foreground">
                ...
              </span>
            ) : (
              <Button
                key={index}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="w-10 h-10 p-0"
              >
                {page}
              </Button>
            )
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1"
        >
          Next
          <ChevronRight size={16} />
        </Button>
      </div>
    )
  }

  return (
    <>
      <section className="relative bg-gray-900 text-white py-20 px-4">
              <Image
                src={banner}
                className="absolute inset-0 object-cover w-full h-full z-0"
                alt="Security services banner"
              />
              <div className="absolute inset-0 bg-black/50 z-10"></div>
              <div className="relative z-20 max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Our Projects
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mb-8">
                  Discover our portfolio of successful security installations and smart solutions 
            delivered across residential, commercial, and industrial sectors over 17+ years of excellence.
                </p>
              </div>
            </section>

      <div className="container mx-auto py-6 lg:py-12 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <Button
              onClick={() => setIsMobileFilterOpen(true)}
              variant="outline"
              className="flex items-center gap-2 mb-4"
            >
              <Filter size={16} />
              Filters {hasActiveFilters && `(${selectedCategories.length + selectedLocations.length + selectedTechnologies.length + (showFeaturedOnly ? 1 : 0)})`}
            </Button>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4">
              <FilterSidebar />
            </div>
          </div>

          {/* Mobile Sidebar Overlay */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileFilterOpen(false)} />
              <div className="fixed left-0 top-0 h-full w-80 max-w-[80vw] bg-white p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileFilterOpen(false)}
                  >
                    <X size={20} />
                  </Button>
                </div>
                <FilterSidebar />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Results Info */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredProjects.length)} of {filteredProjects.length} projects
              </p>
              {totalPages > 1 && (
                <p className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </p>
              )}
            </div>

            {/* Projects Grid */}
            {currentProjects.length > 0 ? (
              <>
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {currentProjects.map(project => (
                    <Link href={`/projects/${project.slug.current}`} key={project._id}>
                      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden h-full">
                        {/* Featured Badge */}
                        {project.featured && (
                          <div className="absolute top-4 left-4 z-10">
                            <span className="inline-block px-3 py-1 text-xs font-semibold bg-yellow-400 text-yellow-900 rounded-full">
                              ✨ Featured
                            </span>
                          </div>
                        )}
                        
                        {/* Project Image */}
                        <div className="relative w-full h-64 overflow-hidden bg-gray-50">
                          <img 
                            src={project.image.asset.url} 
                            alt={project.image.alt} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        
                        <CardContent className="p-6">
                          {/* Category */}
                          <div className="mb-3">
                            <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              {project.category}
                            </span>
                          </div>
                          
                          {/* Project Title */}
                          <h2 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors mb-3 min-h-[3.5rem]">
                            {project.title}
                          </h2>
                          
                          {/* Description */}
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 min-h-[4.5rem]">
                            {project.description}
                          </p>
                          
                          {/* Project Meta */}
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span className="truncate">{project.location}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                              <span>Completed {formatDate(project.completionDate)}</span>
                            </div>
                          </div>

                          {/* Technologies */}
                          <div className="mb-4">
                            <div className="flex items-center mb-2">
                              <Tag className="h-4 w-4 text-muted-foreground mr-2" />
                              <span className="text-sm text-muted-foreground">Technologies:</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {project.technologies.slice(0, 2).map((tech, index) => (
                                <span
                                  key={index}
                                  className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.technologies.length > 2 && (
                                <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                  +{project.technologies.length - 2} more
                                </span>
                              )}
                            </div>
                          </div>

                          {/* View Project Button */}
                          <Button className="w-full group-hover:bg-primary-dark transition-colors">
                            View Project Details
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                <Pagination />
              </>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-4">🏗️</div>
                  <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filter criteria to find relevant projects
                  </p>
                  <Button onClick={clearAllFilters} variant="outline">
                    Clear all filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
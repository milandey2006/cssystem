'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { client } from '@/lib/sanity'
import { Search, X, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import banner from '@/public/products/banner.jpg'

// Main Products Page Component
export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [allCategories, setAllCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([])
  const [selectedFeatures, setSelectedFeatures] = useState([])
  const [selectedResolutions, setSelectedResolutions] = useState([])

  // Static filter options (you can make these dynamic later)
  const priceRanges = [
    { id: '0-200', label: '₹0 - ₹200', min: 0, max: 200 },
    { id: '200-400', label: '₹200 - ₹400', min: 200, max: 400 },
    { id: '400-600', label: '₹400 - ₹600', min: 400, max: 600 },
    { id: '600+', label: '₹600+', min: 600, max: Infinity }
  ]

  const features = [
    'Night Vision',
    'Motion Detection', 
    'Weatherproof',
    'Two-way Audio',
    'Remote Viewing',
    'WiFi Enabled',
    'Cloud Storage',
    'Mobile App'
  ]

  const resolutions = [
    '1080p HD',
    '2K / 4MP',
    '4K / 8MP'
  ]

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await client.fetch(`
          *[_type == "product"]{
            _id, 
            name, 
            description, 
            price, 
            oldPrice,
            category,
            badge,
            stock,
            rating,
            reviewCount,
            keyFeatures,
            "imageUrl": images[0].asset->url
          }
        `)
        
        // Extract unique categories
        const uniqueCategories = [...new Set(productsData.map(product => product.category).filter(Boolean))].sort()
        
        setProducts(productsData)
        setAllCategories(uniqueCategories)
        setFilteredProducts(productsData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching products:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter products based on all criteria
  useEffect(() => {
    let filtered = products

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      )
    }

    // Price range filter
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter(product => {
        const price = product.price || 0
        return selectedPriceRanges.some(rangeId => {
          const range = priceRanges.find(r => r.id === rangeId)
          return price >= range.min && price <= range.max
        })
      })
    }

    // Features filter
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter(product => {
        const productFeatures = product.keyFeatures || []
        return selectedFeatures.some(feature => 
          productFeatures.some(pf => 
            pf.toLowerCase().includes(feature.toLowerCase())
          )
        )
      })
    }

    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategories, selectedPriceRanges, selectedFeatures, selectedResolutions, products])

  // Filter handlers
  const handleCategoryChange = (category, checked) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category))
    }
  }

  const handlePriceRangeChange = (rangeId, checked) => {
    if (checked) {
      setSelectedPriceRanges([...selectedPriceRanges, rangeId])
    } else {
      setSelectedPriceRanges(selectedPriceRanges.filter(r => r !== rangeId))
    }
  }

  const handleFeatureChange = (feature, checked) => {
    if (checked) {
      setSelectedFeatures([...selectedFeatures, feature])
    } else {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feature))
    }
  }

  const handleResolutionChange = (resolution, checked) => {
    if (checked) {
      setSelectedResolutions([...selectedResolutions, resolution])
    } else {
      setSelectedResolutions(selectedResolutions.filter(r => r !== resolution))
    }
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedPriceRanges([])
    setSelectedFeatures([])
    setSelectedResolutions([])
    setSearchTerm('')
  }

  const hasActiveFilters = selectedCategories.length > 0 || selectedPriceRanges.length > 0 || 
                         selectedFeatures.length > 0 || selectedResolutions.length > 0 || searchTerm

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

      {/* Price Range */}
      {/* <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <div className="space-y-3">
          {priceRanges.map(range => (
            <div key={range.id} className="flex items-center space-x-2">
              <Checkbox
                id={`price-${range.id}`}
                checked={selectedPriceRanges.includes(range.id)}
                onCheckedChange={(checked) => handlePriceRangeChange(range.id, checked)}
              />
              <label 
                htmlFor={`price-${range.id}`} 
                className="text-sm cursor-pointer hover:text-primary"
              >
                {range.label}
              </label>
            </div>
          ))}
        </div>
      </div> */}

      {/* Features */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Features</h3>
        <div className="space-y-3">
          {features.map(feature => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox
                id={`feature-${feature}`}
                checked={selectedFeatures.includes(feature)}
                onCheckedChange={(checked) => handleFeatureChange(feature, checked)}
              />
              <label 
                htmlFor={`feature-${feature}`} 
                className="text-sm cursor-pointer hover:text-primary"
              >
                {feature}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Resolution */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Resolution</h3>
        <div className="space-y-3">
          {resolutions.map(resolution => (
            <div key={resolution} className="flex items-center space-x-2">
              <Checkbox
                id={`resolution-${resolution}`}
                checked={selectedResolutions.includes(resolution)}
                onCheckedChange={(checked) => handleResolutionChange(resolution, checked)}
              />
              <label 
                htmlFor={`resolution-${resolution}`} 
                className="text-sm cursor-pointer hover:text-primary"
              >
                {resolution}
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

  return (
    <>
      <section className="relative bg-gray-900 text-white py-20 px-4">
              <Image
                src={banner}
                className="absolute inset-0 object-cover w-full h-full z-0"
                alt="Security services banner"
              />
              <div className="absolute inset-0 bg-black/30 z-10"></div>
              <div className="relative z-20 max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Our Product
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mb-8">
                 Champion Security System has been at the forefront of security technology,
            providing innovative solutions to protect homes and businesses for
            over 17 years
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
            Filters {hasActiveFilters && `(${selectedCategories.length + selectedPriceRanges.length + selectedFeatures.length + selectedResolutions.length})`}
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
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Results Info */}
          <div className="mb-6 text-muted-foreground">
            <p>Showing {filteredProducts.length} of {products.length} products</p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
              {filteredProducts.map(product => (
                <Link href={`/products/${product._id}`} key={product._id}>
                  <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 overflow-hidden h-90">
                    {/* Product Badge */}
                    {product.badge && (
                      <div className="absolute top-2 right-2 z-2">
                        <span className="inline-block px-2 py-1 text-xs font-semibold bg-black text-white rounded">
                          {product.badge}
                        </span>
                      </div>
                    )}
                    
                    {/* Product Image */}
                    {product.imageUrl && (
                      <div className="relative w-full md:h-48 sm:90 overflow-hidden bg-white aspect-square">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                          loading="lazy"
                        />
                      </div>
                    )}
                    
                    <CardContent className="p-4">
                      {/* Category */}
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                        {product.category}
                      </p>
                      
                      {/* Product Name */}
                      <h2 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors mb-2">
                        {product.name}
                      </h2>
                      
                      {/* Description */}
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {product.description}
                      </p>
                      
                      {/* Price */}
                      {product.price && (
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-bold text-lg">
                            ₹{product.price.toLocaleString()}
                          </p>
                          {product.oldPrice && product.oldPrice > product.price && (
                            <p className="text-sm text-muted-foreground line-through">
                              ₹{product.oldPrice.toLocaleString()}
                            </p>
                          )}
                        </div>
                      )}
                      
                      {/* Rating */}
                      {product.rating && (
                        <div className="flex items-center gap-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-sm ${
                                  i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-muted-foreground/30'
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            ({product.reviewCount || 0})
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
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
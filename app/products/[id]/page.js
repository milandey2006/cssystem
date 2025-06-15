"use client"
import React, { useEffect, useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Check, ChevronRight, Shield, Star, Truck } from "lucide-react"
import { useParams } from 'next/navigation'
import { client, urlFor } from '@/lib/sanity'

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function ProductPageId() {
  const params = useParams()
  const id = params.id

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  const handleMouseEnter = () => {
    setIsZoomed(true)
  }

  const handleMouseLeave = () => {
    setIsZoomed(false)
  }

  useEffect(() => {
    if (!id) return;

    console.log("ATTEMPTING TO FETCH SANITY DOCUMENT WITH ID:", id);

    const fetchProduct = async () => {
      try {
        const query = `*[_type == "product" && _id == $id][0]{
          _id,
          name,
          description,
          longDescription,
          price,
          oldPrice,
          images,
          badge,
          stock,
          rating,
          reviewCount,
          keyFeatures,
          whatsInTheBox,
          specifications
        }`

        const data = await client.fetch(query, { id })
        
        if (data) {
          setProduct(data)
          setSelectedImageIndex(0)
        } else {
          setError('Product not found.')
        }
      } catch (err) {
        setError('Failed to load product data.')
        console.error('Error fetching product:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }
  
  if (error || !product) {
    return <div>Error: {error || 'Product not found.'}</div>
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="font-medium text-gray-800 truncate">{product.name}</span>
        </nav>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="flex flex-col gap-4">
            <div 
              className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-50 cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
               <Image
                 src={urlFor(product.images[selectedImageIndex]).url()}
                 alt={product.name}
                 fill
                 className={`object-contain p-4 transition-transform duration-300 ${
                   isZoomed ? 'scale-150' : 'scale-100'
                 }`}
                 style={
                   isZoomed
                     ? {
                         transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                       }
                     : {}
                 }
                 priority
               />
               {product.badge && <Badge className="absolute top-4 left-4 bg-black text-white">{product.badge}</Badge>}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images?.map((image, i) => (
                 <div 
                   key={i} 
                   className={`relative aspect-square overflow-hidden rounded-lg border cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md ${
                     selectedImageIndex === i 
                       ? 'border-black border-2 bg-gray-50' 
                       : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                   }`}
                   onClick={() => setSelectedImageIndex(i)}
                 >
                   <Image
                     src={urlFor(image).url()}
                     alt={`${product.name} - Thumbnail ${i + 1}`}
                     fill
                     className="object-contain p-2 transition-transform duration-200"
                   />
                 </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating ?? 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
            <div className="flex items-baseline gap-2">
               <span className="text-3xl font-bold text-gray-900">${product.price?.toFixed(2)}</span>
               {product.oldPrice && (
                 <span className="text-xl text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
               )}
               {product.oldPrice && (
                 <Badge variant="outline" className="text-green-600 border-green-500 bg-green-50">
                   Save ${(product.oldPrice - product.price).toFixed(2)}
                 </Badge>
               )}
            </div>
            <p className="text-gray-700">{product.description}</p>
            <div className="flex items-center gap-2 text-sm font-medium">
               <Check className="h-5 w-5 text-green-600" />
               <span className="text-green-600">In stock ({product.stock} available)</span>
            </div>
            <Separator className="my-2" />
            <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Key Features:</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {product.keyFeatures?.slice(0, 4).map((feature, i) => (
                       <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                         <Check className="h-4 w-4 text-black" />
                         <span>{feature}</span>
                       </li>
                    ))}
                </ul>
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="flex-1 bg-black text-white hover:bg-gray-800">Add to Cart</Button>
              <Button size="lg" variant="outline" className="flex-1 border-gray-400 hover:bg-gray-100">Buy Now</Button>
            </div>
            <div className="mt-4 flex flex-col gap-4 rounded-lg border border-gray-200 p-4">
               <div className="flex items-start gap-3">
                 <Truck className="h-6 w-6 text-gray-600 mt-1" />
                 <div>
                   <h4 className="font-semibold">Free shipping</h4>
                   <p className="text-sm text-gray-500">Free standard shipping on orders over $100</p>
                 </div>
               </div>
               <div className="flex items-start gap-3">
                 <Shield className="h-6 w-6 text-gray-600 mt-1" />
                 <div>
                   <h4 className="font-semibold">2-Year Warranty</h4>
                   <p className="text-sm text-gray-500">All our products come with a 2-year manufacturer warranty</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
        <div className="mt-12 lg:mt-16">
          <Tabs defaultValue="description" className="w-full">
             <TabsList className="border-b border-gray-200 w-full justify-start rounded-none bg-transparent p-0">
               <TabsTrigger value="description" className="px-4 py-2 -mb-px border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:text-black rounded-none font-semibold">Description</TabsTrigger>
               <TabsTrigger value="specifications" className="px-4 py-2 -mb-px border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:text-black rounded-none font-semibold">Specifications</TabsTrigger>
               <TabsTrigger value="reviews" className="px-4 py-2 -mb-px border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:text-black rounded-none font-semibold">Reviews</TabsTrigger>
             </TabsList>
             <TabsContent value="description" className="pt-8 prose prose-gray max-w-none">
                <p>{product.longDescription}</p>
                <h3 className="font-bold text-xl text-gray-900 mt-8 mb-4">Key Features</h3>
                <ul className="list-disc pl-5 space-y-2">
                    {product.keyFeatures?.map((feature, i) => (<li key={i}>{feature}</li>))}
                </ul>
                <h3 className="font-bold text-xl text-gray-900 mt-8 mb-4">Whats in the Box</h3>
                <ul className="list-disc pl-5 space-y-2">
                    {product.whatsInTheBox?.map((item, i) => (<li key={i}>{item}</li>))}
                </ul>
             </TabsContent>
             <TabsContent value="specifications" className="pt-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                     {product.specifications?.specs?.map((spec) => (
                       <div key={spec.key} className="flex justify-between py-2 border-b border-gray-200">
                          <span className="font-medium text-gray-700">{spec.key}</span>
                          <span className="text-gray-600">{spec.value}</span>
                       </div>
                     ))}
                 </div>
             </TabsContent>
             <TabsContent value="reviews" className="pt-8">
               <h3 className="text-xl font-bold">Customer Reviews</h3>
               <p className="text-gray-600 mt-2">No reviews yet.</p>
               <Button className="mt-4 bg-black text-white hover:bg-gray-800">Write a Review</Button>
             </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
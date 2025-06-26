"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight, Shield, Star, Truck } from "lucide-react";
import { useParams } from "next/navigation";
import { client, urlFor } from "@/lib/sanity";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProductPageId() {
  const params = useParams();
  const id = params.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false); // Added for form submission state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    productName: "",
    productId: ""
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    
    try {
      const res = await fetch("/api/ask-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const result = await res.json();
      
      if (result.success) {
        alert("Price request submitted successfully! Well get back to you soon.");
        setDialogOpen(false);
        // Reset form
        setFormData({
          name: "",
          email: "",
          mobile: "",
          productName: product?.name || "",
          productId: product?._id || ""
        });
      } else {
        alert("Failed to submit price request. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setFormSubmitting(false);
    }
  };

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
        }`;

        const data = await client.fetch(query, { id });

        if (data) {
          setProduct(data);
          setSelectedImageIndex(0);
          // Pre-fill product info in form
          setFormData(prev => ({
            ...prev,
            productName: data.name,
            productId: data._id
          }));
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        setError("Failed to load product data.");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !product) {
    return <div>Error: {error || "Product not found."}</div>;
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="font-medium text-gray-800 truncate">
            {product.name}
          </span>
        </nav>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
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
                  isZoomed ? "scale-150" : "scale-100"
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
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-black text-white">
                  {product.badge}
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images?.map((image, i) => (
                <div
                  key={i}
                  className={`relative aspect-square overflow-hidden rounded-lg border cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md ${
                    selectedImageIndex === i
                      ? "border-black border-2 bg-gray-50"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300"
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
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating ?? 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">
                {product.price?.toFixed(2)}
              </span>
              {product.oldPrice && (
                <span className="text-xl text-gray-500 line-through">
                  {product.oldPrice.toFixed(2)}
                </span>
              )}
              {product.oldPrice && (
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-500 bg-green-50"
                >
                  Save ${(product.oldPrice - product.price).toFixed(2)}
                </Badge>
              )}
            </div>
            <p className="text-gray-700">{product.description}</p>
            <div className="flex items-center gap-2 text-sm font-medium">
              <Check className="h-5 w-5 text-red-600" />
              <span className="text-red-600">
                In stock ({product.stock} available)
              </span>
            </div>
            <Separator className="my-2" />
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Key Features:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {product.keyFeatures?.slice(0, 4).map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <Check className="h-4 w-4 text-black" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="flex-1 bg-black text-white hover:bg-gray-800"
                  >
                    Ask Price
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Request Price Quote</DialogTitle>
                    <DialogDescription>
                      Fill out the form below and well get back to you with pricing information.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleFormSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="mobile">Mobile Number</Label>
                      <Input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="Enter your mobile number"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="productName">Product Name</Label>
                      <Input
                        id="productName"
                        name="productName"
                        value={formData.productName}
                        onChange={handleInputChange}
                        placeholder="Product name"
                        readOnly
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="productId">Product ID</Label>
                      <Input
                        id="productId"
                        name="productId"
                        value={formData.productId}
                        onChange={handleInputChange}
                        placeholder="Product ID"
                        readOnly
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setDialogOpen(false)}
                        className="flex-1"
                        disabled={formSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-black text-white hover:bg-gray-800"
                        disabled={formSubmitting}
                      >
                        {formSubmitting ? "Submitting..." : "Submit Request"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
              <Link href="/contact" passHref>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 border-gray-400 hover:bg-gray-100"
                >
                  Get Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 lg:mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="border-b border-gray-200 w-full justify-start rounded-none bg-transparent p-0">
              <TabsTrigger
                value="description"
                className="px-4 py-2 -mb-px border-b-1 border-transparent data-[state=active]:border-black data-[state=active]:text-black rounded-none font-semibold"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="px-4 py-2 -mb-px border-b-1 border-transparent data-[state=active]:border-black data-[state=active]:text-black rounded-none font-semibold"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="px-4 py-2 -mb-px border-b-1 border-transparent data-[state=active]:border-black data-[state=active]:text-black rounded-none font-semibold"
              >
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="description"
              className="pt-8 prose prose-gray max-w-none"
            >
              <p>{product.longDescription}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-4">
                    Key Features
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {product.keyFeatures?.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-4">
                    Whats in the Box
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {product.whatsInTheBox?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {product.specifications?.specs?.map((spec) => (
                  <div
                    key={spec.key}
                    className="flex justify-between py-2 border-b border-gray-200"
                  >
                    <span className="font-medium text-gray-700">
                      {spec.key}
                    </span>
                    <span className="text-gray-600">{spec.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-8">
              <h3 className="text-xl font-bold">Customer Reviews</h3>
              <p className="text-gray-600 mt-2">No reviews yet.</p>
              <Button className="mt-4 bg-black text-white hover:bg-gray-800">
               <Link href="https://www.google.com/search?sxsrf=AE3TifM6vdqDUeeZ84CuMxyh6TwhHZJDmw:1750873726949&si=AMgyJEvkVjFQtirYNBhM3ZJIRTaSJ6PxY6y1_6WZHGInbzDnMY5Zp7MWIueJDEslHSAmTH6pUh6C3zWQMVzflpRtkJwkX3cxI6rSVteT3R_FZkmu6aZoehD-jn3qxyRHy1c9wM057I4341LYyZwuJilagbJVzklwLTrKKDJ-_5mE36ggMEQBIFzqlhjtzfJaK8UgJkrwMgfoZVn2gQDHZrNoq0o8tvXoj-dEIGQ-28pyWQiIk4soOh8EdpuBFPM7e9b57sy_4chHjewofTA9bvlbom4cmji7ww%3D%3D&q=Champion+Security+System,+Honeywell,+Matrix,+Panasonic+CCTV+Camera+%26+VDP+Installation+and+services+in+mumbai+And+Local+Area+Reviews#lrd=0x3be7ce22f2c547b5:0x8cbc117b429754f9,3,,,," passHref target="_blank">
               Write a Review
               </Link> 
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { urlFor } from "@/lib/sanity";

import { Button } from "@/components/ui/button";
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

export default function ProductDetailClient({ product }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    productName: product.name,
    productId: product._id,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => setIsZoomed(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        setFormData({
          name: "",
          email: "",
          mobile: "",
          productName: product.name,
          productId: product._id,
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

  return (
    <div className="bg-white min-h-screen">
      {/* Header Navigation */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-gray-600">
            <Link href="/products" className="hover:text-blue-600">
              Products
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="font-medium text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div
              className="relative bg-white rounded-lg overflow-hidden border border-gray-200 cursor-zoom-in"
              style={{ aspectRatio: "4/3" }}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                src={urlFor(product.images[selectedImageIndex]).url()}
                alt={product.name}
                fill
                className={`object-contain p-8 transition-transform duration-300 ${
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
                <Badge className="absolute top-4 right-4 bg-blue-600 text-white">
                  {product.badge}
                </Badge>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images?.map((image, i) => (
                <div
                  key={i}
                  className={`flex-shrink-0 relative w-20 h-20 border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                    selectedImageIndex === i
                      ? "border-blue-500 shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedImageIndex(i)}
                >
                  <Image
                    src={urlFor(image).url()}
                    alt={`${product.name} - View ${i + 1}`}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6">
            {/* Product Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-xl text-gray-600 font-medium">
                {product.description}
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              {product.keyFeatures?.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>

            {/* Price and Actions */}
            <div className="space-y-4 pt-4">
              {product.price && (
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{product.price.toFixed(2)}
                  </span>
                  {product.oldPrice && (
                    <>
                      <span className="text-lg text-gray-500 line-through">
                        ₹{product.oldPrice.toFixed(2)}
                      </span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Save ₹{(product.oldPrice - product.price).toFixed(2)}
                      </Badge>
                    </>
                  )}
                </div>
              )}

              {/* Stock Status */}
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-medium">
                  In Stock ({product.stock} available)
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    >
                      Ask for Price
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Request Price Quote</DialogTitle>
                      <DialogDescription>
                        Fill out the form below and well get back to you with pricing information.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
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
                          onClick={handleFormSubmit}
                          className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                          disabled={formSubmitting}
                        >
                          {formSubmitting ? "Submitting..." : "Submit Request"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Link href="/contact" passHref>
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-3 border-gray-300 hover:bg-gray-50"
                  >
                    Get Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="flex border-b border-gray-200 bg-transparent p-0 h-auto">
              <TabsTrigger
                value="overview"
                className="px-6 py-3 text-blue-600 border-b-2 border-blue-600 bg-transparent font-medium hover:text-blue-700 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:border-blue-600"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="px-6 py-3 text-gray-600 border-b-2 border-transparent bg-transparent font-medium hover:text-gray-900 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:border-blue-600"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="support"
                className="px-6 py-3 text-gray-600 border-b-2 border-transparent bg-transparent font-medium hover:text-gray-900 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:border-blue-600"
              >
                Support
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="pt-8">
              <OverviewContent text={product.longDescription} />
            </TabsContent>

            <TabsContent value="specifications" className="pt-8">
              <div className="space-y-4">
                {product.specifications?.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-3 border-b border-gray-200"
                  >
                    <span className="font-medium text-gray-700">{spec.key}</span>
                    <span className="text-gray-600">{spec.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="support" className="pt-8">
              <div className="space-y-6">
                <script src="https://static.elfsight.com/platform/platform.js" data-use-service-core defer></script>
                <div className="elfsight-app-13ffe455-64fd-42a5-8966-7153d87beb9a" data-elfsight-app-lazy></div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// longDescription is plain text with newline-separated lines (sometimes a
// *Heading* line followed by bullet points). Lines before any heading are
// rendered as intro paragraphs; lines after a heading are grouped into a
// bulleted list instead of letting the browser collapse them into one blob.
function OverviewContent({ text }) {
  if (!text) return null;

  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const blocks = [];
  let currentList = null;

  for (const line of lines) {
    const heading = line.match(/^\*(.+)\*$/);
    if (heading) {
      currentList = null;
      blocks.push({ type: "heading", text: heading[1] });
      continue;
    }

    if (currentList) {
      currentList.items.push(line);
    } else if (blocks[blocks.length - 1]?.type === "heading") {
      currentList = { type: "list", items: [line] };
      blocks.push(currentList);
    } else {
      blocks.push({ type: "paragraph", text: line });
    }
  }

  return (
    <div className="space-y-3">
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h3 key={i} className="text-lg font-semibold text-gray-900 pt-2">
              {block.text}
            </h3>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="space-y-2">
              {block.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-900 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-gray-700 leading-relaxed">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

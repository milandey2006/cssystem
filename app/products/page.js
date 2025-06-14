import React from 'react'
import Link from 'next/link'
import { client } from '@/lib/sanity'

export default async function ProductsPage() {
  // Fixed: Use 'name' instead of 'title' to match your schema
  const products = await client.fetch(`*[_type == "product"]{_id, name, description, price, "imageUrl": image.asset->url}`)

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map(product => (
          <Link href={`/products/${product._id}`} key={product._id}>
            <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-200">
              {product.imageUrl && (
                <div className="relative w-full h-48 mb-4">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover rounded"
                    loading="lazy"
                  />
                </div>
              )}
              <h2 className="text-xl font-semibold truncate">{product.name}</h2>
              <p className="text-gray-600 text-sm line-clamp-2 mb-2">{product.description}</p>
              <p className="font-bold text-lg">₹{product.price?.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
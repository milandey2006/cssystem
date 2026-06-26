import { notFound } from "next/navigation";
import { client, urlFor } from "@/lib/sanity";
import { SITE_URL } from "@/lib/seo";
import ProductDetailClient from "./ProductDetailClient";

const PRODUCT_QUERY = `*[_type == "product" && _id == $id][0]{
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
  specifications,
  brand,
  category
}`;

async function getProduct(id) {
  try {
    return await client.fetch(PRODUCT_QUERY, { id });
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const imageUrl = product.images?.[0] ? urlFor(product.images[0]).width(1200).height(630).url() : undefined;

  return {
    title: product.name,
    description:
      product.description ||
      `${product.name} available from Champion Security System, authorised dealer in Mumbai.`,
    alternates: {
      canonical: `/products/${product._id}`,
    },
    openGraph: {
      title: product.name,
      description: product.description,
      url: `/products/${product._id}`,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: product.name }] : undefined,
    },
  };
}

const productJsonLd = (product) => {
  const imageUrl = product.images?.[0] ? urlFor(product.images[0]).url() : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: imageUrl,
    sku: product._id,
    brand: product.brand
      ? { "@type": "Brand", name: product.brand }
      : undefined,
    category: product.category,
    ...(product.price && {
      offers: {
        "@type": "Offer",
        url: `${SITE_URL}/products/${product._id}`,
        priceCurrency: "INR",
        price: product.price,
        availability:
          product.stock > 0
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
      },
    }),
    ...(product.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewCount || 1,
      },
    }),
  };
};

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}

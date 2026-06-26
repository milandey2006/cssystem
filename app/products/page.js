import { client } from "@/lib/sanity";
import ProductsClient from "./ProductsClient";

export const revalidate = 60;

export const metadata = {
  title: "CCTV Cameras, Biometric & Access Control Products",
  description:
    "Browse Hanwha, Matrix, Honeywell CCTV cameras, eSSL & Mantra biometric devices, access control and video door phones available from Champion Security System in Mumbai.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "CCTV & Security Products | Champion Security System",
    description:
      "Browse our full range of CCTV cameras, biometric devices, access control and video door phones.",
    url: "/products",
  },
};

const normalizeCategory = (category) => {
  if (!category) return "";
  return category
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default async function ProductsPage() {
  let productsData = [];
  try {
    productsData = await client.fetch(`
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
        brand,
        "imageUrl": images[0].asset->url
      }
    `);
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  const normalizedProducts = productsData.map((product) => ({
    ...product,
    normalizedCategory: normalizeCategory(product.category),
  }));

  const allCategories = [
    ...new Set(
      normalizedProducts.map((product) => product.normalizedCategory).filter(Boolean)
    ),
  ].sort();

  const allBrands = [
    ...new Set(
      normalizedProducts
        .map((product) => product.brand)
        .filter(Boolean)
        .map((b) => b.trim())
    ),
  ].sort();

  return (
    <ProductsClient
      initialProducts={normalizedProducts}
      initialCategories={allCategories}
      initialBrands={allBrands}
    />
  );
}

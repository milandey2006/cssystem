import { notFound, permanentRedirect } from "next/navigation";
import { client, urlFor } from "@/lib/sanity";
import { SITE_URL } from "@/lib/seo";
import { normalizeSlug } from "@/lib/slug";
import ProductDetailClient from "./ProductDetailClient";

const PRODUCT_FIELDS = `
  _id,
  "slug": slug.current,
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
`;

const EXACT_QUERY = `*[_type == "product" && (slug.current == $param || _id == $param)][0]{${PRODUCT_FIELDS}}`;
const ALL_SLUGS_QUERY = `*[_type == "product"]{_id, "slug": slug.current}`;
const BY_ID_QUERY = `*[_type == "product" && _id == $id][0]{${PRODUCT_FIELDS}}`;

// A few product slugs in Sanity have data-entry mistakes (raw spaces,
// commas, pasted keyword lists instead of a clean slug) that the hosting
// platform doesn't reliably route. Exact match covers the normal case;
// when that misses, fall back to matching against every product's slug
// normalized the same way the listing page generates links, so those
// products are still reachable instead of 404ing.
async function getProduct(param) {
  try {
    const exact = await client.fetch(EXACT_QUERY, { param });
    if (exact) return exact;

    const all = await client.fetch(ALL_SLUGS_QUERY);
    const match = all.find(
      (p) => normalizeSlug(p.slug) === param || p._id === param
    );
    if (!match) return null;

    return await client.fetch(BY_ID_QUERY, { id: match._id });
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

function canonicalSlugFor(product) {
  return normalizeSlug(product.slug) || product._id;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const canonicalSlug = canonicalSlugFor(product);
  const imageUrl = product.images?.[0] ? urlFor(product.images[0]).width(1200).height(630).url() : undefined;

  return {
    title: product.name,
    description:
      product.description ||
      `${product.name} available from Champion Security System, authorised dealer in Mumbai.`,
    alternates: {
      canonical: `/products/${canonicalSlug}`,
    },
    openGraph: {
      title: product.name,
      description: product.description,
      url: `/products/${canonicalSlug}`,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: product.name }] : undefined,
    },
  };
}

const productJsonLd = (product) => {
  const canonicalSlug = canonicalSlugFor(product);
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
        url: `${SITE_URL}/products/${canonicalSlug}`,
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
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // Send anything that isn't already the canonical, normalized slug URL
  // (raw _id, an old/malformed slug with spaces or commas, etc.) to the
  // clean URL permanently instead of serving duplicate content.
  const canonicalSlug = canonicalSlugFor(product);
  if (slug !== canonicalSlug) {
    permanentRedirect(`/products/${canonicalSlug}`);
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

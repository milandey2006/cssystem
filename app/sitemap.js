import { client } from "@/sanity/lib/client";
import { SITE_URL } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog/posts";

export default async function sitemap() {
  const staticRoutes = [
    { url: "/", changeFrequency: "weekly", priority: 1 },
    { url: "/about", changeFrequency: "monthly", priority: 0.8 },
    { url: "/services", changeFrequency: "monthly", priority: 0.8 },
    { url: "/products", changeFrequency: "daily", priority: 0.9 },
    { url: "/projects", changeFrequency: "weekly", priority: 0.7 },
    { url: "/blog", changeFrequency: "weekly", priority: 0.8 },
    { url: "/faq", changeFrequency: "monthly", priority: 0.6 },
    { url: "/contact", changeFrequency: "monthly", priority: 0.7 },
  ].map((route) => ({
    url: `${SITE_URL}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  let productRoutes = [];
  try {
    const products = await client.fetch(
      `*[_type == "product"]{ _id, "slug": slug.current, _updatedAt }`
    );
    productRoutes = products.map((product) => ({
      url: `${SITE_URL}/products/${product.slug || product._id}`,
      lastModified: product._updatedAt ? new Date(product._updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch (error) {
    console.error("sitemap: failed to fetch products", error);
  }

  const blogRoutes = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}

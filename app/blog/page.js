import { getAllPosts, getAllCategories } from "@/lib/blog/posts";
import { SITE_URL, BUSINESS } from "@/lib/seo";
import BlogListClient from "./BlogListClient";

export const metadata = {
  title: "CCTV & Security Blog - Insights from Mumbai's Security Experts",
  description:
    "Practical guides on commercial CCTV installation, AI camera technology, new product launches, installation challenges, and large-scale security project case studies from Champion Security System, Mumbai.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "CCTV & Security Blog | Champion Security System",
    description:
      "Commercial CCTV guides, AI camera technology, new launches, and project case studies from Mumbai's security experts.",
    url: "/blog",
  },
};

const blogJsonLd = (posts) => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Champion Security System Blog",
  url: `${SITE_URL}/blog`,
  publisher: { "@id": `${SITE_URL}/#organization` },
  blogPost: posts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
  })),
});

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd(posts)) }}
      />

      <section className="relative bg-gray-900 text-white py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-gray-900 z-0" />
        <div className="relative z-20 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            CCTV & Security Insights
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-2">
            Practical guides on commercial CCTV, AI camera technology, and real
            project case studies from {BUSINESS.name}, Mumbai
          </p>
        </div>
      </section>

      <BlogListClient posts={posts} categories={categories} />
    </div>
  );
}

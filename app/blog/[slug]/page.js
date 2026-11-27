import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog/posts";
import { SITE_URL, BUSINESS } from "@/lib/seo";
import PostContentBlocks from "@/component/blog/PostContentBlocks";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  // Long titles skip the " | Champion Security System" suffix so they fit in search results.
  return {
    title: post.title.length > 40 ? { absolute: post.title } : post.title,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.coverImage],
    },
  };
}

const articleJsonLd = (post) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.description,
  image: `${SITE_URL}${post.coverImage}`,
  datePublished: post.publishedAt,
  dateModified: post.updatedAt || post.publishedAt,
  author: post.author.startsWith("Champion")
    ? { "@type": "Organization", name: BUSINESS.name, url: SITE_URL }
    : { "@type": "Person", name: post.author },
  publisher: {
    "@type": "Organization",
    name: BUSINESS.name,
    logo: { "@type": "ImageObject", url: BUSINESS.logo },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/blog/${post.slug}`,
  },
  ...(post.sources?.length ? { citation: post.sources.map((s) => s.url) } : {}),
});

const faqJsonLd = (faq) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

// Call-to-action box at the end of a post, matched to what the post is about.
const CTAS = {
  attenza: {
    title: "Put your biometric machine on the cloud",
    body: "Attenza turns eSSL / ZKTeco punches into attendance, payroll and gate logs — no PC, no static IP. Free 14-day trial.",
    primary: ["See how Attenza works", "/software/attenza"],
    secondary: ["Book a free demo", `/contact?plan=${encodeURIComponent("Attenza demo")}`],
  },
  default: {
    title: "Need a security solution for your property?",
    body: "Talk to our team for a free consultation tailored to your site in Mumbai.",
    primary: ["Get a Free Consultation", "/contact"],
  },
};

const PostMeta = ({ post }) => (
  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-200">
    <span>{post.author}</span>
    <span className="flex items-center gap-1">
      <Calendar className="h-4 w-4" />
      {new Date(post.publishedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}
    </span>
    <span className="flex items-center gap-1">
      <Clock className="h-4 w-4" />
      {post.readTime}
    </span>
  </div>
);

const breadcrumbJsonLd = (post) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
    { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
  ],
});

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category, 3, post.product);
  const cta = CTAS[post.product] ?? CTAS.default;

  return (
    <article className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(post)) }}
      />
      {post.faq?.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(post.faq)) }}
        />
      )}

      {/* Breadcrumb nav */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-gray-600">
            <Link href="/blog" className="hover:text-blue-600">
              Blog
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="font-medium text-gray-900 line-clamp-1">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero — photo covers sit behind the title; illustrated covers sit beside it */}
      {post.coverImage.startsWith("/blog/") ? (
        <div className="bg-gray-900">
          <div className="container mx-auto px-4 max-w-6xl py-10 md:py-14 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{post.title}</h1>
              <PostMeta post={post} />
            </div>
            <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl">
              <Image src={post.coverImage} alt={post.title} fill priority sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative h-64 md:h-96 w-full">
          <Image src={post.coverImage} alt={post.title} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 max-w-4xl">
              <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
              <PostMeta post={post} />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <PostContentBlocks content={post.content} />

        {post.sources?.length > 0 && (
          <section className="mt-12 border-t border-gray-200 pt-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Sources</h2>
            <ol className="list-decimal pl-5 space-y-1.5 text-sm text-gray-600">
              {post.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline break-words">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-xs text-gray-500">
              Rules, rates and product ranges change. Check the latest official notification or datasheet, and confirm statutory points with your CA.
            </p>
          </section>
        )}

        {post.faq?.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
            <div className="space-y-3">
              {post.faq.map(({ q, a }) => (
                <details key={q} className="group bg-gray-50 border border-gray-200 rounded-xl px-5 py-4">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-gray-900 text-lg">{q}</h3>
                    <span className="text-gray-500 group-open:rotate-45 transition-transform text-2xl leading-none" aria-hidden="true">+</span>
                  </summary>
                  <p className="mt-3 text-gray-700 leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 p-8 bg-gray-50 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{cta.title}</h3>
          <p className="text-gray-600 mb-6">{cta.body}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href={cta.primary[1]}
              className="inline-flex items-center justify-center bg-blue-600 text-white font-semibold py-3 px-8 rounded-md hover:bg-blue-700 transition-colors"
            >
              {cta.primary[0]}
            </Link>
            {cta.secondary && (
              <Link
                href={cta.secondary[1]}
                className="inline-flex items-center justify-center border border-gray-300 text-gray-900 font-semibold py-3 px-8 rounded-md hover:bg-white transition-colors"
              >
                {cta.secondary[0]}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{post.product ? "More guides like this" : `More on ${post.category}`}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="group">
                  <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                    <div className="relative h-36 w-full">
                      <Image
                        src={related.coverImage}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

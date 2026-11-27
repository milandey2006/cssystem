// Pieces shared by the Attenza product page and its landing pages:
// calls to action, FAQ, "how it works", guides list and structured data.
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Server, Cloud, Smartphone, ChevronRight, Headset } from "lucide-react";
import { PRODUCT, SALES_CONTACT } from "./plans";
import { SITE_URL, BUSINESS } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog/posts";

export const BASE = "/software/attenza";
export const DEMO_HREF = `/contact?plan=${encodeURIComponent(PRODUCT.name + " demo")}`;

/* ------------------------------- structured data ------------------------- */

export const JsonLd = ({ data }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);

export const organizationRef = {
  "@type": "Organization",
  name: BUSINESS.name,
  url: SITE_URL,
  logo: BUSINESS.logo,
  telephone: BUSINESS.telephone,
};

export const softwareJsonLd = ({ name, description, path, features, category = "BusinessApplication" }) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name,
  description,
  url: `${SITE_URL}${path}`,
  applicationCategory: category,
  operatingSystem: "Web browser, Android, iOS",
  featureList: features,
  inLanguage: "en-IN",
  areaServed: { "@type": "Country", name: "India" },
  provider: organizationRef,
  publisher: organizationRef,
  image: `${SITE_URL}/og/attenza.png`,
});

export const faqJsonLd = (items) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

// trail: [[name, path], ...] — Home is added automatically.
export const breadcrumbJsonLd = (trail) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [["Home", "/"], ...trail].map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: `${SITE_URL}${path === "/" ? "" : path}`,
  })),
});

/* ------------------------------------ CTAs -------------------------------- */

export const PrimaryCta = ({ children = "Book a free demo", href = DEMO_HREF }) => (
  <Link
    href={href}
    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 px-7 rounded-lg transition-colors"
  >
    {children} <ArrowRight className="w-5 h-5" />
  </Link>
);

export const SecondaryCta = ({ dark = true }) => (
  <Link
    href="/contact"
    className={`inline-flex items-center justify-center gap-2 font-semibold py-3.5 px-7 rounded-lg transition-colors border ${
      dark ? "border-white/30 text-white hover:bg-white/10" : "border-gray-300 text-gray-900 hover:bg-gray-50"
    }`}
  >
    Contact us
  </Link>
);

export function Breadcrumbs({ trail }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-400">
      <ol className="flex flex-wrap items-center gap-1.5">
        {[["Home", "/"], ...trail].map(([name, path], i, all) => (
          <li key={path} className="inline-flex items-center gap-1.5">
            {i < all.length - 1 ? (
              <Link href={path} className="hover:text-white">{name}</Link>
            ) : (
              <span className="text-gray-200" aria-current="page">{name}</span>
            )}
            {i < all.length - 1 && <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* -------------------------------- how it works ---------------------------- */

export const STEPS = [
  {
    icon: Server,
    title: "Point the machine at the cloud",
    body: "On your eSSL, ZKTeco, Mivanta, Morx or Matrix Comsec machine turn on cloud push (ADMS / Cloud Server) mode and enter our server address. That's the only setting — no PC software.",
  },
  {
    icon: Cloud,
    title: "Punches reach the cloud by themselves",
    body: "The machine calls our server over the internet. Punches appear in the app within seconds. If the internet drops, the machine stores them and sends them when it's back.",
  },
  {
    icon: Smartphone,
    title: "Attendance, payroll & gate on any phone",
    body: "Owners and HR see live attendance, run payroll and gate logs from the browser or phone. Staff, members and residents get their own app.",
  },
];

export function HowItWorks({ title = "How the machine reaches the cloud", className = "bg-white" }) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">{title}</h2>
        <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Three steps, and only the first one touches the machine.
        </p>
        <ol className="grid md:grid-cols-3 gap-6">
          {STEPS.map(({ icon: Icon, title: t, body }, i) => (
            <li key={t} className="relative bg-gray-50 border border-gray-200 rounded-2xl p-7">
              <span className="absolute top-6 right-6 text-5xl font-extrabold text-gray-200 leading-none">{i + 1}</span>
              <span className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4"><Icon className="w-6 h-6" /></span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t}</h3>
              <p className="text-gray-700">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------- FAQ -------------------------------- */

export function FaqSection({ items, title = "Frequently asked questions" }) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{title}</h2>
        <div className="space-y-3">
          {items.map(({ q, a }) => (
            <details key={q} className="group bg-gray-50 border border-gray-200 rounded-xl px-5 py-4">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-gray-900 text-lg">
                <h3 className="text-lg font-semibold">{q}</h3>
                <span className="text-gray-500 group-open:rotate-45 transition-transform text-2xl leading-none" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-gray-700 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- guides ------------------------------- */

// Blog guides about the product. Pass slugs to pick and order them;
// otherwise the newest Attenza guides are shown.
export function GuidesSection({ slugs, limit = 6, title = "Guides from our team", intro, className = "bg-gray-50" }) {
  const all = getAllPosts().filter((p) => p.product === "attenza");
  const posts = slugs
    ? slugs.map((s) => all.find((p) => p.slug === s)).filter(Boolean).slice(0, limit)
    : all.slice(0, limit);
  if (!posts.length) return null;
  return (
    <section className={`py-16 md:py-20 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">{title}</h2>
        {intro && <p className="text-center text-gray-600 text-lg mb-10 max-w-2xl mx-auto">{intro}</p>}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group rounded-2xl bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-[1200/630] bg-gray-100">
                <Image src={p.coverImage} alt={p.title} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold text-blue-700 mb-1.5">{p.category}</p>
                <h3 className="font-bold text-gray-900 leading-snug group-hover:text-blue-700 transition-colors">{p.title}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link href="/blog" className="font-semibold text-blue-700 hover:underline">All articles →</Link>
        </p>
      </div>
    </section>
  );
}

/* --------------------------------- final CTA ------------------------------ */

export function FinalCta({ title = "Put your biometric machine on the cloud", body }) {
  return (
    <section className="relative bg-gray-900 text-white px-4 py-16 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(37,99,235,0.3),transparent_55%)]" aria-hidden="true" />
      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-gray-300 text-lg mb-8">
          {body ?? `Factory, office, society or gym — connect your eSSL, ZKTeco, Mivanta, Morx or Matrix Comsec machine and see attendance on your phone from day one. Free ${PRODUCT.trialDays}-day trial.`}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <PrimaryCta>Book a free demo</PrimaryCta>
          <SecondaryCta />
        </div>
        <div className="mt-10 inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-5 rounded-2xl bg-white/5 ring-1 ring-white/15 px-6 py-4 text-left">
          <span className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0" aria-hidden="true">
            <Headset className="w-6 h-6" />
          </span>
          <div className="text-center sm:text-left">
            <p className="font-semibold">Questions? Write to our software team</p>
            <p className="text-gray-300 text-sm">
              <a href={`mailto:${SALES_CONTACT.email}`} className="underline">{SALES_CONTACT.email}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

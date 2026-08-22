import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { client } from "@/lib/sanity";
import banner from "@/public/products/banner.jpg";

export const revalidate = 60;

export const metadata = {
  title: "Our Brands — CCTV, Access Control, Biometric & Networking",
  description:
    "Browse the brands Champion Security System supplies in Mumbai, grouped by category — surveillance/CCTV, access control & biometric, video door phones and networking. Authorised dealer for Hanwha, Honeywell, Matrix, Panasonic i-PRO and more.",
  alternates: { canonical: "/brands" },
  openGraph: {
    title: "Our Brands | Champion Security System",
    description:
      "Surveillance, access control, biometric and networking brands supplied across Mumbai.",
    url: "/brands",
  },
};

// Brands to keep OFF the Brands page even though products for them exist in
// the catalogue. Their products stay browsable at /products; they just
// aren't featured here. Compared case-insensitively against the brand value.
const HIDE_BRANDS = new Set(["prama", "onetouch"]);

// Which product category falls under which section on the Brands page. Every
// brand is placed automatically into the section of the category most of its
// products belong to. A Brand document (with a chosen category) overrides this.
const CATEGORY_TO_SECTION = {
  "Network Camera": "Surveillance / CCTV",
  "Network Video Recorder": "Surveillance / CCTV",
  "CCTV Package": "Surveillance / CCTV",
  "Wifi Camera": "Surveillance / CCTV",
  Biometrics: "Access Control & Biometric",
  "Access Control": "Access Control & Biometric",
  "Digital Door Lock": "Access Control & Biometric",
  "Video Door Phone": "Video Door Phones",
  "Network Switch": "Networking",
  "SIP Phone": "IPBX",
  "Intruder Alarm": "Alarm Systems",
};

// Section order + one-line descriptions. Any section title coming from a
// custom Brand Category in the Studio that isn't listed here is appended
// after these, alphabetically.
const SECTION_ORDER = [
  ["Surveillance / CCTV", "IP cameras, NVRs and complete CCTV systems."],
  ["Access Control & Biometric", "Fingerprint, face and card-based attendance and door access."],
  ["Video Door Phones", "Video intercom and door-entry systems."],
  ["Networking", "PoE switches, network infrastructure and cabling."],
  ["IPBX", "Business telephony and IP-PBX systems."],
  ["Alarm Systems", "Intruder detection and alarm systems."],
  ["Other", ""],
];
const SECTION_DESCRIPTIONS = Object.fromEntries(SECTION_ORDER);

async function getData() {
  try {
    const [products, brandDocs] = await Promise.all([
      client.fetch(`*[_type == "product" && (defined(brand) || defined(brandRef))]{
        "brand": coalesce(brandRef->filterValue, brand),
        category
      }`),
      client.fetch(`*[_type == "brand"]{
        name,
        filterValue,
        "logoUrl": logo.asset->url,
        "categoryTitle": category->title,
        order
      }`),
    ]);
    return { products: products || [], brandDocs: brandDocs || [] };
  } catch (error) {
    console.error("Error building brands page:", error);
    return { products: [], brandDocs: [] };
  }
}

export default async function BrandsPage() {
  const { products, brandDocs } = await getData();

  // Collect every brand — from the products (auto) and from Brand docs
  // (which can add a logo, a display name, a category, or a brand that has
  // no products yet).
  const brands = {};
  for (const p of products) {
    const value = (p.brand || "").trim();
    if (!value) continue;
    brands[value] ??= { value, count: 0, catCounts: {} };
    brands[value].count += 1;
    if (p.category) {
      brands[value].catCounts[p.category] =
        (brands[value].catCounts[p.category] || 0) + 1;
    }
  }
  for (const doc of brandDocs) {
    const value = (doc.filterValue || "").trim();
    if (!value) continue;
    brands[value] ??= { value, count: 0, catCounts: {} };
    brands[value].name = doc.name;
    brands[value].logoUrl = doc.logoUrl;
    brands[value].sectionOverride = doc.categoryTitle;
    brands[value].order = doc.order;
  }

  // Place each brand into a section: its Brand-doc category wins, else the
  // section of the product category it appears in most.
  const sectionFor = (brand) => {
    if (brand.sectionOverride) return brand.sectionOverride;
    const dominant = Object.entries(brand.catCounts).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0];
    return CATEGORY_TO_SECTION[dominant] || "Other";
  };

  const bySection = {};
  for (const brand of Object.values(brands)) {
    if (HIDE_BRANDS.has((brand.value || "").toLowerCase().trim())) continue;
    const section = sectionFor(brand);
    (bySection[section] ??= []).push(brand);
  }

  // Order sections (known first, custom appended), and sort brands inside
  // each by explicit order, then by product count, then name.
  const knownTitles = SECTION_ORDER.map(([t]) => t);
  const orderedTitles = [
    ...knownTitles.filter((t) => bySection[t]),
    ...Object.keys(bySection)
      .filter((t) => !knownTitles.includes(t))
      .sort(),
  ];
  const groups = orderedTitles.map((title) => ({
    title,
    description: SECTION_DESCRIPTIONS[title] || "",
    brands: bySection[title].sort((a, b) => {
      const ao = a.order ?? 999;
      const bo = b.order ?? 999;
      if (ao !== bo) return ao - bo;
      if (b.count !== a.count) return b.count - a.count;
      return (a.name || a.value).localeCompare(b.name || b.value);
    }),
  }));

  return (
    <>
      {/* Banner — same treatment as the products page */}
      <section className="relative bg-gray-900 text-white py-20 px-4">
        <Image
          src={banner}
          className="absolute inset-0 object-cover w-full h-full z-0"
          alt="Champion Security System brands banner"
          priority
        />
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Brands</h1>
          <p className="text-lg md:text-xl text-gray-300">
            Authorised dealer for leading security and networking brands across
            Mumbai. Pick a brand to see its products.
          </p>
        </div>
      </section>

      {/* Category sections */}
      <div className="container mx-auto px-4 py-12 lg:py-16 space-y-14">
        {groups.length === 0 && (
          <p className="text-center text-gray-500">
            No brands to show yet. Add products (with a brand) in the Studio.
          </p>
        )}

        {groups.map((group) => (
          <section key={group.title}>
            <div className="mb-6 border-b border-gray-200 pb-3">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {group.title}
              </h2>
              {group.description && (
                <p className="mt-1 text-gray-500">{group.description}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {group.brands.map((brand) => (
                <Link
                  key={`${group.title}-${brand.value}`}
                  href={`/products?brand=${encodeURIComponent(brand.value)}`}
                  className="group flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg"
                >
                  {brand.logoUrl ? (
                    <div className="relative flex h-16 w-full items-center justify-center">
                      <Image
                        src={brand.logoUrl}
                        alt={brand.name || brand.value}
                        width={160}
                        height={64}
                        className="max-h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <span className="flex h-16 items-center text-lg font-bold text-gray-800 transition-colors group-hover:text-blue-600">
                      {brand.name || brand.value}
                    </span>
                  )}

                  <span className="mt-2 text-xs font-medium uppercase tracking-wider text-gray-400">
                    {brand.count > 0
                      ? `${brand.count} product${brand.count > 1 ? "s" : ""}`
                      : "View range"}
                  </span>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                    Browse
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Fallback to the full catalogue */}
        <div className="pt-2 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Browse all products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}

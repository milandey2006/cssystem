import ContactContent from "./ContactContent";
import { BUSINESS, SITE_URL } from "@/lib/seo";

export const metadata = {
  title: "Contact Us - Get a Free CCTV Security Quote in Mumbai",
  description:
    "Contact Champion Security System in Andheri East, Mumbai for a free CCTV, biometric or access control consultation. Call +91 8080806288 or visit our office.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Champion Security System | Mumbai",
    description:
      "Get a free security consultation. Office in Andheri East, Mumbai. Call +91 8080806288.",
    url: "/contact",
  },
};

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Champion Security System",
  url: `${SITE_URL}/contact`,
  about: {
    "@id": `${SITE_URL}/#organization`,
  },
  mainEntity: {
    "@type": "LocalBusiness",
    name: BUSINESS.name,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.addressCountry,
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <ContactContent />
    </>
  );
}

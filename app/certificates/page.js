import { client } from "@/sanity/lib/client";
import { SITE_URL } from "@/lib/seo";
import CertificatesClient from "./CertificatesClient";

export const revalidate = 60;

export const metadata = {
  title: "Our Certificates - STQC & BIS Certified CCTV Installers in Mumbai",
  description:
    "STQC, BIS and manufacturer authorisation certificates held by Champion Security System, authorised CCTV and security systems dealer in Mumbai since 2008.",
  alternates: {
    canonical: "/certificates",
  },
  openGraph: {
    title: "Our Certificates | Champion Security System",
    description:
      "STQC, BIS and brand authorisation certificates held by Champion Security System, Mumbai.",
    url: "/certificates",
  },
};

async function getCertificates() {
  try {
    // `order` is the manual override; anything without one falls to the
    // bottom of that group and is then sorted newest-first by issue date.
    const query = `*[_type == "certificate"]{
      _id,
      title,
      description,
      issuer,
      issuedDate,
      order,
      "imageUrl": image.asset->url,
      "imageWidth": image.asset->metadata.dimensions.width,
      "imageHeight": image.asset->metadata.dimensions.height,
      "blurDataURL": image.asset->metadata.lqip
    } | order(order asc, issuedDate desc)`;

    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return [];
  }
}

export default async function CertificatesPage() {
  const certificates = await getCertificates();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Champion Security System",
    url: `${SITE_URL}/certificates`,
    hasCredential: certificates.map((certificate) => ({
      "@type": "EducationalOccupationalCredential",
      name: certificate.title,
      description: certificate.description,
      ...(certificate.issuer && {
        recognizedBy: { "@type": "Organization", name: certificate.issuer },
      }),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CertificatesClient certificates={certificates} />
    </>
  );
}

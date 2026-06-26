import "./globals.css";
import { Inter } from "next/font/google";
import Marquee from "@/component/Marquee";
import Header from "../component/header";
import Footer from "../component/footer";
import WhatsAppButton from "@/component/WhatsAppButton";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL, BUSINESS } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Champion Security System | CCTV Camera, Biometric & Access Control Mumbai",
    template: "%s | Champion Security System",
  },
  description:
    "Champion Security System Mumbai - Authorised dealer & installer of Hanwha, Matrix, Honeywell CCTV cameras, eSSL & Mantra biometric attendance systems, access control, VMS & visitor management solutions in Mumbai & Andheri.",
  keywords: [
    "CCTV camera installation Mumbai",
    "CCTV installation Andheri",
    "Hanwha CCTV camera dealer Mumbai",
    "Matrix CCTV camera dealer Mumbai",
    "Honeywell CCTV camera installation",
    "biometric attendance system Mumbai",
    "eSSL biometric dealer Mumbai",
    "Mantra biometric attendance system",
    "access control system installation Mumbai",
    "visitor management software Mumbai",
    "video door phone Mumbai",
    "security camera installation near me",
    "CCTV dealer near me",
  ],
  authors: [{ name: BUSINESS.name }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Champion Security System | CCTV, Biometric & Access Control Mumbai",
    description:
      "Authorised dealer & installer of Hanwha, Matrix, Honeywell CCTV cameras, eSSL & Mantra biometric attendance systems, VMS & access control in Mumbai.",
    siteName: BUSINESS.name,
    locale: "en_IN",
    images: [
      {
        url: BUSINESS.image,
        width: 1200,
        height: 630,
        alt: BUSINESS.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Champion Security System | CCTV, Biometric & Access Control Mumbai",
    description:
      "Hanwha, Matrix & Honeywell CCTV camera installation, eSSL & Mantra biometric attendance, access control & VMS solutions in Mumbai.",
    images: [BUSINESS.image],
  },
  other: {
    "geo.region": "IN-MH",
    "geo.placename": "Mumbai, Maharashtra, India",
    "geo.position": `${BUSINESS.latitude};${BUSINESS.longitude}`,
    ICBM: `${BUSINESS.latitude}, ${BUSINESS.longitude}`,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "SecuritySystemInstallationService",
  "@id": `${SITE_URL}/#organization`,
  name: BUSINESS.name,
  legalName: BUSINESS.legalName,
  description: BUSINESS.description,
  url: SITE_URL,
  logo: BUSINESS.logo,
  image: BUSINESS.image,
  telephone: BUSINESS.telephone,
  email: BUSINESS.email,
  foundingDate: BUSINESS.foundingDate,
  founder: {
    "@type": "Person",
    name: BUSINESS.founder,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.streetAddress,
    addressLocality: BUSINESS.addressLocality,
    addressRegion: BUSINESS.addressRegion,
    postalCode: BUSINESS.postalCode,
    addressCountry: BUSINESS.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.latitude,
    longitude: BUSINESS.longitude,
  },
  areaServed: BUSINESS.areaServed.map((area) => ({
    "@type": "City",
    name: area,
  })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "10:00",
      closes: "14:00",
    },
  ],
  sameAs: BUSINESS.sameAs,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <Analytics />
        <div className="relative flex min-h-screen flex-col">
          <Marquee
            speed={90}
            backgroundColor="bg-[#1e3a8a]"
            textColor="text-white"
            className="py-2 text-sm font-medium"
          >
            We are Authorised Partners with Hanwha, Honeywell, Matrix, Panasonic i-Pro, and Axis Communications. We have STQC and BIS certification for all our cameras. CCTV Installation and Services in Mumbai.
          </Marquee>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* WhatsApp Button - Now handles its own office hours logic */}
          <WhatsAppButton
            phoneNumber="+918080806288"
            message="Hello! I'm interested in your services."
          />
        </div>
      </body>
    </html>
  );
}

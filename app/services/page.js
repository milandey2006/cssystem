import ServicesContent from "./ServicesContent";

export const metadata = {
  title: "CCTV Installation, Maintenance & 24/7 Monitoring Services",
  description:
    "Professional CCTV installation, AMC maintenance plans, and 24/7 monitoring services in Mumbai & Andheri from Champion Security System. Certified technicians, fast response.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Security Installation, Maintenance & Monitoring Services | Champion Security System",
    description:
      "Expert CCTV installation, maintenance and 24/7 monitoring services in Mumbai and Andheri.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}

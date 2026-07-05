import { Calculator } from "@/components/cctv/Calculator";

export const metadata = {
  title: "CCTV HDD Storage Calculator",
  description:
    "Free CCTV HDD storage calculator from Champion Security System. Work out how much hard drive storage your CCTV/NVR setup needs, or how many days of footage a given HDD size holds.",
  alternates: {
    canonical: "/cctv-calculator",
  },
  openGraph: {
    title: "CCTV HDD Storage Calculator | Champion Security System",
    description:
      "Work out how much hard drive storage your CCTV/NVR setup needs, or how many days of footage a given HDD size holds.",
    url: "/cctv-calculator",
  },
};

export default function CctvCalculatorPage() {
  return <Calculator />;
}

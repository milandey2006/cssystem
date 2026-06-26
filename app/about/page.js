import AboutContent from "./AboutContent";

export const metadata = {
  title: "About Us - 17+ Years of Security Solutions in Mumbai",
  description:
    "Founded in 2008 by Rajesh Dey, Champion Security System has delivered CCTV, biometric and access control solutions across Mumbai for 17+ years, working with Aditya Birla Group, RBI, MMRC and MCGM.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Champion Security System - 17+ Years in Mumbai",
    description:
      "Founded in 2008, Champion Security System has delivered trusted CCTV and security installations across Mumbai for over 17 years.",
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}

import { client } from "@/sanity/lib/client";
import ProjectsClient from "./ProjectsClient";

export const revalidate = 60;

export const metadata = {
  title: "Our Projects - CCTV & Security Installations Across Mumbai",
  description:
    "Explore Champion Security System's commercial, residential, industrial, government and institutional security installations across Mumbai, including RBI, MMRC and Aditya Birla Group sites.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Our Projects | Champion Security System",
    description:
      "Commercial, residential, industrial and government security installations across Mumbai.",
    url: "/projects",
  },
};

async function getProjects() {
  try {
    const query = `*[_type == "project"] {
      _id,
      name,
      description,
      "imageUrls": images[].asset->url,
      category,
      technologies,
      location,
      featured,
      completedDate
    } | order(completedDate desc)`;

    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsClient initialProjects={projects} />;
}

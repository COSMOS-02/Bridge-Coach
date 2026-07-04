import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bridge-coach-p6on0wwdt-cosmos-02s-projects.vercel.app";
  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/assess`, lastModified: new Date() },
    { url: `${baseUrl}/plans`, lastModified: new Date() },
    { url: `${baseUrl}/privacy`, lastModified: new Date() },
    { url: `${baseUrl}/terms`, lastModified: new Date() },
  ];
}

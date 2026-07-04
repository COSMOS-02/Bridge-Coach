import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://bridge-coach-p6on0wwdt-cosmos-02s-projects.vercel.app/sitemap.xml",
  };
}

import type { MetadataRoute } from "next";

const baseUrl = "https://neexx.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${baseUrl}/fr`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/en`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];
}

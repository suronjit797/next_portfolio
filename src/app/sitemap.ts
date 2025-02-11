import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://yourwebsite.com", lastModified: new Date() },
    { url: "https://yourwebsite.com/skills", lastModified: new Date() },
    { url: "https://yourwebsite.com/projects", lastModified: new Date() },
    { url: "https://yourwebsite.com/about", lastModified: new Date() },
    { url: "https://yourwebsite.com/contact", lastModified: new Date() },
  ];
}

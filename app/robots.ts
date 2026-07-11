import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/"], // Assuming future protected routes
    },
    sitemap: "https://cleanbg.io/sitemap.xml",
  };
}

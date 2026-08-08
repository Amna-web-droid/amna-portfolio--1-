export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
    sitemap: "https://amna-portfolio-1.vercel.app/sitemap.xml",
  };
}

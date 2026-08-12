import { MetadataRoute } from "next";
import { getBlogSlugs } from "@/lib/blog";

const BASE_URL = "https://lencar.lk";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogSlugs();

  const staticPages = [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/about-us`, lastModified: new Date() },
    { url: `${BASE_URL}/contact-us`, lastModified: new Date() },
    { url: `${BASE_URL}/blog`, lastModified: new Date() },
    { url: `${BASE_URL}/dealer-network`, lastModified: new Date() },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date() },
    { url: `${BASE_URL}/bss-points`, lastModified: new Date() },
    { url: `${BASE_URL}/my-lencar`, lastModified: new Date() },
    { url: `${BASE_URL}/lencar-app`, lastModified: new Date() },
    { url: `${BASE_URL}/lencar-bikes/erc-80`, lastModified: new Date() },
    { url: `${BASE_URL}/lencar-bikes/erc-80-plus`, lastModified: new Date() },
    { url: `${BASE_URL}/lencar-bikes/zivi`, lastModified: new Date() },
  ];

  const blogEntries = blogPosts.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...blogEntries];
}
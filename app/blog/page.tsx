import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";

import { contentfulClient } from "@/lib/contentful";
import AllPageHero from "@/components/ui/allPageHero";

function getFieldValue(entry: any, keys: string[]) {
  const fields = entry?.fields ?? {};

  for (const key of keys) {
    const value = fields[key];
    if (typeof value === "string" && value.trim()) {
      return value;
    }

    if (value?.content && Array.isArray(value.content)) {
      const text = value.content
        .map((node: any) => node?.content?.map((child: any) => child?.value).filter(Boolean).join(" "))
        .filter(Boolean)
        .join(" ");

      if (text.trim()) {
        return text.trim();
      }
    }
  }

  const firstTextField = Object.entries(fields).find(([, value]) => {
    if (typeof value === "string" && value.trim()) return true;
    const candidate = value as { content?: unknown } | undefined;
    if (candidate?.content && Array.isArray(candidate.content)) return true;
    return false;
  });

  const firstValue = firstTextField?.[1] as { content?: any[] } | undefined;
  if (firstValue?.content && Array.isArray(firstValue.content)) {
    const text = firstValue.content
      .map((node: any) => node?.content?.map((child: any) => child?.value).filter(Boolean).join(" "))
      .filter(Boolean)
      .join(" ");

    return text || "";
  }

  return firstTextField?.[1] ?? "";
}

function getEntryTitle(entry: any) {
  return String(
    getFieldValue(entry, ["title", "name", "headline", "seoTitle", "subject"]) || `Blog entry ${entry?.sys?.id?.slice(0, 8)}`
  );
}

function getEntrySlug(entry: any) {
  const slugField = entry?.fields?.slug ?? entry?.fields?.urlSlug ?? entry?.fields?.path;

  if (typeof slugField === "string" && slugField.trim()) {
    return slugField.trim().toLowerCase().replace(/\s+/g, "-");
  }

  const id = entry?.sys?.id;
  return typeof id === "string" && id.trim() ? id.trim() : "";
}

function getEntryExcerpt(entry: any) {
  return String(
    getFieldValue(entry, ["excerpt", "summary", "description", "body", "content"]) || "Read more about this update from Lencar."
  );
}

function getEntryDate(entry: any) {
  const directDate = getFieldValue(entry, ["publishDate", "date", "publishedAt", "datetime"]);
  return directDate || entry?.sys?.createdAt || "";
}

function getEntryType(entry: any) {
  const typeLabel = getFieldValue(entry, ["blogtype", "type", "category", "contentType", "articleType", "postType"]);

  if (typeof typeLabel === "string") {
    const trimmed = typeLabel.trim();
    return trimmed || "Journal";
  }

  return "Journal";
}

/**
 * Resolves a Contentful asset (or array of assets, or unresolved Link) to a usable URL.
 * Handles the three shapes an image field can actually come back as:
 *  1. A resolved Asset:            { fields: { file: { url } } }
 *  2. An array of resolved Assets: [{ fields: { file: { url } } }, ...]
 *  3. An unresolved Link:          { sys: { type: "Link", linkType: "Asset", id } }
 */
function resolveAssetUrl(field: any): string | null {
  if (!field) return null;

  // array of assets — use the first one
  if (Array.isArray(field)) {
    for (const item of field) {
      const url = resolveAssetUrl(item);
      if (url) return url;
    }
    return null;
  }

  // resolved asset with a direct file url
  const fileUrl = field?.fields?.file?.url;
  if (typeof fileUrl === "string" && fileUrl.trim()) {
    return fileUrl.startsWith("//") ? `https:${fileUrl}` : fileUrl;
  }

  // unresolved link — only works if the asset id happens to match the CDN path,
  // which requires the space id env var to be correct; this is a best-effort fallback
  if (field?.sys?.type === "Link" && field?.sys?.linkType === "Asset" && field?.sys?.id) {
    const spaceId = process.env.CONTENTFUL_SPACE_ID || process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
    if (spaceId) {
      return `https://images.ctfassets.net/${spaceId}/${field.sys.id}/`;
    }
  }

  return null;
}

function getEntryImage(entry: any): string | null {
  const fields = entry?.fields ?? {};

  // try the field names we expect first
  const candidates = [
    fields.featuredImage,
    fields.image,
    fields.heroImage,
    fields.coverImage,
    fields.thumbnail,
    fields.images,
  ];

  for (const candidate of candidates) {
    const url = resolveAssetUrl(candidate);
    if (url) return url;
  }

  // fall back to scanning every field for anything that looks like an asset —
  // catches unexpected field names (e.g. "photo", "banner") without guessing every one
  for (const value of Object.values(fields)) {
    const url = resolveAssetUrl(value);
    if (url) return url;
  }

  return null;
}

async function getBlogs() {
  try {
    const response = await contentfulClient.getEntries({
      limit: 20,
      include: 2, // resolve linked assets so image fields arrive pre-populated
    });

    return response.items
      .filter((post: any) => post?.fields)
      .sort((a: any, b: any) => {
        const dateA = new Date(getEntryDate(a)).getTime();
        const dateB = new Date(getEntryDate(b)).getTime();
        return dateB - dateA;
      });
  } catch (error) {
    console.error("Failed to fetch blog posts from Contentful:", error);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div>
      <AllPageHero
        eyebrow="About Lencar"
        heading={["Stay updated with", <><span className="text-[#e30613]">Lencar blogs.</span></>]}
        description="Know what's happening at Lencar. Product updates, rider stories, and news from the road."
      />

      <main className="bg-white">
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          {blogs.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-[#0b0b0c]/15 bg-[#f7f7f8] p-16 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#e30613]/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 6h16M4 12h16M4 18h10"
                    stroke="#e30613"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <h2 className="font-display mt-5 text-[22px] font-black uppercase italic text-[#0b0b0c]">
                No blog posts yet
              </h2>
              <p className="font-body mt-3 text-[15px] leading-relaxed text-[#4a4a4d]">
                Publish your first article in Contentful and it will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {blogs.map((post: any) => {
                const title = getEntryTitle(post);
                const slug = getEntrySlug(post);
                const excerpt = getEntryExcerpt(post);
                const date = getEntryDate(post);
                const blogType = getEntryType(post);
                const imageUrl = getEntryImage(post);

                return (
                  <Link
                    key={post.sys.id}
                    href={`/blog/${slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-[#0b0b0c]/10 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-[#e30613]/30 hover:shadow-[0_20px_45px_rgba(11,11,12,0.1)]"
                  >
                    <div className="relative h-56 overflow-hidden bg-[#f7f7f8]">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="font-body text-[12px] font-semibold uppercase tracking-[0.08em] text-[#c9c9cc]">
                            Lencar
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-7">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="font-body rounded-full bg-[#e30613]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#e30613]">
                          {blogType}
                        </span>
                        <span className="font-body text-[13px] text-[#8a8a8e]">
                          {date ? new Date(date).toLocaleDateString() : "Recently added"}
                        </span>
                      </div>

                      <h2 className="font-display text-[22px] font-black uppercase italic leading-tight text-[#0b0b0c] transition-colors group-hover:text-[#e30613]">
                        {title}
                      </h2>

                      <p className="font-body mt-3 line-clamp-3 text-[14px] leading-relaxed text-[#4a4a4d]">
                        {excerpt}
                      </p>

                      <div className="mt-6 flex items-center justify-between border-t border-[#0b0b0c]/10 pt-5">
                        <span className="font-body text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8a8a8e]">
                          Lencar
                        </span>
                        <span className="font-body inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#e30613]">
                          Read More
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            className="transition-transform group-hover:translate-x-1"
                          >
                            <path
                              d="M3 7h8M7 3l4 4-4 4"
                              stroke="#e30613"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
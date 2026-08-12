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

export function getEntryTitle(entry: any): string {
  return String(
    getFieldValue(entry, ["title", "name", "headline", "seoTitle", "subject"]) || `Blog entry ${entry?.sys?.id?.slice(0, 8)}`
  );
}

export function getEntrySlug(entry: any): string {
  const slugField = entry?.fields?.slug ?? entry?.fields?.urlSlug ?? entry?.fields?.path;

  if (typeof slugField === "string" && slugField.trim()) {
    return slugField.trim().toLowerCase().replace(/\s+/g, "-");
  }

  const id = entry?.sys?.id;
  return typeof id === "string" && id.trim() ? id.trim() : "";
}

export function getEntryExcerpt(entry: any): string {
  return String(
    getFieldValue(entry, ["excerpt", "summary", "description", "body", "content"]) || "Read more about this update from Lencar."
  );
}

export function getEntryDate(entry: any): string {
  const directDate = getFieldValue(entry, ["publishDate", "date", "publishedAt", "datetime"]);
  return directDate || entry?.sys?.createdAt || "";
}

export function getEntryType(entry: any): string {
  const typeLabel = getFieldValue(entry, ["blogtype", "type", "category", "contentType", "articleType", "postType"]);

  if (typeof typeLabel === "string") {
    const trimmed = typeLabel.trim();
    return trimmed || "Journal";
  }

  return "Journal";
}

export function resolveAssetUrl(field: any): string | null {
  if (!field) return null;

  if (Array.isArray(field)) {
    for (const item of field) {
      const url = resolveAssetUrl(item);
      if (url) return url;
    }
    return null;
  }

  const fileUrl = field?.fields?.file?.url;
  if (typeof fileUrl === "string" && fileUrl.trim()) {
    return fileUrl.startsWith("//") ? `https:${fileUrl}` : fileUrl;
  }

  if (field?.sys?.type === "Link" && field?.sys?.linkType === "Asset" && field?.sys?.id) {
    const spaceId = process.env.CONTENTFUL_SPACE_ID || process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
    if (spaceId) {
      return `https://images.ctfassets.net/${spaceId}/${field.sys.id}/`;
    }
  }

  return null;
}

export function getEntryImage(entry: any): string | null {
  const fields = entry?.fields ?? {};

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

  for (const value of Object.values(fields)) {
    const url = resolveAssetUrl(value);
    if (url) return url;
  }

  return null;
}

export function getBlogImageUrl(field: any): string | null {
  const fileUrl = field?.fields?.file?.url;
  if (fileUrl) {
    return `https:${fileUrl}`;
  }

  if (field?.sys?.type === "Link" && field?.sys?.id) {
    return `https://images.ctfassets.net/${process.env.CONTENTFUL_SPACE_ID || "yjslma0tc7f3"}/${field.sys.id}/?fm=jpg&fl=progressive`;
  }

  return null;
}

export async function getBlogs() {
  try {
    const { contentfulClient } = await import("@/lib/contentful");
    const response = await contentfulClient.getEntries({
      limit: 20,
      include: 2,
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

export async function getBlogById(id: string): Promise<any> {
  try {
    const { contentfulClient } = await import("@/lib/contentful");
    const response = await contentfulClient.getEntries({
      content_type: "lencarErc80",
      "sys.id": id,
      limit: 1,
      include: 1,
    });

    if (!response.items.length) return null;
    return response.items[0];
  } catch {
    return null;
  }
}

export async function getBlogSlugs(): Promise<string[]> {
  try {
    const { contentfulClient } = await import("@/lib/contentful");
    const response = await contentfulClient.getEntries({
      content_type: "lencarErc80",
      limit: 100,
    });
    return response.items.map((entry: any) => entry.sys.id);
  } catch {
    return [];
  }
}

export function estimateReadTime(node: any): number {
  const words = JSON.stringify(node ?? {}).split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
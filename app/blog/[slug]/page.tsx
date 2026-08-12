import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import ReadingProgress from "@/components/ui/ReadingProgress";
import { renderRichText } from "@/components/ui/RichText";
import { getBlogById, getBlogImageUrl, estimateReadTime, getEntryExcerpt } from "@/lib/blog";
import { seoMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogById(slug);

  if (!blog) {
    return seoMetadata({
      title: "Blog Post Not Found | Lencar",
      description: "The requested blog post could not be found.",
      path: `/blog/${slug}`,
    });
  }

  const fields = blog.fields as Record<string, any>;
  const title = fields.title || "Blog Post";
  const description = getEntryExcerpt(blog) || "Read more about this update from Lencar.";
  const imageUrl = getBlogImageUrl(fields.images) || "/images/Lencar-Dark-Logo.png";

  return seoMetadata({
    title: `${title} | Lencar Journal`,
    description,
    path: `/blog/${slug}`,
    image: imageUrl,
    imageAlt: title,
    type: "article",
    publishedTime: fields.datetime || undefined,
  });
}

export default async function BlogDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogById(slug);

  if (!blog) {
    notFound();
  }

  const fields = blog.fields as Record<string, any>;
  const image = getBlogImageUrl(fields.images) || "/placeholder.jpg";
  const readTime = estimateReadTime(fields.description);

  return (
    <>
      <ReadingProgress />
      <Navbar />

      <main className="bg-white">
        <section className="relative flex h-[64vh] min-h-[420px] w-full items-end overflow-hidden bg-[#0b0b0c]">
          <Image
            src={image}
            alt={fields.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c] via-[#0b0b0c]/50 to-[#0b0b0c]/10" />

          <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-14">
            <Link
              href="/blog"
              className="font-body inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-white/70 transition-colors hover:text-white"
            >
              &larr; Back to Journal
            </Link>

            <h1 className="font-display mt-3 max-w-3xl text-[36px] font-black uppercase italic leading-[1.05] tracking-tight text-white sm:text-[46px] lg:text-[56px]">
              {fields.title}
            </h1>

            <div className="font-body mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-white/60">
              {fields.datetime && (
                <span>
                  {new Date(fields.datetime).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span>{readTime} min read</span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <article>{renderRichText(fields.description)}</article>

          <div className="mt-10 border-t border-[#0b0b0c]/10 pt-6">
            <Link
              href="/blog"
              className="font-body inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#4a4a4d] transition-colors hover:text-[#0F4C81]"
            >
              &larr; Back to Journal
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

import { contentfulClient } from "@/lib/contentful";
import ReadingProgress from "@/components/ReadingProgress";

const CONTENT_TYPE = "lencarErc80";

async function getBlog(id: string) {
  const response = await contentfulClient.getEntries({
    content_type: CONTENT_TYPE,
    "sys.id": id,
    limit: 1,
    include: 1,
  });

  if (!response.items.length) {
    return null;
  }

  return response.items[0];
}

function renderRichText(node: any): ReactNode {
  if (!node) return null;

  if (node.nodeType === "document") {
    return node.content.map((child: any, i: number) => (
      <div key={i}>{renderRichText(child)}</div>
    ));
  }

  if (node.nodeType === "paragraph") {
    return (
      <p className="mt-5 font-body text-[17px] leading-[1.8] text-[#3a3a3d]">
        {node.content.map((child: any, i: number) => (
          <span key={i}>{renderRichText(child)}</span>
        ))}
      </p>
    );
  }

  if (node.nodeType === "heading-1") {
    return (
      <h1 className="font-display mt-12 text-[32px] font-black uppercase italic leading-tight tracking-tight text-[#0b0b0c]">
        {node.content.map((child: any, i: number) => (
          <span key={i}>{renderRichText(child)}</span>
        ))}
      </h1>
    );
  }

  if (node.nodeType === "heading-2") {
    return (
      <h2 className="font-display mt-10 text-[26px] font-black uppercase italic leading-tight tracking-tight text-[#0b0b0c]">
        {node.content.map((child: any, i: number) => (
          <span key={i}>{renderRichText(child)}</span>
        ))}
      </h2>
    );
  }

  if (node.nodeType === "heading-3") {
    return (
      <h3 className="font-display mt-8 text-[20px] font-bold uppercase tracking-tight text-[#0b0b0c]">
        {node.content.map((child: any, i: number) => (
          <span key={i}>{renderRichText(child)}</span>
        ))}
      </h3>
    );
  }

  if (node.nodeType === "unordered-list" || node.nodeType === "ordered-list") {
    const Tag = node.nodeType === "ordered-list" ? "ol" : "ul";
    return (
      <Tag className="mt-5 space-y-2 pl-1 font-body text-[17px] leading-[1.8] text-[#3a3a3d]">
        {node.content.map((child: any, i: number) => (
          <li key={i} className="flex gap-3">
            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e30613]" />
            <span>{renderRichText(child)}</span>
          </li>
        ))}
      </Tag>
    );
  }

  if (node.nodeType === "list-item") {
    return (
      <>
        {node.content.map((child: any, i: number) => (
          <span key={i}>{renderRichText(child)}</span>
        ))}
      </>
    );
  }

  if (node.nodeType === "blockquote") {
    return (
      <blockquote className="mt-6 border-l-[3px] border-[#e30613] pl-5 font-body text-[18px] italic leading-relaxed text-[#0b0b0c]">
        {node.content.map((child: any, i: number) => (
          <span key={i}>{renderRichText(child)}</span>
        ))}
      </blockquote>
    );
  }

  if (node.nodeType === "hr") {
    return <hr className="my-10 border-t border-[#0b0b0c]/10" />;
  }

  if (node.nodeType === "hyperlink") {
    return (
      <a
        href={node.data?.uri}
        className="font-medium text-[#e30613] underline decoration-[#e30613]/30 underline-offset-2 hover:decoration-[#e30613]"
        target="_blank"
        rel="noopener noreferrer"
      >
        {node.content.map((child: any, i: number) => (
          <span key={i}>{renderRichText(child)}</span>
        ))}
      </a>
    );
  }

  if (node.nodeType === "text") {
    let text: ReactNode = node.value;

    if (node.marks?.some((m: any) => m.type === "bold")) {
      text = <strong className="font-semibold text-[#0b0b0c]">{text}</strong>;
    }
    if (node.marks?.some((m: any) => m.type === "italic")) {
      text = <em>{text}</em>;
    }
    if (node.marks?.some((m: any) => m.type === "code")) {
      text = (
        <code className="rounded bg-[#f7f7f8] px-1.5 py-0.5 font-mono text-[15px] text-[#0b0b0c]">
          {text}
        </code>
      );
    }

    return text;
  }

  return null;
}

function getImageUrl(field: any): string | null {
  const fileUrl = field?.fields?.file?.url;
  if (fileUrl) {
    return `https:${fileUrl}`;
  }

  if (field?.sys?.type === "Link" && field?.sys?.id) {
    return `https://images.ctfassets.net/${process.env.CONTENTFUL_SPACE_ID || "yjslma0tc7f3"}/${field.sys.id}/?fm=jpg&fl=progressive`;
  }

  return null;
}

function estimateReadTime(node: any): number {
  const words = JSON.stringify(node ?? {}).split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export default async function BlogDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog: any = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  const fields = blog.fields;
  const image = getImageUrl(fields.images) || "/placeholder.jpg";
  const readTime = estimateReadTime(fields.description);

  return (
    <>
      <ReadingProgress />
      <Navbar />

      <main className="bg-white">
        {/* editorial hero */}
        <section className="relative flex h-[64vh] min-h-[420px] w-full items-end overflow-hidden bg-[#0b0b0c]">
          <Image
            src={image}
            alt={fields.title}
            fill
            priority
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

            <p className="font-body mt-6 text-[13px] font-bold uppercase tracking-[0.14em] text-[#e30613]">
              Lencar Journal
            </p>

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

        {/* article */}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <article>{renderRichText(fields.description)}</article>

          {/* end-of-article CTA */}
          {/* <div className="mt-16 flex flex-col items-start gap-5 rounded-xl border border-[#0b0b0c]/10 bg-[#f7f7f8] p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-[20px] font-black uppercase italic text-[#0b0b0c]">
                Ready to ride electric?
              </p>
              <p className="font-body mt-1 text-[14px] text-[#4a4a4d]">
                Book a test ride and feel the ERC.80 for yourself.
              </p>
            </div>
            <Link
              href="/test-ride"
              className="font-body inline-flex shrink-0 items-center justify-center rounded-md bg-[#e30613] px-6 py-3 text-[14px] font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Book a Test Ride
            </Link>
          </div> */}

          <div className="mt-10 border-t border-[#0b0b0c]/10 pt-6">
            <Link
              href="/blog"
              className="font-body inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#4a4a4d] transition-colors hover:text-[#e30613]"
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
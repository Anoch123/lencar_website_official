import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  blogType: string;
  imageUrl: string | null;
}

export function BlogCard({ title, slug, excerpt, date, blogType, imageUrl }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#0b0b0c]/10 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0F4C81]/30 hover:shadow-[0_20px_45px_rgba(11,11,12,0.1)]"
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
          <span className="font-body rounded-full bg-[#0F4C81]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0F4C81]">
            {blogType}
          </span>
          <span className="font-body text-[13px] text-[#8a8a8e]">
            {date ? new Date(date).toLocaleDateString() : "Recently added"}
          </span>
        </div>

        <h2 className="font-display text-[22px] font-black uppercase italic leading-tight text-[#0F4C81] transition-colors group-hover:text-[#0F4C81]">
          {title}
        </h2>

        <p className="font-body mt-3 line-clamp-3 text-[14px] leading-relaxed text-[#4a4a4d]">
          {excerpt}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-[#0b0b0c]/10 pt-5">
          <span className="font-body text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8a8a8e]">
            Lencar
          </span>
          <span className="font-body inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0F4C81]">
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
                stroke="#0F4C81"
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
}